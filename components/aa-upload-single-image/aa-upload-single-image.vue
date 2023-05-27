<script setup>
  import useUpload from '@/common/hook/use-upload'
  import { ref, watch } from 'vue'
  const { uploadRef, uploadConfig, fileList, handleChooseComplete } = useUpload()
  const imageSrc = ref('')
  watch(
    fileList,
    newVal => {
      imageSrc.value = newVal[newVal.length - 1].url
    },
    { deep: true }
  )
  const props = defineProps({ autoUpload: false })
</script>
<template>
  <view class="aa-upload-single-image">
    <u-upload
      ref="uploadRef"
      :action="uploadConfig.action"
      :header="uploadConfig.header"
      :show-upload-list="false"
      :auto-upload="false"
      :custom-btn="!!imageSrc"
      @on-choose-complete="handleChooseComplete"
    >
      <template #addBtn>
        <u-image :src="imageSrc" :width="200" :height="200" v-if="imageSrc"></u-image>
      </template>
    </u-upload>
  </view>
</template>

<style scoped lang="scss">
  .aa-upload-single-image {
  }
</style>
