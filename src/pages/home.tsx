import { CircleNotch } from "@phosphor-icons/react"
import useSWR from 'swr'
import { fetchPosts } from "@/lib/api"

export function Home() {
  const { data, error, isLoading } = useSWR('/posts', fetchPosts)

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <strong>Ocorreu um erro ao carregar as postagens.</strong>
      </div>
    )
  }

  return (
    <div className="max-w-5xl w-full mx-auto flex flex-col gap-8 p-8">
      <section className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Postagens</h1>
        {isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <CircleNotch className="animate-spin" size={28} weight="bold" />
            <strong className="text-lg">Carregando...</strong>
          </div>
        )}
        {!isLoading && data && (
          <div className="flex-1 grid grid-cols-2 gap-4">
            {data.map(post => {
              return (
                <div key={post.id} className="flex flex-col gap-2 p-4 rounded-lg border bg-card">
                  <strong className="text-lg">{post.title}</strong>
                  <p className="text-sm text-muted-foreground">{post.description}</p>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
