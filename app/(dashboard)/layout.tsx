"use client"

import Link from "next/link"
import { Bell, Home, Settings, LogOut, User, Briefcase, FileText, Shield, Search } from "lucide-react"
import { ReferralProvider } from "@/context/referral-context"
import { signOut } from "next-auth/react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ReferralProvider>
            <div className="min-h-screen grid grid-cols-[280px_1fr] bg-muted/20">
                {/* Premium Sidebar */}
                <aside className="border-r border-white/10 bg-[#0f172a] text-white hidden md:flex flex-col relative overflow-hidden">
                    {/* Gradient Accents */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500 blur-[80px]"></div>
                        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500 blur-[80px]"></div>
                    </div>

                    <div className="h-20 flex items-center px-8 border-b border-white/10 relative z-10">
                        <Link href="/" className="flex items-center gap-3 font-bold text-xl">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">J</div>
                            <span className="font-outfit tracking-tight">HireHunt</span>
                        </Link>
                    </div>

                    <div className="flex-1 py-8 px-4 space-y-6 relative z-10">
                        <div>
                            <div className="text-xs font-bold text-indigo-300/70 mb-4 pl-4 uppercase tracking-wider">Main Menu</div>
                            <nav className="space-y-1">
                                <Link href="/seeker" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-medium border border-white/5 shadow-inner transition-all hover:bg-white/20">
                                    <Home className="w-5 h-5 text-indigo-300" /> Dashboard
                                </Link>
                                <Link href="/seeker/jobs" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white font-medium transition-all">
                                    <Briefcase className="w-5 h-5 text-slate-400 group-hover:text-indigo-300" /> Find Jobs
                                </Link>
                                <Link href="/seeker/applications" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white font-medium transition-all">
                                    <FileText className="w-5 h-5 text-slate-400 group-hover:text-indigo-300" /> My Requests
                                </Link>
                            </nav>
                        </div>

                        <div>
                            <div className="text-xs font-bold text-indigo-300/70 mb-4 pl-4 uppercase tracking-wider">Switch View (Demo)</div>
                            <nav className="space-y-1">
                                <Link href="/employee" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white font-medium transition-all">
                                    <User className="w-5 h-5 text-slate-400" /> Employee Portal
                                </Link>
                                <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white font-medium transition-all">
                                    <Shield className="w-5 h-5 text-slate-400" /> Admin Portal
                                </Link>
                            </nav>
                        </div>
                    </div>

                    <div className="p-6 border-t border-white/10 relative z-10 space-y-2">
                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white font-medium transition-all">
                            <User className="w-5 h-5" /> My Profile
                        </Link>
                        <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 text-slate-400 font-medium transition-all">
                            <LogOut className="w-5 h-5" /> Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex flex-col h-screen overflow-hidden bg-muted/20 relative">
                    {/* Background Grain/Noise or Gradient */}
                    <div className="absolute inset-0 bg-white/50 pointer-events-none"></div>

                    <header className="h-20 flex items-center justify-between px-8 relative z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
                            <p className="text-sm text-slate-500">Welcome back, Chetan</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64 text-sm"
                                />
                            </div>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors relative">
                                <Bell className="w-5 h-5 text-slate-600" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>
                            <Link href="/dashboard/profile" className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-[2px] cursor-pointer">
                                <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Chetan" alt="User" className="h-full w-full object-cover" />
                                </div>
                            </Link>
                        </div>
                    </header>

                    <div className="flex-1 overflow-auto p-8 relative z-10">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </ReferralProvider>
    )
}
