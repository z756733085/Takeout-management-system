<template>
  <div class="goods_add">
    <div slot="header">
      <h1>修改商品</h1>
      <el-divider></el-divider>
    </div>
    <div class="aaa">
      <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="商品分类" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择商品分类">
            <el-option label="分类一" value="分类一"></el-option>
            <el-option label="分类二" value="分类二"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品特色" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="新品上市" name="type"></el-checkbox>
            <el-checkbox label="第二单半价" name="type"></el-checkbox>
            <el-checkbox label="主打产品" name="type"></el-checkbox>
            <el-checkbox label="火爆产品" name="type"></el-checkbox>
            <el-checkbox label="祖传手艺" name="type"></el-checkbox>
            <el-checkbox label="源自四川" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            action="http://work.08321.org/sell/goods.php?a=uploadImg"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="是否促销" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="促销"></el-radio>
            <el-radio label="不促销"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="食品规格" prop="specifications">
          <el-radio-group v-model="ruleForm.specifications">
            <el-radio label="单规格"></el-radio>
            <el-radio label="多规格"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="包装费" prop="packingCharges">
          <el-input-number v-model="ruleForm.num" @change="handleChange" :min="0" label="描述文字"></el-input-number>
        </el-form-item>

        <el-form-item label="价格" prop="price">
          <el-input-number v-model="ruleForm.num1" @change="handleChange" :min="0" label="描述文字"></el-input-number>
        </el-form-item>

        <el-form-item label="商品描述" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onsubmitForm('ruleForm')">修改</el-button>
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
      imageUrl: "",
      ruleForm: {
        name: "",
        region: "",
        num: "",
        desc: ""
      }
    };
  },
  mounted() {
    this.ruleForm.id = this.$route.params.id;
    this.axios.get("/goods.php?a=readOne&id=" + this.ruleForm.id).then(d => {
      this.ruleForm.name = d.data.data.goodsname;
      this.ruleForm.region = d.data.data.goodscategory;
      this.ruleForm.num = d.data.data.price;
      this.ruleForm.desc = d.data.data.goodsdesc;
      this.imageUrl = d.data.data.imgUrl;
    });
  },
  methods: {
    onsubmitForm() {
      var data = {
        name: this.ruleForm.name,
        category: this.ruleForm.region,
        price: this.ruleForm.num,
        imgUrl: this.imageUrl,
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
    uploadSuccess(res, file) {
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
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