import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";
import { useCookies } from 'react-cookie'
import { User } from "@/types";

interface UseAuthReturnType {
  data: User | null
  isLoading: boolean
  error: string | null
}

export function useAuth(): UseAuthReturnType {
  const [data, setData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cookies] = useCookies(['token'])

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get('/user', {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      })
      const user = await res.data
      setData(user)
      setIsLoading(false)
    } catch (err) {
      setError(err as string)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (cookies.token) {
      fetchUser()
    }
  }, [])

  if (!cookies.token) {
    return {
      data: null,
      error: "Não foi possível acessar o token.",
      isLoading: false
    }
  }

  return {
    data,
    isLoading,
    error
  }
}
