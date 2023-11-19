import { redirect, type Handle } from '@sveltejs/kit'
import { init_admin_app } from '$lib/server/firebase_admin'
import { getApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const OPEN_ROUTES = ['/', '/login']

export const handle: Handle = async ({ event, resolve }) => {
  if (!getApp()) init_admin_app()

  const req_url = new URL(event.request.url)

  const session_cookie = event.cookies.get('session') || ''

  if (session_cookie) {
    const user = await getAuth().verifySessionCookie(session_cookie, true)

    event.locals.user = user
  }

  if (!event.locals.user && !OPEN_ROUTES.includes(req_url.pathname)) {
    throw redirect(303, `/login?next=${req_url.pathname}`)
  }

  const response = await resolve(event)
  return response
}
