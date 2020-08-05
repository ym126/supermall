<template>
    <div v-if="Object.keys(goods).length !== 0" class="base-info">
        <div class="info-title">{{goods.title}}</div>
        <div class="info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
        </div>
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <div class="info-service">
            <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
                <img :src="goods.services[index-1].icon" alt="">
                <span>{{goods.services[index-1].name}}</span>
            </span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      }
    },
  }
</script>

<style scoped>
    .base-info{
        margin-top: 10px;
        padding: 0 8px;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-title{
        font-size: 14px;
    }
    .info-price {
        padding: 10px 0;
    }
    .info-price .n-price{
        font-size: 20px;
        color: var(--color-high-text);
    }
    .info-price .o-price{
        font-size: 11px;
        text-decoration:line-through ;
        padding: 0 3px;
    }
    .info-price .discount{
        padding: 2px 5px;
        background-color: var(--color-tint);
        color: #fff;
        border-radius: 30px;
        font-size: 12px;

        /*让元素上浮一些: 使用相对定位即可*/
        position: relative;
        top: -8px;
    }
    .info-other{
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        border-bottom:1px solid rgba(100,100,100,.1) ;
    }
    .info-service{
        display: flex;
        justify-content: space-between;
        line-height: 60px;
    }
    .info-service-item img{
        width: 14px;
        height: 14px;
        position: relative;
        top: 2px;
    }
    .info-service-item span {
        font-size: 13px;
        color: #333;
    }
</style>