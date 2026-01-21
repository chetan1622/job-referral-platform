"use client"

import * as React from "react"
import { Check, X, ShieldAlert, Users, TrendingUp, AlertTriangle, Activity, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
    const [users, setUsers] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users')
            if (res.ok) {
                const data = await res.json()
                setUsers(data)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchUsers()
    }, [])

    const handleUpdateStatus = async (userId: string, newStatus: string, newRisk?: string) => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, status: newStatus, riskScore: newRisk })
            })
            if (res.ok) {
                // Optimistic update
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus, riskScore: newRisk || u.riskScore } : u))
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="space-y-8">
            {/* Admin Stats */}
            <div className="grid md:grid-cols-4 gap-6">
                <Card className="border-none bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-lg">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-indigo-100">Total Users</CardDescription>
                        <CardTitle className="text-4xl font-bold flex items-center gap-2">
                            {users.length} <Users className="w-6 h-6 opacity-70" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-indigo-100 font-medium">+12% from last month</div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-md bg-card">
                    <CardHeader className="pb-2">
                        <CardDescription>Active Job Posts</CardDescription>
                        <CardTitle className="text-4xl font-bold text-card-foreground flex items-center gap-2">
                            856 <Activity className="w-6 h-6 text-green-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-green-600 dark:text-green-400 font-medium">+54 new today</div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-md bg-card">
                    <CardHeader className="pb-2">
                        <CardDescription>Pending Approvals</CardDescription>
                        <CardTitle className="text-4xl font-bold text-orange-500 flex items-center gap-2">
                            {users.filter(u => u.status === 'Pending').length} <AlertTriangle className="w-6 h-6 opacity-70" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-orange-600 dark:text-orange-400 font-medium">Action required</div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-md bg-card border-l-4 border-l-red-500">
                    <CardHeader className="pb-2">
                        <CardDescription>Flagged Accounts</CardDescription>
                        <CardTitle className="text-4xl font-bold text-red-500 flex items-center gap-2">
                            {users.filter(u => u.status === 'Banned' || u.riskScore === 'High').length} <ShieldAlert className="w-6 h-6 opacity-70" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-red-600 dark:text-red-400 font-medium">High risk detected</div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-foreground">User Verification Queue</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2"><Filter className="w-4 h-4" /> Filter</Button>
                            <Button variant="outline" size="sm" className="gap-2"><Search className="w-4 h-4" /> Search</Button>
                        </div>
                    </div>

                    <Card className="border-none shadow-md overflow-hidden bg-card">
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-muted">
                                    <TableRow className="hover:bg-transparent border-border">
                                        <TableHead>User Details</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Company/Verification</TableHead>
                                        <TableHead>Risk Score</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id} className="hover:bg-muted/50 border-border">
                                            <TableCell className="font-medium">
                                                <div className="font-bold text-foreground">{user.name}</div>
                                                <div className="text-xs text-muted-foreground">{user.email}</div>
                                                <div className="text-[10px] text-muted-foreground mt-0.5">Joined {user.joined}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className={user.role === 'Employee' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-secondary text-secondary-foreground'}>
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium text-foreground">{user.company}</div>
                                                <div className="text-xs text-muted-foreground">{user.status}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {user.riskScore === "High" ? (
                                                        <Badge variant="destructive" className="gap-1">
                                                            <ShieldAlert className="w-3 h-3" /> High Risk
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                                                            Low Risk
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    {user.status !== 'Approved' && (
                                                        <Button onClick={() => handleUpdateStatus(user.id, 'Approved', 'Low')} size="sm" className="bg-green-600 hover:bg-green-700 h-8 gap-1">
                                                            <Check className="w-4 h-4" /> Approve
                                                        </Button>
                                                    )}
                                                    {user.status !== 'Banned' && (
                                                        <Button onClick={() => handleUpdateStatus(user.id, 'Banned', 'High')} size="sm" variant="ghost" className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 h-8 gap-1">
                                                            <X className="w-4 h-4" /> Ban
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
