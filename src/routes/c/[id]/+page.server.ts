import { get_cart_by_id } from '$lib/services/carts'
import { error, redirect } from '@sveltejs/kit'
import type { Timestamp } from 'firebase/firestore'
import type { PageServerLoad } from './$types'

import { get_user_by_id } from '$lib/server/auth'

export const load = (async ({ params, locals }) => {

  const cart = await get_cart_by_id(params.id)

  if (!cart) throw error(404, 'No cart found')

  // if (!locals.user) throw redirect(303, `/login?next=/c/${params.id}`)

  // check if user is the auther or in users list

  // @ts-ignore
  cart.author = await get_user_by_id(cart.author_id)
  cart.users.forEach(user_id => get_user_by_id(user_id as string))

  cart.date = (cart?.date as Timestamp).toDate()
  return { cart }
}) satisfies PageServerLoad
