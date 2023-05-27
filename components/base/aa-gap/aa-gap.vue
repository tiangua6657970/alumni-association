<template>
  <u-gap :height="height" :bg-color="bgColor"></u-gap>
</template>

<script>
  export default {
    name: 'aa-gap',
    props: {
      height: {
        type: Number,
        default: 40,
      },
      bgColor: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-gap {
  }
</style>