import { Post, User } from "@/types";
import axios from "axios";
import { Fetcher } from 'swr'

export const api = axios.create({
  baseURL: "http://localhost:3333"
})

export const fetchPosts: Fetcher<Post[], string> = (url) => api.get(url).then(res => res.data)