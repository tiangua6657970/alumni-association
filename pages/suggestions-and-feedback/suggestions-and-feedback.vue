<script setup>
  import { ref, watch } from 'vue'

  const paragraph = ref('')
  function save() {
  }
</script>
<template>
  <view class="suggestions-and-feedback aa-container">
    <aa-textarea v-model="paragraph"/>
    <aa-fixed-bottom-primary-btn @click="save">保存</aa-fixed-bottom-primary-btn>
  </view>
</template>

<style scoped lang="scss">
  .suggestions-and-feedback {
  }
</style>