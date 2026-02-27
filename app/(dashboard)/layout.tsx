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

const ROLE_META: Record<UserRole, { label: string; gradient: string; icon: React.ReactNode; userLabel: string }> = {
    BOARD_OPS: { label: 'BoardOps', gradient: 'from-[#1E3A5F] to-[#2D5A8E]', icon: <Briefcase className="w-4 h-4 text-white" />, userLabel: 'Board Ops' },
    TENANT_ADMIN: { label: 'Tenant Admin', gradient: 'from-[#5E43D8] to-[#8B72E8]', icon: <Settings className="w-4 h-4 text-white" />, userLabel: 'Tenant Admin' },
    SUPER_ADMIN: { label: 'Super Admin', gradient: 'from-[#C2410C] to-[#EA580C]', icon: <Shield className="w-4 h-4 text-white" />, userLabel: 'Super Admin' },
    BOARD_MEMBER: { label: 'Board member', gradient: 'from-[#047857] to-[#059669]', icon: <Users className="w-4 h-4 text-white" />, userLabel: 'Board member' },
}

// Fake user info — in a real app this would come from session/auth
const USER_INFO: Record<UserRole, { name: string; avatarUrl?: string }> = {
    BOARD_OPS: { name: 'Alex Johnson' },
    TENANT_ADMIN: { name: 'Sarah Connor' },
    SUPER_ADMIN: { name: 'Admin User' },
    BOARD_MEMBER: { name: 'Mads Mikkelsen', avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Mads' },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [role, setRole] = useState<UserRole | null>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    const user = USER_INFO[role]

    return (
        <div className="flex flex-col h-screen bg-[#F0F2F5] overflow-hidden">
            {/* ── Top header ── */}
            <header className="bg-white border-b border-gray-200 flex-shrink-0" style={{ height: '56px' }}>
                <div className="h-full flex items-center px-5 gap-6">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        {/* Prokoti logo mark — colourful swirl SVG */}
                        <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <circle cx="20" cy="20" r="20" fill="#F0F2F5" />
                            <path d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8z" fill="url(#lg1)" />
                            <path d="M20 12c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="white" />
                            <path d="M20 15a5 5 0 100 10A5 5 0 0020 15z" fill="url(#lg2)" />
                            <defs>
                                <linearGradient id="lg1" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#6C63FF" />
                                    <stop offset="0.5" stopColor="#F97316" />
                                    <stop offset="1" stopColor="#EC4899" />
                                </linearGradient>
                                <linearGradient id="lg2" x1="15" y1="15" x2="25" y2="25" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#6C63FF" />
                                    <stop offset="1" stopColor="#F97316" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span className="font-bold text-[15px] tracking-tight text-gray-900 uppercase">PROKOTI</span>
                    </Link>

                    {/* Desktop nav links — centred */}
                    <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150
                                        ${isActive
                                            ? 'text-gray-900 bg-gray-100'
                                            : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Right — user info + logout */}
                    <div className="flex items-center gap-3 ml-auto flex-shrink-0">
                        {/* Avatar */}
                        <div className="flex items-center gap-2.5">
                            <div
                                className={`w-8 h-8 rounded-full bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 overflow-hidden`}
                            >
                                {user.avatarUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    user.name.charAt(0)
                                )}
                            </div>
                            <div className="hidden sm:block leading-tight">
                                <p className="text-sm font-semibold text-gray-900 leading-none">{user.name}</p>
                                <p className="text-[11px] text-gray-500 mt-0.5">{meta.userLabel}</p>
                            </div>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            title="Sign out"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>

                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile dropdown nav */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 px-4 py-2 flex flex-col gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all
                                        ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}
                                    `}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            )
                        })}
                    </div>
                )}
            </header>

            {/* Page content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
