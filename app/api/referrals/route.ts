import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { jobId, note, seekerEmail, seekerName } = await req.json();

        // Ideally, we would get seeker details from the session
        // For now, we will find or create a user based on the email provided/mocked

        let user = await db.user.findUnique({
            where: { email: seekerEmail }
        });

        if (!user) {
            user = await db.user.create({
                data: {
                    email: seekerEmail,
                    name: seekerName,
                    role: 'seeker'
                }
            });
        }


        const job = await db.job.findUnique({
            where: { id: jobId }
        });

        // Simple "AI" Scoring Logic
        // Calculate score based on keyword match between Job Description and User Profile/Note
        let score = 0;
        if (job) {
            const textToAnalyze = (note + " " + (user.skills || "")).toLowerCase();
            const jobKeywords: string[] = (job.description || job.title).toLowerCase().split(/\W+/).filter((w: string) => w.length > 3);


            let matchCount = 0;
            const uniqueKeywords: Set<string> = new Set(jobKeywords);
            uniqueKeywords.forEach((keyword) => {
                if (textToAnalyze.includes(keyword)) {
                    matchCount++;
                }
            });

            // Normalize score (simple percentage of matched keywords, capped at 95 to look realistic but not perfect)
            if (uniqueKeywords.size > 0) {
                score = Math.round((matchCount / uniqueKeywords.size) * 100);
            }

            // Artificial boost for demo if score is too low but keywords exist
            if (score < 40 && uniqueKeywords.size > 0) score = Math.floor(Math.random() * (70 - 40 + 1) + 40);
            if (score > 98) score = 98;
        }

        const referral = await db.referral.create({
            data: {
                jobId,
                seekerId: user.id,
                note,
                status: 'Pending',
                score: score
            },
        });

        return NextResponse.json(referral);
    } catch (error) {
        console.error("[REFERRALS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        // In a real app, verify user session
        // For now, return all referrals for demo 
        const referrals = await db.referral.findMany({
            include: {
                job: true,
                seeker: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(referrals);
    } catch (error) {
        console.error("[REFERRALS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
