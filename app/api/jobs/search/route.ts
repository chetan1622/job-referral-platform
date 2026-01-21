import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q');
        const location = searchParams.get('location');
        const type = searchParams.get('type');

        const where = {
            AND: [
                query ? {
                    OR: [
                        { title: { contains: query } }, // Case-insensitive handled by DB usually, or need mode: 'insensitive' for PostgreSQL. SQLite is case-insensitive for ASCII.
                        { company: { contains: query } }
                    ]
                } : {},
                location ? { location: { contains: location } } : {},
                type ? { type: { equals: type } } : {}
            ]
        };

        const jobs = await db.job.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(jobs);
    } catch (error) {
        console.error("[JOBS_SEARCH_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
