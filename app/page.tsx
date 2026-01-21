import Link from "next/link";
import { ArrowRight, CheckCircle, Briefcase, Users, ShieldCheck } from "lucide-react";
import { MncCompanyList } from "@/components/mnc-company-list";
import { HireHuntLogo } from "@/components/hire-hunt-logo";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-[#050510] text-white">
            {/* Navbar */}
            <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b border-white/10 glass-dark sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/40">
                        H
                    </div>
                    <span className="font-outfit font-bold text-2xl tracking-tight">HireHunt</span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-white/80">
                    <Link href="#features" className="text-sm font-medium hover:text-white transition-colors">Features</Link>
                    <Link href="#companies" className="text-sm font-medium hover:text-white transition-colors">Top Companies</Link>
                    <Link href="#about" className="text-sm font-medium hover:text-white transition-colors">About</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                        Log In
                    </Link>
                    <Link href="/register" className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25">
                        Get Started
                    </Link>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section with 3D Logo */}
                <section className="relative min-h-[800px] flex flex-col items-center justify-center overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050510] to-[#050510]"></div>
                    </div>

                    <div className="container z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center space-y-8">
                        {/* 3D Animated Logo Integration */}
                        <div className="w-full max-w-4xl -my-12 scale-90 md:scale-100">
                            <HireHuntLogo />
                        </div>

                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-4 backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
                            #1 Trusted Referral Platform for Freshers
                        </div>

                        <p className="max-w-[800px] text-lg md:text-xl text-slate-400">
                            Connect directly with verified employees from top Indian companies.
                            Skip the resume black hole and get referred for genuine openings.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/register?role=seeker" className="inline-flex h-12 items-center justify-center rounded-full bg-white text-indigo-900 px-8 text-base font-bold shadow-lg shadow-white/10 transition-transform hover:scale-105">
                                I'm a Job Seeker <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <Link href="/register?role=employee" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 text-base font-medium shadow-sm hover:bg-white/10 transition-transform hover:scale-105">
                                I want to Refer
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
                            <div className="glass-dark p-6 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Briefcase className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">500+</h3>
                                <p className="text-slate-400">Active Job Openings</p>
                            </div>
                            <div className="glass-dark p-6 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Users className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">20+</h3>
                                <p className="text-slate-400">Top Companies</p>
                            </div>
                            <div className="glass-dark p-6 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="w-6 h-6 text-orange-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">100%</h3>
                                <p className="text-slate-400">Verified Referrals</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 bg-[#0a0a16]">
                    <div className="container px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4">Why HireHunt?</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                We bridge the gap between talented freshers and top organizations through a secure, verified referral network.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: "Verified Employees", desc: "Only employees with verified corporate emails can post jobs." },
                                { title: "Direct Referrals", desc: "Get referred directly to the HR system, bypassing the queue." },
                                { title: "Fraud Protection", desc: "AI-driven detection for fake profiles and duplicate posts." },
                                { title: "Smart Matching", desc: "AI analyzes your resume to suggest the best referral matches." }
                            ].map((feature, i) => (
                                <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:shadow-xl hover:shadow-indigo-500/10 transition-all hover:-translate-y-1">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6">
                                        <CheckCircle className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-slate-400">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Top Companies Section */}
                <section id="companies" className="bg-[#050510] py-12">
                    <div className="container mx-auto px-4 mb-8 text-center text-white">
                        <h2 className="text-3xl font-bold font-outfit">Top Hiring Partners</h2>
                    </div>
                    <MncCompanyList />
                    <div className="container px-4 mx-auto text-center pb-24 mt-12">
                        <div className="p-6 bg-white/5 rounded-2xl inline-block border border-white/10">
                            <h4 className="font-bold text-lg mb-2">Partnered with</h4>
                            <div className="flex items-center gap-4 justify-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-black shadow-sm">LC</div>
                                <div className="text-left">
                                    <p className="font-bold">Lighthouse Communities</p>
                                    <p className="text-xs text-slate-400">Empowering Youth</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-12 border-t border-white/10 bg-[#050510] text-slate-400">
                <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    <p>© 2024 HireHunt. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Contact Support</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
