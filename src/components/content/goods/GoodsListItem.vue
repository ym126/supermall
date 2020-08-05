<template>
    <div class="GoodsListItem" @click="itemClick">
        <img :src="goodsItem.show.img" @load="imgLoad">
        <div class="GoodsListInfo">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      imgLoad(){
        this.$bus.$emit('itemImgLoad')
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)

      }
    }

  }
</script>

<style scoped>
    .GoodsListItem{
        padding-bottom: 38px;
        width: 48%;
        font-size: 14px;
    }
    .GoodsListItem img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
    .GoodsListInfo{
        text-align: center;
    }
    .GoodsListItem p{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .price{
        width: 45px;
        color: var(--color-high-text);
        margin-right: 20px;
    }
    .collect{
        position: relative;
    }
    .collect::before{
        position: absolute;
        width: 14px;
        height: 14px;
        left: -14px;
        bottom: 1px;
        content: '';
        background: url("~assets/img/common/collect.svg")  0 0/14px 14px;

    }
</style>