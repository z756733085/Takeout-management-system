<template>
  <div>
    <div slot="header">
      <h1>商品列表</h1>
      <el-divider></el-divider>
    </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <el-avatar :size="60">
                  <!-- <img :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+props.row.imgUrl" /> -->
                  <img :src="imgServeUrl + props.row.imgUrl" />
                </el-avatar>
              </el-form-item>
              <el-form-item label="创建时间" >
                <span>{{ date(props.row.ctime) }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片" prop="imgUrl">
          <template slot-scope="scope">
            <img :src="imgServeUrl + scope.row.imgUrl" />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button> -->
            <el-popconfirm title="确认删除这条用户数据吗?" @onConfirm="handleDelete(scope.row.id)">
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 嵌套的表单编辑商品 -->
      <el-dialog title="商品编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品名称">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-input v-model="form.category" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="商品图片地址">
            <el-input v-model="form.imgUrl" autocomplete="off"></el-input> 
          </el-form-item>-->
          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.imgUrl" :src="imgServeUrl + form.imgUrl" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="商品描述">
            <el-input v-model="form.goodsDesc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </el-dialog>

      <div class="block">
        <el-pagination
          @current-change="updateList($event,pageSize)"
          @size-change="updateList(currentPage,$event)"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  API_DOODS_LIST,
  API_DEL_GOODS,
  API_EDIT_GOODS
} from "../../../api/api";
export default {
  created() {
    API_DOODS_LIST(this.currentPage, this.pageSize).then(res => {
      this.total = res.data.total;
      this.tableData = res.data.data;
    });
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 5,
      tableData: [],
      dialogFormVisible: false, //隐藏的编辑表单
      imgServeUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      form: {
        //表单数据
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
        id: ""
      }
    };
  },
  methods: {
    //点击分页选项更新页面数据
    updateList(currentPage, pageSize) {
      API_DOODS_LIST(currentPage, pageSize).then(res => {
        this.total = res.data.total;
        this.tableData = res.data.data;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
      });
    },
    //删除商品
    handleDelete(id) {
      API_DEL_GOODS(id).then(() => {
        this.$message({
          message: "商品数据删除成功!",
          type: "success"
        });
        this.updateList(this.currentPage, this.pageSize);
      });
    },
    //获取编辑并保存到表单数据
    handleEdit(obj) {
      this.dialogFormVisible = true;
      this.form = JSON.parse(JSON.stringify(obj));
    },
    //保存编辑
    saveEdit() {
      this.dialogFormVisible = false;
      API_EDIT_GOODS(
        this.form.name,
        this.form.category,
        this.form.price,
        this.form.imgUrl,
        this.form.goodsDesc,
        this.form.id
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "商品修改成功",
            type: "success"
          });
          this.updateList(this.currentPage, this.pageSize);
        } else {
          this.$message({
            showClose: true,
            message: "商品编辑失败,请稍后再试",
            type: "error"
          });
        }
      });
    },
    // 上传图片
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg });
        this.form.imgUrl = imgUrl;
      }
    },
    //上传类型
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
    //时间转换
    date(arr) {
      if (typeof arr == "string") {
        let date = new Date(arr);
        //获取年
        let year = date.getFullYear();
        let month = date.getMonth();
        month = month < 9 ? "0" + (month + 1) : month + 1;
        let day = date.getDate();
        day = day < 10 ? "0" + day : day;
        let h = date.getHours();
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        arr = `${year}-${month}-${day} ${h}:${m}:${s}`;
        return arr;
      } else {
        for (let i in arr) {
          // console.log(arr[i]);
          let date = new Date(arr[i]);
          //获取年
          let year = date.getFullYear();
          let month = date.getMonth();
          month = month < 9 ? "0" + (month + 1) : month + 1;
          let day = date.getDate();
          day = day < 10 ? "0" + day : day;
          let h = date.getHours();
          h = h < 10 ? "0" + h : h;
          let m = date.getMinutes();
          m = m < 10 ? "0" + m : m;
          let s = date.getSeconds();
          s = s < 10 ? "0" + s : s;
          arr[i] = `${year}-${month}-${day} ${h}:${m}:${s}`;
        }
        return arr;
      }
    }
  }
};
</script>

<style scoped>
.content .cell img{
  width: 187px!important;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.block {
  margin-top: 20px;
}
.avatar {
  /* width: 178px;
  height: 178px; */
  display: block;
}
.avatar-uploader{
  width: 300px;
}
</style>