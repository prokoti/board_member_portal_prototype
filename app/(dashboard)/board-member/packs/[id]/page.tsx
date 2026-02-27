'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft, ArrowRight, ChevronLeft, Plus, Send, MessageSquare,
    FileText, Lock, Globe, Search, Hash, Users, Bot, Sparkles,
    BookOpen, X, Highlighter, StickyNote, Check, Clock, AlertCircle,
    ChevronRight, Mic, Paperclip, Smile, MoreVertical, Phone, Video,
    Edit3, Trash2, Eye, EyeOff, Grid3X3
} from 'lucide-react';

// ─── Demo Data ────────────────────────────────────────────────────────────────

const PACK_DOCS = [
    {
        id: 'doc-1',
        title: 'Budget Overview',
        pages: 12,
        sections: [
            {
                heading: 'Budget Overview',
                body: `This quarter has brought unprecedented challenges and opportunities to our financial landscape. The board must consider the macroeconomic environment when evaluating these projections. Revenue targets have been revised upward based on Q2 performance metrics that exceeded analyst expectations by a considerable margin.`,
            },
            {
                heading: 'Capital Expenditure Projections',
                body: `Capex projections have been recalibrated following updated data from our supply chain partners. The initial estimates were based on pre-inflationary figures and require adjustment. Infrastructure investments total $42.3M across three strategic pillars: digital transformation, operational efficiency, and sustainability initiatives.`,
                highlight: { color: '#fde68a', note: 'Capex projections inaccurate due to outdated data sources, needs recalibration' },
            },
            {
                heading: 'Market Expansion Assumptions',
                body: `Consider revising market expansion assumptions to reflect recent economic downturns impacting discretionary consumer spending. The Southeast Asia expansion model assumes 12% YoY growth which appears optimistic given current conditions. Regional teams have flagged concerns about demand elasticity in Tier 2 cities.`,
                highlight: { color: '#c4b5fd', note: 'Consider revising market expansion assumptions to reflect recent economic downturns impacting discretionary consumer spending' },
            },
            {
                heading: 'Cost Containment Strategy',
                body: `How will cost containment strategies be adjusted if revenues fall short? Three scenarios have been modelled: conservative (−15% revenue), base (plan), and optimistic (+8% revenue). Each scenario maps to specific cost reduction levers including headcount freezes, discretionary spend cuts, and deferred capital projects.`,
            },
            {
                heading: 'Supplier Contracts',
                body: `Check if suppliers will maintain contracted pricing in the next quarter given global commodity price fluctuations. Legal has flagged force majeure clauses in four major contracts that could expose the company to renegotiation risk valued at approximately $8.7M.`,
            },
        ],
    },
    {
        id: 'doc-2',
        title: 'Risk Management Report',
        pages: 8,
        sections: [
            {
                heading: 'Risk Dashboard Summary',
                body: `The enterprise risk profile has been updated following the annual risk assessment cycle. Top risks remain consistent with prior quarter: cybersecurity, regulatory compliance, and talent retention. Emerging risks include AI governance and geopolitical supply chain disruption.`,
            },
            {
                heading: 'Cybersecurity Risk',
                body: `Three critical vulnerabilities were identified in the Q1 penetration test. Remediation timelines have been agreed with IT Security. Two of three findings have been resolved; the third requires infrastructure upgrade scheduled for Q3.`,
            },
            {
                heading: 'Regulatory Landscape',
                body: `New regulations effective July 2026 will require enhanced ESG reporting. The compliance team estimates 340 hours of implementation work and recommends engaging external consultants for gap analysis.`,
            },
        ],
    },
    {
        id: 'doc-3',
        title: 'CEO Strategic Update',
        pages: 6,
        sections: [
            {
                heading: 'Strategic Priorities FY2026',
                body: `Our three strategic pillars — digital leadership, customer centricity, and operational excellence — continue to guide our transformation journey. Progress against each pillar is tracked through our Balanced Scorecard with quarterly board reporting.`,
            },
            {
                heading: 'M&A Pipeline',
                body: `Two acquisition targets are under active evaluation. Target A operates in the B2B SaaS space with $28M ARR growing at 45% YoY. Target B is a distribution business that would strengthen our last-mile logistics capability in Southeast Asia.`,
            },
        ],
    },
    {
        id: 'doc-4',
        title: 'Financial Statements',
        pages: 15,
        sections: [
            {
                heading: 'Income Statement — Q1 FY2026',
                body: `Total revenue for Q1 FY2026 was $187.4M, representing a 12.3% increase year-on-year. Gross margin improved to 43.2% from 41.8% in the prior comparative period, driven by product mix shift and operational leverage.`,
            },
            {
                heading: 'Balance Sheet',
                body: `Total assets stand at $2.1B with net cash position of $342M after the completion of the share buyback programme. Net debt to EBITDA ratio of 1.4x remains within board-approved parameters.`,
            },
        ],
    },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface Note {
    id: string;
    docId: string;
    text: string;
    selectedText?: string;
    highlightColor?: string;
    page?: number;
    isPublic: boolean;
    author: string;
    authorInitials: string;
    authorColor: string;
    createdAt: string;
    sectionIndex?: number;
}

interface ChatMessage {
    id: string;
    senderId: string;
    senderName: string;
    senderInitials: string;
    senderColor: string;
    text: string;
    time: string;
    isOwn: boolean;
}

interface ChatRoom {
    id: string;
    name: string;
    type: 'group' | 'private';
    avatar?: string;
    initials: string;
    color: string;
    lastMessage: string;
    lastTime: string;
    unread: number;
    members: string[];
    messages: ChatMessage[];
}

// ─── Demo chat rooms ─────────────────────────────────────────────────────────

const INITIAL_CHATS: ChatRoom[] = [
    {
        id: 'group-all',
        name: 'Board Pack Discussion',
        type: 'group',
        initials: 'BP',
        color: 'bg-purple-500',
        lastMessage: 'I have concerns about the Capex figures',
        lastTime: '10:32 AM',
        unread: 3,
        members: ['Mike Salguero', 'Sarah Chen', 'John Smith', 'Emily Davis'],
        messages: [
            { id: 'm1', senderId: 'sarah', senderName: 'Sarah Chen', senderInitials: 'SC', senderColor: 'bg-blue-500', text: 'Good morning everyone. I have reviewed the budget overview and have some questions.', time: '9:15 AM', isOwn: false },
            { id: 'm2', senderId: 'john', senderName: 'John Smith', senderInitials: 'JS', senderColor: 'bg-purple-500', text: 'Same here. The Capex projections seem off.', time: '9:22 AM', isOwn: false },
            { id: 'm3', senderId: 'me', senderName: 'Mike Salguero', senderInitials: 'MS', senderColor: 'bg-amber-500', text: 'Agreed. I have raised a note on page 7.', time: '9:45 AM', isOwn: true },
            { id: 'm4', senderId: 'emily', senderName: 'Emily Davis', senderInitials: 'ED', senderColor: 'bg-pink-500', text: 'I have concerns about the Capex figures', time: '10:32 AM', isOwn: false },
        ],
    },
    {
        id: 'private-sarah',
        name: 'Sarah Chen',
        type: 'private',
        initials: 'SC',
        color: 'bg-blue-500',
        lastMessage: 'Can we discuss section 3 offline?',
        lastTime: 'Yesterday',
        unread: 1,
        members: ['Mike Salguero', 'Sarah Chen'],
        messages: [
            { id: 'p1', senderId: 'sarah', senderName: 'Sarah Chen', senderInitials: 'SC', senderColor: 'bg-blue-500', text: 'Hi Mike, can we discuss section 3 offline?', time: 'Yesterday', isOwn: false },
            { id: 'p2', senderId: 'me', senderName: 'Mike Salguero', senderInitials: 'MS', senderColor: 'bg-amber-500', text: 'Sure, I have some notes prepared.', time: 'Yesterday', isOwn: true },
        ],
    },
    {
        id: 'private-john',
        name: 'John Smith',
        type: 'private',
        initials: 'JS',
        color: 'bg-purple-500',
        lastMessage: 'Thanks for the context',
        lastTime: 'Mon',
        unread: 0,
        members: ['Mike Salguero', 'John Smith'],
        messages: [
            { id: 'j1', senderId: 'john', senderName: 'John Smith', senderInitials: 'JS', senderColor: 'bg-purple-500', text: 'What is your view on the M&A section?', time: 'Mon', isOwn: false },
            { id: 'j2', senderId: 'me', senderName: 'Mike Salguero', senderInitials: 'MS', senderColor: 'bg-amber-500', text: 'Target A looks promising given the ARR growth.', time: 'Mon', isOwn: true },
            { id: 'j3', senderId: 'john', senderName: 'John Smith', senderInitials: 'JS', senderColor: 'bg-purple-500', text: 'Thanks for the context', time: 'Mon', isOwn: false },
        ],
    },
];

// ─── CoSec AI suggestions ─────────────────────────────────────────────────────

const COSEC_SUGGESTIONS = [
    'Summarize key points of this report',
    'Draft questions I could ask about licensing assumptions',
    'What else should I keep in mind?',
    'What aid we change since last meeting?',
    'Extract action items',
];

// ─── Highlight colours ────────────────────────────────────────────────────────

const HIGHLIGHT_COLORS = [
    { label: 'Yellow', value: '#fde68a', text: '#92400e' },
    { label: 'Purple', value: '#c4b5fd', text: '#4c1d95' },
    { label: 'Green', value: '#a7f3d0', text: '#065f46' },
    { label: 'Pink', value: '#fbcfe8', text: '#9d174d' },
    { label: 'Blue', value: '#bfdbfe', text: '#1e3a8a' },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PackDetailPage() {
    const params = useParams();
    const router = useRouter();

    // ── Doc navigation ──────────────────────────────────────────────────────
    const [currentDocIndex, setCurrentDocIndex] = useState(0);
    const currentDoc = PACK_DOCS[currentDocIndex];

    // ── Tab ─────────────────────────────────────────────────────────────────
    const [activeTab, setActiveTab] = useState<'my-notes' | 'discussion' | 'notes' | 'minutes'>('my-notes');

    // ── Notes ───────────────────────────────────────────────────────────────
    const [notes, setNotes] = useState<Note[]>([
        { id: 'n1', docId: 'doc-1', text: 'Capex projections inaccurate due to outdated data sources, needs recalibration', selectedText: 'Capex projections have been recalibrated following updated data', highlightColor: '#fde68a', page: 7, isPublic: false, author: 'Mike Salguero', authorInitials: 'MS', authorColor: 'bg-amber-500', createdAt: 'just now', sectionIndex: 1 },
        { id: 'n2', docId: 'doc-1', text: 'Consider revising market expansion assumptions to reflect recent economic downturns impacting discretionary consumer spending', selectedText: 'Consider revising market expansion assumptions to reflect recent economic downturns impacting discretionary consumer spending', highlightColor: '#c4b5fd', page: 8, isPublic: false, author: 'Mike Salguero', authorInitials: 'MS', authorColor: 'bg-amber-500', createdAt: 'edited just now', sectionIndex: 2 },
        { id: 'n3', docId: 'doc-1', text: 'How will cost containment strategies be adjusted if revenues fall short?', page: 10, isPublic: false, author: 'Mike Salguero', authorInitials: 'MS', authorColor: 'bg-amber-500', createdAt: 'added 10 min ago', sectionIndex: 3 },
        { id: 'n4', docId: 'doc-1', text: 'Check if suppliers will maintain contracted pricing in the next quarter', page: 12, isPublic: false, author: 'Mike Salguero', authorInitials: 'MS', authorColor: 'bg-amber-500', createdAt: 'added 20 min ago', sectionIndex: 4 },
    ]);

    const [publicNotes] = useState<Note[]>([
        { id: 'pn1', docId: 'doc-1', text: 'Revenue assumptions appear aggressive given market conditions', page: 3, isPublic: true, author: 'Sarah Chen', authorInitials: 'SC', authorColor: 'bg-blue-500', createdAt: '15 min ago', sectionIndex: 0 },
        { id: 'pn2', docId: 'doc-1', text: 'Request supporting data for the 45% YoY growth claim', page: 5, isPublic: true, author: 'John Smith', authorInitials: 'JS', authorColor: 'bg-purple-500', createdAt: '8 min ago', sectionIndex: 1 },
        { id: 'pn3', docId: 'doc-1', text: 'Excellent breakdown of the three cost scenarios — well structured', page: 9, isPublic: true, author: 'Emily Davis', authorInitials: 'ED', authorColor: 'bg-pink-500', createdAt: '2 min ago', sectionIndex: 3 },
    ]);

    // ── Text selection popup ────────────────────────────────────────────────
    const [selectionPopup, setSelectionPopup] = useState<{
        visible: boolean;
        x: number;
        y: number;
        text: string;
        sectionIndex: number;
    } | null>(null);

    const [addNoteMode, setAddNoteMode] = useState<{
        visible: boolean;
        selectedText: string;
        sectionIndex: number;
        chosenColor: string;
    } | null>(null);
    const [noteInputText, setNoteInputText] = useState('');
    const [noteIsPublic, setNoteIsPublic] = useState(false);

    // ── Discussion ──────────────────────────────────────────────────────────
    const [chats, setChats] = useState<ChatRoom[]>(INITIAL_CHATS);
    const [activeChatId, setActiveChatId] = useState<string>('group-all');
    const [chatMessage, setChatMessage] = useState('');
    const chatBottomRef = useRef<HTMLDivElement>(null);

    // ── CoSec AI ────────────────────────────────────────────────────────────
    const [aiMessages, setAiMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([
        { role: 'ai', text: `Hello Mike,\nhow can I assist with this document paper?` },
    ]);
    const [aiInput, setAiInput] = useState('');
    const aiBottomRef = useRef<HTMLDivElement>(null);

    // ── Add Note dialog ─────────────────────────────────────────────────────
    const [globalAddNote, setGlobalAddNote] = useState(false);
    const [globalNoteText, setGlobalNoteText] = useState('');
    const [globalNotePublic, setGlobalNotePublic] = useState(false);

    const docRef = useRef<HTMLDivElement>(null);

    // ── Scroll helpers ──────────────────────────────────────────────────────
    useEffect(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeChatId, chats]);

    useEffect(() => {
        aiBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [aiMessages]);

    // ── Doc navigation ──────────────────────────────────────────────────────
    const goToPrevDoc = () => { if (currentDocIndex > 0) setCurrentDocIndex(i => i - 1); };
    const goToNextDoc = () => { if (currentDocIndex < PACK_DOCS.length - 1) setCurrentDocIndex(i => i + 1); };

    // ── Text selection handler ──────────────────────────────────────────────
    const handleMouseUp = (sectionIndex: number) => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
            setSelectionPopup(null);
            return;
        }
        const text = selection.toString().trim();
        if (text.length < 3) { setSelectionPopup(null); return; }

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const docRect = docRef.current?.getBoundingClientRect();
        if (!docRect) return;

        setSelectionPopup({
            visible: true,
            x: rect.right - docRect.left,
            y: rect.bottom - docRect.top + 8,
            text,
            sectionIndex,
        });
    };

    const handleDismissPopup = () => {
        setSelectionPopup(null);
        window.getSelection()?.removeAllRanges();
    };

    const handleAddNoteFromSelection = () => {
        if (!selectionPopup) return;
        setAddNoteMode({
            visible: true,
            selectedText: selectionPopup.text,
            sectionIndex: selectionPopup.sectionIndex,
            chosenColor: '#fde68a',
        });
        setNoteInputText('');
        handleDismissPopup();
    };

    const handleAskCosecAI = () => {
        if (!selectionPopup) return;
        setAiInput(`About: "${selectionPopup.text.substring(0, 60)}…" — `);
        handleDismissPopup();
    };

    const commitNote = () => {
        if (!addNoteMode || !noteInputText.trim()) return;
        const newNote: Note = {
            id: `n${Date.now()}`,
            docId: currentDoc.id,
            text: noteInputText,
            selectedText: addNoteMode.selectedText,
            highlightColor: addNoteMode.chosenColor,
            page: addNoteMode.sectionIndex + 1,
            isPublic: noteIsPublic,
            author: 'Mike Salguero',
            authorInitials: 'MS',
            authorColor: 'bg-amber-500',
            createdAt: 'just now',
            sectionIndex: addNoteMode.sectionIndex,
        };
        setNotes(prev => [...prev, newNote]);
        setAddNoteMode(null);
        setNoteInputText('');
        setNoteIsPublic(false);
    };

    // ── Chat send ───────────────────────────────────────────────────────────
    const sendChat = () => {
        if (!chatMessage.trim()) return;
        const msg: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: 'me',
            senderName: 'Mike Salguero',
            senderInitials: 'MS',
            senderColor: 'bg-amber-500',
            text: chatMessage,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            isOwn: true,
        };
        setChats(prev => prev.map(c =>
            c.id === activeChatId
                ? { ...c, messages: [...c.messages, msg], lastMessage: chatMessage, lastTime: 'Now' }
                : c
        ));
        setChatMessage('');
    };

    // ── CoSec AI send ───────────────────────────────────────────────────────
    const sendAiMessage = () => {
        if (!aiInput.trim()) return;
        const userMsg = aiInput;
        setAiMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setAiInput('');
        setTimeout(() => {
            setAiMessages(prev => [...prev, {
                role: 'ai',
                text: `Based on the "${currentDoc.title}", here is a relevant summary:\n\nThe document highlights several key financial projections and risk factors. I recommend focusing on the assumptions underpinning the revenue forecasts and ensuring all board members have reviewed the risk mitigation strategies outlined in section 3.`,
            }]);
        }, 1200);
    };

    // ── Global add note ─────────────────────────────────────────────────────
    const commitGlobalNote = () => {
        if (!globalNoteText.trim()) return;
        const newNote: Note = {
            id: `n${Date.now()}`,
            docId: currentDoc.id,
            text: globalNoteText,
            isPublic: globalNotePublic,
            author: 'Mike Salguero',
            authorInitials: 'MS',
            authorColor: 'bg-amber-500',
            createdAt: 'just now',
            page: 1,
        };
        setNotes(prev => [...prev, newNote]);
        setGlobalNoteText('');
        setGlobalNotePublic(false);
        setGlobalAddNote(false);
    };

    // ── Derived data ────────────────────────────────────────────────────────
    const myNotes = notes.filter(n => n.docId === currentDoc.id);
    const pubNotes = publicNotes.filter(n => n.docId === currentDoc.id);
    const activeChat = chats.find(c => c.id === activeChatId)!;

    // ── Section highlights ──────────────────────────────────────────────────
    const sectionHighlights: Record<number, { color: string; noteText: string }[]> = {};
    myNotes.forEach(n => {
        if (n.sectionIndex !== undefined && n.highlightColor) {
            if (!sectionHighlights[n.sectionIndex]) sectionHighlights[n.sectionIndex] = [];
            sectionHighlights[n.sectionIndex].push({ color: n.highlightColor, noteText: n.selectedText || '' });
        }
    });

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="flex flex-col px-4 lg:px-0 h-[95vh] bg-white overflow-hidden" style={{ fontFamily: "'Inter', sans-serif", minWidth: 0 }}>

            {/* ── Pack title + tabs row ─────────────────────────────────────── */}
            <div className="pt-4 pb-0 w-full max-w-screen-2xl mx-auto border-b border-gray-200 bg-white shrink-0 px-4">
                <h1 className="text-xl sm:text-xl md:text-lg lg:text-3xl font-bold text-slate-900 leading-tight">Board Paper: Q3 Strategic Review &amp; Budget Proposal</h1>
                <p className="text-sm sm:text-base text-slate-500 mt-0.5 mb-2">Board Meeting · March 16, 2026</p>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide flex-1" style={{ scrollbarWidth: 'none' }}>
                        {[
                            { key: 'my-notes', label: 'My notes', shortLabel: 'Notes', icon: <Edit3 className="w-4 h-4" /> },
                            { key: 'discussion', label: 'Discussion', shortLabel: 'Chat', icon: <MessageSquare className="w-4 h-4" /> },
                            { key: 'notes', label: 'Notes', shortLabel: 'Public', icon: <FileText className="w-4 h-4" /> },
                            { key: 'minutes', label: 'Minutes (read-only)', shortLabel: 'Minutes', icon: <BookOpen className="w-4 h-4" /> },
                        ].map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                                className={`flex items-center gap-2 px-3 sm:px-5 py-3 text-sm sm:text-base font-medium rounded-t-lg border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === tab.key
                                    ? 'border-purple-600 text-purple-700 bg-purple-50'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                {tab.icon}
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">{tab.shortLabel}</span>
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setGlobalAddNote(true)}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg mb-1 transition-colors shrink-0"
                    >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Add note</span>
                        <span className="sm:hidden">Add</span>
                    </button>
                </div>
            </div>

            {/* ── Main content area ─────────────────────────────────────────── */}
            <div className="flex flex-1 overflow-hidden w-full max-w-screen-2xl mx-auto px-4" style={{ minWidth: 0 }}>

                {/* ══ DISCUSSION TAB ══════════════════════════════════════════ */}
                {activeTab === 'discussion' && (
                    <div className="flex flex-1 mt-2 overflow-hidden">
                        {/* Chat sidebar */}
                        <div className="w-52 sm:w-64 lg:w-80 xl:w-96 bg-[#ebe6fe] rounded-l-lg flex flex-col shrink-0">
                            <div className="p-4 border-b border-gray-100">
                                <div className="relative">
                                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input className="w-full pl-9 pr-3 py-2.5 text-base bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" placeholder="Search chats…" />
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {/* Groups header */}
                                <div className="px-4 py-2 text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Hash className="w-4 h-4" /> Groups
                                </div>
                                {chats.filter(c => c.type === 'group').map(chat => (
                                    <ChatListItem key={chat.id} chat={chat} active={activeChatId === chat.id} onClick={() => setActiveChatId(chat.id)} />
                                ))}
                                {/* Private header */}
                                <div className="px-4 py-2 text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mt-1">
                                    <Lock className="w-4 h-4" /> Private
                                </div>
                                {chats.filter(c => c.type === 'private').map(chat => (
                                    <ChatListItem key={chat.id} chat={chat} active={activeChatId === chat.id} onClick={() => setActiveChatId(chat.id)} />
                                ))}
                            </div>
                            <div className="p-3 border-t border-gray-100">
                                <button className="flex items-center gap-2 text-base text-purple-600 font-medium hover:text-purple-800 transition-colors">
                                    <Plus className="w-5 h-5" /> New chat
                                </button>
                            </div>
                        </div>

                        {/* Chat window */}
                        <div className="flex-1 flex flex-col border-t border-r rounded-r-lg border-gray-100 overflow-hidden">
                            {/* Chat header */}
                            <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className={`w-11 h-11 rounded-full ${activeChat.color} flex items-center justify-center text-white text-base font-semibold`}>
                                        {activeChat.type === 'group' ? <Users className="w-5 h-5" /> : activeChat.initials}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-base text-slate-800">{activeChat.name}</p>
                                        <p className="text-sm text-slate-400">{activeChat.type === 'group' ? `${activeChat.members.length} members` : 'Private chat'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    {activeChat.type === 'private' && (
                                        <>
                                            <button className="w-8 h-8 hover:bg-slate-100 rounded-full flex items-center justify-center"><Phone className="w-4 h-4" /></button>
                                            <button className="w-8 h-8 hover:bg-slate-100 rounded-full flex items-center justify-center"><Video className="w-4 h-4" /></button>
                                        </>
                                    )}
                                    <button className="w-8 h-8 hover:bg-slate-100 rounded-full flex items-center justify-center"><MoreVertical className="w-4 h-4" /></button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#f5f4fb]">
                                {activeChat.messages.map((msg) => (
                                    <div key={msg.id} className={`flex items-end gap-2 ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                                        {!msg.isOwn && (
                                            <div className={`w-7 h-7 rounded-full ${msg.senderColor} flex items-center justify-center text-white text-xs font-semibold shrink-0`}>
                                                {msg.senderInitials}
                                            </div>
                                        )}
                                        <div className={`max-w-xs lg:max-w-md`}>
                                            {!msg.isOwn && (
                                                <p className="text-xs text-slate-500 mb-1 ml-1">{msg.senderName}</p>
                                            )}
                                            <div className={`px-4 py-3 rounded-2xl text-base shadow-sm ${msg.isOwn
                                                ? 'bg-purple-600 text-white rounded-br-sm'
                                                : 'bg-white text-slate-800 rounded-bl-sm'
                                                }`}>
                                                {msg.text}
                                            </div>
                                            <p className={`text-xs text-slate-400 mt-1 ${msg.isOwn ? 'text-right' : 'text-left ml-1'}`}>{msg.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatBottomRef} />
                            </div>

                            {/* Chat input */}
                            <div className="px-4 py-3 bg-white border-t border-gray-100 shrink-0">
                                <div className="flex items-center gap-2 bg-slate-50 border border-gray-200 rounded-xl px-3 py-2">
                                    <button className="text-slate-400 hover:text-slate-600"><Smile className="w-5 h-5" /></button>
                                    <input
                                        value={chatMessage}
                                        onChange={e => setChatMessage(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (sendChat(), e.preventDefault())}
                                        placeholder="Type a message…"
                                        className="flex-1 bg-transparent text-base focus:outline-none placeholder-slate-400"
                                    />
                                    <button className="text-slate-400 hover:text-slate-600"><Paperclip className="w-5 h-5" /></button>
                                    <button className="text-slate-400 hover:text-slate-600"><Mic className="w-5 h-5" /></button>
                                    <button
                                        onClick={sendChat}
                                        className="w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white transition-colors"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ══ MY NOTES / NOTES / MINUTES TABs — 3-column layout ════════ */}
                {(activeTab === 'my-notes' || activeTab === 'notes' || activeTab === 'minutes') && (
                    <div className="flex flex-1 overflow-hidden gap-4 mt-2">

                        {/* ── Left panel: My Notes list ───────────────────────── */}
                        <div className="w-52 sm:w-64 lg:w-80 xl:w-94 bg-[#ebe6fe] rounded-lg flex flex-col shrink-0">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <h3 className="text-base font-semibold text-slate-700">
                                    {activeTab === 'notes' ? 'Public notes' : activeTab === 'minutes' ? 'Minutes' : 'All notes on this paper'}
                                    {' '}
                                    <span className="text-purple-600">
                                        ({activeTab === 'notes' ? pubNotes.length : myNotes.length})
                                    </span>
                                </h3>
                            </div>
                            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                                {(activeTab === 'notes' ? pubNotes : myNotes).map((note, idx) => (
                                    <NoteCard key={note.id} note={note} index={idx + 1} />
                                ))}
                                {activeTab === 'minutes' && (
                                    <div className="text-center text-base text-slate-400 py-8">
                                        <BookOpen className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                                        Minutes are read-only and will appear here after the meeting.
                                    </div>
                                )}
                            </div>
                            {activeTab !== 'minutes' && (
                                <div className="px-4 py-2 border-t border-gray-100 text-sm text-slate-400 leading-snug">
                                    Personal notes are visible only to you within Prokoti but may be included in legal discovery in accordance with applicable law.
                                </div>
                            )}
                        </div>

                        {/* ── Centre: Document preview ─────────────────────────── */}
                        <div className="flex-1 flex flex-col bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                            {/* Doc header bar */}
                            <div className="flex items-center justify-between px-5 py-2.5  border-b border-gray-100 shrink-0">
                                <h2 className="text-lg font-bold text-slate-800">{currentDoc.title}</h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-400">{currentDocIndex + 1} / {PACK_DOCS.length}</span>
                                    <button
                                        onClick={goToPrevDoc}
                                        disabled={currentDocIndex === 0}
                                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 transition-colors"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={goToNextDoc}
                                        disabled={currentDocIndex === PACK_DOCS.length - 1}
                                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 transition-colors"
                                    >
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                                        <Grid3X3 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Document body */}
                            <div className="flex-1 overflow-y-auto bg-white" ref={docRef}>
                                <div className="max-w-3xl xl:max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-8 relative">
                                    {currentDoc.sections.map((section, sIdx) => {
                                        const highlights = sectionHighlights[sIdx] || [];
                                        const hasHighlight = highlights.length > 0;
                                        const highlightColor = hasHighlight ? highlights[0].color : undefined;

                                        return (
                                            <div key={sIdx} className="mb-8">
                                                <h3 className="text-lg font-bold text-slate-900 mb-3">{section.heading}</h3>
                                                <div
                                                    className="text-base text-slate-600 leading-relaxed select-text cursor-text"
                                                    onMouseUp={() => handleMouseUp(sIdx)}
                                                    style={hasHighlight ? {
                                                        backgroundColor: highlightColor + '55',
                                                        borderRadius: '4px',
                                                        padding: '8px',
                                                        borderLeft: `3px solid ${highlightColor}`,
                                                    } : {}}
                                                >
                                                    {section.body}
                                                </div>
                                                {hasHighlight && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <StickyNote className="w-3.5 h-3.5 text-slate-400" />
                                                        <span className="text-xs text-slate-400">p. {sIdx + 7} &nbsp;·&nbsp; {highlights.length > 1 ? `${highlights.length} notes` : 'edited just now'}</span>
                                                        <button className="text-slate-400 hover:text-slate-600"><Plus className="w-3.5 h-3.5" /></button>
                                                        <button className="text-slate-400 hover:text-slate-600"><Edit3 className="w-3.5 h-3.5" /></button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Text selection popup */}
                                {selectionPopup?.visible && (
                                    <div
                                        className="absolute z-50 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 px-1 flex flex-col gap-0.5 min-w-[160px]"
                                        style={{
                                            left: selectionPopup.x,
                                            top: selectionPopup.y,
                                            transform: 'translateX(-50%)',
                                        }}
                                    >
                                        <button
                                            onMouseDown={e => { e.preventDefault(); handleAddNoteFromSelection(); }}
                                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
                                        >
                                            <Plus className="w-4 h-4 text-purple-500" />
                                            Add note
                                        </button>
                                        <button
                                            onMouseDown={e => { e.preventDefault(); handleAskCosecAI(); }}
                                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
                                        >
                                            <Bot className="w-4 h-4 text-purple-500" />
                                            Ask CoSec AI
                                        </button>
                                    </div>
                                )}

                                {/* Click outside to dismiss popup */}
                                {selectionPopup?.visible && (
                                    <div className="fixed inset-0 z-40" onClick={handleDismissPopup} />
                                )}
                            </div>

                            {/* Bottom action bar */}
                            <div className="flex flex-wrap items-center gap-2 px-4 sm:px-6 py-3 bg-white border-t border-gray-100 shrink-0">
                                <button className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-slate-600 border border-gray-200 rounded-lg hover:bg-slate-50 flex items-center gap-2 transition-colors">
                                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Open Pack</span>
                                </button>
                                <button className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-slate-600 border border-gray-200 rounded-lg hover:bg-slate-50 flex items-center gap-2 transition-colors">
                                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Add Question</span>
                                </button>
                                <button className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-slate-600 border border-gray-200 rounded-lg hover:bg-slate-50 flex items-center gap-2 transition-colors">
                                    <Highlighter className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Highlight</span>
                                </button>
                                <button className="ml-auto px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg flex items-center gap-2 transition-colors">
                                    <Check className="w-4 h-4 sm:w-5 sm:h-5" /> Mark Reviewed
                                </button>
                            </div>
                        </div>

                        {/* ── Right panel: CoSec AI ─────────────────────────────── */}
                        <div className="w-56 sm:w-64 lg:w-80 xl:w-96 bg-[#ebe6fe] rounded-lg flex flex-col shrink-0">
                            {/* AI header */}
                            <div className="px-4 py-3 border-b border-gray-100">
                                <h3 className="text-base font-bold text-slate-800">AI CoSec</h3>
                            </div>

                            {/* AI avatar + messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {/* Avatar */}
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-base shrink-0">
                                        AI
                                    </div>
                                    <div className="flex-1 bg-purple-600 rounded-xl rounded-tl-sm px-3 py-2 flex items-center justify-between">
                                        <span className="text-base font-semibold text-white">AI CoSec</span>
                                        <Grid3X3 className="w-4 h-4 text-purple-200" />
                                    </div>
                                </div>

                                {/* Messages */}
                                {aiMessages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] px-3 py-3 rounded-xl text-base whitespace-pre-line shadow-sm ${msg.role === 'user'
                                            ? 'bg-purple-600 text-white rounded-br-sm'
                                            : 'bg-slate-50 text-slate-700 border border-gray-100 rounded-bl-sm'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}

                                {/* Quick suggestions */}
                                {aiMessages.length === 1 && (
                                    <div className="space-y-1.5 mt-2">
                                        {COSEC_SUGGESTIONS.map((s, i) => (
                                            <button
                                                key={i}
                                                onClick={() => { setAiInput(s); }}
                                                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left text-slate-600 bg-slate-50 border border-gray-200 rounded-lg hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors"
                                            >
                                                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <div ref={aiBottomRef} />
                            </div>

                            {/* AI input */}
                            <div className="px-3 py-3 border-t border-gray-100">
                                <div className="flex items-center gap-2 bg-slate-50 border border-gray-200 rounded-xl px-3 py-2">
                                    <input
                                        value={aiInput}
                                        onChange={e => setAiInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (sendAiMessage(), e.preventDefault())}
                                        placeholder="Enter a question…"
                                        className="flex-1 bg-transparent text-sm focus:outline-none placeholder-slate-400"
                                    />
                                    <button
                                        onClick={sendAiMessage}
                                        className="w-6 h-6 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white transition-colors"
                                    >
                                        <Send className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Add note from selection modal ─────────────────────────────── */}
            {addNoteMode?.visible && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setAddNoteMode(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                                <StickyNote className="w-4 h-4 text-purple-500" /> Add Note
                            </h3>
                            <button onClick={() => setAddNoteMode(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                        </div>

                        {/* Selected text preview */}
                        <div className="mb-4 p-3 rounded-lg border-l-4 text-sm text-slate-600 italic" style={{ backgroundColor: addNoteMode.chosenColor + '55', borderColor: addNoteMode.chosenColor }}>
                            "{addNoteMode.selectedText}"
                        </div>

                        {/* Highlight colour picker */}
                        <div className="mb-4">
                            <p className="text-xs font-medium text-slate-500 mb-2">Highlight colour</p>
                            <div className="flex gap-2">
                                {HIGHLIGHT_COLORS.map(c => (
                                    <button
                                        key={c.value}
                                        onClick={() => setAddNoteMode(prev => prev ? { ...prev, chosenColor: c.value } : null)}
                                        className={`w-7 h-7 rounded-full border-2 transition-all ${addNoteMode.chosenColor === c.value ? 'border-purple-500 scale-110' : 'border-transparent'}`}
                                        style={{ backgroundColor: c.value }}
                                        title={c.label}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Note text */}
                        <textarea
                            value={noteInputText}
                            onChange={e => setNoteInputText(e.target.value)}
                            placeholder="Write your note…"
                            rows={3}
                            className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none mb-4"
                            autoFocus
                        />

                        {/* Visibility toggle */}
                        <div className="flex items-center gap-3 mb-4">
                            <button
                                onClick={() => setNoteIsPublic(false)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors ${!noteIsPublic ? 'bg-purple-600 text-white border-purple-600' : 'border-gray-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                <Lock className="w-3 h-3" /> Private
                            </button>
                            <button
                                onClick={() => setNoteIsPublic(true)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors ${noteIsPublic ? 'bg-purple-600 text-white border-purple-600' : 'border-gray-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                <Globe className="w-3 h-3" /> Public
                            </button>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setAddNoteMode(null)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                            <button onClick={commitNote} className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">Save note</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Global Add note modal ──────────────────────────────────────── */}
            {globalAddNote && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setGlobalAddNote(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                                <StickyNote className="w-4 h-4 text-purple-500" /> Add Note
                            </h3>
                            <button onClick={() => setGlobalAddNote(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                        </div>
                        <textarea
                            value={globalNoteText}
                            onChange={e => setGlobalNoteText(e.target.value)}
                            placeholder="Write your note…"
                            rows={4}
                            className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none mb-4"
                            autoFocus
                        />
                        <div className="flex items-center gap-3 mb-4">
                            <button onClick={() => setGlobalNotePublic(false)} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors ${!globalNotePublic ? 'bg-purple-600 text-white border-purple-600' : 'border-gray-200 text-slate-600'}`}>
                                <Lock className="w-3 h-3" /> Private
                            </button>
                            <button onClick={() => setGlobalNotePublic(true)} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors ${globalNotePublic ? 'bg-purple-600 text-white border-purple-600' : 'border-gray-200 text-slate-600'}`}>
                                <Globe className="w-3 h-3" /> Public
                            </button>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setGlobalAddNote(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                            <button onClick={commitGlobalNote} className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">Save note</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NoteCard({ note, index }: { note: Note; index: number }) {
    return (
        <div className="bg-[#f5f4fb] rounded-xl p-3 cursor-pointer hover:bg-purple-50 transition-colors group">
            <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{index}</span>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 leading-snug line-clamp-3">{note.text}</p>
                    {note.selectedText && (
                        <p
                            className="mt-1.5 text-xs italic text-slate-500 line-clamp-2 px-2 py-1 rounded"
                            style={{ backgroundColor: (note.highlightColor || '#fde68a') + '88' }}
                        >
                            {note.selectedText}
                        </p>
                    )}
                    <div className="flex items-center gap-1.5 mt-1.5">
                        <StickyNote className="w-3 h-3 text-slate-400" />
                        {note.page && <span className="text-[10px] text-slate-400">p. {note.page}</span>}
                        <span className="text-[10px] text-slate-400">{note.isPublic ? '· public' : ''} {note.createdAt}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChatListItem({ chat, active, onClick }: { chat: ChatRoom; active: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left ${active ? 'bg-purple-50' : ''}`}
        >
            <div className={`w-9 h-9 rounded-full ${chat.color} flex items-center justify-center text-white text-xs font-semibold shrink-0`}>
                {chat.type === 'group' ? <Users className="w-4 h-4" /> : chat.initials}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-800 truncate">{chat.name}</p>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-1">{chat.lastTime}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
                <span className="w-5 h-5 bg-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                    {chat.unread}
                </span>
            )}
        </button>
    );
}
