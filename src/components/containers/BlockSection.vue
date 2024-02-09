<template>
  <div class="rounded-lg py-2 px-4 w-full"
       :class="{'dark:bg-container-background': !blur,
                 'backdrop-blur': blur}">
    <slot />
  </div>
</template>

<script>
export default {
  name: "BlockSection",
  props: {
    blur: {
      default: false
    },
  }
}
</script>