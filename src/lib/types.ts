import type { UserInfo } from 'firebase/auth'
import type { Timestamp } from 'firebase/firestore'

export type user_type = User | UserInfo | string
type date_firestore = Date | Timestamp

export interface User {
  id?: string

  email: string
  avatar?: string
}

export interface Cart {
  id?: string

  title: string
  date: date_firestore

  author_id: user_type
  users: user_type[]

  items: Item[]
}

export interface Item {
  id?: string

  name: string

  added_by: string
  added_on: date_firestore

  picked_up_by: user_type | null
  picked_up_date: date_firestore | null
}
