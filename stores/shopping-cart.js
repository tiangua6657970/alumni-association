import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'

const useShoppingCart = defineStore('shopping-cart', () => {
  const shoppingCartStore = ref([])
  const oldTotalPrice = ref(0)
  let oldSelect = []
  watch(shoppingCartStore.value, newVal => {
    console.log(newVal, 'newVal')
    if (!allSelected.value) {
      oldSelect = newVal.map(item => item.selected)
    }
  })
  const totalPrice = computed(() => {
    return shoppingCartStore.value
      .filter(item => item.selected)
      .reduce((_totalPrice, currentItem) => {
        return _totalPrice + currentItem.productPrice * currentItem.count
      }, 0)
  })

  watch(totalPrice, (newVal, oldValue) => {
    oldTotalPrice.value  = oldValue
  })
  const totalPriceText = computed(() => {
    return `￥${totalPrice.value}`
  })

  const allSelected = computed({
    get() {
      return shoppingCartStore.value.every(item => item.selected)
    },
    set(selected) {
      if (selected) {
        shoppingCartStore.value.forEach(item => (item.selected = selected))
      } else {
        shoppingCartStore.value.forEach((item, index) => (item.selected = oldSelect[index]))
      }
    }
  })

  function add(payload) {
    if (!payload.isAddedToCart) {
      payload.count++
      shoppingCartStore.value.push(payload)
      payload.isAddedToCart = true
    }
  }

  function remove(payload) {
    if (payload.isAddedToCart) {
      const index = shoppingCartStore.value.findIndex(item => item.id === payload.id)
      if (index !== -1) {
        shoppingCartStore.value.splice(index, 1)
        payload.isAddedToCart = false
      }
    }
  }

  function toggle(payload) {
    if (!payload.isAddedToCart) {
      add(payload)
    } else {
      remove(payload)
    }
  }

  function isInCart(payload) {
    return shoppingCartStore.value.some(item => {
      return item.id === payload.id
    })
  }

  return {
    shoppingCartStore,
    totalPrice,
    oldTotalPrice,
    totalPriceText,
    allSelected,
    add,
    remove,
    toggle,
    isInCart
  }
})
export default useShoppingCart
