'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckSquare, ChevronLeft, ChevronRight, AlertCircle, Clock, Eye, ThumbsUp, ThumbsDown } from 'lucide-react'

// Seeded vote counts per action
const INITIAL_VOTES: Record<string, { up: number; down: number }> = {
  'A-001': { up: 4, down: 1 },
  'A-002': { up: 2, down: 0 },
  'A-003': { up: 1, down: 2 },
  'A-004': { up: 0, down: 0 },
  'A-005': { up: 6, down: 0 },
  'A-006': { up: 3, down: 1 },
  'A-007': { up: 0, down: 1 },
  'A-008': { up: 2, down: 3 },
}

const ACTIONS = [
  { id: 'A-001', packId: '1', title: 'Review Q1 Financial Statements', assignee: 'Mike Salguero', body: 'Board of Directors', due: 'April 30, 2024', status: 'In Progress', priority: 'High', overdue: true },
  { id: 'A-002', packId: '2', title: 'Prepare Executive Compensation Proposal', assignee: 'Jane Smith', body: 'Compensation Committee', due: 'May 6, 2024', status: 'In Progress', priority: 'High', overdue: false },
  { id: 'A-003', packId: '3', title: 'Audit Report Findings Analysis', assignee: 'Arjun Senppta', body: 'Audit & Risk Committee', due: 'May 10, 2024', status: 'Not Started', priority: 'Medium', overdue: false },
  { id: 'A-004', packId: '4', title: 'Update Succession Planning Framework', assignee: 'Pereela Longhtescu', body: 'Nomination Committee', due: 'May 22, 2024', status: 'Not Started', priority: 'Low', overdue: false },
  { id: 'A-005', packId: '5', title: 'Finalise Dividend Policy Report', assignee: 'Mike Salguero', body: 'Board of Directors', due: 'May 15, 2024', status: 'Complete', priority: 'Medium', overdue: false },
  { id: 'A-006', packId: '6', title: 'Draft Data Retention Policy', assignee: 'Isi Zhang', body: 'Audit & Risk Committee', due: 'June 10, 2024', status: 'In Progress', priority: 'High', overdue: false },
  { id: 'A-007', packId: '7', title: 'Technology Committee Formation', assignee: 'Jane Smith', body: 'Board of Directors', due: 'June 30, 2024', status: 'Not Started', priority: 'Medium', overdue: false },
  { id: 'A-008', packId: '8', title: 'Budget Reforecast Q3', assignee: 'Arjun Senppta', body: 'Board of Directors', due: 'July 15, 2024', status: 'Not Started', priority: 'High', overdue: false },
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

export default function BoardMemberActionsPage() {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [votes, setVotes] = useState<Record<string, { up: number; down: number }>>(INITIAL_VOTES)
  // myVote tracks whether the current user has upvoted (+1), downvoted (-1), or not voted (0) per action
  const [myVote, setMyVote] = useState<Record<string, 1 | -1 | 0>>({})

  const filtered = ACTIONS.filter(a => statusFilter === 'All Statuses' || a.status === statusFilter)

  const handleVote = (id: string, type: 'up' | 'down') => {
    const current = myVote[id] ?? 0
    const alreadyVoted = (type === 'up' && current === 1) || (type === 'down' && current === -1)

    setVotes(prev => {
      const v = { ...prev[id] }
      // Remove previous vote
      if (current === 1) v.up = Math.max(0, v.up - 1)
      if (current === -1) v.down = Math.max(0, v.down - 1)
      // Apply new vote (toggle off if same)
      if (!alreadyVoted) {
        if (type === 'up') v.up += 1
        if (type === 'down') v.down += 1
      }
      return { ...prev, [id]: v }
    })

    setMyVote(prev => ({
      ...prev,
      [id]: alreadyVoted ? 0 : type === 'up' ? 1 : -1,
    }))
  }

  return (
    <div className="p-5 2xl:p-8 max-w-screen-2xl mx-auto">
      {/* Header — no "Create Action" button for members */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 2xl:gap-4 mb-6 2xl:mb-8">
        <div>
          <h1 className="text-xl 2xl:text-3xl font-bold text-gray-900">Actions</h1>
          <p className="text-sm 2xl:text-base text-gray-500 mt-0.5 2xl:mt-1">View your assigned action items, vote on priorities, and join linked meetings</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs 2xl:text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
          <Eye className="w-3.5 h-3.5" /> View only
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 2xl:gap-4 mb-5 2xl:mb-6">
        {[
          { label: 'Total', value: ACTIONS.length, color: 'text-purple-700', bg: 'bg-purple-50', icon: <CheckSquare className="w-4 h-4 2xl:w-5 2xl:h-5 text-purple-600" /> },
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
        {/* Filter tabs */}
        <div className="flex flex-wrap items-center gap-2 2xl:gap-3 px-5 2xl:px-6 py-4 2xl:py-5 border-b border-gray-100">
          {['All Statuses', 'In Progress', 'Not Started', 'Complete'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`text-sm 2xl:text-base font-semibold px-3 2xl:px-4 py-2 2xl:py-2.5 rounded-xl transition-colors min-h-[40px] 2xl:min-h-[44px] ${statusFilter === s ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
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
                <th className="text-center px-3 2xl:px-4 py-3 2xl:py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Vote</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const v = votes[a.id] ?? { up: 0, down: 0 }
                const mv = myVote[a.id] ?? 0
                const score = v.up - v.down
                return (
                  <tr
                    key={a.id}
                    onClick={() => router.push(`/board-member/packs/${a.packId}`)}
                    className="border-b border-gray-50 hover:bg-purple-50/40 transition-colors cursor-pointer group"
                  >
                    <td className="px-5 2xl:px-6 py-3.5 2xl:py-5">
                      <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 2xl:px-2.5 py-1 2xl:py-1.5 rounded-lg">{a.id}</span>
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

                    {/* ── Vote column ── */}
                    <td className="px-3 2xl:px-4 py-3.5 2xl:py-5">
                      <div className="flex items-center justify-center gap-1">
                        {/* Upvote */}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleVote(a.id, 'up') }}
                          title="Upvote"
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${mv === 1
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600'
                            }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{v.up}</span>
                        </button>

                        {/* Net score */}
                        <span className={`text-xs font-bold w-5 text-center ${score > 0 ? 'text-green-600' : score < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                          {score > 0 ? `+${score}` : score}
                        </span>

                        {/* Downvote */}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleVote(a.id, 'down') }}
                          title="Downvote"
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${mv === -1
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600'
                            }`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                          <span>{v.down}</span>
                        </button>
                      </div>
                    </td>


                  </tr>
                )
              })}
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