<template>
    <div class="recommend">
        <div v-for="item in recommends" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>

        </div>
    </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
    .recommend{
        display: flex;
        text-align: center;
        padding: 10px 0 20px 0;
        border-bottom: 10px solid #eee;
    }
    .recommend-item{
        flex: 1;

    }
    .recommend-item img{
        width: 80%;
        margin-bottom: 10px;
    }
</style>