import { Link } from "react-router-dom"
import { Gear, Monitor, Moon, SignOut, Sun } from "@phosphor-icons/react"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "./ui/dropdown-menu"
import { User } from "@/types"
import { useTheme } from "./theme-provider"

interface DropdownUserType {
  user?: User
  logout: () => void
}

export function DropdownUser({ user, logout }: DropdownUserType) {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost' className="rounded-full overflow-hidden">
          <Avatar>
            <AvatarFallback>{user?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            <AvatarImage src={user?.image_url} alt={user?.username} />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link to="/configuracoes" className="gap-2">
            <Gear />
            Configurações
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2">
            {theme === 'light' ? <Sun /> : theme === 'dark' ? <Moon /> : theme == 'system' && <Monitor />}
            Mudar tema
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Claro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Escuro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              Sistema
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="text-red-500 hover:!text-red-500 gap-2"
        >
          <SignOut />
          Sair
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
