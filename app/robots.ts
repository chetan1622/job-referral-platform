import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://job-referral-platform-new.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"], // Hide API and Admin from Google
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
