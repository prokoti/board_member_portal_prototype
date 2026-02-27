'use client'

import {
    Calendar,
    CheckSquare,
    BookOpen,
    ChevronRight,
    TrendingUp,
    FileText,
    Users,
} from 'lucide-react'

const UPCOMING_MEETINGS = [
    { date: 'Apr 25', time: '10:00 AM', body: 'Board of Directors', title: 'Board of Directors Meeting', status: 'Pack Finalized', statusColor: 'bg-blue-100 text-blue-800' },
    { date: 'Apr 30', time: '2:00 PM', body: 'Audit & Risk Committee', title: 'Quarterly Financial Review', status: 'Scheduled', statusColor: 'bg-green-100 text-green-800' },
    { date: 'May 6', time: '9:00 AM', body: 'Compensation Committee', title: 'Executive Compensation Review', status: 'In Review', statusColor: 'bg-amber-100 text-amber-800' },
    { date: 'May 15', time: '1:00 PM', body: 'Board of Directors', title: 'Strategy Session', status: 'Draft', statusColor: 'bg-gray-100 text-gray-700' },
    { date: 'May 22', time: '3:00 PM', body: 'Nomination Committee', title: 'Succession Planning', status: 'Draft', statusColor: 'bg-gray-100 text-gray-700' },
]

const MY_ACTIONS = [
    { title: 'Review financial statements', body: 'Audit & Risk Committee', urgency: 'overdue' as const, due: 'Overdue' },
    { title: 'Prepare presentation on strategy', body: 'Board of Directors', urgency: 'due-soon' as const, due: 'Due Soon' },
    { title: 'Follow up on policy compliance', body: 'Compensation Committee', urgency: 'due-soon' as const, due: 'Due Soon' },
]

const RECENT_PACKS = [
    { title: 'April Audit & Risk Pack', time: '11hr ago', progress: 100 },
    { title: 'April Board Pack', time: '3hr ago', progress: 80 },
    { title: 'Q1 Financial Review', time: '4hr ago', progress: 88 },
]

const NOTIFICATIONS = [
    { title: 'Quarterly Financial Review', detail: 'Pack released and ready to read.', time: '10m ago' },
    { title: 'Audit & Risk Committee', detail: 'Internal Audit Report returned with comments.', time: '1h ago' },
    { title: 'Compensation Committee', detail: 'Minutes waiting for your approval.', time: '4h ago' },
    { title: 'Board of Directors', detail: 'Meeting Pack is ready.', time: '1d ago' },
]

const RECENT_PACKS_RIGHT = [
    { title: 'April Audit & Risk Pack', time: '11m ago', progress: 100 },
    { title: 'April Board Pack', time: '3d ago', progress: 86 },
    { title: 'Q1 Financial Review', time: '4hr ago', progress: 100 },
    { title: 'March RemCo Review', time: '1d ago', progress: 100 },
]

