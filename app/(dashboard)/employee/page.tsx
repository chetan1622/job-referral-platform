"use client"

import * as React from "react"
import { Check, X, FilePlus, User, Search, MessageSquare, Linkedin, Trophy, Target, Award, Sparkles, TrendingUp, MapPin } from "lucide-react"
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

export default function EmployeeDashboard() {
    const { requests, updateRequestStatus, postJob } = useReferralContext()
    const { toast } = useToast()
    const [isPostJobOpen, setIsPostJobOpen] = React.useState(false)
    const [isPosting, setIsPosting] = React.useState(false)

    // Form State
    const [jobForm, setJobForm] = React.useState({
        title: "",
        company: "Acme Corp", // Hardcoded for employee context, or dynamic
        location: "Bangalore, India", // Default
        salary: "",
        type: "Full-time",
        description: "",
        validityDays: "30"
    })

    // Filter only pending requests for the main view
    const pendingRequests = requests.filter(req => req.status === 'Pending')

    const handleAction = (id: string, status: 'Accepted' | 'Rejected') => {
        updateRequestStatus(id, status)
        toast({
            title: status === 'Accepted' ? "Referral Accepted! 🎉" : "Referral Rejected",
            description: status === 'Accepted'
                ? "The candidate has been notified and moved to the interview pipeline."
                : "The request has been closed."
        })
    }

    const handlePostJob = async () => {
        setIsPosting(true)
        try {
            const success = await postJob({
                title: jobForm.title,
                salary: jobForm.salary,
                description: jobForm.description,
                company: jobForm.company,
                location: jobForm.location,
                type: jobForm.type,
                validityDays: parseInt(jobForm.validityDays)
            })

            if (success) {
                toast({ title: "Job Posted Successfully! 🚀", description: "Referrals will start rolling in soon. Valid for " + jobForm.validityDays + " days." })
                setIsPostJobOpen(false)
                setJobForm({ ...jobForm, title: "", salary: "", description: "", validityDays: "30" }) // Reset
            } else {
                toast({ title: "Failed to Post Job", variant: "destructive" })
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsPosting(false)
        }
    }

    // Helper to check expiry
    const isJobExpired = (jobId: string) => {
        const job = requests.find(r => r.jobId === jobId)?.jobTitle ? requests.find(r => r.jobId === jobId) : null;
        // The context 'jobs' array is what we really need, but it's not destructured above.
        // Let's rely on the fact that we can get jobs from context.
        return false;
    }
    // Access jobs from context
    const { jobs } = useReferralContext()

    const checkExpiry = (jobId: string) => {
        const job = jobs.find(j => j.id === jobId);
        if (!job || !job.expiryDate) return false;
        return new Date(job.expiryDate) < new Date();
    }

    return (
        <div className="space-y-8">
            <Toaster />
            {/* Gamified Stats */}
            <div className="grid md:grid-cols-4 gap-6">
                <Card className="col-span-1 md:col-span-1 border-none bg-gradient-to-br from-amber-200 via-yellow-400 to-yellow-600 text-yellow-950 relative overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
                    <div className="absolute top-0 right-0 p-4 opacity-30">
                        <Trophy className="w-24 h-24 -mr-6 -mt-6 rotate-12" />
                    </div>
                    <CardHeader className="pb-2 relative z-10">
                        <CardDescription className="text-yellow-900 font-bold uppercase tracking-wider text-xs">Current Rank</CardDescription>
                        <CardTitle className="text-3xl font-bold flex items-center gap-2">Gold Tier 🥇</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-sm font-medium text-yellow-900/80 mb-2">Top 5% of Referrers</div>
                        <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
                            <div className="h-full bg-white/50 w-[85%] rounded-full"></div>
                        </div>
                        <div className="text-xs mt-1 text-right text-yellow-900/70">150 pts to Platinum</div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-card">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-muted-foreground font-semibold uppercase tracking-wider text-xs">Total Referrals</CardDescription>
                        <CardTitle className="text-4xl font-bold text-card-foreground">24</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/40 w-fit px-2 py-1 rounded">
                            <TrendingUp className="w-3 h-3" /> +4 this month
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-card">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-muted-foreground font-semibold uppercase tracking-wider text-xs">Successful Hires</CardDescription>
                        <CardTitle className="text-4xl font-bold text-card-foreground">8</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/40 w-fit px-2 py-1 rounded">
                            <Award className="w-3 h-3" /> ₹40k Bonus Earned
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-card border-l-4 border-l-orange-500">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-muted-foreground font-semibold uppercase tracking-wider text-xs">Action Required</CardDescription>
                        <CardTitle className="text-4xl font-bold text-orange-600">{pendingRequests.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-orange-600/80 font-medium">Pending Requests</div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-indigo-900 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="relative z-10">
                    <h3 className="text-xl font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-yellow-400" /> Looking for Talent?</h3>
                    <p className="text-indigo-200 text-sm mt-1">Post an internal job opening to get matched with pre-vetted candidates.</p>
                </div>
                <Dialog open={isPostJobOpen} onOpenChange={setIsPostJobOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-white text-indigo-900 hover:bg-white/90 font-bold gap-2 shadow-lg shadow-black/20"><FilePlus className="w-4 h-4" /> Post New Job</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Post a Job Vacancy</DialogTitle>
                            <DialogDescription>
                                Post an internal opening to find the best referrals within the network.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="role" className="text-right">Job Role</Label>
                                <Input id="role" value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} placeholder="e.g. Frontend Dev" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="salary" className="text-right">Salary</Label>
                                <Input id="salary" value={jobForm.salary} onChange={e => setJobForm({ ...jobForm, salary: e.target.value })} placeholder="e.g. 10-15 LPA" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="validity" className="text-right">Validity</Label>
                                <select
                                    id="validity"
                                    className="col-span-3 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={jobForm.validityDays}
                                    onChange={e => setJobForm({ ...jobForm, validityDays: e.target.value })}
                                >
                                    {Array.from({ length: 90 }, (_, i) => i + 1).map(day => (
                                        <option key={day} value={day}>{day} Day{day > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="company" className="text-right">Company</Label>
                                <Input id="company" value={jobForm.company} onChange={e => setJobForm({ ...jobForm, company: e.target.value })} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="location" className="text-right">Location</Label>
                                <Input id="location" value={jobForm.location} onChange={e => setJobForm({ ...jobForm, location: e.target.value })} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="desc" className="text-right">Description</Label>
                                <Textarea id="desc" value={jobForm.description} onChange={e => setJobForm({ ...jobForm, description: e.target.value })} placeholder="Job details..." className="col-span-3 min-h-[100px]" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handlePostJob} disabled={isPosting} className="bg-indigo-600 hover:bg-indigo-700">
                                {isPosting ? "Posting..." : "Post Job"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Requests List */}
            <div>
                <h3 className="text-xl font-bold text-foreground mb-6">Pending Referral Requests</h3>

                {pendingRequests.length === 0 ? (
                    <div className="text-center py-12 bg-card rounded-xl border border-border">
                        <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">All caught up!</h3>
                        <p className="text-muted-foreground">No pending requests at the moment.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {pendingRequests.map((req) => (
                            <div key={req.id} className="bg-card rounded-xl border border-border p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 right-0 flex gap-2">
                                    {checkExpiry(req.jobId) ? (
                                        <div className="bg-red-500 text-white px-3 py-1 rounded-bl-xl text-xs font-bold shadow-sm">
                                            Referral Expired
                                        </div>
                                    ) : (
                                        <div className="bg-blue-500 text-white px-3 py-1 rounded-bl-xl text-xs font-bold shadow-sm">
                                            New Request
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-14 h-14 rounded-full border-2 border-background shadow-md overflow-hidden relative bg-secondary flex items-center justify-center text-xl font-bold text-muted-foreground">
                                        {req.seekerName?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-lg text-foreground">
                                                {req.seekerName}
                                            </h4>

                                            {/* AI Score Badge */}
                                            {req.score !== undefined && req.score > 0 && (
                                                <Badge variant={req.score >= 80 ? "default" : req.score >= 50 ? "secondary" : "outline"} className={`
                                                    ${req.score >= 80 ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : ''}
                                                    ${req.score >= 50 && req.score < 80 ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' : ''}
                                                `}>
                                                    <Sparkles className="w-3 h-3 mr-1" />
                                                    {req.score}% Match
                                                </Badge>
                                            )}

                                            {/* ROOTS CONNECTOR BADGES */}
                                            {/* For demo, we assume the logged-in employee is from 'IIT Delhi' and 'Mumbai' if not set, or we can fetch it.
                                                Let's assume the Demo Employee has: College: "IIT Delhi", Hometown: "Mumbai"
                                                In a real app, we would compare with `currentUserProfile` state.
                                            */}
                                            {(req as any).seeker?.college && (req as any).seeker?.college?.includes("IIT") && (
                                                <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">
                                                    <Award className="w-3 h-3 mr-1" /> Alumni
                                                </Badge>
                                            )}
                                            {(req as any).seeker?.hometown && (req as any).seeker?.hometown?.toLowerCase() === "mumbai" && (
                                                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800">
                                                    <MapPin className="w-3 h-3 mr-1" /> Hometown
                                                </Badge>
                                            )}

                                        </div>
                                        <p className="text-sm text-muted-foreground font-medium mb-2">{req.seekerEmail} • <span className="text-foreground">2 mins ago</span></p>

                                        <div className="p-3 bg-muted rounded-lg border border-border mb-3">
                                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Requesting Referral For</p>
                                            <p className="font-semibold text-primary">{req.jobTitle}</p>
                                            {req.note && (
                                                <p className="text-sm text-foreground/80 mt-2 italic">"{req.note}"</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 min-w-[200px] justify-center border-l pl-0 md:pl-6 border-border">
                                    <div className="flex gap-2 w-full">
                                        <Button size="sm" variant="outline" className="flex-1 text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100">
                                            <Linkedin className="w-4 h-4 mr-1" /> Profile
                                        </Button>
                                        <Button size="sm" variant="outline" className="flex-1">
                                            Resume
                                        </Button>
                                    </div>
                                    <div className="flex gap-2 w-full">
                                        <Button onClick={() => handleAction(req.id, 'Accepted')} size="sm" variant="default" className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200">
                                            <Check className="w-4 h-4 mr-1" /> Accept
                                        </Button>
                                        <Button onClick={() => handleAction(req.id, 'Rejected')} size="sm" variant="destructive" className="flex-1 shadow-lg shadow-red-200">
                                            <X className="w-4 h-4 mr-1" /> Reject
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
