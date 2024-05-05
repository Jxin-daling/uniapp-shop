<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'

const BannerList = ref<BannerItem[]>([])
const CategoryList = ref<CategoryItem[]>([])
const HotList = ref<HotItem[]>([])

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

onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  geHomeHotData()
})
</script>

<template>
  <CustomNavbar />
  <XtxSwiper :list="BannerList" />
  <CategoryPanel :list="CategoryList" />
  <HotPanel :list="HotList" />
  <XtxGuess />
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
