'use client'

import Link from 'next/link'
import { Calendar, Users, FileText, CheckCircle, Clock, AlertCircle, Plus, ChevronRight } from 'lucide-react'

const upcomingMeetings = [
    { id: '1', title: 'Board Meeting', date: 'Apr 27, 2025', time: '10:00 AM', status: 'Scheduled', directors: 16, confirmed: 14 },
    { id: '2', title: 'Remuneration Committee', date: 'Apr 28, 2025', time: '10:00 AM', status: 'Pack Draft', directors: 6, confirmed: 3 },
    { id: '3', title: 'Finance Committee', date: 'Apr 29, 2025', time: '2:00 PM', status: 'Circular', directors: 8, confirmed: 8 },
    { id: '4', title: 'Audit Committee', date: 'May 5, 2025', time: '9:00 AM', status: 'Planning', directors: 5, confirmed: 0 },
]

const stats = [
    { label: 'Upcoming Meetings', value: '4', icon: Calendar, color: 'text-[#5E43D8]', bg: 'bg-[#EDE8FB]' },
    { label: 'Active Directors', value: '21', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Actions', value: '12', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Completed Items', value: '89', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
]

const STATUS_STYLES: Record<string, string> = {
    Scheduled: 'bg-[#5E43D8]/15 text-[#5E43D8]',
    'Pack Draft': 'bg-blue-100 text-blue-600',
    Circular: 'bg-orange-100 text-orange-600',
    Planning: 'bg-gray-100 text-gray-500',
}

export default function BoardOpsDashboard() {
    return (
        <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4">
                {stats.map(s => (
                    <div key={s.label} className="bg-white rounded-xl p-4 shadow-[0_2px_12px_rgba(94,67,216,0.06)] border border-[#5E43D8]/5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center`}>
                                <s.icon style={{ width: 16, height: 16 }} className={s.color} />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-[#2D1B6B]">{s.value}</div>
                        <div className="text-xs text-[#2D1B6B]/50 font-medium mt-0.5">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Meetings Table */}
            <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(94,67,216,0.06)] border border-[#5E43D8]/5">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#F4F0FF]">
                    <h2 className="text-sm font-bold text-[#2D1B6B]">Upcoming Meetings</h2>
                    <button className="flex items-center gap-1.5 bg-[#5E43D8] hover:bg-[#4B36AD] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-[0_2px_8px_rgba(94,67,216,0.25)]">
                        <Plus style={{ width: 12, height: 12 }} />
                        Schedule Meeting
                    </button>
                </div>

                <div className="divide-y divide-[#F4F0FF]">
                    {upcomingMeetings.map(m => (
                        <div key={m.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#FAFAFE] transition-colors group">
                            <div className="w-10 h-10 bg-[#EDE8FB] rounded-xl flex items-center justify-center flex-shrink-0">
                                <FileText style={{ width: 16, height: 16 }} className="text-[#5E43D8]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#2D1B6B]">{m.title}</p>
                                <p className="text-xs text-[#2D1B6B]/40">{m.date} · {m.time}</p>
                            </div>
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[m.status]}`}>{m.status}</span>
                            <div className="text-right">
                                <p className="text-xs font-semibold text-[#2D1B6B]">{m.confirmed}/{m.directors}</p>
                                <p className="text-[10px] text-[#2D1B6B]/40">confirmed</p>
                            </div>
                            <ChevronRight style={{ width: 14, height: 14 }} className="text-[#2D1B6B]/20 group-hover:text-[#5E43D8] transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick notice */}
            <div className="bg-[#EDE8FB] border border-[#5E43D8]/20 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle style={{ width: 16, height: 16 }} className="text-[#5E43D8] flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-semibold text-[#2D1B6B]">Board Pack for Apr 27 Board Meeting is in draft</p>
                    <p className="text-xs text-[#2D1B6B]/60 mt-0.5">3 agenda items still need supporting documents. Pack must be published 5 days before the meeting.</p>
                    <button className="text-xs font-bold text-[#5E43D8] mt-2 hover:text-[#4B36AD] transition-colors">Review Pack →</button>
                </div>
            </div>
        </div>
    )
}
