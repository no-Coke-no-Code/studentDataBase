export default [
    // 作品详情
    {
        path: 'fuManageIndex',
        name: 'fuManageIndex',
        component: resolve=>require(['../page/fuJiHang/fuManageIndex.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'首页',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tabT:true,//底部导航条
        }
    },
    // 本月
    {
        path: 'fuManageMonth',
        name: 'fuManageMonth',
        component: resolve=>require(['../page/fuJiHang/fuManageMonth.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'首页',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tabT:false,//底部导航条
        }
    },
]