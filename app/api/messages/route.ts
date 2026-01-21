import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { senderEmail, receiverId, content } = await req.json();

        if (!senderEmail || !receiverId || !content) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const sender = await db.user.findUnique({
            where: { email: senderEmail }
        });

        if (!sender) {
            return new NextResponse("Sender not found", { status: 404 });
        }

        const message = await db.message.create({
            data: {
                content,
                senderId: sender.id,
                receiverId
            },
            include: {
                sender: true,
                receiver: true
            }
        });

        return NextResponse.json(message);
    } catch (error) {
        console.error("[MESSAGES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        const otherUserId = searchParams.get('otherUserId');

        if (!email) {
            return new NextResponse("Email required", { status: 400 });
        }

        let user = await db.user.findUnique({
            where: { email }
        });

        if (!user) {
            // For Demo: Auto-create the user if they don't exist yet (synced with frontend mock)
            user = await db.user.create({
                data: {
                    email,
                    name: "Chetan User",
                    role: "seeker"
                }
            });
        }

        if (otherUserId) {
            // Fetch messages between user and otherUserId
            const messages = await db.message.findMany({
                where: {
                    OR: [
                        { senderId: user.id, receiverId: otherUserId },
                        { senderId: otherUserId, receiverId: user.id }
                    ]
                },
                orderBy: {
                    createdAt: 'asc'
                },
                include: {
                    sender: true,
                    receiver: true
                }
            });
            return NextResponse.json(messages);
        } else {
            // Fetch recent conversations (unique users exchanged messages with)
            // Grouping in Prisma is tricky for "conversations".
            // Easier to fetch all messages involving user, then process in JS for now.
            const messages = await db.message.findMany({
                where: {
                    OR: [
                        { senderId: user.id },
                        { receiverId: user.id }
                    ]
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    sender: true,
                    receiver: true
                }
            });

            // Extract unique contacts
            const contactsMap = new Map();
            messages.forEach(msg => {
                const other = msg.senderId === user.id ? msg.receiver : msg.sender;
                if (!contactsMap.has(other.id)) {
                    contactsMap.set(other.id, {
                        user: other,
                        lastMessage: msg
                    });
                }
            });

            return NextResponse.json(Array.from(contactsMap.values()));
        }

    } catch (error) {
        console.error("[MESSAGES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
