<script setup>
  import { reactive, ref, watch } from 'vue'
  import { onReady } from '@dcloudio/uni-app'
  import { getFormRules } from '@/common/utils'
  import { navigateToAlumniAssociationList } from '@/common/navigates'
  import { selectedAlumniAssociation } from '@/stores/certification'

  const formRef = ref()
  const scaleSelectorShow = ref(false)
  const addressSelectorShow = ref(false)
  const industrySelectorShow = ref(false)
  const alumniAssociationSelectorShow = ref(false)
  const form = reactive({
    name: '',
    cover: '',
    enterpriseScale: '',
    industry: '',
    phone: '',
    address: '',
    addressLine: '',
    alumniAssociation: '',
    legalRepresentative: '',
    paragraph: '',
    businessLicense: '',
    placeholderAddress: '',
    placeholderIndustry: '',
    placeholderAlumniAssociation: ''
  })
  const { rules: commonRules } = getFormRules(form, ['name', 'phone'])
  const rules = {
    name: commonRules.name,
    enterpriseScale: [
      {
        required: true,
        message: '请选择企业规模',
        trigger: ['blur']
      }
    ],
    placeholderIndustry: [
      {
        required: true,
        message: '请选择行业',
        trigger: ['blur']
      }
    ],
    phone: commonRules.phone,
    placeholderAddress: [
      {
        required: true,
        message: '请选择地址',
        trigger: ['blur']
      }
    ],
    placeholderAlumniAssociation: [
      {
        required: true,
        message: '请选择校友会',
        trigger: ['blur']
      }
    ],
    legalRepresentative: [
      {
        required: true,
        message: '请输入企业负责人',
        trigger: ['blur']
      }
    ],
    paragraph: [
      {
        required: true,
        message: '请输入企业简介',
        trigger: ['blur']
      }
    ],
    cover: [
      {
        required: true,
        message: '请上传企业logo',
        trigger: ['blur']
      }
    ],
    businessLicense: [
      {
        required: true,
        message: '请上传企业法人登记证/营业执照',
        trigger: ['blur']
      }
    ]
  }
  const industryTree = [
    {
      value: 'technology',
      label: '技术行业',
      children: [
        {
          value: 'internet',
          label: '互联网技术',
          children: [
            { value: 'backend', label: '后端开发' },
            { value: 'mobile', label: '移动开发' },
            { value: 'frontend', label: '前端开发' }
          ]
        },
        {
          value: 'game',
          label: '游戏开发',
          children: [
            { value: 'client', label: '客户端开发' },
            { value: 'server', label: '服务器开发' },
            { value: 'operation', label: '运营推广' }
          ]
        },
        {
          value: 'ai',
          label: '人工智能技术',
          children: [
            { value: 'dl', label: '深度学习' },
            { value: 'ml', label: '机器学习' },
            { value: 'nlp', label: '自然语言处理' }
          ]
        }
      ]
    },
    {
      value: 'finance',
      label: '金融服务行业',
      children: [
        {
          value: 'bank',
          label: '银行',
          children: [
            { value: 'personal', label: '个人银行业务' },
            { value: 'corporate', label: '公司银行业务' }
          ]
        },
        {
          value: 'securities',
          label: '证券',
          children: [
            { value: 'stock', label: '股票市场' },
            { value: 'bond', label: '债券市场' }
          ]
        },
        {
          value: 'insurance',
          label: '保险',
          children: [
            { value: 'life', label: '人寿保险' },
            { value: 'p&c', label: '财产保险' }
          ]
        }
      ]
    },
    {
      value: 'catering',
      label: '餐饮服务行业',
      children: [
        {
          value: 'chinese',
          label: '中餐',
          children: [
            { value: 'sichuan', label: '川菜' },
            { value: 'shandong', label: '鲁菜' }
          ]
        },
        {
          value: 'western',
          label: '西餐',
          children: [
            { value: 'italian', label: '意大利菜' },
            { value: 'french', label: '法国菜' }
          ]
        },
        {
          value: 'fast-food',
          label: '快餐',
          children: [
            { value: 'hamburger', label: '汉堡' },
            { value: 'sandwich', label: '三明治' }
          ]
        }
      ]
    }
  ]
  const scaleList = [
    {
      value: '1 - 10 人',
      label: '1 - 10 人'
    },
    {
      value: '10 - 50 人',
      label: '10 - 50 人'
    },
    {
      value: '50 - 300 人',
      label: '50 - 300 人'
    },
    {
      value: '300 - 1000 人',
      label: '300 - 1000 人'
    },
    {
      value: '1000 人 以上',
      label: '1000 人 以上'
    }
  ]

  watch(selectedAlumniAssociation, newVal => (form.placeholderAlumniAssociation = newVal.name))
  onReady(() => {
    formRef.value.setRules(rules)
  })

  function handlePosition() {}

  function handleIndustrySelectionConfirm(result) {
    form.placeholderIndustry = result.map(item => item.label).join('-')
    // const index1 = industryTree.findIndex(item => item.value === result[0].value)
    // const index2 = industryTree[index1].children.findIndex(item => item.value === result[1].value)
    // const index3 = industryTree[index1].children[index2].children.findIndex(item => item.value === result[2].value)
    // industrySelectorDefaultIndexList.value = [index1, index2, index3]
  }

  function handleAddressSelectionConfirm(result) {
    form.placeholderAddress = `${result.province.name}-${result.city.name}-${result.area.name}`
  }

  function scaleSelectionConfirm(result) {
    form.enterpriseScale = result[0].label
  }

  function save() {
    formRef.value.validate(valid => {
      if (valid) {
      }
      console.log(form, 'form')
    })
  }
