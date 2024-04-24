<template>
  <div class="home" ref="homeRef">
    <!-- <h2>home</h2> -->
    <home-nav-bar></home-nav-bar>

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    
    <home-search-box></home-search-box>

    <home-categories />

    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="'09.19'" :end-date="'09.20'" />
    </div>

    <home-content />

    <button @click="loadMoreData">load 跟多数据</button>

  </div>
</template>

<script setup>

import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import useHomeStore from '@/stores/modules/home';
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from "./cpns/home-content.vue"
import useScroll from '@/hooks/useScroll';
import searchBar from '@/components/search-bar/search-bar.vue';

// 发送网络请求
// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()

const loadMoreData = () => {
  // console.log("111111111111")
  homeStore.fetchHouseListData()
  // console.log("load跟多的数据，现在页码是：", currentPage)
  // currentPage++;
  // homeStore.fetchHouseListData(currentPage)
}



// 监听窗口滚动
// 离开之后应该移除监听，
// 别的页面也可以监听
// const scrollListenerHandler = ()=>{
//     const clientH = document.documentElement.clientHeight
//     const scrollT = document.documentElement.scrollTop
//     const scrollH = document.documentElement.scrollHeight
//     console.log("1:",clientH,"2:",scrollT,"sum:",(clientH+scrollT),"3:",scrollH)
//     if(clientH+scrollT>=scrollH){
//         console.log("到头了，load！！")
//         homeStore.fetchHouseListData()
//     }
// }

// onMounted(()=>{
//     window.addEventListener("scroll",scrollListenerHandler)
// })
// onUnmounted(()=>{
//     window.removeEventListener("scroll",scrollListenerHandler)

// })


// 回调函数FN传入，自动执行获取网络houselistData数据获取
// useScroll(()=>{
//     homeStore.fetchHouseListData()
// })


const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)

watch(isReachBottom, (newValue) => {
  if (newValue) {
    // console.log("监听到了新值：", newValue);
    homeStore.fetchHouseListData()

    isReachBottom.value = false;
    // homeStore.fetchHouseListData()
  }
})


const isShowSearchBar = computed(() => {
  // value是响应式数据！要注意
  return scrollTop.value >= 100
})





</script>

<style lang="less" scoped>
.home {

  height:100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;

  
}

.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;

}
</style>
