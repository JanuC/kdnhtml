// 该 js 文件用于获取 token
import store from "../store/index";
function getToken() {
  return store.state.token;
}
export default getToken;
