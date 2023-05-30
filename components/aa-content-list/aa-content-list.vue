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
  const statusTextMap = {
    1: '报名中',
    2: '在进行'
  }
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
        <u-image class="aa-content-item__image" :src="item.cover" :width="220" :height="180" />
        <view class="aa-content-item__content aa-content-item__content--right">
          <view class="aa-content-item__content__title text-line-1 aa-font-title">{{ item.title }}</view>
          <view class="aa-font-desc u-line-2">
            {{ item.paragraph }}
          </view>
          <view class="aa-content-item__content__bottom">
            <view class="bottom__date text-line-1 aa-font-mini">{{ item.datetime }}</view>
            <view class="bottom__status" :class="`bottom__status--${item.status}`" v-if="showStatus"
              >{{ statusTextMap[item.status] }}
            </view>
          </view>
        </view>
      </template>
      <template v-else-if="type === 'rightCover'">
        <view class="aa-content-item__content aa-content-item__content--left">
          <view class="aa-content-item__content__title u-line-2 aa-font-title">{{ item.title }}</view>
          <view class="aa-font-desc u-line-2"
            >
            {{ item.paragraph }}
          </view>
          <view class="aa-content-item__content__bottom text-line-1 aa-font-mini">{{ item.datetime }}</view>
        </view>
        <u-image class="aa-content-item__image" :src="item.cover" :width="220" :height="180" />
      </template>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .aa-content-list {
    background-color: #ffffff;
    &.pb-30 {
      padding-bottom: 30rpx;
    }

    .aa-content-item {
      padding: 20rpx 0;
      display: flex;
      &.pt-0 {
        padding-top: 0;
      }

      .aa-content-item__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .aa-content-item__content--left {
        margin-right: 18rpx;
      }

      .aa-content-item__content--right {
        margin-left: 18rpx;
      }

      .aa-content-item__content__title {
      }

      .aa-content-item__content__bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .bottom__date {
      }

      .bottom__status {
        flex-shrink: 0;
        font-size: 24rpx;
        color: #ffffff;
        line-height: 48rpx;
        border-radius: 24rpx;
        padding: 0 25rpx;
      }

      .bottom__status--1 {
        background-color: #1b80c4;
      }

      .bottom__status--2 {
        background-color: #00c777;
      }

      .bottom__btn {
        margin: 0;
      }
    }
  }
</style>
