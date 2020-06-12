<template>
  <div class="admin_list">
    <div slot="header">
      <h1>账号列表</h1>
      <el-divider></el-divider>
    </div>
    <div id="app">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        max-height="578"
      >
        <el-table-column type="selection" width="100"></el-table-column>
        <el-table-column label="id" width="100">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <!-- prop和scope选一个 -->
        <el-table-column label="账号" prop="account" width="200">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column label="用户组" prop="userGroup" width="200">
          <template slot-scope="scope">{{ scope.row.userGroup }}</template>
        </el-table-column>
        <el-table-column label="创建时间" prop="ctime" width="300">
          <template slot-scope="scope">{{ date(scope.row.ctime) }}</template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
            <!-- <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button> -->
            <!-- <el-popconfirm title="确认删除这条用户数据吗?" @onConfirm="handleDelete(scope.row)">
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>-->
            <el-popconfirm title="确认删除这条用户数据吗?" @onConfirm="del(scope.row.id)">
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 嵌套的表单编辑账号 -->
      <el-dialog title="账号编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="账号" label-width="120px">
            <el-input v-model="form.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户组" label-width="120px">
            <el-select v-model="form.userGroup" placeholder="请选择账号分组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 翻页 -->
    <div class="block">
      <el-pagination
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 下按钮 -->
    <el-row>
      <el-button type="danger" @click="delAll">批量删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </el-row>
  </div>
</template>

<script>
import {
  API_ACCOUNT_LIST,
  API_DEL_ACCOUNT,
  API_DEL_ACCOUNT_ALL,
  API_EDIT_ACCOUNT
} from "../../../api/api";

export default {
  data() {
    return {
      nodata: true,
      page: 1, //当前页码
      total: 0, //总条数
      tableData: [],
      size: 5,
      multipleSelection: [],
      dialogFormVisible: false,
      form: {
        //表单数据
        id: "",
        account: "",
        userGroup: ""
      }
    };
  },
  methods: {
    //获取编辑并保存到表单数据
    edit(id, account, userGroup) {
      this.dialogFormVisible = true;
      this.form.id = id;
      this.form.account = account;
      this.form.userGroup = userGroup;
    },
    //保存编辑
    saveEdit() {
      this.dialogFormVisible = false;
      API_EDIT_ACCOUNT(
        this.form.id,
        this.form.account,
        this.form.userGroup
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "账号修改成功",
            type: "success"
          });
          this.getData();
        } else {
          this.$message({
            message: "账号编辑失败,请稍后再试",
            type: "error"
          });
        }
      });
    },
    //删除
    del(id) {
      API_DEL_ACCOUNT(id).then(() => {
        this.$message({
          message: "用户数据删除成功!",
          type: "success"
        });
        this.getData();
      });
    },
    handleSelectionChange(val) {
      let arr = [];
      for (let item of val) {
        arr.push(item.id);
      }
      this.multipleSelection = arr;
    },
    // 分页-每页显示数据改变时触发
    sizeChange(val) {
      this.size = val;
      this.getData();
    },
    // 分页-页码改变时触发
    pageChange(val) {
      this.page = val;
      this.getData();
    },
    // 下部按钮取消选择（完成）
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 批量删除
    delAll() {
      if (this.multipleSelection.length == 0) {
        if (this.nodata) {
          this.nodata = false;
          this.$message({
            message: "请先选中数据",
            type: "error"
          });
        }
        return;
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API_DEL_ACCOUNT_ALL(JSON.stringify(this.multipleSelection)).then(
          res => {
            if (res.data.code == 0) {
              this.$message({
                message: "批量删除成功",
                type: "success"
              });
              this.getData();
            } else {
              this.$message({
                message: "批量删除失败,请稍后重试或登陆更高权限",
                type: "error"
              });
            }
          }
        );
      });
    },
    //更新页面
    getData() {
      // 发请求拉数据
      API_ACCOUNT_LIST(this.page, this.size).then(res => {
        this.tableData = res.data.data;
        // 从数据中心获取总条数并转整数  赋值给分页组件
        this.total = parseInt(res.data.total);
      });
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
  },
  //创建组件对象时获取数据 利用生命周期函数
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.admin_list .text {
  font-size: 14px;
}

.admin_list .item {
  margin-bottom: 18px;
}

.admin_list .clearfix:before,
.admin_list .clearfix:after {
  display: table;
  content: "";
}
.admin_list .clearfix:after {
  clear: both;
}

.admin_list .box-card {
  width: 100%;
}
.admin_list .block {
  margin: 20px 0;
}
.admin_list .el-card {
  height: 600px !important;
}
</style>