import type { CartItem } from '@/types/cart'
import { http } from '@/utils/https'

//加入购物车
export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}

//获取购物车列表数据
export const getMemberCartAPI = () => {
  return http<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
}

//删除购物车单品
export const deleteMemberCartAPI = (data: { ids: string[] }) => {
  return http<CartItem[]>({
    method: 'DELETE',
    url: '/member/cart',
    data,
  })
}

//修改购物车单品
export const putMemberCartBySkuIdAPI = (
  skuId: string,
  data: { selected?: boolean; count?: number },
) => {
  return http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
}
