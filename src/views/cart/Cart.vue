<template>
    <div class="cart">
<!--        头部nav-->
        <nav-bar class="cart-nav">
            <div slot="center">购物车({{CartListLength}})</div>
        </nav-bar>
<!--        商品列表-->
        <cart-list :cartList="cartList"/>
<!--        底部信息-->
        <bottom-nav/>
    </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/cartList";

  import {mapGetters} from 'vuex'
  import BottomNav from "./childComps/bottomNav";
  export default {
    name: "Cart",
    components: {BottomNav, CartList, NavBar},
    computed:{
      ...mapGetters(['CartListLength','cartList'])
    }
  }
</script>

<style scoped>
    .cart{
        height: 100vh;
    }
    .cart-nav{
        background-color: var(--color-tint);
        color: #fff;
    }
</style>