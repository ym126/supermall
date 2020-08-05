<template>
    <div class="tab-control">
        <div v-for="(item,index) in titleArr" class="tab-control-item" :class="{active:index === mindex}" @click="titleClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "TabControl",
    data(){
        return {
          mindex:0
        }
    },
    props:{
      titleArr:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      titleClick(index){
        this.mindex = index
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
    .tab-control{
        display: flex;
        text-align: center;
        height: 44px;
        line-height: 44px;
        font-size: 15px;
        background-color: #fff;
    }
    .tab-control-item{
        flex: 1;
    }
    .tab-control-item span{
        padding-bottom: 5px;
    }
    .active{
        color: var(--color-high-text);
    }
    .active span{
        border-bottom: 3px solid var(--color-tint);
    }
</style>