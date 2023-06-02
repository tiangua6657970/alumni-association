<script>
  import { refreshSystemInfo } from '@/stores/system-info'
  import { getCurrentPath } from '@/common/utils'
  import { DEFAULT_SHEAR_IMAGE } from '@/common/constants'
  import { refreshLocation } from '@/stores/location'

  export default {
    onLaunch: function () {
      console.log('App Launch')
      refreshSystemInfo()
      setTimeout(() => {
        refreshLocation()
      }, 0)
    },
    onShow: function () {
      console.log('App Show')
    },
    onHide: function () {
      console.log('App Hide')
    },
    onShareAppMessage() {
      return {
        title: '校友会小程序',
        path: getCurrentPath(),
        imageUrl: DEFAULT_SHEAR_IMAGE,
        desc: '校友会'
      }
    },
    onShareTimeline() {
      return {
        title: '校友会小程序',
        path: getCurrentPath(),
        imageUrl: DEFAULT_SHEAR_IMAGE,
        desc: '校友会'
      }
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  @import 'static/iconfont.css';
  @import './uni_modules/vk-uview-ui/index.scss';
  @import 'common/style/base.scss';
</style>