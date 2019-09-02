<template>
    <div id="yuManageIndex">
        <div class="header">
            <img class="headIcon" :src="userInfo.wxInfo.HeadIcon"/>
            <span class="name">{{userInfo.wxInfo.UserNickName}}</span>
            <div class="countArea">
                <div class="item">
                    <span>{{staticsInfo.AddWechatNumber}}</span>
                    <span>添加微信</span>
                </div>
                <div class="item">
                    <span>{{staticsInfo.volume}}</span>
                    <span>成单数量</span>
                </div>
                <div class="item">
                    <span>{{staticsInfo.arrivingAtSchool}}</span>
                    <span>到校人数</span>
                </div>
                <!-- <div @click="toSchool">进入学校端</div> -->
            </div>
        </div>
        <div class="nav">
            <div class="title">
                <img src="../../image/yuRongLiang/star2.jpg"/>
                <span>常用功能</span>
            </div>
            <div class="content">
                <div @click="toSchoolManage">
                    <img src="../../image/yuRongLiang/manage.jpg"/>
                    <p>学生管理</p>
                </div>
                <div @click="toOrderManage">
                    <img src="../../image/yuRongLiang/orderAct.jpg"/>
                    <p>订单详情</p>
                </div>
                <div @click="toDeclaratList">
                    <img src="../../image/yuRongLiang/baodan.jpg"/>
                    <p>报单中心</p>
                </div>
                <div @click="toPublicPool">
                    <img src="../../image/yuRongLiang/publicPool.jpg"/>
                    <p>公有池</p>
                </div>
            </div>
        </div>
        <div class="infoList">
            <div class="title">
                <img src="../../image/yuRongLiang/star2.jpg"/>
                <span>最新订单</span>
            </div>
            <div class="content">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
                    <div class="infoItem" v-for="(item,index) in infoList" :key="index">
                        <i class="spot"></i>
                        <p class="infoContent">{{item.Information}}</p>
                        <p class="infoTime">{{item.F_CreatorTime}}</p>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"yuManageIndex",
    data(){
        return{
            userInfo:{},
            infoList:[],
            staticsInfo:{},
            loading:false,
            finished:false,
            pageIndex:1,
            UserID:"",
        }
    },
    methods:{
        toSchool(){
            this.$router.push({path:"/yuSchoolIndex"});
        },
        // 跳转至学校管理页面
        toSchoolManage(){
            this.$router.push({path:"/fuStudentManage"});
        },
        // 跳转至订单管理页面
        toOrderManage(){
            this.$router.push({path:"/fuOrderManage"});
        },
        // 跳转至报单管理页面
        toDeclaratList(){
            this.$router.push({path:"/fuDeclaratList"});
        },
        // 跳转至公有池
        toPublicPool(){
            this.$router.push({path:"/yuPublicPool"});
        },

        init(){
            this.getTeachIndexData();
            this.getData();
        },

        getData(){
            this.loading = true;
            this.postFN({
                url:"/Student/GetInformation",
                data:{
                    UserID:this.UserID,
                    rows:10,
                    page:this.pageIndex
                },
            }).then((r)=>{
                console.log(r);
                if(r.data.state=="success"){
                    let data=r.data.data;
                    for(let i=0;i<data.length;i++){
                        this.infoList.push(data[i])
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
                    this.notFN('获取资讯失败，请刷新重试！')
                    this.loading=false
                } 
            });
        },

        getTeachIndexData ( ){
            this.postFN({
                url:"/Student/GetStatistics",
                data:{
                UserID:this.UserID,
                StartTime:new Date(1546272000000),
                EndTime:new Date(),
                }
            }).then(r=>{
                console.log(r)
                if(r.data.state == 'success' )
                {
                    let data = r.data.data
                    this.staticsInfo = data;
                }
                else
                {
                    this.errFN('获取数据失败');
                }
            })
        },
    },
    created(){
        this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        this.UserID = this.userInfo.wxInfo.UserId;
        this.init();
    },
}
</script>

<style lang="less" scoped>
    #yuManageIndex{
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
            flex-wrap: wrap;
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
                flex: 1;
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
                    padding: 0 1rem;
                    margin: 2rem 0;
                    color: #969696;
                    border-right: 1px solid #f7f7f7;
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
                    &:last-of-type
                    {
                        border-right: none;
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
    .countArea
    {
        display: flex;
        background-color: #fff;
        width: 100%;
        height: 5rem;
        border-radius: .5rem;
        transform: translateY(1.5rem);
        color: #9f9f9f;
        font-size: 1.2rem;
        .item
        {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
</style>
