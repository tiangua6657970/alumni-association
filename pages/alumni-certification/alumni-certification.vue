<script setup>
  import { computed, reactive, ref } from 'vue'
  import { onReady } from '@dcloudio/uni-app'
  import { navigateToAlumniList } from '@/common/navigates'
  import { selectedAlumniList } from '@/stores/certification'
  import { getFormRules } from '@/common/utils'

  const formRef = ref()
  const marginTop = ref(0)
  const form = reactive({
    phone: '',
    id: '',
    idCardCopy: '',
    certificationAlumni: []
  })
  const placeholder = computed(() => {
    const length = selectedAlumniList.length
    if (length === 0) return '请选择三位认识的校友进行辅助认证'
    if (length === 1) return '还缺2位认识的校友进行验证'
    if (length === 2) return '还缺1位认识的校友进行验证'
    if (length === 3) return '已选择3位认识的校友进行验证'
  })
  const { rules } = getFormRules(form, ['name', 'id', 'idCardCopy'])
  rules.certificationAlumni = [
    {
      required: true,
      validator: (rule, value, callback) => {
        return selectedAlumniList.length === 3
      },
      message: '请选择认识的校友进行认证',
      trigger: ['change', 'blur']
    }
  ]
  onReady(() => {
    formRef.value.setRules(rules)
  })
  function save() {
    formRef.value.validate(valid => {
      if (valid) {
      }
      console.log(form, 'form')
    })
  }
</script>
<template>
  <view class="alumni-certification">
    <aa-top-background navbar-title="校友认证" @updateRenderHeight="marginTop = $event">
      <aa-top-background__msg></aa-top-background__msg>
    </aa-top-background>
    <view class="aa-container container aa-fix-fixed-bottom-btn" :style="{ marginTop: marginTop + 'px' }">
      <u-form :model="form" ref="formRef">
        <u-form-item label-width="auto" label="姓名" prop="name">
          <u-input v-model="form.name" clearable placeholder="请输入姓名" />
        </u-form-item>
        <u-form-item label-width="auto" label="身份证号" prop="id">
          <u-input v-model="form.id" clearable placeholder="请输入身份证号" />
        </u-form-item>
        <u-form-item label="请上传身份证附件" label-position="top" prop="idCardCopy">
          <aa-upload-single-image />
        </u-form-item>
        <u-form-item
          label-width="auto"
          label="校友认证"
          prop="certificationAlumni"
          right-icon="arrow-right"
          @click="navigateToAlumniList"
        >
          <u-input
            v-model="form.phone"
            disabled
            clearable
            :placeholder="placeholder"
            @click="navigateToAlumniList"
          />
        </u-form-item>
      </u-form>
      <aa-selected-alumni-list class="mt-30" :list="selectedAlumniList" />
    </view>
    <aa-fixed-bottom-primary-btn @click="save">提交</aa-fixed-bottom-primary-btn>
  </view>
</template>
<style lang="scss" scoped>
  .container {
    margin-top: 212rpx;
    background-color: #fff;
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>