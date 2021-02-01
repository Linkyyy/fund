<template>
  <div class="content">
    <div class="main">
      <el-form
        :model="registerForm"
        status-icon
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="registerForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="registerForm.identity" placeholder="请选择身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')"
            >注册</el-button
          >
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        name: "",
        email: "",
        password: "",
        checkPass: "",
        identity:''
      },
      rules: {
        name: [
          { required: true, trigger: "blur", message: "请输入名字！" },
          {
            max: 18,
            min: 4,
            trigger: "blur",
            message: "用户名长度在4-18个字符之间！",
          },
        ],
        email: [
          { required: true,  type:"email",trigger: "blur", message: "邮箱格式不正确！" }
        ],
        password: [{ validator: validatePass, required: true,trigger: "blur" }],
        checkPass: [{ validator: validatePass2, required: true,trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('http://127.0.0.1:5000/api/user/register',this.registerForm).then(res=>{
            this.$message(
              {
                message:'账号注册成功！',
                type:'success'
              }
            )
            this.$router.push('/login')
            console.log(res)
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
  }
}
</style>
