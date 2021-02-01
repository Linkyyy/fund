<template>
  <div>
    <div class="div_nav">
      <div class="left">
        <img src="../assets/金币.png" alt="" />
        <span>资金管理系统</span>
      </div>
      <div class="right">
        <div class="block">
          <el-avatar
            :size="40"
            :src="this.$store.getters.user.avatar?this.$store.getters.user.avatar:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3301276756,2162386695&fm=26&gp=0.jpg'"
          ></el-avatar>
        </div>
        <div>
          <span>欢迎</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{this.$store.getters.user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      switch (command) {
        case "info":
          this.$router.push("/info");
          break;
        case "logout":
          localStorage.removeItem("fundToken");
          this.$store.commit("clearState");
          this.$router.push("/login");
          break;
      }
    },
  },
};
</script>

<style lang="less">
.div_nav {
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100vw;
  color: white;
  background-color: #545c64;
  .left {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      width: 34px;
      height: 34px;
    }
    span {
      padding-left: 10px;
      font: 18px Extra large;
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    div {
      margin: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 15px;
        padding-right: 30px;
      }
    }
  }
}
</style>
<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
