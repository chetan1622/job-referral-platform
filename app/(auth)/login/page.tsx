"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { signIn, getSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [error, setError] = React.useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (res?.error) {
            setError("Invalid email or password")
            setIsLoading(false)
        } else {
            // Fetch session to check role
            const session = await getSession()
            const role = session?.user?.role || "seeker" // Default to seeker if undefined

            // Redirect based on role
            if (role === 'admin') {
                router.push("/admin")
            } else if (role === 'employee') {
                router.push("/employee")
            } else {
                router.push("/seeker")
            }

            router.refresh()
        }
    }

    return (
        <div className="w-full max-w-[450px] relative z-10">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight font-display text-primary">Welcome back</h2>
                <p className="text-muted-foreground mt-2">
                    Enter your email to sign in to your HireHunt account
                </p>
            </div>

            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md">
                <CardContent className="p-6 md:p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-muted/30 border-muted-foreground/20 focus:bg-white transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                                <Link href="#" className="text-xs text-primary font-semibold hover:underline">Forgot password?</Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                className="bg-muted/30 border-muted-foreground/20 focus:bg-white transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && (
                            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-2 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                {error}
                            </div>
                        )}
                        <Button type="submit" className="w-full h-12 text-base shadow-lg shadow-primary/25" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-muted-foreground/20" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-muted-foreground font-medium">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-11 hover:bg-gray-50 border-muted-foreground/20">
                            {/* Google Icon Placeholder */}
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="h-11 hover:bg-gray-50 border-muted-foreground/20">
                            {/* LinkedIn Icon Placeholder */}
                            <svg className="w-4 h-4 mr-2 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            LinkedIn
                        </Button>
                    </div>
                </CardContent>
                <div className="p-6 text-center border-t bg-muted/20 rounded-b-xl">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-primary font-semibold hover:underline">Register</Link>
                    </p>
                </div>
            </Card>
        </div>
    )
}
