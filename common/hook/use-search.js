import { reactive, ref, watch } from 'vue'
import useLoadMore from '@/common/hook/useLoadMore'

export default function useSearch(fetch, dependencies = [], queryRefreshCallback) {
  const query = ref('')
  const {
    loadResult,
    loadStatus,
    noData,
    params,
    refresh,
    refreshFactory,
    loadMore,
    setFetch
  } = useLoadMore(fetch)
  watch(query, newVal => {
    params.query = newVal
    uni.$u.debounce(() => refresh(queryRefreshCallback))
  })
  watch(dependencies, () => uni.$u.debounce(refresh))

  async function setParamsAndRefresh(key, value, callback) {
    params[key] = value
    await refresh(callback)
  }

  function setParamsAndRefreshFactory(callback) {
    return (key, value, _callback) => setParamsAndRefresh(key, value, _callback || callback)
  }

  async function resetParamsAndRefresh(callback) {
    for (const paramsKey in params) {
      params[paramsKey] = undefined
    }
    await refresh(callback)
  }

  function resetParamsAndRefreshFactory(callback) {
    return _callback => resetParamsAndRefresh(_callback || callback)
  }

  return {
    query,
    loadStatus,
    noData,
    searchResult: loadResult,
    refresh,
    refreshFactory,
    loadMore,
    setFetch,
    setParamsAndRefresh,
    resetParamsAndRefresh,
    setParamsAndRefreshFactory,
    resetParamsAndRefreshFactory
  }
}
