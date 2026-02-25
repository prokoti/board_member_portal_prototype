'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, MessageCircle, BookOpen, Users, FileText, Bookmark, X } from 'lucide-react'
import AiCoSec from '@/components/AiCoSec'

// ─── Mock Data ────────────────────────────────────────────────────
const notes = [
    {
        id: 1,
        text: 'Capex projections inaccurate due to outdated data sources, needs recalibration',
        page: 7,
        time: 'added just now',
        highlighted: false,
    },
    {
        id: 2,
        text: 'Consider revising market expansion assumptions to reflect recent economic downturns impacting discretionary consumer spending',
        page: 8,
        time: 'edited just now',
        highlighted: true,
    },
    {
        id: 3,
        text: 'How will cost containment strategies be adjusted if revenues fall short?',
        page: 10,
        time: 'added 10 min ago',
        highlighted: false,
    },
    {
        id: 4,
        text: 'Check if suppliers will maintain contracted pricing in the next quarter',
        page: 12,
        time: 'added 30 min ago',
        highlighted: false,
    },
]

const documentContent = [
    {
        heading: 'Budget Overview',
        body: 'This report presents the Q3 strategic review and budget proposal for the fiscal year. Management has prepared a comprehensive analysis of financial performance against the approved budget, identifying key variances and proposed corrective actions going forward.',
    },
    {
        heading: 'Revenue Performance',
        body: 'Total revenue for the quarter reached $92M, representing a 4.5% outperformance against the budgeted $88M. This was primarily driven by stronger-than-expected performance in our core markets, partially offset by slower adoption in newly entered geographies.',
        highlighted: 'Consider revising market expansion assumptions to reflect recent economic downturns impacting discretionary consumer spending.',
        afterHighlight: 'The CEO has directed the finance team to prepare a revised forecast incorporating the updated macroeconomic assumptions, to be presented at the November Board meeting.',
    },
    {
        heading: 'Capital Expenditure Analysis',
        body: 'Capital expenditure for Q3 totalled $28.4M against a budget of $25.2M, representing a 12.7% overrun. The primary drivers were accelerated technology infrastructure investments and unexpected civil works required at the new regional headquarters.',
        bullets: [
            'Technology infrastructure investment: $12.1M (budget: $10.0M)',
            'Regional HQ civil works: $8.3M (unbudgeted, approved via board resolution)',
            'Fleet and equipment renewal: $5.2M (budget: $6.5M, underspend)',
            'Research and development facilities: $2.8M (in line with budget)',
        ],
    },
    {
        heading: 'Operational Outlook',
        body: 'Management remains confident in delivering full-year EBITDA targets, subject to the macroeconomic assumptions outlined in Appendix B. Cost containment measures have been implemented across the operational divisions, with results expected to materialise in Q4. The Board is requested to note the operational performance and endorse the revised forecast.',
    },
]

type NoteTab = 'My notes' | 'Discussion' | 'Minutes'

