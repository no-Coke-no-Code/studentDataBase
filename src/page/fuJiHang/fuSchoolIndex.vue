/*
 * @Author: fujihang 
 * @Date: 2019-03-21 10:39:56 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-22 19:31:23
    学校主页
 */
<template>
<div id="fuSchoolIndex">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000"  :show-indicators="false">
        <van-swipe-item v-for="(item,index) in banner" :key="index">
            <img :src="item.img" :style="{'height':wwWH*2/5+'px'}">
        </van-swipe-item>
    </van-swipe>

    <!-- 功能 -->
    <div class="function">
        <div class="card" v-for="(item,index) in list" :key="index" @click="toFN(item.to)">
            <img :src="item.img" class="img">
            <div class="contant">
                <div class="name">{{item.name}}</div>
                <div class="En">{{item.En}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            banner:[
                {
                    img:require("../../image/fuJiHang/psff920b48032d4a64-4d9a-4331-9b6b-9643f71809d8.png")
                },
                {
                    img:require("../../image/fuJiHang/psff920b48032d4a64-4d9a-4331-9b6b-9643f71809d8.png")
                },
            ],//首页轮播图

            list:[
                {
                    img:require("../../image/fuJiHang/abstract.png"),
                    name:'学校简介',
                    En:'School profile',
                    to:'/fuCollegeIntro'
                },
                {
                    img:require("../../image/fuJiHang/sWorks.png"),
                    name:'开设课程',
                    En:'Offering courses',
                    to:'/fuSetClass'
                },
                {
                    img:require("../../image/fuJiHang/abstract.png"),
                    name:'学员作品',
                    En:'Student works',
                    to:'/fuStudentWorks'
                },
            ],//功能列表
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
@import "../../style/base.less";
@import "../../style/fujihangBase.less";
#fuSchoolIndex{
    .hO;
    // 首页轮播图
    .van-swipe{
        img{
            object-fit: cover;
            width: 100%;
        }
    }

    // 功能
    .function{
        display: flex;
        flex-wrap: wrap;
        padding: 0 .6rem;
        margin-top: 1rem;
        .fBB;
        .card{
            position: relative;
            .fBB;
            width: 50%;
            height: 6rem;
            padding:0 .5rem;
            margin-bottom: 1rem;
            .img{
                border-radius: .3rem;
                object-fit: cover;
                height: 100%;
                width: 100%;
            }
            .contant{
                color: white;
                top: 0;left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                position: absolute;
                .name{
                    font-size: 1.3rem;
                    margin-bottom: .3rem;
                }
                .En{
                    text-transform: uppercase;
                }
            }
        }
        
    }
}
</style>