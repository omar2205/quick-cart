<script lang="ts">
  import CreateAccount from '$lib/components/CreateAccount.svelte'
  import { createUser } from '$lib/auth'
  import { user } from '$lib/client/userstore'
  import UserCartLists from '$lib/components/UserCartLists.svelte'

  const handle_signin = (e: CustomEvent<'google' | 'github'>) => {
    createUser(e.detail)
  }
</script>

<div
  class="max-w-lg mx-auto p-4 flex flex-col gap-4 h-screen justify-center items-center">
  <h1 class="text-4xl mb-5">Quick Cart</h1>

  {#if $user}
    <h1>Welcome {$user.displayName}</h1>
    <UserCartLists />
  {:else}
    <CreateAccount on:signin={handle_signin} />
  {/if}
  <p class="text-sm opacity-40">&copy; 2023 QuickCart</p>
</div>
