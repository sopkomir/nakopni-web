'use client'

import { useEffect } from 'react'

export default function ViewCounter({
  articleId,
}: {
  articleId: string
}) {
  useEffect(() => {
    fetch('/api/views', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: articleId,
      }),
    })
  }, [articleId])

  return null
}