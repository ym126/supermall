<template>
    <div ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScrool from 'better-scroll'
  export default {
    name: "scroll",
    props:{
      probeType: {
        type:Number,
        default:0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        scroll:null
      }
    },
    mounted() {
       this.scroll = new BScrool(this.$refs.wrapper,{
         click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
       })
       this.scroll.on('scroll',(position)=>{
        //传给父组件
        this.$emit('probexy',position);
      })

      //这是上拉刷新
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    },
    methods:{
      scrollBackTop(left,top,time=300){
        this.scroll.scrollTo(left,top,time);
      },
      scrollRefresh(){
        this.scroll && this.scroll.refresh();
        //这是是重新计算betterScroll
      }

    }
  }
</script>

<style scoped>

</style>