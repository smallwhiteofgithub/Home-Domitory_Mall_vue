import { onMounted, onUnmounted, ref } from "vue"
// import { _throttle_ } from " underscore";
import { throttle } from "underscore";



// export default function useScroll(elRef) {

  // const isReachBottom = ref(false)
  // const clientHeight = ref(0)
  // const scrollTop = ref(0)
  // const scrollHeight = ref(0)

  // #smallCoderWhite1 初始实现版本
  // 防抖节流
  // const scrollListenerHandler = () => {
  //     clientHeight.value = document.documentElement.clientHeight
  //     scrollTop.value = document.documentElement.scrollTop
  //     scrollHeight.value = document.documentElement.scrollHeight
  //     // console.log("1:", clientH, "2:", scrollT, "sum:", (clientH + scrollT), "3:", scrollH)
  //     if (clientHeight + scrollTop >= scrollHeight) {
  //         // console.log("到头了，load！！")
  //         // homeStore.fetchHouseListData()
  //         // callBackFn()

  //         // 2第二种方案
  //         console.log("到头了，要重新获取数据！第二种方法！")
  //         isReachBottom.value = true;
  //     }
  // }

  // const scrollListenerHandler = throttle(() => {
  //     clientHeight.value = document.documentElement.clientHeight
  //     scrollTop.value = document.documentElement.scrollTop
  //     scrollHeight.value = document.documentElement.scrollHeight
  //     // console.log("1:", clientH, "2:", scrollT, "sum:", (clientH + scrollT), "3:", scrollH)
  //     console.log("监听到滚动了！！")
  //     if (clientHeight.value+ scrollTop.value >= scrollHeight.value) {
  //         // console.log("到头了，load！！")
  //         // callBackFn()

  //         // 2第二种方案
  //         console.log("滚到到位置地下了，要重新获取数据！第二种方法！")
  //         isReachBottom.value = true;
  //     }
  // },1000)


  // #smallCoderWhite2，
  // 未加入对元素的通用功能前：
  // const scrollListenerHandler = throttle(() => {
  //     clientHeight.value = document.documentElement.clientHeight
  //     scrollTop.value = document.documentElement.scrollTop
  //     scrollHeight.value = document.documentElement.scrollHeight
  //     console.log("1:", clientHeight.value, "2:", scrollTop.value,"sum:",clientHeight.value+scrollTop.value, "----3:", scrollHeight.value)

  //     if (clientHeight.value + scrollTop.value >= scrollHeight.value-1) {
  //       console.log("滚动到底部了")
  //       isReachBottom.value = true
  //     }
  //   }, 10)

  // onMounted(() => {
  //     window.addEventListener("scroll", scrollListenerHandler)
  // })
  // onUnmounted(() => {
  //     window.removeEventListener("scroll", scrollListenerHandler)

  // })



  


//   #smallCoderwhite3 : 
//   加入了对元素的通用监听功能之后，
//   let el = window
//   const scrollListenerHandler = throttle(() => {
//     if (el === window) {
//       clientHeight.value = document.documentElement.clientHeight
//       scrollTop.value = document.documentElement.scrollTop
//       scrollHeight.value = document.documentElement.scrollHeight
//     } else {
//       clientHeight.value = el.clientHeight
//       scrollTop.value = el.scrollTop
//       scrollHeight.value = el.scrollHeight
//     }
//     if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
//       console.log("滚动到底部了")
//       isReachBottom.value = true
//     }
//   }, 50)

//   onMounted(() => {
//     if (elRef) el = elRef.value
//     el.addEventListener("scroll", scrollListenerHandler)
//   })
  
//   onUnmounted(() => {
//     el.removeEventListener("scroll", scrollListenerHandler)
//   })

//   return { isReachBottom, clientHeight, scrollTop, scrollHeight }

// }



export default function useScroll(elRef) {
  let el = window

  const isReachBottom = ref(false)

  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  // 防抖/节流
  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      console.log("滚动到底部了")
      isReachBottom.value = true
    }
  }, 100)
  
  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
  })
  
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}



