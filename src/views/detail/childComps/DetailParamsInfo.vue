<template>
    <div class="params-info" v-if="Object.keys(paramsInfo).length !== 0">
        <table v-for="(table,index) in paramsInfo.sizes" :key="index">
            <tr v-for="(tr,indey) in table" :key="indey">
                <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
            </tr>
        </table>
        <table class="infos-params">
            <tr v-for="(info,index) in paramsInfo.infos">
                <td class="infos-key">{{info.key}}</td>
                <td class="infos-value">{{info.value}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: "DetailParamsInfo",
    props:{
      paramsInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
    .params-info{
        padding: 20px 15px;
        font-size: 14px;
        border-bottom: 5px solid #f2f5f8;
    }
    .params-info table{
        width: 100%;
        border-collapse: collapse;
    }
    .params-info table tr{
        height: 42px;
    }
    .params-info table tr td {
        border-bottom: 1px solid rgba(100,100,100,.1);
    }
    .infos-params{
        border-top:1px solid rgba(0,0,0,.1) ;
    }
    .infos-key{
        width: 95px;
    }
    .infos-value{
       color: #eb4868;
    }
</style>