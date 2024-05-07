import type { ProfileDetail } from "@/types/member"
import { http } from "@/utils/https"

export const getMemberprofileAPI =()=>{
    return http<ProfileDetail>({
        method:"GET",
        url:'/member/profile'
    })
}