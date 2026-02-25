'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    RadialBarChart, RadialBar, Legend
} from 'recharts'
import { MapPin, ChevronLeft, ChevronRight, CheckCircle, Clock, FileText, ChevronRight as Arrow } from 'lucide-react'
import AiCoSec from '@/components/AiCoSec'

// ─── Mock Data ────────────────────────────────────────────────────
const meetings = [
    { id: '1', date: 27, month: 'APR', title: 'Board Meeting', time: '10:00AM – 11:00AM', status: 'Scheduled', type: 'meeting' },
    { id: '2', date: 28, month: 'APR', title: 'Remuneration Meeting', time: '10:00AM – 11:00AM', status: 'Scheduled', type: 'meeting' },
    { id: '3', date: 29, month: 'APR', title: 'Finance Meeting', time: '2:00PM – 3:00PM', status: 'Circular', type: 'circular' },
]

const agendaItems = [
    'Call to Order',
    'Approval of Previous Meeting Minutes',
    'Matters Arising from Previous Minutes',
    'Licensing of Prokoti',
    'Governance and Compliance',
    'Committee Reports',
    'Q&A & Adjournment',
]

const pieData = [
    { name: '22M Q2', value: 22, fill: '#FF9500' },
    { name: '18M Q2', value: 18, fill: '#FF6B35' },
    { name: '30M Q1', value: 30, fill: '#5E43D8' },
    { name: '30M Q1', value: 30, fill: '#8B72E8' },
]

const barData = [
    { quarter: 'Q1', Actual: 30, Budget: 28 },
    { quarter: 'Q2', Actual: 40, Budget: 35 },
    { quarter: 'Q3', Actual: 38, Budget: 42 },
    { quarter: 'Q4', Actual: 55, Budget: 50 },
]

const gaugeData = [{ name: 'Revenue', value: 99.5, fill: '#5E43D8' }]

// ─── Gauge Chart ──────────────────────────────────────────────────
function GaugeChart() {
    return (
        <div className="relative flex flex-col items-center justify-center h-36">
            <svg width="160" height="100" viewBox="0 0 160 100">
                {/* Background arc */}
                <path
                    d="M 15 90 A 65 65 0 0 1 145 90"
                    fill="none"
                    stroke="#EDE8FB"
                    strokeWidth="14"
                    strokeLinecap="round"
                />
                {/* Filled arc (representing 92/100 = ~99.5%) */}
                <path
                    d="M 15 90 A 65 65 0 0 1 143 90"
                    fill="none"
                    stroke="url(#gaugeGrad)"
                    strokeWidth="14"
                    strokeLinecap="round"
                />
                {/* Tick marks */}
                {Array.from({ length: 11 }).map((_, i) => {
                    const angle = -180 + i * 18
                    const rad = (angle * Math.PI) / 180
                    const x1 = 80 + 58 * Math.cos(rad)
                    const y1 = 90 + 58 * Math.sin(rad)
                    const x2 = 80 + 50 * Math.cos(rad)
                    const y2 = 90 + 50 * Math.sin(rad)
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C4B5FD" strokeWidth="1.5" />
                })}
                <defs>
                    <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#C4B5FD" />
                        <stop offset="100%" stopColor="#5E43D8" />
                    </linearGradient>
                </defs>
                {/* Center needle */}
                <line x1="80" y1="90" x2="80" y2="40" stroke="#5E43D8" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="80" cy="90" r="5" fill="#5E43D8" />
            </svg>
            <div className="flex justify-between w-36 text-[10px] text-[#2D1B6B]/40 font-medium -mt-3">
                <span>0.00M</span>
                <span>92M</span>
            </div>
            <div className="text-xl font-bold text-[#2D1B6B] mt-1">92M</div>
            <div className="text-xs text-[#2D1B6B]/50">Total Revenue</div>
        </div>
    )
}

const STATUS_STYLES: Record<string, string> = {
    Scheduled: 'bg-[#5E43D8]/15 text-[#5E43D8]',
    Circular: 'bg-orange-100 text-orange-600',
}

