'use client'

import { useState } from 'react'
import { CheckSquare, ChevronLeft, ChevronRight, Plus, AlertCircle, Clock } from 'lucide-react'

const ACTIONS = [
    { id: 'A-001', title: 'Review Q1 Financial Statements', assignee: 'Mike Salguero', body: 'Board of Directors', due: 'April 30, 2024', status: 'In Progress', priority: 'High', overdue: true },
    { id: 'A-002', title: 'Prepare Executive Compensation Proposal', assignee: 'Jane Smith', body: 'Compensation Committee', due: 'May 6, 2024', status: 'In Progress', priority: 'High', overdue: false },
    { id: 'A-003', title: 'Audit Report Findings Analysis', assignee: 'Arjun Senppta', body: 'Audit & Risk Committee', due: 'May 10, 2024', status: 'Not Started', priority: 'Medium', overdue: false },
    { id: 'A-004', title: 'Update Succession Planning Framework', assignee: 'Pereela Longhtescu', body: 'Nomination Committee', due: 'May 22, 2024', status: 'Not Started', priority: 'Low', overdue: false },
    { id: 'A-005', title: 'Finalise Dividend Policy Report', assignee: 'Mike Salguero', body: 'Board of Directors', due: 'May 15, 2024', status: 'Complete', priority: 'Medium', overdue: false },
    { id: 'A-006', title: 'Draft Data Retention Policy', assignee: 'Isi Zhang', body: 'Audit & Risk Committee', due: 'June 10, 2024', status: 'In Progress', priority: 'High', overdue: false },
    { id: 'A-007', title: 'Technology Committee Formation', assignee: 'Jane Smith', body: 'Board of Directors', due: 'June 30, 2024', status: 'Not Started', priority: 'Medium', overdue: false },
    { id: 'A-008', title: 'Budget Reforecast Q3', assignee: 'Arjun Senppta', body: 'Board of Directors', due: 'July 15, 2024', status: 'Not Started', priority: 'High', overdue: false },
]

const STATUS_COLOR: Record<string, string> = {
    'In Progress': 'bg-blue-100 text-blue-800',
    'Not Started': 'bg-gray-100 text-gray-700',
    'Complete': 'bg-green-100 text-green-800',
}

const PRIORITY_COLOR: Record<string, string> = {
    'High': 'bg-red-100 text-red-700',
    'Medium': 'bg-amber-100 text-amber-700',
    'Low': 'bg-gray-100 text-gray-600',
}

