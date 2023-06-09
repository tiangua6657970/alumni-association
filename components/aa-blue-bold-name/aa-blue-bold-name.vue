<template>
  <div class="aa-blue-bold-name" :class="_rootClass" @click="$emit('click')"><slot></slot></div>
</template>

<script>
  export default {
    name: 'aa-blue-bold-name',
    emits: ['click'],
    props: {
      sub: {
        type: Boolean,
        default: false
      },
      rootClass: {
        type: String,
        default: ''
      }
    },
    computed: {
      _rootClass() {
        return this.rootClass + ' ' + (this.sub ? 'sub' : '')
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-blue-bold-name {
    font-size: 36rpx;
    font-weight: 500;
    color: #1b80c4;
  }
  .sub {
    font-size: 28rpx;
  }
</style>
