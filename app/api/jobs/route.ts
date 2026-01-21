import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const jobs = await db.job.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(jobs);
    } catch (error) {
        console.error("[JOBS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { title, company, location, salary, type, description, validityDays } = await req.json();

        // Validate validityDays
        const days = validityDays ? parseInt(validityDays) : 30; // Default to 30 if not provided
        if (days < 1 || days > 90) {
            return new NextResponse("Validity must be between 1 and 90 days", { status: 400 });
        }

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + days);

        const job = await db.job.create({
            data: {
                title,
                company,
                location,
                salary,
                type,
                description,
                validityDays: days,
                expiryDate
                // In a real app, we would associate this with the logged-in employee
            },
        });

        return NextResponse.json(job);
    } catch (error) {
        console.error("[JOBS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
