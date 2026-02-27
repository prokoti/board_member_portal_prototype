'use client'

import React, { useState } from 'react'
import {
    Search, Filter, ChevronDown, Download, MoreVertical,
    Users, DollarSign, TrendingUp, Activity,
    ArrowUpRight, CheckCircle, XCircle, Clock,
    Copy, ExternalLink
} from 'lucide-react'

const ALL_CLIENTS = [
    { company: 'BoardCorp Ltd', country: 'USA', flag: '🇺🇸', modules: 'BoardOps', arr: '$60,000', commission: '25%', amount: '$1,250', status: 'Active', since: 'Jan 2023' },
    { company: 'FinRisk SG', country: 'Singapore', flag: '🇸🇬', modules: 'RiskLens', arr: '$48,000', commission: '25%', amount: '$1,000', status: 'Active', since: 'Mar 2024' },
    { company: 'Alpha Holdings', country: 'UK', flag: '🇬🇧', modules: 'Full Suite', arr: '$120,000', commission: '25%', amount: '$2,500', status: 'Active', since: 'Jun 2023' },
    { company: 'Omega Tech', country: 'UAE', flag: '🇦🇪', modules: 'BoardOps', arr: '$72,000', commission: '25%', amount: '$1,500', status: 'Active', since: 'Feb 2024' },
    { company: 'Nova Capital', country: 'Australia', flag: '🇦🇺', modules: 'RiskLens', arr: '$36,000', commission: '25%', amount: '$750', status: 'Active', since: 'Apr 2024' },
    { company: 'Global Manufacturing', country: 'Germany', flag: '🇩🇪', modules: 'AuditTrack', arr: '$90,000', commission: '25%', amount: '$1,875', status: 'Pending', since: 'Jan 2024' },
    { company: 'SriLanka Energy', country: 'Sri Lanka', flag: '🇱🇰', modules: 'ESGView', arr: '$45,000', commission: '25%', amount: '$938', status: 'Active', since: 'Dec 2023' },
    { company: 'BlueWave Inc.', country: 'USA', flag: '🇺🇸', modules: 'Compliance', arr: '$54,000', commission: '25%', amount: '$1,125', status: 'Cancelled', since: 'Nov 2023' },
]

const StatusBadge = ({ status }: { status: string }) => {
    const map: Record<string, string> = {
        Active: 'bg-green-100 text-green-700',
        Pending: 'bg-yellow-100 text-yellow-700',
        Cancelled: 'bg-red-100 text-red-600',
    }
    const iconMap: Record<string, React.ReactNode> = {
        Active: <CheckCircle className="w-3 h-3" />,
        Pending: <Clock className="w-3 h-3" />,
        Cancelled: <XCircle className="w-3 h-3" />,
    }
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${map[status]}`}>
            {iconMap[status]} {status}
        </span>
    )
}

export default function ClientsPage() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')

    const filtered = ALL_CLIENTS.filter(c => {
        const matchSearch = c.company.toLowerCase().includes(search.toLowerCase()) ||
            c.country.toLowerCase().includes(search.toLowerCase())
        const matchStatus = statusFilter === 'All' || c.status === statusFilter
        return matchSearch && matchStatus
    })

    return (
        <div className="p-6 w-full max-w-screen-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Clients</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Manage and track all your referred clients</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search clients, country..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 bg-white"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Partner Code Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-indigo-200">Your Partner Referral Code</p>
                    <p className="text-2xl font-bold tracking-widest mt-1">PRO-ANW-4582</p>
                    <p className="text-xs text-indigo-200 mt-1">Share this code with prospects. When a tenant admin enters it, they'll be linked to you.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl text-sm font-semibold transition flex-shrink-0">
                    <Copy className="w-4 h-4" /> Copy Code
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Clients', value: '13', icon: <Users className="w-5 h-5" />, color: 'text-blue-600 bg-blue-100', sub: '' },
                    { label: 'Active Clients', value: '10', icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-600 bg-green-100', sub: '' },
                    { label: 'Total ARR', value: '$1.25M', icon: <DollarSign className="w-5 h-5" />, color: 'text-purple-600 bg-purple-100', sub: '' },
                    { label: 'Monthly Commission', value: '$25,400', icon: <TrendingUp className="w-5 h-5" />, color: 'text-orange-500 bg-orange-100', sub: '+18% vs last month' },
                ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${s.color}`}>{s.icon}</div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                            <p className="text-xl font-bold text-gray-900">{s.value}</p>
                            {s.sub && <p className="text-xs text-green-600 font-medium flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />{s.sub}</p>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                    <Filter className="w-4 h-4" /> All Regions <ChevronDown className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                    All Modules <ChevronDown className="w-4 h-4" />
                </button>
                {['All', 'Active', 'Pending', 'Cancelled'].map(s => (
                    <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${statusFilter === s ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-700 hover:bg-gray-50'}`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Client Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Client List</h3>
                    <button className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg"><MoreVertical className="w-4 h-4" /></button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 font-medium">
                                <th className="px-5 py-3">Client</th>
                                <th className="px-5 py-3">Country</th>
                                <th className="px-5 py-3">Modules</th>
                                <th className="px-5 py-3">ARR</th>
                                <th className="px-5 py-3">Commission %</th>
                                <th className="px-5 py-3">Monthly Commission</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Since</th>
                                <th className="px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((c, i) => (
                                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50 transition">
                                    <td className="px-5 py-4 font-semibold text-gray-900">{c.company}</td>
                                    <td className="px-5 py-4 text-gray-600"><span className="mr-1">{c.flag}</span>{c.country}</td>
                                    <td className="px-5 py-4">
                                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium">{c.modules}</span>
                                    </td>
                                    <td className="px-5 py-4 font-semibold text-gray-900">{c.arr}</td>
                                    <td className="px-5 py-4 text-gray-600">{c.commission}</td>
                                    <td className="px-5 py-4 font-bold text-green-600">{c.amount}</td>
                                    <td className="px-5 py-4"><StatusBadge status={c.status} /></td>
                                    <td className="px-5 py-4 text-gray-500">{c.since}</td>
                                    <td className="px-5 py-4">
                                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-gray-50 flex items-center justify-between text-sm border-t border-gray-100">
                    <span className="text-gray-500">Showing 1–{filtered.length} of {ALL_CLIENTS.length} clients</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1.5 bg-white border rounded-lg text-gray-600 hover:bg-gray-50 text-xs">← Previous</button>
                        <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs">1</button>
                        <button className="px-3 py-1.5 bg-white border rounded-lg text-gray-600 hover:bg-gray-50 text-xs">2</button>
                        <button className="px-3 py-1.5 bg-white border rounded-lg text-gray-600 hover:bg-gray-50 text-xs">Next →</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
