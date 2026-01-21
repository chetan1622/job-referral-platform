import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { name, email, password, role, resumeUrl } = await req.json();

        if (!email || !password || !name) {
            return new NextResponse("Missing data", { status: 400 });
        }

        const exists = await db.user.findUnique({
            where: { email }
        });

        if (exists) {
            return new NextResponse("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || 'seeker',
                resumeUrl: resumeUrl || null
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("[REGISTER_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
