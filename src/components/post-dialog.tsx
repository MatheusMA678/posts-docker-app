import { Plus } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCookies } from 'react-cookie'
import { useState } from 'react'
import { mutate } from 'swr'

import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { api } from '@/lib/api'

const postSchema = z.object({
  title: z.string(),
  description: z.string()
})

type PostFormSchemaType = z.infer<typeof postSchema>

export function PostDialog() {
  const [cookies] = useCookies(['token'])
  const [open, setOpen] = useState(false)

  const form = useForm<PostFormSchemaType>({
    resolver: zodResolver(postSchema)
  })

  const handleCreatePost = async (data: PostFormSchemaType) => {
    try {
      await api.post('/posts', data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      })
      mutate('/posts')
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)} modal>
      <DialogTrigger asChild >
        <Button size={'icon'} variant={'outline'} title="Criar postagem">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Criar postagem</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreatePost)} className="flex flex-col gap-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Insira um título para sua postagem" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Insira uma descrição para sua postagem" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <Button type="submit">Criar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
