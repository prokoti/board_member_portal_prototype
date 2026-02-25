'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Settings, LogOut, Calendar, CheckSquare, Zap, Shield } from 'lucide-react'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const navItems = [
        { label: 'Meetings', href: '/portal/dashboard', key: 'meetings' },
        { label: 'Tasks', href: '/portal/tasks', key: 'tasks' },
        { label: 'Actions', href: '/portal/actions', key: 'actions' },
    ]

    return (
        <div className="min-h-screen bg-[#F4F0FF] flex flex-col">
            {/* Top Header */}
            <header className="bg-white border-b border-[#5E43D8]/8 sticky top-0 z-50 shadow-[0_1px_12px_rgba(94,67,216,0.06)]">
                <div className="flex items-center justify-between px-6 h-16">
                    {/* Logo */}
                    <Link href="/portal/dashboard" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 bg-gradient-to-br from-[#5E43D8] to-[#8B72E8] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-[#2D1B6B] tracking-tight">PROKOTI</span>
                    </Link>

                    {/* Center Nav */}
                    <nav className="flex items-center gap-1">
                        {navItems.map(item => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${pathname === item.href || (item.key === 'meetings' && pathname.startsWith('/portal'))
                                        ? 'text-[#5E43D8] bg-[#EDE8FB]'
                                        : 'text-[#2D1B6B]/60 hover:text-[#2D1B6B] hover:bg-[#F4F0FF]'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-2">
                        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F4F0FF] text-[#2D1B6B]/50 hover:text-[#5E43D8] transition-all">
                            <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" strokeWidth={2} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#5E43D8] rounded-full" />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F4F0FF] text-[#2D1B6B]/50 hover:text-[#5E43D8] transition-all">
                            <Settings strokeWidth={2} style={{ width: 18, height: 18 }} />
                        </button>
                        <div className="flex items-center gap-2.5 ml-1 pl-3 border-l border-[#5E43D8]/10">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5E43D8] to-[#8B72E8] flex items-center justify-center text-white text-xs font-bold">
                                MS
                            </div>
                            <span className="text-sm font-semibold text-[#2D1B6B]">Mike Salguero</span>
                            <button className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-50 text-[#2D1B6B]/40 hover:text-red-500 transition-all">
                                <LogOut style={{ width: 16, height: 16 }} strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Page content */}
            <main className="flex-1">{children}</main>
        </div>
    )
}
