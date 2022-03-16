<template>
  <div class="faceSheet">
    <div class="faceSheetTitle">头部，用于筛选</div>
    <div class="faceSheetMain">
      <ul>
        <li class="outLi">
          <div class="orderMsg">
            <!-- 商品信息 -->
            <div class="goodsMsg">商品信息</div>
            <div class="orderStatus">订单状态</div>
            <div class="delivery">配送方式</div>
            <div class="expressStatus">物流状态</div>
            <div class="payMoney">支付金额</div>
            <div class="addressee">收件人</div>
            <div class="phone">电话号码</div>
            <div class="address">详细地址</div>
            <div class="operate">操作</div>
          </div>
        </li>
        <li class="outLi" v-for="(item, index) in showOrderList" :key="index">
          <div class="orderTitle">
            <span>商品ID：{{ item.id }}</span>
            <span>订单号：{{ item.order_sn }}</span>
            <span>下单时间：{{ item.createtime }}</span>
            <span>
              {{ item.type === "goods" ? "商城订单" : "积分订单" }}
            </span>
          </div>
          <div class="orderMain">
            <div class="goodsItemMsg">
              <ul>
                <li
                  class="goodItem"
                  v-for="(itemOne, indexOne) in getOneGood(item.id)"
                  :key="indexOne"
                >
                  <div class="goodLeft">
                    <img :src="itemOne.goods_image" alt="图片错误" />
                  </div>
                  <div class="goodRight">
                    <p>{{ itemOne.goods_title }}</p>
                    <p>
                      <span>单价：{{ itemOne.goods_price }}</span>
                      <span>数量：{{ itemOne.goods_num }}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="orderStatus">{{ item.status }}</div>
            <div class="delivery">配送方式</div>
            <div class="expressStatus">物流状态</div>
            <div class="payMoney">{{ item.pay_fee }}元</div>
            <div class="addressee">{{ item.consignee }}</div>
            <div class="phone">{{ item.phone }}</div>
            <div class="address">
              {{ item.province_name + item.city_name + item.address }}
            </div>
            <div class="operate">操作</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      showOrderList: null,
    };
  },
  mounted() {
    this.getAllOrders();
    this.getGoodsMsg();
  },
  computed: {
    ...mapGetters({
      allGoodsList: "getAllGoods",
    }),
  },
  methods: {
    ...mapMutations(["updateAllOrders", "updateAllGoods"]),
    // 获取所有订单
    getAllOrders() {
      this.post("api/getAllOrders").then((res) => {
        // console.log(res);
        if (res.code === 200) {
          // 获取数据成功
          // 将数据提交到 vuex
          this.updateAllOrders(res.data);
          // console.log(this.$store.getters.getAllOrders);
          this.showOrderList = res.data;
        }
      });
    },
    // 获取商品信息
    getGoodsMsg() {
      this.post("api/getGoodsMsg").then((res) => {
        if (res.code === 200) {
          // console.log(res);
          this.updateAllGoods(res.data);
          // console.log(this.allGoodsList);
        }
      });
    },
    getOneGood(id) {
      const allGoodsList = this.allGoodsList;
      const res = allGoodsList.filter((v) => {
        return v.order_id == id;
      });
      // console.log(res);
      return res;
      // return res[0].goods_title;
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../assets/css/facesheet.less");
</style>
