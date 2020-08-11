import {ADD_COUNT,ADD_TO_CART} from './mutation-types'

const actions = {
  addCart(context,payload){
    return new Promise((resolve, reject) => {
        let oldPayLoad = context.state.CartList.find(item => item.iid === payload.iid );
        if (oldPayLoad){
          context.commit(ADD_COUNT,oldPayLoad);
          resolve('当前商品数量+1')
        }else {
          payload.count = 1;
          payload.isActive = true;
          context.commit(ADD_TO_CART,payload);
          resolve('添加新的商品')
        }
    })
  }
}
export default actions