</script>
<template>
  <view class="alumni-enterprise-certification">
    <u-form :model="form" ref="formRef">
      <view class="aa-container bg-white mb-20">
        <u-form-item label-width="auto" label="企业名称：" prop="name">
          <u-input v-model="form.name" clearable placeholder="请输入企业名称" />
        </u-form-item>
        <u-form-item label-width="auto" label="企业规模：" prop="enterpriseScale">
          <u-input
            v-model="form.enterpriseScale"
            :select-open="scaleSelectorShow"
            type="select"
            clearable
            placeholder="请选择企业规模"
            @click="scaleSelectorShow = true"
          />
        </u-form-item>
        <u-form-item label-width="auto" label="行业：" prop="placeholderIndustry">
          <u-input
            :model-value="form.placeholderIndustry"
            :select-open="industrySelectorShow"
            type="select"
            clearable
            placeholder="请选择行业"
            @click="industrySelectorShow = true"
          />
        </u-form-item>
        <u-form-item label-width="auto" label="联系电话：" prop="phone">
          <u-input v-model="form.phone" clearable placeholder="请输入联系电话" />
        </u-form-item>
        <u-form-item label-width="auto" label="地址：" prop="placeholderAddress">
          <template #right>
            <u-icon name="map" label="定位" color="#1B80C4" label-color="#1B80C4" @click="handlePosition" />
          </template>
          <u-input
            v-model="form.placeholderAddress"
            :select-open="addressSelectorShow"
            type="select"
            clearable
            placeholder="请选择地址"
            @click="addressSelectorShow = true"
          />
        </u-form-item>
        <u-form-item
          label-width="auto"
          right-icon="arrow-right"
          label="校友会："
          prop="placeholderAlumniAssociation"
          @click="navigateToAlumniAssociationList"
        >
          <u-input
            :model-value="form.placeholderAlumniAssociation"
            clearable
            disabled
            placeholder="请选择校友会"
          />
        </u-form-item>
        <u-form-item label-width="auto" label="企业负责人：" prop="legalRepresentative">
          <u-input v-model="form.legalRepresentative" clearable placeholder="请输入企业负责人" />
        </u-form-item>
      </view>
      <view class="aa-container bg-white mb-20">
        <view class="aa-font-title mb-30">企业简介</view>
        <u-form-item class="p-0" :label-width="0" :border-bottom="false" prop="paragraph">
          <aa-textarea style="width: 100%" v-model="form.paragraph" placeholder="请输入你的企业简介" />
        </u-form-item>
      </view>
      <view class="aa-container bg-white mb-20">
        <view class="aa-font-title mb-30">企业logo</view>
        <u-form-item class="p-0" :label-width="0" :border-bottom="false" prop="cover">
          <aa-upload-single-image />
        </u-form-item>
      </view>
      <view class="aa-container bg-white mb-20">
        <view class="aa-font-title mb-30">企业法人登记证/营业执照</view>
        <u-form-item
          class="p-0"
          :label-width="0"
          :border-bottom="false"
          prop="businessLicense"
        >
          <aa-upload-single-image class="" />
        </u-form-item>
        <view class="aa-fix-fixed-bottom-btn"></view>
      </view>
    </u-form>
    <u-picker v-model="addressSelectorShow" mode="region" @confirm="handleAddressSelectionConfirm"></u-picker>
    <u-select
      v-model="industrySelectorShow"
      :list="industryTree"
      mode="mutil-column-auto"
      @confirm="handleIndustrySelectionConfirm"
    ></u-select>
    <u-select v-model="scaleSelectorShow" :list="scaleList" @confirm="scaleSelectionConfirm"></u-select>
    <aa-fixed-bottom-primary-btn @click="save">提交</aa-fixed-bottom-primary-btn>
  </view>
</template>

<style scoped lang="scss">
  .p-0 {
    padding: 0;
  }
  .w-100 {
    width: 100%;
  }

  .alumni-enterprise-certification {
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>