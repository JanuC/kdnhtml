/**
 * 该 js 文件用于根据 input 中的内容筛选订单
 */
import store from "../store/index";
function inputFilterOrder(data) {
  const dataNum = parseInt(data);
  const allOrdersList = store.getters.getAllOrders;
  let filterOrderList = null;
  if (dataNum) {
    // 可以转换为数字
    if (dataNum > 100000000000) {
      // 数值大于 12 位，表示订单
      filterOrderList = allOrdersList.filter((v) => {
        return v.order_sn == dataNum;
      });
      // console.log(filterOrderList);
    } else {
      filterOrderList = allOrdersList.filter((v) => {
        return v.phone == dataNum;
      });
      // console.log(filterOrderList);
    }
  } else {
    // 不能转化为数字 为 NaN
    filterOrderList = allOrdersList.filter((v) => {
      return v.consignee == data;
    });
    // console.log(filterOrderList);
  }
  return filterOrderList;
}
export default inputFilterOrder;
