<template>
  <view :class="listCls">
    <view :class="itemCls" v-for="item in list" :key="item.label">
      <u-icon v-if="item.icon" :name="item.icon" :size="24"></u-icon>
      <text class="ml-10 aa-font-desc">{{ item.label }}</text>
      <text class="ml-10 aa-flex-1 aa-font-info-content">{{ item.content }}</text>
      <view class="ml-10 aa-font-desc-light" v-if="item.endContent" @click="$emit('itemEndClick', item)"
      >
        <text>{{ !item.endContent.icon ? item.endContent : item.endContent.content }}
        </text
        >
        <u-icon v-if="item.endContent.icon" :name="item.endContent.icon"
        />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'info-list',
    emits: ['itemEndClick'],
    props: {
      list: {
        type: Array,
        default: () => []
      },
      mode: {
        type: String,
        default: 'margin' // optional column-space-between
      },
      rootClass: {
        type:  String,
        default: ''
      }
    },
    computed: {
      listCls() {
        const clsMap = {
          margin: 'aa-info-list' + ' ' + this.rootClass,
          columnSpaceBetween: 'aa-info-list column-space-between'  + ' ' + this.rootClass
        }
        return clsMap[this.mode]
      },
      itemCls(){
        const clsMap = {
          margin: 'aa-info-item mb-20',
          columnSpaceBetween: 'aa-info-item'
        }
        return clsMap[this.mode]
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-info-list {
  }
  .column-space-between {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .aa-info-item {
    display: flex;
    align-items: center;
    
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
</style>
