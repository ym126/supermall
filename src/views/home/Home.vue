<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">低配版蘑菇街</div>
        </nav-bar>
        <tab-control
                ref="tabControl1"
                :titleArr="['流行','新款','精选']"
                @tabClick="tabClick"
                class="tab-control"
                v-show="isShowTabControl"
        />
        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @probexy="getProXY"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <home-swipe :banners="banners"/>
            <recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control
                    ref="tabControl2"
                    :titleArr="['流行','新款','精选']"
                    @tabClick="tabClick"
            />
            <goods-list :goodsList="goods[currentType].list"/>
        </scroll>
        <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backtop/BackTop";

  import HomeSwipe from "./childComps/HomeSwipe";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMulttidata,getHomeGoods} from 'network/home'


  export default {
    name: "Home",
    components: {BackTop, GoodsList, TabControl, FeatureView, RecommendView, HomeSwipe, NavBar, Scroll},
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'sell':{page:0,list:[]},
          'new':{page:0,list:[]}
        },
        currentType:'pop',
        isShowBackTop:false,
        tabControlTop:0,
        // getoffsetTop:false,
        isShowTabControl:false,
        saveY:0
      }
    },
    created() {
      //这里最好封装一下  不能写太多逻辑
     this.getHomeMulttidata();

     this.getHomeGoods('pop');
     this.getHomeGoods('sell');
     this.getHomeGoods('new');
  },
     mounted() {
      //1.图片加载完成后的事件监听
    const refresh = this.debounce(this.$refs.scroll.scrollRefresh,50);
    this.$bus.$on('homeItemImgLoad',()=>{
        refresh();
    });
    //2.获取tabControl的offsetTop
    //所有组件都有$el:用于获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop);
     },
    updated() {
      //这里可以拿到tabControl的offsetTop我就不用去轮播图子组件获取高度

     //  if (!this.getoffsetTop){
      //   this.$nextTick(()=>{
      //     this.tabControlTop = this.$refs.tabControl2.$el.offsetTop;
      //   })
      //   this.getoffsetTop = true
      //
      // }
        this.$nextTick(()=>{
          this.tabControlTop = this.$refs.tabControl2.$el.offsetTop;
        })

    },
    activated() {
      this.$refs.scroll.scrollBackTop(0,this.saveY,50)
      this.$refs.scroll.scrollRefresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y

    },
    methods:{
      /**
       * 事件监听相关的方法
       */
      //防抖函数
      debounce(func, delay) {
        let timer = null;
        return function (...args) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args);
          }, delay)
        }
      },
      tabClick(index){
          switch (index) {
            case 0: this.currentType = 'pop';
                    break;
            case 1:this.currentType ='new';
                    break;
            case 2:this.currentType = 'sell';
                    break;
          }
          this.$refs.tabControl1.mindex = index;
          this.$refs.tabControl2.mindex = index;
        },
      backTopClick(){
        this.$refs.scroll.scrollBackTop(0,0,500)
      },
      getProXY(position){
        //这里是根据子组件传递过来的XY轴进行判断是否显示回到顶部按钮
        this.isShowBackTop = (-position.y) > 800
        //这是是判断tabcontrol是否吸顶
        this.isShowTabControl = (-position.y) > this.tabControlTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      /**
       * 网络请求相关的方法
       */
        getHomeMulttidata(){
          getHomeMulttidata().then(res =>{
            //这里获取到返回的数据
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
        },
        getHomeGoods(type){
          const page = this.goods[type].page + 1;
          getHomeGoods(type,page).then(res =>{
            this.goods[type].list.push(...res.data.list);
            // this.goods[type].page = page;
            this.goods[type].page += 1;
            //数据加载完毕 调用的方法
            this.$refs.scroll.scroll.finishPullUp();
          })

        }
    }
  }
</script>

<style scoped>
    #home{
        /*padding-top: 44px;*/
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;

        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top:0;*/
        /*z-index: 9;*/
    /*    目前暂时这样写把*/
    }
    /*第二种方法就是利用 子绝父相定位*/
    .content{
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 49px;
        /*这里的加不然nav头部会显示不出来*/
        overflow: hidden;
    }
    /*第一种方法 利用calc函数计算整个页面的高度 滑动部分 = 整体页面的高度 - 头部nav的高度 - 底部nav的高度*/
    /*.content{*/
    /*    height:calc(100% - 93px);*/
    /*    overflow: hidden;*/
    /*    margin-top: 44px;*/
    /*}*/
    .tab-control{
        position: relative;
        z-index: 9;
    }
</style>