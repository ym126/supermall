import {request} from "./request";
//根据iid请求商品详情信息
export function getDetailData(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

//获取推荐信息
export function getRecommend() {
  return request({
    url:'/recommend'
  })
}

//这是创建class对象  接收Goods商品详细信息
export class Goods{
  constructor(itemInfo,columns,service) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = service;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0]:''
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}