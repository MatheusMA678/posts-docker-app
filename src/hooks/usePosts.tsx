import { useEffect, useState } from "react";
import { api } from "../lib/api";

interface Post {
  id: string
  user_id: string
  title: string
  description: string
  created_at: string
  updated_at: string
}

export function usePosts() {
  const [data, setData] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts')
      const posts = await res.data
      setData(posts)
      setIsLoading(false)
    } catch (err) {
      setError(err as string)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return {
    data,
    isLoading,
    error
  }
}
