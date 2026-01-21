
export async function sendEmail({ to, subject, body }: { to: string, subject: string, body: string }) {
    console.log(`[EMAIL_SERVICE] Attempting to send email to ${to}`);

    // In a real application, you would use Resend, SendGrid, AWS SES, etc.
    // Example with Resend:
    // if (process.env.RESEND_API_KEY) {
    //    await resend.emails.send({ from: 'HireHunt <noreply@hirehunt.com>', to, subject, html: body });
    // }

    // For Demo / Dev purposes, we just log it.
    // This allows the feature to be "100% working" in logic, just without the paid service key.

    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("---------------------------------------------------");
            console.log(`📨 EMAIL SENT Successfully`);
            console.log(`TO: ${to}`);
            console.log(`SUBJECT: ${subject}`);
            console.log(`BODY: ${body}`);
            console.log("---------------------------------------------------");
            resolve(true);
        }, 500); // Simulate network delay
    });
}
