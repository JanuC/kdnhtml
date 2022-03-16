/**
 * 该 js 文件用于 vuex 存储订单数据
 */

const state = {
  // 所有订单表
  allOrdersList: null,
  // 所有商品表
  allGoodsList: null,
};

const getters = {
  getAllOrders(state) {
    return state.allOrdersList;
  },
  getAllGoods(state) {
    return state.allGoodsList;
  },
};

const mutations = {
  updateAllOrders(state, data) {
    state.allOrdersList = data;
  },
  updateAllGoods(state, data) {
    state.allGoodsList = data;
  },
};

module.exports = {
  state,
  getters,
  mutations,
};
