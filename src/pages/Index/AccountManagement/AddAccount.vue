<template>
  <el-card class="box-card">
    <h1>添加账号</h1>
    <el-divider></el-divider>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="name">
        <el-input type="text" class="aaa" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" autocomplete="off" class="aaa"></el-input>
      </el-form-item>
      <el-form-item label="用户组">
        <el-select v-model="ruleForm.region" placeholder="请选择用户组">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addItem">确认</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { API_ADD_ACCOUNT } from "../../../api/api";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pwd: "",
        region: "普通管理员"
      },
      rules: {
        name: [
          { required: true, message: "请输入帐号", trigger: "blur" },
          { min: 1, message: "长度在 1  个字符以上", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, message: "长度在 1  个字符以上", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addItem() {
      API_ADD_ACCOUNT(
        this.ruleForm.name,
        this.ruleForm.pwd,
        this.ruleForm.region
      ).then(res => {
        if (res.data.code == 0) {
          this.$router.push("/index/accountlist");
          this.$message({
            message: res.data.msg,
            type: "success"
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>


<style scoped>
.aaa {
  width: 300px !important;
}
</style>