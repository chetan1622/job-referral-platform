"use client"

import * as React from "react"
import { useReferralContext } from "@/context/referral-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Search, MoreVertical, Phone, Video } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

type Message = {
    id: string
    content: string
    senderId: string
    receiverId: string
    createdAt: string
    sender: { name: string, image?: string }
    receiver: { name: string, image?: string }
}

type Contact = {
    user: { id: string, name: string, image?: string, role?: string }
    lastMessage?: Message
}

export default function MessagesPage() {
    const { currentUser, requests } = useReferralContext()
    const [contacts, setContacts] = React.useState<Contact[]>([])
    const [activeContactId, setActiveContactId] = React.useState<string | null>(null)
    const [messages, setMessages] = React.useState<Message[]>([])
    const [input, setInput] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(true)
    const messagesEndRef = React.useRef<HTMLDivElement>(null)

    // Derived Contacts from Referrals (users we are connected with)
    // + Recent conversations from API
    const fetchContacts = React.useCallback(async () => {
        try {
            // 1. Fetch conversations from API
            const res = await fetch(`/api/messages?email=${currentUser.email}`)
            let apiContacts: Contact[] = []
            if (res.ok) {
                apiContacts = await res.json() // Returns { user, lastMessage }[]
            }

            // 2. Derive potential contacts from Requests (Employees <-> Seekers)
            // If I am seeker, contacts are Employees who posted jobs I applied to
            // If I am employee, contacts are Seekers who applied
            // Note: This logic depends on what 'requests' contains. 
            // Assuming 'requests' has job.postedBy (we might need to ensure API returns this)
            // For now, let's rely on apiContacts + manually merging simplistic derived ones if needed.

            // Actually, let's just stick to apiContacts for "active" chats.
            // But we need a way to START a chat.
            // For the demo, we likely have 0 messages initially.
            // Let's seed some contacts if empty? 
            // Or assume the user clicks "Message" from a profile/job card somewhere else (not implemented yet).
            // Let's seed "Referral Contacts" from the requests context.

            const referralContacts = new Map<string, Contact>()

            requests.forEach(req => {
                // If I'm seeker, find Employee (postedBy)
                // We need job.postedBy to be available. 
                // Let's assuming for now we just show who we have active referrals with.
                // The 'requests' object in context currently is: { jobId, seekerName, ... job: { company... } }
                // It doesn't seem to have 'postedBy' fully expanded deep enough?
                // Let's check `requests` structure in context (it has `job`).
            })

            // Simplified: Just use API contacts.
            setContacts(apiContacts)
        } catch (error) {
            console.error("Failed to fetch contacts", error)
        } finally {
            setIsLoading(false)
        }
    }, [currentUser.email, requests])

    const fetchMessages = React.useCallback(async () => {
        if (!activeContactId) return
        try {
            const res = await fetch(`/api/messages?email=${currentUser.email}&otherUserId=${activeContactId}`)
            if (res.ok) {
                const data = await res.json()
                setMessages(data)
            }
        } catch (error) {
            console.error("Failed to fetch messages", error)
        }
    }, [activeContactId, currentUser.email])

    // Poll for messages
    React.useEffect(() => {
        fetchContacts()
        const contactInterval = setInterval(fetchContacts, 10000)

        return () => clearInterval(contactInterval)
    }, [fetchContacts])

    React.useEffect(() => {
        fetchMessages()
        const msgInterval = setInterval(fetchMessages, 3000) // Poll faster for active chat
        return () => clearInterval(msgInterval)
    }, [fetchMessages])

    // Scroll to bottom
    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || !activeContactId) return

        const optimisticMsg: Message = {
            id: Date.now().toString(),
            content: input,
            senderId: "temp-me",
            receiverId: activeContactId,
            createdAt: new Date().toISOString(),
            sender: { name: currentUser.name },
            receiver: { name: "..." }
        }
        setMessages(prev => [...prev, optimisticMsg])
        setInput("")

        try {
            await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senderEmail: currentUser.email,
                    receiverId: activeContactId,
                    content: optimisticMsg.content
                })
            })
            fetchMessages() // Sync
        } catch (error) {
            console.error("Failed to send", error)
        }
    }

    // DEMO: If no contacts, show a dummy one to start chatting with (e.g. "Support" or a "Recruiter")
    const displayContacts = contacts.length > 0 ? contacts : [
        {
            user: { id: "emp_1", name: "Recruiter Priya", image: "", role: "employee" },
            lastMessage: { content: "Start a conversation...", createdAt: new Date().toISOString(), senderId: "", receiverId: "", id: "", sender: { name: "" }, receiver: { name: "" } }
        }
    ]

    const activeUser = displayContacts.find(c => c.user.id === activeContactId)?.user

    return (
        <div className="h-[calc(100vh-120px)] flex bg-background rounded-xl overflow-hidden border shadow-sm">
            {/* Sidebar */}
            <div className="w-80 border-r flex flex-col bg-muted/10">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-9 bg-background/50" />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col">
                        {displayContacts.map((contact) => (
                            <button
                                key={contact.user.id}
                                onClick={() => setActiveContactId(contact.user.id)}
                                className={`flex items-center gap-3 p-4 text-left transition-colors hover:bg-muted/50 ${activeContactId === contact.user.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
                            >
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={contact.user.image} />
                                    <AvatarFallback>{contact.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-semibold text-sm truncate">{contact.user.name}</span>
                                        <span className="text-[10px] text-muted-foreground">
                                            {contact.lastMessage?.createdAt && formatDistanceToNow(new Date(contact.lastMessage.createdAt), { addSuffix: false }).replace('about ', '')}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {contact.lastMessage?.senderId === contact.user.id ? '' : 'You: '}
                                        {contact.lastMessage?.content}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Chat Area */}
            {activeContactId ? (
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header */}
                    <div className="h-16 border-b flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={activeUser?.image} />
                                <AvatarFallback>{activeUser?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold text-sm">{activeUser?.name}</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-muted-foreground">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon"><Phone className="w-4 h-4 text-muted-foreground" /></Button>
                            <Button variant="ghost" size="icon"><Video className="w-4 h-4 text-muted-foreground" /></Button>
                            <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4 text-muted-foreground" /></Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4 bg-muted/5">
                        <div className="space-y-4 flex flex-col max-w-3xl mx-auto">
                            {messages.map((msg) => {
                                const isMe = msg.senderId === "temp-me" || msg.sender?.name === currentUser.name // Rough check
                                return (
                                    <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="text-xs">{isMe ? 'Me' : msg.sender?.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${isMe
                                                    ? 'bg-indigo-600 text-white rounded-tr-none'
                                                    : 'bg-white dark:bg-slate-800 border rounded-tl-none'
                                                }`}>
                                                {msg.content}
                                            </div>
                                            <div className={`text-[10px] text-muted-foreground mt-1 ${isMe ? 'text-right' : ''}`}>
                                                {formatDistanceToNow(new Date(msg.createdAt))} ago
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>

                    {/* Input */}
                    <div className="p-4 border-t bg-background">
                        <form onSubmit={handleSendMessage} className="flex gap-2 max-w-3xl mx-auto">
                            <Input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-muted/20 border-muted"
                            />
                            <Button type="submit" disabled={!input.trim()} className="bg-indigo-600 hover:bg-indigo-700">
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground bg-muted/5">
                    <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-4">
                        <Send className="w-8 h-8 text-indigo-500" />
                    </div>
                    <p className="font-medium">Select a conversation to start chatting</p>
                </div>
            )}
        </div>
    )
}
