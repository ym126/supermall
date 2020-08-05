<template>
    <div class="tabBarItem" @click="itemClick" >
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="styleColorActive">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
        path:String,
      colorActive:{
        type:String,
        default:'red'
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    },
    computed:{
      isActive(){
        //这里可以用路由来判断但前他是不是再这个home里的活跃路由
        return this.$route.path.includes(this.path)
      },
      styleColorActive(){
        return this.isActive ? {color:this.colorActive}:{}
      }
    }
  }
</script>

<style scoped>
    .tabBarItem{
        flex: 1;
        height: 49px;
        text-align: center;
    }
    .tabBarItem img{
        width: 24px;
        height: 24px;
        margin-top: 3px;
        vertical-align: middle;
    }
</style>