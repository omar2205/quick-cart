<script lang="ts">
  import { page } from '$app/stores'
  import CartItem from '$lib/components/CartItem.svelte'
  import { Button } from '$lib/components/ui/button'
  import { Separator } from '$lib/components/ui/separator'
  import {
    get_carts_ref
  } from '$lib/services/carts'
  import dayjs from 'dayjs'
  import { onSnapshot } from 'firebase/firestore'
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  export let data: PageData

  let cart = data.cart
  let cart_date = ''
  $: {
    // convert date from timestamp if it has toDate method
    cart_date = dayjs(
      'toDate' in cart.date ? cart.date.toDate() : cart.date,
    ).format('DD-MMMM')
  }

  onMount(() => {
    const unsub = onSnapshot(get_carts_ref($page.params.id), (snap) => {
      const data = snap.data()
      // @ts-ignore
      if (snap.exists() && data) cart = snap.data()
    })

    return () => unsub()
  })
</script>

<div
  class="max-w-lg mx-auto p-4 flex flex-col gap-4 h-screen justify-start items-center">
  <h1 class="text-2xl">{cart.title}</h1>
  <p class="text-sm mb-1">
    Created on: {cart_date} -
    <span class="opacity-60">by {cart.author_id}</span>
  </p>
  <Separator class="mb-1" />

  {#each cart.items as item}
    <CartItem title={item.name} element_id={`input_${item.name}`} />
  {:else}
    <p>No items, add new item below</p>
  {/each}

  <div class="footer_btns flex gap-2 mt-auto">
    <Button style="flex: 2">Add item</Button>
    <Button variant="outline" style="flex: 1">Invite user</Button>
  </div>
  <pre>{JSON.stringify(data, null, 2)}</pre>
</div>
