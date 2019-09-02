/*
 * @Author: fujihang
 * @Date: 2019-03-19 13:56:25
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-03 10:14:51
  主页
 */
<template>
<div id="app">

  <!-- 顶部导航条 -->
  <navBar :btn="$route.meta.btn" :name="$route.meta.name" v-show="$route.meta.nav"></navBar>

  <!-- 中间内容 -->

    <div id="appContext">

      <!-- 缓存的 -->
      <transition :name="transitionName">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>

      <!-- 不缓存的 -->
      <transition :name="transitionName">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>

    </div>



  <!-- 底部导航条 -->
  <tabBar v-show="$route.meta.tab"></tabBar>
</div>
</template>

<script>
import navBar from "./public/navBar"
import tabBar from "./public/tabBar"
import zhenYonJie from './router/zhenYonJie.js'
import { Toast } from 'vant';
export default {
  components:{
    navBar,tabBar
  },
  data(){
    return {
      callBack:'',//当前路由名字
      transitionName:"call",//路由跳转动画

  };
},

  methods: {

  },

  watch:{
    $route(to,from){
      Toast.clear();
    if(this.callBack==to.name)this.transitionName='call'
    else this.transitionName='to'
    this.callBack=from.name
    }
  },
  mounted(){
    // console.log([...zhenYonJie])
  }
}

</script>


<style lang="less">
#app{
  height: 100%;
  display: flex;
  flex-direction: column;
  // 中间内容
  #appContext{
    flex: 1;
    overflow: auto;
  }
  // 路由跳转动画
  .to-enter-active{
    transition: .35s;
    opacity: 1;
    transform: translate3d(0, 0, 0);

  }
  .to-enter{
    transform: translate3d(-2%,0 , 0);
    opacity: .1;
  }
  .call-enter-active{
    transition: .35s;
    opacity: 1;
    transform: translate3d(0, 0, 0);

  }
  .call-enter{
    transform: translate3d(2%,0 , 0);
    opacity: .1;
  }
}
</style>
