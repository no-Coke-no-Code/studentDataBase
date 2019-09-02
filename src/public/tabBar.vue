/*
 * @Author: fujihang 
 * @Date: 2019-03-19 13:48:24 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-08 10:38:30
    底部导航条
 */
<template>
<div id="tabBar">
    <!-- <span @click="choose(index,item.to)" class="bar" v-for="(item,index) in tabList" :key="index">
        <img :src="active==index?item.icoAct:item.icon">
        <div :class="['name',active==index?'active':'']">{{item.name}}</div>
    </span> -->

    <span @click="choose(index,item.to)" :class="['bar',index==active?'active':'']" v-for="(item,index) in tabList" :key="index">
        <img :src="item.icon">
        <div class="name">{{item.name}}</div>
    </span>


</div>
</template>

<script>
export default {
    data(){
        return {
            tabList:[
                {
                    name:"首页",//文字
                    // icon:require("../image/user.svg"),//未激活
                    // icoAct:require("../image/userA.svg"),//已激活
                    // icon:require("../image/public/index.png"),
                    icon:require("@/image/yuRongLiang/homeAct.jpg"),
                    to:'/fuIndex',//跳转的路由
                },
                // {
                //     name:"线上课程",//文字
                //     // icon:require("../image/user.svg"),//未激活
                //     // icoAct:require("../image/userA.svg"),//已激活
                //     icon:require("../image/public/xsclass.png"),
                //     to:'/fuOnlineClass',//跳转的路由
                // },
                {
                    name:"我的订单",//文字
                    // icon:require("../image/user.svg"),//未激活
                    // icoAct:require("../image/userA.svg"),//已激活
                    // icon:require("../image/public/class.png"),
                    icon:require("@/image/yuRongLiang/orderAct.jpg"),
                    to:'/fuMyOrder',//跳转的路由
                },
                {
                    name:"个人主页",//文字
                    // icon:require("../image/user.svg"),//未激活
                    // icoAct:require("../image/userA.svg"),//已激活
                    to:'/yuPersonalCenter',//跳转的路由
                    icon:require("@/image/yuRongLiang/personAct.jpg"),
                    // icon:require("../image/public/my.png"),
                },
            ],//底部按钮列表
            active:0,//激活的值
        };
    },

    methods: {
        // 当前选定的
        choose(index,to){
            this.active=index
            this.$router.push({path:to})
        }
    },
    watch:{
        $route(to,from){
            switch(this.$route.name){
                case 'fuIndex' :
                    this.active=0
                break;
                case 'fuMyOrder' :
                    this.active=1
                break;
                case 'yuPersonalCenter' :
                    this.active=2
                break;
            }
            //防止刷新失去点击状态
        }
    }
}

</script>


<style lang='less'>
@import "../style/base.less";
#tabBar{
    .nC;
    padding: .5rem 0;
    box-sizing: border-box;
    background: white;
    border-top: 1px solid rgb(245, 245, 245);
    display: flex;
    .bar{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
        filter: grayscale(100%);
        >img{
            height: 2rem;
        }
        .name{
            margin-top: .3rem;
            font-size: 1.2rem;
            color: #39c2d9;
        }
    }
    .active{
        -webkit-filter: grayscale(0%); /* Chrome, Safari, Opera */
        filter: grayscale(0%);
        // color: #1989fa;
    }
}
</style>