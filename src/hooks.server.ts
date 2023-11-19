import type { Handle } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { admin, init_admin_app } from '$lib/server/firebase_admin'
import { getApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

export const handle: Handle = async ({ event, resolve }) => {
  if (!getApp()) init_admin_app()

  const session_cookie = event.cookies.get('session') || ''
  const user = await getAuth().verifySessionCookie(session_cookie, true)

  event.locals.user = user

  const response = await resolve(event)
  return response
}
