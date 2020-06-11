<template>
  <div class="backstage">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img src="../../assets/imgs/1.png" alt />
          <div class="rbox">
            <p>总订单</p>
            <span>{{totalOrder}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img src="../../assets/imgs/2.png" alt />
          <div class="rbox">
            <p>总销售额</p>
            <span>{{totalAmount}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img src="../../assets/imgs/3.png" alt />
          <div class="rbox">
            <p>今日订单</p>
            <span>{{todayOrder}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img src="../../assets/imgs/4.png" alt />
          <div class="rbox">
            <p>今日销售额</p>
            <span>{{totayAmount}}</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <div id="myChart"></div>
  </div>
</template>

<script>
import { API_ORDER_TOTALDATA } from "@/api/api";
import echarts from "echarts";
export default {
  data() {
    return {
      todayOrder: 0, //今日订单
      totalAmount: 0, //总销售额
      totalOrder: 0, //总订单
      totayAmount: 0 //今日销售额
    };
  },
  mounted() {
    var mycharts = echarts.init(document.getElementById("myChart"));
    mycharts.showLoading();
    API_ORDER_TOTALDATA().then(res => {
      let {
        xData,
        orderData,
        amountData,
        todayOrder,
        totalAmount,
        totalOrder,
        totayAmount
      } = res.data;

      this.totalOrder = totalOrder;
      this.totalAmount = totalAmount;
      this.totayAmount = totayAmount;
      this.todayOrder = todayOrder;

      let option = {
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单数据", "金额数据"]
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
          data: xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: orderData
          },
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: amountData
          }
        ]
      };
      mycharts.setOption(option);
      mycharts.hideLoading();
    });
  }
};
</script>

<style scoped>
.backstage .el-row {
  margin-bottom: 20px;
}
.backstage .el-col {
  border-radius: 4px;
}
.backstage .bg-purple-dark {
  background: #99a9bf;
}
.backstage .bg-purple {
  background: #ffffff;
}
.backstage .bg-purple-light {
  background: #e5e9f2;
}
.backstage .grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.backstage .row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.backstage img {
  width: 80px;
  height: 90px;
}

.backstage .grid-content {
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.backstage .rbox {
  width: 150px;
  font-size: 22px;
  text-align: center;
  padding-right: 20px;
}
.backstage .rbox > p {
  color: #333333;
}
.backstage .rbox > span {
  color: #333333;
  font-weight: 900;
}
#myChart {
  width: 100%;
  height: 500px;
  padding-top: 50px;
  background-color: #fff;
}
</style>