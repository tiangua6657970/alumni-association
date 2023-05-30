import { reactive, ref, watch } from 'vue'

export default function useLoadMore(fetch) {
  let _fetch = fetch.value ? fetch.value : fetch
  if (fetch.value) {
    watch(fetch,async (newVal) => {
      _fetch = newVal
      await refresh()
    })
  }
  const loadResult = ref([])
  const loadStatus = ref('loadmore') // loadmore | loading | nomore
  const noData = ref(false)
  const params = reactive({ pageNum: 1, pageSize: 10 })

  async function loadMore(callback) {
    if (loadStatus.value === 'nomore') {
      return
    }
    params.pageNum++
    loadStatus.value = 'loading'
    const data = await _fetch(params)
    _setLoadStatus(data.length)
    loadResult.value = loadResult.value.concat(data)
    typeof callback === 'function' && callback()
  }

  async function refresh(callback) {
    params.pageNum = 1
    params.pageSize = 10
    const data = await _fetch(params)
    noData.value = !data.length
    _setLoadStatus(data.length)
    loadResult.value = data
    typeof callback === 'function' && callback()
    return data
  }


  function refreshFactory(callback) {
    return () => refresh(callback)
  }

  function _setLoadStatus(length) {
    if (!length) {
      loadStatus.value = 'nomore'
    } else {
      loadStatus.value = 'loadmore'
    }
  }

  function setFetch(fetch) {
    _fetch = fetch
  }

  return {
    loadStatus,
    noData,
    loadResult,
    params,
    refresh,
    refreshFactory,
    loadMore,
    setFetch
  }
}