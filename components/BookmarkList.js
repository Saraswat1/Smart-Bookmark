'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BookmarkList({ bookmarks, fetchBookmarks }) {

  const [deletingId, setDeletingId] = useState(null)

  const deleteBookmark = async (id) => {

    try {
      setDeletingId(id)

      await supabase
        .from('bookmarks')
        .delete()
        .eq('id', id)

      fetchBookmarks()

    } catch (err) {
      console.error(err)
    }

    setDeletingId(null)
  }

  return (
    <div className="grid md:grid-cols-2 gap-5">

      {/* Empty State */}
      {bookmarks.length === 0 && (
        <div className="col-span-full text-center py-12">

          <p className="text-gray-500 text-lg mb-1">
            No bookmarks yet
          </p>

          <p className="text-sm text-gray-400">
            Add your first link to get started
          </p>

        </div>
      )}

      {/* Cards */}
      {bookmarks.map((b) => (

        <div
          key={b.id}
          className="
            group
            bg-white/90
            backdrop-blur
            p-5
            rounded-2xl
            border
            border-gray-200
            shadow-md
            hover:shadow-xl
            transition
            relative
          "
        >

          {/* Title */}
          <h3 className="font-semibold text-gray-800 text-lg mb-1 truncate">
            {b.title}
          </h3>

          {/* URL */}
          <a
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm
              text-indigo-600
              break-all
              hover:underline
              inline-block
              mb-4
            "
          >
            {b.url}
          </a>

          {/* Actions */}
          <div className="flex justify-between items-center">

            <span className="text-xs text-gray-400">
              Saved link
            </span>

            <button
              onClick={() => deleteBookmark(b.id)}
              disabled={deletingId === b.id}
              className={`
                text-sm
                font-medium
                transition
                ${
                  deletingId === b.id
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-red-500 hover:text-red-700'
                }
              `}
            >

              {deletingId === b.id
                ? 'Deleting...'
                : 'Delete'}

            </button>

          </div>

        </div>
      ))}

    </div>
  )
}
