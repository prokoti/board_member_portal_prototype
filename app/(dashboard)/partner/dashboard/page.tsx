'use client'

import React from 'react'
import {
    Activity,
    ArrowUpRight,
    Users,
    DollarSign,
    Target,
    Download,
    Search,
    ChevronDown,
    Filter,
    Bot,
    TrendingUp,
    MoreVertical,
    Wallet,
    FileText,
    ShieldAlert
} from 'lucide-react'

// Mock Data
const clients = [
    { company: 'Alpha Holdings', country: 'USA', flag: '🇺🇸', modules: 'Full Suite', arr: '$120,000', commission: '25%', amount: '$2,500', status: 'Active', added: '4d ago' },
    { company: 'FinRisk SG', country: 'Singapore', flag: '🇸🇬', modules: 'RiskLens', arr: '$49,000', commission: '25%', amount: '$1,000', status: 'Active', added: '1w ago' },
    { company: 'Zenith Bank', country: 'UAE', flag: '🇦🇪', modules: 'BoardOps', arr: '$42,000', commission: '25%', amount: '$875', status: 'Active', added: '2w ago' },
    { company: 'Omega Tech', country: 'UAE', flag: '🇦🇪', modules: 'Full Suite', arr: '$36,000', commission: '25%', amount: '$750', status: 'Active', added: '3w ago' },
]

