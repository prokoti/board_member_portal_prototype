'use client'

import { useState } from 'react'
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Video,
  Star,
} from 'lucide-react'

const MEETINGS = [
  { date: 'April 25, 2024', time: '10:00 AM', body: 'Board of Directors', title: 'Board of Directors Meeting', status: 'Pack Finalized', statusColor: 'bg-blue-100 text-blue-800', packStatus: 'Ready', packColor: 'bg-gray-100 text-gray-700', canJoin: true },
  { date: 'April 30, 2024', time: '2:00 PM', body: 'Audit & Risk Committee', title: 'Quarterly Financial Review', status: 'Scheduled', statusColor: 'bg-green-100 text-green-800', packStatus: 'Ready', packColor: 'bg-gray-100 text-gray-700', canJoin: true },
  { date: 'May 6, 2024', time: '9:00 AM', body: 'Compensation Committee', title: 'Executive Compensation Review', status: 'In Review', statusColor: 'bg-amber-100 text-amber-800', packStatus: 'No Pack Started', packColor: 'bg-gray-100 text-gray-500', canJoin: true },
  { date: 'May 15, 2024', time: '1:00 PM', body: 'Board of Directors', title: 'Strategy Session', status: 'Draft', statusColor: 'bg-gray-100 text-gray-700', packStatus: '—', packColor: '', canJoin: false },
  { date: 'May 22, 2024', time: '3:00 PM', body: 'Nomination Committee', title: 'Succession Planning Discussion', status: 'Draft', statusColor: 'bg-gray-100 text-gray-700', packStatus: '—', packColor: '', canJoin: false },
  { date: 'June 10, 2024', time: '11:00 AM', body: 'Audit & Risk Committee', title: 'Internal Audit Findings', status: 'Draft', statusColor: 'bg-gray-100 text-gray-700', packStatus: 'No Pack Started', packColor: 'bg-gray-100 text-gray-500', canJoin: false },
  { date: 'June 25, 2024', time: '8:00 AM', body: 'Compensation Committee', title: 'Compensation Policy Review', status: 'Scheduled', statusColor: 'bg-green-100 text-green-800', packStatus: '—', packColor: '', canJoin: true },
  { date: 'June 26, 2024', time: '1:00 PM', body: 'Audit & Risk Committee', title: 'Internal Controls Update', status: 'Draft', statusColor: 'bg-gray-100 text-gray-700', packStatus: '—', packColor: '', canJoin: false },
  { date: 'June 30, 2024', time: '9:00 AM', body: 'Board of Directors', title: 'Q2 Review Session', status: 'Draft', statusColor: 'bg-gray-100 text-gray-700', packStatus: '—', packColor: '', canJoin: false },
]

