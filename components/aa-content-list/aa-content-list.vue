<script setup>
  const emit = defineEmits(['itemClick', 'itemBtnClick', 'moreClick'])
  const props = defineProps({
    list: {
      type: Array,
      default: () => []
    },
    showStatus: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'leftCover'
    },
    rootClass: {
      type: String,
      default: 'pt-30 plr-30'
    }
  })
</script>
<template>
  <view class="aa-content-list" :class="rootClass" v-if="list.length">
    <view
      class="aa-content-item u-border-bottom"
      v-for="(item, index) in list"
      :key="item.id"
      @click="emit('itemClick', item)"
    >
      <template v-if="type === 'leftCover'">
        <aa-left-cover-content :data="item" :show-status="showStatus"/>
      </template>
      <template v-else-if="type === 'rightCover'">
        <aa-right-cover-content :data="item"/>
      </template>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .aa-content-list {
    background-color: #ffffff;
    .aa-content-item {
      &:nth-child(1) {
        padding-top: 0;
      }
      padding: 20rpx 0;
    }
  }
</style>