'use client'

import React, { useState } from 'react'
import {
    User, Mail, Phone, Globe, MapPin, Copy,
    Camera, CheckCircle, Edit3, Award, Star,
    Building2, Calendar
} from 'lucide-react'

export default function ProfilePage() {
    const [editing, setEditing] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText('PRO-ANW-4582')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="p-6 w-full max-w-screen-lg mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Manage your personal and partner information</p>
                </div>
                <button
                    onClick={() => setEditing(!editing)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${editing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                    {editing ? <><CheckCircle className="w-4 h-4" /> Save Changes</> : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
                </button>
            </div>

            {/* Profile Header Card */}
            <div className="bg-gradient-to-br from-[#1E3A5F] to-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
                <div className="flex flex-col md:flex-row md:items-center gap-5 relative z-10">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-4xl font-bold shadow-lg">
                            AW
                        </div>
                        {editing && (
                            <button className="absolute -bottom-2 -right-2 p-1.5 bg-white text-indigo-700 rounded-full shadow-md hover:bg-indigo-50 transition">
                                <Camera className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-2xl font-bold">Anura Wijesinghe</h2>
                            <span className="px-2.5 py-1 bg-white/20 border border-white/30 rounded-full text-xs font-semibold">Certified Partner</span>
                        </div>
                        <p className="text-indigo-200 mb-3">anura.w@prokoti.com</p>
                        <div className="flex flex-wrap gap-4 text-sm text-indigo-100">
                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Singapore</span>
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Partner since Jan 2023</span>
                            <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> APAC Region</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 bg-white/10 border border-white/20 p-4 rounded-2xl min-w-[140px]">
                        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        <p className="text-xs text-indigo-200 font-medium">Partner Tier</p>
                        <p className="text-lg font-bold">Gold</p>
                        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                        <p className="text-xs text-indigo-200">72% to Platinum</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Partner Stats */}
                {[
                    { label: 'Total Clients', value: '12', icon: <User className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
                    { label: 'Total Earned', value: '$94,200', icon: <Award className="w-5 h-5" />, color: 'bg-green-100 text-green-600' },
                    { label: 'Referral Conversions', value: '68%', icon: <Globe className="w-5 h-5" />, color: 'bg-purple-100 text-purple-600' },
                ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${s.color}`}>{s.icon}</div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                            <p className="text-xl font-bold text-gray-900">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Referral Code */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-1">Your Referral Code</h3>
                <p className="text-sm text-gray-500 mb-4">Share this code with prospects. When a tenant admin enters this code in their account, they'll be linked to you as a client.</p>
                <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-50 border border-dashed border-indigo-300 rounded-xl px-5 py-3 font-mono text-2xl font-bold text-indigo-700 tracking-widest">
                        PRO-ANW-4582
                    </div>
                    <button onClick={handleCopy} className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition ${copied ? 'bg-green-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}>
                        {copied ? <><CheckCircle className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
                    </button>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-5">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                        { label: 'Full Name', value: 'Anura Wijesinghe', icon: <User className="w-4 h-4" /> },
                        { label: 'Email Address', value: 'anura.w@prokoti.com', icon: <Mail className="w-4 h-4" /> },
                        { label: 'Phone Number', value: '+65 9123 4567', icon: <Phone className="w-4 h-4" /> },
                        { label: 'Country / Region', value: 'Singapore', icon: <Globe className="w-4 h-4" /> },
                        { label: 'City', value: 'Singapore City', icon: <MapPin className="w-4 h-4" /> },
                        { label: 'Company', value: 'Prokoti Partner', icon: <Building2 className="w-4 h-4" /> },
                    ].map((f, i) => (
                        <div key={i}>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">{f.label}</label>
                            <div className={`flex items-center gap-2.5 border rounded-xl px-4 py-2.5 text-sm ${editing ? 'bg-white border-indigo-300 ring-1 ring-indigo-200' : 'bg-gray-50 border-gray-100'}`}>
                                <span className="text-gray-400">{f.icon}</span>
                                {editing
                                    ? <input className="flex-1 bg-transparent focus:outline-none text-gray-900" defaultValue={f.value} />
                                    : <span className="text-gray-900 font-medium">{f.value}</span>
                                }
                            </div>
                        </div>
                    ))}
                </div>
                {editing && (
                    <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
                        <button onClick={() => setEditing(false)} className="flex-1 px-4 py-2.5 border rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button onClick={() => setEditing(false)} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700">Save Changes</button>
                    </div>
                )}
            </div>
        </div>
    )
}
