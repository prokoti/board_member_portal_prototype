'use client'

import React, { useState } from 'react'
import {
    BarChart2, Download, ChevronDown, TrendingUp,
    ArrowUpRight, DollarSign, Users, Globe,
    Calendar, Filter
} from 'lucide-react'

const MONTHLY = [
    { month: 'Jul 2023', clients: 6, arr: '$312,000', commission: '$6,500', growth: '+8%' },
    { month: 'Aug 2023', clients: 7, arr: '$348,000', commission: '$7,250', growth: '+11%' },
    { month: 'Sep 2023', clients: 7, arr: '$360,000', commission: '$7,800', growth: '+7%' },
    { month: 'Oct 2023', clients: 8, arr: '$408,000', commission: '$9,200', growth: '+18%' },
    { month: 'Nov 2023', clients: 9, arr: '$468,000', commission: '$10,400', growth: '+13%' },
    { month: 'Dec 2023', clients: 9, arr: '$480,000', commission: '$11,000', growth: '+6%' },
    { month: 'Jan 2024', clients: 10, arr: '$540,000', commission: '$12,450', growth: '+13%' },
]

const TOP_CLIENTS = [
    { company: 'Alpha Holdings', country: '🇬🇧 UK', revenue: '$120,000', commission: '$2,500', share: '22%' },
    { company: 'Omega Tech', country: '🇦🇪 UAE', revenue: '$72,000', commission: '$1,500', share: '13%' },
    { company: 'BoardCorp Ltd', country: '🇺🇸 USA', revenue: '$60,000', commission: '$1,250', share: '11%' },
    { company: 'Global Manufacturing', country: '🇩🇪 Germany', revenue: '$90,000', commission: '$1,875', share: '17%' },
    { company: 'SriLanka Energy', country: '🇱🇰 Sri Lanka', revenue: '$45,000', commission: '$938', share: '8%' },
]

const BAR_HEIGHTS = [40, 50, 58, 68, 76, 82, 100]

export default function ReportsPage() {
    const [period, setPeriod] = useState('1Y')

    return (
        <div className="p-6 w-full max-w-screen-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Detailed revenue, commission, and growth analytics</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border rounded-xl text-sm text-gray-700 hover:bg-gray-50">
                        <Calendar className="w-4 h-4" /> Jan 2024 – Jul 2024 <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition">
                        <Download className="w-4 h-4" /> Export PDF
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total ARR', value: '$1.25M', delta: '+22%', icon: <DollarSign className="w-5 h-5" />, color: 'bg-indigo-100 text-indigo-600' },
                    { label: 'Total Commission', value: '$64,600', delta: '+19%', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-green-100 text-green-600' },
                    { label: 'New Clients', value: '+4', delta: 'This Period', icon: <Users className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
                    { label: 'Avg. Commission/Client', value: '$1,245', delta: '+8%', icon: <Globe className="w-5 h-5" />, color: 'bg-purple-100 text-purple-600' },
                ].map((k, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <div className={`inline-flex p-2 rounded-lg ${k.color} mb-3`}>{k.icon}</div>
                        <p className="text-xs text-gray-500 font-medium">{k.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-0.5">{k.value}</p>
                        <p className="text-xs text-green-600 font-medium flex items-center gap-0.5 mt-1">
                            <ArrowUpRight className="w-3 h-3" /> {k.delta}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-gray-900">Monthly Commission Trend</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Commission earned per month</p>
                        </div>
                        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                            {['6M', '1Y', 'All'].map(p => (
                                <button key={p} onClick={() => setPeriod(p)}
                                    className={`px-3 py-1 rounded-md text-xs font-medium transition ${period === p ? 'bg-white shadow text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}>
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-52 flex items-end gap-3 pb-4">
                        {BAR_HEIGHTS.map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group h-full">
                                <div
                                    className="bg-indigo-100 group-hover:bg-indigo-400 w-full rounded-t-lg transition-all duration-300 relative"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white shadow opacity-0 group-hover:opacity-100 transition"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 font-medium px-1 mt-2">
                        {MONTHLY.map(m => <span key={m.month}>{m.month.slice(0, 3)}</span>)}
                    </div>
                </div>

                {/* Region Breakdown */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-5">Revenue by Region</h3>
                    <div className="space-y-4">
                        {[
                            { region: 'USA', pct: 35, color: 'bg-indigo-500', amount: '$437K' },
                            { region: 'UK', pct: 24, color: 'bg-blue-400', amount: '$299K' },
                            { region: 'Singapore', pct: 15, color: 'bg-green-400', amount: '$187K' },
                            { region: 'UAE', pct: 13, color: 'bg-yellow-400', amount: '$162K' },
                            { region: 'Other', pct: 13, color: 'bg-gray-300', amount: '$164K' },
                        ].map((r, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="font-medium text-gray-700">{r.region}</span>
                                    <div className="flex gap-3">
                                        <span className="font-bold text-gray-900">{r.pct}%</span>
                                        <span className="text-gray-500">{r.amount}</span>
                                    </div>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Monthly Breakdown Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Monthly Breakdown</h3>
                    <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:bg-gray-50 px-3 py-1.5 rounded-lg border">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 font-medium">
                                <th className="px-5 py-3">Month</th>
                                <th className="px-5 py-3">Active Clients</th>
                                <th className="px-5 py-3">Total ARR</th>
                                <th className="px-5 py-3">Commission Earned</th>
                                <th className="px-5 py-3">Growth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MONTHLY.map((m, i) => (
                                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50 transition">
                                    <td className="px-5 py-4 font-semibold text-gray-900">{m.month}</td>
                                    <td className="px-5 py-4 text-gray-600">{m.clients}</td>
                                    <td className="px-5 py-4 font-semibold text-gray-900">{m.arr}</td>
                                    <td className="px-5 py-4 font-bold text-green-600">{m.commission}</td>
                                    <td className="px-5 py-4">
                                        <span className="inline-flex items-center gap-1 text-green-600 font-semibold text-xs">
                                            <ArrowUpRight className="w-3 h-3" /> {m.growth}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Top Clients */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Top Clients by Revenue</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 font-medium">
                                <th className="px-5 py-3">Client</th>
                                <th className="px-5 py-3">Country</th>
                                <th className="px-5 py-3">Revenue</th>
                                <th className="px-5 py-3">Your Commission</th>
                                <th className="px-5 py-3">Revenue Share</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TOP_CLIENTS.map((c, i) => (
                                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50 transition">
                                    <td className="px-5 py-4 font-semibold text-gray-900">{c.company}</td>
                                    <td className="px-5 py-4 text-gray-600">{c.country}</td>
                                    <td className="px-5 py-4 font-semibold text-gray-900">{c.revenue}</td>
                                    <td className="px-5 py-4 font-bold text-green-600">{c.commission}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: c.share }}></div>
                                            </div>
                                            <span className="text-xs font-semibold text-gray-600">{c.share}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
