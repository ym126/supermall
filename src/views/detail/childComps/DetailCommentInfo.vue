<template>
    <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
        <div class="info-title">
            <div>用户评论</div>
            <div>更多</div>
        </div>
        <div class="info-middle">
            <div class="info-user">
                <img :src="commentInfo.user.avatar" alt=""/>
                <span>{{commentInfo.user.uname}}</span>
            </div>
            <div class="info-content">
            {{commentInfo.content}}
            </div>
            <div class="info-other">
                <span class="data">{{commentInfo.created | formattedDate}}</span>
                <span>{{commentInfo.style}}</span>
            </div>
            <div class="info-image" v-for="(images,index) in commentInfo.images">
                <img :src="images" alt="">
            </div>

        </div>
    </div>
</template>

<script>
    import {formatDate} from 'common/utils'
  export default {
    name: "DetailCommentInfo",
    props:{
      commentInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    filters:{
      formattedDate(value){
        //将时间戳转换成date日期
        const date = new Date(value * 1000);
        //格式化日期
        return formatDate(date,"yyyy-MM-dd hh:mm:ss");
      }
    }
  }
</script>

<style scoped>
    .comment-info{
        padding:5px 10px;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-title{
        font-size: 15px;
        display: flex;
        padding: 10px;
        justify-content: space-between;
        border-bottom: 1px solid rgba(100,100,100,.2);
    }
    .info-user{
        padding: 5px 0;
    }
    .info-user img{
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }
    .info-user span{
        display: inline-block;
        height: 45px;
        line-height: 45px;
        margin-left: 10px;
        vertical-align: top;
    }
    .info-content{
        font-size: 14px;
        color: #a3a3a5;

    }
    .info-other{
        margin: 5px 0;
        font-size: 14px;
        color: #a3a3a5;
    }
    .info-other .data{
        margin-right: 10px;
    }
    .info-image{
        display: inline-block;
        padding: 5px 0;
    }
    .info-image img{
        margin-right: 5px;
        width: 70px;
        height: 60px;
    }
</style>