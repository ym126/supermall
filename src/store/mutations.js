import {ADD_COUNT,ADD_TO_CART} from './mutation-types'
const mutations ={
  [ADD_COUNT](state,payload){
    payload.count++;
  },
  [ADD_TO_CART](state,payload){
    state.CartList.push(payload)
  }
  /*addToCart(state,payload){
    // let oldPayLoad = null;
    //这里判断 state.CartList 里面是否存在 旧元素 如果存在 就赋值到oldPayLoad
    // for (let item of state.CartList){
    //   if (item.iid === payload.iid){
    //     oldPayLoad = item;
    //   }
    // }
    //判断是否存在过
    let oldPayLoad = state.CartList.find(item => item.iid === payload.iid )
    //这里判断oldPayLoad是否存在 如果存在就+1 如果没有就把新的push到state.CartList
    if (oldPayLoad){
      oldPayLoad.count += 1;
    }else {
      payload.count = 1;
      payload.isActive = true;
      state.CartList.push(payload)
    }
  }*/

}
export default mutations