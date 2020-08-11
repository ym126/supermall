<template>
    <div class="bottom-nav">
        <div class="all-button">
            <checkbutton :is-active="isSelectAll" @allClick="allClick"/>
            <span>全选</span>
        </div>
        <div class="total">
            <span>合计:￥{{totalPrice}}</span>
        </div>
        <div class="jiesuan">
            <span>去结算({{checkLength}})</span>
        </div>
    </div>
</template>

<script>
  import Checkbutton from "./checkbutton";
  export default {
    name: "bottomNav",
    components: {Checkbutton},
    computed:{
        totalPrice(){
          const cartList = this.$store.getters.cartList;
          return cartList.filter(item => {
            return item.isActive
          }).reduce((preValue, item) => {
            return preValue + item.count * item.Price
          }, 0).toFixed(2)
        },
      checkLength(){
          return this.$store.getters.cartList.filter(item => item.isActive).length
      },
      isSelectAll(){
            if (this.$store.getters.cartList.length === 0){
                return false
            }else {
              return !(this.$store.getters.cartList.find(item => !item.isActive))
            }

      }
    },
    methods:{
      allClick(){
        if (this.isSelectAll){
          this.$store.getters.cartList.forEach(item => item.isActive = false)
        }else {
          this.$store.getters.cartList.forEach(item => item.isActive = true)
        }
      }
    }
  }
</script>

<style scoped>
    .bottom-nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 35px;
        background-color: #eeeeee;
        font-size: 15px;
    }
    .all-button{
        margin-left: 5px;
        display: flex;
        align-items: center;
    }
    .all-button span{
        padding-left: 5px;
    }
    .jiesuan{
        padding: 0 10px;
        line-height: 35px;
        height: 100%;
        background-color: red;
        color: #fff;
    }
</style>