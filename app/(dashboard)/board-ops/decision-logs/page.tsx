'use client'

import { useState } from 'react'
import { FileText, ChevronDown, ChevronLeft, ChevronRight, Download, Calendar, Tag, Filter } from 'lucide-react'

const DECISION_LOGS = [
    { id: 'DL-001', title: 'Approval of Q1 Financial Statements', body: 'Board of Directors', meeting: 'Board of Directors Meeting', date: 'April 25, 2024', madeBy: 'Mike Salguero', category: 'Financial', categoryColor: 'bg-blue-100 text-blue-700', status: 'Approved', statusColor: 'bg-green-100 text-green-700', notes: 'Unanimously approved by all board members present. The Q1 financial statements were reviewed in detail and found to be in compliance with all applicable standards.' },
    { id: 'DL-002', title: 'Executive Compensation Package Amendment', body: 'Compensation Committee', meeting: 'Executive Compensation Review', date: 'May 6, 2024', madeBy: 'Jane Smith', category: 'HR & Compensation', categoryColor: 'bg-purple-100 text-purple-700', status: 'Approved', statusColor: 'bg-green-100 text-green-700', notes: 'Approved with minor amendments to the bonus structure. Long-term incentive plan to be reviewed in Q3.' },
    { id: 'DL-003', title: 'Internal Audit Scope Expansion', body: 'Audit & Risk Committee', meeting: 'Quarterly Financial Review', date: 'April 30, 2024', madeBy: 'Arjun Senppta', category: 'Audit & Risk', categoryColor: 'bg-red-100 text-red-700', status: 'Approved', statusColor: 'bg-green-100 text-green-700', notes: 'Scope expanded to include cybersecurity and data governance audits for FY2024.' },
    { id: 'DL-004', title: 'Succession Planning Framework Adoption', body: 'Nomination Committee', meeting: 'Succession Planning Discussion', date: 'May 22, 2024', madeBy: 'Pereela Longhtescu', category: 'Governance', categoryColor: 'bg-amber-100 text-amber-700', status: 'Deferred', statusColor: 'bg-amber-100 text-amber-700', notes: 'Deferred pending additional stakeholder consultation. To be revisited at the next nomination committee meeting.' },
    { id: 'DL-005', title: 'Dividend Policy Update for FY2024', body: 'Board of Directors', meeting: 'Strategy Session', date: 'May 15, 2024', madeBy: 'Mike Salguero', category: 'Financial', categoryColor: 'bg-blue-100 text-blue-700', status: 'In Review', statusColor: 'bg-yellow-100 text-yellow-700', notes: 'Under legal and compliance review. Final decision expected before end of Q2.' },
    { id: 'DL-006', title: 'Data Retention Policy Revision', body: 'Audit & Risk Committee', meeting: 'Internal Audit Findings', date: 'June 10, 2024', madeBy: 'Isi Zhang', category: 'Compliance', categoryColor: 'bg-indigo-100 text-indigo-700', status: 'Approved', statusColor: 'bg-green-100 text-green-700', notes: 'Policy revised to align with new data protection regulations. Implementation deadline set for September 2024.' },
    { id: 'DL-007', title: 'New Technology Sub-Committee Formation', body: 'Board of Directors', meeting: 'Board of Directors Meeting', date: 'April 25, 2024', madeBy: 'Jane Smith', category: 'Governance', categoryColor: 'bg-amber-100 text-amber-700', status: 'Approved', statusColor: 'bg-green-100 text-green-700', notes: 'Technology sub-committee formed with 5 members. First meeting scheduled for June 2024.' },
    { id: 'DL-008', title: 'Annual Budget Approval FY2025', body: 'Board of Directors', meeting: 'Strategy Session', date: 'May 15, 2024', madeBy: 'Arjun Senppta', category: 'Financial', categoryColor: 'bg-blue-100 text-blue-700', status: 'Approved', statusColor: 'bg-green-100 text-green-700', notes: 'Budget approved with a 5% contingency reserve. CFO to present Q1 reforecast in July.' },
]

const CATEGORIES = ['All Categories', 'Financial', 'Governance', 'Audit & Risk', 'HR & Compensation', 'Compliance']
const STATUSES = ['All Statuses', 'Approved', 'Deferred', 'In Review', 'Rejected']

