<template>
  <view class="aa-has-avatar-content-list" :class="rootClass" v-if="list.length">
    <view class="aa-has-avatar-content-item" v-for="item in list" :key="item.id" @click="$emit('itemClick', item)">
      <u-avatar
        class="aa-has-avatar-content-item__avatar"
        :sex-icon="item.sex"
        :show-sex="!!item.sex"
        :size="88"
        :src="item.avatar"
      ></u-avatar>
      <view class="aa-has-avatar-content-item__content">
        <view class="aa-has-avatar-content-item__title aa-font-title">{{ item.name }}</view>
        <view class="aa-has-avatar-content-item__desc aa-font-desc">{{ item.desc }}</view>
      </view>
      <view @click.stop>
        <u-checkbox
          :label-size="0"
          :icon-size="30"
          shape="circle"
          v-model="item.selected"
          :disabled="disableCheckBox || item.disableCheckBox"
          @change="$emit('checkboxChange', item)"
          v-if="showCheckBox"
        ></u-checkbox>
      </view>
    </view>
    <slot name="bottom"></slot>
  </view>
</template>

<script>
  export default {
    name: 'aa-has-avatar-content-list',
    emits: ['itemClick', 'checkboxChange'],
    props: {
      list: {
        type: Array,
        default: () => []
      },
      showSex: {
        type: Boolean,
        default: false
      },
      showCheckBox: {
        type: Boolean,
        default: false
      },
      disableCheckBox: {
        type: Boolean,
        default: false
      },
      rootClass: {
        type: String,
        default: ' '
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-has-avatar-content-list {
    .aa-has-avatar-content-item {
      display: flex;
      align-items: center;
      margin-bottom: 50rpx;
    }

    .aa-has-avatar-content-item:nth-last-child(1) {
      margin-bottom: 0;
    }

    .aa-has-avatar-content-item__content {
      flex: 1;
      margin-left: 20rpx;
    }

    .aa-has-avatar-content-item__title {
    }

    .aa-has-avatar-content-item__desc {
      margin-top: 8rpx;
    }

    :deep(.u-checkbox__label) {
      margin-right: 5rpx;
    }
  }
</style>