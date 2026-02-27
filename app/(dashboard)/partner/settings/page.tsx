'use client'

import React, { useState } from 'react'
import {
    Bell, Lock, Globe, Shield, Moon, Smartphone,
    Mail, MessageSquare, ChevronRight, CheckCircle, Eye, EyeOff,
    Laptop
} from 'lucide-react'

const Toggle = ({ defaultOn = false }: { defaultOn?: boolean }) => {
    const [on, setOn] = useState(defaultOn)
    return (
        <button
            onClick={() => setOn(!on)}
            className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${on ? 'bg-indigo-600' : 'bg-gray-200'}`}
        >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${on ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
    )
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">{title}</h3>
        </div>
        <div className="divide-y divide-gray-50">{children}</div>
    </div>
)

const Row = ({ icon, label, desc, right }: { icon: React.ReactNode; label: string; desc?: string; right: React.ReactNode }) => (
    <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-500">{icon}</div>
            <div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                {desc && <p className="text-xs text-gray-500 mt-0.5">{desc}</p>}
            </div>
        </div>
        <div className="flex items-center gap-2">{right}</div>
    </div>
)

export default function SettingsPage() {
    const [showPass, setShowPass] = useState(false)

    return (
        <div className="p-6 w-full max-w-screen-lg mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500 mt-0.5">Manage your account preferences and security</p>
            </div>

            {/* Notifications */}
            <Section title="🔔 Notifications">
                <Row
                    icon={<Mail className="w-4 h-4" />}
                    label="Email Notifications"
                    desc="Receive payout and client activity emails"
                    right={<Toggle defaultOn={true} />}
                />
                <Row
                    icon={<MessageSquare className="w-4 h-4" />}
                    label="In-App Notifications"
                    desc="Get alerts inside the portal"
                    right={<Toggle defaultOn={true} />}
                />
                <Row
                    icon={<Smartphone className="w-4 h-4" />}
                    label="SMS Alerts"
                    desc="Payout confirmations via SMS"
                    right={<Toggle />}
                />
                <Row
                    icon={<Bell className="w-4 h-4" />}
                    label="New Client Linked Alert"
                    desc="Notify when a tenant uses your referral code"
                    right={<Toggle defaultOn={true} />}
                />
            </Section>

            {/* Appearance */}
            <Section title="🎨 Appearance">
                <Row
                    icon={<Moon className="w-4 h-4" />}
                    label="Dark Mode"
                    desc="Switch between light and dark theme"
                    right={<Toggle />}
                />
                <Row
                    icon={<Globe className="w-4 h-4" />}
                    label="Language"
                    desc="Portal display language"
                    right={
                        <select className="text-sm border rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                            <option>English</option>
                            <option>Sinhala</option>
                            <option>Arabic</option>
                            <option>German</option>
                        </select>
                    }
                />
                <Row
                    icon={<Laptop className="w-4 h-4" />}
                    label="Dashboard Layout"
                    desc="Choose your default dashboard view"
                    right={
                        <select className="text-sm border rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                            <option>Detailed</option>
                            <option>Compact</option>
                        </select>
                    }
                />
            </Section>

            {/* Security */}
            <Section title="🔒 Security">
                <div className="px-6 py-5 space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Current Password</label>
                        <div className="relative">
                            <input type={showPass ? 'text' : 'password'} defaultValue="••••••••••" className="w-full border rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                            <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">New Password</label>
                        <input type="password" placeholder="Enter new password" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Confirm New Password</label>
                        <input type="password" placeholder="Confirm new password" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    </div>
                    <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition mt-2">
                        Update Password
                    </button>
                </div>

                <div className="border-t border-gray-50">
                    <Row
                        icon={<Shield className="w-4 h-4" />}
                        label="Two-Factor Authentication"
                        desc="Add an extra layer of security"
                        right={
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-200">Not set up</span>
                                <button className="flex items-center gap-1 text-sm text-indigo-600 font-medium hover:underline">
                                    Enable <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        }
                    />
                </div>
            </Section>

            {/* Active Sessions */}
            <Section title="💻 Active Sessions">
                {[
                    { device: 'Chrome on MacBook Pro', location: 'Singapore · Active now', current: true },
                    { device: 'Safari on iPhone', location: 'Singapore · 2h ago', current: false },
                    { device: 'Chrome on Windows', location: 'Colombo, SL · 3d ago', current: false },
                ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 rounded-lg text-gray-400"><Laptop className="w-4 h-4" /></div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{s.device}</p>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    {s.current && <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>}
                                    {s.location}
                                </p>
                            </div>
                        </div>
                        {s.current
                            ? <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Current</span>
                            : <button className="text-xs font-semibold text-red-500 hover:text-red-700 hover:underline">Revoke</button>
                        }
                    </div>
                ))}
            </Section>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h3 className="font-bold text-red-800 mb-1">Danger Zone</h3>
                <p className="text-sm text-red-600 mb-4">These actions are irreversible. Please proceed with caution.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button className="px-4 py-2.5 border border-red-300 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition">
                        Deactivate Account
                    </button>
                    <button className="px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}
