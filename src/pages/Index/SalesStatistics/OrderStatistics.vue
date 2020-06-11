<template>
  <div class="statistics_order">
    <div slot="header">
      <h1>订单统计</h1>
      <el-divider></el-divider>
    </div>
    <!-- 时间搜索 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="时间范围">
        <div class="block">
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 折线图 -->
    <div id="myChart"></div>
  </div>
</template>

<script>
import { API_ORDER_ORDERTOTAL } from "@/api/api";
import echarts from "echarts";
export default {
  data() {
    return {
      value2: "",
      // xData: [],
      // yData: []
    };
  },
  mounted() {
    var mycharts = echarts.init(document.getElementById("myChart"));
    mycharts.showLoading();
    API_ORDER_ORDERTOTAL(this.date).then(res => {
      console.log(res);

      let {  orderTime, orderAmount } = res.data;
      let option = {
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["下单时间", "订单金额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        //x轴标题
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: orderTime
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "下单时间",
            type: "line",
            stack: "总量",
            data: orderTime
          },
          {
            name: "订单金额",
            type: "line",
            stack: "总量",
            data: orderAmount
          }
        ]
      };
      mycharts.setOption(option);
      mycharts.hideLoading();
    });
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
.statistics_order .demonstration {
  color: #8d8f93;
  margin-right: 20px;
}
#myChart {
  width: 100%;
  height: 500px;
  padding-top: 50px;
  background-color: #fff;
}
</style>