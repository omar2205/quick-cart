import { getAuth } from 'firebase-admin/auth'
import type { RequestHandler } from './$types'
import { redirect } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, cookies }) => {
  const id_token = (await request.json()).id_token
  const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days

  const session_cookie = await getAuth().createSessionCookie(id_token, {
    expiresIn,
  })

  cookies.set('session', session_cookie, {
    httpOnly: true,
    maxAge: expiresIn,
    secure: true,
    path: '/',
  })

  throw redirect(302, '/')
}
