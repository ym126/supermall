<template>
    <div class="goodsList">
        <goods-list-item v-for="(item,index) in goodsList" :key="index" :goods-item="item"/>
    </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components: {GoodsListItem},
    props:{
      goodsList:{
        type:Array,
        default(){
          return []
        }
      }
    }

  }
</script>

<style scoped>
    .goodsList{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>