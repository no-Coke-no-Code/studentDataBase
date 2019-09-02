/*
 * @Author: fujihang
 * @Date: 2019-03-22 20:32:09
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-16 20:57:45
    a/b管理员首页
 */
<template>
<div id="fuManageIndex">
    <!--头部 -->
    <div class="indexTop">
        <img class="logo" :src="userInfo.F_HeadIcon">
        <div class="content">
            <div class="nat_dat">
                <span class="nat_name">Hi~今天的数据请收下</span>
                <span class="time" @click="TimeData.show=!TimeData.show">{{TimeData.val}}</span>
                <van-icon name="arrow" size="1.3rem"/>
                <div :class="['chooseDay',TimeData.show?'open':'']">
                    <img src="../../image/fuJiHang/alertJ.svg">
                    <div class="alert">
                         <div class="list" @click="chooseTime(index,item)" v-for="(item,index) in chooseList" :key="index">{{item}}</div>
                    </div>
                </div>
            </div>
            <div class="neorou">
                <span class="child" v-for="(item,index) in native" :key="index" @click="toFN(index)">
                    <div class="num">
                        {{item.val}}
                        <div class="dot"  v-show="item.val>0&&index==2">
                            <span></span>
                        </div>
                    </div>
                    <div class="name">
                        {{item.name}}
                    </div>
                </span>
            </div>
        </div>
    </div>

    <!-- 最新资讯 -->
    <div class="information">
        <div class="topName">
            <img class="img" src="../../image/fuJiHang/xin.png">
            最新资讯
        </div>

        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getNews"
        >
            <div class="list_infor" v-for="(item,index) in newList.data" :key="index">
                <div class="hot"></div>
                <div class="content">
                    <div class="name">
                        {{item.Information}}
                    </div>
                    <div class="time">
                        {{item.F_CreatorTime}}
                    </div>
                </div>
            </div>
            

        </van-list>


        




    </div>


</div>
</template>

