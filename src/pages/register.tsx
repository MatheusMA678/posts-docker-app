import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  username: z.string(),
  email: z.string().email({
    message: "Email inválido"
  }),
  password: z.string(),
  image_url: z.string().url().optional()
})

type FormSchemaType = z.infer<typeof formSchema>

export function Register() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const form = useFormContext<FormSchemaType>()

  const handleRegister = async (data: FormSchemaType) => {
    try {
      await api.post("/users", data)

      navigate('/entrar')
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.response.data.message,
        variant: 'destructive'
      })
    }
  }

  return (
    <div className='px-8 min-h-screen flex items-center justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4 max-w-xl w-full">
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nome de Usuário</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite um nome de usuário" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Digite seu email" required />
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
                    <Input {...field} type="password" placeholder="Digite uma senha forte" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name='image_url'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Imagem</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Cole um link válido de uma imagem" />
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
