import {request} from './request'
//这个js是把home首页整个网络请求 写在这里 如果写到vue组件里 不好管理
//获取轮播图数据和推荐信息
export function getHomeMulttidata() {
    return request({
      url:'/home/multidata'
    })
}

//获取首页下拉数据
export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}