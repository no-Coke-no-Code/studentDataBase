/*
 * @Author: fujihang 
 * @Date: 2019-03-26 11:11:05 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-29 11:53:07
    老师风采
 */
<template>
<div class="teacher" >
    <!-- 左边 -->
    <div class="left">
        <img :src="data.F_HeadIcon"/>
    </div>

    <!-- 右边 -->
    <div class="right">
        <p class="title">
            <span class="name">{{data.F_Name}}</span>
            <span class="detail">{{data.F_Achievement}}</span>
        </p>
        <div class="smallBar"></div>
        <p class="adept"><span style="color:#27BCD5;">擅长：</span>{{data.F_Speciality}}</p>
        <button class="learnMore" @click="toFN">了解详情 >></button>
    </div>
</div>
</template>

<script>
export default {
    props:["data"],
    data(){
        return {

        };
    },

    methods: {
        toFN(){
            this.$router.push({path:'/fuTeacherMien?id='+this.data.F_Id})
        }
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.teacher{
    .nC;.bW;
    .fBB;
    display: flex;
    border-bottom: .5px solid #f7f7f7;
    padding: 2rem 2rem;
    .left
    {
        display: flex;
        justify-content: center;
        align-items: center;
        img
        {
            border-radius: 50%;
            width: 12rem;
            height: 12rem;
            margin-right: 2rem;
            border: .5px solid #f7f7f7;
        }
    }
    .right
    {
        flex: 1;
        .title
        {
            display: flex;
            justify-content: space-between;
            .name
            {
                color: #65cade;
                font-size: 1.6rem;
            }
            .detail
            {
                font-size: 1.1rem;
                color: #000;
                transform: translateY(.5rem);
            }
        }
        .smallBar
        {
            width: 1.8rem;
            height: .1rem;
            background-color: #65cade;
            margin: 1rem 0;
        }
        .adept
        {
            font-size: 1.1rem;
        }
        .learnMore
        {
            margin-top: 1rem;
            background-color: #65cade;
            color: #fff;
            padding: .3rem .5rem;
            border-radius: .5rem;
            font-size: 1.1rem;
        }
    }
}
</style>