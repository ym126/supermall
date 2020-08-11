import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Swipe,SwipeItem,Toast,Sidebar, SidebarItem,Grid, GridItem,Lazyload} from 'vant'

Vue.config.productionTip = false

//开始  事件总线
Vue.prototype.$bus = new Vue();

//轮播图组件等等
Vue.use(Swipe).use(SwipeItem).use(Toast).use(Sidebar).use(SidebarItem).use(Grid).use(GridItem).use(Lazyload,{
  loading:require('assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
