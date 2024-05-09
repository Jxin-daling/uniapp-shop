import { http } from '@/utils/https'
import type { AddressParams, AddressItem } from '@/types/address'

//新建地址
export const postMemberAddressAPI = (data: AddressParams) => {
  return http({
    method: 'POST',
    url: '/member/address',
    data,
  })
}

//获取地址列表
export const getMemberAddressAPI = () => {
  return http<AddressItem>({
    method: 'GET',
    url: '/member/address',
  })
}

//获取地址详情
export const getMemberAddressByIdAPI = (id: string) => {
  return http<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}

//修改地址详情
export const putMemberAddressByIdAPI = (id: string, data: AddressParams) => {
  return http<AddressItem>({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}

//删除地址
export const deleteMemberAddressByIdAPI = (id: string) => {
  return http<AddressItem>({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
