'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardIndexPage() {
    const router = useRouter()

    useEffect(() => {
        const role = localStorage.getItem('userRole')
        if (!role) {
            router.replace('/auth/select-role')
            return
        }
        const routes: Record<string, string> = {
            BOARD_OPS: '/dashboard/board-ops/dashboard',
            TENANT_ADMIN: '/dashboard/tenent-admin/dashboard',
            SUPER_ADMIN: '/dashboard/super-admin/dashboard',
            BOARD_MEMBER: '/dashboard/board-member/dashboard',
        }
        router.replace(routes[role] || '/auth/select-role')
    }, [router])

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-[#1E3A5F]/30 border-t-[#1E3A5F] rounded-full animate-spin" />
        </div>
    )
}
