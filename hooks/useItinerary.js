import { useState } from 'react'
import { generateItinerary } from '../lib/api.js'

export function useItinerary() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function submit(payload) {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await generateItinerary(payload)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setData(null)
    setError(null)
  }

  return { data, loading, error, submit, reset }
}