import { get } from '@/service/base'
import { reactive, ref } from 'vue'
import useSearch from '@/common/hook/use-search'
import useShoppingCart from '@/stores/shopping-cart'
import { paths } from '@/service/path-map'

export const getProductList = params => get(paths.productList, params)
export const getProductDetail = params => get(paths.productDetail, params)
export const getProductReviewList = params => get(paths.productReviewList, params)

const mode = {
  productName: '',
  productPrice: 0,
  productSales: 0,
  productStock: 0,
  paragraph: '',
  id: '',
  productCover: ''
}

export function useSearchProductList(queryRefreshCallback) {
  const shoppingCart = useShoppingCart()
  function randomNum() {
    const min = 200
    const max = 500
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  async function _getProductList(arg = {}) {
    const { data } = await getProductList({ ...arg })
    return data.map(item => {
      return {
        image: `https://dummyimage.com/${randomNum()}x${randomNum()}`, // item.productCover
        title: item.productName,
        desc: `￥${item.productPrice}`,
        isAddedToCart: shoppingCart.isInCart(item),
        count: 0,
        selected: true,
        ...item
      }
    })
  }

  const {
    refresh,
    refreshFactory,
    searchResult,
    loadMore,
    query,
    noData,
    loadStatus,
    setParamsAndRefresh,
    resetParamsAndRefresh,
    setParamsAndRefreshFactory,
    resetParamsAndRefreshFactory,
  } = useSearch(_getProductList,[], queryRefreshCallback)

  return {
    refresh,
    refreshFactory,
    searchResult,
    query,
    loadStatus,
    noData,
    loadMore,
    setParamsAndRefresh,
    resetParamsAndRefresh,
    setParamsAndRefreshFactory,
    resetParamsAndRefreshFactory,
  }
}

export function useProductDetail() {
  const productDetail = reactive(mode)
  const shoppingCart = useShoppingCart()

  async function _getProductDetail() {
    const { data } = await getProductDetail()
    return { isAddedToCart: shoppingCart.isInCart(data.id), count: 0, selected: true, ...data }
  }

  async function refresh() {
    const res = await _getProductDetail()
    for (const modeKey in mode) {
      productDetail[modeKey] = res[modeKey]
    }
    productDetail.isAddedToCart = res.isAddedToCart
    productDetail.count = res.count
    productDetail.selected = res.selected
  }

  return { productDetail, refresh }
}

export function useProductReviewList() {
  const productReviewList = ref([])

  async function _getProductReviewList() {
    const { data } = await getProductReviewList()
    return data
  }

  async function refresh() {
    productReviewList.value = await _getProductReviewList()
  }

  return {
    productReviewList,
    refresh
  }
}
