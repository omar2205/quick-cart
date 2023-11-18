import { get_cart_by_id } from '$lib/services/carts'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { Timestamp } from 'firebase/firestore'

export const load = (async ({ params }) => {
  const cart = await get_cart_by_id(params.id)

  if (!cart) throw error(404, 'No cart found')

  cart.date = (cart?.date as Timestamp).toDate()
  return { cart }
}) satisfies PageServerLoad
