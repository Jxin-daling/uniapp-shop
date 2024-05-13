import type { AddressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore('adress', () => {
  const selectedAddress = ref<AddressItem>()
  const changeSelectedAddress = (val: AddressItem) => {
    selectedAddress.value = val
  }
  return {
    selectedAddress,
    changeSelectedAddress,
  }
})
