export interface User {
  id: string
  email: string
  password: string
  username: string
  image_url: string
  created_at: string
  posts: Post[]
}

export interface Post {
  id: string
  user_id: string
  title: string
  description: string
  created_at: string
  updated_at: string
}