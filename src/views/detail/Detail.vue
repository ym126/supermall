<template>
    <div id="detail">
        <DetailNavBar @itemClick="itemClick" ref="nav"/>
        <scroll class="content" ref="scroll" :probe-type="3" @probexy="getDetailY">
            <DetailSwipe :topImages="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="goodsImage"/>
            <DetailParamsInfo ref="detailParams" :paramsInfo="paramsInfo"/>
            <detail-comment-info ref="detailComment" :commentInfo="commentInfo"/>
            <goods-list ref="detailGoodsList" :goodsList="recommends"/>
        </scroll>
        <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
        <detail-bottom-bar @addToCart="addToCart"/>
    </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwipe from "./childComps/DetailSwipe";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from "components/content/backtop/BackTop";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";


  import {getDetailData,Goods,Shop,GoodsParam,getRecommend} from 'network/detail';
  import {mapActions} from 'vuex'


  export default {
    name: "Detail",
    components: {BackTop,DetailBottomBar,GoodsList,DetailCommentInfo,DetailParamsInfo,DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwipe, DetailNavBar},
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramsInfo:{},
        commentInfo:{},
        recommends:[],
        itemLoadII:null,
        goOffsetTops:[],
        getThemeTops:null,
        currentNumber:0,
        isShowBackTop:false
      }
    },
    created() {
      //接收传入的ID
      //this.iid = this.$route.params.iid;
      //query接收方法
      this.iid = this.$route.query.iid;
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
        //获取评论信息
        if (res.result.rate.cRate !== 0){
          this.commentInfo = res.result.rate.list[0]
        }
        //这是nextTick由于图片没有计算在内，所以无法获取到正确的高度
        // this.$nextTick(() =>{
        //   this.goOffsetTops = [];
        //   //这里原本有 44的高度 没有去掉所以 在调用的时候减去44
        //   this.goOffsetTops.push(this.$refs.scroll.$el.offsetTop)
        //   this.goOffsetTops.push(this.$refs.detailParams.$el.offsetTop)
        //   this.goOffsetTops.push(this.$refs.detailComment.$el.offsetTop)
        //   this.goOffsetTops.push(this.$refs.detailGoodsList.$el.offsetTop)
        //
        //   console.log(this.goOffsetTops)
        //
        // })
      })
      getRecommend().then(res =>{
        this.recommends = res.data.list
      })
      //利用防抖 等待图片都加载完了就去获取 组件的offsetTop
      this.getThemeTops = this.debounce(() =>{
        this.goOffsetTops = [];
        //这里原本有 44的高度 没有去掉所以 在调用的时候减去44
        this.goOffsetTops.push(this.$refs.scroll.$el.offsetTop - 44)
        this.goOffsetTops.push(this.$refs.detailParams.$el.offsetTop  - 44)
        this.goOffsetTops.push(this.$refs.detailComment.$el.offsetTop  - 44)
        this.goOffsetTops.push(this.$refs.detailGoodsList.$el.offsetTop  - 44)
        this.goOffsetTops.push(Number.MAX_VALUE)

        // console.log(this.goOffsetTops)
      },200)
    },
    mounted() {
      const refresh = this.debounce(this.$refs.scroll.scrollRefresh,50);
      this.$bus.$on('detailItemImgLoad',()=>{
        refresh();
      });
      //写在这里，就不用写在监听的函数里面 创建多个 而是调用多个返回的函数  （防抖图片加载）
      this.itemLoadII = this.debounce(this.$refs.scroll.scrollRefresh,500);

    },
    methods:{
      //ye可以使用mapActions映射
      ...mapActions(['addCart']),
      goodsImage(){
        //这个是防止图片一次加载完毕，让减轻服务器负载
        this.itemLoadII()

        //这里可以调用一次防抖 就可以获取掉offsetTop
        this.getThemeTops()
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
      },
      itemClick(index){
        this.$refs.scroll.scroll.scrollTo(0,-this.goOffsetTops[index],200)
      },
      getDetailY(position){
        let positionY = -position.y;
        for (var i = 0;i<this.goOffsetTops.length - 1;i++){
          if (this.currentNumber !== i && (positionY > this.goOffsetTops[i] && positionY < this.goOffsetTops[i+1])){
            this.currentNumber = i;
            this.$refs.nav.currentIndex = this.currentNumber
          }
        }
        this.isShowBackTop = (-position.y) > 1000
      },
      backTopClick(){
        this.$refs.scroll.scrollBackTop(0,0,500)
      },
      addToCart(){
        const payload = {};

        payload.image = this.topImages[0];
        payload.desc = this.goods.desc;
        payload.title = this.goods.title;
        payload.Price = this.goods.realPrice;
        payload.iid = this.iid;

        this.addCart(payload).then(res =>{
          this.$toast(res);
        })

        // this.$store.commit('addToCart',payload)
        // this.$store.dispatch('addCart',payload).then(res =>{
        //   console.log(res);
        //   Toast(res);
        // })
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
        height: calc(100% - 44px - 58px);
        overflow: hidden;
    }
</style>