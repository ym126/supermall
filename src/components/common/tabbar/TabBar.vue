<template>
    <div class="tabBar">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
.tabBar{
    display: flex;
    background-color: #f7f7f7;

    font-size: 14px;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0 -1px 1px rgba(100,100,100,.15);
}
</style>