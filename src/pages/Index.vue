<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <el-row>
          <el-col class="lh">
            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              background-color="#304156"
              text-color="#fff"
              active-text-color="#409eff"
              router
              unique-opened
            >
              <el-menu-item class="waimai">
                <i class="el-icon-dish"></i>
                <span slot="title">外卖商家中心</span>
              </el-menu-item>
              <div v-for="item in newtreelist" :key="item.index">
                <!-- submenu: 可展开带二级选项卡 -->
                <el-submenu v-if="item.children" :index="item.index">
                  <template slot="title">
                    <i :class="item.icls"></i>
                    <span>{{ item.title }}</span>
                  </template>

                  <!-- 二级儿子标题 -->
                  <el-menu-item
                    v-for="child in item.children"
                    :key="child.index"
                    :index="child.index"
                  >
                    <i :class="child.icls"></i>
                    <span slot="title">{{ child.title }}</span>
                  </el-menu-item>
                </el-submenu>
                <!-- menu-item: 一级选项卡，不带展开 -->
                <el-menu-item v-else :index="item.index">
                  <i :class="item.icls"></i>
                  <span slot="title">{{ item.title }}</span>
                </el-menu-item>
              </div>
              <!-- <el-menu-item index="/index/home">
                <i class="el-icon-menu"></i>
                <span slot="title">后台首页</span>
              </el-menu-item>
              <el-menu-item index="/index/ordermanagement">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">订单管理</span>
              </el-menu-item>
              <el-submenu index="/index/productlist">
                <template slot="title">
                  <i class="el-icon-shopping-bag-1"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/index/productlist">商品列表</el-menu-item>
                  <el-menu-item index="/index/productaddition">商品添加</el-menu-item>
                  <el-menu-item index="/index/commodityclassification">商品分类</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/index/storemanagement">
                <i class="el-icon-s-shop"></i>
                <span slot="title">店铺管理</span>
              </el-menu-item>
              <el-submenu index="/index/accountlist">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span>账号管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/index/accountlist">账号列表</el-menu-item>
                  <el-menu-item index="/index/addaccount">添加账号</el-menu-item>
                  <el-menu-item index="/index/changepassword">修改密码</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="/index/commoditystatistics">
                <template slot="title">
                  <i class="el-icon-pie-chart"></i>
                  <span>销售统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/index/commoditystatistics">商品统计</el-menu-item>
                  <el-menu-item index="/index/orderstatistics">订单统计</el-menu-item>
                </el-menu-item-group>
              </el-submenu>-->
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(v,i) in this.$route.meta.title" :key="i">{{v}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-dropdown class="demo-type">
            <span class="el-dropdown-link">
              欢迎你：{{acc}}
              <el-avatar>
                <img :src="pic" />
              </el-avatar>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/index/about">管理员信息</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/logout">退出系统</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { API_CHECK_TOKEN, API_USERS_ACCOUNTINFO } from "@/api/api";
export default {
  data() {
    return {
      pic: "",
      // username: "请登录",
      acc: localStorage.acc,
      role: "",
      // treelist: 左侧动态菜单数据
      //   index: 点击树选项卡，跳转的hash值
      //   icls: 树选项卡，前面的图标
      //   title: 树选项卡的一级名字
      //   children: 一级选项卡下面的二级菜单（选项卡） 带children属性的选项卡可以展开
      treelist: [
        {
          index: "/index/home",
          icls: "el-icon-menu",
          title: "后台首页",
          role: ["super", "normal"]
        },
        {
          index: "/index/ordermanagement",
          icls: "el-icon-edit-outline",
          title: "订单管理",
          role: ["super", "normal"]
        },
        {
          index: "shopping",
          icls: "el-icon-shopping-bag-1",
          title: "商品管理",
          role: ["super", "normal"],
          children: [
            { index: "/index/productlist", title: "商品列表" },
            { index: "/index/productaddition", title: "商品添加" },
            { index: "/index/commodityclassification", title: "商品分类" }
          ]
        },
        {
          index: "/index/storemanagement",
          icls: "el-icon-s-shop",
          title: "店铺管理",
          role: ["super"]
        },
        {
          index: "account",
          icls: "el-icon-user",
          title: "账号管理",
          role: ["super"],
          children: [
            { index: "/index/accountlist", title: "账号列表" },
            { index: "/index/addaccount", title: "添加账号" },
            { index: "/index/changepassword", title: "修改密码" }
          ]
        },
        {
          index: "sale",
          icls: "el-icon-pie-chart",
          title: "销售统计",
          role: ["super"],
          children: [
            { index: "/index/commoditystatistics", title: "商品统计" },
            { index: "/index/orderstatistics", title: "订单统计" }
          ]
        }
      ]
    };
  },
  created() {
    API_CHECK_TOKEN(localStorage.token).then(res => {
      if (res.data.code == 0) {
        this.username = localStorage.acc;
      } else {
        this.username = "<a href='#/'>请登录</a>";
      }
    });
    API_USERS_ACCOUNTINFO(localStorage.getItem("userId")).then(res => {
      this.pic = res.data.accountInfo.imgUrl;
      // console.log(res);
    });

    this.role = localStorage.role;
  },
  
  computed: {
    newtreelist() {
      return this.treelist.filter(i => i.role.includes(this.role));
    }
  },

  mounted() {}

  /*   // 监听,当路由发生变化的时候执行
  watch: {
    $route: {
      handler: function(val) {
        console.log(val);
      },
      // 深度观察监听
      deep: true
    }
  }, */
};
</script>

<style scoped>
.home,
.home .el-container {
  height: 100%;
  background-color: #304156;
}

.waimai {
  height: 60px;
  font-size: 24px;
}
.waimai > i {
  width: 40px;
  height: 40px;
  background-color: #1296db;
  color: #000;
  line-height: 40px;
  font-size: 24px;
  border-radius: 20px;
}
.el-menu {
  border-right: 0;
}
.el-aside {
  width: 230px !important;
}

.el-breadcrumb {
  height: 60px;
  line-height: 60px !important;
}
.demo-type {
  text-align: center;
  margin-right: 30px;
  line-height: 60px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-avatar {
  vertical-align: middle;
}
a {
  color: #1296db !important;
  text-decoration: none;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.el-main {
  background: #f0f2f5;
}
</style>