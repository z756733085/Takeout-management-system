<template>
  <div class="main">
    <el-row class="cle">
      <el-col>
        <div class="grid-content bg-purple">
          <h1>系统登录</h1>

          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="name">
              <el-input
                placeholder="请输入账号"
                prefix-icon="el-icon-s-custom"
                v-model="ruleForm.name"
                clearable
                class="on"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                v-model="ruleForm.pwd"
                show-password
                class="in"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm" class="btn on">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <router-view />
  </div>
</template>


<script>
import { API_LOGIN } from "../api/api";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pwd: "",
        isreq: true
      },
      rules: {
        name: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    submitForm() {
      // this.$router.push("/index/home");
      if (this.isreq == false) return;

      //发送一次登录请求，把标识设置为false
      this.isreq = false;

      //发送请求
      API_LOGIN(this.ruleForm.name, this.ruleForm.pwd).then(res => {
        console.log(res.data.id);
        localStorage.setItem("userId", res.data.id);

        if (res.data.code == 0) {
          //登录成功!
          this.$message({
            message: res.data.msg,
            type: "success"
          });

          // 保存token,账号名,权限到浏览器
          localStorage.token = res.data.token;
          localStorage.acc = this.ruleForm.name;
          localStorage.role = res.data.role;
          // localStorage.id = res.data.id;

          setTimeout(() => {
            this.$router.push("/index/home");
          }, 1000);
        } else {
          this.$message.error(res.data.msg);
          this.error_text = true;
        }
      });

      setTimeout(() => {
        this.isreq = true; //3秒后，又可以进行点击
      }, 3000);
    }
  },

  created(){

  }
};
</script>


<style scoped>
.main {
  color: #fff;
  width: 100%;
  height: 100%;
  background-color: rgb(84, 92, 100);
  display: flex;
  justify-content: center;
  align-items: center;
}

.main .btn {
  width: 100%;
}

.on {
  margin-top: 30px;
}

.bg-purple {
  width: 300px;
  text-align: center;
}
</style>