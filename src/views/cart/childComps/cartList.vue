<template>
    <div class="cartList">
        <scroll class="content" ref="scroll">
            <cart-list-item v-for="(item,index) in cartList" :key="index" :cartListItem="item"/>
        </scroll>
    </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./cartListItem";

  export default {
    name: "cartList",
    components: {CartListItem, Scroll},
    props:{
      cartList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    activated() {
      this.$refs.scroll.scrollRefresh();
    }
  }
</script>

<style scoped>
    .cartList{
        height: calc(100% - 44px - 49px - 35px);
        overflow: hidden;
    }
    .content{
        height: 100%;
    }
</style>