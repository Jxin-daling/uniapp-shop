import type { LoginResult } from '@/types/member'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<LoginResult>()
    const token = ref<any>()

    // 保存会员信息，登录时使用
    const setProfile = (val: LoginResult) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // TODO: 持久化
  {
    //网页端配置
    // persist: true,
    //小程序配置
    persist: {
      storage: {
        setItem(key, item) {
          uni.setStorageSync(key, item)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        }
      }
    }
  },
)
