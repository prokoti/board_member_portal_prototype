'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    CheckSquare,
    FileText,
    Search,
    Settings,
    Users,
    Shield,
    Briefcase,
    Bell,
    User,
    LogOut,
    Menu,
    X,
} from 'lucide-react'

type UserRole = 'BOARD_OPS' | 'TENANT_ADMIN' | 'SUPER_ADMIN' | 'BOARD_MEMBER'

interface NavItem {
    label: string
    href: string
    icon: React.ReactNode
}

const ROLE_NAV: Record<UserRole, NavItem[]> = {
    BOARD_OPS: [
        { label: 'Dashboard', href: '/board-ops/dashboard', icon: <LayoutDashboard className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
        { label: 'Packs', href: '/board-ops/packs', icon: <BookOpen className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
        { label: 'Meetings', href: '/board-ops/meetings', icon: <Calendar className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
        { label: 'Actions', href: '/board-ops/actions', icon: <CheckSquare className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
        { label: 'Decision Logs', href: '/board-ops/decision-logs', icon: <FileText className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
        { label: 'Search', href: '/board-ops/search', icon: <Search className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
    ],
    TENANT_ADMIN: [
        { label: 'Dashboard', href: '/tenent-admin/dashboard', icon: <LayoutDashboard className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
        { label: 'Users', href: '/tenent-admin/users', icon: <Users className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
        { label: 'Settings', href: '/tenent-admin/settings', icon: <Settings className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
    ],
    SUPER_ADMIN: [
        { label: 'Dashboard', href: '/super-admin/dashboard', icon: <LayoutDashboard className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
        { label: 'Tenants', href: '/super-admin/tenants', icon: <Shield className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
        { label: 'Users', href: '/super-admin/users', icon: <Users className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
        { label: 'Settings', href: '/super-admin/settings', icon: <Settings className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
    ],
    BOARD_MEMBER: [
        { label: 'Dashboard', href: '/board-member/dashboard', icon: <LayoutDashboard className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
        { label: 'Packs', href: '/board-member/packs', icon: <BookOpen className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
        { label: 'Meetings', href: '/board-member/meetings', icon: <Calendar className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
        { label: 'Actions', href: '/board-member/actions', icon: <CheckSquare className="w-5 h-5 2xl:w-6 2xl:h-6" /> },
    ],
}

const ROLE_META: Record<UserRole, { label: string; gradient: string; icon: React.ReactNode }> = {
    BOARD_OPS: { label: 'BoardOps', gradient: 'from-[#1E3A5F] to-[#2D5A8E]', icon: <Briefcase className="w-4 h-4 2xl:w-5 2xl:h-5 text-white" /> },
    TENANT_ADMIN: { label: 'Tenant Admin', gradient: 'from-[#5E43D8] to-[#8B72E8]', icon: <Settings className="w-4 h-4 2xl:w-5 2xl:h-5 text-white" /> },
    SUPER_ADMIN: { label: 'Super Admin', gradient: 'from-[#C2410C] to-[#EA580C]', icon: <Shield className="w-4 h-4 2xl:w-5 2xl:h-5 text-white" /> },
    BOARD_MEMBER: { label: 'Board Member', gradient: 'from-[#047857] to-[#059669]', icon: <Users className="w-4 h-4 2xl:w-5 2xl:h-5 text-white" /> },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [role, setRole] = useState<UserRole | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('userRole') as UserRole | null
        if (!stored) {
            router.push('/select-role')
            return
        }
        setRole(stored)
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('userRole')
        router.push('/')
    }

    if (!role) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#1E3A5F]/30 border-t-[#1E3A5F] rounded-full animate-spin" />
            </div>
        )
    }

    const navItems = ROLE_NAV[role]
    const meta = ROLE_META[role]

    const SidebarContent = () => (
        <>
            {/* Logo / Brand */}
            <div className="px-4 2xl:px-5 pt-5 2xl:pt-6 pb-4 2xl:pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                        {meta.icon}
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm 2xl:text-base leading-tight">{meta.label}</p>
                        <p className="text-white/45 text-[10px] 2xl:text-xs font-medium uppercase tracking-widest">Prokoti</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-0 py-2 2xl:py-4 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`
                flex items-center gap-3 2xl:gap-4 px-4 2xl:px-5 py-3 2xl:py-4 text-sm 2xl:text-base font-semibold transition-all duration-100 group border-l-4
                ${isActive
                                    ? 'bg-white/15 text-white border-white'
                                    : 'text-white/70 hover:text-white hover:bg-white/10 border-transparent'
                                }
              `}
                        >
                            <span className={`flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-white/55 group-hover:text-white/80'}`}>
                                {item.icon}
                            </span>
                            <span className="flex-1 tracking-wide">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* CoSec AI widget — BOARD_OPS only */}
            {role === 'BOARD_OPS' && (
                <div className="mx-3 2xl:mx-4 mb-3 2xl:mb-4 bg-white/10 border border-white/15 rounded-xl 2xl:rounded-2xl p-3 2xl:p-4">
                    <div className="flex items-center gap-2 2xl:gap-3 mb-2 2xl:mb-3">
                        <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <span className="text-[10px] 2xl:text-xs font-bold text-white">AI</span>
                        </div>
                        <div>
                            <p className="text-white text-xs 2xl:text-sm font-bold">CoSec AI</p>
                            <p className="text-white/50 text-[10px] 2xl:text-xs">Hi! How can I assist you?</p>
                        </div>
                    </div>
                    <button className="w-full bg-white text-[#1E3A5F] text-xs 2xl:text-sm font-bold py-2 2xl:py-2.5 rounded-lg 2xl:rounded-xl hover:bg-white/90 transition-colors">
                        Ask AI
                    </button>
                </div>
            )}

            {/* Switch role / logout */}
            <div className="pb-3 2xl:pb-4 border-t border-white/10 pt-2 2xl:pt-3">
                <button
                    onClick={() => router.push('/select-role')}
                    className="w-full flex items-center gap-3 2xl:gap-4 px-4 2xl:px-5 py-3 2xl:py-4 text-white/60 hover:text-white hover:bg-white/10 text-sm 2xl:text-base font-semibold transition-all"
                >
                    <User className="w-5 h-5 2xl:w-6 2xl:h-6 flex-shrink-0" />
                    Switch Role
                </button>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 2xl:gap-4 px-4 2xl:px-5 py-3 2xl:py-4 text-white/60 hover:text-red-300 hover:bg-red-500/10 text-sm 2xl:text-base font-semibold transition-all"
                >
                    <LogOut className="w-5 h-5 2xl:w-6 2xl:h-6 flex-shrink-0" />
                    Sign Out
                </button>
            </div>
        </>
    )

    return (
        <div className="flex h-screen bg-[#F0F2F5] overflow-hidden">
            {/* Desktop sidebar — responsive width */}
            <aside className="hidden lg:flex flex-col w-56 2xl:w-64 2xl:w-72 bg-[#1E3A5F] flex-shrink-0 h-full overflow-hidden">
                <SidebarContent />
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-[#1E3A5F] z-50 flex flex-col transform transition-transform duration-300 lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-white/60 hover:text-white">
                    <X className="w-5 h-5" />
                </button>
                <SidebarContent />
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top header — responsive height */}
                <header className="bg-white border-b border-gray-200 flex items-center px-4 2xl:px-6 gap-3 2xl:gap-4 flex-shrink-0" style={{ height: '56px' }}>
                    <button className="lg:hidden text-gray-600 hover:text-gray-800 p-1" onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Search */}
                    <div className="flex-1 max-w-sm 2xl:max-w-lg">
                        <div className="relative">
                            <Search className="absolute left-3 2xl:left-4 top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-5 2xl:h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search meetings, papers, minutes, actions…"
                                className="w-full pl-9 2xl:pl-11 pr-3 2xl:pr-4 py-2 2xl:py-2.5 text-sm 2xl:text-base bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] transition-all"
                            />
                        </div>
                    </div>

                    {/* Right icons */}
                    <div className="flex items-center gap-1 2xl:gap-2 ml-auto">
                        <button className="relative p-2 2xl:p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors">
                            <Bell className="w-5 h-5 2xl:w-6 2xl:h-6" />
                            <span className="absolute top-1.5 2xl:top-2 right-1.5 2xl:right-2 w-2 h-2 2xl:w-2.5 2xl:h-2.5 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <button className="p-2 2xl:p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors">
                            <Settings className="w-5 h-5 2xl:w-6 2xl:h-6" />
                        </button>
                        <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white text-xs 2xl:text-sm font-bold flex-shrink-0 cursor-pointer ml-1">
                            {meta.label.charAt(0)}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
