<template>
  <div class="order">
    <div slot="header">
      <h1>订单管理</h1>
      <el-divider></el-divider>
    </div>
    <!-- 查询表单 -->
    <el-form size="small" :inline="true" :model="searchForm" class="search-form">
      <!-- 订单号 -->
      <el-form-item label="订单号">
        <el-input v-model="searchForm.orderNo" placeholder="订单号"></el-input>
      </el-form-item>

      <!-- 收货人 -->
      <el-form-item label="收货人">
        <el-input v-model="searchForm.consignee" placeholder="收货人"></el-input>
      </el-form-item>

      <!-- 手机号 -->
      <el-form-item label="手机号">
        <el-input v-model="searchForm.phone" placeholder="手机号"></el-input>
      </el-form-item>

      <!-- 订单状态 -->
      <el-form-item label="订单状态">
        <el-select v-model="searchForm.orderState" placeholder="订单状态">
          <el-option label="已受理" value="已受理"></el-option>
          <el-option label="派送中" value="派送中"></el-option>
          <el-option label="已完成" value="已完成"></el-option>
        </el-select>
      </el-form-item>

      <!-- 选择时间 -->
      <el-form-item label="选择时间">
        <el-date-picker
          v-model="searchForm.date"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 1000px; margin-top: 30px;">
      <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="160"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="300"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="160"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 翻页 -->
    <div style="margin-top: 30px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { API_ORDER_LIST } from "@/api/api";
// import moment from "moment";

export default {
  data() {
    return {
      // 查询表单
      searchForm: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: []
      },
      // 表格数据
      tableData: [],
      total: 0, // 总条数
      pageSize: 5, // 每页条数
      currentPage: 1 // 当前页
    };
  },
  methods: {
    // 搜索
    search() {
      this.getData();
    },
    // 重置
    reset() {
      // 清空表单
      this.searchForm = {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: []
      };
      this.getData(); // 重新请求数据
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    // 获取数据
    getData() {
      API_ORDER_LIST(
        this.currentPage,
        this.pageSize,
        this.searchForm.orderNo,
        this.searchForm.consignee,
        this.searchForm.phone,
        this.searchForm.orderState,
        this.searchForm.date
      ).then(res => {
        this.total = res.data.total
        this.tableData = res.data.data
      });
    },
    // 查看
    handleClick(row) {
      this.$router.push({
        path: "/index/orderstatistics",
        query: {
          id: row.id
        }
      });
    }
  },
  created() {
    this.getData(); // 调用获取数据的函数
  }
};
</script>



<style scoped>
.pos {
  margin-top: 50px;
  margin-bottom: 50px;
}
.box {
  margin-bottom: 20px;
}
</style>