export default function DashboardPage() {
    const [selectedMeeting, setSelectedMeeting] = useState(meetings[0])
    const [kpiTab, setKpiTab] = useState<'Financials' | 'ESG'>('Financials')
    const [confirmed, setConfirmed] = useState(false)

    return (
        <div className="flex flex-col gap-5 p-5 min-h-[calc(100vh-64px)]">
            {/* Main 3-column grid */}
            <div className="grid grid-cols-[280px_1fr_300px] gap-5 flex-1">

                {/* ── Left: Calendar + Meetings ────────────────── */}
                <div className="flex flex-col gap-4">
                    {/* Calendar Card */}
                    <div className="bg-gradient-to-b from-[#3D1F8F] to-[#2D1B6B] rounded-xl p-5 text-white shadow-[0_4px_24px_rgba(45,27,107,0.3)]">
                        <div className="flex items-center justify-between mb-4">
                            <button className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                <ChevronLeft style={{ width: 14, height: 14 }} />
                            </button>
                            <h2 className="text-base font-bold tracking-tight">April 2025</h2>
                            <button className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                <ChevronRight style={{ width: 14, height: 14 }} />
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            {['Remuneration', 'Finance', 'Audit'].map((label, i) => (
                                <span key={i} className="text-[10px] font-semibold text-white/50">{i > 0 ? '/ ' : ''}{label}</span>
                            ))}
                        </div>

                        {/* Meeting list */}
                        <div className="space-y-2.5">
                            {meetings.map(m => (
                                <button
                                    key={m.id}
                                    onClick={() => setSelectedMeeting(m)}
                                    className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left ${selectedMeeting.id === m.id
                                            ? 'bg-white/20 shadow-inner'
                                            : 'bg-white/8 hover:bg-white/12'
                                        }`}
                                    style={{ backgroundColor: selectedMeeting.id === m.id ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)' }}
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-white/15 rounded-lg flex flex-col items-center justify-center">
                                        <span className="text-[9px] font-bold text-white/60 uppercase leading-none">{m.month}</span>
                                        <span className="text-base font-bold text-white leading-tight">{m.date}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white truncate">{m.title}</p>
                                        <p className="text-[10px] text-white/50 mb-1">Meeting · {m.time}</p>
                                        <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${m.status === 'Scheduled' ? 'bg-[#5E43D8]/60 text-white' : 'bg-orange-400/80 text-white'
                                            }`}>
                                            {m.status}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Center: Agenda + KPIs ─────────────────────── */}
                <div className="flex flex-col gap-5">
                    {/* Meeting Agenda */}
                    <div className="bg-white rounded-xl shadow-card p-5">
                        <div className="flex items-start justify-between mb-1">
                            <div>
                                <h2 className="text-xl font-bold text-[#2D1B6B]">{selectedMeeting.title}</h2>
                                <p className="text-sm text-[#2D1B6B]/40 font-medium">Agenda</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 bg-[#EDE8FB] text-[#5E43D8] text-xs font-semibold px-3 py-1.5 rounded-full">
                                    <CheckCircle style={{ width: 12, height: 12 }} />
                                    Pack Published – Prep 30% complete
                                </div>
                                <button className="flex items-center gap-1.5 border border-[#5E43D8]/20 text-[#5E43D8] text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#F4F0FF] transition-colors">
                                    + Add Question
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 space-y-1">
                            {agendaItems.map((item, i) => (
                                <Link
                                    key={i}
                                    href="/portal/paper/1"
                                    className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-[#F4F0FF] text-[#2D1B6B] group transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText style={{ width: 15, height: 15 }} className="text-[#5E43D8]/50 flex-shrink-0" />
                                        <span className="text-sm font-medium">{item}</span>
                                    </div>
                                    <Arrow style={{ width: 15, height: 15 }} className="text-[#2D1B6B]/20 group-hover:text-[#5E43D8] transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* KPI Section */}
                    <div className="bg-white rounded-xl shadow-card p-5">
                        {/* Tabs */}
                        <div className="flex items-center gap-1 mb-5">
                            {(['Financials', 'ESG'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setKpiTab(tab)}
                                    className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${kpiTab === tab
                                            ? 'bg-[#2D1B6B] text-white shadow-md'
                                            : 'text-[#2D1B6B]/50 hover:bg-[#F4F0FF]'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {kpiTab === 'Financials' ? (
                            <div className="grid grid-cols-3 gap-4">
                                {/* Pie Chart */}
                                <div className="bg-[#F4F0FF]/50 rounded-xl p-4">
                                    <p className="text-xs font-bold text-[#2D1B6B] mb-2 text-center">Quarter Wise Revenue</p>
                                    <ResponsiveContainer width="100%" height={130}>
                                        <PieChart>
                                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={28} outerRadius={52} paddingAngle={2} dataKey="value">
                                                {pieData.map((entry, index) => (
                                                    <Cell key={index} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(v: number) => [`${v}M`, '']} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="grid grid-cols-2 gap-1 mt-2">
                                        {pieData.map((d, i) => (
                                            <div key={i} className="flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.fill }} />
                                                <span className="text-[9px] font-medium text-[#2D1B6B]/60">{d.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Gauge */}
                                <div className="bg-[#F4F0FF]/50 rounded-xl p-4 flex flex-col items-center justify-center">
                                    <p className="text-xs font-bold text-[#2D1B6B] mb-1 text-center">Total Revenue</p>
                                    <GaugeChart />
                                </div>

                                {/* Bar Chart */}
                                <div className="bg-[#F4F0FF]/50 rounded-xl p-4">
                                    <p className="text-xs font-bold text-[#2D1B6B] mb-2 text-center">Actual vs Budget</p>
                                    <ResponsiveContainer width="100%" height={140}>
                                        <BarChart data={barData} barSize={10} barGap={3}>
                                            <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: '#2D1B6B', opacity: 0.5 }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fontSize: 9, fill: '#2D1B6B', opacity: 0.4 }} axisLine={false} tickLine={false} />
                                            <Tooltip />
                                            <Bar dataKey="Actual" fill="#5E43D8" radius={[3, 3, 0, 0]} />
                                            <Bar dataKey="Budget" fill="#C4B5FD" radius={[3, 3, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <div className="flex items-center gap-3 mt-1">
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-[#5E43D8]" /><span className="text-[9px] text-[#2D1B6B]/50">Actual</span></div>
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-[#C4B5FD]" /><span className="text-[9px] text-[#2D1B6B]/50">Budget</span></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-[#F4F0FF]/50 rounded-xl p-4 text-center">
                                    <p className="text-xs font-bold text-[#2D1B6B] mb-3">ESG Score</p>
                                    <div className="text-3xl font-black text-[#5E43D8] mb-1">78<span className="text-base">/100</span></div>
                                    <div className="w-full bg-[#EDE8FB] rounded-full h-2"><div className="h-2 rounded-full bg-gradient-to-r from-[#5E43D8] to-[#8B72E8]" style={{ width: '78%' }} /></div>
                                    <p className="text-[10px] text-green-600 font-semibold mt-2">↑ +12 pts YoY</p>
                                </div>
                                <div className="bg-[#F4F0FF]/50 rounded-xl p-4 text-center">
                                    <p className="text-xs font-bold text-[#2D1B6B] mb-3">Carbon Emissions</p>
                                    <div className="text-3xl font-black text-[#5E43D8] mb-1">42<span className="text-base">kt</span></div>
                                    <div className="w-full bg-[#EDE8FB] rounded-full h-2"><div className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: '42%' }} /></div>
                                    <p className="text-[10px] text-green-600 font-semibold mt-2">↓ -8% vs target</p>
                                </div>
                                <div className="bg-[#F4F0FF]/50 rounded-xl p-4 text-center">
                                    <p className="text-xs font-bold text-[#2D1B6B] mb-3">Board Diversity</p>
                                    <div className="text-3xl font-black text-[#5E43D8] mb-1">45<span className="text-base">%</span></div>
                                    <div className="w-full bg-[#EDE8FB] rounded-full h-2"><div className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500" style={{ width: '45%' }} /></div>
                                    <p className="text-[10px] text-orange-600 font-semibold mt-2">Target: 50%</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Right: Attendance + AI CoSec ─────────────── */}
                <div className="flex flex-col gap-4">
                    {/* Attendance Card */}
                    <div className="bg-white rounded-xl shadow-card p-5">
                        <h3 className="text-sm font-bold text-[#2D1B6B] mb-4">Attendance</h3>
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                            <div className="flex items-center gap-1.5 bg-[#EDE8FB] text-[#5E43D8] text-xs font-bold px-3 py-1.5 rounded-full">
                                Invited <span className="font-black">16</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full border border-orange-100">
                                <Clock style={{ width: 10, height: 10 }} />
                                Pending <span className="font-black">21</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-red-50 text-red-500 text-xs font-bold px-3 py-1.5 rounded-full border border-red-100">
                                Declined <span className="font-black">2</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4 bg-[#F4F0FF] px-3 py-2.5 rounded-xl">
                            <MapPin style={{ width: 14, height: 14 }} className="text-[#5E43D8] flex-shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-[#2D1B6B]">BoardPAC</p>
                                <p className="text-xs text-[#2D1B6B]/50">Main Board Room</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setConfirmed(!confirmed)}
                            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all shadow-[0_3px_10px_rgba(94,67,216,0.25)] ${confirmed
                                    ? 'bg-green-500 text-white shadow-[0_3px_10px_rgba(34,197,94,0.25)]'
                                    : 'bg-[#5E43D8] hover:bg-[#4B36AD] text-white'
                                }`}
                        >
                            {confirmed ? '✓ Participation Confirmed' : 'Confirm my participation'}
                        </button>
                    </div>

                    {/* AI CoSec */}
                    <AiCoSec context="dashboard" className="flex-1" />
                </div>
            </div>
        </div>
    )
}
