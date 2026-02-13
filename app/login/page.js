'use client'

import { supabase } from '@/lib/supabase'

export default function Login() {

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border">

        {/* App Name */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Smart Bookmark
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Sign in to manage your bookmarks
        </p>

        {/* Login Button */}
        <button
          onClick={login}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            py-3
            rounded-lg
            bg-indigo-600
            text-white
            font-semibold
            text-sm
            hover:bg-indigo-700
            transition
            shadow-md
            active:scale-95
          "
        >

          {/* Google Icon */}
          <svg
            className="w-5 h-5"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1 7.3 2.7l5.7-5.7C33.5 6.4 28.9 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10.5 0 19-8.5 19-19 0-1.3-.1-2.2-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 16.2 19 13 24 13c2.8 0 5.4 1 7.3 2.7l5.7-5.7C33.5 6.4 28.9 4 24 4 16.3 4 9.6 8.4 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c4.9 0 9.4-1.9 12.8-5l-6-4.9c-1.6 1.2-3.8 1.9-6.8 1.9-5.2 0-9.6-3.4-11.2-8.1l-6.5 5C9.6 39.6 16.3 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1 2.8-3 5.1-5.5 6.6l6 4.9c3.5-3.2 5.7-8 5.7-14 0-1.3-.1-2.2-.4-3.5z"
            />
          </svg>

          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Secure login using Google OAuth
        </p>

      </div>

    </div>
  )
}
