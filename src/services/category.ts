import { http } from "@/utils/https"

export const getCategoryTopAPI = () => {
    return http({
        method:"GET",
        url:'/category/top'
    })
}