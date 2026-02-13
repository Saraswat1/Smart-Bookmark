'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AddBookmark({ user, fetchBookmarks }) {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const addBookmark = async (e) => {
    e.preventDefault()

    if (!title || !url || !user) {
      setError('All fields are required')
      return
    }

    try {
      setLoading(true)
      setError('')
      setSuccess(false)

      const { error } = await supabase.from('bookmarks').insert({
        title,
        url,
        user_id: user.id,
      })

      if (error) throw error

      fetchBookmarks()

      setTitle('')
      setUrl('')
      setSuccess(true)

      setTimeout(() => setSuccess(false), 2000)

    } catch (err) {
      setError('Failed to save bookmark')
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={addBookmark}
      className="
        backdrop-blur-xl
        bg-white/80
        border
        border-white/40
        p-6
        rounded-2xl
        shadow-xl
        mb-8
        transition
        hover:shadow-2xl
      "
    >

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Add New Bookmark
        </h2>

        <p className="text-sm text-gray-500">
          Save important links securely
        </p>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">

        {/* Title */}
        <div className="relative">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              peer
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              pt-5
              pb-2
              text-gray-900
              bg-transparent
              focus:outline-none
              focus:border-indigo-600
              focus:ring-2
              focus:ring-indigo-200
              transition
            "
            placeholder=" "
          />

          <label
            htmlFor="title"
            className="
              absolute
              left-4
              top-3
              text-sm
              text-gray-500
              transition-all
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-indigo-600
            "
          >
            Website Name
          </label>
        </div>

        {/* URL */}
        <div className="relative">
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="
              peer
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              pt-5
              pb-2
              text-gray-900
              bg-transparent
              focus:outline-none
              focus:border-indigo-600
              focus:ring-2
              focus:ring-indigo-200
              transition
            "
            placeholder=" "
          />

          <label
            htmlFor="url"
            className="
              absolute
              left-4
              top-3
              text-sm
              text-gray-500
              transition-all
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-indigo-600
            "
          >
            Website URL
          </label>
        </div>

      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 mb-3">
          {error}
        </p>
      )}

      {/* Success */}
      {success && (
        <p className="text-sm text-green-600 mb-3">
          Bookmark saved successfully
        </p>
      )}

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className={`
          w-full
          py-3
          rounded-xl
          font-semibold
          text-white
          transition
          flex
          items-center
          justify-center
          gap-2
          ${
            loading
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
          }
        `}
      >

        {loading ? (
          <>
            <span
              className="
                w-5
                h-5
                border-2
                border-white
                border-t-transparent
                rounded-full
                animate-spin
              "
            />
            Saving...
          </>
        ) : (
          'Save Bookmark'
        )}

      </button>

    </form>
  )
}
