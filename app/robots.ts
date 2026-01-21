import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://hirehunt-referral.netlify.app' // NOTE: Replace with actual URL

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'], // Hide API and Admin from Google
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
