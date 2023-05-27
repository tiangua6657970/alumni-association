<template>
  <view class="aa-license" :class="rootClass">
    <view class="mb-20 aa-font-desc">登录遇到问题？</view>
    <view class="licenses">
      <u-checkbox
        :label-size="0"
        :icon-size="30"
        shape="circle"
        :model-value="modelValue"
        @change="handleChange"
      ></u-checkbox>
      <view class="aa-font-desc"
        >同意《<text class="aa-font-desc-light">大聪网络科技服务协议</text>》《<text class="aa-font-desc-light"
          >隐私协议</text
        >》
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'aa-license',
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: Boolean,
        default: false
      },
      rootClass: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleChange(ev) {
        this.$emit('update:modelValue', ev.value)
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-license {
    display: flex;
    flex-direction: column;
    align-items: center;
    .licenses {
      display: flex;
      align-items: center;
    }
    :deep(.u-checkbox__label) {
      margin-right: 5rpx;
    }
  }
</style>
