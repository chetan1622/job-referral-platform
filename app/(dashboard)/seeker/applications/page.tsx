"use client"

import { useReferralContext } from "@/context/referral-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Briefcase, CheckCircle2, XCircle, Clock, Building2, MapPin, CalendarDays, ArrowRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"

export default function ApplicationsPage() {
    const { requests, currentUser } = useReferralContext()

    // Filter requests for the current seeker
    // In a real app with proper auth, the API would only return mine.
    // For this demo, we filter by the mocked email or just show all for visibility if email doesn't match perfectly.
    // Given the context mocks "Chetan User", let's filter loosely or show all if specifically seeker.
    const myApplications = requests.filter(req =>
        req.seekerEmail === currentUser.email || req.seeker?.email === currentUser.email
    )

    const columns = [
        {
            id: 'pending',
            title: 'Applied / In Review',
            status: 'Pending',
            icon: Clock,
            color: 'text-amber-500',
            bg: 'bg-amber-50 dark:bg-amber-900/20',
            borderColor: 'border-amber-200 dark:border-amber-800'
        },
        {
            id: 'accepted',
            title: 'Referred!',
            status: 'Accepted',
            icon: CheckCircle2,
            color: 'text-green-500',
            bg: 'bg-green-50 dark:bg-green-900/20',
            borderColor: 'border-green-200 dark:border-green-800'
        },
        {
            id: 'rejected',
            title: 'Not Selected',
            status: 'Rejected',
            icon: XCircle,
            color: 'text-red-500',
            bg: 'bg-red-50 dark:bg-red-900/20',
            borderColor: 'border-red-200 dark:border-red-800'
        }
    ]

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Application Tracker</h1>
                <p className="text-muted-foreground">Monitor the status of your referral requests and job applications.</p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
                {columns.map((col) => {
                    const columnItems = myApplications.filter(app => app.status === col.status)

                    return (
                        <div key={col.id} className={`flex flex-col h-full rounded-xl border-2 ${col.borderColor} ${col.bg} p-2`}>
                            <div className="flex items-center gap-2 p-3 pb-4">
                                <div className={`p-2 rounded-lg bg-background ${col.color} shadow-sm`}>
                                    <col.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">{col.title}</h3>
                                    <p className="text-xs text-muted-foreground font-medium">{columnItems.length} applications</p>
                                </div>
                            </div>

                            <ScrollArea className="flex-1 pr-3">
                                <div className="space-y-3 pb-4">
                                    {columnItems.length === 0 ? (
                                        <div className="h-32 flex flex-col items-center justify-center text-muted-foreground/50 border-2 border-dashed border-muted-foreground/20 rounded-lg m-2">
                                            <col.icon className="w-8 h-8 mb-2 opacity-20" />
                                            <p className="text-sm font-medium">No applications</p>
                                        </div>
                                    ) : (
                                        columnItems.map((app, index) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                key={app.id}
                                            >
                                                <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-background/80 backdrop-blur-sm">
                                                    <CardHeader className="p-4 pb-2">
                                                        <div className="flex justify-between items-start">
                                                            <div className="font-bold text-base line-clamp-1" title={app.jobTitle || app.job?.title}>
                                                                {app.jobTitle || app.job?.title}
                                                            </div>
                                                            {app.score && (
                                                                <Badge variant="secondary" className={`text-[10px] px-1.5 h-5 ${app.score >= 80 ? 'bg-green-100 text-green-700' :
                                                                        app.score >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100'
                                                                    }`}>
                                                                    {app.score}% Match
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <CardDescription className="text-xs flex items-center gap-1 mt-1">
                                                            <Building2 className="w-3 h-3" /> {app.job?.company || "Company"}
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="p-4 pt-1">
                                                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                                                            <span className="flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded">
                                                                <MapPin className="w-3 h-3" /> {app.job?.location || "Remote"}
                                                            </span>
                                                            <span className="flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded">
                                                                <CalendarDays className="w-3 h-3" />
                                                                {app.timestamp || app.createdAt ? formatDistanceToNow(new Date(app.timestamp || app.createdAt), { addSuffix: true }) : 'Recently'}
                                                            </span>
                                                        </div>
                                                        {app.note && (
                                                            <div className="text-xs bg-muted/50 p-2 rounded text-muted-foreground italic line-clamp-2">
                                                                "{app.note}"
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                    {col.id === 'accepted' && (
                                                        <CardFooter className="p-4 pt-0">
                                                            <div className="w-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs p-2 rounded flex items-center justify-center gap-2 font-medium">
                                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                                Referral Successful
                                                            </div>
                                                        </CardFooter>
                                                    )}
                                                </Card>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
