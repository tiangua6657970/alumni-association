<template>
  <u-field
    class="u-field"
    :label-width="0"
    v-model="paragraph"
    type="textarea"
    clearable
    :placeholder="placeholder"
  />
</template>

<script>
  export default {
    name: 'aa-textarea',
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入您的宝贵意见'
      }
    },
    data() {
      return {
        paragraph: ''
      }
    },
    watch: {
      modelValue(newVal) {
        this.paragraph = newVal
      },
      paragraph(newVal) {
        this.$emit('update:modelValue', newVal)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>