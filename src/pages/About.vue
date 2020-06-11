<template>
  <div class="admininfo box">
    <h3>管理员信息</h3>
    <section>
      <p>
        <span>管理员ID：</span>
        {{id}}
      </p>
      <p>
        <span>账号：</span>
        {{account}}
      </p>
      <p>
        <span>用户组：</span>
        {{userGroup}}
      </p>
      <p>
        <span>创建时间：</span>
        {{ctime}}
      </p>
      <p>
        <span>管理员头像：</span>
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="onSuccess"
          :before-upload="beforeUpload"
          :data="data"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </p>
    </section>
  </div>
</template>

<script>
import { API_USERS_ACCOUNTINFO, API_HEADIMG_UPLOAD } from "../api/api";
export default {
  data() {
    return {
      id: "",
      account: "",
      userGroup: "",
      ctime: "",
      imgUrl: "",
      data: { id: localStorage.getItem("userId") }
    };
  },
  created() {
    this.fechData();
  },
  methods: {
    fechData() {
      console.log(this.url);
      API_USERS_ACCOUNTINFO(localStorage.getItem("userId")).then(res => {
        var data = res.data.accountInfo;
        this.id = data.id;
        this.account = data.account;
        this.userGroup = data.userGroup;
        this.ctime = data.ctime;
        this.imgUrl = data.imgUrl;
      });
    },
    onSuccess() {
      API_HEADIMG_UPLOAD(localStorage.getItem("userId")).then(res => {
        console.log("res", res);
      });
      window.location.reload();
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt1M;
    }
  }
};
</script>

<style>
.admininfo p {
  padding: 12px 0;
  color: #666;
  border-bottom: 1px solid #eee;
}
.admininfo p span {
  display: inline-block;
  width: 120px;
  text-align: right;
}
.admininfo p img {
  vertical-align: middle;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>