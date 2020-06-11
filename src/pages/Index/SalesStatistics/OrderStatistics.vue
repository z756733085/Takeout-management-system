<template>
  <div class="statistics_order">
    <div slot="header">
      <h1>订单统计</h1>
      <el-divider></el-divider>
    </div>
    <!-- 时间搜索 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="时间范围">
        <div class="block">
          <el-date-picker
            v-model="value"
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
  mounted() {
    this.onSubmit();
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value: ''
    };
  },
  methods: {
    date(arr) {
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
    },
    onSubmit() {
      API_ORDER_ORDERTOTAL(JSON.stringify(this.date(this.value))).then(res => {
       if (res.data.data.length==0) return alert('无此段数据，请点击确定取消本次查询')
        let date = [];
        let amount = [];
        for (let i in res.data.data) {
          date.push(res.data.data[i].orderTime);
          amount.push(res.data.data[i].orderAmount);
        }
        date = this.date(date);
        var myecharts = echarts.init(document.getElementById("myChart"));
        let option = {
          xAxis: {
            type: "category",
            data: date
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: amount,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.8)"
              }
            }
          ]
        };
        myecharts.showLoading();
        setTimeout(() => {
          myecharts.setOption(option);
          myecharts.hideLoading();
        }, 1500);
      });
    }
  }
};
// export default {
//   data() {
//     return {
//       value2: "",
//       // xData: [],
//       // yData: []
//     };
//   },
//   mounted() {
//     var mycharts = echarts.init(document.getElementById("myChart"));
//     mycharts.showLoading();
//     API_ORDER_ORDERTOTAL(this.date).then(res => {
//       console.log(res);

//       let {  orderTime, orderAmount } = res.data;
//       let option = {
//         title: {
//           text: "数据统计"
//         },
//         tooltip: {
//           trigger: "axis"
//         },
//         legend: {
//           data: ["下单时间", "订单金额"]
//         },
//         grid: {
//           left: "3%",
//           right: "4%",
//           bottom: "3%",
//           containLabel: true
//         },
//         toolbox: {
//           feature: {
//             saveAsImage: {}
//           }
//         },
//         //x轴标题
//         xAxis: {
//           type: "category",
//           boundaryGap: false,
//           data: orderTime
//         },
//         yAxis: {
//           type: "value"
//         },
//         series: [
//           {
//             name: "下单时间",
//             type: "line",
//             stack: "总量",
//             data: orderTime
//           },
//           {
//             name: "订单金额",
//             type: "line",
//             stack: "总量",
//             data: orderAmount
//           }
//         ]
//       };
//       mycharts.setOption(option);
//       mycharts.hideLoading();
//     });
//   },
//   methods: {
//     onSubmit() {
//       console.log("submit!");
//     }
//   }
// };
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