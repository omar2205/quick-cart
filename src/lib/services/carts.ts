import { db } from '$lib/firebase'
import type { Cart } from '$lib/types'
import { addDoc, collection, doc, getDoc } from 'firebase/firestore'

export const CARTS_COLLECTION_NAME = 'carts'

export const carts_collection = collection(db, CARTS_COLLECTION_NAME)

export const get_carts_ref = (id: string) => doc(db, CARTS_COLLECTION_NAME, id)

export async function create_cart(cart: Cart) {
  return addDoc(carts_collection, cart)
}

export async function get_cart_by_id(cart_id: string): Promise<null | Cart> {
  if (!cart_id) return null

  const cart = await getDoc(get_carts_ref(cart_id))
  if (cart.exists()) return cart.data() as Cart
  return null
}
