export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden isolate">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-violet-900 z-0"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                {/* 3D Glass Card Effect for Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 flex items-center justify-center text-white font-bold text-xl shadow-lg">J</div>
                            <span className="font-outfit font-bold text-2xl tracking-tight">HireHunt</span>
                        </div>
                        <h1 className="text-5xl font-outfit font-bold mb-6 leading-tight">Welcome to the <br />Future of Hiring.</h1>
                        <p className="text-xl opacity-90 font-light max-w-md">Join the thousands of freshers and professionals connecting daily through verified referrals.</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl max-w-lg">
                        <blockquote className="space-y-4">
                            <p className="text-lg italic font-medium leading-relaxed">"This platform changed my career trajectory. The verified referral system is a game changer."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/20"></div>
                                <div>
                                    <div className="font-bold">Anjali Sharma</div>
                                    <div className="text-xs opacity-75">Software Engineer at TechCorp</div>
                                </div>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center p-6 lg:p-12 bg-muted/20 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-50 pointer-events-none"></div>
                {children}
            </div>
        </div>
    )
}
