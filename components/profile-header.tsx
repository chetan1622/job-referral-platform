"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Mail, Link as LinkIcon, Edit2 } from "lucide-react"

interface ProfileHeaderProps {
    user: {
        name: string
        role: "seeker" | "employee" | "admin"
        title?: string
        location?: string
        email?: string
        website?: string
        avatar?: string
        coverImage?: string
    }
}


import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ProfileHeader({ user: initialUser }: ProfileHeaderProps) {
    const [user, setUser] = React.useState(initialUser)
    const [isOpen, setIsOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const { toast } = useToast()

    // Form state
    const [formData, setFormData] = React.useState({
        name: user.name,
        skills: "", // Initialize properly in useEffect if we had skills passed in props
        college: "", // Initialize properly in useEffect if we had college passed in props
        hometown: "" // Initialize properly in useEffect if we had hometown passed in props
    })

    // Simplification: In a real app we'd pass skills down. For now we just allow adding them.

    const handleSave = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    name: formData.name,
                    skills: formData.skills,
                    college: formData.college,
                    hometown: formData.hometown
                })
            })

            if (res.ok) {
                toast({ title: "Profile Updated", description: "Your changes have been saved." })
                setUser(prev => ({ ...prev, name: formData.name }))
                setIsOpen(false)
            } else {
                toast({ title: "Error", description: "Failed to update profile.", variant: "destructive" })
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative mb-8 rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                {user.coverImage && (
                    <img
                        src={user.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                    />
                )}
            </div>

            <div className="px-8 pb-8">
                <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-6 gap-6">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-32 h-32 rounded-3xl border-4 border-white bg-white p-1 shadow-lg">
                            <img
                                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                alt={user.name}
                                className="w-full h-full rounded-2xl object-cover bg-slate-100"
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 pt-16 md:pt-0">
                        <h1 className="text-3xl font-bold text-slate-900 font-outfit">{user.name}</h1>
                        <p className="text-lg text-slate-500 font-medium">{user.title || "Member"}</p>

                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
                            {user.location && (
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" />
                                    {user.location}
                                </div>
                            )}
                            {user.email && (
                                <div className="flex items-center gap-1.5">
                                    <Mail className="w-4 h-4" />
                                    {user.email}
                                </div>
                            )}
                            {user.website && (
                                <div className="flex items-center gap-1.5">
                                    <LinkIcon className="w-4 h-4" />
                                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
                                        Portfolio
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-4 md:mt-0">
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="gap-2 rounded-full">
                                    <Edit2 className="w-4 h-4" />
                                    Edit Profile
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Profile</DialogTitle>
                                    <DialogDescription>Update your personal details and skills.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="college">College/University</Label>
                                            <Input id="college" placeholder="e.g. IIT Delhi" value={formData.college} onChange={e => setFormData({ ...formData, college: e.target.value })} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="hometown">Hometown</Label>
                                            <Input id="hometown" placeholder="e.g. Mumbai" value={formData.hometown} onChange={e => setFormData({ ...formData, hometown: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="skills">Skills (Comma separated)</Label>
                                        <Textarea
                                            id="skills"
                                            placeholder="React, Node.js, Design..."
                                            value={formData.skills}
                                            onChange={e => setFormData({ ...formData, skills: e.target.value })}
                                        />
                                        <p className="text-xs text-slate-500">These skills are used for AI Scoring.</p>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleSave} disabled={isLoading}>
                                        {isLoading ? "Saving..." : "Save Changes"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}
