<script>
  import { refreshLocation } from '@/stores/location'

  export default {
    onLaunch: function () {
      console.log('App Launch')
      setTimeout(() => {
        refreshLocation()
      }, 0)
    },
    onShow: function () {
      console.log('App Show')
    },
    onHide: function () {
      console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  @import 'static/iconfont.css';
  @import './uni_modules/vk-uview-ui/index.scss';
  @import 'common/style/base.scss';
</style>