<template>
  <div class="login">
    <div class="loginBox">
      <p>鸿正App后台</p>
      <div class="inputBox">
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
        <el-input v-model="password" placeholder="请输入密码" show-password>
        </el-input>
      </div>
      <div class="checkPeople">
        <span>请计算：</span>
        <span class="checkInfo" v-if="this.numArr" @click="checkNum">
          {{ this.numArr[0] }} + {{ this.numArr[1] }} = ?
        </span>
        <el-input class="checkInput" maxlength="3" v-model="sum"></el-input>
      </div>
      <div class="buttonBox">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="clearForm">清空</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import randNum from "../utils/randNum";
// import getToken from "../utils/getToken";
export default {
  data() {
    return {
      // 用户名
      username: null,
      // 密码
      password: null,
      // 两数之和
      sum: null,
      // 用于校验的两个随机数
      numArr: null,
    };
  },
  mounted() {
    // 生成随机数用于验证
    this.checkNum();
  },
  methods: {
    // 表单校验
    checkForm() {
      if (!this.username) {
        this.$message({
          type: "error",
          message: "请输入用户名",
          duration: 800,
        });
        return false;
      } else if (!this.password) {
        this.$message({
          type: "error",
          message: "请输入密码",
          duration: 800,
        });
        return false;
      } else if (!this.sum) {
        this.$message({
          type: "error",
          message: "请输入结果",
          duration: 800,
        });
        return false;
      } else if (this.sum != this.numArr[0] + this.numArr[1]) {
        this.$message({
          type: "error",
          message: "输入结果不正确",
          duration: 800,
        });
        return false;
      } else {
        return true;
      }
    },
    // 登录功能
    login() {
      // 先进行表单验证
      if (this.checkForm()) {
        console.log("登录成功");
        // console.log(this.$store.state.token);
        // console.log("哈哈", getToken());
        this.post("api/login", { username: this.username }).then((res) => {
          console.log(res);
        });
      }
    },
    // 清空表单
    clearForm() {
      this.username = this.password = this.sum = null;
    },
    // 切换求和数字
    checkNum() {
      this.numArr = randNum();
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../assets/css/login.less");
</style>
