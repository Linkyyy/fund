<template>
  <router-view />
</template>

<script>
  import jwt_decode from 'jwt-decode'
export default {
  created() {
    if (localStorage.fundToken) {
      const decoded = jwt_decode(localStorage.fundToken);
      this.$store.commit("setUser", decoded);
      this.$store.commit("setisAuthenticated", true);
    }
  },
};
</script>
<style lang="less">
</style>