export default function DecisionLogsPage() {
    const [catFilter, setCatFilter] = useState('All Categories')
    const [statusFilter, setStatusFilter] = useState('All Statuses')
    const [expanded, setExpanded] = useState<number | null>(null)

    const filtered = DECISION_LOGS.filter(d =>
        (catFilter === 'All Categories' || d.category === catFilter) &&
        (statusFilter === 'All Statuses' || d.status === statusFilter)
    )

    const stats = [
        { label: 'Total Decisions', value: DECISION_LOGS.length, icon: <FileText className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#1E3A5F]" />, bg: 'bg-[#1E3A5F]/10' },
        { label: 'Approved', value: DECISION_LOGS.filter(d => d.status === 'Approved').length, icon: <Tag className="w-4 h-4 2xl:w-5 2xl:h-5 text-green-600" />, bg: 'bg-green-100' },
        { label: 'In Review', value: DECISION_LOGS.filter(d => d.status === 'In Review').length, icon: <Calendar className="w-4 h-4 2xl:w-5 2xl:h-5 text-amber-600" />, bg: 'bg-amber-100' },
        { label: 'Deferred', value: DECISION_LOGS.filter(d => d.status === 'Deferred').length, icon: <Filter className="w-4 h-4 2xl:w-5 2xl:h-5 text-purple-600" />, bg: 'bg-purple-100' },
    ]

    return (
        <div className="p-5 2xl:p-8 max-w-screen-2xl mx-auto">
            <div className="flex items-center justify-between mb-6 2xl:mb-8">
                <div>
                    <h1 className="text-xl 2xl:text-3xl font-bold text-gray-900">Decision Logs</h1>
                    <p className="text-sm 2xl:text-base text-gray-500 mt-0.5 2xl:mt-1">Permanent record of all board decisions and resolutions</p>
                </div>
                <button className="p-2.5 2xl:p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600"><Download className="w-4 h-4 2xl:w-5 2xl:h-5" /></button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 2xl:gap-4 mb-5 2xl:mb-6">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 2xl:p-5 flex items-center gap-3 2xl:gap-4">
                        <div className={`w-10 h-10 2xl:w-12 2xl:h-12 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>{s.icon}</div>
                        <div>
                            <p className="text-2xl 2xl:text-3xl font-bold text-gray-900">{s.value}</p>
                            <p className="text-xs 2xl:text-sm text-gray-500 font-medium">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 2xl:gap-3 px-5 2xl:px-6 py-4 2xl:py-5 border-b border-gray-100">
                    <div className="relative">
                        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
                            className="text-sm 2xl:text-base border border-gray-200 rounded-xl pl-3 2xl:pl-4 pr-8 2xl:pr-10 py-2 2xl:py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 text-gray-700 appearance-none cursor-pointer min-h-[40px] 2xl:min-h-[48px]">
                            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2.5 2xl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                            className="text-sm 2xl:text-base border border-gray-200 rounded-xl pl-3 2xl:pl-4 pr-8 2xl:pr-10 py-2 2xl:py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 text-gray-700 appearance-none cursor-pointer min-h-[40px] 2xl:min-h-[48px]">
                            {STATUSES.map(s => <option key={s}>{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2.5 2xl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <span className="ml-auto text-sm 2xl:text-base text-gray-400 font-medium">{filtered.length} decision{filtered.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="text-left px-5 2xl:px-6 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide w-24 2xl:w-28">Ref</th>
                                <th className="text-left px-3 2xl:px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Decision</th>
                                <th className="text-left px-3 2xl:px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Category</th>
                                <th className="text-left px-3 2xl:px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Date</th>
                                <th className="text-left px-3 2xl:px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Status</th>
                                <th className="px-3 2xl:px-4 py-3 2xl:py-4 w-8 2xl:w-10" />
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((d, i) => (
                                <tr key={d.id} onClick={() => setExpanded(expanded === i ? null : i)} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer">
                                    <td className="px-5 2xl:px-6 py-3.5 2xl:py-5 align-top">
                                        <span className="text-xs font-mono font-bold text-[#1E3A5F] bg-[#1E3A5F]/10 px-2 2xl:px-2.5 py-1 2xl:py-1.5 rounded-lg">{d.id}</span>
                                    </td>
                                    <td className="px-3 2xl:px-4 py-3.5 2xl:py-5">
                                        <p className="font-bold text-gray-900 text-sm 2xl:text-base leading-snug">{d.title}</p>
                                        <p className="text-xs 2xl:text-sm text-gray-400 mt-0.5">{d.body} · {d.meeting}</p>
                                        {expanded === i && (
                                            <div className="mt-3 2xl:mt-4 bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 rounded-xl 2xl:rounded-2xl p-4 2xl:p-5">
                                                <p className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider mb-2">Resolution Notes</p>
                                                <p className="text-sm 2xl:text-base text-gray-700 leading-relaxed">{d.notes}</p>
                                                <div className="flex flex-wrap gap-4 2xl:gap-6 mt-3 2xl:mt-4 pt-3 2xl:pt-4 border-t border-[#1E3A5F]/10">
                                                    <span className="text-xs 2xl:text-sm text-gray-500">Decided by: <span className="font-bold text-gray-800">{d.madeBy}</span></span>
                                                    <span className="text-xs 2xl:text-sm text-gray-500">Meeting: <span className="font-bold text-gray-800">{d.meeting}</span></span>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-3 2xl:px-4 py-3.5 2xl:py-5 align-top">
                                        <span className={`text-xs font-bold px-2.5 2xl:px-3 py-1 2xl:py-1.5 rounded-full ${d.categoryColor}`}>{d.category}</span>
                                    </td>
                                    <td className="px-3 2xl:px-4 py-3.5 2xl:py-5 text-sm 2xl:text-base text-gray-700 whitespace-nowrap align-top">{d.date}</td>
                                    <td className="px-3 2xl:px-4 py-3.5 2xl:py-5 align-top">
                                        <span className={`text-xs font-bold px-2.5 2xl:px-3 py-1 2xl:py-1.5 rounded-full ${d.statusColor}`}>{d.status}</span>
                                    </td>
                                    <td className="px-3 2xl:px-4 py-3.5 2xl:py-5 align-top">
                                        <ChevronDown className={`w-4 h-4 2xl:w-5 2xl:h-5 text-gray-400 transition-transform duration-200 ${expanded === i ? 'rotate-180' : ''}`} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between px-5 2xl:px-6 py-4 2xl:py-5 border-t border-gray-100">
                    <p className="text-sm 2xl:text-base text-gray-600 font-medium">1–{filtered.length} of {DECISION_LOGS.length}</p>
                    <div className="flex items-center gap-1.5">
                        <button disabled className="p-2 2xl:p-2.5 rounded-xl border border-gray-200 disabled:opacity-40 text-gray-600"><ChevronLeft className="w-4 h-4 2xl:w-5 2xl:h-5" /></button>
                        <button disabled className="p-2 2xl:p-2.5 rounded-xl border border-gray-200 disabled:opacity-40 text-gray-600"><ChevronRight className="w-4 h-4 2xl:w-5 2xl:h-5" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
