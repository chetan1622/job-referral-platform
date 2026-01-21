import type { Config } from "tailwindcss"

const config = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                display: ["var(--font-outfit)", "sans-serif"],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "fade-in": {
                    from: { opacity: "0", transform: "translateY(10px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "slide-up": {
                    "0%": { transform: "translateY(20px)", opacity: "0" }, // Updated from 'from'
                    "100%": { transform: "translateY(0)", opacity: "1" }, // Updated from 'to'
                },
                "rotate-3d": {
                    "0%": { transform: "rotateY(-5deg) rotateX(2deg)" },
                    "100%": { transform: "rotateY(5deg) rotateX(-2deg)" },
                },
                glow: {
                    "0%": { opacity: "0.5", filter: "blur(2px)" },
                    "100%": { opacity: "1", filter: "blur(4px)" },
                },
                shine: {
                    "0%": { backgroundPosition: "200% center" },
                    "100%": { backgroundPosition: "-200% center" },
                },
                "float-particle": {
                    "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
                    "10%": { opacity: "1" },
                    "90%": { opacity: "1" },
                    "100%": { transform: "translateY(-100px) translateX(20px)", opacity: "0" },
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.5s ease-out forwards", // Updated duration/forwards
                "slide-up": "slide-up 0.6s ease-out forwards", // Updated duration/forwards
                "float-slow": "float 6s ease-in-out infinite",
                "float-particle": "float-particle 20s linear infinite",
                "rotate-slow": "rotate-3d 8s ease-in-out infinite alternate",
                "glow": "glow 3s ease-in-out infinite alternate",
                "shine": "shine 3s linear infinite",
                "spin-slow": "spin 15s linear infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

