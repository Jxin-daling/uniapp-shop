<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import HotPanel from './components/HotPanel.vue'
import {
  getHomeBannerAPI,
  getHomeCategoryAPI,
  getHomeHotAPI,
  getHomeGuessLikeAPI,
} from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/components/components'
import {useGuessList} from '@/composables/index'

const BannerList = ref<BannerItem[]>([])
const CategoryList = ref<CategoryItem[]>([])
const HotList = ref<HotItem[]>([])

//是否触发下拉刷新
const isTrggered = ref(false)

//加载中
const isLoading = ref(true)

//获取轮播图数据
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  BannerList.value = res.result
}

//获取分类数据
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  CategoryList.value = res.result
}

//获取热门数据
const geHomeHotData = async () => {
  const res = await getHomeHotAPI()
  HotList.value = res.result
}

const { guessRef, onScrolltolower } = useGuessList()


//自定义下拉刷新被触发
const onRefresherRefresh = async () => {
  //开启下拉动画
  isTrggered.value = true
  isLoading.value = true
  //重置猜你喜欢组件数据
  guessRef.value.resetData()
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), geHomeHotData()])
  guessRef.value.getMore()
  //关闭下拉动画
  isTrggered.value = false
  isLoading.value = false
}
onLoad(async () => {
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), geHomeHotData()])
  isLoading.value = false
})
</script>

<template>
  <CustomNavbar />
  <scroll-view
    refresher-enabled
    :refresher-triggered="isTrggered"
    @refresherrefresh="onRefresherRefresh"
    @scrolltolower="onScrolltolower"
    class="scroll-view"
    scroll-y
  >
    <PageSkeleton v-if="isLoading" />

    <template v-else>
      <XtxSwiper :list="BannerList" />
      <CategoryPanel :list="CategoryList" />
      <HotPanel :list="HotList" />
      <XtxGuess ref="guessRef" :list="GuesslLikeList" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;

  .scroll-view {
    flex: 1;
  }
}
</style>
