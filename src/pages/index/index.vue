<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import {
  getHomeBannerAPI,
  getHomeCategoryAPI,
  getHomeHotAPI,
  getHomeGuessLikeAPI,
} from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/components/components'

const BannerList = ref<BannerItem[]>([])
const CategoryList = ref<CategoryItem[]>([])
const HotList = ref<HotItem[]>([])
const guessRef = ref<XtxGuessInstance>()

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

//滚动触底
const onScrolltolower = () => {
  console.log('滚动触底了')
  guessRef.value.getMore()
}

onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  geHomeHotData()
})
</script>

<template>
  <CustomNavbar />
  <scroll-view @scrolltolower="onScrolltolower" class="scroll-view" scroll-y>
    <XtxSwiper :list="BannerList" />
    <CategoryPanel :list="CategoryList" />
    <HotPanel :list="HotList" />
    <XtxGuess ref="guessRef" :list="GuesslLikeList" />
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
