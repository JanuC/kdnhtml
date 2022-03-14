// 该 js 文件用于 vuex 存储 token
const state = {
  token: null,
};
const getters = {
  getToken(state) {
    return state.token;
  },
};
const mutations = {
  updateToken(state, token) {
    state.token = token;
  },
};
export default {
  // namespaced: true,
  state,
  getters,
  mutations,
};
