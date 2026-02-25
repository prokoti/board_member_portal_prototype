'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, MoreHorizontal } from 'lucide-react'

interface AiCoSecProps {
    context?: 'dashboard' | 'document'
    className?: string
}

const DASHBOARD_CHIPS = [
    'Brief me on this meeting',
    'Summarize this agenda item',
    'Draft a question to management',
    'Extract the action items',
    'Compare with last quarter',
]

const DOCUMENT_CHIPS = [
    'Summarize key points of this report',
    'Draft questions I could ask about this',
    'What changed since last meeting?',
    'Extract action items',
    'What else should I keep in mind?',
]

interface Message {
    role: 'ai' | 'user'
    text: string
}

const AI_RESPONSES: Record<string, string> = {
    'Brief me on this meeting': "The Board Meeting on Apr 27 will cover Q3 financials, strategic review, and governance updates. Revenue is tracking at 92M total with Q4 showing strongest performance.",
    'Summarize this agenda item': "This agenda item covers the approval of Q3 budget variance with key focus on the 8% underspend in OpEx and the 12% overspend in CapEx.",
    'Draft a question to management': "Here's a suggested question: 'Can management elaborate on the rationale behind the CapEx overrun in Q3, and what mitigation measures are being put in place for Q4?'",
    'Extract the action items': "Action items identified:\n1. CFO to provide detailed budget reconciliation by Nov 15\n2. CEO to present strategic roadmap update at next Board\n3. Audit Committee to review governance framework",
    'Summarize key points of this report': "Key points from the Q3 Strategic Review:\n• Revenue at 92M (budget: 88M, +4.5%)\n• Market expansion into 3 new geographies\n• Cost containment measures required in H2\n• ESG score improved by 12 points YoY",
}

export default function AiCoSec({ context = 'dashboard', className = '' }: AiCoSecProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputVal, setInputVal] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const chips = context === 'document' ? DOCUMENT_CHIPS : DASHBOARD_CHIPS

    const handleChip = (chip: string) => {
        const response = AI_RESPONSES[chip] || "I'll analyze that for you. Based on the current board materials, the key consideration here relates to the strategic priorities outlined in the Q3 report."
        setMessages(prev => [...prev, { role: 'user', text: chip }, { role: 'ai', text: response }])
        setIsTyping(true)
        setTimeout(() => setIsTyping(false), 800)
    }

    const handleSend = () => {
        if (!inputVal.trim()) return
        const q = inputVal.trim()
        setInputVal('')
        setMessages(prev => [...prev, { role: 'user', text: q }])
        setIsTyping(true)
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'ai', text: "Based on the board materials, I can see this relates to your question. Let me provide a comprehensive analysis of the relevant sections..." }])
            setIsTyping(false)
        }, 1200)
    }

    return (
        <div className={`bg-white rounded-xl shadow-card border border-[#5E43D8]/8 flex flex-col overflow-hidden ${className}`}>
            {/* AI Header */}
            <div className="px-4 py-3 border-b border-[#F4F0FF] flex items-center justify-between">
                <span className="text-sm font-bold text-[#2D1B6B]">AI CoSec</span>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F4F0FF] text-[#2D1B6B]/40">
                    <MoreHorizontal style={{ width: 16, height: 16 }} />
                </button>
            </div>

            {/* AI Avatar + Greeting */}
            <div className="px-4 py-3 flex items-start gap-3">
                <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5E43D8] to-[#8B72E8] flex items-center justify-center text-white text-xs font-bold shadow-md">
                        AI
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div className="bg-[#F4F0FF] rounded-xl rounded-tl-none px-3.5 py-2.5 flex-1">
                    <p className="text-sm font-medium text-[#2D1B6B] leading-relaxed">
                        Hello Mike,<br />
                        how can I assist {context === 'document' ? 'with this document paper' : 'you today'}?
                    </p>
                </div>
            </div>

            {/* Messages */}
            {messages.length > 0 && (
                <div className="px-4 pb-2 space-y-3 max-h-48 overflow-y-auto scrollbar-thin">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed font-medium whitespace-pre-line ${msg.role === 'user'
                                    ? 'bg-[#5E43D8] text-white rounded-tr-none'
                                    : 'bg-[#F4F0FF] text-[#2D1B6B] rounded-tl-none'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-1 pl-1">
                            {[0, 1, 2].map(i => (
                                <div key={i} className="w-1.5 h-1.5 bg-[#5E43D8]/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Prompt chips */}
            <div className="px-4 pb-3 space-y-1.5">
                {chips.map((chip, i) => (
                    <button
                        key={i}
                        onClick={() => handleChip(chip)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#EDE8FB] text-left group transition-all border border-transparent hover:border-[#5E43D8]/10"
                    >
                        <div className="w-5 h-5 rounded bg-[#EDE8FB] group-hover:bg-[#5E43D8]/15 flex items-center justify-center flex-shrink-0 transition-colors">
                            <MessageCircle style={{ width: 10, height: 10 }} className="text-[#5E43D8]" />
                        </div>
                        <span className="text-xs font-medium text-[#2D1B6B]/70 group-hover:text-[#2D1B6B] transition-colors">{chip}</span>
                    </button>
                ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-4 mt-auto">
                <div className="flex items-center gap-2 bg-[#F4F0FF] rounded-xl px-3 py-2 border border-[#5E43D8]/15 focus-within:border-[#5E43D8]/40 transition-colors">
                    <input
                        value={inputVal}
                        onChange={e => setInputVal(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        placeholder="Enter a question..."
                        className="flex-1 bg-transparent text-xs font-medium text-[#2D1B6B] placeholder:text-[#2D1B6B]/30 outline-none"
                    />
                    <button
                        onClick={handleSend}
                        className="w-7 h-7 bg-[#5E43D8] rounded-lg flex items-center justify-center hover:bg-[#4B36AD] transition-colors"
                    >
                        <Send style={{ width: 12, height: 12 }} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}
