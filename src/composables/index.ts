import { ref } from 'vue'
import type { XtxGuessInstance } from '@/components/components'

//猜你喜欢组合式函数
export const useGuessList = ()=>{
    const guessRef = ref<XtxGuessInstance>()

    //滚动触底事件
    const onScrolltolower = () => {
        guessRef.value?.getMore()
    }

    return{
        guessRef,onScrolltolower
    }
}