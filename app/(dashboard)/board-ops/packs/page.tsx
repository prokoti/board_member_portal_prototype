'use client'

import { useState } from 'react'
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, Plus, Search, FileText, MoreVertical } from 'lucide-react'

const PACKS = [
    { title: 'Bodies & Membership', description: 'Manage boards, committees, and member roles', date: 'April 1, 2024', meta: 'Released April 24, 2024', status: 'Released', statusBg: 'bg-green-600', statusText: 'text-white', border: 'border-green-200' },
    { title: 'Templates', description: 'Set up agenda, pack, and minutes templates', date: 'April 1, 2024', meta: 'Released April 18, 2024', status: 'Released', statusBg: 'bg-green-600', statusText: 'text-white', border: 'border-green-200' },
    { title: 'April Board Pack', description: 'Set up agenda, pack, and minutes templates', date: 'May 6, 2024', meta: 'Released April 6, 2024', status: 'Released', statusBg: 'bg-green-600', statusText: 'text-white', border: 'border-green-200' },
    { title: 'Policies & Security', description: 'Control classifications, permissions, and retention', date: 'May 1, 2024', meta: 'Viewed 1 week ago', status: 'Draft', statusBg: 'bg-gray-100', statusText: 'text-gray-700', border: 'border-gray-200' },
    { title: 'March RemCo Review', description: 'Remuneration committee comprehensive review', date: 'April 2, 2024', meta: 'Released April 2, 2024', status: 'Released', statusBg: 'bg-green-600', statusText: 'text-white', border: 'border-green-200' },
    { title: 'May Board Pack', description: 'Board of Directors — Strategy & Operations', date: 'May 2024', meta: 'Viewed 8 minutes ago', status: 'Open', statusBg: 'bg-[#1E3A5F]', statusText: 'text-white', border: 'border-[#1E3A5F]/30' },
    { title: 'Q2 Risk Committee Pack', description: 'Board of Directors', date: '', meta: 'Viewed 21 weeks ago', status: 'In Progress', statusBg: 'bg-amber-500', statusText: 'text-white', border: 'border-amber-200' },
    { title: 'Nomination Committee Pack', description: 'Board of Directors', date: '', meta: 'Viewed 1 day ago', status: 'Draft', statusBg: 'bg-gray-100', statusText: 'text-gray-700', border: 'border-gray-200' },
    { title: 'Strategy Session', description: 'Board of Directors', date: '', meta: 'Viewed 1 day ago', status: 'Draft', statusBg: 'bg-gray-100', statusText: 'text-gray-700', border: 'border-gray-200' },
]

export default function PacksPage() {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const filtered = PACKS.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-5 2xl:p-8 max-w-screen-2xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 2xl:gap-4 mb-6 2xl:mb-8">
                <div>
                    <h1 className="text-xl 2xl:text-3xl font-bold text-gray-900">Packs</h1>
                    <p className="text-sm 2xl:text-base text-gray-500 mt-0.5 2xl:mt-1">Manage all board and committee packs</p>
                </div>
                <button className="bg-[#1E3A5F] text-white text-sm 2xl:text-base font-bold px-4 2xl:px-5 py-2.5 2xl:py-3 rounded-xl hover:bg-[#2D5A8E] transition-colors flex items-center gap-2 shadow-sm min-h-[40px] 2xl:min-h-[48px] self-start sm:self-auto">
                    <Plus className="w-4 h-4 2xl:w-5 2xl:h-5" /> Create Pack
                </button>
            </div>

            {/* Search + filters */}
            <div className="flex flex-wrap items-center gap-2 2xl:gap-3 mb-5 2xl:mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 px-5 2xl:px-6 py-4 2xl:py-5">
                <div className="relative flex-1 min-w-40">
                    <Search className="absolute left-3 2xl:left-4 top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-5 2xl:h-5 text-gray-400" />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search packs..."
                        className="w-full pl-9 2xl:pl-11 pr-3 2xl:pr-4 py-2.5 2xl:py-3 text-sm 2xl:text-base bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] transition-all min-h-[40px] 2xl:min-h-[48px]" />
                </div>
                <button className="flex items-center gap-2 text-sm 2xl:text-base font-semibold border border-gray-200 rounded-xl px-3 2xl:px-4 py-2.5 2xl:py-3 hover:bg-gray-50 text-gray-700 min-h-[40px] 2xl:min-h-[48px]">
                    <BookOpen className="w-4 h-4 text-gray-400" /> All Bodies <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                <button className="flex items-center gap-2 text-sm 2xl:text-base font-semibold border border-gray-200 rounded-xl px-3 2xl:px-4 py-2.5 2xl:py-3 hover:bg-gray-50 text-gray-700 min-h-[40px] 2xl:min-h-[48px]">
                    All Statuses <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 2xl:gap-5 mb-6 2xl:mb-8">
                {filtered.map((pack, i) => (
                    <div key={i} className={`bg-white rounded-2xl shadow-sm border ${pack.border} p-4 2xl:p-6 hover:shadow-md transition-all cursor-pointer group`}>
                        <div className="flex items-start justify-between mb-3 2xl:mb-4">
                            <div className="flex items-center gap-2 2xl:gap-3">
                                <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-xl bg-[#1E3A5F]/10 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#1E3A5F]" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm 2xl:text-base group-hover:text-[#1E3A5F] transition-colors leading-snug">{pack.title}</h3>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2 p-1"><MoreVertical className="w-4 h-4 2xl:w-5 2xl:h-5" /></button>
                        </div>
                        <p className="text-sm 2xl:text-base text-gray-500 leading-relaxed mb-3 2xl:mb-4">{pack.description}</p>
                        {pack.date && <p className="text-sm font-bold text-gray-800 mb-0.5">{pack.date}</p>}
                        <p className="text-xs 2xl:text-sm text-gray-400 mb-4 2xl:mb-5">{pack.meta}</p>
                        <div className="flex items-center justify-between">
                            <span className={`px-2.5 2xl:px-3 py-1 2xl:py-1.5 rounded-xl text-xs 2xl:text-sm font-bold ${pack.statusBg} ${pack.statusText}`}>{pack.status}</span>
                            <button className="text-xs 2xl:text-sm font-bold text-[#1E3A5F] hover:underline">Open →</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm 2xl:text-base text-gray-600 font-medium">1–{filtered.length} of 18</p>
                <div className="flex items-center gap-1.5 2xl:gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 2xl:p-2.5 rounded-xl border border-gray-200 hover:bg-white disabled:opacity-40 text-gray-600"><ChevronLeft className="w-4 h-4 2xl:w-5 2xl:h-5" /></button>
                    {[1, 2].map(n => (
                        <button key={n} onClick={() => setPage(n)} className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-xl text-sm 2xl:text-base font-bold transition-colors ${page === n ? 'bg-[#1E3A5F] text-white' : 'hover:bg-gray-100 text-gray-600 border border-gray-200'}`}>{n}</button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(2, p + 1))} disabled={page === 2} className="p-2 2xl:p-2.5 rounded-xl border border-gray-200 hover:bg-white disabled:opacity-40 text-gray-600"><ChevronRight className="w-4 h-4 2xl:w-5 2xl:h-5" /></button>
                </div>
            </div>
        </div>
    )
}
