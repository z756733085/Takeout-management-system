<template>
  <div>
    <div class="head">
      <h1>商品分类</h1>
      <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>
    </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="ID" width="300"><template slot-scope="scope">{{scope.row.id}}</template></el-table-column>
        <el-table-column label="分类名称" width="300">
          <template slot-scope="scope">
            <span v-show="scope.row.flag" v-html="scope.row.cateName" style="margin-left: 10px"></span>
            <el-input v-show="!scope.row.flag" v-model="scope.row.cateName" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="300">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.flag"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index,scope.row.id)"
              v-text="scope.row.flag?'编辑':'保存'"
            ></el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class='block'>
        <el-pagination
          @current-change="updateList($event,pageSize)"
          @size-change="updateList(currentPage,$event)"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>

        <!-- 嵌套的表单添加分类 -->
        <el-dialog title="分类添加" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth">
              <el-input v-model="form.cateName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" :label-width="formLabelWidth">
              <!-- <el-select v-model="form.state">
              <el-option label="立即启用" value='true'></el-option>
              <el-option label="暂不启用" value='false'></el-option>
              </el-select>-->
              <el-switch
                v-model="form.state"
                active-value="true"
                inactive-value="false"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
// import { Catelist_api } from "../../../api/apis.js"; //获取商品分类
// import { Delcate_api } from "../../../api/apis.js"; //删除商品分类
// import { Editcate_api } from "../../../api/apis.js"; //修改商品分类
// import { Addcate_api } from "../../../api/apis.js"; //添加商品分类
import { API_GET_TYPE, API_DEL_TYPE, API_ADD_TYPE,API_CHANGE_TYPE } from "../../../api/api.js";
export default {
  //获取列表
  created() {
    API_GET_TYPE(this.currentPage, this.pageSize).then(res => {
      this.total = res.data.total;
      for (let item of res.data.data) {
        item.flag = true;
      }
      this.tableData = res.data.data;
    });
  },
  data() {
    return {
      dialogFormVisible: false, //隐藏的编辑表单
      form: {
        //表单数据
        cateName: "",
        state: ""
        // date1: '',
        // date2: '',
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: ''
      },
      formLabelWidth: "120px", //表单宽度
      currentPage: 1, //当前页
      pageSize: 5, //当前条数
      total: 0, //总条数
      tableData: [
        // {
        //   id: "1",
        //   cateName: "粥类",
        //  state:1
        // }
      ]
    };
  },
  methods: {
    //分类编辑
    handleEdit(index, id) {
      if (this.tableData[index].flag) {
        this.tableData[index].flag = false;
      } else {
        API_CHANGE_TYPE(
          id,
          this.tableData[index].cateName,
          this.tableData[index].state == 1 ? "true" : "false"
        ).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "恭喜你，修改成功",
              type: "success"
            });
          } else {
            this.$message.error("修改失败，请重试");
          }
          //this.tableData[index].flag = true;
        });
        this.tableData[index].flag = true;
      }
    },
    //商品分类删除
    handleDelete(id) {
      if (confirm("是否确定移除该分类信息？")) {
        API_DEL_TYPE(id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              showClose: true,
              message: "商品分类已经成功从列表移除",
              type: "success"
            });
            this.updateList(this.currentPage, this.pageSize);
          } else {
            this.$message({
              showClose: true,
              message: "很抱歉,分类移除失败,请稍后重试或登陆更高权限",
              type: "error"
            });
          }
        });
      }
    },
    //改变页码和条数触发更新列表
    updateList(currentPage, pageSize) {
      API_GET_TYPE(currentPage, pageSize).then(res => {
        this.total = res.data.total;
        for (let item of res.data.data) {
          item.flag = true;
        }
        this.tableData = res.data.data;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
      });
    },

    //添加商品分类
    saveEdit() {
      this.dialogFormVisible = false;
      // console.log(this.form.state);
      API_ADD_TYPE(this.form.cateName, this.form.state).then(res => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "分类添加成功",
            type: "success"
          });
          this.updateList(this.currentPage, this.pageSize);
        } else {
          this.$message({
            showClose: true,
            message: "账号编辑失败,请稍后再试",
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
}
.block {
  margin-top: 8px;
}
</style>