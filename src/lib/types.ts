import type { UserInfo } from 'firebase/auth'

export type user_type = User | UserInfo | string

export interface User {
  id?: string

  email: string
  avatar?: string
}

export interface Cart {
  id?: string

  title: string
  date: Date

  author_id: user_type
  users: user_type[]

  items: Item[]
}

export interface Item {
  id?: string

  name: string

  added_by: string
  added_on: Date

  picked_up_by: user_type | null
  picked_up_date: Date | null
}
