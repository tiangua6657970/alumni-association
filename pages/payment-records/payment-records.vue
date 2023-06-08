<script setup>
  import { ref } from 'vue'
  import { getPaymentRecords } from '@/service/personal-center'

  const list = ref([])
  refresh()

  async function refresh() {
    list.value = await _getPaymentRecords()
  }

  async function _getPaymentRecords() {
    const { data } = await getPaymentRecords()
    return data
  }
</script>
<template>
  <view class="payment-records aa-container">
    <view class="payment-records-list">
      <view class="payment-records-item ptb-20 u-border-bottom" v-for="item in list" :key="item.id">
        <view class="payment-records-item__content">
          <view class="payment-records-item__name aa-font-title">{{ item.name }}</view>
          <view class="payment-records-item__datetime aa-font-mini">{{ item.datetime }}</view>
        </view>
        <view class="payment-records-item__money">￥{{ item.money }}</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .payment-records {
    .payment-records-item {
      display: flex;
      align-items: center;

      .payment-records-item__content {
        flex: 1;
      }

      .payment-records-item__datetime {
        margin-top: 12rpx;
      }

      .payment-records-item__money {
        font-size: 24rpx;
        font-weight: 500;
        color: #1b80c4;
      }
    }
  }
</style>
