<script setup>
  import usePersonalCenterStore from '@/stores/personal-center'
  import { computed, reactive, ref, watch } from 'vue'
  import useUpload from '@/common/hook/use-upload'
  const { storeData } = usePersonalCenterStore()
  const  {
    uploadConfig,
    fileList,
    uploadRef,
    upload,
    handleChooseComplete
  } = useUpload()
  const currentState = {}
  for (const storeDataKey in storeData) {
    currentState[storeDataKey] = storeData[storeDataKey]
  }
  const form = reactive(currentState)
  const sexSelectorShow = ref(false)
  const sexSelectorDefaultIndex = ref(0)
  const sexDisplay = computed(() => {
    const sexMap = {
      1: '男',
      2: '女'
    }
    return sexMap[form.sex]
  })
  const sexList = [
    {
      value: 1,
      label: '男'
    },
    {
      value: 2,
      label: '女'
    }
  ]

  function handleSexSelectionConfirm(result) {
    const { value } = result[0]
    sexSelectorDefaultIndex.value = sexList.findIndex(item => item.value === value)
    form.sex = value
  }

  function save() {
    console.log(form, 'form')
    upload()
  }
  watch(fileList,(newVal) => {
    if (newVal.length) {
      form.avatar = newVal[0].url
    }
  })
</script>
<template>
  <div class="edit-profile aa-container">
    <view class="replace-avatar">
      <u-upload
        ref="uploadRef"
        :action="uploadConfig.action"
        :header="uploadConfig.header"
        custom-btn
        :show-upload-list="false"
        :auto-upload="false"
        @on-choose-complete="handleChooseComplete"
      >
        <template #addBtn>
          <view class="upload-avatar">
            <u-avatar class="replace-avatar__avatar" :size="200" :src="form.avatar" />
            <view class="replace-avatar__text">点击更改头像</view>
          </view>
        </template>
      </u-upload>
    </view>
    <u-form class="profile-form" :model="form" ref="formRef">
      <u-form-item label-width="auto" label="姓名：" prop="name">
        <u-input v-model="form.name" maxlength="20" clearable placeholder="请输入姓名" />
      </u-form-item>
      <u-form-item label-width="auto" label="性别：" prop="sex">
        <u-input
          :model-value="sexDisplay"
          type="select"
          maxlength="20"
          clearable
          placeholder="请选择性别"
          @click="sexSelectorShow = true"
        />
      </u-form-item>
      <u-form-item label-width="auto" label="个人简介：" prop="paragraph">
        <u-input v-model="form.paragraph" type="textarea" maxlength="20" clearable placeholder="请输入个人简介" />
      </u-form-item>
      <u-form-item label-width="auto" label="生日：" prop="dateOfBirt">
        <u-input v-model="form.dateOfBirt" maxlength="20" clearable placeholder="请输入生日" />
      </u-form-item>
      <u-form-item label-width="auto" label="籍贯：" prop="nativePlace">
        <u-input v-model="form.nativePlace" maxlength="20" clearable placeholder="请输入籍贯" />
      </u-form-item>
      <u-form-item label-width="auto" label="二维码：" prop="code">
        <u-input v-model="form.code" maxlength="20" clearable placeholder="二维码" />
      </u-form-item>
      <u-form-item label-width="auto" label="地址：" prop="address">
        <u-input v-model="form.address" maxlength="20" clearable placeholder="请输入地址" />
      </u-form-item>
      <u-form-item label-width="auto" label="手机号：" prop="phone">
        <u-input v-model="form.phone" maxlength="20" clearable placeholder="请输入手机号" />
      </u-form-item>
      <u-form-item label-width="auto" label="邮箱地址：" prop="email">
        <u-input v-model="form.email" maxlength="20" clearable placeholder="请输入邮箱地址" />
      </u-form-item>
    </u-form>
    <u-select
      v-model="sexSelectorShow"
      :list="sexList"
      :default-value="[sexSelectorDefaultIndex]"
      @confirm="handleSexSelectionConfirm"
    ></u-select>
    <aa-submit-button @click="save">保存</aa-submit-button>
  </div>
</template>

<style scoped lang="scss">
  .edit-profile {
    .replace-avatar {
      display: flex;
      justify-content: center;
      text-align: center;
    }

    .profile-form {
      margin-top: 60rpx;
    }

   
  }
</style>
