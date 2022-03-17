<template>
  <div class="faceSheet">
    <div class="faceSheetTitle">
      <div class="refreshBox">
        <el-button class="refreshButton" icon="el-icon-refresh"></el-button>
      </div>
      <div class="selectBox">
        <el-radio-group v-model="selectLabel" class="selectRadio">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="未支付"></el-radio-button>
          <el-radio-button label="已支付"></el-radio-button>
          <el-radio-button label="已取消"></el-radio-button>
          <el-radio-button label="已关闭"></el-radio-button>
          <el-radio-button label="未发货"></el-radio-button>
          <el-radio-button label="已发货"></el-radio-button>
          <el-radio-button label="已完成"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="orderBox">
        <el-input
          class="elInput"
          v-model="selectInput"
          placeholder="订单号/收件人/电话号码"
        ></el-input>
      </div>
    </div>
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
          <div
            class="orderTitle"
            :class="
              item.status === -2
                ? 'orderClose'
                : item.status === -1
                ? 'orderCancel'
                : item.status === 0
                ? 'orderError'
                : item.status === 1
                ? 'orderSuccess'
                : 'orderOver'
            "
          >
            <span>商品ID：{{ item.id }}</span>
            <span>订单号：{{ item.order_sn }}</span>
            <span>下单时间：{{ timeFormate(item.createtime) }}</span>
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
                      <span v-show="getExpressSku(item.id)[2]">
                        规格：{{ getExpressSku(item.id)[2] }}
                      </span>
                      <span>单价：{{ itemOne.goods_price }}</span>
                      <span>数量：{{ itemOne.goods_num }}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="itemBox">
              <div class="orderStatus">
                {{
                  item.status === -2
                    ? "交易关闭"
                    : item.status === -1
                    ? "已取消"
                    : item.status === 0
                    ? "未支付"
                    : item.status === 1
                    ? "已支付"
                    : "已完成"
                }}
              </div>
            </div>
            <div class="itemBox">
              <div class="delivery">
                {{
                  getExpressSku(item.id)[0] === "express" ? "物流快递" : "其他"
                }}
              </div>
            </div>
            <div class="itemBox">
              <div class="expressStatus">
                {{
                  item.status === -2
                    ? "-"
                    : item.status === -1
                    ? "-"
                    : getExpressSku(item.id)[1] === 0
                    ? "未发货"
                    : getExpressSku(item.id)[1] === 1
                    ? "已发货"
                    : "已收货"
                }}
              </div>
            </div>
            <div class="itemBox">
              <div class="payMoney">{{ item.pay_fee }}元</div>
            </div>
            <div class="itemBox">
              <div class="addressee">{{ item.consignee }}</div>
            </div>
            <div class="itemBox">
              <div class="phone">{{ item.phone }}</div>
            </div>
            <div class="itemBox">
              <div class="address">
                {{ item.province_name + item.city_name + item.address }}
              </div>
            </div>
            <div class="itemBox">
              <div class="operate">
                <el-button type="success" :disabled="isDisabled(item.id)">
                  打印面单
                </el-button>
              </div>
            </div>
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
      selectLabel: "全部",
      selectInput: null,
    };
  },
  mounted() {
    this.getAllOrders();
    this.getGoodsMsg();
  },
  computed: {
    ...mapGetters({
      allGoodsList: "getAllGoods",
      allOrdersList: "getAllOrders",
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
    // 获取商品信息列表
    getGoodsMsg() {
      this.post("api/getGoodsMsg").then((res) => {
        if (res.code === 200) {
          // console.log(res);
          this.updateAllGoods(res.data);
          // console.log(this.allGoodsList);
        }
      });
    },
    // 每一个商品信息
    getOneGood(id) {
      const allGoodsList = this.allGoodsList;
      const res = allGoodsList.filter((v) => {
        return v.order_id == id;
      });
      // console.log(res);
      return res;
      // return res[0].goods_title;
    },
    // 获取商品物流信息以及规格信息
    getExpressSku(id) {
      const allGoodsList = this.allGoodsList;
      const res = allGoodsList.filter((v) => {
        return v.order_id == id;
      });
      // console.log(res[0].goods_sku_text === "null");
      // 物流方式
      const express = res[0].dispatch_type;
      // 物流状态
      const dispatch_status = res[0].dispatch_status;
      // 规格信息
      const sku = res[0].goods_sku_text;
      // 返回一个数组：0：物流信息  1：物流状态 2：规格信息
      // console.log(dispatch_status);
      return [express, dispatch_status, sku];
    },
    // 控制 打印面单 按钮是否可用
    isDisabled(id) {
      const allOrdersList = this.allOrdersList;
      const fliterItem = allOrdersList.filter((v) => {
        return v.id === id;
      });
      // 筛选出订单中所以不是 已支付 的订单 返回 false
      if (fliterItem[0].status === 1) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../assets/css/facesheet.less");
</style>
