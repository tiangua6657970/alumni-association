<template>
  <u-button class="aa-button" size="mini" type="primary" @click="$emit('click')"><slot>按钮</slot></u-button>
</template>

<script>
  export default {
    name: 'aa-button',
    emits: ['click']
  }
</script>

<style scoped lang="scss">
  .aa-button {
  }
</style>