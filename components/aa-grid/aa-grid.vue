<template>
  <u-grid :col="4" :border="false">
    <u-grid-item v-for="item in list" :key="item.icon" @click="$emit('itemClick', item)">
      <u-icon :name="item.icon" :size="120"></u-icon>
      <view class="text-line-1">{{ item.name }}</view>
    </u-grid-item>
  </u-grid>
</template>

<script>
  export default {
    name: 'aa-grid',
    emits: ['itemClick'],
    props: {
      list: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped lang="scss">
  
  .aa-grid {
  
  }
</style>