export default function BoardOpsDashboardPage() {
    return (
        <div className="p-5 2xl:p-8 max-w-screen-2xl mx-auto">
            {/* Title row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 2xl:gap-4 mb-6 2xl:mb-8">
                <div>
                    <h1 className="text-xl 2xl:text-3xl font-bold text-gray-900">BoardOps Home</h1>
                    <p className="text-sm 2xl:text-base text-gray-500 mt-0.5 2xl:mt-1">Welcome back — here&apos;s what&apos;s happening</p>
                </div>
                <div className="sm:ml-auto flex items-center gap-2 2xl:gap-3 flex-wrap">
                    <select className="text-sm 2xl:text-base border border-gray-200 rounded-xl px-3 2xl:px-4 py-2 2xl:py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 text-gray-700 min-h-[40px] 2xl:min-h-[44px]">
                        <option>All Bodies</option>
                        <option>Board of Directors</option>
                        <option>Audit &amp; Risk</option>
                    </select>
                    <select className="text-sm 2xl:text-base border border-gray-200 rounded-xl px-3 2xl:px-4 py-2 2xl:py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 text-gray-700 min-h-[40px] 2xl:min-h-[44px]">
                        <option>This month</option>
                        <option>Last month</option>
                    </select>
                    <button className="bg-[#1E3A5F] text-white text-sm 2xl:text-base font-bold px-4 2xl:px-5 py-2 2xl:py-2.5 rounded-xl hover:bg-[#2D5A8E] transition-colors shadow-sm min-h-[40px] 2xl:min-h-[44px]">
                        Open Next Meeting
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-5 2xl:gap-6">
                {/* Left col */}
                <div className="2xl:col-span-2 space-y-5 2xl:space-y-6">
                    {/* Upcoming Meetings */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between px-5 2xl:px-6 py-4 2xl:py-5 border-b border-gray-100">
                            <div className="flex items-center gap-2 2xl:gap-3">
                                <Calendar className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#1E3A5F]" />
                                <h2 className="text-base 2xl:text-lg font-bold text-gray-900">Upcoming Meetings</h2>
                            </div>
                            <button className="text-sm font-semibold text-[#1E3A5F] hover:underline flex items-center gap-1">
                                Open Next <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm 2xl:text-base">
                                <thead>
                                    <tr className="border-b border-gray-50 bg-gray-50/50">
                                        <th className="text-left px-5 2xl:px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Date</th>
                                        <th className="text-left px-3 2xl:px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Body</th>
                                        <th className="text-left px-3 2xl:px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Meeting</th>
                                        <th className="text-left px-3 2xl:px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Status</th>
                                        <th className="px-3 2xl:px-4 py-3" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {UPCOMING_MEETINGS.map((m, i) => (
                                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="px-5 2xl:px-6 py-3 2xl:py-4">
                                                <div className="font-bold text-gray-900">{m.date}</div>
                                                <div className="text-xs text-gray-500">{m.time}</div>
                                            </td>
                                            <td className="px-3 2xl:px-4 py-3 2xl:py-4 font-semibold text-gray-900">{m.body}</td>
                                            <td className="px-3 2xl:px-4 py-3 2xl:py-4 text-gray-700">{m.title}</td>
                                            <td className="px-3 2xl:px-4 py-3 2xl:py-4">
                                                <span className={`text-xs font-bold px-2.5 2xl:px-3 py-1 2xl:py-1.5 rounded-full ${m.statusColor}`}>{m.status}</span>
                                            </td>
                                            <td className="px-3 2xl:px-4 py-3 2xl:py-4">
                                                <button className="text-xs 2xl:text-sm font-bold text-[#1E3A5F] border border-[#1E3A5F]/25 px-3 2xl:px-4 py-1.5 2xl:py-2 rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-all">
                                                    Open
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* My Actions + Recent Packs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 2xl:gap-6">
                        {/* My Actions */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="flex items-center justify-between px-5 2xl:px-6 py-4 2xl:py-5 border-b border-gray-100">
                                <div className="flex items-center gap-2 2xl:gap-3">
                                    <CheckSquare className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#1E3A5F]" />
                                    <h2 className="text-base 2xl:text-lg font-bold text-gray-900">My Actions</h2>
                                </div>
                                <span className="bg-red-100 text-red-700 font-bold px-2.5 2xl:px-3 py-1 rounded-full text-xs 2xl:text-sm">Overdue (1)</span>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {MY_ACTIONS.map((a, i) => (
                                    <div key={i} className="flex items-start gap-3 2xl:gap-4 px-5 2xl:px-6 py-3 2xl:py-4 hover:bg-gray-50/50">
                                        <div className={`mt-1.5 2xl:mt-2 w-2.5 h-2.5 2xl:w-3 2xl:h-3 rounded-full flex-shrink-0 ${a.urgency === 'overdue' ? 'bg-red-500' : 'bg-amber-400'}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm 2xl:text-base font-semibold text-gray-900 leading-tight">{a.title}</p>
                                            <p className="text-xs 2xl:text-sm text-gray-400 mt-0.5">{a.body}</p>
                                        </div>
                                        <span className={`text-xs 2xl:text-sm font-bold px-2 2xl:px-2.5 py-0.5 2xl:py-1 rounded-full flex-shrink-0 ${a.urgency === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{a.due}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="px-5 2xl:px-6 py-3 2xl:py-4 border-t border-gray-100">
                                <button className="text-sm font-bold text-[#1E3A5F] hover:underline">View All Actions</button>
                            </div>
                        </div>

                        {/* Recent Packs */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="flex items-center justify-between px-5 2xl:px-6 py-4 2xl:py-5 border-b border-gray-100">
                                <div className="flex items-center gap-2 2xl:gap-3">
                                    <BookOpen className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#1E3A5F]" />
                                    <h2 className="text-base 2xl:text-lg font-bold text-gray-900">Recent Packs</h2>
                                </div>
                                <TrendingUp className="w-4 h-4 2xl:w-5 2xl:h-5 text-gray-400" />
                            </div>
                            <div className="px-5 2xl:px-6 py-4 2xl:py-5 space-y-4 2xl:space-y-5">
                                {RECENT_PACKS.map((p, i) => (
                                    <div key={i} className="space-y-1.5 2xl:space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2 2xl:gap-3">
                                                <div className="w-7 h-7 2xl:w-8 2xl:h-8 bg-[#1E3A5F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <FileText className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-[#1E3A5F]" />
                                                </div>
                                                <span className="text-sm 2xl:text-base font-semibold text-gray-900 leading-tight">{p.title}</span>
                                            </div>
                                            <span className="text-xs text-gray-400 flex-shrink-0">{p.time}</span>
                                        </div>
                                        <div className="ml-9 2xl:ml-11">
                                            <div className="h-1.5 2xl:h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8E] rounded-full" style={{ width: `${p.progress}%` }} />
                                            </div>
                                            <div className="flex justify-end mt-0.5 2xl:mt-1">
                                                <span className="text-xs font-bold text-gray-500">{p.progress}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-5 2xl:px-6 py-3 2xl:py-4 border-t border-gray-100">
                                <button className="text-sm font-bold text-[#1E3A5F] hover:underline">View All Packs</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right col */}
                <div className="space-y-5 2xl:space-y-6">
                    {/* Notifications */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between px-5 2xl:px-6 py-4 2xl:py-5 border-b border-gray-100">
                            <h2 className="text-base 2xl:text-lg font-bold text-gray-900">Notifications</h2>
                            <button className="text-sm font-bold text-[#1E3A5F] hover:underline">Mark all read</button>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {NOTIFICATIONS.map((n, i) => (
                                <div key={i} className="px-5 2xl:px-6 py-3 2xl:py-4 hover:bg-gray-50 cursor-pointer">
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 2xl:w-8 2xl:h-8 bg-[#1E3A5F]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <FileText className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-[#1E3A5F]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm 2xl:text-base font-bold text-gray-900 leading-tight">{n.title}</p>
                                            <p className="text-xs 2xl:text-sm text-gray-500 mt-0.5 leading-snug">{n.detail}</p>
                                        </div>
                                        <span className="text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">{n.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Packs right panel */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between px-5 2xl:px-6 py-4 2xl:py-5 border-b border-gray-100">
                            <h2 className="text-base 2xl:text-lg font-bold text-gray-900">Recent Packs</h2>
                            <Users className="w-4 h-4 2xl:w-5 2xl:h-5 text-gray-400" />
                        </div>
                        <div className="divide-y divide-gray-50">
                            {RECENT_PACKS_RIGHT.map((p, i) => (
                                <div key={i} className="px-5 2xl:px-6 py-3 2xl:py-4 hover:bg-gray-50 cursor-pointer">
                                    <div className="flex items-center gap-2 2xl:gap-3 mb-1.5 2xl:mb-2">
                                        <div className="w-7 h-7 2xl:w-8 2xl:h-8 bg-[#1E3A5F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-[#1E3A5F]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm 2xl:text-base font-semibold text-gray-900 truncate">{p.title}</p>
                                            <p className="text-xs text-gray-400">{p.time}</p>
                                        </div>
                                    </div>
                                    <div className="ml-9 2xl:ml-11">
                                        <div className="h-1.5 2xl:h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8E] rounded-full" style={{ width: `${p.progress}%` }} />
                                        </div>
                                        <div className="flex justify-end mt-0.5 2xl:mt-1">
                                            <span className="text-xs font-bold text-gray-500">{p.progress}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-5 2xl:px-6 py-3 2xl:py-4 border-t border-gray-100">
                            <button className="text-sm font-bold text-[#1E3A5F] hover:underline">View All Packs</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
