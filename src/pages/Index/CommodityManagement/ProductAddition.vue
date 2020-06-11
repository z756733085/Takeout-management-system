<template>
  <div class="goods_add">
    <div slot="header">
      <h1>商品添加</h1>
      <el-divider></el-divider>
    </div>
    <div class="aaa">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="商品分类" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择商品分类">
            <el-option label="分类一" value="分类一"></el-option>
            <el-option label="分类二" value="分类二"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品价格" prop="price">
          <el-input-number v-model="ruleForm.num" @change="handleChange" :min="0" label="描述文字"></el-input-number>
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="ruleForm.imageUrl" :src="imgServeUrl + ruleForm.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品描述" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即新增</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { API_ADD_GOODS } from "../../../api/api";

export default {
  data() {
    return {
      imgServeUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      ruleForm: {
        name: "",
        region: "",
        num: "",
        desc: "",
        imageUrl: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, message: "长度在 2 个字符以上", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        imageUrl: [
          {
            required: true,
            message: "请添加商品图片",
            trigger: "change"
          }
        ],
        desc: [{ required: true, message: "请填写商品描述", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      var data = {
        name: this.ruleForm.name,
        category: this.ruleForm.region,
        price: this.ruleForm.num,
        imgUrl: this.ruleForm.imageUrl,
        goodsDesc: this.ruleForm.desc
      };
      API_ADD_GOODS(data).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$router.push("/index/productlist");
          this.$message({
            message: "添加成功！",
            type: "success"
          });
        } else {
          this.$message.error(res.data.msg);
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    uploadSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg });
        this.ruleForm.imageUrl = imgUrl;
      }
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

<style scoped>
.goods_add .aaa {
  width: 600px;
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
.goods_add .avatar-uploader-icon {
  line-height: 178px !important;
}
</style>