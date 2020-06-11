<template>
  <div class="statistics_goods">
    <div slot="header">
      <h1>商品统计</h1>
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
import echarts from "echarts";

export default {
  data() {
    return {
      formInline: {},
      pickerOptions: {},
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ""
    };
  },
  mounted() {
    var mycharts = echarts.init(document.getElementById("myChart"));
    mycharts.showLoading();
    let option = {
      title: {
        text: "折线图堆叠"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
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
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
    mycharts.setOption(option);
    mycharts.hideLoading();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
.statistics_goods .demonstration {
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