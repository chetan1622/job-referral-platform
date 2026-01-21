"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Download, Briefcase, GraduationCap, Trophy } from "lucide-react"

export function SeekerProfileView() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Stats & Skills */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Profile Strength</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Completion</span>
                                <span className="font-bold text-indigo-600">85%</span>
                            </div>
                            <Progress value={85} className="h-2" />
                            <p className="text-xs text-slate-500">
                                Add your certifications to reach 100%
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "Figma"].map((skill) => (
                                <Badge key={skill} variant="secondary" className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Resume</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50 flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-red-500">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium truncate">Chetan_Frontend_Resume.pdf</p>
                                <p className="text-xs text-slate-500">Updated 2 days ago</p>
                            </div>
                            <Button size="icon" variant="ghost">
                                <Download className="w-4 h-4 text-slate-400" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Experience & Education */}
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-indigo-500" />
                            Experience
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative pl-6 border-l-2 border-slate-100 space-y-8">
                            <div className="relative">
                                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-indigo-500 bg-white"></div>
                                <h3 className="font-bold text-slate-900">Frontend Developer Intern</h3>
                                <p className="text-slate-500 text-sm">TechCorp Solutions • Bangalore</p>
                                <p className="text-xs text-slate-400 mb-2">Jun 2023 - Present</p>
                                <p className="text-sm text-slate-600">
                                    Developed responsive web applications using React and Tailwind CSS. Collaborated with UX designers to implement pixel-perfect interfaces.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-slate-300 bg-white"></div>
                                <h3 className="font-bold text-slate-900">Web Development Freelancer</h3>
                                <p className="text-slate-500 text-sm">Self-Employed</p>
                                <p className="text-xs text-slate-400 mb-2">Jan 2023 - May 2023</p>
                                <p className="text-sm text-slate-600">
                                    Built portfolio websites for local businesses and improved page load times by 40%.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-purple-500" />
                            Education
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl">🎓</div>
                            <div>
                                <h3 className="font-bold text-slate-900">B.Tech in Computer Science</h3>
                                <p className="text-slate-500 text-sm">Indian Institute of Technology, Delhi</p>
                                <p className="text-xs text-slate-400">2020 - 2024 • CGPA: 8.9</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
