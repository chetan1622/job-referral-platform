"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, Star, Users, Briefcase, Award } from "lucide-react"

export function EmployeeProfileView() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Reputation & Badges */}
            <div className="space-y-6">
                <Card className="overflow-hidden border-yellow-500/20">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Award className="w-32 h-32 text-yellow-500" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            Reputation Score
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center py-4">
                            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="60" stroke="#f1f5f9" strokeWidth="8" fill="none" />
                                    <circle cx="64" cy="64" r="60" stroke="#fbbf24" strokeWidth="8" fill="none" strokeDasharray="377" strokeDashoffset="37" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-slate-900">920</span>
                                    <span className="text-xs font-medium text-slate-400 uppercase">Points</span>
                                </div>
                            </div>
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 border-0">
                                Gold Tier Referrer
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: Users, color: "text-blue-500", bg: "bg-blue-50", label: "Top Recruiter" },
                                { icon: Shield, color: "text-green-500", bg: "bg-green-50", label: "Verified" },
                                { icon: Star, color: "text-yellow-500", bg: "bg-yellow-50", label: "5 Star" },
                            ].map((badge, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-2 rounded-xl border border-slate-100 bg-slate-50/50">
                                    <div className={`w-10 h-10 ${badge.bg} rounded-full flex items-center justify-center mb-2`}>
                                        <badge.icon className={`w-5 h-5 ${badge.color}`} />
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-600 leading-tight">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Referral Impact */}
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Referral Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <p className="text-sm text-slate-500 mb-1">Pending Requests</p>
                                <p className="text-2xl font-bold text-slate-900">5</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <p className="text-sm text-slate-500 mb-1">Referrals Made</p>
                                <p className="text-2xl font-bold text-indigo-600">24</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <p className="text-sm text-slate-500 mb-1">Successful Hires</p>
                                <p className="text-2xl font-bold text-green-600">8</p>
                            </div>
                        </div>

                        <h4 className="font-medium text-sm text-slate-900 mb-4">Latest Activity</h4>
                        <div className="space-y-4">
                            {[
                                { action: "Referred", candidate: "Rohan Das", role: "Software Engineer", time: "2 hours ago" },
                                { action: "Accepted", candidate: "Priya Sharma", role: "Product Manager", time: "1 day ago" },
                                { action: "Hired", candidate: "Amit Kumar", role: "DevOps Engineer", time: "3 days ago" },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                                            {activity.candidate.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">
                                                <span className="text-indigo-600">{activity.action}</span> {activity.candidate}
                                            </p>
                                            <p className="text-xs text-slate-500">for {activity.role}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
