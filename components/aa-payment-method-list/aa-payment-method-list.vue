<template>
  <view class="aa-payment-method-list" :class="rootClass">
    <view class="payment-method-item" v-for="(item, index) in list" :key="item.name">
      <u-icon
        class="payment-method-item__icon"
        custom-prefix="custom-icon"
        :name="item.icon"
        :color="item.iconColor"
      ></u-icon>
      <text class="payment-method-item__name">{{ item.name }}</text>
      <u-checkbox
        class="payment-method-item__select"
        :name="index"
        :size="30"
        :label-size="0"
        shape="circle"
        :model-value="item.selected"
        @update:modelValue="handleChange(index)"
      />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'aa-payment-method-list',
    emits: ['paymentMethodChange'],
    props: {
      rootClass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        list: [
          { name: '微信支付', type: '', icon: 'wechatPayment', selected: true, iconColor: '#43C93E' },
          { name: '支付宝支付', type: '', icon: 'alipayPayment', selected: false, iconColor: '#1296db' },
          { name: '银行卡', type: '', icon: 'creditCardPayment', selected: false, iconColor: '#1296db' }
        ]
      }
    },
    methods: {
      handleChange(index) {
        this.list.forEach((item, _index) => item.selected = _index === index)
        this.$emit('paymentMethodChange', this.list[index].name)
      }
    },
    created() {
      this.$emit('paymentMethodChange', '微信支付')
    }
  }
</script>

<style scoped lang="scss">
  .aa-payment-method-list {
    .payment-method-item {
      display: flex;
      align-items: center;
      padding: 20rpx;
      margin-bottom: 20rpx;
      background-color: #ffffff;
    
      .payment-method-item__name {
        margin-left: 10rpx;
      }
    
      .payment-method-item__select {
        margin-left: auto;
      }
    }
  }
</style>
