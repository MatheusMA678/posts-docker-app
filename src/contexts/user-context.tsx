import { User } from "@/types"
import { useAuth } from "@/hooks"
import { createContext } from "react"
import useSWR, { Fetcher } from 'swr'
import { api } from "@/lib/api"
import { useCookies } from "react-cookie"

interface UserContextType {
  user?: User
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [cookies] = useCookies(['token'])
  const fetchUser: Fetcher<User, string> = (url) => api.get(url, { headers: { Authorization: `Bearer ${cookies.token}` } }).then(res => res.data)
  const { data: user } = useSWR('/user', fetchUser)

  return (
    <UserContext.Provider
      value={{
        user
      }}
    >
      {children}
    </UserContext.Provider>
  )
}