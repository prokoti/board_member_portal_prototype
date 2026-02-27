'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Briefcase,
    Users,
    Shield,
    Settings,
    ChevronRight,
    CheckCircle2,
} from 'lucide-react'

type UserRole = 'BOARD_OPS' | 'TENANT_ADMIN' | 'SUPER_ADMIN' | 'BOARD_MEMBER'

interface RoleOption {
    id: UserRole
    label: string
    description: string
    icon: React.ReactNode
    gradient: string
    ring: string
    badge: string
    route: string
}

const ROLES: RoleOption[] = [
    {
        id: 'BOARD_OPS',
        label: 'Board Ops',
        description: 'Manage meetings, packs, actions and board operations',
        icon: <Briefcase className="w-9 h-9" />,
        gradient: 'from-[#1E3A5F] to-[#2D5A8E]',
        ring: 'ring-[#1E3A5F]',
        badge: 'CoSec / Admin',
        route: '/board-ops/dashboard',
    },
    {
        id: 'TENANT_ADMIN',
        label: 'Tenant Admin',
        description: 'Manage your organisation, users and settings',
        icon: <Settings className="w-9 h-9" />,
        gradient: 'from-[#5E43D8] to-[#8B72E8]',
        ring: 'ring-[#5E43D8]',
        badge: 'Organisation',
        route: '/tenent-admin/dashboard',
    },
    {
        id: 'SUPER_ADMIN',
        label: 'Super Admin',
        description: 'Manage all tenants and platform-wide configuration',
        icon: <Shield className="w-9 h-9" />,
        gradient: 'from-[#C2410C] to-[#EA580C]',
        ring: 'ring-[#C2410C]',
        badge: 'Platform',
        route: '/super-admin/dashboard',
    },
    {
        id: 'BOARD_MEMBER',
        label: 'Board Member',
        description: 'Access your packs, meetings, actions and votes',
        icon: <Users className="w-9 h-9" />,
        gradient: 'from-[#047857] to-[#059669]',
        ring: 'ring-[#047857]',
        badge: 'Member',
        route: '/board-member/dashboard',
    },
]

export default function SelectRolePage() {
    const router = useRouter()
    const [selected, setSelected] = useState<UserRole | null>(null)
    const [loading, setLoading] = useState(false)

    const handleContinue = async () => {
        if (!selected) return
        setLoading(true)
        const role = ROLES.find(r => r.id === selected)!
        localStorage.setItem('userRole', selected)
        await new Promise(r => setTimeout(r, 400))
        router.push(role.route)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F1929] via-[#1E3A5F] to-[#0F1929] flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2D5A8E] opacity-20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5E43D8] opacity-10 rounded-full blur-3xl pointer-events-none" />

            {/* Logo */}
            <div className="flex items-center gap-4 mb-12">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2D5A8E] to-[#1E3A5F] border border-white/20 flex items-center justify-center shadow-lg">
                    <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                    <p className="text-white font-bold text-2xl leading-tight">Prokoti</p>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Board Portal</p>
                </div>
            </div>

            {/* Title */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-white mb-3">Select Your Role</h1>
                <p className="text-white/55 text-lg max-w-md mx-auto">
                    Choose the role you want to access for this session
                </p>
            </div>

            {/* Role cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl mb-10">
                {ROLES.map(role => {
                    const isSelected = selected === role.id
                    return (
                        <button
                            key={role.id}
                            onClick={() => setSelected(role.id)}
                            className={`relative text-left p-6 rounded-2xl border transition-all duration-200 group ${isSelected
                                    ? `bg-white/12 border-white/50 ring-2 ${role.ring} ring-offset-2 ring-offset-transparent shadow-xl`
                                    : 'bg-white/5 border-white/12 hover:bg-white/10 hover:border-white/30'
                                }`}
                        >
                            {/* Icon + badge row */}
                            <div className="flex items-start justify-between mb-5">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white shadow-lg`}>
                                    {role.icon}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-white/50 bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                                        {role.badge}
                                    </span>
                                    {isSelected && <CheckCircle2 className="w-6 h-6 text-white" />}
                                </div>
                            </div>

                            <h3 className="text-white font-bold text-xl mb-2">{role.label}</h3>
                            <p className="text-white/55 text-sm leading-relaxed">{role.description}</p>
                        </button>
                    )
                })}
            </div>

            {/* Continue button */}
            <button
                onClick={handleContinue}
                disabled={!selected || loading}
                className="flex items-center gap-3 bg-white text-[#1E3A5F] font-bold text-lg px-12 py-4 rounded-2xl hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg min-h-[56px]"
            >
                {loading ? (
                    <span className="flex items-center gap-3">
                        <span className="w-5 h-5 border-2 border-[#1E3A5F]/30 border-t-[#1E3A5F] rounded-full animate-spin" />
                        Entering...
                    </span>
                ) : (
                    <>
                        Continue
                        <ChevronRight className="w-6 h-6" />
                    </>
                )}
            </button>

            <p className="text-white/25 text-sm mt-8">
                You can switch roles at any time from the sidebar
            </p>
        </div>
    )
}
