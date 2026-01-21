"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export type Job = {
    id: string
    title: string
    company: string
    location: string
    salary: string
    type: string
    description?: string
    validityDays?: number
    expiryDate?: Date
}

export type ReferralStatus = 'Pending' | 'Accepted' | 'Rejected'

export type ReferralRequest = {
    id: string
    jobId: string
    jobTitle?: string // Joined from relation
    seekerName?: string
    seekerEmail?: string
    status: ReferralStatus
    resumeUrl?: string
    note?: string

    timestamp: Date
    createdAt?: Date // API often returns this key
    score?: number

    // Extended types for UI that might be populated
    seeker?: {
        email: string
        name?: string
    }
    job?: {
        title: string
        company: string
        location: string
    }
}

type ReferralContextType = {
    jobs: Job[]
    requests: ReferralRequest[]
    requestReferral: (jobId: string, note: string) => void
    updateRequestStatus: (requestId: string, status: ReferralStatus) => void
    searchJobs: (query: string) => Promise<void>
    postJob: (job: Omit<Job, 'id'>) => Promise<boolean>
    currentUser: { name: string; email: string; role: 'seeker' | 'employee' }
    isLoading: boolean
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined)

export function ReferralProvider({ children }: { children: ReactNode }) {
    const [jobs, setJobs] = useState<Job[]>([])
    const [requests, setRequests] = useState<ReferralRequest[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Mock current user
    const currentUser = {
        name: "Chetan User",
        email: "chetan@example.com",
        role: "seeker" as const
    }

    // Fetch Jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch('/api/jobs');
                if (res.ok) {
                    const data = await res.json();
                    setJobs(data);
                }
            } catch (error) {
                console.error("Failed to fetch jobs", error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchRequests = async () => {
            try {
                const res = await fetch('/api/referrals');
                if (res.ok) {
                    const data = await res.json();
                    setRequests(data);
                }
            } catch (error) {
                console.error("Failed to fetch referrals", error);
            }
        }

        fetchJobs();
        fetchRequests();
    }, []);

    const searchJobs = async (query: string) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (query) params.append('q', query);

            const res = await fetch(`/api/jobs/search?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setJobs(data);
            }
        } catch (error) {
            console.error("Failed to search jobs", error);
        } finally {
            setIsLoading(false);
        }
    };

    const requestReferral = async (jobId: string, note: string) => {
        try {
            const res = await fetch('/api/referrals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobId,
                    note,
                    seekerName: currentUser.name,
                    seekerEmail: currentUser.email
                })
            });

            if (res.ok) {
                const newReferral = await res.json();
                // Manually add job title for UI since API might not return included relation immediately in the simpler response
                // or we re-fetch. For optimist update:
                const job = jobs.find(j => j.id === jobId);
                const completeReferral = {
                    ...newReferral,
                    jobTitle: job?.title,
                    timestamp: new Date(newReferral.createdAt || Date.now()) // Ensure date compatibility
                };

                setRequests(prev => [completeReferral, ...prev]);
            }
        } catch (error) {
            console.error("Failed to request referral", error);
        }
    }

    const postJob = async (jobData: Omit<Job, 'id'>) => {
        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jobData)
            });

            if (res.ok) {
                const newJob = await res.json();
                setJobs(prev => [newJob, ...prev]);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to post job", error);
            return false;
        }
    }

    const updateRequestStatus = async (requestId: string, status: ReferralStatus) => {
        try {
            const res = await fetch(`/api/referrals/${requestId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                setRequests(prev => prev.map(req =>
                    req.id === requestId ? { ...req, status } : req
                ));
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    }

    return (
        <ReferralContext.Provider value={{
            jobs,
            requests,
            requestReferral,
            updateRequestStatus,
            searchJobs,
            postJob,
            currentUser,
            isLoading
        }}>
            {children}
        </ReferralContext.Provider>
    )
}

export function useReferralContext() {
    const context = useContext(ReferralContext)
    if (context === undefined) {
        throw new Error('useReferralContext must be used within a ReferralProvider')
    }
    return context
}
