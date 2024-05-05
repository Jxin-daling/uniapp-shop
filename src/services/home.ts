import { http } from "@/utils/https"
import type { BannerItem, CategoryItem, HotItem } from "@/types/home"

export const getHomeBannerAPI = (distributionSite = 1) => {
    return http<BannerItem[]>({
        method: "GET",
        url: '/home/banner',
        data: {
            distributionSite
        }
    })
}

//首页分类接口
export const getHomeCategoryAPI = () => {
    return http<CategoryItem[]>({
        method: "GET",
        url: '/home/category/mutli'
    })
}

//首页热门推荐接口
export const getHomeHotAPI = () => {
    return http<HotItem[]>({
        method: "GET",
        url: '/home/hot/mutli'
    })
}

//首页猜你喜欢接口
export const getHomeGuessLikeAPI = (page = 1, pageSize = 10) => {
    return http({
        method: "GET",
        url: '/home/goods/guessLike',
        data: {
            page, pageSize
        }
    })
}