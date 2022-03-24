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
            sendMessage.Name
          }}</span>
          <el-input
            v-show="showUpdateSendMessageInput"
            v-model="sendMessage.Name"
          ></el-input>
        </div>
        <div class="sendPhone">
          电话：<span v-show="!showUpdateSendMessageInput">{{
            sendMessage.Mobile
          }}</span>
          <el-input
            v-show="showUpdateSendMessageInput"
            v-model="sendMessage.Mobile"
          ></el-input>
        </div>
        <div class="sendAddress">
          地址：<span v-show="!showUpdateSendMessageInput">
            {{
              sendMessage.ProvinceName +
              sendMessage.CityName +
              sendMessage.ExpAreaName +
              sendMessage.Address
            }}
          </span>
          <div class="addressMessage" v-show="showUpdateSendMessageInput">
            省:
            <el-input v-model="sendMessage.ProvinceName"></el-input>
            市:
            <el-input v-model="sendMessage.CityName"></el-input>
            区:
            <el-input v-model="sendMessage.ExpAreaName"></el-input>
            地址:
            <el-input v-model="sendMessage.Address"></el-input>
          </div>
        </div>
      </div>
      <div class="consigneeMessage" v-if="commodityMessage">
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
            {{ consigneeMessage.Name }}
          </span>
          <el-input
            v-show="showUpdateConsigneeMessageInput"
            v-model="consigneeMessage.Name"
          ></el-input>
        </div>
        <div class="consigneePhone">
          电话：<span v-show="!showUpdateConsigneeMessageInput">
            {{ consigneeMessage.Mobile }}
          </span>
          <el-input
            v-show="showUpdateConsigneeMessageInput"
            v-model="consigneeMessage.Mobile"
          ></el-input>
        </div>
        <div class="consigneeAddress">
          地址：<span v-show="!showUpdateConsigneeMessageInput">
            {{
              consigneeMessage.ProvinceName +
              consigneeMessage.CityName +
              consigneeMessage.ExpAreaName +
              consigneeMessage.Address
            }}
          </span>
          <div class="addressMessage" v-show="showUpdateConsigneeMessageInput">
            省:
            <el-input v-model="consigneeMessage.ProvinceName"></el-input>
            市:
            <el-input v-model="consigneeMessage.CityName"></el-input>
            区:
            <el-input v-model="consigneeMessage.ExpAreaName"></el-input>
            地址:
            <el-input v-model="consigneeMessage.Address"></el-input>
          </div>
        </div>
      </div>
      <div class="commodityMessage">
        <div class="title" v-if="commodityMessage">商品信息</div>
        <ul>
          <li v-for="(item, index) in commodityMessage" :key="index">
            <span>{{ item.GoodsName }}</span>
            <span> x </span>
            <span>{{ item.Goodsquantity }}</span>
          </li>
        </ul>
      </div>
    </main>
    <footer>
      <el-button type="success" @click="sendPrintMessageToBank">
        打印面单
      </el-button>
      <el-button @click="clickCancelPrint">取消打印</el-button>
    </footer>
    <div class="printBox" v-if="showPrintBox">
      <div id="printMain" v-html="printMain"></div>
      <div class="printButtonBox">
        <el-button v-print="'#printMain'" type="success">打印</el-button>
        <el-button @click="cancelPrint">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["sendPrintMessage"],
  data() {
    return {
      // 修改发件人信息,显示相关 input 框
      showUpdateSendMessageInput: false,
      // 修改收件件人信息,显示相关 input 框
      showUpdateConsigneeMessageInput: false,
      // 发件人信息
      sendMessage: {
        Name: "程先生",
        Mobile: "1888888888",
        ProvinceName: "四川省",
        CityName: "泸州市",
        ExpAreaName: "龙马潭区",
        Address: "龙南路649号",
      },
      // 收件人信息
      consigneeMessage: null,
      // 商品信息
      commodityMessage: null,
      // 订单号
      orderCode: null,
      // 打印主题内容
      printMain: null,
      // 是否显示打印组件
      showPrintBox: false,
    };
  },
  mounted() {
    this.consigneeMessage = this.sendPrintMessage[0];
    this.commodityMessage = this.sendPrintMessage[1];
    this.orderCode = this.sendPrintMessage[2];
  },
  methods: {
    ...mapMutations(["updateShowFaceSheet"]),
    // 修改收件人信息
    updateSendMessage() {
      if (
        this.sendMessage.Name === "" ||
        this.sendMessage.Mobile === "" ||
        this.sendMessage.ProvinceName === "" ||
        this.sendMessage.CityName === "" ||
        this.sendMessage.ExpAreaName === "" ||
        this.sendMessage.Address === ""
      ) {
        this.$message({
          type: "error",
          message: "缺少发件人关键信息，请补充",
          duration: 1000,
        });
      } else {
        this.showUpdateSendMessageInput = !this.showUpdateSendMessageInput;
      }
    },
    updateConsigneeMessage() {
      if (
        this.consigneeMessage.name === "" ||
        this.consigneeMessage.phone === "" ||
        this.consigneeMessage.province === "" ||
        this.consigneeMessage.city === "" ||
        this.consigneeMessage.area === "" ||
        this.consigneeMessage.address === ""
      ) {
        this.$message({
          type: "error",
          message: "缺少收件人关键信息，请补充",
          duration: 1000,
        });
      } else {
        this.showUpdateConsigneeMessageInput =
          !this.showUpdateConsigneeMessageInput;
      }
    },
    clickCancelPrint() {
      this.updateShowFaceSheet(false);
      // 将信息传递给子组件
    },
    // 打印面单按钮
    sendPrintMessageToBank() {
      if (
        this.showUpdateSendMessageInput ||
        this.showUpdateConsigneeMessageInput
      ) {
        this.$message({
          type: "error",
          message: "请确认表单信息",
          duration: 1000,
        });
      } else {
        const data = {
          sendMessage: this.sendMessage,
          consigneeMessage: this.consigneeMessage,
          commodityMessage: this.commodityMessage,
          orderCode: this.orderCode,
        };
        // console.log(data);
        this.post("api/getPrint", data).then((res) => {
          // console.log(res);
          if (res.code === 200 && res.data.Success) {
            // console.log(res.data.PrintTemplate);
            this.printMain = res.data.PrintTemplate;
            this.showPrintBox = true;
          } else {
            this.$message({
              type: "error",
              message: res.data.Reason,
              duration: 1000,
            });
          }
        });
      }
    },
    // 取消打印
    cancelPrint() {
      this.showPrintBox = false;
      this.updateShowFaceSheet(false);
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../assets/css/printFaceSheet.less");
</style>
