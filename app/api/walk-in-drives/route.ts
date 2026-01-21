import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const drives = await db.walkInDrive.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                postedBy: {
                    select: { name: true, image: true, email: true }
                }
            }
        });
        return NextResponse.json(drives);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch drives" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { company, location, timing, qualification } = await req.json();

        if (!company || !location || !timing || !qualification) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Get user ID
        const user = await db.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const drive = await db.walkInDrive.create({
            data: {
                company,
                location,
                timing,
                qualification,
                postedById: user.id
            }
        });

        return NextResponse.json(drive);
    } catch (error) {
        return NextResponse.json({ error: "Failed to post drive" }, { status: 500 });
    }
}
