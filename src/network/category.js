import {request} from './request'

//获取侧边导航栏
export function getCategory() {
  return request({
    url:'/category'
  })
}
//获取选择导航的目标内容
export function getSubcategory(maitKey) {
  return request({
    url:'/subcategory',
    params:{
      maitKey
    }

  })
}
export function getSubcategoryDetail(miniWallkey,type) {
  return request({
    url:'subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}