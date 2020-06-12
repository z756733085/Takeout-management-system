<template>
  <el-card class="box-card">
    <h1>修改账号</h1>
    <el-divider></el-divider>
    <el-form :model="myForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号">
        <el-input type="text" class="aaa" v-model="myForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户组">
        <el-select v-model="myForm.region" placeholder="请选择用户组">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Onsubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { API_EDIT_ACCOUNT } from "../../../api/api";

export default {
  data() {
    return {
      myForm: {
        name: "",
        region: "普通管理员",
        id: ""
      }
    };
  },
  mounted() {
    this.myForm.id = this.$route.params.id;
    // console.log(this.id);
  },
  methods: {
    Onsubmit() {
      API_EDIT_ACCOUNT(
        this.myForm.id,
        this.myForm.name,
        this.myForm.region
      ).then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.$router.push("/index/accountlist");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>


<style scoped>
.aaa {
  width: 300px !important;
}
</style>