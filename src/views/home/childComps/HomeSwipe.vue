<template>
    <van-swipe :autoplay="3000">
        <van-swipe-item  v-for="(item,index) in banners" :key="index">
            <a :href="item.link">
<!--                    图片懒加载的坑，导致初始化swipe指示器不准确-->
<!--                    <img v-lazy="item.image" alt="" width="100%">-->
                <img :src="item.image" alt="">
            </a>
        </van-swipe-item>
    </van-swipe>
</template>

<script>

  //这里使用vant组件库的
  import Vue from 'vue'
  import {Swipe,SwipeItem,Lazyload} from 'vant'

  Vue.use(Swipe);
  Vue.use(SwipeItem);
  Vue.use(Lazyload);

  export default {
    name: "HomeSwipe",
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      },
    },
  }
</script>

<style scoped>
   img{
       width: 100%;
   }
</style>