'use client'

import Link from 'next/link'
import { Shield, Settings, Bell, LogOut, Users, FileText, Calendar, BarChart2, ChevronRight } from 'lucide-react'

export default function BoardOpsLayout({ children }: { children: React.ReactNode }) {
    const navItems = [
        { icon: Calendar, label: 'Meetings', href: '/boardops/dashboard' },
        { icon: FileText, label: 'Board Packs', href: '/boardops/packs' },
        { icon: Users, label: 'Directors', href: '/boardops/directors' },
        { icon: BarChart2, label: 'Reports', href: '/boardops/reports' },
        { icon: Settings, label: 'Settings', href: '/boardops/settings' },
    ]

    return (
        <div className="min-h-screen bg-[#F4F0FF] flex">
            {/* Left Admin Sidebar */}
            <aside className="w-60 bg-gradient-to-b from-[#2D1B6B] to-[#1a0f40] flex flex-col h-screen sticky top-0 shadow-2xl">
                <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#5E43D8] to-[#8B72E8] rounded-xl flex items-center justify-center shadow-lg">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-base font-bold text-white tracking-tight">PROKOTI</p>
                        <p className="text-[9px] font-semibold text-white/40 uppercase tracking-wider">BoardOps Admin</p>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map(item => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-medium group"
                        >
                            <item.icon style={{ width: 16, height: 16 }} />
                            <span>{item.label}</span>
                            <ChevronRight style={{ width: 12, height: 12 }} className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
                        </Link>
                    ))}
                </nav>

                <div className="px-3 py-4 border-t border-white/10">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5E43D8] to-[#8B72E8] flex items-center justify-center text-white text-xs font-bold">JS</div>
                        <div>
                            <p className="text-xs font-bold text-white">Jane Smith</p>
                            <p className="text-[10px] text-white/40">Company Secretary</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors">
                        <LogOut style={{ width: 13, height: 13 }} />
                        Sign out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white border-b border-[#5E43D8]/8 h-14 flex items-center justify-between px-6 shadow-sm sticky top-0 z-10">
                    <div>
                        <h1 className="text-sm font-bold text-[#2D1B6B]">BoardOps Dashboard</h1>
                        <p className="text-xs text-[#2D1B6B]/40">Company Secretary Administration</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="relative w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#F4F0FF] text-[#2D1B6B]/40">
                            <Bell style={{ width: 16, height: 16 }} />
                            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#5E43D8] rounded-full" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#F4F0FF] text-[#2D1B6B]/40">
                            <Settings style={{ width: 16, height: 16 }} />
                        </button>
                    </div>
                </header>
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    )
}
