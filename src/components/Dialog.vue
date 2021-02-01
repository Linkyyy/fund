<template>
  <div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.dialogFormVisible"
      class="dialog" width="30%"
    >
      <el-form :model="form" :rules="rules" ref="addForm">
        <el-form-item label="收支类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择收支类型">
            <el-option
              v-for="item in typeList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="收支描述"
          prop="desc"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.desc" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="收入" prop="income" :label-width="formLabelWidth">
          <el-input v-model="form.income" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="支出" prop="expand" :label-width="formLabelWidth">
          <el-input v-model="form.expand" autocomplete="off"></el-input>
        </el-form-item>

                <el-form-item label="资金变化" prop="cash" :label-width="formLabelWidth">
          <el-input v-model="form.cash" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: Object,
    form:Object
  },
  data() {
    return {
      typeList: ["提现", "提现手续费", "充值", "优惠卷", "转账", "其他"],

      rules: {
        desc: [{ required: true }],
        income: [{ required: true }],
        cash: [{ required: true }],
        expand: [{ required: true }],
        remark: [{ required: true }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            let url=this.dialog.type=='add'?'add':`edit/${this.form.id}`
          this.$axios
            .post("http://127.0.0.1:5000/api/profile/"+url, this.form)
            .then((res) => {
              this.$message({
                message: "提交成功！",
                type: "success",
              });
              console.log(res)
              this.dialog.dialogFormVisible = false;
              this.$emit("update")
            })
            .catch((error) => {
              this.$message.error(error);
            });
        } else {
          this.$message.error("请填写完整！");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less">
</style>
