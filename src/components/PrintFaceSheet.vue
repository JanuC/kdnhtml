<template>
  <div class="printFaceSheet">
    <header>确认面单信息</header>
    <main>
      <div class="sendMessage">
        <div class="title">
          <span>发件人信息</span>
          <div class="buttonBox">
            <el-button
              :type="showUpdateSendMessageInput ? 'success' : 'primary'"
              @click="updateSendMessage"
            >
              {{ showUpdateSendMessageInput ? "确定" : "修改" }}
            </el-button>
          </div>
        </div>
        <div class="sendName">
          姓名：<span v-show="!showUpdateSendMessageInput">{{
            sendMessage.name
          }}</span>
          <el-input
            v-show="showUpdateSendMessageInput"
            v-model="sendMessage.name"
          ></el-input>
        </div>
        <div class="sendPhone">
          电话：<span v-show="!showUpdateSendMessageInput">{{
            sendMessage.phone
          }}</span>
          <el-input
            v-show="showUpdateSendMessageInput"
            v-model="sendMessage.phone"
          ></el-input>
        </div>
        <div class="sendAddress">
          地址：<span v-show="!showUpdateSendMessageInput">{{
            sendMessage.address
          }}</span>
          <el-input
            v-show="showUpdateSendMessageInput"
            v-model="sendMessage.address"
          ></el-input>
        </div>
      </div>
      <div class="consigneeMessage">
        <div class="title">
          <span>收件人信息</span>
          <div class="buttonBox">
            <el-button
              :type="showUpdateConsigneeMessageInput ? 'success' : 'primary'"
              @click="updateConsigneeMessage"
            >
              {{ showUpdateConsigneeMessageInput ? "确定" : "修改" }}
            </el-button>
          </div>
        </div>
        <div class="consigneeName">
          姓名：<span v-show="!showUpdateConsigneeMessageInput">
            {{ consigneeMessage.name }}
          </span>
          <el-input
            v-show="showUpdateConsigneeMessageInput"
            v-model="consigneeMessage.name"
          ></el-input>
        </div>
        <div class="consigneePhone">
          电话：<span v-show="!showUpdateConsigneeMessageInput">
            {{ consigneeMessage.phone }}
          </span>
          <el-input
            v-show="showUpdateConsigneeMessageInput"
            v-model="consigneeMessage.phone"
          ></el-input>
        </div>
        <div class="consigneeAddress">
          地址：<span v-show="!showUpdateConsigneeMessageInput">
            {{ consigneeMessage.address }}
          </span>
          <el-input
            v-show="showUpdateConsigneeMessageInput"
            v-model="consigneeMessage.address"
          ></el-input>
        </div>
      </div>
      <div class="commodityMessage">
        <div class="title">商品信息</div>
        <ul>
          <li v-for="(item, index) in commodityMessage" :key="index">
            <span>{{ item.goodsName }}</span>
            <span> x </span>
            <span>{{ item.goodsquantity }}</span>
          </li>
        </ul>
      </div>
    </main>
    <footer>
      <el-button type="success">打印面单</el-button>
      <el-button @click="clickCancelPrint">取消打印</el-button>
    </footer>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      // 修改发件人信息,显示相关 input 框
      showUpdateSendMessageInput: false,
      // 修改收件件人信息,显示相关 input 框
      showUpdateConsigneeMessageInput: false,
      // 发件人信息
      sendMessage: {
        name: "程先生",
        phone: "1888888888",
        address: "四川省泸州市龙马潭区龙南路649号",
      },
      // 收件人信息
      consigneeMessage: {
        name: "张三",
        phone: "12222222222",
        address: "四川省泸州市龙马潭区龙南路649号",
      },
      // 商品信息
      commodityMessage: [
        {
          goodsName: "xxx",
          goodsquantity: 1,
        },
        {
          goodsName: "123",
          goodsquantity: 1,
        },
        {
          goodsName: "123",
          goodsquantity: 1,
        },
      ],
    };
  },
  mounted() {},
  methods: {
    ...mapMutations(["updateShowFaceSheet"]),
    // 修改收件人信息
    updateSendMessage() {
      this.showUpdateSendMessageInput = !this.showUpdateSendMessageInput;
    },
    updateConsigneeMessage() {
      this.showUpdateConsigneeMessageInput =
        !this.showUpdateConsigneeMessageInput;
    },
    clickCancelPrint() {
      this.updateShowFaceSheet(false);
      // 将信息传递给子组件
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../assets/css/printFaceSheet.less");
</style>
