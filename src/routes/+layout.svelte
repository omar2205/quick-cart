<script lang="ts">
  import { onAuthStateChanged } from 'firebase/auth'
  import '../app.postcss'
  import { auth } from '$lib/firebase'
  import { user } from '$lib/client/userstore'

  onAuthStateChanged(auth, (user) => {
    console.log('state changed', { user })
    if (user) $user = user
  })
</script>

<slot />
