/**
 * 该 js 文件用于切换分页
 * @param {length: Number, currentPages:Number, orderStatus: String}
 * @returns {Array}
 * 每页显示条数，当前页
 */
import store from "../store/index";
import inputFilterOrder from "./inputFilterOrder";
function changePages(length, currentPages, orderStatus, inputFilterStr) {
  // console.log(length, currentPages, orderStatus);
  let allOrdersList = null;
  if (inputFilterStr) {
    // console.log(1);
    allOrdersList = inputFilterOrder(inputFilterStr);
  } else {
    // console.log(2);
    allOrdersList = store.getters.getAllOrders;
  }
  const start = (currentPages - 1) * length;
  const end = currentPages * length;
  // 订单状态
  let orderStatusNum = null;
  // 当前页面选中的状态
  let currentOrders = null;
  // 用于存储过滤后的订单
  let selectOrders = null;
  // 返回订单数组的长度  用于动态更新 pages
  let selectOrdersLength = null;
  switch (orderStatus) {
    case undefined:
      orderStatusNum = -99;
      break;
    case "全部":
      orderStatusNum = -99;
      break;
    case "已取消":
      orderStatusNum = -1;
      break;
    case "已关闭":
      orderStatusNum = -2;
      break;
    case "未支付":
      orderStatusNum = 0;
      break;
    case "已支付":
      orderStatusNum = 1;
      break;
    case "未发货":
      orderStatusNum = 2;
      break;
    case "已发货":
      orderStatusNum = 3;
      break;
    case "已完成":
      orderStatusNum = 4;
      break;
  }
  if (orderStatusNum === -99) {
    currentOrders = allOrdersList.slice(start, end);
    selectOrdersLength = allOrdersList.length;
  } else {
    if (orderStatusNum === 2) {
      const result = selectExpress(0, inputFilterStr);
      currentOrders = result[0].slice(start, end);
      selectOrdersLength = result[1];
    } else if (orderStatusNum === 3) {
      const result = selectExpress(1, inputFilterStr);
      currentOrders = result[0].slice(start, end);
      selectOrdersLength = result[1];
    } else if (orderStatusNum === 4) {
      const result = selectExpress(2, inputFilterStr);
      currentOrders = result[0].slice(start, end);
      selectOrdersLength = result[1];
    } else {
      selectOrders = allOrdersList.filter((v) => {
        return v.status === orderStatusNum;
      });
      currentOrders = selectOrders.slice(start, end);
      selectOrdersLength = selectOrders.length;
    }
  }
  return [currentOrders, selectOrdersLength];
}

// 该 方法 用于筛选未发货、已发货、已完成订单
function selectExpress(num, inputFilterStr) {
  const selectExpressList = store.getters.getAllGoods;
  let allOrdersList = null;
  if (inputFilterStr) {
    // console.log(1);
    allOrdersList = inputFilterOrder(inputFilterStr);
  } else {
    // console.log(2);
    allOrdersList = store.getters.getAllOrders;
  }
  // 只在已支付的订单中筛选
  const payOrderList = allOrdersList.filter((v1) => {
    return v1.status === 2;
  });
  // console.log("selectExpressList", selectExpressList);
  const idList = [];
  selectExpressList.forEach((v) => {
    if (v.dispatch_status === num) {
      idList.push(v.order_id);
    }
  });
  // console.log(idList);
  const uniqueArr = unique(idList);
  // console.log(uniqueArr);
  const newArr = payOrderList.filter((v) => {
    for (let i = 0; i < uniqueArr.length; i++) {
      if (v.id === uniqueArr[i]) {
        return v;
      }
    }
  });
  // console.log("XXX", newArr);
  return [newArr, newArr.length];
}

// 该方法用于数组去重  ES6中的Set方法
function unique(array) {
  return Array.from(new Set(array));
}

export default changePages;
