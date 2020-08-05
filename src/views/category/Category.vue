<template>
    <div class="wrapper">
        <ul class="content">
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
            <li>我是测试内容</li>
        </ul>
    </div>
</template>

<script>
    import BetterScroll from 'better-scroll'
  export default {
    name: "Category",
    mounted() {
      let BT = new BetterScroll('.wrapper',{
        pullUpLoad:true
      })
      BT.on('pullingUp',()=>{
        console.log('----');
        // 发送网络请求, 请求更多页的数据

        // 等数据请求完成, 并且将新的数据展示出来后调用下面函数
        BT.finishPullUp();
      })
      //然后必须再创建对象里面配置一下 probeType
      // BT.on('scroll',(res)=>{
      //   console.log(res)
      // })

    }
  }
</script>

<style scoped>
    .wrapper{
        height: 150px;
        background-color: red;
        overflow: hidden;
    }
</style>