<template>
  <view class="aa-fixed-bottom">
    <template v-if="$slots.default">
      <view class="aa-flex-1">
        <slot></slot>
      </view>
    </template>
    <template v-if="btnText">
      <u-button class="aa-flex-1" :class="btnClass" :type="type" @click="$emit('btnClick')">
        {{ btnText }}</u-button
      >
    </template>
    <template v-if="btnList.length">
      <u-button
        class="aa-flex-1"
        :class="btnClass"
        :type="item.type || 'primary'"
        v-for="item in btnList"
        :key="item.text"
        @click="$emit('btnItemClick', item)"
        >{{ item.text }}</u-button
      >
    </template>
    <u-button class="bottom__share-btn ml-10" open-type="share">
      <u-icon
        name="share"
        :size="30"
        color="#2b85e4"
        label="分享"
        label-color="#2b85e4"
        @click="$emit('share')"
        v-if="showShare"
      />
    </u-button>
    <u-button class="bottom__contact-btn ml-10" v-if="showContact">
      <u-icon
        name="phone-fill"
        :size="30"
        color="#2b85e4"
        label="联系"
        label-color="#2b85e4"
        @click="$emit('contact')"
      />
    </u-button>
  </view>
</template>

<script>
  export default {
    name: 'aa-fixed-button',
    emits: ['btnItemClick', 'share', 'contact'],
    props: {
      type: {
        type: String,
        default: 'primary'
      },
      btnText: {
        type: String,
        default: ''
      },
      showShare: {
        type: Boolean,
        default: true
      },
      showContact: {
        type: Boolean,
        default: true
      },
      btnList: {
        type: Array,
        default: () => []
      },
      btnClass: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-fixed-bottom {
  }
</style>
