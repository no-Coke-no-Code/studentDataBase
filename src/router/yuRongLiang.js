export default [
    {
        path: '/yuLiveDetail',
        name: 'yuLiveDetail',
        component: resolve=>require(['../page/yuRongLiang/yuLiveDetail.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'在线直播',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path: '/yuLive',
        name: 'yuLive',
        component: resolve=>require(['../page/yuRongLiang/yuLive.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'在线课程',//导航条名字
          btn:true,//左上角按钮
          nav:false,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuOrderDetail",
        name:"yuOrderDetail",
        component: resolve=>require(['../page/yuRongLiang/yuOrderDetail.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'订单详情',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuMoreLive",
        name:"yuMoreName",
        component:resolve=>require(['../page/yuRongLiang/yuMoreLive.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'订单详情',//导航条名字
          btn:true,//左上角按钮
          nav:false,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuTeacherLive",
        name:"yuTeacherLive",
        component: resolve=>require(['../page/yuRongLiang/yuTeacherLive.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'直播页面',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuPurchase",
        name:"yuPurchase",
        component: resolve=>require(['../page/yuRongLiang/yuPurchase.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'支付页面',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuConfirmLiveOrder",
        name:"yuConfirmLiveOrder",
        component: resolve=>require(['../page/yuRongLiang/yuConfirmLiveOrder.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'订单确认',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuInformationList",
        name:"yuInformationList",
        component: resolve=>require(['../page/yuRongLiang/yuInformationList.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'资讯列表',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuInformationDetail",
        name:"yuInformationDetail",
        component: resolve=>require(['../page/yuRongLiang/yuInformationDetail.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'资讯内容',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuPersonalCenter",
        name:"yuPersonalCenter",
        component: resolve=>require(['../page/yuRongLiang/yuPersonalCenter.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'个人主页',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:true,//底部导航条
        }
      },
      {
        path:"/yuStudyRec",
        name:"yuStudyRec",
        component: resolve=>require(['../page/yuRongLiang/yuStudyRec.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'学习记录',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuEditPersonalInfo",
        name:"yuEditPersonalInfo",
        component: resolve=>require(['../page/yuRongLiang/yuEditPersonalInfo.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'编辑资料',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuPersonalInfo",
        name:"yuPersonalInfo",
        component: resolve=>require(['../page/yuRongLiang/yuPersonalInfo.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'我的资料',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuMyPoint",
        name:"yuMyPoint",
        component: resolve=>require(['../page/yuRongLiang/yuMyPoint.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'我的积分',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuWatchRec",
        name:"yuWatchRec",
        component: resolve=>require(['../page/yuRongLiang/yuWatchRec.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'观看记录',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuCollClass",
        name:"yuCollClass",
        component: resolve=>require(['../page/yuRongLiang/yuCollClass.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'我收藏的课程',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },


      // 学校身份的页面路由
      {
        path:"/yuSchoolIndex",
        name:"yuSchoolIndex",
        component: resolve=>require(['../page/yuRongLiang/yuSchoolIndex.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'首页',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      // 学校管理页面
      {
        path:"/yuSchoolManage",
        name:"yuSchoolManage",
        component: resolve=>require(['../page/yuRongLiang/yuSchoolManage.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'学校管理',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      // 确认到校页面
      {
        path:"/yuConfirmToSchool",
        name:"yuConfirmToSchool",
        component: resolve=>require(['../page/yuRongLiang/yuConfirmToSchool.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'确认到校',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      // 学校课程学生列表页面
      {
        path:"/yuStudentList",
        name:"yuStudentList",
        component: resolve=>require(['../page/yuRongLiang/yuStudentList.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'学生列表',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },


      // 管理员身份的页面路由
      // 管理员首页
      {
        path:"/yuManageIndex",
        name:"yuManageIndex",
        component: resolve=>require(['../page/yuRongLiang/yuManageIndex.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'首页',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      // 公有池页面
      {
        path:"/yuPublicPool",
        name:"yuPublicPool",
        component: resolve=>require(['../page/yuRongLiang/yuPublicPool.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'公有池',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:"/yuManageOrderDet",
        name:"yuManageOrderDet",
        component: resolve=>require(['../page/yuRongLiang/yuManageOrderDet.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'订单管理',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      },
      {
        path:'/yuTesting',
        name:'yuTesting',
        component: resolve=>require(['../page/yuRongLiang/yuTesting.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'订单管理',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:false,//底部导航条
        }
      }
]