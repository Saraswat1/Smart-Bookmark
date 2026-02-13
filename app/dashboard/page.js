'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

import AddBookmark from '@/components/AddBookmark'
import BookmarkList from '@/components/BookmarkList'
import LogoutButton from '@/components/LogoutButton'

export default function Dashboard() {

  const router = useRouter()

  const [user, setUser] = useState(null)
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    await getUser()
    await fetchBookmarks()
    setupRealtime()
    setLoading(false)
  }

  const getUser = async () => {

    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      router.push('/login')
    } else {
      setUser(data.user)
    }
  }

  const fetchBookmarks = async () => {

    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
  }

  const setupRealtime = () => {

    supabase
      .channel('realtime-bookmarks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
        },
        fetchBookmarks
      )
      .subscribe()
  }

  /* Loading Screen */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100">

        <div className="text-indigo-600 text-lg font-medium animate-pulse">
          Loading dashboard...
        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 px-4 py-8">

      <div
        className="
          max-w-4xl
          mx-auto
          bg-white
          p-8
          rounded-2xl
          shadow-xl
          border
        "
      >

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl font-bold text-gray-900">
              My Bookmarks
            </h1>

            <p className="text-gray-500 text-sm">
              Manage and organize your saved links
            </p>

          </div>

          <LogoutButton />

        </div>

        {/* Add Form */}
        <AddBookmark
          user={user}
          fetchBookmarks={fetchBookmarks}
        />

        {/* Bookmark List */}
        <BookmarkList
          bookmarks={bookmarks}
          fetchBookmarks={fetchBookmarks}
        />

      </div>

    </div>
  )
}
