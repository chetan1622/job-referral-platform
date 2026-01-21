"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, Loader2, Upload } from "lucide-react"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Suspense } from "react"


type Role = "seeker" | "employee"

function RegisterPageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const defaultRole = (searchParams.get("role") as Role) || "seeker"

    const [role, setRole] = React.useState<Role>(defaultRole)
    const [isLoading, setIsLoading] = React.useState(false)
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        company: "", // Employee specific
        designation: "", // Employee specific
        resumeUrl: "" // Seeker specific
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    password: formData.password,
                    role: role,
                    resumeUrl: formData.resumeUrl
                })
            })

            if (res.ok) {
                router.push("/login?registered=true")
            } else {
                const msg = await res.text()
                alert(msg) // In real app use toast
            }
        } catch (error) {
            console.error(error)
            alert("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-[550px] relative z-10">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight font-display text-primary">Create an account</h2>
                <p className="text-muted-foreground mt-2">
                    Enter your details below to create your account and start connecting.
                </p>
            </div>

            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md">
                <CardContent className="p-6 md:p-8">
                    <form onSubmit={handleRegister} className="space-y-6">
                        {/* Role Toggle with Segmented Control look */}
                        <div className="p-1 bg-muted rounded-xl grid grid-cols-2 gap-1 mb-6">
                            <button
                                type="button"
                                onClick={() => setRole("seeker")}
                                className={cn(
                                    "px-4 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2",
                                    role === "seeker"
                                        ? "bg-white shadow-sm text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                                )}
                            >
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                Job Seeker
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("employee")}
                                className={cn(
                                    "px-4 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2",
                                    role === "employee"
                                        ? "bg-white shadow-sm text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                                )}
                            >
                                <span className="w-2 h-2 rounded-full bg-purple-500" />
                                Company Employee
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Common Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                                    <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required className="bg-muted/30 border-muted-foreground/20 focus:bg-white transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mobile" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mobile</Label>
                                    <Input id="mobile" placeholder="+91 9876543210" value={formData.mobile} onChange={handleInputChange} required className="bg-muted/30 border-muted-foreground/20 focus:bg-white transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    {role === "employee" ? "Official Work Email" : "Email Address"}
                                </Label>
                                <Input id="email" type="email" placeholder={role === "employee" ? "name@company.com" : "john@example.com"} value={formData.email} onChange={handleInputChange} required className="bg-muted/30 border-muted-foreground/20 focus:bg-white transition-colors" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                                <Input id="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleInputChange} required className="bg-muted/30 border-muted-foreground/20 focus:bg-white transition-colors" />
                            </div>

                            {/* Role Specific Fields */}
                            {role === "seeker" ? (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="experience" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Experience</Label>
                                            <Select>
                                                <SelectTrigger className="bg-muted/30 border-muted-foreground/20">
                                                    <SelectValue placeholder="Select..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="fresher">Fresher (0-1 yrs)</SelectItem>
                                                    <SelectItem value="early">Early Career (1-3 yrs)</SelectItem>
                                                    <SelectItem value="experienced">Experienced (3+ yrs)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="salary" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Expected LPA</Label>
                                            <Input id="salary" placeholder="e.g. 5-8" className="bg-muted/30 border-muted-foreground/20" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="education" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Education</Label>
                                        <Input id="education" placeholder="e.g. B.Tech Computer Science" required className="bg-muted/30 border-muted-foreground/20" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="resumeUrl" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Resume Link (Google Drive / LinkedIn)</Label>
                                        <Input id="resumeUrl" placeholder="https://drive.google.com/file/d/..." value={formData.resumeUrl} onChange={handleInputChange} className="bg-muted/30 border-muted-foreground/20" />
                                        <p className="text-[10px] text-muted-foreground">Please share a public link to your resume.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Company</Label>
                                            <Input id="company" placeholder="e.g. Google" required className="bg-muted/30 border-muted-foreground/20" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="designation" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Designation</Label>
                                            <Input id="designation" placeholder="e.g. SDE II" required className="bg-muted/30 border-muted-foreground/20" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="linkedin" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">LinkedIn</Label>
                                        <Input id="linkedin" placeholder="https://linkedin.com/in/..." className="bg-muted/30 border-muted-foreground/20" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <Button type="submit" className="w-full h-12 text-base shadow-lg shadow-primary/25" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {role === "seeker" ? "Create Seeker Account" : "Join as Employee"}
                        </Button>
                    </form>
                </CardContent>
                <div className="p-6 text-center border-t bg-muted/20 rounded-b-xl">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
            <RegisterPageContent />
        </Suspense>
    )
}
