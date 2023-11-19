import type { Handle } from '@sveltejs/kit'
import { getAuth } from 'firebase-admin/auth'

export const handle: Handle = async ({ event, resolve,  }) => {
  const session_cookie = event.cookies.get('session') || ''
  const user = await getAuth().verifySessionCookie(session_cookie, true)
  
  event.locals.user = user

  const response = await resolve(event)
  return response
}
