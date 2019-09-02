
/*
 * @Author: fujihang
 * @Date: 2019-03-25 11:20:52
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-28 16:34:26
    报单申请列表卡片
 */
<template>
<div class="DeclaratCard">
    <!-- <img class="logo" :src="data.F_HeadIcon"> -->
    <div class="detail">
        <!-- <div class="name">{{data.F_NickName}}
            <span v-show="data.F_State==0" class="icon">待审批</span>
            <span v-show="data.F_State==1" class="icon">已通过</span>
            <span v-show="data.F_State==2" class="icon">被驳回</span>
            <span v-show="data.F_State==1" class="icon">锁定</span>
        </div> -->

        <!-- <div class="phone">
            <img class="img" src="../../image/fuJiHang/money.svg">
            定金：<span class="jG">￥{{data.F_Price}}</span>
        </div> -->

        <!-- <div class="teach">
            <img class="img" src="../../image/fuJiHang/teach.png">
            课程：{{data.F_CourseName}}
        </div> -->

        <div class="weChat">
            学员微信:{{data.F_WeChat}}
        </div>

        <div class="time" >
            <!-- <img class="img" src="../../image/fuJiHang/time.svg"> -->
            时间：{{data.F_CreatorTime.split(" ")[0]}}
        </div>

        <span v-show="data.F_State==0" class="approval">待审批</span>
        <span v-show="data.F_State==1" class="pass">已通过</span>
        <span v-show="data.F_State==2" class="reject">被驳回</span>
    </div>
    <van-icon name="arrow" />
</div>
</template>

<script>
export default {
    props:['data'],
    data(){
        return {
        };
    },
    // computed:{
    //     time:()=>{
    //         return this.data.F_CreatorTime.split(" ")[0];
    //     }
    // },

    methods: {

    },
    mounted(){
        console.log(this.data);
    },
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.DeclaratCard{
    .bW;
    padding: 1rem .5rem;
    .mB;
    display: flex;
    align-items: center;
    .fBB;
    .logo{
        margin: 0 1rem 0 0;
        height:3.5rem;
        width:3.5rem;
        object-fit: cover;
        border-radius: 50%;
    }
    .img{
        height: 1.2rem;
        margin-right: .6rem;
    }
    .detail{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        .name{
            display: flex;
            align-items: center;
            font-size: 1.2rem;
            font-weight: 650;
        }
        .phone{
            font-size: 1rem;
            display: flex;
            color: #999;
            margin: .6rem 0 .3rem;
            align-items: center;

        }
        .teach{
            margin: .3rem 0;
            font-size: 1.15rem;
            display: flex;
            align-items: center;
            color: #999;
        }
        .weChat
        {
            font-size: 1.2rem;
            margin-right: .5rem;
        }
        .time{
            font-size: 1rem;
            display: flex;
            align-items: center;
            color: #999;
            margin-right: .5rem;
        }
        span
        {
            display: inline-block;
            height: 100%;
            padding: .1rem 1rem;
            text-align: center;
            border-radius: 1rem;
            font-size: 1rem;
            margin-right: .5rem;
            .fBB;
            color: white;
        }
        .approval
        {
            background-color: #d7b754;
        }
        .pass
        {
            background-color: #a0d75f;
        }
        .reject
        {
            background-color: #d87055;
        }
    }
}
</style>
