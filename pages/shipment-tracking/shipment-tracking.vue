<script setup>
  const timeLine = [
    {
      title: '待取件',
      desc: '[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。',
      datetime: '2019-05-08 12:12'
    },
    {
      title: '待取件',
      desc: '[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。',
      datetime: '2019-05-08 12:12'
    },
    {
      title: '待取件',
      desc: '[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。',
      datetime: '2019-05-08 12:12'
    },
    {
      title: '待取件',
      desc: '[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。',
      datetime: '2019-05-08 12:12'
    },
    {
      title: '待取件',
      desc: '[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。',
      datetime: '2019-05-08 12:12'
    },
    {
      title: '待取件',
      desc: '[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。',
      datetime: '2019-05-08 12:12'
    },
    {
      title: '待取件',
      desc: '[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。',
      datetime: '2019-05-08 12:12'
    }
  ]
</script>

<template>
  <view class="shipment-tracking">
    <view class="time-line">
      <u-time-line>
        <u-time-line-item v-for="item in timeLine">
          <template v-slot:content>
            <view>
              <view class="aa-font-title">{{ item.title }}</view>
              <view class="aa-font-desc">{{ item.desc }}</view>
              <view class="aa-font-mini">{{ item.datetime }}</view>
            </view>
          </template>
        </u-time-line-item>
      </u-time-line>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .shipment-tracking {
    .time-line {
      background-color: #fff;
      padding: 30rpx;
    }
    .aa-font-desc,
    .aa-font-mini {
      margin-top: 10rpx;
    }
  }
</style>
