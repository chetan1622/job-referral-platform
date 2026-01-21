import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendEmail } from '@/lib/email';

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { status } = await req.json();

        if (!params.id) {
            return new NextResponse("Referral ID required", { status: 400 });
        }

        if (!status || !['Accepted', 'Rejected'].includes(status)) {
            return new NextResponse("Invalid status", { status: 400 });
        }

        const referral = await db.referral.update({
            where: { id: params.id },
            data: { status },
            include: { seeker: true, job: true } // Include relations to get email and job details
        });

        // Send Email Notification
        if (referral && referral.seeker) {
            const subject = `Update on your referral for ${referral.job.title}`;
            const body = status === 'Accepted'
                ? `<p>Congrats! Your referral request for <strong>${referral.job.title}</strong> has been <strong>ACCEPTED</strong> by an employee. They will be in touch shortly.</p>`
                : `<p>Update: Your referral request for <strong>${referral.job.title}</strong> was not accepted at this time.</p>`;

            await sendEmail({
                to: referral.seeker.email,
                subject,
                body
            });
        }

        return NextResponse.json(referral);
    } catch (error) {
        console.error("[REFERRAL_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
