import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useCookies } from 'react-cookie'
import { useContext } from "react";
import { UserContext } from "@/contexts/user-context";
import { DropdownUser } from "./dropdown-user";
import { PostDialog } from "./post-dialog";
import { mutate } from 'swr'

export function Header() {
  const [cookies, setCookies, removeCookie] = useCookies(['token'])
  const { user } = useContext(UserContext)

  return (
    <header className="flex items-center h-24 border-b">
      <div className="max-w-5xl w-full mx-auto px-8 flex-1 flex items-center justify-between">
        <strong className="text-2xl">Posts App</strong>
        {!cookies.token ? (
          <nav className="flex items-center gap-2">
            <Button asChild variant={'ghost'}>
              <Link to='/entrar'>Entrar</Link>
            </Button>
            <Button asChild>
              <Link to='/registrar'>Registrar</Link>
            </Button>
          </nav>
        ) : (
          <div className="flex items-center gap-4">
            <PostDialog />

            <DropdownUser user={user} logout={() => {
              removeCookie('token')
              window.location.reload()
            }} />
          </div>
        )}
      </div>
    </header>
  )
}
