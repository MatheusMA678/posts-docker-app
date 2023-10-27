import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useCookies } from 'react-cookie'
import { Navigate, useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  email: z.string().email({
    message: "Email inválido"
  }),
  password: z.string()
})

type FormSchemaType = z.infer<typeof formSchema>

export function Login() {
  const [cookies, setCookie] = useCookies(['token'])
  const navigate = useNavigate()
  const { toast } = useToast()

  const form = useFormContext<FormSchemaType>()

  const handleLogin = async (data: FormSchemaType) => {
    try {
      const res = await api.post<Promise<{ token: string, success: boolean, message?: string }>>("/login", data)
      const json = await res.data

      setCookie("token", json.token)
      if (cookies.token) {
        navigate('/')
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.response.data.message,
        variant: 'destructive'
      })
    }
  }

  if (cookies.token) {
    return <Navigate to='/'/>
  }

  return (
    <div className='px-8 min-h-screen flex items-center justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4 max-w-xl w-full">
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite seu email" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Digite sua senha" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <Button type="submit">
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  )
}
