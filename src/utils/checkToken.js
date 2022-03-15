// 该 js 文件用于 验证 token
// import getToken from "./getToken";

import { apiAddress } from "../request/api";
// const token = getToken() || localStorage.getItem("token");
function checkToken() {
  return new Promise((resolve, reject) => {
    apiAddress("api/checkToken")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export default checkToken;