export default function ActionsPage() {
    const [statusFilter, setStatusFilter] = useState('All Statuses')
    const filtered = ACTIONS.filter(a => statusFilter === 'All Statuses' || a.status === statusFilter)

    return (
        <div className="p-5 2xl:p-8 max-w-screen-2xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 2xl:gap-4 mb-6 2xl:mb-8">
                <div>
                    <h1 className="text-xl 2xl:text-3xl font-bold text-gray-900">Actions</h1>
                    <p className="text-sm 2xl:text-base text-gray-500 mt-0.5 2xl:mt-1">Track and manage all board action items</p>
                </div>
                <button className="bg-[#1E3A5F] text-white text-sm 2xl:text-base font-bold px-4 2xl:px-5 py-2.5 2xl:py-3 rounded-xl hover:bg-[#2D5A8E] transition-colors flex items-center gap-2 shadow-sm min-h-[40px] 2xl:min-h-[48px] self-start sm:self-auto">
                    <Plus className="w-4 h-4 2xl:w-5 2xl:h-5" /> Create Action
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 2xl:gap-4 mb-5 2xl:mb-6">
                {[
                    { label: 'Total', value: ACTIONS.length, color: 'text-[#1E3A5F]', bg: 'bg-[#1E3A5F]/10', icon: <CheckSquare className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#1E3A5F]" /> },
                    { label: 'Overdue', value: ACTIONS.filter(a => a.overdue).length, color: 'text-red-700', bg: 'bg-red-100', icon: <AlertCircle className="w-4 h-4 2xl:w-5 2xl:h-5 text-red-600" /> },
                    { label: 'In Progress', value: ACTIONS.filter(a => a.status === 'In Progress').length, color: 'text-blue-700', bg: 'bg-blue-100', icon: <Clock className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600" /> },
                    { label: 'Complete', value: ACTIONS.filter(a => a.status === 'Complete').length, color: 'text-green-700', bg: 'bg-green-100', icon: <CheckSquare className="w-4 h-4 2xl:w-5 2xl:h-5 text-green-600" /> },
                ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 2xl:p-5 flex items-center gap-3 2xl:gap-4">
                        <div className={`w-10 h-10 2xl:w-12 2xl:h-12 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>{s.icon}</div>
                        <div>
                            <p className={`text-2xl 2xl:text-3xl font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-xs 2xl:text-sm text-gray-500 font-medium">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 2xl:gap-3 px-5 2xl:px-6 py-4 2xl:py-5 border-b border-gray-100">
                    {['All Statuses', 'In Progress', 'Not Started', 'Complete'].map(s => (
                        <button key={s} onClick={() => setStatusFilter(s)}
                            className={`text-sm 2xl:text-base font-semibold px-3 2xl:px-4 py-2 2xl:py-2.5 rounded-xl transition-colors min-h-[40px] 2xl:min-h-[44px] ${statusFilter === s ? 'bg-[#1E3A5F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            {s}
                        </button>
                    ))}
                    <span className="ml-auto text-sm 2xl:text-base text-gray-400">{filtered.length} actions</span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="text-left px-5 2xl:px-6 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide w-20 2xl:w-24">ID</th>
                                <th className="text-left px-3 2xl:px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Action</th>
                                <th className="text-left px-3 2xl:px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Assignee</th>
                                <th className="text-left px-3 2xl:px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Due Date</th>
                                <th className="text-left px-3 2xl:px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Priority</th>
                                <th className="text-left px-3 2xl:px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((a, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer">
                                    <td className="px-5 2xl:px-6 py-3.5 2xl:py-5">
                                        <span className="text-xs font-mono font-bold text-[#1E3A5F] bg-[#1E3A5F]/10 px-2 2xl:px-2.5 py-1 2xl:py-1.5 rounded-lg">{a.id}</span>
                                    </td>
                                    <td className="px-3 2xl:px-4 py-3.5 2xl:py-5">
                                        <div className="flex items-start gap-2">
                                            {a.overdue && <AlertCircle className="w-4 h-4 2xl:w-5 2xl:h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm 2xl:text-base leading-snug">{a.title}</p>
                                                <p className="text-xs 2xl:text-sm text-gray-400 mt-0.5">{a.body}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 2xl:px-4 py-3.5 2xl:py-5 text-sm 2xl:text-base font-medium text-gray-800">{a.assignee}</td>
                                    <td className="px-3 2xl:px-4 py-3.5 2xl:py-5">
                                        <span className={`text-sm 2xl:text-base font-medium ${a.overdue ? 'text-red-600 font-bold' : 'text-gray-700'}`}>{a.due}</span>
                                        {a.overdue && <p className="text-xs text-red-500 font-bold mt-0.5">Overdue</p>}
                                    </td>
                                    <td className="px-3 2xl:px-4 py-3.5 2xl:py-5">
                                        <span className={`text-xs font-bold px-2.5 2xl:px-3 py-1 2xl:py-1.5 rounded-full ${PRIORITY_COLOR[a.priority]}`}>{a.priority}</span>
                                    </td>
                                    <td className="px-3 2xl:px-4 py-3.5 2xl:py-5">
                                        <span className={`text-xs font-bold px-2.5 2xl:px-3 py-1 2xl:py-1.5 rounded-full ${STATUS_COLOR[a.status]}`}>{a.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between px-5 2xl:px-6 py-4 2xl:py-5 border-t border-gray-100">
                    <p className="text-sm 2xl:text-base text-gray-600 font-medium">1–{filtered.length} of {ACTIONS.length}</p>
                    <div className="flex items-center gap-1.5 2xl:gap-2">
                        <button disabled className="p-2 2xl:p-2.5 rounded-xl border border-gray-200 disabled:opacity-40 text-gray-600"><ChevronLeft className="w-4 h-4 2xl:w-5 2xl:h-5" /></button>
                        <button disabled className="p-2 2xl:p-2.5 rounded-xl border border-gray-200 disabled:opacity-40 text-gray-600"><ChevronRight className="w-4 h-4 2xl:w-5 2xl:h-5" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
