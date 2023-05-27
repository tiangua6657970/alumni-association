<template>
  <u-tabs
    :list="list"
    :is-scroll="true"
    :current="modelValue"
    @change="$emit('update:modelValue', $event)"
    bg-color="#f7f7f7"
  ></u-tabs>
</template>

<script>
  export default {
    name: 'aa-tabs',
    emits: ['update:modelValue'],
    props: {
      list: {
        type: Array,
        default: () => []
      },
      modelValue: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-tabs {
  }
</style>
