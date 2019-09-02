<template>
    <div id="yuMyPointWrapper">
        <div class="header">
            <img class="userIcon" :src="userHeadIcon"/>
            <div class="content">
                <p class="userName">{{userNickName}}</p>
                <p class="userPoint">
                    <img class="pointIcon" src="../../image/yuRongLiang/myPoint.jpg"/>
                    <span>{{sumPoint}}</span>
                </p>
            </div>
            <span class="ruleWrapper" @click="showPointRule">
                规则
                <img class="ruleIcon" src="../../image/yuRongLiang/help.jpg">
            </span>
            <van-popup v-model="ifShow" class="pop">
                <p class="popTitle">积分获取细则</p>
                <p class="popItem">
                    * 分享好友奖励 10积分
                </p>
                <p class="popItem">
                    * 签到奖励 10积分
                </p>
                <p class="popItem">
                    * 购买课程奖励 1000积分
                </p>
                <p class="popItem">
                    * 邀请好友注册奖励 50积分
                </p>    
            </van-popup>
        </div>

        <div class="getPointList">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getData"
            >
                <div class="getPointItem" v-for="(item,index) in getPointList" :key="index">
                    <div class="left">
                        <p class="item">
                            {{item.F_Desc}}
                        </p>
                        <p class="time">
                            {{item.F_CreatorTime}}
                        </p>
                    </div>
                    <span class="right">
                        +{{item.F_Point}}
                    </span>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
export default {
    name:"yuMyPoint",
    data(){
        return{
            userInfo:{},
            sumPoint:0,
            userNickName:"",
            userHeadIcon:"",
            pageIndex:1,
            finished:false,
            loading:false,
            ifShow:false,
            getPointList:[],
        }
    },
    methods:{
        getData(){
            this.loading = true;
            this.postFN({
                url:"/UserIntegral/GetUserIntegralLogList",
                data:{
                    rows:10,
                    page:this.pageIndex
                },
            }).then((r)=>{
                console.log(r);
                if(r.data.state=="success"){
                    this.sumPoint = r.data.data.sumPoint;
                    let data=r.data.data.rows
                    for(let i=0;i<data.length;i++){
                        this.getPointList.push(data[i])
                    }
                    if(data.length<10){
                        this.loading=false;
                        this.finished=true;
                        return
                    }
                    this.pageIndex++;
                    this.loading=false
                }
                else{
                    this.notFN('获取积分记录失败，请刷新重试！')
                    this.loading=false
                } 
            });
        },

        showPointRule(){
            this.ifShow = true;
        },

        init(){
            this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
            console.log(this.userInfo);
            this.userNickName = this.userInfo.wxInfo.UserNickName;
            this.userHeadIcon = this.userInfo.wxInfo.HeadIcon;
        },

    },
    created(){
        this.init();
    },
}
</script>

<style lang="less" scoped>
    #yuMyPointWrapper
    {
        .header
        {
            box-sizing: border-box;
            height: 15rem;
            background-color: #65cade;
            padding: 4rem;
            display: flex;
            position: relative;
            color: #fff;
            .userIcon
            {
                border-radius: 50%;
                width: 6rem;
                height: 6rem;
                margin-right: 2rem;
                transform: translateY(.5rem);
            }
            .content
            {
                flex: 1;
                .userName
                {
                    font-size: 2rem;
                }
                .userPoint
                {
                    font-size: 3.5rem;
                    img
                    {
                        width: 1.8rem;
                        height: 1.8rem;
                    }
                }
            }
            .ruleWrapper
            {
                position: absolute;
                bottom: 2rem;
                right: 2rem;
                img
                {
                    width: 1.5rem;
                    height: 1.5rem;
                    vertical-align: bottom;
                }
            }
        }

        .getPointList
        {
            .getPointItem
            {
                display: flex;
                padding: 1rem 3rem;
                justify-content: space-between;
                .left
                {   
                    .item
                    {
                        font-size: 1.5rem;
                        margin-bottom: .5rem;
                    }
                    .time
                    {
                        font-size: 1.2rem;
                        color: #424242;
                    }
                }
                .right
                {
                    color: #fe941c;
                    font-size: 2rem;
                    display: flex;
                    align-items: center;
                }
            }
        }

        .pop
        {
            padding: 0 1.5rem 2rem 1.5rem;
            width: 50vw;
            height: 22vh;
            .popTitle
            {
                font-size: 1.4rem;
                border-bottom: 1px solid #c0c0c0;
                text-align: center;
                height: 4rem;
                line-height: 4rem;
                color: #000;
            }
            .popItem
            {
                color: #c0c0c0;
                font-size: 1.2rem;
                margin-top: .5rem;
            }
        }
    }
</style>
