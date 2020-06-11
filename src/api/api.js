import axios from 'axios'
// 设置服务器IP地址
axios.defaults.baseURL = 'http://127.0.0.1:5000'


// API: 1. 登录
//  account:用户名
//  password:密码
export const API_LOGIN = (account, password) =>
    axios.post("/users/checkLogin", { account, password })

// API: 2. 添加账号
//  account:用户名
//  password:密码
//  userGroup:用户组  超级管理员|普通管理员
export const API_ADD_ACCOUNT = (account, password, userGroup) =>
    axios.post("/users/add", { account, password, userGroup })

// API: 3. 获取账号列表
// currentPage:当前页码
// pageSize:每页条数
export const API_ACCOUNT_LIST = (currentPage, pageSize) =>
    axios.get("/users/list", { params: { currentPage, pageSize } })

// API: 4. 删除账号
// id:要删除账号的id
export const API_DEL_ACCOUNT = (id) =>
    axios.get("/users/del", { params: { id } })

// API: 5. 批量删除账号
// ids:要删除数据的id组成的数组（字符串格式的数组，如: ‘[1, 2, 3]’,需要转为字符串格式）
export const API_DEL_ACCOUNT_ALL = (ids) =>
    axios.get("/users/batchdel", { params: { ids } })

// API: 6. 修改账号
// id:要修改账号的id
// account:账号
// userGroup:用户组
export const API_EDIT_ACCOUNT = (id, account, userGroup) =>
    axios.post("/users/edit", { id, account, userGroup })

// API: 7. 检查旧密码是否正确
// oldPwd:旧密码
export const API_CHECK_PASSWORD = (id, oldPwd) =>
    axios.get("/users/checkoldpwd", { params: { id, oldPwd } })

// API: 8. 修改密码
// newPwd:新密码
export const API_CHANGE_PASSWORD = (id, newPwd) =>
    axios.post("/users/editpwd", { id, newPwd })

// API: 9. 获取账号（个人中心）信息/users/accountinfo
export const API_USERS_ACCOUNTINFO = (id) =>
    axios.get("/users/accountinfo", { params: { id } })

// API: 10. 头像上传接口
//id:帐号id
export const API_HEADIMG_UPLOAD = (id) =>
    axios.post("/users/avatar_upload", { id })

// API: 11. 修改用户头像
// imgUrl:头像文件名 如: xxx.jpg
// export const API_CHANGE_HEADIMG = (imgUrl) =>
//     axios.get("/users/avataredit", { params: { imgUrl } })

// API: 11. 验证token是否过期
// token:用户登录保存的token
export const API_CHECK_TOKEN = (token) =>
    axios.get("/users/checktoken", { params: { token } })

// API: 12. 添加分类
// cateName:分类名称
// state:是否启用
export const API_ADD_TYPE = (cateName, state) =>
    axios.post("/goods/addcate", { cateName, state })

// API: 13. 获取分类
// currentPage:当前页
// pageSize:每页条数
export const API_GET_TYPE = (currentPage, pageSize) =>
    axios.get("/goods/catelist", { params: { currentPage, pageSize } })

// API: 14. 删除分类
// id:分类id
export const API_DEL_TYPE = (id) =>
    axios.get("/goods/delcate", { params: { id } })

// API: 15. 修改分类
// id:分类id
// cateName:分类名称
// state:分类状态
export const API_CHANGE_TYPE = (id, cateName, state) =>
    axios.post("/goods/editcate", { id, cateName, state })

// API: 16. 查询所有分类名称
export const API_GOODS_CATEGORIES = () =>
    axios.get("/goods/goods/categories", {})

// API: 17. 商品图片上传接口
export const API_GOODSIMG_UPLOAD = () =>
    axios.post("/goods/goods_img_upload", {})

// API: 18. 添加商品
// name:商品名称
// category:	商品分类
// price:商品价格
// imgUrl:商品图片地址
// goodsDesc:商品描述
export const API_ADD_GOODS = (name, category, price, imgUrl, goodsDesc) =>
    axios.post("/goods/add", { name, category, price, imgUrl, goodsDesc })

// API: 19. 获取商品列表
// currentPage:当前页码
// pageSize:每页条数
export const API_DOODS_LIST = (currentPage, pageSize) =>
    axios.get("/goods/list", { params: { currentPage, pageSize } })

// API: 20. 删除商品
// id:要删除商品的id
export const API_DEL_GOODS = (id) =>
    axios.get("/goods/del", { params: { id } })

// API: 21. 修改商品
// name:商品名称
// category:商品分类
// price:商品价格
// imgUrl:商品图片地址
// goodsDesc:商品描述
// id:商品ID
export const API_EDIT_GOODS = (name, category, price, imgUrl, goodsDesc, id) =>
    axios.post("/goods/edit", { name, category, price, imgUrl, goodsDesc, id })

// API: 22. 获取订单列表
// currentPage:当前页码
// pageSize:每页条数
// orderNo:订单号
// consignee:收货人
// phone:手机号
// orderState:订单状态
// date:时间范围，字符串格类型如: ["2019-10-05 00:00:00","2019-10-10 00:00:00"]
export const API_ORDER_LIST = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) =>
    axios.get("/order/list", { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })

// API: 23. 含查询
// currentPage:当前页码
// pageSize:每页条数
// orderNo:订单号
// consignee:收货人
// phone:手机号
// orderState:订单状态
// date:时间范围，字符串格类型如: ["2019-10-05 00:00:00","2019-10-10 00:00:00"]
export const API_ORDER_SEARCH = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) =>
    axios.get("/order/search", { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })

// API: 24. 获取订单详情
// id:订单id
export const API_ORDER_DETAIL = (id) =>
    axios.get("/order/detail", { params: { id } })

// API: 25. 修改订单
// id:要修改账号的id
// orderNo:订单号
// orderTime:下单时间
// phone:电话
// consignee:收货人
// deliverAddress:送货地址
// deliveryTime:送达时间
// remarks:备注
// orderAmount:订单金额
// orderState:订单状态
export const API_ORDER_EDIT = (id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState) =>
    axios.post("/order/edit", { id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState })

// API: 26. 获取店铺详情
export const API_SHOP_INFO = () =>
    axios.get("/shop/info", {})

// API: 27. 店铺图片上传接口
// file:二进制数据流
export const API_SHOP_UPLOAD = () =>
    axios.post("/shop/upload", {})

// API: 28. 店铺内容修改
// id:店铺id
// name:店铺名称
// bulletin:店铺公告
// avatar:店铺头像
// deliveryPrice:起送价格
// deliveryTime:送达时间
// description:店铺描述
// score:店铺好评率
// sellCount:店铺销量
// supports:活动支持
// date:营业时间
// pics:图片地址
export const API_SHOPR_EDIT = (id, name, bulletin, avatar, deliveryPrice, deliveryTime, description, score, sellCount, supports, date, pics) =>
    axios.post("/shop/edit", { id, name, bulletin, avatar, deliveryPrice, deliveryTime, description, score, sellCount, supports, date, pics })

// API: 29. 首页报表接口
export const API_ORDER_TOTALDATA = () =>
    axios.get("/order/totaldata", {})

// API: 30. 订单报表接口
// date:字符串格式数组，如["2019-10-01 00:00:00", "2019-10-10 00:00:00"]
export const API_ORDER_ORDERTOTAL = (date) =>
    axios.get("/order/ordertotal", { params: { date } })
