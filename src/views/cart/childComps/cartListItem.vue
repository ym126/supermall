<template>
    <div class="list-item">
        <div class="item-button">
            <checkbutton :is-active="cartListItem.isActive" @click.native="checkClick"/>
        </div>
        <div class="item-image">
            <img :src="cartListItem.image" alt="商品属性">
        </div>
        <div class="item-info">
            <div class="title">{{cartListItem.title}}</div>
            <div class="desc">{{cartListItem.desc}}</div>
            <div class="price-count">
                <span>￥{{cartListItem.Price}}</span>
                <span>x{{cartListItem.count}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import Checkbutton from "./checkbutton";
  export default {
    name: "cartListItem",
    components: {Checkbutton, Scroll},
    props:{
      cartListItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      checkClick(){
        this.cartListItem.isActive = !this.cartListItem.isActive
      }
    }
  }
</script>

<style scoped>
    .list-item{
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid rgba(100,100,100,.2);
    }
    .item-button{
        padding: 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .item-image img{
        width: 80px;
        height: 100px;
        border-radius: 10%;
    }
    .item-info{
        padding:0 10px ;
    }
    .title,.desc{
        width: 200px;
        font-size: 16px;
        white-space:nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .desc{
        font-size:12px;
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .price-count{
        display: flex;
        justify-content: space-between;
    }
    .price-count span{
        font-size: 20px;
    }
    .price-count span:nth-child(1){
        color: orangered;
    }
</style>