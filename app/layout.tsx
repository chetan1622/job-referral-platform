import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ModeToggle } from "@/components/mode-toggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "HireHunt - Next-Gen Referral Platform",
    description: "Enterprise-grade job referral platform for Indian freshers.",
    verification: {
        google: "zYlouLFON6-Wpr_2f5nv5B0bJHfILUSOVSS9BU8RNd0",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(
                "min-h-screen bg-background font-sans antialiased",
                inter.variable,
                outfit.variable
            )}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <SpeedInsights />
                    <div className="fixed bottom-6 right-6 z-50">
                        <ModeToggle />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