export default function PaperViewerPage({ params }: { params: { id: string } }) {
    const [activeNoteTab, setActiveNoteTab] = useState<NoteTab>('My notes')
    const [showPopover, setShowPopover] = useState(true)
    const [addingNote, setAddingNote] = useState(false)
    const [newNoteText, setNewNoteText] = useState('')
    const [notesList, setNotesList] = useState(notes)
    const [markedReviewed, setMarkedReviewed] = useState(false)

    const handleAddNote = () => {
        if (!newNoteText.trim()) return
        setNotesList(prev => [
            {
                id: prev.length + 1,
                text: newNoteText,
                page: 8,
                time: 'added just now',
                highlighted: false,
            },
            ...prev,
        ])
        setNewNoteText('')
        setAddingNote(false)
    }

    return (
        <div className="flex flex-col h-screen bg-[#F4F0FF] overflow-hidden">
            {/* ── Top Bar ──────────────────────────────────── */}
            <div className="bg-white border-b border-[#5E43D8]/8 shadow-[0_1px_12px_rgba(94,67,216,0.06)] flex-shrink-0">
                <div className="flex items-center justify-between px-5 h-14">
                    <Link
                        href="/portal/dashboard"
                        className="flex items-center gap-2 text-sm font-semibold text-[#2D1B6B]/60 hover:text-[#5E43D8] transition-colors group"
                    >
                        <div className="w-7 h-7 rounded-lg border border-[#5E43D8]/20 flex items-center justify-center group-hover:bg-[#EDE8FB] transition-colors">
                            <ArrowLeft style={{ width: 13, height: 13 }} />
                        </div>
                        Back to meetings
                    </Link>

                    <div className="text-center">
                        <h1 className="text-sm font-bold text-[#2D1B6B]">Board Paper: Q3 Strategic Review & Budget Proposal</h1>
                        <p className="text-xs text-[#2D1B6B]/40">Board Meeting · March 16, 2026</p>
                    </div>

                    <button
                        onClick={() => setAddingNote(true)}
                        className="flex items-center gap-1.5 bg-[#5E43D8] hover:bg-[#4B36AD] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-[0_2px_8px_rgba(94,67,216,0.25)]"
                    >
                        <Plus style={{ width: 13, height: 13 }} />
                        Add note
                    </button>
                </div>

                {/* Note Tab Bar */}
                <div className="flex items-center px-5 border-t border-[#F4F0FF] gap-1 py-1.5">
                    {(['My notes', 'Discussion', 'Minutes'] as NoteTab[]).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveNoteTab(tab)}
                            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeNoteTab === tab
                                    ? 'bg-[#5E43D8] text-white shadow-sm'
                                    : 'text-[#2D1B6B]/50 hover:bg-[#F4F0FF]'
                                }`}
                        >
                            {tab === 'My notes' && <Bookmark style={{ width: 11, height: 11 }} />}
                            {tab === 'Discussion' && <Users style={{ width: 11, height: 11 }} />}
                            {tab === 'Minutes' && <FileText style={{ width: 11, height: 11 }} />}
                            {tab}
                            {tab === 'My notes' && <span className={`ml-0.5 text-[9px] px-1 py-0.5 rounded-full font-bold ${activeNoteTab === tab ? 'bg-white/20' : 'bg-[#EDE8FB] text-[#5E43D8]'}`}>{notesList.length}</span>}
                        </button>
                    ))}
                    <div className="flex-1" />
                    <button className="text-xs font-semibold text-[#5E43D8] hover:text-[#4B36AD] transition-colors">
                        + Add note
                    </button>
                </div>
            </div>

            {/* ── 3-column body ────────────────────────────── */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left: Notes Panel */}
                <div className="w-72 bg-white border-r border-[#5E43D8]/8 flex flex-col overflow-hidden flex-shrink-0">
                    <div className="px-4 py-3 border-b border-[#F4F0FF]">
                        <h3 className="text-xs font-bold text-[#2D1B6B]">All notes on this paper ({notesList.length})</h3>
                    </div>

                    {/* Add note input */}
                    {addingNote && (
                        <div className="px-3 py-3 border-b border-[#F4F0FF] bg-[#F4F0FF]/50">
                            <textarea
                                autoFocus
                                placeholder="Add your note..."
                                value={newNoteText}
                                onChange={e => setNewNoteText(e.target.value)}
                                className="w-full text-xs text-[#2D1B6B] bg-white border border-[#5E43D8]/20 rounded-lg p-2.5 resize-none outline-none focus:ring-1 focus:ring-[#5E43D8]/30 h-20 font-medium"
                            />
                            <div className="flex gap-2 mt-2">
                                <button onClick={handleAddNote} className="flex-1 bg-[#5E43D8] text-white text-xs font-semibold py-1.5 rounded-lg hover:bg-[#4B36AD] transition-colors">Save</button>
                                <button onClick={() => setAddingNote(false)} className="flex-1 border border-[#5E43D8]/20 text-[#2D1B6B]/50 text-xs font-semibold py-1.5 rounded-lg hover:bg-[#F4F0FF] transition-colors">Cancel</button>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-3 space-y-2.5">
                        {notesList.map(note => (
                            <div
                                key={note.id}
                                className={`p-3 rounded-xl border cursor-pointer transition-all group ${note.highlighted
                                        ? 'border-[#5E43D8]/20 bg-[#EDE8FB]/50 shadow-sm'
                                        : 'border-[#F4F0FF] bg-[#F4F0FF]/60 hover:border-[#5E43D8]/15 hover:bg-white'
                                    }`}
                            >
                                <div className="flex items-start gap-2.5">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5 ${note.highlighted ? 'bg-[#5E43D8] text-white' : 'bg-[#2D1B6B]/10 text-[#2D1B6B]/60'
                                        }`}>
                                        {note.id}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-medium text-[#2D1B6B] leading-relaxed ${note.highlighted ? '' : ''}`}>
                                            {note.highlighted ? (
                                                <>
                                                    {note.text.split('impacting')[0]}
                                                    <span className="bg-yellow-200 text-[#2D1B6B] px-0.5 rounded">impacting discretionary consumer spending</span>
                                                </>
                                            ) : note.text}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className="text-[9px] bg-[#5E43D8]/10 text-[#5E43D8] font-semibold px-1.5 py-0.5 rounded">p. {note.page}</span>
                                            <span className="text-[9px] text-[#2D1B6B]/35 font-medium">{note.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="px-4 py-3 border-t border-[#F4F0FF] bg-[#FAFAFE]">
                        <p className="text-[9px] text-[#2D1B6B]/35 text-center leading-relaxed">
                            Personal notes are visible only to you within Prokoti but may be included in legal discovery in accordance with applicable law.
                        </p>
                    </div>
                </div>

                {/* Center: Document Workspace */}
                <div className="flex-1 overflow-y-auto scrollbar-thin px-8 py-6 relative">
                    <div className="max-w-2xl mx-auto">
                        {/* Document header controls */}
                        <div className="flex items-center justify-end gap-3 mb-5">
                            <div className="flex items-center gap-1 bg-white rounded-lg border border-[#5E43D8]/10 p-1 shadow-sm">
                                <button className="p-1.5 rounded hover:bg-[#F4F0FF] text-[#2D1B6B]/40 hover:text-[#5E43D8] transition-colors" title="Comments">
                                    <MessageCircle style={{ width: 14, height: 14 }} />
                                </button>
                                <button className="p-1.5 rounded hover:bg-[#F4F0FF] text-[#2D1B6B]/40 hover:text-[#5E43D8] transition-colors" title="Notes">
                                    <BookOpen style={{ width: 14, height: 14 }} />
                                </button>
                                <button className="p-1.5 rounded hover:bg-[#F4F0FF] text-[#2D1B6B]/40 hover:text-[#5E43D8] transition-colors" title="Bookmark">
                                    <Bookmark style={{ width: 14, height: 14 }} />
                                </button>
                            </div>
                        </div>

                        {/* The actual document */}
                        <div className="bg-white rounded-2xl shadow-[0_2px_24px_rgba(94,67,216,0.08)] p-8 space-y-7">
                            {documentContent.map((section, si) => (
                                <div key={si}>
                                    <h2 className="text-base font-bold text-[#2D1B6B] mb-3 pb-2 border-b border-[#F4F0FF]">
                                        {section.heading}
                                    </h2>
                                    <p className="text-sm text-[#2D1B6B]/75 leading-relaxed mb-3">{section.body}</p>

                                    {/* Highlighted annotation block */}
                                    {section.highlighted && (
                                        <div className="relative my-4">
                                            <div className="bg-yellow-50 border-l-3 border-yellow-400 rounded-xl p-4 relative" style={{ borderLeftWidth: 3 }}>
                                                <div className="flex items-start gap-3">
                                                    <div className="w-5 h-5 bg-yellow-400/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Bookmark style={{ width: 10, height: 10 }} className="text-yellow-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm text-[#2D1B6B] leading-relaxed">
                                                            <span className="bg-yellow-200 rounded px-0.5">{section.highlighted}</span>
                                                        </p>
                                                        <div className="flex items-center gap-3 mt-2">
                                                            <span className="text-[10px] bg-[#5E43D8]/10 text-[#5E43D8] font-semibold px-1.5 py-0.5 rounded">p. 8</span>
                                                            <span className="text-[10px] text-[#2D1B6B]/35">Edited just now</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 flex-shrink-0">
                                                        <button className="w-6 h-6 rounded bg-[#F4F0FF] flex items-center justify-center hover:bg-[#EDE8FB] text-[#5E43D8] transition-colors" title="Add note">
                                                            <Plus style={{ width: 11, height: 11 }} />
                                                        </button>
                                                        <button className="w-6 h-6 rounded bg-[#F4F0FF] flex items-center justify-center hover:bg-[#EDE8FB] text-[#5E43D8] transition-colors" title="Ask AI">
                                                            <MessageCircle style={{ width: 11, height: 11 }} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Contextual popover */}
                                            {showPopover && (
                                                <div className="absolute right-0 top-full mt-2 z-20">
                                                    <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(94,67,216,0.18)] border border-[#5E43D8]/10 p-1 flex flex-col gap-0.5 w-44">
                                                        <button
                                                            onClick={() => setAddingNote(true)}
                                                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F4F0FF] text-sm font-semibold text-[#2D1B6B] transition-colors w-full text-left"
                                                        >
                                                            <Plus style={{ width: 14, height: 14 }} className="text-[#5E43D8]" />
                                                            Add note
                                                        </button>
                                                        <button
                                                            onClick={() => setShowPopover(false)}
                                                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#EDE8FB] text-sm font-semibold text-[#5E43D8] transition-colors w-full text-left"
                                                        >
                                                            <MessageCircle style={{ width: 14, height: 14 }} />
                                                            Ask CoSec AI
                                                        </button>
                                                        <button
                                                            onClick={() => setShowPopover(false)}
                                                            className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#2D1B6B]/10 rounded-full flex items-center justify-center hover:bg-[#2D1B6B]/20"
                                                        >
                                                            <X style={{ width: 8, height: 8 }} className="text-[#2D1B6B]/60" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {section.afterHighlight && (
                                        <p className="text-sm text-[#2D1B6B]/75 leading-relaxed">{section.afterHighlight}</p>
                                    )}

                                    {section.bullets && (
                                        <ul className="mt-3 space-y-2">
                                            {section.bullets.map((b, bi) => (
                                                <li key={bi} className="flex items-start gap-2.5 text-sm text-[#2D1B6B]/70">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#5E43D8]/40 flex-shrink-0 mt-1.5" />
                                                    <span className="leading-relaxed">{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: AI CoSec */}
                <div className="w-72 flex-shrink-0 border-l border-[#5E43D8]/8 p-4 overflow-y-auto scrollbar-thin bg-white/50">
                    <AiCoSec context="document" className="h-full min-h-[500px]" />
                </div>
            </div>

            {/* ── Bottom Action Bar ─────────────────────────── */}
            <div className="bg-white border-t border-[#5E43D8]/8 shadow-[0_-1px_12px_rgba(94,67,216,0.06)] flex-shrink-0">
                <div className="flex items-center justify-center gap-3 px-6 py-3">
                    <button className="flex items-center gap-2 bg-[#F4F0FF] hover:bg-[#EDE8FB] text-[#2D1B6B] text-sm font-semibold px-5 py-2.5 rounded-xl transition-all border border-[#5E43D8]/10">
                        <BookOpen style={{ width: 14, height: 14 }} className="text-[#5E43D8]" />
                        Open Pack
                    </button>
                    <button className="flex items-center gap-2 bg-[#F4F0FF] hover:bg-[#EDE8FB] text-[#2D1B6B] text-sm font-semibold px-5 py-2.5 rounded-xl transition-all border border-[#5E43D8]/10">
                        <Plus style={{ width: 14, height: 14 }} className="text-[#5E43D8]" />
                        Add Question
                    </button>
                    <button
                        onClick={() => setMarkedReviewed(!markedReviewed)}
                        className={`flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-[0_3px_10px_rgba(94,67,216,0.25)] ${markedReviewed
                                ? 'bg-green-500 text-white shadow-[0_3px_10px_rgba(34,197,94,0.25)]'
                                : 'bg-[#5E43D8] hover:bg-[#4B36AD] text-white'
                            }`}
                    >
                        {markedReviewed ? '✓ Reviewed' : '⚑ Mark Reviewed'}
                    </button>
                </div>
            </div>
        </div>
    )
}