export default function BoardMemberMeetingsPage() {
  const [onlyMine, setOnlyMine] = useState(true)
  const [showOnly, setShowOnly] = useState(false)
  const [page, setPage] = useState(1)
  const total = 32
  const perPage = 9

  return (
    <div className="p-5 2xl:p-8 max-w-screen-2xl mx-auto">
      {/* Header — members cannot create meetings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 2xl:gap-4 mb-6 2xl:mb-8">
        <div>
          <h1 className="text-xl 2xl:text-3xl font-bold text-gray-900">Meetings</h1>
          <p className="text-sm 2xl:text-base text-gray-500 mt-0.5 2xl:mt-1">View upcoming board meetings and join sessions you are invited to</p>
        </div>
        {/* Read-only badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs 2xl:text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
          <Eye className="w-3.5 h-3.5" /> View only
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 2xl:gap-3 px-5 2xl:px-6 py-4 2xl:py-5 border-b border-gray-100">
          <button className="flex items-center gap-2 text-sm 2xl:text-base font-semibold border border-gray-200 rounded-xl px-3 2xl:px-4 py-2.5 2xl:py-3 hover:bg-gray-50 text-gray-700 min-h-[40px] 2xl:min-h-[48px]">
            <Calendar className="w-4 h-4 text-gray-400" /> All Bodies <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button className="flex items-center gap-2 text-sm 2xl:text-base font-semibold border border-gray-200 rounded-xl px-3 2xl:px-4 py-2.5 2xl:py-3 hover:bg-gray-50 text-gray-700 min-h-[40px] 2xl:min-h-[48px]">
            <Star className="w-4 h-4 text-gray-400" /> All Statuses <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button className="flex items-center gap-2 text-sm 2xl:text-base font-semibold border border-gray-200 rounded-xl px-3 2xl:px-4 py-2.5 2xl:py-3 hover:bg-gray-50 text-gray-400 min-h-[40px] 2xl:min-h-[48px]">
            From... <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button className="flex items-center gap-2 text-sm 2xl:text-base font-semibold border border-gray-200 rounded-xl px-3 2xl:px-4 py-2.5 2xl:py-3 hover:bg-gray-50 text-gray-400 min-h-[40px] 2xl:min-h-[48px]">
            To... <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Checkboxes */}
        <div className="flex items-center gap-6 2xl:gap-8 px-5 2xl:px-6 py-3 2xl:py-4 border-b border-gray-50 bg-gray-50/40">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input type="checkbox" checked={onlyMine} onChange={e => setOnlyMine(e.target.checked)} className="accent-purple-600 w-4 h-4 2xl:w-5 2xl:h-5 rounded" />
            <span className="text-sm 2xl:text-base text-gray-800 font-semibold">Only my meetings</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input type="checkbox" checked={showOnly} onChange={e => setShowOnly(e.target.checked)} className="accent-purple-600 w-4 h-4 2xl:w-5 2xl:h-5 rounded" />
            <span className="text-sm 2xl:text-base text-gray-800 font-semibold">Show only meetings</span>
          </label>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 2xl:px-6 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide w-44 2xl:w-52">Date / Time</th>
                <th className="text-left px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Body</th>
                <th className="text-left px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Title</th>
                <th className="text-left px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Pack</th>
                <th className="text-left px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Join</th>
              </tr>
            </thead>
            <tbody>
              {MEETINGS.map((m, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-purple-50/20 transition-colors group">
                  <td className="px-5 2xl:px-6 py-4 2xl:py-5">
                    <div className="font-bold text-gray-900 text-sm 2xl:text-base">{m.date}</div>
                    <div className="text-xs 2xl:text-sm text-gray-500 mt-0.5">{m.time}</div>
                  </td>
                  <td className="px-4 py-4 2xl:py-5">
                    <div className="font-semibold text-gray-900 text-sm 2xl:text-base">{m.body}</div>
                  </td>
                  <td className="px-4 py-4 2xl:py-5 font-medium text-gray-800 text-sm 2xl:text-base">{m.title}</td>
                  <td className="px-4 py-4 2xl:py-5">
                    <span className={`text-xs 2xl:text-sm font-bold px-2.5 2xl:px-3 py-1 2xl:py-1.5 rounded-full ${m.statusColor}`}>{m.status}</span>
                  </td>
                  <td className="px-4 py-4 2xl:py-5">
                    {m.packStatus === '—' ? (
                      <span className="text-gray-400 text-sm 2xl:text-base">—</span>
                    ) : (
                      <span className={`text-xs 2xl:text-sm font-semibold px-2.5 2xl:px-3 py-1 rounded-lg ${m.packColor}`}>{m.packStatus}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 2xl:py-5">
                    {m.canJoin ? (
                      <button className="inline-flex items-center gap-1.5 px-3 2xl:px-4 py-1.5 2xl:py-2 text-xs 2xl:text-sm font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors">
                        <Video className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" /> Join
                      </button>
                    ) : (
                      <span className="text-xs text-gray-300 font-medium">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 2xl:px-6 py-4 2xl:py-5 border-t border-gray-100">
          <p className="text-sm 2xl:text-base text-gray-600 font-medium">
            {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}
          </p>
          <div className="flex items-center gap-1.5 2xl:gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="p-2 2xl:p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 disabled:opacity-40 text-gray-600">
              <ChevronLeft className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </button>
            {[1, 2, 3, 4].map(n => (
              <button key={n} onClick={() => setPage(n)}
                className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-xl text-sm 2xl:text-base font-bold transition-colors ${page === n ? 'bg-purple-600 text-white' : 'hover:bg-gray-100 text-gray-600 border border-gray-200'}`}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(4, p + 1))} disabled={page === 4}
              className="p-2 2xl:p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 disabled:opacity-40 text-gray-600">
              <ChevronRight className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}