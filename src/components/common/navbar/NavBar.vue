<template>
    <div class="navBar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
    .navBar{
        display: flex;
        height: 44px;
        line-height: 44px;
        box-shadow: 0 1px 1px rgba(100,100,100,.2);
        text-align: center;
    }
    .center{
        flex: 1;
    }
    .left,.right{
        width: 60px;

    }
</style>