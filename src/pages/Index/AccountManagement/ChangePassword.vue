<template>
  <el-card class="box-card">
    <h1>修改密码</h1>
    <el-divider></el-divider>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码">
        <el-input type="text" class="aaa" v-model="ruleForm.oldpwd" @blur="checkOld"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" class="aaa"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" class="aaa"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">确认</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { API_CHECK_PASSWORD, API_CHANGE_PASSWORD } from "../../../api/api";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        oldpwd: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      id: null
    };
  },
  methods: {
    checkOld() {
      this.id = localStorage.getItem("userId");
      API_CHECK_PASSWORD(this.id, this.ruleForm.oldpwd).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
        } else {
          this.$message.error(res.data.msg);
          return;
        }
      });
    },
    submitForm() {
      this.id = localStorage.getItem("userId");
      if (this.ruleForm.pass == this.ruleForm.checkPass) {
        this.$confirm("此操作将修改当前用户密码, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            API_CHANGE_PASSWORD( this.id,this.ruleForm.checkPass).then(res => {
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "密码修改成功!请重新登陆"
                });
                this.$router.push("/logout");
              } else {
                this.$message.error(res.data.msg);
                return false;
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消密码修改"
            });
          });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>



<style scoped>
.aaa {
  width: 300px !important;
}
</style>