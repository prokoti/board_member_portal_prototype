'use client'

import { useState } from 'react'
import {
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Plus,
    LayoutGrid,
    Star,
} from 'lucide-react'

const MEETINGS = [
    { date: 'April 25, 2024', time: '10:00 AM', body: 'Board of Directors', title: 'Board of Directors Meeting', status: 'Pack Finalized', statusColor: 'bg-blue-100 text-blue-800', packStatus: 'Ready', packColor: 'bg-gray-100 text-gray-700' },
    { date: 'April 30, 2024', time: '2:00 PM', body: 'Audit & Risk Committee', title: 'Quarterly Financial Review', status: 'Scheduled', statusColor: 'bg-green-100 text-green-800', packStatus: 'Ready', packColor: 'bg-gray-100 text-gray-700' },
    { date: 'May 6, 2024', time: '9:00 AM', body: 'Compensation Committee', title: 'Executive Compensation Review', status: 'In Review', statusColor: 'bg-amber-100 text-amber-800', packStatus: 'No Pack Started', packColor: 'bg-gray-100 text-gray-500' },
    { date: 'May 15, 2024', time: '1:00 PM', body: 'Board of Directors', title: 'Strategy Session', status: 'Draft', statusColor: 'bg-gray-100 text-gray-700', packStatus: '—', packColor: '' },
    { date: 'May 22, 2024', time: '3:00 PM', body: 'Nomination Committee', title: 'Succession Planning Discussion', status: 'Draft', statusColor: 'bg-gray-100 text-gray-700', packStatus: '—', packColor: '' },
    { date: 'June 10, 2024', time: '11:00 AM', body: 'Audit & Risk Committee', title: 'Internal Audit Findings', status: 'Draft', statusColor: 'bg-gray-100 text-gray-700', packStatus: 'No Pack Started', packColor: 'bg-gray-100 text-gray-500' },
    { date: 'June 25, 2024', time: '8:00 AM', body: 'Compensation Committee', title: 'Compensation Policy Review', status: 'Scheduled', statusColor: 'bg-green-100 text-green-800', packStatus: '—', packColor: '' },
    { date: 'June 26, 2024', time: '1:00 PM', body: 'Audit & Risk Committee', title: 'Internal Controls Update', status: 'Draft', statusColor: 'bg-gray-100 text-gray-700', packStatus: '—', packColor: '' },
    { date: 'June 30, 2024', time: '9:00 AM', body: 'Board of Directors', title: 'Q2 Review Session', status: 'Draft', statusColor: 'bg-gray-100 text-gray-700', packStatus: '—', packColor: '' },
]

export default function MeetingsPage() {
    const [onlyMine, setOnlyMine] = useState(true)
    const [showOnly, setShowOnly] = useState(false)
    const [page, setPage] = useState(1)
    const total = 32
    const perPage = 9

    return (
        <div className="p-8 max-w-screen-2xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
                    <p className="text-base text-gray-500 mt-1">Manage and track all board meetings</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#1E3A5F] text-white text-base font-bold px-5 py-3 rounded-xl hover:bg-[#2D5A8E] transition-colors flex items-center gap-2 shadow-sm min-h-[48px]">
                        <Plus className="w-5 h-5" /> Create Meeting
                    </button>
                    <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 min-h-[48px]">
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 px-6 py-5 border-b border-gray-100">
                    <button className="flex items-center gap-2 text-base font-semibold border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 text-gray-700 min-h-[48px]">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        All Bodies
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="flex items-center gap-2 text-base font-semibold border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 text-gray-700 min-h-[48px]">
                        <Star className="w-4 h-4 text-gray-400" />
                        All Statuses
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="flex items-center gap-2 text-base font-semibold border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 text-gray-400 min-h-[48px]">
                        From...
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="flex items-center gap-2 text-base font-semibold border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 text-gray-400 min-h-[48px]">
                        To...
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                </div>

                {/* Checkboxes */}
                <div className="flex items-center gap-8 px-6 py-4 border-b border-gray-50 bg-gray-50/40">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input type="checkbox" checked={onlyMine} onChange={e => setOnlyMine(e.target.checked)} className="accent-[#1E3A5F] w-5 h-5 rounded" />
                        <span className="text-base text-gray-800 font-semibold">Only my meetings</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input type="checkbox" checked={showOnly} onChange={e => setShowOnly(e.target.checked)} className="accent-[#1E3A5F] w-5 h-5 rounded" />
                        <span className="text-base text-gray-800 font-semibold">Show only meetings</span>
                    </label>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="text-left px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wide w-44">Date / Time</th>
                                <th className="text-left px-4 py-4 text-sm font-bold text-gray-500 uppercase tracking-wide">Body</th>
                                <th className="text-left px-4 py-4 text-sm font-bold text-gray-500 uppercase tracking-wide">Title</th>
                                <th className="text-left px-4 py-4 text-sm font-bold text-gray-500 uppercase tracking-wide">Status</th>
                                <th className="text-left px-4 py-4 text-sm font-bold text-gray-500 uppercase tracking-wide">Pack</th>
                                <th className="px-4 py-4" />
                            </tr>
                        </thead>
                        <tbody>
                            {MEETINGS.map((m, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-gray-900 text-base">{m.date}</div>
                                        <div className="text-sm text-gray-500 mt-0.5">{m.time}</div>
                                    </td>
                                    <td className="px-4 py-5">
                                        <div className="font-semibold text-gray-900 text-base">{m.body}</div>
                                    </td>
                                    <td className="px-4 py-5 font-medium text-gray-800 text-base">{m.title}</td>
                                    <td className="px-4 py-5">
                                        <span className={`text-sm font-bold px-3 py-1.5 rounded-full ${m.statusColor}`}>{m.status}</span>
                                    </td>
                                    <td className="px-4 py-5">
                                        {m.packStatus === '—' ? (
                                            <span className="text-gray-400 text-base">—</span>
                                        ) : (
                                            <span className={`text-sm font-semibold px-2.5 py-1 rounded-lg ${m.packColor}`}>{m.packStatus}</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-5">
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold text-[#1E3A5F] border border-[#1E3A5F]/20 px-4 py-2 rounded-lg hover:bg-[#1E3A5F] hover:text-white min-h-[40px]">
                                            Open
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-5 border-t border-gray-100">
                    <p className="text-base text-gray-600 font-medium">
                        {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}
                    </p>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 disabled:opacity-40 text-gray-600">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        {[1, 2, 3, 4].map(n => (
                            <button key={n} onClick={() => setPage(n)}
                                className={`w-10 h-10 rounded-xl text-base font-bold transition-colors ${page === n ? 'bg-[#1E3A5F] text-white' : 'hover:bg-gray-100 text-gray-600 border border-gray-200'}`}>
                                {n}
                            </button>
                        ))}
                        <button onClick={() => setPage(p => Math.min(4, p + 1))} disabled={page === 4}
                            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 disabled:opacity-40 text-gray-600">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
