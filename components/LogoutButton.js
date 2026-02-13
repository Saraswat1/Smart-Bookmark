'use client'

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LogoutButton() {

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const logout = async () => {
    setLoading(true)

    await supabase.auth.signOut()

    router.push('/login')
  }

  return (
    <button
      onClick={logout}
      disabled={loading}
      className="
        relative overflow-hidden
        px-5 py-2.5 rounded-xl
        text-sm font-semibold tracking-wide

        bg-white/20 backdrop-blur-lg
        border border-white/30
        text-gray-800

        shadow-md
        hover:shadow-xl
        hover:scale-105

        transition-all duration-300
        active:scale-95
        disabled:opacity-60
      "
    >

      {/* Gradient Hover Layer */}
      <span
        className="
          absolute inset-0
          bg-gradient-to-r
          from-red-500/20 via-pink-500/20 to-purple-500/20
          opacity-0
          group-hover:opacity-100
          transition
        "
      />

      {/* Button Text */}
      <span className="relative z-10">
        {loading ? 'Signing out...' : 'Logout'}
      </span>

    </button>
  )
}
