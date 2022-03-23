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
  const goodsMessage = allGoodsList.filter((v) => {
    return v.order_id === id;
  });
  const sendMessage = {
    Name: printOrderMessage[0].consignee,
    Mobile: printOrderMessage[0].phone,
    ProvinceName: printOrderMessage[0].province_name,
    CityName: printOrderMessage[0].city_name,
    ExpAreaName: printOrderMessage[0].area_name,
    Address: printOrderMessage[0].address,
  };
  // console.log(sendMessage);
  // console.log(goodsMessage);
  let printGoodsMessage = [];
  goodsMessage.forEach((v) => {
    printGoodsMessage.push(createObject(v.goods_title, v.goods_num));
  });
  // console.log(printGoodsMessage);
  // const commodityMessage = [];
  return [sendMessage, printGoodsMessage];
}
// 该方法用于创建对象
function createObject(goodName, goodNum) {
  let o = new Object();
  o.GoodsName = goodName;
  o.Goodsquantity = goodNum;
  return o;
}
export default formateOrderMessage;
