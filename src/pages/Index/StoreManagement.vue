<template>
  <div>
    <div class="head">
      <h1>店铺管理</h1>
      <!-- <el-button type="primary" class="headBtn">保存</el-button> -->
      <el-button type="primary" @click="button">{{name}}</el-button>
    </div>
    <el-divider></el-divider>
    <div>
      <el-form ref="form" :model="form" label-width="80px" :disabled="isDisabled">
        <el-form-item label="店铺名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" v-model="form.notice" :rows="6"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/shop/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->

            <img v-if="form.shopAvatar" :src="imgServeUrl + form.shopAvatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            action="http://127.0.0.1:5000/shop/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input v-model="form.deliveryFee"></el-input>
        </el-form-item>
        <el-form-item label="配送时间">
          <el-input v-model="form.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-input v-model="form.deliveryDesc"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-input v-model="form.storeRating"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="form.sales"></el-input>
        </el-form-item>
        <el-form-item label="活动">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
            <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
            <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="营业时间">
          <div class="block">
            <el-date-picker
              v-model="form.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { API_SHOP_INFO, API_SHOPR_EDIT } from "@/api/api";
export default {
  data() {
    return {
      name: "编辑",
      isDisabled: true,
      form: {
        name: "",
        notice: "",
        shopAvatar: "",
        deliveryFee: "",
        deliveryTime: "",
        deliveryDesc: "",
        storeRating: "",
        sales: "",
        type: [],
        // data1: "",
        // data2: ""
        data: []
      },
      // fileList: [],
      // newUrl: [],

      dialogImageUrl: "",
      dialogVisible: false,

      imgServeUrl: "http://127.0.0.1:5000/upload/shop/"
    };
  },
  methods: {
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },
    handleAvatarSuccess(res) {
      let { code, msg, avatar } = res;
      if (code == 0) {
        this.$message({ type: "success", message: msg });
        this.form.shopAvatar = avatar;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    handlePictureCardPreview(res) {
      let { code, msg, pics } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg });
        this.dialogImageUrl = pics;
        this.dialogVisible = true;
      }
    },
    handleSuccess(res) {
      console.log(res);
    },
    button() {
      if (this.isDisabled === true) {
        this.isDisabled = false;
        this.name = "保存";
      } else {
        let zz = {
          name: this.form.name, //名称
          bulletin: this.form.notice, //公告
          avatar: this.form.shopAvatar, //店铺头像
          pics: this.dialogImageUrl, //店铺图片
          deliveryPrice: this.form.deliveryFee, //配送费
          deliveryTime: this.form.deliveryTime, //配送时间
          description: this.form.deliveryDesc, //描述
          score: this.form.storeRating, //店铺评分
          sellCount: this.form.sales, //销量
          supports: JSON.stringify(this.form.type), //活动
          date: JSON.stringify(this.form.date) //时间
        };
        let { code } = API_SHOPR_EDIT(zz);
        if (code === 0) {
          this.isDisabled = true;
          this.name = "编辑";
        }
      }
    }
  },
  created() {
    API_SHOP_INFO().then(res => {
      let {
        name,
        bulletin,
        avatar,
        pics,
        deliveryPrice,
        deliveryTime,
        description,
        score,
        sellCount,
        supports,
        date
      } = res.data.data;
      this.form.name = name; //名称
      this.form.notice = bulletin; //公告
      this.form.shopAvatar = avatar; //店铺头像
      this.dialogImageUrl = pics; //店铺图片
      this.form.deliveryFee = deliveryPrice; //配送费
      this.form.deliveryTime = deliveryTime; //配送时间
      this.form.deliveryDesc = description; //描述
      this.form.storeRating = score; //店铺评分
      this.form.sales = sellCount; //销量
      this.form.type = supports; //活动
      this.form.date = date; //时间
    });
  }
};
</script>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
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
.el-input {
  width: 40%;
}
.el-textarea {
  width: 40%;
}
.el-checkbox-group {
  width: 40%;
}

.el-button .headBtn .el-button--primary {
  width: 40%;
}
</style>