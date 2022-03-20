/**
 * 该 js 文件用于格式化订单信息，为发送给快递鸟做准备
 * @param {Number}
 * @returns {Object}
 */
import store from "../store/index";
function formateOrderMessage(id) {
  const allOrdersList = store.getters.getAllOrders;
  const allGoodsList = store.getters.getAllGoods;
  const printOrderMessage = allOrdersList.filter((V) => {
    return V.id === id;
  });
  const printGoodMessage = allGoodsList.filter((v) => {
    return v.order_id === id;
  });
  const sendMessage = {
    name: printOrderMessage[0].consignee,
    phone: printOrderMessage[0].phone,
    province: printOrderMessage[0].province_name,
    city: printOrderMessage[0].city_name,
    area: printOrderMessage[0].area_name,
    address: printOrderMessage[0].address,
  };
  console.log(sendMessage);
  console.log(printGoodMessage);
  // const commodityMessage = [];
}
export default formateOrderMessage;
