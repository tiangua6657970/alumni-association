<template>
  <div class="aa-name-datetime-count aa-font-mini" :class="rootClass">
    <view class="name" :class="`name--${type}`">
      {{ name }}
    </view>
    <view class="datetime">{{ datetime }}</view>
    <view class="count">{{ count }}次浏览</view>
  </div>
</template>

<script>
  export default {
    name: 'aa-name-datetime-count',
    props: {
      name: {
        type: String,
        default: ''
      },
      datetime: {
        type: String,
        default: ''
      },
      count: {
        type: [String, Number],
        default: ''
      },
      type: {
        type: [String, Number]
      },
      rootClass: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-name-datetime-count {
    display: flex;
    align-items: center;
    .name {
      &--1 {
        color: #1b80c4;
      }
  
      &--2 {
        color: #ff9a00;
      }
    }
    .datetime,
    .count {
      margin-left: 20rpx;
    }
  }
</style>
