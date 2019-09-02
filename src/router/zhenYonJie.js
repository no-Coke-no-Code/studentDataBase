

export default[
    {
        path: '/cs',
        name: 'cs',
        component: resolve=>require(['../page/zhenYonJie/cs.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'首页',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:true,//底部导航条
        }
    }
]