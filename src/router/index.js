import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import { API_CHECK_TOKEN } from "@/api/api"

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
  routes: [
    { path: '/', name: 'Login', component: Login },//登录页面
    { path: '/logout', component: () => import('../pages/Logout.vue') },//退出
    {
      path: '/index', name: 'Index', component: () => import('../pages/Index.vue'), children: [
        { path: '/index/home', name: 'Home', component: () => import('../pages/Index/Home.vue'), meta: { role: ["super", "normal"], title: ['后台首页'] } },//后台首页
        { path: '/index/ordermanagement', name: 'Ordermanagement', component: () => import('../pages/Index/OrderManagement.vue'), meta: { role: ["super", "normal"], title: ['订单管理'] } },//订单管理
        { path: '/index/productlist', name: 'Productlist', component: () => import('../pages/Index/CommodityManagement/ProductList.vue'), meta: { role: ["super", "normal"], title: ['商品管理', '商品列表'] } },//商品列表
        { path: '/index/productaddition', name: 'Productaddition', component: () => import('../pages/Index/CommodityManagement/ProductAddition.vue'), meta: { role: ["super", "normal"], title: ['商品管理', '商品添加'] } },//商品添加
        { path: '/index/commodityclassification', name: 'Commodityclassification', component: () => import('../pages/Index/CommodityManagement/CommodityClassification.vue'), meta: { role: ["super", "normal"], title: ['商品管理', '商品分类'] } },//商品分类
        { path: '/index/storemanagement', name: 'Storemanagement', component: () => import('../pages/Index/StoreManagement.vue'), meta: { role: ["super"], title: ['店铺管理'] } },//店铺管理
        { path: '/index/accountlist', name: 'Accountlist', component: () => import('../pages/Index/AccountManagement/AccountList.vue'), meta: { role: ["super"], title: ['账号管理', '账号列表'] } },//账号列表
        { path: '/index/adminedit/:id', name: 'Adminedit', component: () => import('../pages/Index/AccountManagement/AdminEdit.vue'), meta: { role: ["super"], title: ['账号管理', '修改账号'] } },//修改账号
        { path: '/index/addaccount', name: 'Addaccount', component: () => import('../pages/Index/AccountManagement/AddAccount.vue'), meta: { role: ["super"], title: ['账号管理', '添加账号'] } },//添加账号
        { path: '/index/changepassword', name: 'Changepassword', component: () => import('../pages/Index/AccountManagement/ChangePassword.vue'), meta: { role: ["super"], title: ['账号管理', '修改密码'] } },//修改密码
        { path: '/index/commoditystatistics', name: 'Commoditystatistics', component: () => import('../pages/Index/SalesStatistics/CommodityStatistics.vue'), meta: { role: ["super"], title: ['销售统计', '商品统计'] } },//商品统计
        { path: '/index/orderstatistics', name: 'Orderstatistics', component: () => import('../pages/Index/SalesStatistics/OrderStatistics.vue'), meta: { role: ["super"], title: ['销售统计', '订单统计'] } },//订单统计
        { path: '/index/about', name: 'About', component: () => import('../pages/About.vue'), meta: { role: ["super", "normal"], title: ['管理员信息'] } },//管理员信息
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.role && !to.meta.role.includes(localStorage.role)) {
    next("/")
  }

  if (to.path != '/') {
    API_CHECK_TOKEN(localStorage.token).then(res => {
      console.log(res)
      if (res.data.code == 0) {
        next()
      } else {
        next('/')
      }
    })
  } else next()
})

export default router