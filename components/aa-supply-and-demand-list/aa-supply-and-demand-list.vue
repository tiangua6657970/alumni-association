<script setup>
  import { TYPE_TEXT_MAP } from '@/common/constants'
  import { computed } from 'vue'

  const props = defineProps({
    list: {
      type: Array,
      default: () => []
    },
    showEnterprise: {
      type: Boolean,
      default: true
    },
    rootClass: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['itemClick', 'enterpriseClick'])
</script>
<template>
  <view class="aa-supply-and-demand-list" :class="rootClass" v-if="list.length">
    <view
      class="supply-and-demand-item"
      :class="{ 'pb-30': !showEnterprise }"
      v-for="item in list"
      :key="item.id"
      @click="emit('itemClick', item)"
    >
      <view class="supply-and-demand-item__title aa-font-title text-line-1">{{ item.title }}</view>
      <aa-name-datetime-count
        root-class="mt-20"
        :name="TYPE_TEXT_MAP[item.type]"
        :datetime="item.datetime"
        :count="item.browseCount"
        :type="item.type"
      />
      <view
        class="supply-and-demand-item__paragraph u-line-3 aa-font-paragraph mt-20"
        :class="{ 'mb-20': showEnterprise }"
        >{{ item.paragraph }}
      </view>
      <aa-has-avatar-content-item
        root-class="u-border-top ptb-30"
        :data="item.enterpriseInfo"
        @click="emit('enterpriseClick', item.enterpriseInfo)"
        v-if="showEnterprise"
      />
    </view>
  </view>
</template>
<style scoped lang="scss">
  .aa-supply-and-demand-list {
    .supply-and-demand-item {
      padding: 30rpx 30rpx 0 30rpx;
      margin-bottom: 20rpx;
      background-color: #ffffff;
    }

    .supply-and-demand-item__title {
      flex: 1;
    }

    .supply-and-demand-item__paragraph {
    }
  }
</style>