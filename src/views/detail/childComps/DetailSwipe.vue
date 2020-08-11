<template>
    <van-swipe :autoplay="3000" :height="300">
        <van-swipe-item v-for="(item,index) in topImages" :key="index">
            <img :src="item" alt="">
        </van-swipe-item>
    </van-swipe>
</template>

<script>
  //这里使用vant组件库的
  // import Vue from 'vue'
  // import {Lazyload, Swipe, SwipeItem} from 'vant'
  //
  // Vue.use(Swipe);
  // Vue.use(SwipeItem);
  // Vue.use(Lazyload);
  export default {
    name: "DetailSwipe",
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
    img{
        width: 100%;
        height: 100%;
    }
</style>