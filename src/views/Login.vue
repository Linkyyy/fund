<template>
  <div class="content">
    <div class="main">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginForm.email" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="tip">还没注册？<router-link to='/register'>点此注册</router-link> </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
 
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          { required: true,  type:"email",trigger: "blur", message: "邮箱格式不正确！" }
        ],
        password: [{ validator: validatePass, required: true,trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('http://127.0.0.1:5000/api/user/login',this.loginForm).then(res=>{
            this.$message(
              {
                message:'登录成功！',
                type:'success'
              }
            )
            let {token}=res.data
            localStorage.setItem('fundToken',token)
            const decoded=jwt_decode(token)
            this.$store.commit('setUser',decoded);
            this.$store.commit('setisAuthenticated',true);
            this.$router.push('/index')
          }).catch(error=>{
            this.$message.error(error);
          })
        } else {
          this.$message.error('请填写完整！');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://images.pexels.com/photos/843224/pexels-photo-843224.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  .main {
    border-radius: 5px;
    box-shadow: 0 0 6px 1px rgba(180, 180, 180, 0.493);
    padding: 50px;
    padding-left: 0;
    padding-bottom: 0;
    background-color: white;
    width: 300px;
    .tip{
      font: 12px Extra Small;
      float: right;
      margin-bottom: 10px;
    }
  }
}
</style>
