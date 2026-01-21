const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Main Scrape Endpoint
app.post('/scrape', async (req, res) => {
    const { url, selector } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    let browser;
    try {
        console.log(`Launching browser for ${url}`);

        // Launch options optimized for Docker/Render
        browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ],
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
        });

        const page = await browser.newPage();

        // Block resources to speed up
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });

        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        let content;
        if (selector) {
            try {
                await page.waitForSelector(selector, { timeout: 5000 });
                content = await page.$eval(selector, el => el.innerHTML);
            } catch (e) {
                content = `Selector ${selector} not found or timed out.`;
            }
        } else {
            content = await page.content();
        }

        res.json({ content });

    } catch (error) {
        console.error("Scrape Error:", error);
        res.status(500).json({ error: error.message });
    } finally {
        if (browser) await browser.close();
    }
});

// Health check
app.get('/', (req, res) => {
    res.send('Scraper API is running! usage: POST /scrape { "url": "..." }');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
