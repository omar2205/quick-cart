<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox'
  import { Label } from '$lib/components/ui/label'

  export let title: string
  export let subtitle = ''
  export let element_id: string
</script>

<div class="items-top flex space-x-2 w-full">
  <Checkbox id={element_id} />
  <div class="grid gap-1.5 leading-none">
    <Label
      for="terms1"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {title}
    </Label>
    {#if subtitle}
    <p class="text-sm text-muted-foreground">
      {subtitle}
    </p>
    {/if}
  </div>
</div>
