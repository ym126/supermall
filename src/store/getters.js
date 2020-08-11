const getters ={
  CartListLength(state){
    return state.CartList.length
  },
  cartList(state){
    return state.CartList
  }
}
export default getters