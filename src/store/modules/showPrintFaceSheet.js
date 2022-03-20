const state = {
  showFaceSheet: false,
};
const getters = {
  getShowFaceSheet(state) {
    return state.showFaceSheet;
  },
};
const mutations = {
  updateShowFaceSheet(state, data) {
    state.showFaceSheet = data;
  },
};
module.exports = {
  state,
  getters,
  mutations,
};
