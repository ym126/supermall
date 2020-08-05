<template>
    <div id="detail">
        <DetailNavBar/>
        <scroll class="content" ref="scroll">
            <DetailSwipe :topImages="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="goodsImage"/>
            <DetailParamsInfo :paramsInfo="paramsInfo"/>
        </scroll>
    </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwipe from "./childComps/DetailSwipe";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import Scroll from "components/common/scroll/Scroll";

  import {getDetailData,Goods,Shop,GoodsParam} from 'network/detail';



  export default {
    name: "Detail",
    components: {DetailParamsInfo,DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwipe, DetailNavBar},
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramsInfo:{}
      }
    },
    created() {
      //接收传入的ID
      this.iid = this.$route.params.iid;
      getDetailData(this.iid).then(res =>{
        //获取轮播图数据
        this.topImages = res.result.itemInfo.topImages;
        // console.log(res.result.itemInfo.topImages)
        // console.log(res.result)
        //获取商品基本信息
        this.goods = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
        //获取商品店铺信息
        this.shop = new Shop(res.result.shopInfo)
        //获取商品详情信息
        this.detailInfo = res.result.detailInfo;
        //获取商品的参数
        this.paramsInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)
      })
    },
    methods:{
      goodsImage(){
        //这个是防止图片一次加载完毕，让减轻服务器负载
        this.debounce(this.$refs.scroll.scrollRefresh,500)();
      },
      //防抖函数
      debounce(func,delay){
        let timer = null;
        return function (...args) {
            if(timer) clearTimeout(timer)
          timer = setTimeout(()=>{
            func.apply(this,args);
          },delay)
        }
      }
    }


  }
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .content{
        height: calc(100% - 44px);
        overflow: hidden;
    }
</style>