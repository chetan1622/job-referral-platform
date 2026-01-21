import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        // In a real app, verify that the current user is an Admin
        const users = await db.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                // company: true, // Removed as it doesn't exist in schema
                riskScore: true,
                createdAt: true
            }
        });

        // Map undefined company for now since we didn't add it to schema explicitly (it was conceptually part of role details)
        const safeUsers = users.map((u: any) => ({
            ...u,
            company: u.role === 'employee' ? 'Acme Corp' : 'N/A', // Placeholder until we add company field
            joined: new Date(u.createdAt).toLocaleDateString()
        }));

        return NextResponse.json(safeUsers);
    } catch (error) {
        console.error("[ADMIN_USERS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { userId, status, riskScore } = await req.json();

        if (!userId) return new NextResponse("User ID required", { status: 400 });

        const data: any = {};
        if (status) data.status = status;
        if (riskScore) data.riskScore = riskScore;

        const user = await db.user.update({
            where: { id: userId },
            data
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("[ADMIN_USERS_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
