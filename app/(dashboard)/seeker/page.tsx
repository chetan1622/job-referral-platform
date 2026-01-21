"use client"

import * as React from "react"
import { Search, MapPin, Building2, Wallet, Send, Sparkles, TrendingUp, Filter, FileText, CheckCircle2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useReferralContext } from "@/context/referral-context"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Imports
import { AIInterviewer } from "@/components/ai-interviewer"
import { WalkInDriveCard } from "@/components/walk-in-drive-card"
import { Bot, Megaphone } from "lucide-react"

export default function SeekerDashboard() {
    const { jobs, requestReferral, searchJobs, isLoading } = useReferralContext()
    const { toast } = useToast()
    const [searchTerm, setSearchTerm] = React.useState("")
    const [selectedJob, setSelectedJob] = React.useState<string | null>(null)
    const [note, setNote] = React.useState("")
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)

    // Interview State
    const [isInterviewOpen, setIsInterviewOpen] = React.useState(false)
    const [interviewScore, setInterviewScore] = React.useState<number | null>(null)

    // Walk-in Drive State
    const [drives, setDrives] = React.useState<any[]>([])
    const [isPostDriveOpen, setIsPostDriveOpen] = React.useState(false)
    const [isPostingDrive, setIsPostingDrive] = React.useState(false)
    const [driveForm, setDriveForm] = React.useState({
        company: "",
        location: "",
        timing: "",
        qualification: ""
    })

    const fetchDrives = async () => {
        try {
            const res = await fetch('/api/walk-in-drives')
            if (res.ok) {
                const data = await res.json()
                setDrives(data)
            }
        } catch (error) {
            console.error("Failed to fetch drives", error)
        }
    }

    // Poll drives every 10s
    React.useEffect(() => {
        fetchDrives()
        const interval = setInterval(fetchDrives, 10000)
        return () => clearInterval(interval)
    }, [])

    const handlePostDrive = async () => {
        setIsPostingDrive(true)
        try {
            const res = await fetch('/api/walk-in-drives', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(driveForm)
            })

            if (res.ok) {
                setDriveForm({ company: "", location: "", timing: "", qualification: "" })
                setIsPostDriveOpen(false)
                toast({ title: "Drive Posted! 🔥", description: "It is now visible to all seekers." })
                fetchDrives() // Refresh immediately
            } else {
                toast({ title: "Failed to post drive", variant: "destructive" })
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsPostingDrive(false)
        }
    }

    // Debounce search
    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchJobs(searchTerm)
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    const handleRequest = () => {
        if (selectedJob) {
            requestReferral(selectedJob, note) // In real app, we'd pass interviewScore here
            setIsDialogOpen(false)
            setNote("")
            setInterviewScore(null) // Reset for next time
            toast({
                title: "Request Sent! 🚀",
                description: "Your referral request has been sent to the hiring team.",
            })
        }
    }

    const handleInterviewComplete = (score: number) => {
        setInterviewScore(score)
        // Keep dialog open so they can see result, but maybe user closes it manually?
        // Actually, let's close the interview modal after a delay or let them close it?
        // Let's just update state. The Interview component shows the final message.
        // We can unlock the "Request" flow now.
    }

    return (
        <div className="space-y-8">
            <Toaster />
            {/* Premium Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-none shadow-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Sparkles className="w-24 h-24 -mr-6 -mt-6" />
                    </div>
                    <CardHeader className="pb-2 relative z-10">
                        <CardDescription className="text-indigo-100">Resume Score</CardDescription>
                        <CardTitle className="text-5xl font-bold font-display">85<span className="text-2xl opacity-60 font-normal">/100</span></CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
                            <TrendingUp className="w-3.5 h-3.5" /> Top 15% of Candidates
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-card">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-muted-foreground font-semibold uppercase tracking-wider text-xs">Applications Sent</CardDescription>
                        <CardTitle className="text-4xl font-bold text-card-foreground">12</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/40 px-1.5 py-0.5 rounded">+2</span> from last week
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-card">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-muted-foreground font-semibold uppercase tracking-wider text-xs">Profile Views</CardDescription>
                        <CardTitle className="text-4xl font-bold text-card-foreground">48</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/40 px-1.5 py-0.5 rounded">+15</span> new recruiters
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search Bar & Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-xl shadow-sm border border-border">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search for roles, companies throughout India..."
                        className="pl-10 h-12 border-none bg-muted/30 focus-visible:ring-0 focus-visible:bg-muted/50 text-base"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="h-12 px-6 gap-2 border-border">
                    <Filter className="w-4 h-4" /> Filters
                </Button>
                <Button className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
                    Search Jobs
                </Button>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Left Col: Job Listings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-foreground">Recommended Opportunities</h3>
                            <p className="text-sm text-muted-foreground">Based on your skills & profile</p>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {isLoading ? (
                            // Loading Skeletons
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-40 rounded-xl bg-muted animate-pulse border border-border"></div>
                            ))
                        ) : jobs.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                <p>No jobs found matching "{searchTerm}"</p>
                            </div>
                        ) : (
                            jobs.map((job) => (
                                <div key={job.id} className="group bg-card rounded-xl border border-border hover:border-indigo-200 dark:hover:border-indigo-800 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden">

                                    {/* Job Icon */}
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md bg-gradient-to-br from-slate-700 to-slate-900">
                                        {job.company.charAt(0)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                            <h4 className="text-xl font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{job.title}</h4>
                                            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded border border-border">{job.type}</span>
                                        </div>

                                        <p className="text-base text-muted-foreground font-medium mb-4 flex items-center gap-2">
                                            {job.company}
                                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                            <span className="text-muted-foreground font-normal">{job.location}</span>
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-700 border-none font-normal">
                                                <Wallet className="w-3 h-3 mr-1 text-slate-400" /> {job.salary}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="flex items-center">
                                        <Dialog open={isDialogOpen && selectedJob === job.id} onOpenChange={(open) => {
                                            setIsDialogOpen(open)
                                            if (open) {
                                                setSelectedJob(job.id)
                                                setInterviewScore(null)
                                                setIsInterviewOpen(false)
                                            }
                                        }}>
                                            <DialogTrigger asChild>
                                                <Button className="w-full md:w-auto bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-colors shadow-lg shadow-slate-200 dark:shadow-none group-hover:translate-x-1 duration-300">
                                                    Request Referral <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[600px] h-[700px] flex flex-col p-0 gap-0 overflow-hidden">
                                                {isInterviewOpen ? (
                                                    <AIInterviewer
                                                        jobTitle={job.title}
                                                        companyName={job.company}
                                                        onComplete={(score) => {
                                                            handleInterviewComplete(score)
                                                            setIsInterviewOpen(false)
                                                        }}
                                                    />
                                                ) : (
                                                    <>
                                                        <DialogHeader className="p-6 pb-2">
                                                            <DialogTitle className="text-2xl">Request Referral for {job.title}</DialogTitle>
                                                            <DialogDescription>
                                                                Pitch yourself to the hiring team.
                                                            </DialogDescription>
                                                        </DialogHeader>

                                                        <div className="flex-1 p-6 pt-2 overflow-y-auto">
                                                            {interviewScore === null ? (
                                                                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                                                                    <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center animate-pulse">
                                                                        <Bot className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <h3 className="text-xl font-bold">AI Pre-Screening Required</h3>
                                                                        <p className="text-muted-foreground max-w-xs mx-auto">
                                                                            To ensure high response rates, we ask candidates to answer 3 quick technical questions.
                                                                        </p>
                                                                    </div>
                                                                    <Button
                                                                        onClick={() => setIsInterviewOpen(true)}
                                                                        size="lg"
                                                                        className="w-full max-w-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-200 dark:shadow-none"
                                                                    >
                                                                        <Sparkles className="w-4 h-4 mr-2" /> Start AI Interview
                                                                    </Button>
                                                                    <p className="text-xs text-muted-foreground">Takes ~2 minutes • Results Instant</p>
                                                                </div>
                                                            ) : (
                                                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-4">
                                                                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center shrink-0">
                                                                            <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-300" />
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="font-bold text-green-800 dark:text-green-300">Verified & Pre-Vetted!</h4>
                                                                            <p className="text-sm text-green-700 dark:text-green-400">You scored <span className="font-bold">{interviewScore}/100</span>. This will be highlighted to the referrer.</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid gap-4">
                                                                        <div className="grid gap-2">
                                                                            <Label htmlFor="resume">Resume</Label>
                                                                            <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/20">
                                                                                <FileText className="w-5 h-5 text-indigo-500" />
                                                                                <span className="text-sm font-medium">My_Resume_v2.pdf</span>
                                                                                <Button variant="ghost" size="sm" className="ml-auto text-xs text-blue-600">Change</Button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="grid gap-2">
                                                                            <Label htmlFor="note">Why are you a good fit?</Label>
                                                                            <Textarea
                                                                                id="note"
                                                                                placeholder="e.g. I have 3 years of experience in React..."
                                                                                value={note}
                                                                                onChange={(e) => setNote(e.target.value)}
                                                                                className="min-h-[100px]"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <DialogFooter className="p-6 pt-0">
                                                            {interviewScore !== null && (
                                                                <Button onClick={handleRequest} className="bg-indigo-600 hover:bg-indigo-700 w-full" size="lg">Send Verified Request 🚀</Button>
                                                            )}
                                                        </DialogFooter>
                                                    </>
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Col: Walk-in Drives */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold flex items-center gap-2"><Megaphone className="w-5 h-5 animate-bounce" /> Live Walk-in Board</h3>
                            <p className="text-orange-100 text-sm mt-1 mb-4">Urgent hiring drives happening now.</p>

                            <Dialog open={isPostDriveOpen} onOpenChange={setIsPostDriveOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-full bg-white text-orange-600 hover:bg-white/90 font-bold shadow-md gap-2"><Plus className="w-4 h-4" /> Post a Drive</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Post a Walk-in Drive</DialogTitle>
                                        <DialogDescription>Share details about an urgent drive. Visible to everyone instantly.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="company">Company Name</Label>
                                            <Input id="company" value={driveForm.company} onChange={e => setDriveForm({ ...driveForm, company: e.target.value })} placeholder="e.g. TCS" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="location">Location</Label>
                                            <Input id="location" value={driveForm.location} onChange={e => setDriveForm({ ...driveForm, location: e.target.value })} placeholder="e.g. Pune Hinjewadi Phase 1" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="timing">Timing</Label>
                                            <Input id="timing" value={driveForm.timing} onChange={e => setDriveForm({ ...driveForm, timing: e.target.value })} placeholder="e.g. Tomorrow 10 AM - 5 PM" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="qualification">Qualification</Label>
                                            <Input id="qualification" value={driveForm.qualification} onChange={e => setDriveForm({ ...driveForm, qualification: e.target.value })} placeholder="e.g. BE/Btech 2024/25 Batch" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handlePostDrive} disabled={isPostingDrive} className="bg-orange-600 hover:bg-orange-700">{isPostingDrive ? "Posting..." : "Post Live 🚀"}</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    </div>

                    <div className="space-y-4 max-h-[800px] overflow-y-auto pr-1 custom-scrollbar">
                        {drives.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-xl border-2 border-dashed border-border">
                                <Megaphone className="w-8 h-8 opacity-20 mx-auto mb-2" />
                                <p>No active drives.</p>
                                <p className="text-xs">Be the first to post!</p>
                            </div>
                        ) : (
                            drives.map(drive => (
                                <WalkInDriveCard key={drive.id} drive={drive} />
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
