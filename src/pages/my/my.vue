<script setup lang="ts">
import { useMemberStore } from '@/stores/index'
import { http } from '@/utils/https'

const memberStore = useMemberStore()

const testreq = async () => {
  const result = await http<string[]>({
    method: 'GET',
    url: '',
  })
  console.log('请求成功', result)
}
</script> 

<template>
  <view class="my">
    <view v-if="memberStore.profile">会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
          token: '12356',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="testreq" plain size="mini">测试请求</button>
  </view>
</template>

<style lang="scss">
//
</style>
