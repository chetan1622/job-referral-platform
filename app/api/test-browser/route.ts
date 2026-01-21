import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'; // Prevent static generation during build
import { browserService } from '@/lib/browser-service';

export async function GET() {
    try {
        // Test scraping
        const html = await browserService.scrape('https://example.com', 'h1');

        // Test screenshot (returning base64 for simplicity in json)
        const screenshotBuffer = await browserService.screenshot('https://example.com');
        const screenshotBase64 = screenshotBuffer.toString('base64');

        await browserService.close();

        return NextResponse.json({
            status: 'success',
            scrapedContent: html,
            screenshotLength: screenshotBase64.length
        });
    } catch (error) {
        console.error("Browser Test Failed:", error);
        return NextResponse.json({ status: 'error', error: String(error) }, { status: 500 });
    }
}