<script>
export default {
    data(){
        return {
            userInfo:JSON.parse(localStorage.getItem('userInfo')),
            // userInfo:{
            //     wxInfo:{},
            // },
            startTime:new Date(new Date().setHours(0,0,0,0)),
            endTime:new Date(),
            newList:{
                page:1,
                data:[]

            },//最新资讯
            loading:false,//加载状态
            finished:false,//是否加载完成
            native:[
                {
                    name:'微信总量',
                    val:0,
                    data:'AddWechatNumber',
                },
                {
                    name:'已成交量',
                    val:0,
                    data:'volume',
                },
                {
                    name:'审核通知',
                    val:0,
                    data:'examine',
                },
            ],//头部内容
            chooseList:[
                '今日','昨日','本周','本月',
            ],
            TimeData:{
                show:false,
                val:'今日'
            },//选择的时间
        };
    },

    methods: {
        toFN(index){
            if(index==2) this.$router.push({path:'/fuAuditing'})
        },
        // 选择时间
        chooseTime(index,item){
            this.TimeData={
                val:item,
                show:false
            }

            switch(index){
                case 0:
                    this.startTime=new Date(new Date().setHours(0,0,0,0))
                    this.endTime=new Date()
                    this.getData()
                break;
                case 1:
                    let time=new Date().setHours(0,0,0,0)-86400*1000
                    this.startTime=new Date(time)
                    this.endTime=new Date(new Date().setHours(0,0,0,0))
                    this.getData()
                break;
                case 2:
                    let timeW=new Date().setHours(0,0,0,0)-86400*7000
                    this.startTime=new Date(timeW)
                    this.endTime=new Date()
                    this.getData()
                break;
                case 3:
                    let timeM=new Date().setHours(0,0,0,0)-86400*30000
                    this.startTime=new Date(timeM)
                    this.endTime=new Date()
                    this.getData()
                break;
            }
        },
        // 获取数据
        getData(){
            this.postFN({
                url:'/Student/GetStatistics',
                data:{
                    // UserID:'7AAFA442-F458-4935-A9DC-C5D8EE951D60',
                    UserID:this.userInfo.wxInfo.UserId,
                    StartTime:this.startTime,
                    EndTime:this.endTime,
                }
            }).then(r=>{
                if(r.data.state=="success"){
                    let data=r.data.data
                   for(let i=0;i<this.native.length;i++){
                       this.native[i].val=data[this.native[i].data]
                   }
                }else this.notFN('数据统计获取失败，请刷新页面重试！')
            })
        },

        // 获取最新咨询
        getNews(){
            this.loading=true
            this.postFN({
                url:'/Student/GetInformation',
                data:{
                    // UserID:'7AAFA442-F458-4935-A9DC-C5D8EE951D60',
                    UserID:this.userInfo.wxInfo.UserId,
                    rows:7,
                    page:this.newList.page,
                }
            }).then(r=>{
                if(r.data.state=="success"){
                    let data=r.data.data
                    for(let i=0;i<data.length;i++){
                        this.newList.data.push(data[i])
                    }
                    if(data.length<7){
                        this.loading=false
                        this.finished=true
                        return
                    }
                    this.newList.page++
                    this.loading=false
                }else this.notFN('最新资讯获取失败，请刷新页面重试！')
            })
        }
    },
    mounted(){
        this.getNews();
        this.getData();
    }
    
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuManageIndex{
    .mRB;.nC;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .indexTop{
        color: white;
        .fBMRB;
        display: flex;
        align-items: center;
        .fBB;
        padding:1.5rem  1rem;
        .logo{
            height: 7rem;
            width: 7rem;
            border-radius: 50%;
        }
        .content{
            height: 6rem;
            flex: 1;
            margin-left: 1rem;
            display: flex;
            flex-direction: column;
            font-size: 1.1rem;
            .nat_dat{
                position: relative;
                display: flex;
                align-items: center;
                .nat_name{
                    font-size: 1.3rem;
                    flex: 1;
                }
                .time{
                    font-size: 1.2rem;
                    margin-right: .3rem;
                }
                .chooseDay{
                    .nC;
                    top: 0;
                    transform: translateY(2rem);
                    right: 0;
                    z-index: -1;
                    .fBB;
                    position: absolute;
                    text-align: center;
                    opacity: 0;
                    transition: .3s;
                    >img{
                        height: 2rem;
                    }
                    .alert{
                        margin-top: -1rem;
                        .bW;
                        padding: 0 1rem;
                        .list{
                            font-size: 1.1rem;
                            .bBS;
                            padding: .5rem;
                            .fBB;
                        }
                    }
                }
                .open{
                    z-index: 9;
                    transform: translateY(1rem);
                    opacity: 1;
                }
            }
            .neorou{
                flex: 1;
                display: flex;
                align-items: flex-end;
                font-size: 1.2rem;
                .num{
                    position: relative;
                    .dot{
                        top: 0;
                        width: 100%;
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        >span{
                            margin-left: 2rem;
                            display: block;
                            height: .7rem;
                            width: .7rem;
                            border-radius: 50%;
                            background: #FF5D5D;
                        }
                    }
                }
                .child{
                    flex: 1;
                    text-align: center;
                }

            }
        }
    }

    .information{
        flex: 1;
        margin-top: 1rem;
        .bW;
        overflow: hidden;
        flex-direction: column;
        display: flex;
        .topName{
            display: flex;
            align-items: center;
            padding: 1rem;
            color:#7AD6E5;
            .fBB;
            .bBS;
            font-size: 1.3rem;
            .img{
                margin-right: .3rem;
                height: 1.7rem;
            }
        }
        .van-list{
            flex: 1;
            overflow: auto;
            .fBB;
            padding-bottom: 2rem;
        }
        .list_infor{
            padding: 1rem 1rem 1rem 0;
            margin-left: 1rem;
            .fBB;
            display: flex;
            align-items: center;
            .bBS;
            .content{
                flex: 1;
                margin-left: 1rem;
                .name{
                    font-size: 1.2rem;
                    margin-bottom: .6rem;
                }
                .time{
                    font-size: 1.1rem;
                    color: #999;
                }
            }
            .hot{
                height: .5rem;
                width: .5rem;
                background: #E69D7D;
                border-radius: 50%;
            }
        }

    }
}
</style>
