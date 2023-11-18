<script lang="ts">
  import * as Avatar from '$lib/components/ui/avatar'
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import * as Card from '$lib/components/ui/card'
  import * as Select from '$lib/components/ui/select'
  import { Separator } from '$lib/components/ui/separator'
  import { Loader2 } from 'lucide-svelte'

  import Dayjs from 'dayjs'
  import { carts_collection, create_cart } from '$lib/services/carts'
  import { onSnapshot, query, where } from 'firebase/firestore'
  import { user } from '$lib/client/userstore'
  import { onMount } from 'svelte'
  import dayjs from 'dayjs'

  let state: 'idle' | 'running' | 'error' = 'idle'

  const permissions = [
    {
      value: 'view',
      label: 'Can view',
    },
    {
      value: 'edit',
      label: 'Can edit',
    },
  ]

  const people = [
    {
      name: 'Olivia Martin',
      email: 'm@example.com',
      avatar: '/avatars/03.png',
      permission: permissions[1],
    },
    {
      name: 'Isabella Nguyen',
      email: 'b@example.com',
      avatar: '/avatars/05.png',
      permission: permissions[0],
    },
    {
      name: 'Sofia Davis',
      email: 'p@example.com',
      avatar: '/avatars/01.png',
      permission: permissions[0],
    },
  ]

  const now_date = Dayjs().format('D-M dddd')
  let new_cart_name = `${now_date} shopping`

  const handle_create_list = async () => {
    state = 'running'
    const user_id = $user?.uid
    if (!user_id) return
    const c = await create_cart({
      author_id: user_id,
      items: [],
      date: new Date(),
      title: new_cart_name,
      users: [],
    })
    console.log('created', c)
    state = 'idle'
  }

  let user_carts: any[] = []

  onMount(() => {
    const q = query(carts_collection, where('author_id', '==', $user?.uid))
    const unsub = onSnapshot(q, (snap) => {
      console.log(
        'data:',
        snap.docs.map(
          (d) => (user_carts = [...user_carts, { ...d.data(), id: d.id }]),
        ),
      )
    })

    return () => unsub()
  })
</script>

<Card.Root class="min-w-[500px] max-w-[90vw]">
  <Card.Header>
    <Card.Title>Create new cart</Card.Title>
    <Card.Description>Create a cart and share it</Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="flex flex-col gap-4 justify-center">
      <Input bind:value={new_cart_name} />
      <Button
        variant="default"
        class="shrink-0"
        disabled={state === 'running'}
        on:click={handle_create_list}>
        {#if state === 'running'}
          <Loader2 class="animate-spin mr-4" />
        {/if}
        Create & Copy Link
      </Button>
    </div>
    <Separator class="my-4" />
    <div class="space-y-4">
      <h4 class="text-sm font-medium text-center">Your carts</h4>
      <div class="grid gap-6">
        {#each user_carts as cart}
          <a class="hover:bg-gray-50 p-2 rounded pointer" href="/c/{cart.id}">
            <p class="text-sm font-medium leading-none mb-1">
              {cart.title}
            </p>
            <p class="text-sm text-muted-foreground">
              Created at: {dayjs(cart.date.toDate()).format('DD-MMMM YYYY')}
            </p>
          </a>
        {:else}
          <h4 class="text-sm text-center">
            You don't have any carts. <div class="font-medium">
              Create one above
            </div>
            .
          </h4>
        {/each}
      </div>
    </div>
  </Card.Content>
</Card.Root>
