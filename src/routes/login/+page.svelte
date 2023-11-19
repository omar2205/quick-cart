<script lang="ts">
  import CreateAccount from '$lib/components/CreateAccount.svelte'
  import { createUser } from '$lib/auth'
  import { goto } from '$app/navigation'

  const handle_signin = async (e: CustomEvent<'google' | 'github'>) => {
    const user = await createUser(e.detail)
    const url = new URL(location.href)
    const next_path = url.searchParams.get('next') || '/'
    if (user) goto(next_path)
  }
</script>

<div
  class="max-w-lg mx-auto p-4 flex flex-col gap-4 h-screen justify-center items-center">
  <h1 class="text-4xl">Quick Cart</h1>
  <h1 class="mb-5">Please login</h1>
  <CreateAccount on:signin={handle_signin} />
  <p class="text-sm opacity-40">&copy; 2023 QuickCart</p>
</div>
