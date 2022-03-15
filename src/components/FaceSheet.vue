<template>
  <div class="faceSheet">
    <div class="faceSheetTitle">头部，用于筛选</div>
    <div class="faceSheetMain">
      <ul>
        <li>
          <div class="orderMsg">
            <!-- 商品信息 -->
            <div class="goodsMsg">商品信息</div>
            <div class="orderStatus">订单状态</div>
            <div class="delivery">配送方式</div>
            <div class="addressee">收件人</div>
            <div class="payMoney">支付金额</div>
            <div class="address">详细地址</div>
            <div class="operate">操作</div>
          </div>
        </li>
        <li>
          <div class="orderTitle">
            <span>id:</span>
            <span>订单号:</span>
            <span>下单日期:</span>
          </div>
          <div class="orderMain">
            <div class="goodsMsg">商品信息</div>
            <div class="orderStatus">订单状态</div>
            <div class="delivery">配送方式</div>
            <div class="addressee">收件人</div>
            <div class="payMoney">支付金额</div>
            <div class="address">详细地址</div>
            <div class="operate">操作</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
@import url("../assets/css/facesheet.less");
</style>
