import type { LoginResult } from "@/types/member"
import { http } from "@/utils/https"


type LoginParams = {
    code: string,
    encryptedData: string,
    iv: string
}

// 小程序登录
export const postLoginWxMinAPI = (data: LoginParams) => {
    return http<LoginResult>({
        method: "POST",
        url: '/login/wxMin',
        data
    })
}

//小程序模拟登录
export const postLoginWxMinSimpleAPI = (phoneNumber: string)=>{
    return http<LoginResult>({
        method:"POST",
        url:'/login/wxMin/simple',
        data:{
            phoneNumber
        }
    })
}