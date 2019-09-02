/*
 * @Author: fujihang 
 * @Date: 2019-03-19 15:26:36 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-22 17:58:20
    路由管理
 */
import Vue from 'vue'
import Router from 'vue-router'
import zhenYonJie from './zhenYonJie'//郑永杰路由
import fuJiHang from './fuJiHang'//符继航路由
import huangShiYou from './huangShiYou'//黄世有路由
import yuRongLiang from './yuRongLiang'
Vue.use(Router)

export default new Router({
  routes: [...zhenYonJie,...fuJiHang,...huangShiYou,...yuRongLiang]
})
