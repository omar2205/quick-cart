import { getAuth } from 'firebase-admin/auth'
// import { admin } from './firebase_admin'

export function get_user_by_id(user_id: string) {
  return getAuth()
    .getUser(user_id)
    .then(u => u.toJSON())
}