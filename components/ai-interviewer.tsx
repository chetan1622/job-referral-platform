"use client"

import * as React from "react"
import { Send, Bot, User, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Message {
    id: string
    role: "ai" | "user"
    content: string
}

interface AIInterviewerProps {
    jobTitle: string
    companyName: string
    onComplete: (score: number) => void
}

export function AIInterviewer({ jobTitle, companyName, onComplete }: AIInterviewerProps) {
    const [messages, setMessages] = React.useState<Message[]>([])
    const [input, setInput] = React.useState("")
    const [isTyping, setIsTyping] = React.useState(false)
    const [stage, setStage] = React.useState(0) // 0: Intro, 1: Q1, 2: Q2, 3: Q3, 4: Analyzing, 5: Result
    const scrollAreaRef = React.useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom
    React.useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages, isTyping])

    // Initial Greeting
    React.useEffect(() => {
        if (stage === 0 && messages.length === 0) {
            simulateAIResponse(`Hi! I'm the AI Recruiter for ${companyName}. I'd like to ask you 3 quick technical questions for the ${jobTitle} role. Are you ready?`)
        }
    }, [])

    const simulateAIResponse = (text: string, delay = 1000, nextStage?: number) => {
        setIsTyping(true)
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now().toString(), role: "ai", content: text }])
            setIsTyping(false)
            if (nextStage !== undefined) setStage(nextStage)
        }, delay)
    }

    const handleSend = () => {
        if (!input.trim()) return

        // Add user message
        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input }
        setMessages(prev => [...prev, userMsg])
        setInput("")

        // Process State Machine
        if (stage === 0) {
            // User said "Yes" (hopefully)
            simulateAIResponse("Great! Let's start. Q1: Can you describe a challenging technical problem you solved recently and how you approached it?", 1500, 1)
        } else if (stage === 1) {
            simulateAIResponse("Interesting approach. Q2: How do you handle state management in complex applications? Do you prefer any specific libraries?", 1500, 2)
        } else if (stage === 2) {
            simulateAIResponse("Got it. Last question Q3: What is your experience with optimization and performance tuning?", 1500, 3)
        } else if (stage === 3) {
            setIsTyping(true)
            setStage(4) // Analyzing
            setTimeout(() => {
                // Mock Analysis
                const score = 85 + Math.floor(Math.random() * 10) // Random high score for positive vibes
                setMessages(prev => [...prev, {
                    id: "final",
                    role: "ai",
                    content: `Thank you! I've analyzed your responses. \n\n**Assessment Score: ${score}/100**\n\nYou demonstrate strong problem-solving skills and good technical depth. I'm recommending your profile to the hiring manager.`
                }])
                setIsTyping(false)
                setStage(5) // Done
                onComplete(score)
            }, 3000)
        }
    }

    return (
        <Card className="w-full h-[600px] flex flex-col border-none shadow-none bg-background">
            <CardHeader className="border-b px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-sm font-bold">AI Interviewer</CardTitle>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Online
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 overflow-hidden relative">
                <ScrollArea ref={scrollAreaRef} className="h-full p-4">
                    <div className="flex flex-col gap-4 pb-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                            >
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback className={msg.role === 'ai' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}>
                                        {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className={`rounded-2xl px-4 py-2.5 text-sm ${msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-muted text-foreground rounded-tl-none'
                                        }`}
                                >
                                    {msg.content.split('\n').map((line, i) => (
                                        <p key={i} className={i > 0 ? 'mt-2' : ''}>
                                            {line.split('**').map((part, j) =>
                                                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                                            )}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-3 max-w-[85%]">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                                        <Bot className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 w-16">
                                    <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>

            <CardFooter className="p-4 border-t bg-muted/20">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex w-full gap-2"
                >
                    <Input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder={stage === 5 ? "Interview complete" : "Type your answer..."}
                        disabled={isTyping || stage === 4 || stage === 5}
                        className="bg-background border-muted-foreground/20 focus-visible:ring-indigo-500"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim() || isTyping || stage === 4 || stage === 5}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}
