<template>
    <div >
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt=""/>
            </div>
            <div slot="center" class="title">
                <div class="title-item"
                     v-for="(item,index) in titles"
                     :class="{active:index === currentIndex}"
                     @click="itemClick(index)">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    data(){
      return {
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index
        this.$emit('itemClick',index)
      },
      backClick(){
        this.$router.back()
      }
    },
    components: {NavBar}
  }
</script>

<style scoped>
   .title{
       display: flex;
   }
    .title-item{
        flex: 1;
        font-size: 13px;
    }
    .active{
        color: var(--color-high-text);
    }
    .back img{
        margin-top: 10px;
    }
</style>