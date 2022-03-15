// 该js文件用于对 axios 进行封装
import axios from "axios";
import getToken from "@/utils/getToken";
import router from "@/router";
import Message from "element-ui";

// 环境切换
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "http://localhost:3000";
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "http://api.janu.com:3000";
}

// 设置请求超时
axios.defaults.timeout = 3000;

// 添加请求拦截器
axios.interceptors.request.use(
  (req) => {
    // 请求拦截处理
    // console.log("请求拦截", req);
    // 设置 token
    const token = getToken();
    // console.log(token);
    if (token) {
      req.headers.common["Authorization"] = token;
    }
    return req;
  },
  (err) => {
    console.log("请求拦截错误", err);
    // 请求拦截错误处理
    return Promise.reject(err);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 跳转至登录页面，并携带当前页面的路径
        // 登录成功后，返回当前页面
        case 401:
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
          break;
        // 403： token过期
        // 登录过期，提示用户，并清除本地的token和vuex中的token
        // 跳转至登录页面
        case 403:
          Message({
            type: "error",
            message: "登录已过期，请重新登录",
            duration: 800,
          });
          localStorage.removeItem("token");
          // 清楚vuex 中的token
          // 跳转至登录页面
          setTimeout(() => {
            router.replace({
              path: "login",
              query: {
                redirect: router.currentRoute.fullPath,
              },
            });
          }, 1000);
          break;
        // 404: 请求不存在
        case 404:
          Message({
            type: "error",
            message: "网络请求不存在",
            duration: 800,
          });
          break;
        // 其他错误  直接抛出
        default:
          Message({
            type: "error",
            message: error.response.data.message,
            duration: 800,
          });
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * get 方法，对应 get 请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

/**
 * post方法  对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
