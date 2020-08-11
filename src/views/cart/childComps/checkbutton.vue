<template>
    <div class="checkbox" :class="{active:isActive}"  @click="allClick">
        <img src="~assets/img/cart/tick.svg"/>
    </div>
</template>

<script>
  export default {
    name: "checkbutton",
    props:{
      isActive:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      allClick(){
        this.$emit('allClick');
      }
    }
  }
</script>

<style scoped>
    .checkbox{
        width: 20px;
        height: 20px;
        border:1px solid rgba(100,100,100,.3);
        background-color: #ffffff;
        border-radius: 50%;
        text-align: center;
    }
    .active{
        border-color:pink ;
        background-color: pink;
    }
</style>