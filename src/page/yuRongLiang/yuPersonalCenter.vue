<template>
    <div id="yuPersonalCenter">
        <div class="headWrapper">
            <div class="tuoyuan">
                <div class="rectangle">
                    <img class="edit" src="../../image/yuRongLiang/edit.jpg" @click="toPersonalInfo"/>
                </div>
                <img class="userIcon" :src="userInfo.wxInfo.HeadIcon"/>
            </div>
            <div class="nameWrapper">
                <p>
                    <span class="userName">{{userInfo.wxInfo.UserNickName}}</span>
                    <i>{{userInfo.RoleName}}</i>
                </p>
                <p @click="toMyPoint">
                    <img src="../../image/yuRongLiang/myCoin.jpg"/>
                    <span>{{sumPoint}}</span>
                </p>
            </div>
        </div>
        <div class="contentWrapper">
            <div class="iconWrapper">
                <div @click="toStudyRec">
                    <img src="../../image/yuRongLiang/studyRec.jpg"/>
                    <p>学习记录</p>
                </div>
                <div @click="toCollecion">
                    <img src="../../image/yuRongLiang/collection.jpg"/>
                    <p>我的收藏</p>
                </div>
                <div @click="toOrder">
                    <img src="../../image/yuRongLiang/myOrder.jpg"/>
                    <p>我的订单</p>
                </div>
                <div @click="toKefu">
                    <img src="../../image/yuRongLiang/kefu.jpg"/>
                    <p>联系客服</p>
                </div>
            </div>
        </div>
        <van-popup class="erWeiMaPop"  v-model="ifShowPop">
            <img :src="erWeiMa"/>
            <p class="notice">长按识别二维码</p>
        </van-popup>
    </div>
</template>

<script>
export default {
    name:"yuPersonalCenter",
    data(){
        return{
            userInfo:{},
            sumPoint:0,
            // 联系客服弹窗状态
            ifShowPop:false,
            // 客服的二维码链接
            erWeiMa:"",
        }
    },
    methods:{
        // 初始化页面
        init(){
            this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
            this.postFN({
                url:"/UserIntegral/GetUserIntegralLogList",
                data:{
                    rows:10,
                    page:1
                },
            }).then((r)=>{
                console.log(r);
                if(r.data.state=="success"){
                    this.sumPoint = r.data.data.sumPoint;
                }
                else{
                    console.log("积分接口调用失败");
                } 
            });
        },
        // 前往个人信息页
        toPersonalInfo(){
            this.$router.push({path:"/yuPersonalInfo",query:{}});
        },
        // 前往学习记录
        toStudyRec(){
            this.$router.push({path:"/yuStudyRec",query:{}});
        },
        // 前往我的收藏
        toCollecion(){
            this.$router.push({path:"/fuMyColl",query:{}});
        },
        // 前往我的订单
        toOrder(){
            this.$router.push({path:"/fuMyOrder",query:{}});
        },
        // 前往客服
        toKefu(){
            this.ifShowPop = true;
            this.erWeiMa = "";
            this.postFN({
                url:"/Student/GetSystemCustomerInfo",
            }).then((res)=>{
                this.erWeiMa = res.data.data.QRCode;
            });
        },
        // 前往我的积分页
        toMyPoint(){
            this.$router.push({path:"/yuMyPoint",query:{}});
        },
    },
    created(){
        this.init();
    },
}
</script>

<style lang="less" scoped>
    #yuPersonalCenter
    {
        height: 100%;
        background-color: #f7f7f7;
        .headWrapper
        {
            height: 20rem;
            background-color: #fff;
            margin-bottom: 1rem;
            .tuoyuan
            {
                position: relative;
                height: 11rem;
                width: 100%;
                border-radius: 50%;
                background-color: #27bbd5;
                .rectangle
                {
                    position: relative;
                    background-color: #27bbd5;
                    height: 5.5rem;
                    img
                    {
                        width: 2rem;
                        height: 2rem;
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                    }
                }
                .userIcon
                {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    margin: auto;
                    transform: translateY(40%);
                    width: 6rem;
                    height: 6rem;
                    border-radius: 50%;
                }
            }
            .nameWrapper
            {
                margin-top: 4rem;
                text-align: center;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                padding-left: 40%;
                padding-right: 1rem;
                p
                {
                    &:first-of-type
                    {
                        .userName
                        {
                            color: #999999;
                            font-size: 2rem
                        }
                        i
                        {
                            border-radius: .5rem;
                            background-color: #27bbd5;
                            margin-left: .3rem;
                            color: #fff;
                            padding: 0 .4rem;
                            display: inline-block;
                            text-align: center;
                            height: 1.2rem;
                            line-height: 1.2rem;
                            font-size: .8rem;
                        }
                    }
                    &:nth-of-type(2)
                    {
                        img
                        {
                            height: 1.2rem;
                            width: 1.2rem;
                        }
                        span
                        {
                            font-size: 1.8rem;
                            color: #999999;
                        }
                    }
                }
            }
        }
        .contentWrapper
        {
            background-color: #fff;
            height: 20rem;
            .iconWrapper
            {
                display: flex;
                padding: 2rem 1rem;;
                div
                {
                    flex: 1;
                    text-align: center;
                    img
                    {
                        width: 3rem;
                        height: 3rem;
                    }
                    p
                    {
                        font-size: 1.2rem;
                        color: #949494;
                        margin-top: .5rem;
                    }
                }
            }
        }
        .erWeiMaPop
        {
            img
            {
                width: 20rem;
                height: 20rem;
            }
            .notice
            {
                background-color: rgba(0,0,0,.7);
                text-align: center;
                padding-top: 9px;
                color: #fff;
                font-size: 1.25rem;
                letter-spacing: .2rem;
            }
        }
    }
</style>
