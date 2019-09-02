/*
 * @Author: fujihang 
 * @Date: 2019-03-22 20:26:57 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-28 18:07:02
    a/b管理员
 */
<template>
<div id="fuManageApp">
  <!-- 顶部导航条 -->
  <!-- <navBar :btn="$route.meta.btn" :name="$route.meta.name" v-show="$route.meta.nav"></navBar> -->

  <!-- 中间内容 -->

    <div id="manageContext">
      
      <!-- 缓存的 -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      
      <!-- 不缓存的 -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>

    </div>
  
  

  <!-- 底部导航条 -->
  <tabBarT v-show="$route.meta.tabT"></tabBarT>
</div>
</template>

<script>
import tabBarT from '../../public/tabBarT'
export default {
  components:{
    tabBarT,
  },


  methods: {

  },

  
  mounted(){
  }
}

</script>


<style lang="less">
#fuManageApp{
  height: 100%;
  display: flex;
  flex-direction: column;
  // 中间内容
  #manageContext{
    flex: 1;
    overflow: auto;
  }
  
}
</style>