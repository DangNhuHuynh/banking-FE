<template>
  <div
    class="collapse-wrapper trans-slow"
  >
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapseWrapper'
}
</script>

<style lang="scss" scoped>
.collapse-wrapper {
  max-height: 0;
  overflow: hidden;
}
.trans-slow {
  transition: all 0.5s;
}
</style>
