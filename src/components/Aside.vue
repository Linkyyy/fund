<template>
  <div>
    <div class="aside">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <router-link to="/home">
          <el-menu-item index="1">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>

        <el-submenu
          v-for="(item, index) in listData"
          :key="item.name"
          :index="index"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>

          <el-menu-item
            v-for="(item1, index1) in item.sub"
            :key="item1"
            :index="index + index1" @click="onClickItem(item1.link)"
            >{{
              item1.name
            }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: [
        {
          name: "资金管理",
          icon: "el-icon-tickets",
          sub: [
            {
              name: "资金流水",
              link: "/fund",
            },
            { name: "资金总览", link: "/all" },
          ],
        },
        {
          name: "账户管理",
          icon: "el-icon-user-solid",
          sub: [{ name: "个人中心", link: "/info" }],
        },
      ],
    };
    
  },
  methods:{
    onClickItem(link){
      this.$router.push(link)
    }
  }
};
</script>

<style lang="less">
.el-menu-vertical-demo{
  width: 200px;
  height: 100vh;
  background-color: #545c64;
}

</style>
