'use client'

import React, { useState } from 'react'
import {
    Wallet, DollarSign, Clock, CheckCircle, ArrowDownToLine,
    ArrowUpRight, Download, Building2, CreditCard, AlertCircle, X
} from 'lucide-react'

const PAYOUTS = [
    { id: 'PAY-2024-007', period: 'Jan 2024', clients: 10, amount: '$22,500', status: 'Paid', date: '02 Feb 2024', method: 'Bank Transfer' },
    { id: 'PAY-2024-006', period: 'Dec 2023', clients: 9, amount: '$20,200', status: 'Paid', date: '03 Jan 2024', method: 'Bank Transfer' },
    { id: 'PAY-2024-005', period: 'Nov 2023', clients: 9, amount: '$19,800', status: 'Paid', date: '02 Dec 2023', method: 'Bank Transfer' },
    { id: 'PAY-2024-004', period: 'Oct 2023', clients: 8, amount: '$17,500', status: 'Paid', date: '01 Nov 2023', method: 'Bank Transfer' },
    { id: 'PAY-2024-003', period: 'Sep 2023', clients: 7, amount: '$15,000', status: 'Paid', date: '02 Oct 2023', method: 'Bank Transfer' },
    { id: 'PAY-2024-002', period: 'Aug 2023', clients: 6, amount: '$12,400', status: 'Paid', date: '01 Sep 2023', method: 'Bank Transfer' },
]

export default function PayoutsPage() {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="p-6 w-full max-w-screen-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Track your earnings and request commission payouts</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
                >
                    <Wallet className="w-4 h-4" /> Request Payout
                </button>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-lg">
                    <div className="flex items-center gap-2 text-indigo-200 text-sm font-medium mb-3">
                        <Wallet className="w-4 h-4" /> Available Balance
                    </div>
                    <p className="text-4xl font-bold">$25,400</p>
                    <p className="text-indigo-200 text-sm mt-2 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> +18% vs last month
                    </p>
                    <button onClick={() => setShowModal(true)} className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition flex items-center gap-2 border border-white/20">
                        <ArrowDownToLine className="w-4 h-4" /> Withdraw Now
                    </button>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                        <Clock className="w-4 h-4" /> Pending
                    </div>
                    <p className="text-3xl font-bold text-gray-900">$4,250</p>
                    <p className="text-xs text-gray-500 mt-2">Will be released after 30-day hold</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                        <CheckCircle className="w-4 h-4" /> Total Paid Out
                    </div>
                    <p className="text-3xl font-bold text-gray-900">$107,400</p>
                    <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> All time earnings</p>
                </div>
            </div>

            {/* Commission Policy Note */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                    <span className="font-semibold">Commission Policy:</span> You earn 25% of ARR for each active client. Payouts are processed on the 1st of each month for the previous month's earnings.
                </div>
            </div>

            {/* Payout History */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Payout History</h3>
                    <button className="flex items-center gap-1.5 text-sm text-indigo-600 font-medium hover:underline">
                        <Download className="w-4 h-4" /> Download All
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 font-medium">
                                <th className="px-5 py-3">Payout ID</th>
                                <th className="px-5 py-3">Period</th>
                                <th className="px-5 py-3">Active Clients</th>
                                <th className="px-5 py-3">Amount</th>
                                <th className="px-5 py-3">Method</th>
                                <th className="px-5 py-3">Date</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {PAYOUTS.map((p, i) => (
                                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50 transition">
                                    <td className="px-5 py-4 font-mono text-xs text-indigo-700 font-bold">{p.id}</td>
                                    <td className="px-5 py-4 text-gray-700 font-medium">{p.period}</td>
                                    <td className="px-5 py-4 text-gray-600">{p.clients}</td>
                                    <td className="px-5 py-4 font-bold text-gray-900">{p.amount}</td>
                                    <td className="px-5 py-4 text-gray-600 flex items-center gap-1.5">
                                        <Building2 className="w-3.5 h-3.5" /> {p.method}
                                    </td>
                                    <td className="px-5 py-4 text-gray-600">{p.date}</td>
                                    <td className="px-5 py-4">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                            <CheckCircle className="w-3 h-3" /> {p.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <button className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Request Payout Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg">
                            <X className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
                                <Wallet className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 text-lg">Request Payout</h2>
                                <p className="text-sm text-gray-500">Available: <span className="font-bold text-green-600">$25,400</span></p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1.5">Amount to Withdraw</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="number" defaultValue="25400" className="w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1.5">Bank Account</label>
                                <div className="p-3 border rounded-xl flex items-center gap-3 bg-gray-50">
                                    <CreditCard className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">HSBC **** 4821</p>
                                        <p className="text-xs text-gray-500">Anura Wijesinghe — SG</p>
                                    </div>
                                    <span className="ml-auto text-xs text-indigo-600 font-medium">Change</span>
                                </div>
                            </div>
                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-yellow-800 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                Payouts are processed within 3–5 business days.
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                                Cancel
                            </button>
                            <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition">
                                Confirm Payout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
