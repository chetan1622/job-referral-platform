// import puppeteer, { Browser, PDFOptions, Page, ScreenshotOptions } from 'puppeteer';

// Puppeteer is too large for Netlify free tier serverless functions.
// We mock this service or delegate to an external API (Render/Railway).
export class BrowserService {

    // URL of your separate Scraper API (e.g. from Render.com)
    // Add SCRAPER_API_URL to your Netlify Environment Variables
    private scraperApiUrl = process.env.SCRAPER_API_URL;

    async launch(): Promise<void> {
        console.log("Mock Browser launched (Virtual)");
    }

    async close(): Promise<void> {
        console.log("Mock Browser closed");
    }

    async scrape(url: string, selector?: string): Promise<string> {
        // 1. If we have an external Scraper API configured, use it.
        if (this.scraperApiUrl) {
            try {
                console.log(`Delegating scrape to: ${this.scraperApiUrl}`);
                const res = await fetch(`${this.scraperApiUrl}/scrape`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url, selector })
                });

                if (!res.ok) throw new Error(`Scraper API Error: ${res.statusText}`);
                const data = await res.json();
                return data.content;
            } catch (error) {
                console.error("External Scraper Failed:", error);
                // Fallback to mock
            }
        }

        // 2. Fallback Mock Implementation (for when no external API is set)
        console.log(`Mock Scraping ${url}`);
        return "<html><body><h1>Mock Content</h1><p>Scraping is disabled. Configure SCRAPER_API_URL to enable.</p></body></html>";
    }

    async screenshot(url: string, options?: any): Promise<Buffer> {
        console.log(`Mock Screenshot ${url}`);
        return Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", 'base64');
    }

    async pdf(url: string, options?: any): Promise<Buffer> {
        console.log(`Mock PDF ${url}`);
        return Buffer.from("Mock PDF Content");
    }
}

export const browserService = new BrowserService();
