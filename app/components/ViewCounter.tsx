'use client'

import { useEffect } from 'react'

const HOURS = 24

export default function ViewCounter({
  articleId,
}: {
  articleId: string
}) {
  useEffect(() => {

    const key = `viewed-${articleId}`

    const lastViewed = localStorage.getItem(key)

    if (lastViewed) {
      const diff =
        Date.now() - Number(lastViewed)

      if (diff < HOURS * 60 * 60 * 1000) {
        return
      }
    }

    fetch('/api/views', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: articleId,
      }),
    })

    localStorage.setItem(
      key,
      Date.now().toString()
    )

  }, [articleId])

  return null
}