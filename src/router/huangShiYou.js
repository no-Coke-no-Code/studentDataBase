export default [

    {
        path: '/fieraa',
        name: 'fieraa',
        component: resolve=>require(['../page/huangShiYou/fieraa.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'老板',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
          // 老板手机端_A组客服老板
        }
    },
    {
      path:'/hsytwo',
      name:'hsytwo',
      component: resolve=>require(['../page/huangShiYou/hsytwo.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'首页',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
        // 老板手机端_B组客服老板
      }
    },
    {
      path:'/hsyTeachIndex',
      name:'hsyTeachIndex',
      component: resolve=>require(['../page/huangShiYou/hsyTeachIndex.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'首页',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
        //客户端手机_客服老师首页_主页
      }
    },
    {
      path:'/HsyCrew',
      name:'HsyCrew',
      component: resolve=>require(['../page/huangShiYou/HsyCrew.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'组员',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
        //客服手机端_A/B管理员_组员
      }
    },
    //  废弃
    {
      path:'/HsyCrewMsg',
      name:'HsyCrewMsg',
      component: resolve=>require(['../page/huangShiYou/HsyCrewMsg.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'组员信息',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
        //客服手机端_A/B管理员_组员信息
      }
    },
    {
      path:'/HsyAtSchool',
      name:'HsyAtSchool',
      component: resolve=>require(['../page/huangShiYou/HsyAtSchool.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'到校',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
        //客服手机端_A/B管理员_到校
      }
    }
]