export default function PartnerDashboard() {
    return (
        <div className="p-6 w-full max-w-screen-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-indigo-800">
                        Partner Dashboard
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search clients, regions..."
                            className="pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 bg-white"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Filter bar */}
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    All Regions
                    <ChevronDown className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                    All Modules
                    <ChevronDown className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-medium">
                    <Activity className="w-4 h-4" />
                    All Status
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Card 1 */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full opacity-50"></div>
                    <div className="flex items-center gap-3 mb-3 z-10">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="text-gray-500 font-medium text-sm">Active Clients</span>
                    </div>
                    <div className="z-10">
                        <h3 className="text-3xl font-bold text-gray-900">12</h3>
                        <p className="text-sm text-green-600 flex items-center gap-1 mt-1 font-medium">
                            <ArrowUpRight className="w-3 h-3" /> +3 this month
                        </p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full opacity-50"></div>
                    <div className="flex items-center gap-3 mb-3 z-10">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                            <Target className="w-5 h-5" />
                        </div>
                        <span className="text-gray-500 font-medium text-sm">Monthly Revenue</span>
                    </div>
                    <div className="z-10 flex items-end justify-between">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900">$12,450</h3>
                            <p className="text-sm text-gray-500 mt-1 font-medium">25% Share</p>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full opacity-50"></div>
                    <div className="flex items-center gap-3 mb-3 z-10">
                        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <span className="text-gray-500 font-medium text-sm">Lifetime Revenue</span>
                    </div>
                    <div className="z-10">
                        <h3 className="text-3xl font-bold text-gray-900">$94,200</h3>
                        <p className="text-sm text-green-600 flex items-center gap-1 mt-1 font-medium">
                            <ArrowUpRight className="w-3 h-3" /> +22% vs last quarter
                        </p>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-bl-full opacity-50"></div>
                    <div className="flex items-center gap-3 mb-3 z-10">
                        <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                            <Activity className="w-5 h-5" />
                        </div>
                        <span className="text-gray-500 font-medium text-sm">Conversion Rate</span>
                    </div>
                    <div className="z-10">
                        <h3 className="text-3xl font-bold text-gray-900">68%</h3>
                        <p className="text-sm text-green-600 flex items-center gap-1 mt-1 font-medium">
                            <ArrowUpRight className="w-3 h-3" /> +5% this quarter
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column (Charts & Lists) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Revenue Trend Chart Mock */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Revenue Trend</h3>
                            <div className="flex gap-2">
                                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600 font-medium">2M</span>
                                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600 font-medium">1Y</span>
                                <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded font-medium">All</span>
                            </div>
                        </div>
                        <div className="h-64 flex items-end gap-2 pb-4 border-b border-gray-100 relative">
                            {/* Simple CSS Chart */}
                            {[40, 45, 55, 60, 75, 80, 100].map((height, i) => (
                                <div key={i} className="flex-1 flex flex-col justify-end group h-full">
                                    <div
                                        className="bg-indigo-100 group-hover:bg-indigo-300 w-full rounded-t-md transition-all duration-300 relative"
                                        style={{ height: `${height}%` }}
                                    >
                                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white shadow-sm"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-3 text-xs text-gray-400 font-medium px-4">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="p-3 bg-blue-50 rounded-xl flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">New Clients</p>
                                    <p className="text-sm font-bold text-gray-900">+8 <span className="text-xs font-normal text-gray-500">This Month</span></p>
                                </div>
                            </div>
                            <div className="p-3 bg-red-50 rounded-xl flex items-center gap-3">
                                <Activity className="w-5 h-5 text-red-600" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Churned</p>
                                    <p className="text-sm font-bold text-gray-900">-1 <span className="text-xs font-normal text-gray-500">This Month</span></p>
                                </div>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-xl flex items-center gap-3">
                                <Target className="w-5 h-5 text-purple-600" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Renewal</p>
                                    <p className="text-sm font-bold text-gray-900">02 <span className="text-xs font-normal text-gray-500">This Year</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Clients */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Recent Clients</h3>
                            <button className="p-1 text-gray-400 hover:bg-gray-50 rounded">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 text-gray-500 font-medium">
                                        <th className="px-5 py-3 font-medium">Client Company</th>
                                        <th className="px-5 py-3 font-medium">Modules</th>
                                        <th className="px-5 py-3 font-medium">ARR</th>
                                        <th className="px-5 py-3 font-medium text-center">Commission</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.map((c, i) => (
                                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg">{c.flag}</span>
                                                    <span className="font-bold text-gray-900">{c.company}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                                                    {c.modules}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 font-semibold text-gray-900">{c.arr}</td>
                                            <td className="px-5 py-4 text-center text-green-600 font-bold">{c.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-gray-50 flex items-center justify-between text-sm">
                            <span className="text-gray-500">Showing 1-4 of 12 clients</span>
                            <div className="flex gap-1">
                                <button className="px-3 py-1 bg-white border rounded text-gray-600 hover:bg-gray-50">&lt; Prev</button>
                                <button className="px-3 py-1 bg-indigo-600 text-white rounded">1</button>
                                <button className="px-3 py-1 bg-white border rounded text-gray-600 hover:bg-gray-50">Next &gt;</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Revenue by Region */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Revenue by Region</h3>
                            <button className="text-gray-400"><MoreVertical className="w-4 h-4" /></button>
                        </div>

                        <div className="flex justify-center mb-6">
                            {/* Donut Chart Mock */}
                            <div className="w-40 h-40 rounded-full border-[12px] border-indigo-500 border-r-blue-400 border-b-green-400 flex items-center justify-center relative shadow-sm">
                                <div className="text-center">
                                    <p className="text-xl font-bold text-gray-900">$94K</p>
                                    <p className="text-xs text-gray-500 font-medium">Total ARR</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div><span className="text-gray-600 font-medium">USA</span></div>
                                <div className="flex items-center gap-4"><span className="text-indigo-600 font-bold">35%</span><span className="text-gray-900 font-medium">$540K</span></div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div><span className="text-gray-600 font-medium">UK</span></div>
                                <div className="flex items-center gap-4"><span className="text-blue-500 font-bold">24%</span><span className="text-gray-900 font-medium">$233K</span></div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400"></div><span className="text-gray-600 font-medium">Singapore</span></div>
                                <div className="flex items-center gap-4"><span className="text-green-500 font-bold">15%</span><span className="text-gray-900 font-medium">$140K</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 text-indigo-600"><Download className="w-4 h-4" /></div>
                                    <span className="text-sm font-medium text-gray-700">Download Statement</span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 text-indigo-600"><Wallet className="w-4 h-4" /></div>
                                    <span className="text-sm font-medium text-gray-700">Request Payout</span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 text-indigo-600"><FileText className="w-4 h-4" /></div>
                                    <span className="text-sm font-medium text-gray-700">Commission Policy</span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                            </button>
                        </div>
                        <button className="w-full mt-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 transition">
                            <Wallet className="w-4 h-4" />
                            Request Payout
                        </button>
                    </div>

                    {/* Partner AI widget */}
                    <div className="bg-gradient-to-br from-[#1E3A5F] to-indigo-900 p-6 rounded-2xl text-white relative overflow-hidden shadow-lg">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full opacity-20 blur-2xl"></div>
                        <div className="flex items-center gap-2 mb-4 relative z-10">
                            <Bot className="w-5 h-5 text-indigo-300" />
                            <h3 className="text-lg font-bold">Prokoti Partner AI</h3>
                        </div>
                        <div className="bg-white/10 border border-white/20 p-4 rounded-xl mb-4 relative z-10 backdrop-blur-sm">
                            <p className="text-sm text-indigo-100 mb-2">Hello! Your USA revenue grew 33% this month.</p>
                            <p className="text-sm text-white font-medium">I see an upsell opportunity for Alpha Holdings.</p>
                        </div>
                        <div className="space-y-2 relative z-10">
                            <button className="w-full flex items-center justify-between px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition">
                                <span>Revenue Forecast</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                            <button className="w-full flex items-center justify-between px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition">
                                <span>Growth Suggestions</span>
                                <Activity className="w-4 h-4" />
                            </button>
                            <button className="w-full flex items-center justify-between px-4 py-2.5 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-200 rounded-xl text-sm font-medium transition border border-yellow-400/30">
                                <div className="flex items-center gap-2">
                                    <ShieldAlert className="w-4 h-4" />
                                    <span>Client Risk Alert</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
