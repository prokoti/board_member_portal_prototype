'use client'

import { useState } from 'react'
import { Search, Calendar, CheckSquare, BookOpen, FileText, Clock, ChevronRight } from 'lucide-react'

type Tab = 'All' | 'Meetings' | 'Packs' | 'Actions' | 'Decision Logs'
const TABS: Tab[] = ['All', 'Meetings', 'Packs', 'Actions', 'Decision Logs']

const RECENT_SEARCHES = ['Board of Directors Meeting', 'Q1 Financial Statements', 'April Board Pack', 'Dividend Policy']

const RESULTS = [
    { type: 'Meetings' as Tab, title: 'Board of Directors Meeting', body: 'Board of Directors', date: 'April 25, 2024', snippet: 'Monthly board session covering strategy and approvals', icon: <Calendar className="w-5 h-5 text-[#1E3A5F]" /> },
    { type: 'Packs' as Tab, title: 'April Board Pack', body: 'Board of Directors', date: 'April 6, 2024', snippet: 'Pack includes agenda, financial statements, and strategy papers', icon: <BookOpen className="w-5 h-5 text-green-600" /> },
    { type: 'Actions' as Tab, title: 'Review Q1 Financial Statements', body: 'Audit & Risk Committee', date: 'Due April 30, 2024', snippet: 'Action assigned to Mike Salguero — currently overdue', icon: <CheckSquare className="w-5 h-5 text-amber-600" /> },
    { type: 'Decision Logs' as Tab, title: 'Approval of Q1 Financial Statements', body: 'Board of Directors', date: 'April 25, 2024', snippet: 'Unanimously approved by all board members present', icon: <FileText className="w-5 h-5 text-purple-600" /> },
    { type: 'Meetings' as Tab, title: 'Quarterly Financial Review', body: 'Audit & Risk Committee', date: 'April 30, 2024', snippet: 'Audit scope and cybersecurity review discussed', icon: <Calendar className="w-5 h-5 text-[#1E3A5F]" /> },
]

const TYPE_BADGE: Record<Tab, string> = {
    All: '',
    Meetings: 'bg-[#1E3A5F]/10 text-[#1E3A5F]',
    Packs: 'bg-green-100 text-green-700',
    Actions: 'bg-amber-100 text-amber-700',
    'Decision Logs': 'bg-purple-100 text-purple-700',
}

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [activeTab, setActiveTab] = useState<Tab>('All')

    const filtered = RESULTS.filter(r => {
        const tabOk = activeTab === 'All' || r.type === activeTab
        const queryOk = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.snippet.toLowerCase().includes(query.toLowerCase())
        return tabOk && queryOk
    })

    return (
        <div className="p-5 2xl:p-8 max-w-screen-2xl mx-auto">
            <div className="mb-6 2xl:mb-8">
                <h1 className="text-xl 2xl:text-3xl font-bold text-gray-900">Search</h1>
                <p className="text-sm 2xl:text-base text-gray-500 mt-0.5 2xl:mt-1">Search across meetings, packs, actions, and decision logs</p>
            </div>

            {/* Search bar */}
            <div className="relative mb-5 2xl:mb-6">
                <Search className="absolute left-4 2xl:left-5 top-1/2 -translate-y-1/2 w-5 h-5 2xl:w-6 2xl:h-6 text-gray-400" />
                <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search meetings, packs, actions, decision logs..." autoFocus
                    className="w-full pl-12 2xl:pl-14 pr-5 2xl:pr-6 py-3 2xl:py-4 text-base 2xl:text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F] shadow-sm transition-all placeholder:text-gray-400 min-h-[52px] 2xl:min-h-[60px]" />
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-2 flex-wrap mb-6 2xl:mb-8">
                {TABS.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-4 2xl:px-5 py-2.5 2xl:py-3 rounded-xl text-sm 2xl:text-base font-bold transition-colors min-h-[40px] 2xl:min-h-[48px] ${activeTab === tab ? 'bg-[#1E3A5F] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Recent searches */}
            {!query && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 2xl:p-6 mb-5 2xl:mb-6">
                    <div className="flex items-center gap-2 2xl:gap-3 mb-3 2xl:mb-4">
                        <Clock className="w-4 h-4 2xl:w-5 2xl:h-5 text-gray-400" />
                        <h2 className="text-base 2xl:text-lg font-bold text-gray-700">Recent Searches</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 2xl:gap-3">
                        {RECENT_SEARCHES.map((s, i) => (
                            <button key={i} onClick={() => setQuery(s)}
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm 2xl:text-base font-medium px-3 2xl:px-4 py-2 2xl:py-2.5 rounded-xl transition-colors min-h-[40px] 2xl:min-h-[44px]">
                                <Clock className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-gray-400" />
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Results */}
            {(query || activeTab !== 'All') && (
                <div className="space-y-2.5 2xl:space-y-3">
                    <p className="text-sm 2xl:text-base text-gray-500 font-medium mb-3 2xl:mb-4">{filtered.length} result{filtered.length !== 1 ? 's' : ''} found</p>
                    {filtered.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-100 p-10 2xl:p-12 text-center">
                            <Search className="w-10 h-10 2xl:w-12 2xl:h-12 text-gray-200 mx-auto mb-3 2xl:mb-4" />
                            <p className="text-base 2xl:text-lg font-bold text-gray-500">No results found</p>
                            <p className="text-sm 2xl:text-base text-gray-400 mt-1.5 2xl:mt-2">Try different keywords or clear the search</p>
                        </div>
                    ) : filtered.map((r, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 2xl:p-6 flex items-start gap-4 2xl:gap-5 hover:shadow-md transition-all cursor-pointer group">
                            <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:border-[#1E3A5F]/20">
                                {r.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 2xl:gap-3 mb-1 flex-wrap">
                                    <span className={`text-xs font-bold px-2.5 2xl:px-3 py-0.5 2xl:py-1 rounded-full ${TYPE_BADGE[r.type]}`}>{r.type}</span>
                                    <span className="text-xs 2xl:text-sm text-gray-400">{r.date}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 text-base 2xl:text-lg group-hover:text-[#1E3A5F] transition-colors">{r.title}</h3>
                                <p className="text-sm 2xl:text-base text-gray-500 mt-0.5">{r.body}</p>
                                <p className="text-sm 2xl:text-base text-gray-400 mt-1 leading-relaxed">{r.snippet}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 2xl:w-5 2xl:h-5 text-gray-300 group-hover:text-[#1E3A5F] flex-shrink-0 mt-1 transition-colors" />
                        </div>
                    ))}
                </div>
            )}

            {!query && activeTab === 'All' && (
                <div className="text-center py-12 2xl:py-16">
                    <Search className="w-12 h-12 2xl:w-14 2xl:h-14 text-gray-200 mx-auto mb-4 2xl:mb-5" />
                    <p className="text-lg 2xl:text-xl font-bold text-gray-400">Start typing to search</p>
                    <p className="text-sm 2xl:text-base text-gray-400 mt-1.5 2xl:mt-2">Search across meetings, packs, actions, and decision logs</p>
                </div>
            )}
        </div>
    )
}
