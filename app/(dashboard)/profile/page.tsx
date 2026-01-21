"use client"

import { useReferralContext } from "@/context/referral-context"
import { ProfileHeader } from "@/components/profile-header"
import { SeekerProfileView } from "@/components/seeker-profile-view"
import { EmployeeProfileView } from "@/components/employee-profile-view"
import { Loader2 } from "lucide-react"
import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function ProfilePageContent() {
    const { currentUser } = useReferralContext()
    const router = useRouter()
    const searchParams = useSearchParams()

    // In a real app, we might fetch specific profile data here
    // For now, we'll extend the currentUser from context with some mock data for the header

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading user data
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 800)
        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </div>
        )
    }

    // Extended mock data based on role
    const profileData = {
        name: currentUser.name,
        role: currentUser.role,
        email: currentUser.role === 'seeker' ? 'chetan.dev@example.com' : 'swati.tech@google.com',
        title: currentUser.role === 'seeker' ? 'Frontend Developer | React Specialist' : 'Senior Software Engineer at Google',
        location: currentUser.role === 'seeker' ? 'Bangalore, India' : 'Hyderabad/Remote',
        website: currentUser.role === 'seeker' ? 'https://chetan.dev' : undefined,
        // coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2000"
    }

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <ProfileHeader user={profileData} />

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {currentUser.role === 'seeker' ? (
                    <SeekerProfileView />
                ) : (
                    <EmployeeProfileView />
                )}
            </div>
        </div>
    )
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div className="flex h-[50vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /></div>}>
            <ProfilePageContent />
        </Suspense>
    )
}
