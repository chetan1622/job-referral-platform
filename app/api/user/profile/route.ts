import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PATCH(req: Request) {
    try {
        const { email, name, skills, college, hometown } = await req.json();

        // In a real app we would get the ID from the session
        // For now, we rely on the client sending the email (secured by session on client side)
        // or we just find by email.

        if (!email) return new NextResponse("Email required", { status: 400 });

        const user = await db.user.update({
            where: { email },
            data: {
                name,
                skills, // Comma separated string
                college,
                hometown
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("[PROFILE_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
