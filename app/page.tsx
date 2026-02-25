'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, Shield, Zap, ChevronRight } from 'lucide-react'

type Role = 'DIRECTOR' | 'COSEC'

const MOCK_USERS: Record<string, { password: string; role: Role; name: string }> = {
    'mike@prokoti.com': { password: 'password', role: 'DIRECTOR', name: 'Mike Salguero' },
    'jane@prokoti.com': { password: 'password', role: 'COSEC', name: 'Jane Smith' },
}

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('mike@prokoti.com')
    const [password, setPassword] = useState('password')
    const [showPassword, setShowPassword] = useState(false)
    const [showMFA, setShowMFA] = useState(false)
    const [mfaCode, setMfaCode] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [pendingRole, setPendingRole] = useState<Role | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        await new Promise(r => setTimeout(r, 800))

        const user = MOCK_USERS[email]
        if (!user || user.password !== password) {
            setError('Invalid credentials. Try mike@prokoti.com / password')
            setLoading(false)
            return
        }

        setPendingRole(user.role)
        setShowMFA(true)
        setLoading(false)
    }

    const handleMFA = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await new Promise(r => setTimeout(r, 600))

        if (pendingRole === 'COSEC') {
            router.push('/boardops/dashboard')
        } else {
            router.push('/portal/dashboard')
        }
    }

    const handleSSO = (provider: string) => {
        setLoading(true)
        setTimeout(() => router.push('/portal/dashboard'), 1000)
    }

    return (
        <div className="min-h-screen bg-[#F4F0FF] flex items-center justify-center relative overflow-hidden">
            {/* Decorative background orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#5E43D8] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B72E8] opacity-8 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#C4B5FD] opacity-10 rounded-full blur-2xl" />

            <div className="relative w-full max-w-md mx-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-[#5E43D8] to-[#8B72E8] rounded-xl flex items-center justify-center shadow-lg">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-3xl font-bold text-[#2D1B6B] tracking-tight">PROKOTI</span>
                    </div>
                    <p className="text-sm text-[#2D1B6B]/60 font-medium">AI Company Governance Platform</p>
                </div>

                {/* RBAC routing indicator */}
                <div className="mb-6 bg-white/70 backdrop-blur rounded-xl p-3 border border-[#5E43D8]/10">
                    <p className="text-xs text-[#2D1B6B]/60 text-center mb-2 font-medium">Smart RBAC Routing</p>
                    <div className="flex items-center justify-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2D1B6B]/70 bg-[#EDE8FB] px-3 py-1 rounded-full">
                            <Zap className="w-3 h-3 text-[#5E43D8]" />
                            Director → Board Portal
                        </div>
                        <ChevronRight className="w-3 h-3 text-[#2D1B6B]/30" />
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2D1B6B]/70 bg-purple-100 px-3 py-1 rounded-full">
                            <Shield className="w-3 h-3 text-[#5E43D8]" />
                            CoSec → BoardOps
                        </div>
                    </div>
                </div>

                {/* Auth Card */}
                <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(94,67,216,0.12)] p-8">
                    {!showMFA ? (
                        <>
                            <h1 className="text-2xl font-bold text-[#2D1B6B] mb-1">Welcome back</h1>
                            <p className="text-sm text-[#2D1B6B]/50 mb-7">Sign in to your board portal</p>

                            <form onSubmit={handleLogin} className="space-y-4">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#2D1B6B] mb-2">Email address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5E43D8]/50" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="you@company.com"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#5E43D8]/20 bg-[#F4F0FF]/50 text-[#2D1B6B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#5E43D8]/30 focus:border-[#5E43D8] transition-all placeholder:text-[#2D1B6B]/30"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#2D1B6B] mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5E43D8]/50" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-10 pr-11 py-3 rounded-xl border border-[#5E43D8]/20 bg-[#F4F0FF]/50 text-[#2D1B6B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#5E43D8]/30 focus:border-[#5E43D8] transition-all placeholder:text-[#2D1B6B]/30"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#2D1B6B]/40 hover:text-[#5E43D8] transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100">{error}</p>
                                )}

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="rounded border-[#5E43D8]/20 accent-[#5E43D8]" />
                                        <span className="text-xs text-[#2D1B6B]/60 font-medium">Remember me</span>
                                    </label>
                                    <button type="button" className="text-xs font-semibold text-[#5E43D8] hover:text-[#4B36AD] transition-colors">
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#5E43D8] hover:bg-[#4B36AD] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(94,67,216,0.3)] hover:shadow-[0_6px_20px_rgba(94,67,216,0.4)] active:scale-[0.98]"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        'Sign in to Portal'
                                    )}
                                </button>
                            </form>

                            <div className="my-6 flex items-center gap-3">
                                <div className="flex-1 border-t border-[#5E43D8]/10" />
                                <span className="text-xs text-[#2D1B6B]/40 font-medium">OR CONTINUE WITH SSO</span>
                                <div className="flex-1 border-t border-[#5E43D8]/10" />
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleSSO('Microsoft')}
                                    className="w-full flex items-center gap-3 border border-[#5E43D8]/20 rounded-xl px-4 py-3 hover:bg-[#F4F0FF] text-[#2D1B6B] font-semibold text-sm transition-all hover:border-[#5E43D8]/40 group"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none">
                                        <rect x="1" y="1" width="10" height="10" fill="#f25022" />
                                        <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
                                        <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
                                        <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
                                    </svg>
                                    <span>Continue with Microsoft</span>
                                </button>
                                <button
                                    onClick={() => handleSSO('Google')}
                                    className="w-full flex items-center gap-3 border border-[#5E43D8]/20 rounded-xl px-4 py-3 hover:bg-[#F4F0FF] text-[#2D1B6B] font-semibold text-sm transition-all hover:border-[#5E43D8]/40"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    <span>Continue with Google</span>
                                </button>
                            </div>

                            <p className="text-center text-xs text-[#2D1B6B]/40 mt-6 font-medium">
                                Demo: mike@prokoti.com (Director) · jane@prokoti.com (CoSec)
                            </p>
                        </>
                    ) : (
                        /* MFA Screen */
                        <>
                            <div className="text-center mb-6">
                                <div className="inline-flex w-14 h-14 items-center justify-center bg-[#EDE8FB] rounded-full mb-4">
                                    <Shield className="w-7 h-7 text-[#5E43D8]" />
                                </div>
                                <h2 className="text-2xl font-bold text-[#2D1B6B] mb-1">Two-Factor Auth</h2>
                                <p className="text-sm text-[#2D1B6B]/50">Enter the 6-digit code from your authenticator app</p>
                            </div>

                            {/* Role routing indicator */}
                            <div className={`mb-5 p-3 rounded-xl flex items-center gap-3 ${pendingRole === 'COSEC' ? 'bg-purple-50 border border-purple-200' : 'bg-[#EDE8FB] border border-[#5E43D8]/20'}`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${pendingRole === 'COSEC' ? 'bg-purple-500' : 'bg-[#5E43D8]'}`}>
                                    {pendingRole === 'COSEC' ? <Shield className="w-4 h-4 text-white" /> : <Zap className="w-4 h-4 text-white" />}
                                </div>
                                <div>
                                    <p className="text-xs font-Bold text-[#2D1B6B] font-semibold">
                                        {pendingRole === 'COSEC' ? 'CoSec Admin' : 'Board Director'}
                                    </p>
                                    <p className="text-xs text-[#2D1B6B]/50">
                                        Routing to → {pendingRole === 'COSEC' ? '/boardops/dashboard' : '/portal/dashboard'}
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleMFA} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-[#2D1B6B] mb-3">Authentication code</label>
                                    <div className="flex gap-2.5 justify-center">
                                        {[0, 1, 2, 3, 4, 5].map(i => (
                                            <input
                                                key={i}
                                                type="text"
                                                maxLength={1}
                                                className="w-11 h-13 text-center text-xl font-bold text-[#2D1B6B] border-2 border-[#5E43D8]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5E43D8]/30 focus:border-[#5E43D8] bg-[#F4F0FF]/50 transition-all"
                                                style={{ height: '52px' }}
                                                onChange={e => {
                                                    const val = e.target.value
                                                    if (val && e.target.nextElementSibling) {
                                                        (e.target.nextElementSibling as HTMLInputElement).focus()
                                                    }
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-center text-xs text-[#2D1B6B]/40 mt-2">Enter any code to proceed (demo)</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#5E43D8] hover:bg-[#4B36AD] text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(94,67,216,0.3)]"
                                >
                                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Verify & Enter Portal'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowMFA(false)}
                                    className="w-full text-sm text-[#2D1B6B]/50 hover:text-[#5E43D8] transition-colors"
                                >
                                    ← Back to login
                                </button>
                            </form>
                        </>
                    )}
                </div>

                <p className="text-center text-xs text-[#2D1B6B]/30 mt-6">
                    © 2026 Prokoti · Secured by enterprise-grade encryption
                </p>
            </div>
        </div>
    )
}
