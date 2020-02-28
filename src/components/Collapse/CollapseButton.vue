<template>
  <div
    class="cursor-pointer"
    @click="toogleCollapse"
  >
    <slot v-if="$slots.default" />
    <slot
      v-if="hasNamedSlots && open"
      name="active"
    />
    <slot
      v-else-if="hasNamedSlots"
      name="inactive"
    />
  </div>
</template>

<script>
export default {
  name: 'CollapseButton',
  props: {
    target: {
      type: String,
      default: null
    },
    openDefault: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    hasNamedSlots() {
      return this.$slots.active || this.$slots.inactive ||
        this.$scopedSlots.active || this.$scopedSlots.inactive
    }
  },
  watch: {
    open(val) {
      const targetEl = this.target
        ? document.querySelector(this.target)
        : null

      if (!targetEl) {
        return
      }

      if (val) {
        targetEl.style.maxHeight = (targetEl.firstElementChild.offsetHeight || 0) + 50 + 'px'
        targetEl.style.paddingBottom = '50px'
        return
      }
      targetEl.style.maxHeight = 0
      targetEl.style.paddingBottom = 0
    }
  },
  mounted() {
    if (this.openDefault) {
      this.open = true
    }
  },
  methods: {
    toogleCollapse() {
      this.open = !this.open
    }
  }
}
</script>

<style lang="scss" scoped></style>
