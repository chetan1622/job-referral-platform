import { Metadata } from "next"
import db from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Users } from "lucide-react"

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Leaderboard | HireHunt",
    description: "Top referring employees",
}

export default async function LeaderboardPage() {
    // Fetch employees and their accepted referrals count
    // Logic: User -> Job -> Referral (status='Accepted')
    const employees = await db.user.findMany({
        where: { role: 'employee' },
        include: {
            postedJobs: {
                include: {
                    referrals: {
                        where: { status: 'Accepted' }
                    }
                }
            }
        }
    })

    // Calculate scores
    const leaderboardData = employees.map(emp => {
        const referralsCount = emp.postedJobs.reduce((acc, job) => acc + job.referrals.length, 0)
        return {
            id: emp.id,
            name: emp.name || "Anonymous Employee",
            email: emp.email,
            image: emp.image,
            score: referralsCount,
            company: "Tech Corp" // Placeholder as Company isn't on User model directly in schema, usually inferred or storing relevant one
        }
    })
        .sort((a, b) => b.score - a.score)
        .slice(0, 10) // Top 10

    const topThree = leaderboardData.slice(0, 3)
    const rest = leaderboardData.slice(3)

    return (
        <div className="space-y-8 pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Referral Leaderboard</h1>
                <p className="text-muted-foreground">Recognizing our top contributors who help great talent find great jobs.</p>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-12">
                {/* 2nd Place */}
                <div className="order-2 md:order-1">
                    {topThree[1] && <WinnerCard user={topThree[1]} rank={2} icon={Medal} color="text-slate-400" bgColor="bg-slate-100 dark:bg-slate-800" />}
                </div>

                {/* 1st Place */}
                <div className="order-1 md:order-2 -mt-10">
                    {topThree[0] && <WinnerCard user={topThree[0]} rank={1} icon={Trophy} color="text-yellow-500" bgColor="bg-yellow-100 dark:bg-yellow-900/30" scale={true} />}
                </div>

                {/* 3rd Place */}
                <div className="order-3 md:order-3">
                    {topThree[2] && <WinnerCard user={topThree[2]} rank={3} icon={Award} color="text-amber-700" bgColor="bg-amber-100 dark:bg-amber-900/30" />}
                </div>
            </div>

            {/* List View */}
            <Card className="border-none shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-indigo-500" />
                        Top Referrers
                    </CardTitle>
                    <CardDescription>
                        Employees with the highest successful referral rates this month.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {rest.length > 0 ? rest.map((user, index) => (
                            <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="font-bold text-muted-foreground w-6 text-center">{index + 4}</div>
                                    <Avatar>
                                        <AvatarImage src={user.image || ""} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">{user.name}</div>
                                        <div className="text-xs text-muted-foreground">{user.company}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 font-bold">
                                    <span className="text-indigo-600 dark:text-indigo-400">{user.score}</span>
                                    <span className="text-xs text-muted-foreground font-normal">referrals</span>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-muted-foreground">
                                {topThree.length < 3 && topThree.length > 0 ? "No other referrers yet. Start referring!" : leaderboardData.length === 0 ? "No referrals yet! Be the first one." : ""}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function WinnerCard({ user, rank, icon: Icon, color, bgColor, scale = false }: { user: any, rank: number, icon: any, color: string, bgColor: string, scale?: boolean }) {
    return (
        <Card className={`border-none shadow-lg overflow-hidden relative ${scale ? 'transform md:-translate-y-4 md:scale-105 z-10' : ''}`}>
            <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${rank === 1 ? 'from-yellow-400 to-yellow-600' : rank === 2 ? 'from-slate-300 to-slate-500' : 'from-amber-600 to-amber-800'}`}></div>
            <CardContent className="flex flex-col items-center p-6 pt-10 text-center relative">
                <div className={`absolute top-4 right-4 ${color}`}>
                    <Icon className="w-8 h-8 opacity-20" />
                </div>
                <div className="relative mb-4">
                    <Avatar className={`w-24 h-24 border-4 ${rank === 1 ? 'border-yellow-400' : rank === 2 ? 'border-slate-300' : 'border-amber-700'}`}>
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${rank === 1 ? 'bg-yellow-500' : rank === 2 ? 'bg-slate-500' : 'bg-amber-700'}`}>
                        {rank}
                    </div>
                </div>

                <h3 className="font-bold text-lg mt-2">{user.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{user.company}</p>

                <div className={`px-4 py-2 rounded-full ${bgColor} ${color} font-bold flex items-center gap-2`}>
                    <Users className="w-4 h-4" /> {user.score} Referrals
                </div>
            </CardContent>
        </Card>
    )
}
