import fuChild from './fuChild'

export default[
  // 管理员
  {
    path: '/fuManageApp',
    name: 'fuManageApp',
    component: resolve=>require(['../page/fuJiHang/fuManageApp.vue'],resolve),
    children:[...fuChild]
  },
  // 首页
  {
    path: '/',
    name: 'fuIndex',
    component: resolve=>require(['../page/fuJiHang/fuIndexTow.vue'],resolve),
    meta:{
      keepAlive:false,//不缓存页面
      name:'首页',//导航条名字
      btn:true,//左上角按钮
      nav:true,//导航条
      tab:true,//底部导航条
    }
  },
    // 首页
    {
        path: '/fuIndex',
        name: 'fuIndex',
        component: resolve=>require(['../page/fuJiHang/fuIndexTow.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'首页',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:true,//底部导航条
        }
    },
    // 线下课程
    {
        path: '/fuClass',
        name: 'fuClass',
        component: resolve=>require(['../page/fuJiHang/fuClass.vue'],resolve),
        meta:{
          keepAlive:false,//不缓存页面
          name:'线下课程',//导航条名字
          btn:true,//左上角按钮
          nav:true,//导航条
          tab:true,//底部导航条
        }
    },
    // 我的
    // {
    //     path: '/fuMy',
    //     name: 'fuMy',
    //     component: resolve=>require(['../page/fuJiHang/fuMyTwo.vue'],resolve),
    //     meta:{
    //       keepAlive:true,//不缓存页面
    //       name:'我的',//导航条名字
    //       btn:true,//左上角按钮
    //       nav:true,//导航条
    //       tab:true,//底部导航条
    //     }
    // },
    // 自选课程
    {
      path: '/fuOptCou',
      name: 'fuOptCou',
      component: resolve=>require(['../page/fuJiHang/fuOptCou.vue'],resolve),
      meta:{
        keepAlive:true,//不缓存页面
        name:'自选课程',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 自选课程
    {
      path: '/fuSchoolCurn',
      name: 'fuSchoolCurn',
      component: resolve=>require(['../page/fuJiHang/fuSchoolCurn.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'学校课程',//导航条名字
        btn:true,//左上角按钮
        nav:false,//导航条
        tab:false,//底部导航条
      }
    },
    // 课程详情
    {
      path: '/fuClassDetail',
      name: 'fuClassDetail',
      component: resolve=>require(['../page/fuJiHang/fuClassDetail.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'课程详情',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 课程详情(立即报名)
    {
      path: '/fuProduct',
      name: 'fuProduct',
      component: resolve=>require(['../page/fuJiHang/fuProduct.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'课程详情',//导航条名字
        btn:false,//左上角按钮
        nav:false,//导航条
        tab:false,//底部导航条
      }
    },
    // 确认订单
    {
      path: '/fuPurchase',
      name: 'fuPurchase',
      component: resolve=>require(['../page/fuJiHang/fuPurchase.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'确认订单',//导航条名字
        btn:false,//左上角按钮
        nav:false,//导航条
        tab:false,//底部导航条
      }
    },
    // 测试(立即报名)
    {
      path: '/fcs',
      name: 'fcs',
      component: resolve=>require(['../page/fuJiHang/cs.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'课程详情',//导航条名字
        btn:true,//左上角按钮
        nav:false,//导航条
        tab:false,//底部导航条
      }
    },
    // 学院介绍
    {
      path: '/fuSchoolIntro',
      name: 'fuSchoolIntro',
      component: resolve=>require(['../page/fuJiHang/fuSchoolIntro.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'学院介绍',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 学校主页
    {
      path: '/fuSchoolIndex',
      name: 'fuSchoolIndex',
      component: resolve=>require(['../page/fuJiHang/fuSchoolIndex.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'学校主页',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 电子收据
    {
      path: '/fuReceipt',
      name: 'fuReceipt',
      component: resolve=>require(['../page/fuJiHang/fuReceipt.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'电子收据',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 学院详情
    {
      path: '/fuCollegeIntro',
      name: 'fuCollegeIntro',
      component: resolve=>require(['../page/fuJiHang/fuCollegeIntro.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'学院详情',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 开设课程
    {
      path: '/fuSetClass',
      name: 'fuSetClass',
      component: resolve=>require(['../page/fuJiHang/fuSetClass.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'开设课程',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 学生作品
    {
      path: '/fuStudentWorks',
      name: 'fuStudentWorks',
      component: resolve=>require(['../page/fuJiHang/fuStudentWorks.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'学生作品',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 点评
    {
      path: '/fuEvaluate',
      name: 'fuEvaluate',
      component: resolve=>require(['../page/fuJiHang/fuEvaluate.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'点评',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 我的订单
    {
      path: '/fuMyOrder',
      name: 'fuMyOrder',
      component: resolve=>require(['../page/fuJiHang/fuMyOrder.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'我的订单',//导航条名字
        btn:false,//左上角按钮
        nav:false,//导航条
        tab:true,//底部导航条
      }
    },
    // 我的资料
    {
      path: '/fuMyData',
      name: 'fuMyData',
      component: resolve=>require(['../page/fuJiHang/fuMyData.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'编辑资料',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 修改界面
    {
      path: '/fuChange',
      name: 'fuChange',
      component: resolve=>require(['../page/fuJiHang/fuChange.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'修改界面',//导航条名字
        btn:true,//左上角按钮
        nav:false,//导航条
        tab:false,//底部导航条
      }
    },
    // 我的作品
    {
      path: '/fuMyWorks',
      name: 'fuMyWorks',
      component: resolve=>require(['../page/fuJiHang/fuMyWorks.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'我的作品',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 发表作品
    {
      path: '/fuPublished',
      name: 'fuPublished',
      component: resolve=>require(['../page/fuJiHang/fuPublished.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'发表作品',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 作品详情
    {
      path: '/fuWorksDetail',
      name: 'fuWorksDetail',
      component: resolve=>require(['../page/fuJiHang/fuWorksDetail.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'作品详情',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },

    // 学员管理（ab客服）
    {
      path: '/fuStudentManage',
      name: 'fuStudentManage',
      component: resolve=>require(['../page/fuJiHang/fuStudentManageTH.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'学员管理',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 成交订单
    {
      path: '/fuOkOrder',
      name: 'fuOkOrder',
      component: resolve=>require(['../page/fuJiHang/fuOkOrder.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'成交订单',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 指派人员
    {
      path: '/fuGuidance',
      name: 'fuGuidance',
      component: resolve=>require(['../page/fuJiHang/fuGuidance.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'指派人员',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 跟进备注
    {
      path: '/fuRemarks',
      name: 'fuRemarks',
      component: resolve=>require(['../page/fuJiHang/fuRemarks.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'跟进备注',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 跟进备注（保存）
    {
      path: '/fuRemarksChange',
      name: 'fuRemarksChange',
      component: resolve=>require(['../page/fuJiHang/fuRemarksChange.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'跟进备注（保存）',//导航条名字
        btn:false,//左上角按钮
        nav:false,//导航条
        tab:false,//底部导航条
      }
    },
    // 历史备注
    {
      path: '/fuHistory',
      name: 'fuHistory',
      component: resolve=>require(['../page/fuJiHang/fuHistory.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'历史备注',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 学员信息（修改，放弃）
    {
      path: '/fuStudentInfo',
      name: 'fuStudentInfo',
      component: resolve=>require(['../page/fuJiHang/fuStudentInfo.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'学员信息',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 学员标签
    {
      path: '/fuStudentTag',
      name: 'fuStudentTag',
      component: resolve=>require(['../page/fuJiHang/fuStudentTag.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'学员标签',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // 报单申请
    {
      path: '/fuDeclaratPost',
      name: 'fuDeclaratPost',
      component: resolve=>require(['../page/fuJiHang/fuDeclaratPost.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'报单申请',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    // a/b管理员审核
    {
      path: '/fuAuditing',
      name: 'fuAuditing',
      component: resolve=>require(['../page/fuJiHang/fuAuditing.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'审核',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //登录
    {
      path: '/login',
      name: 'login',
      component: resolve=>require(['../page/fuJiHang/login.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'登录',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //报单申请列表
    {
      path: '/fuDeclaratList',
      name: 'fuDeclaratList',
      component: resolve=>require(['../page/fuJiHang/fuDeclaratList.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'报单申请',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //学员选择
    {
      path: '/fuStudentChoose',
      name: 'fuStudentChoose',
      component: resolve=>require(['../page/fuJiHang/fuStudentChoose.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'学员选择',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //申请审批
    {
      path: '/fuApprovalPost',
      name: 'fuApprovalPost',
      component: resolve=>require(['../page/fuJiHang/fuApprovalPost.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'申请审批',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //回访详情
    {
      path: '/fuReturnVisit',
      name: 'fuReturnVisit',
      component: resolve=>require(['../page/fuJiHang/fuReturnVisit.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'回访详情',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //历史记录（回访）
    {
      path: '/fuHistoryRecord',
      name: 'fuHistoryRecord',
      component: resolve=>require(['../page/fuJiHang/fuHistoryRecord.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'历史记录',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //订单管理
    {
      path: '/fuOrderManage',
      name: 'fuOrderManage',
      component: resolve=>require(['../page/fuJiHang/fuOrderManage.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'订单管理',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //学员信息（ab管理员）
    {
      path: '/fuStudentDetail',
      name: 'fuStudentDetail',
      component: resolve=>require(['../page/fuJiHang/fuStudentDetail.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'学员信息',//导航条名字
        btn:true,//左上角按钮
        nav:false,//导航条
        tab:false,//底部导航条
      }
    },
    //线上课程
    {
      path: '/fuOnlineClass',
      name: 'fuOnlineClass',
      component: resolve=>require(['../page/fuJiHang/fuOnlineClass.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'线上课程',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //回访详情
    {
      path: '/fuReturnVisitDet',
      name: 'fuReturnVisitDet',
      component: resolve=>require(['../page/fuJiHang/fuReturnVisitDet.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'回访详情',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //学员
    {
      path: '/fuStudentList',
      name: 'fuStudentList',
      component: resolve=>require(['../page/fuJiHang/fuStudentList.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'学员',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //支付状态
    {
      path: '/fuOkOrder',
      name: 'fuOkOrder',
      component: resolve=>require(['../page/fuJiHang/fuOkOrder.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'支付状态',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //老师介绍
    {
      path: '/fuTeacherDetail',
      name: 'fuTeacherDetail',
      component: resolve=>require(['../page/fuJiHang/fuTeacherDetail.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'老师介绍',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //支付回调界面
    {
      path: '/okOrerr',
      name: 'okOrerr',
      component: resolve=>require(['../page/fuJiHang/okOrerr.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'支付',//导航条名字
        btn:true,//左上角按钮
        nav:false,//导航条
        tab:false,//底部导航条
      }
    },
    //老师风采
    {
      path: '/fuTeacherMien',
      name: 'fuTeacherMien',
      component: resolve=>require(['../page/fuJiHang/fuTeacherMien.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'老师风采',//导航条名字
        btn:true,//左上角按钮
        nav:false,//导航条
        tab:false,//底部导航条
      }
    },
    //老师风采列表
    {
      path: '/fuTeachList',
      name: 'fuTeachList',
      component: resolve=>require(['../page/fuJiHang/fuTeachList.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'老师风采',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //更多热门课程列表
    {
      path: '/fuMoreClass',
      name: 'fuMoreClass',
      component: resolve=>require(['../page/fuJiHang/fuMoreClass.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'更多热门课程列表',//导航条名字
        btn:true,//左上角按钮
        nav:false,//导航条
        tab:false,//底部导航条
      }
    },
    //我的收藏
    {
      path: '/fuMyColl',
      name: 'fuMyColl',
      component: resolve=>require(['../page/fuJiHang/fuMyColl.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'我的收藏',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //成交(客服)
    {
      path: '/fuDeal',
      name: 'fuDeal',
      component: resolve=>require(['../page/fuJiHang/fuDeal.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'成交',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //组员信息(客服)
    {
      path: '/fuCrewInfor',
      name: 'fuCrewInfor',
      component: resolve=>require(['../page/fuJiHang/fuCrewInfor.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'组员信息',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
     //订单详情
     {
      path: '/fuOrderDetail',
      name: 'fuOrderDetail',
      component: resolve=>require(['../page/fuJiHang/fuOrderDetail.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'订单详情',//导航条名字
        btn:false,//左上角按钮
        nav:false,//导航条
        tab:false,//底部导航条
      }
    },
    //报单详情
    {
      path: '/fuDeclaratDet',
      name: 'fuDeclaratDet',
      component: resolve=>require(['../page/fuJiHang/fuDeclaratDet.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'报单详情',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //学员风采跟多
    {
      path: '/fuStudentListFC',
      name: 'fuStudentListFC',
      component: resolve=>require(['../page/fuJiHang/fuStudentListFC.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'学员风采',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    //学员风采
    {
      path: '/fuStudentFC',
      name: 'fuStudentFC',
      component: resolve=>require(['../page/fuJiHang/fuStudentFC.vue'],resolve),
      meta:{
        keepAlive:false,//不缓存页面
        name:'学员风采',//导航条名字
        btn:true,//左上角按钮
        nav:true,//导航条
        tab:false,//底部导航条
      }
    },
    
]

