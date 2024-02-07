<template>
  <div class="w-full rounded-lg py-2 px-4"
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
    }
  }
}
</script>