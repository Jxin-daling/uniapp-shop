import { useMemberStore } from "@/stores"

//基础重复地址
const baseurl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

//地址拼接
const httpInterceptor = {
    invoke(option: UniApp.RequestOptions) {
        //排除以https开头的地址
        if (!option.url.startsWith("https")) {
            option.url = baseurl + option.url
        }

        //请求超时处理
        option.timeout = 10000

        //设置请求头标识
        option.header = {
            ...option,
            'source-client': 'miniapp'
        }

        //设置token
        const memberStore = useMemberStore()
        const token = memberStore.profile?.token
        if (token) {
            option.header.Authorization = token
        }
        // console.log(option);
    }
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
    code: string
    msg: string
    result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
    return new Promise<Data<T>>((resolve, reject) => {
        uni.request({
            ...options,
            success(res) {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data as Data<T>)
                } else if (res.statusCode === 401) {
                    //401错误，token过期，调用清理方法
                    const memberStore = useMemberStore()
                    memberStore.clearProfile()
                    uni.navigateTo({ url: '/pages/login/login' })
                    reject(res)
                } else {
                    uni.showToast({
                        icon: "none",
                        title: (res.data as Data<T>).msg || '请求失败'
                    })
                    reject(res)
                }
            },
            //响应失败
            fail(err) {
                //网络错误
                uni.showToast({
                    title: '网络错误',
                    icon: 'none',
                    mask: true
                })
                reject(err)
            }
        })
    })
}