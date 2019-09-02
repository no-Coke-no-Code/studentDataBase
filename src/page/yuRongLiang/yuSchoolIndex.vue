<template>
    <div id="yuSchoolIndexWrapper">
        <div class="header">
            <img class="headIcon" :src="userInfo.wxInfo.HeadIcon"/>
            <span class="name">{{userInfo.wxInfo.UserNickName}}</span>
        </div>
        <div class="nav">
            <div class="title">
                <img src="../../image/yuRongLiang/star2.jpg"/>
                <span>常用功能</span>
            </div>
            <div class="content">
                <div @click="toSchoolManage">
                    <img src="../../image/yuRongLiang/manage.jpg"/>
                    <p>学校管理</p>
                </div>
                <div @click="scan">
                    <img src="../../image/yuRongLiang/scan.jpg"/>
                    <p>学员签到</p>
                </div>
            </div>
        </div>
        <div class="infoList">
            <div class="title">
                <img src="../../image/yuRongLiang/star2.jpg"/>
                <span>最新订单</span>
            </div>
            <div class="content">
                <div class="infoItem" v-for="(item,index) in infoList" :key="index">
                    <i class="spot"></i>
                    <p class="infoContent">{{item.Content}}</p>
                    <p class="infoTime">{{item.F_CreatorTime}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import wxapi from '../../api/wxapi.js'
export default {
    name:"yuSchoolIndex",
    data(){
        return{
            userInfo:{},
            infoList:[],
            loading:false,
            finished:false,
        }
    },
    methods:{
        // 扫描用户订单的二维码
        scan(){
            wxapi.scan();
        },
        // 跳转至学校管理页面
        toSchoolManage(){
            this.$router.push({path:"/yuSchoolManage"});
        },
        init(){
            this.postFN({
                url:"/Order/GetNewOrderList"
            }).then((res)=>{
                console.log(res);
                if(res.data.state == "success")
                {
                    this.infoList = res.data.data;
                }
            });
        },
    },
    created(){
        wxapi.wxRegister();
        this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        this.init();
    },
}
</script>

<style lang="less" scoped>
    #yuSchoolIndexWrapper{
        background-color: #f7f7f7;
        padding-bottom: 1rem;
        .header
        {
            background-color: #26bcd7;
            height: 8rem;
            display: flex;
            align-items: center;
            padding: 2rem;
            margin-bottom: 3rem;
            .headIcon
            {
                border-radius: 50%;
                width: 5rem;
                height: 5rem;
                margin-right: 1rem;
            }
            .name
            {
                color: #fff;
                font-size: 2rem;
            }
        }
        .nav
        {
            background-color: #fff;
            margin-bottom: 1rem;
            .title
            {
                color: #26bcd7;
                border-bottom: 1px solid #f7f7f7;
                padding: .5rem 2rem;
                display: flex;
                align-items: center;
                img
                {
                    margin-right: 1rem;
                    width: 2rem;
                    height: 2rem;
                }
                span
                {
                    font-size: 1.1rem;
                }
            }
            .content
            {
                display: flex;
                div
                {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    padding: 0 2rem;
                    margin: 2rem 0;
                    color: #969696;
                    img
                    {
                        margin-bottom: .5rem;
                        width: 2.5rem;
                        height: 2.5rem;
                    }
                    p
                    {
                        font-size: 1.1rem;
                    }
                    &:first-of-type
                    {
                        border-right: 1px solid #f9f9f9;
                    }
                }
            }
        }
        .infoList
        {
            background-color: #fff;
            .title
            {
                color: #26bcd7;
                border-bottom: 1px solid #f7f7f7;
                padding: .5rem 2rem;
                display: flex;
                align-items: center;
                img
                {
                    margin-right: 1rem;
                    width: 2rem;
                    height: 2rem;
                }
                span
                {
                    font-size: 1.1rem;
                }
            }
            .content
            {
                .infoItem
                {
                    border-bottom: 1px solid #f7f7f7;
                    position: relative;
                    padding: 1rem .5rem 1rem 2.5rem;
                    .spot
                    {
                        display: inline-block;
                        width: .5rem;
                        height: .5rem;
                        border-radius: 50%;
                        background-color: #fb9c70;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 1rem;
                        margin: auto;
                    }
                    .infoContent
                    {
                        font-size: 1.3rem;
                        margin-bottom: .5rem;
                    }
                    .infoTime
                    {
                        color: #939393;
                        font-size: 1.1rem;
                    }
                }
            }
            .watchMore
            {
                text-align: center;
                line-height: 3.5rem;
                height: 3.5rem;
                font-size: 1.2rem;
            }
        }
    }
</style>
