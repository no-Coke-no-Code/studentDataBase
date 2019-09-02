/*
 * @Author: fujihang 
 * @Date: 2019-03-22 20:36:41 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-11 19:13:15
    底部按钮
 */
<template>
<div class="tabBarT">
    <span @click="toFN(item.to)" :class="['bar',index==active?'active':'',index==2?'add':'']" v-for="(item,index) in tabList" :key="index">
        <img :src="item.icon">
        <div class="name">{{item.name}}</div>
    </span>
</div>
</template>

<script>
export default {
    data(){
        return {
            active:-2,
            tabList:[
                {
                    name:"学员",//文字
                    // icon:require("../image/user.svg"),//未激活
                    // icoAct:require("../image/userA.svg"),//已激活
                    icon:require("../image/public/my.png"),
                    to:'/fuStudentList',//跳转的路由
                },
                {
                    name:"组员",//文字
                    // icon:require("../image/user.svg"),//未激活
                    // icoAct:require("../image/userA.svg"),//已激活
                    icon:require("../image/public/group.png"),
                    to:'/HsyCrew',//跳转的路由
                },
                {
                    name:"回访",//文字
                    // icon:require("../image/user.svg"),//未激活
                    // icoAct:require("../image/userA.svg"),//已激活
                    icon:require("../image/public/add.png"),
                    to:'/fuStudentChoose',//跳转的路由
                },
                {
                    name:"到校",//文字
                    // icon:require("../image/user.svg"),//未激活
                    // icoAct:require("../image/userA.svg"),//已激活
                    to:'/HsyAtSchool',//跳转的路由
                    icon:require("../image/public/school.png"),
                },
                {
                    name:"成交单",//文字
                    // icon:require("../image/user.svg"),//未激活
                    // icoAct:require("../image/userA.svg"),//已激活
                    to:'/fuDeal',//跳转的路由
                    icon:require("../image/public/order.png"),
                },
                
            ]
        };
    },

    methods: {
        toFN(to){
            this.$router.push({path:to})
        }
    }
}

</script>


<style lang='less'>
@import '../style/base.less';
@import '../style/fujihangBase.less';
.tabBarT{
    .nC;
    padding: .3rem 0;
    box-sizing: border-box;
    background: white;
    border-top: 1px solid rgb(245, 245, 245);
    display: flex;
    position: relative;
    .bar{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
        filter: grayscale(100%);
        >img{
            height: 1.6rem;
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
    .add{
        -webkit-filter: grayscale(0%);
        filter: grayscale(0%);
        >img{
            top: -3.2rem;
            position: absolute;
            height: 5rem;
            width: 5rem;
        }
        .name{
            margin-top:1.55rem;
        }
    }
}
</style>