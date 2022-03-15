<template>
  <div class="home">
    <el-container>
      <el-header height="40px">鸿正后台管理系统</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>电子面单
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" class="is-active">
                  打印面单
                </el-menu-item>
                <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
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
@import url("../assets/css/home.less");
</style>
