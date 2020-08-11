<template>
    <div class="category">
        <nav-bar class="nav">
            <div slot="center">商品分类</div>
        </nav-bar>
        <div class="flex-context">
            <scroll class="sb-context" :probe-type="3">
                <van-sidebar v-model="activeKey" @change="onChange">
                    <van-sidebar-item v-for="(item,index) in categoryList" :key="index" :title="item.title"/>
                </van-sidebar>
            </scroll>

            <scroll class="sl-context" ref="scroll" :probe-type="3">
                <van-grid column-num="3" icon-size="50px" :border="false" >
                    <van-grid-item :url="item.link" :icon="item.image" :text="item.title" v-for="(item,index) in SubcategoryList"  :key="index"/>
                </van-grid>
               <tab-control :titleArr="['综合','新品','销量']" @tabClick="tabClick"/>
                <goods-list :goodsList="goods[currentType]" class="cg-goods"/>
            </scroll>
        </div>






    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import {debounce} from "common/utils"
  import {getCategory,getSubcategory,getSubcategoryDetail} from 'network/category'


  export default {
    name: "Category",
    data(){
      return {
        activeKey:0,
        categoryList:[],
        SubcategoryList:[],
        subcategoryDetailList:[],
        goods:{
          'pop':[],
          'sell':[],
          'new':[]
        },
        currentType:'pop'
      }
    },
    components: {GoodsList, TabControl, Scroll, NavBar},
    created() {

      this.getCategorys();


    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.scrollRefresh,50);
      this.$bus.$on('categoryItemImgLoad',()=>{
        refresh();
      });
    },
    methods:{
      getCategorys(){
        //获取分类导航列表
        getCategory().then(res =>{
          console.log(res)
          this.categoryList = res.data.category.list;


          this.onChange(0)
        })

      },
      onChange(index){
        // console.log(this.categoryList[index])
        const maitKey = this.categoryList[index].maitKey
        const miniWallkey = this.categoryList[index].miniWallkey
        getSubcategory(maitKey).then(res =>{
          this.SubcategoryList = res.data.list;

          this._getSubcategoryDetail('pop',miniWallkey);
          this._getSubcategoryDetail('new',miniWallkey);
          this._getSubcategoryDetail('sell',miniWallkey);
        })
      },
      _getSubcategoryDetail(type,miniWallkey){
        getSubcategoryDetail(miniWallkey,type).then(res =>{
          this.goods[type] = res
        })
      },
      tabClick(index){
        switch (index) {
          case 0:this.currentType = 'pop';
                break;
          case 1:this.currentType = 'new';
                break;
          case 2:this.currentType = 'sell';
                break;

        }
      }
    },
  }
</script>

<style scoped>
    .category{
        height: 100vh;
    }
    .nav{
        background-color: var(--color-tint);
        color: #fff;
    }
    .sb-context{
        background-color: #F7F8FA;
    }
    .sl-context{
        background-color: #fff;
        padding-right: 10px;
        width: 80%;
    }
    .flex-context{
        height: calc(100% - 44px - 49px);
        overflow: hidden;
        display: flex;
    }


</style>