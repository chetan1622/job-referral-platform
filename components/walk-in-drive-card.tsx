"use client"

import { MapPin, Clock, Building2, GraduationCap, Megaphone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface WalkInDriveProps {
    company: string
    location: string
    timing: string
    qualification: string
    postedBy: {
        name: string | null
        image: string | null
    }
}

export function WalkInDriveCard({ drive }: { drive: WalkInDriveProps }) {
    return (
        <Card className="bg-card border-border overflow-hidden relative group hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-600"></div>
            <CardContent className="p-4 pl-5">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                            <Megaphone className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-lg text-foreground leading-tight">{drive.company}</h4>
                    </div>
                    <Badge variant="destructive" className="animate-pulse shadow-sm">Live</Badge>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="line-clamp-1">{drive.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{drive.timing}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="line-clamp-1">{drive.qualification}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                    <Avatar className="w-5 h-5">
                        <AvatarImage src={drive.postedBy.image || ""} />
                        <AvatarFallback className="text-[10px] bg-secondary">{drive.postedBy.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-muted-foreground">Posted by <span className="font-medium text-foreground">{drive.postedBy.name}</span></p>
                </div>
            </CardContent>
        </Card>
    )
}
