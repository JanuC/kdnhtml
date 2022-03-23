<template>
  <div class="faceSheet">
    <div class="faceSheetTitle">
      <!-- <div class="refreshBox" @click="refreshPage">
        <el-button class="refreshButton">取消筛选</el-button>
      </div> -->
      <div class="selectBox">
        <el-radio-group
          v-model="selectLabel"
          class="selectRadio"
          @change="checkSelect"
        >
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
        <el-button class="elButton" type="warning" @click="filterOrders">
          筛选
        </el-button>
        <el-button class="elButton" @click="cancelInputFilter">
          取消
        </el-button>
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
              {{ item.type === "goods" ? "App-商城订单" : "积分订单" }}
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
                <el-button
                  type="success"
                  :disabled="isDisabled(item.id)"
                  @click="printFaceSheet(item.id, item.order_sn)"
                >
                  打印面单
                </el-button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="pageBox">
      <el-pagination
        :page-sizes="pageSize"
        :page-size="currentPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="ordersTotal"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <div class="printBox" v-if="showFaceSheet">
      <print-face-sheet :sendPrintMessage="printMessage"></print-face-sheet>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import PrintFaceSheet from "./PrintFaceSheet.vue";
import formateOrderMessage from "../utils/formateOrderMessage";
export default {
  components: { PrintFaceSheet },
  data() {
    return {
      // 当前显示的订单
      showOrderList: null,
      // 切换不同状态的
      selectLabel: "全部",
      // 通过订单号之类删选订单
      selectInput: null,
      // 所有订单总数
      ordersTotal: null,
      // 可供选择的每页显示条数
      pageSize: [10, 20, 50, 100],
      // 每页显示条数 默认为10条
      currentPageSize: 10,
      // 当前显示页的页码 默认为1
      currentPage: 1,
      // 打印面单需要的信息，传递给子组件
      printMessage: null,
    };
  },
  mounted() {
    this.getAllOrders();
    this.getGoodsMsg();
    // 将组件中的信息和参数相匹配
    this.currentPage = parseInt(this.$route.query.currentPage);
    this.currentPageSize = parseInt(this.$route.query.pageSize);
    this.selectLabel = this.$route.query.selectLabel;
  },
  computed: {
    ...mapGetters({
      allGoodsList: "getAllGoods",
      allOrdersList: "getAllOrders",
      showFaceSheet: "getShowFaceSheet",
    }),
  },
  methods: {
    ...mapMutations([
      "updateAllOrders",
      "updateAllGoods",
      "updateShowFaceSheet",
    ]),
    // 获取所有订单
    getAllOrders() {
      this.post("api/getAllOrders").then((res) => {
        // console.log(res);
        if (res.code === 200) {
          // 获取数据成功
          // 将数据提交到 vuex
          this.updateAllOrders(res.data);
          const resultArray = this.changePages(
            this.currentPageSize,
            this.currentPage,
            this.selectLabel
          );
          this.showOrderList = resultArray[0];
          this.ordersTotal = resultArray[1];
          // console.log(this.$store.getters.getAllOrders);
          // this.showOrderList = res.data;
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
      // console.log(id);
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
    // 切换每页显示的条目数
    handleSizeChange(num) {
      const params = this.getRouterParams();
      this.$router.push({
        path: "/home/faceSheet",
        query: {
          pageSize: num,
          currentPage: 1,
          selectLabel: params.selectLabel,
          inputFilterStr: params.inputFilterStr,
        },
      });
      this.currentPage = 1;
    },
    // 切换当前显示的页数
    handleCurrentChange(pages) {
      const params = this.getRouterParams();
      this.$router.push({
        path: "/home/faceSheet",
        query: {
          pageSize: params.pageSize,
          currentPage: pages,
          selectLabel: params.selectLabel,
          inputFilterStr: params.inputFilterStr,
        },
      });
      // console.log("sss", this.showOrderList);
    },
    // 切换选中框
    checkSelect(selectVal) {
      const params = this.getRouterParams();
      this.$router.push({
        path: "/home/faceSheet",
        query: {
          pageSize: params.pageSize,
          currentPage: 1,
          selectLabel: selectVal,
          inputFilterStr: params.inputFilterStr,
        },
      });
      this.currentPage = 1;
    },
    // 获取路由中的所有参数
    getRouterParams() {
      const params = this.$route.query;
      return params;
    },
    // 按钮筛选功能
    filterOrders(e) {
      // 取消 button 焦点，使其恢复原状
      e.target.blur();
      if (this.selectInput) {
        const params = this.getRouterParams();
        this.$router.push({
          path: "/home/faceSheet",
          query: {
            pageSize: params.pageSize,
            currentPage: 1,
            selectLabel: params.selectLabel,
            inputFilterStr: this.selectInput,
          },
        });
        this.currentPage = 1;
      } else {
        this.$message({
          type: "error",
          message: "请输入筛选内容",
          duration: 800,
        });
      }
    },
    // 取消筛选功能
    cancelInputFilter(e) {
      // 取消 button 焦点，使其恢复原状
      e.target.blur();
      this.currentPageSize = 10;
      this.currentPage = 1;
      this.selectLabel = "全部";
      this.selectInput = null;
      this.$router.push({
        path: "/home/faceSheet",
        query: {
          pageSize: this.currentPageSize,
          currentPage: this.currentPage,
          selectLabel: this.selectLabel,
          inputFilterStr: this.selectInput,
        },
      });
    },
    // 打印电子面单功能
    printFaceSheet(id, order_sn) {
      this.printMessage = formateOrderMessage(id);
      this.printMessage.push(order_sn);
      // console.log(this.printMessage);
      this.updateShowFaceSheet(true);
    },
  },
  watch: {
    $route() {
      const currentpageSize = parseInt(this.$route.query.pageSize);
      const currentPage = parseInt(this.$route.query.currentPage);
      const selectLabel = this.$route.query.selectLabel;
      const inputFilterStr = this.$route.query.inputFilterStr;
      // console.log(currentpageSize, currentPage, selectLabel);
      const results = this.changePages(
        currentpageSize,
        currentPage,
        selectLabel,
        inputFilterStr
      );
      this.showOrderList = results[0];
      this.ordersTotal = results[1];
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../assets/css/facesheet.less");
</style>
