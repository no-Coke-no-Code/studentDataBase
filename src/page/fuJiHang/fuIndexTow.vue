/*
 * @Author: fujihang
 * @Date: 2019-03-26 10:17:32
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-05-14 18:46:36
    首页改
 */
<template>
<div id="fuIndexTow">

    <div class="swipe_notice">
        <!-- 首页轮播图 -->
        <van-swipe :autoplay="3000"  :show-indicators="false">
            <van-swipe-item v-for="(item,index) in banner" :key="index" @click="openWin(item.Hyperlink)">
                <img :src="item.FileUrl" :style="{'height':wwWH*1/1.65+'px'}">
            </van-swipe-item>
        </van-swipe>

        <!-- 通告拦 -->
        <div class="notice_Fa">
            <van-notice-bar
                color="#999999"
                background="#ffffff"
                :text="NoticeContent"
                left-icon="volume-o"
            />
        </div>
    </div>

    <!-- 新增导航栏 -->
    <div class="newNavBar">
        <div class="newNavBarItem" @click="toMoreLive">
            <img src="../../image/yuRongLiang/indexNav1.jpg"/>
            <p>线上课程</p>
        </div>
        <div class="newNavBarItem" @click="toMore">
            <img src="../../image/yuRongLiang/indexNav3.jpg"/>
            <p>线下课程</p>
        </div>
        <div class="newNavBarItem" @click="toFN">
            <img src="../../image/yuRongLiang/indexNav4.jpg"/>
            <p>名师风采</p>
        </div>
        <div class="newNavBarItem" @click="toInformation">
            <img src="../../image/yuRongLiang/indexNav2.jpg"/>
            <p>最新资讯</p>
        </div>
    </div>


    <!-- 热门课程 -->
    <div class="hotClass">
        <!-- 导航条 -->
        <div class="hotTop">
            <img src="../../image/fuJiHang/hotClass.png">
            <span>热门课程</span>
            <img class="right" src="../../image/fuJiHang/hotClass.png">
        </div>
        <!-- 热门课程 -->
        <div class="class_contant">
            <van-tabs v-model="active" swipeable color="#27BCD5" :swipe-threshold="5" title-active-color="#27BCD5" title-inactive-color='#999999' @change="getClassFN">
                <van-tab v-for="(item,index) in funContant" :title="item.ItemName" :key="index">
                    <!-- v-show="item.Price>99" -->
                    <schoolCurn type="true"  :data="item" v-for="(item,index) in classData[active]"  :key="index"></schoolCurn>
                </van-tab>
            </van-tabs>
        </div>

        <!-- 更多 -->
        <div class="more" @click="toMore">
            前往更多
        </div>
    </div>

    <!-- 线上课程 -->
    <div class="onLineClass">
        <!-- 导航条 -->
        <div class="hotTop">
            <img src="../../image/fuJiHang/hotClass.png">
            <span>线上课程</span>
            <img class="right" src="../../image/fuJiHang/hotClass.png">
        </div>
        <!-- 线上课程 -->
        <div class="class_contant">
            <van-tabs v-model="activeOnline" swipeable color="#27BCD5" :swipe-threshold="5" title-active-color="#27BCD5" title-inactive-color='#999999' @change="getLiveFn">
                <van-tab v-for="(item,index) in onLineContant" :title="item.ItemName" :key="index">
                    <!-- v-show="item.Price>99" -->
                    <liveCurn :data="item" v-for="(item,index) in liveData[activeOnline]" :key="index"></liveCurn>
                </van-tab>
            </van-tabs>
        </div>

        <!-- 更多 -->
        <div class="more" @click="toMoreLive">
            前往更多
        </div>
    </div>

    <!-- 最新视频 -->
    <!-- <div class="newVidoe"> -->
        <!-- 头部 -->
        <!-- <div class="TopName">
            <img class="img" src="../../image/fuJiHang/xin.png">最新视频
            <span class="more">
                更多
            </span>
            <van-icon name="arrow" />
        </div> -->
        <!-- 内容 -->
        <!-- <div class="contant_vid">
            <div v-for="i in 4" class="child" :key="i">
                <videoChild></videoChild>
            </div>

        </div>
    </div> -->

    <!-- 名师风采 -->
    <div class="okTeach">
        <!-- 头部 -->
        <div class="hotTop">
            <img src="../../image/fuJiHang/hotClass.png">
            <span>名师风采</span>
            <img class="right" src="../../image/fuJiHang/hotClass.png">
        </div>
        <!-- 内容 -->
        <div class="contant_tea">
            <div v-for="(item,index) in teachers" class="child" :key="index">
                <teacher :data="item"></teacher>
            </div>
        </div>
        <p @click="toFN" class="toMore">查看更多 >></p>
    </div>

    <!-- 学员风采 -->
    <!-- <div class="okTeach">

        <div class="TopName">
            <img class="img" src="../../image/fuJiHang/xin.png">学员风采
            <span class="more" @click="toFNS">
                更多
            </span>
            <van-icon name="arrow" />
        </div>

        <div class="contant_tea">
            <div v-for="(item,index) in students" class="child" :key="index">
                <studentFC :data="item"></studentFC>
            </div>

        </div>
    </div> -->
    <!-- 优秀学员 -->
    <!-- <div class="goodStudent"> -->
        <!-- 头部 -->
        <!-- <div class="TopName">
            <img class="img" src="../../image/fuJiHang/xin.png">优秀学员
            <span class="more">
                更多
            </span>
            <van-icon name="arrow" />
        </div> -->
        <!-- 内容 -->
        <!-- <div class="cont_stu">
             <div class="student" v-for="i in 6" :key="i">
                <img class="img" src="../../image/fuJiHang/student.png">
            </div>
        </div>
    </div> -->



</div>
</template>

<script>
import axios from "axios"
import schoolCurn from '../../components/fujihang/schoolCurn'
import teacher from '../../components/fujihang/teacher'
import studentFC from '../../components/fujihang/studentFC'
import videoChild from '../../components/fujihang/videoChild'

import liveCurn from '../../components/yuRongLiang/liveCurn'
export default {
    components:{
        schoolCurn,teacher,videoChild,studentFC,liveCurn
    },
    data(){
        return {
            banner:[
                // {
                //     img:require("../../image/fuJiHang/psff920b48032d4a64-4d9a-4331-9b6b-9643f71809d8.png")
                // },
                // {
                //     img:require("../../image/fuJiHang/psff920b48032d4a64-4d9a-4331-9b6b-9643f71809d8.png")
                // },
            ],//首页轮播图
            active:0,//默认显示在线课程
            activeOnline:0,
            funContant:[
                {
                    ItemName:'热门',
                },
                {
                    ItemName:'眼部',
                },
                {
                    ItemName:'脸部',
                },
                {
                    ItemName:'鼻部',
                },
                {
                    ItemName:'唇部',
                },
            ],//热门课程导航条
            onLineContant:[
                {
                    ItemName:'全部',
                    liveType:-1,
                },
                {
                    ItemName:'直播课程',
                    liveType:0,
                },
                {
                    ItemName:'视频教程',
                    liveType:1,
                },
                {
                    ItemName:'音频教程',
                    liveType:2,
                },
            ],//线上课程导航条
            classData:[],//热门课程数据、
            liveData:[], //直播课程数据
            NoticeContent:'',//公告
            teachers:[],//老师风采
            students:[],//学员风采
            liveType:-1,
            jumpLocation:"",
        };
    },

    methods: {

        // 获取课程
        getClassFN(){
            this.getFN({
                url:"/StudentCourse/GetCourseTypeCourseList?pageSize="+4+"&pageIndex="+1+"&itemId="+this.funContant[this.active].ItemId
            }).then(r=>{
                console.log(r,'看看返回了什么数据');
                let data=r.data
                if(data.state=="success"){
                    this.classData[this.active]=data.data.rows
                    this.$set(this.classData,this.active,this.classData[this.active])//解决有数据不刷新
                }else this.notFN(data.message)
            })
        },
        // 获取课程头部分类
        getHotNav(){
            this.getFN({
                url:"/StudentCourse/GetCourseTypeItem?pageSize=100&pageIndex=1"
            }).then(r=>{
               let data=r.data
                if(data.state=="success"){
                    this.funContant=data.data.rows
                    this.getClassFN();
                }else this.notFN(data.message)
            })
        },
        // 获取轮播图
        getBanner(){
            this.postFN({
                url:'/Student/GetBannerFormJson'
            }).then(r=>{
                if(r.status==200){
                    this.banner=r.data
                }else this.notFN('获取轮播图失败')
            })
        },
        // 轮播图打开新页面
        openWin(url){
            if(url) window.location.href=url
        },
        // 获取轮播图
        getBanner(){
            this.postFN({
                url:'/Student/GetBannerFormJson'
            }).then(r=>{
                if(r.status==200){
                    this.banner=r.data
                }else this.notFN('获取轮播图失败')
            })
        },
        // 获取公告
        getNotice(){
            this.postFN({
                url:'/Student/GetNotice'
            }).then(r=>{
                if(r.data.state=="success"){
                    this.NoticeContent=r.data.data.NoticeContent
                }else this.notFN('获取公告失败')
            })
        },
        // 获取老师风采
        getTeacher(){
            this.postFN({
                url:'/Student/GetTeacherJson',
                data:{
                    page:1,
                    rows:4,
                }
            }).then(r=>{
                if(r.data.state=="success"){
                    this.teachers=r.data.data
                }else this.notFN('获取老师公告失败')
            })
        },
        // 获取学生风采
        getStudent(){
            this.postFN({
                url:'/Student/GetStudentJson',
                data:{
                    page:1,
                    rows:4,
                }
            }).then(r=>{
                let year=new Date().getFullYear()
                if(r.data.state=="success"){
                    this.students=r.data.data
                    let data=r.data.data
                    
                    for(let i=0;i<data.length;i++){
                        if(data[i].F_Birthday){
                           data[i].F_Birthday=year-data[i].F_Birthday.split("-")[0]
                        }
                    }
                }else this.notFN('获取学员风采失败')
            })
        },

        // 更多教师风采
        toFN(){
            this.$router.push({path:'/fuTeachList'})
        },
        // 最新资讯
        toInformation(){
            this.$router.push({path:"/yuInformationList"});
        },
        toFNS(){
            this.$router.push({path:'/fuStudentListFC'})
        },
        // 更多课程
        toMore(){
            this.$router.push({path:'/fuMoreClass?id='+this.funContant[this.active].ItemId+"&name="+this.funContant[this.active].ItemName})
        },
        // 更多直播
        toMoreLive(){
            this.$router.push({path:'/yuMoreLive?name='+this.onLineContant[this.activeOnline].ItemName+"&type="+this.onLineContant[this.activeOnline].liveType});
        },

        // 获取直播
        getLiveFn(){
            // this.getFN({
            //     url:"/StudentCourse/GetLiveCourseInfoList?pageSize="+4+"&pageIndex="+1+"&itemId="+this.funContant[this.active].ItemId
            // }).then(r=>{
            //     let data=r.data
            //     if(data.state=="success"){
            //         this.classData[this.active]=data.data.rows
            //         this.$set(this.classData,this.active,this.classData[this.active])//解决有数据不刷新
            //     }else this.notFN(data.message)
            // })

            // this.liveData = [];
            this.getFN({
                url:"/StudentCourse/GetLiveCourseInfoList?pageSize=4&pageIndex=1&teachingType=1&liveType="+this.onLineContant[this.activeOnline].liveType,
            }).then((res)=>{
                console.log(res.data.data.rows,'不同的直播类型');
                this.liveData[this.activeOnline] = res.data.data.rows;
                this.$set(this.liveData,this.activeOnline,this.liveData[this.activeOnline]);
            });
        },
    },
    mounted(){
        // this.getNotice();
        // this.getTeacher();
        // this.getHotNav();
        // this.getBanner();
        // this.getStudent()
        // return;
        // let url=window.location.href.split("?roleId=")[1]
        // if(url){
        //     console.log(url)
        //     let roleId=url.split("&roleuserid=")[0]
        //     let isClientRO=url.split("&roleuserid=")[1]
        //     let roleuserid=isClientRO.split("&isClient=")[0]
        //     let isClient=isClientRO.split("&isClient=")[1]
        //     console.log(roleId)
        //     console.log(roleuserid)
        //     console.log(isClient)
        //     setTimeout(()=>{
        //         this.getFN({
        //             url:'/userlogin/UserBindRole?roleId='+roleId+'&roleuserid='+roleuserid+'&isClient='+isClient,
        //         }).then(r=>{
        //             console.log(r.data)
        //             alert(r.data.message)
        //             setTimeout(()=>{
        //                 if(r.data.message=='login'){
        //                     window.location.href=r.data.data
        //                     localStorage.setItem('isInvitat',true)
        //                 }
        //             },10000)

        //         })
        //     },5000)

        // }else{
            // 判断登录


            // let isInvitat=localStorage.getItem("isInvitat")
            // console.log(isInvitat)
        if(1){
            let url=window.location.href.split("?roleId=")[1]
            let urlGet=''
            // let isShaoMa=false

            if(url){
            let roleId=url.split("&roleuserid=")[0]
            let roleuserid=url.split("&roleuserid=")[1]
            // isShaoMa=true
            urlGet='https://live.9oasd.com/user/GetUserInfo?roleId='+roleId+'&roleuserid='+roleuserid
            }
            else
            {
                urlGet='https://live.9oasd.com/user/GetUserInfo'
                // if(this.getCookie('isLogin')){
                //     this.redirctFN();
                //     this.getHotNav();
                //     return
                // }

                let luruStudentId = window.location.href.split("?luruStudentUserId=")[1];
                console.log(luruStudentId,'录入的学生ID');
                if(luruStudentId)
                {
                    urlGet += "?luruStudentUserId="+luruStudentId;
                }
            }
            this.getFN({
                url:urlGet
            }).then((r)=>{
                console.log(r);
                if(r.data.state=='warning') {
                    window.location.href = r.data.data;
                }
                else if(r.data.state=='info'){
                    console.log(r);
                    console.log(r.data.data);
                    localStorage.setItem('userInfo',JSON.stringify(r.data.data))
                    this.redirctFN(r.data.data.RoleName);
                    // if(!isShaoMa){this.setCookie('isLogin',"login",24)}
                }
                else if(r.data.state == "faild" || r.data.state == "error")
                {
                    this.errFN("用户登录失败！！");
                }
            });
        }




        // this.redirctFN();
        this.getHotNav();
        this.getBanner();
        this.getNotice();
        this.getTeacher();
        this.getStudent();
        this.getLiveFn();
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuIndexTow{
    .nC;.hO;
    background: #F7F7F7;
    .swipe_notice{
        position: relative;
        // 首页轮播图
        .van-swipe{
            img{
                object-fit: cover;
                width: 100%;
            }
        }

        // 通告拦
        .notice_Fa{
            bottom: -20px;
            position: absolute;
            width: 100%;
            padding: 0 1rem;
            .fBB;
            .van-notice-bar
            {
                border-radius: 1rem;
                height: 3rem;
            }
        }

    }

    // 新导航栏
    .newNavBar
    {
        background-color: #fff;
        display: flex;
        margin-top: 3rem;
        padding: 1.5rem .5rem;
        .newNavBarItem
        {
            flex: 1;
            text-align: center;
            color: #bababa;
            border-left: 1px solid #25bdd4;
            font-size: 1.2rem;
            &:first-of-type
            {
                border: none;
            }
            img
            {
                width: 2.5rem;
                height: 2.5rem;
                margin-bottom: .5rem;
            }
        }
    }


    // 热门课程
    .hotClass,.onLineClass{
        margin-top: .5rem;
        .bW;
        // 导航条
        .hotTop{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.25rem;
            color: #27BCD5;
            font-weight: 650;
            padding: 1rem;
            >img{
                height: .6rem;
                margin: .3rem;
            }
            .right{
                transform: rotateY(180deg);
            }
        }
        // 课程
        .class_contant{
            overflow: hidden;
            .van-tabs{
                .van-hairline--top-bottom::after{
                    border-width: 0;
                }
                height: 100%;
                .van-tabs__content{
                    height: 100%;
                    .bW;
                    .van-tab__pane{
                        height: 100%;
                        .fBB;
                        overflow: auto;
                        >:last-child{
                            border: none;
                        }
                    }
                }
            }
        }
        // 更多
        .more{
            .fBB;
            border-top: 1px solid rgb(245, 245, 245);
            text-align: center;
            padding: 1rem 0;
            color: #999;
            font-weight: 650;
            font-size: 1.1rem;
        }
    }

    // 教师风采
    .okTeach{
        margin-top: 1rem;
        background-color: #fff;
        .hotTop{
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.25rem;
            color: #27BCD5;
            font-weight: 650;
            padding: 1rem;
            >img{
                height: .6rem;
                margin: .3rem;
            }
            .right{
                transform: rotateY(180deg);
            }
        }
        // 头部
        .TopName{
            .bW;
            display: flex;
            align-items: center;
            padding: 1rem 1.2rem;
            font-size: 1.3rem;
            .fBB;.bBS;.tC;
            .img{
                margin-right: .3rem;
                height: 1.7rem;
            }
            .more{
                text-align: right;
                flex: 1;
                margin-right: .3rem;
                color: #999999;
            }
            .van-icon-arrow{
                color: #999999;
            }
        }
        .contant_tea{
            .bW;
            // display: flex;
            // flex-wrap: wrap;
            .fBB;
            padding: .5rem 0;
            // 子
            .child{
                .fBB;
                // width: 50%;
                &:last-of-type
                {
                    .teacher
                    {
                        border: none;
                    }
                }
            }
        }
        .toMore
        {
            text-align: center;
            font-size: 1.3rem;
            padding-bottom: 1rem;
            color:#bababa;
        }
    }
    // 优秀学员
    .goodStudent{
        margin-top: 1rem;
        .bW;
        .TopName{
            .bW;
            display: flex;
            align-items: center;
            padding: 1rem 1.2rem;
            font-size: 1.3rem;
            .fBB;.bBS;.tC;
            .img{
                margin-right: .3rem;
                height: 1.7rem;
            }
            .more{
                text-align: right;
                flex: 1;
                margin-right: .3rem;
                color: #999999;
            }
            .van-icon-arrow{
                color: #999999;
            }
        }
        .cont_stu{
            display: flex;
            overflow: hidden;
            overflow-x: auto;
            padding: .5rem .5rem;
            .fBB;
            .student{
                padding: .5rem .5rem;
                .fBB;
                .img{
                    height: 12rem;
                    width: 8.5rem;
                    object-fit: cover;
                }
            }
        }
    }
    // 最新视频
    .newVidoe{
        // 头部
        margin-top: 1rem;
        .TopName{
            .bW;
            display: flex;
            align-items: center;
            padding: 1rem 1.2rem;
            font-size: 1.3rem;
            .fBB;.bBS;.tC;
            .img{
                margin-right: .3rem;
                height: 1.7rem;
            }
            .more{
                text-align: right;
                flex: 1;
                margin-right: .3rem;
                color: #999999;
            }
            .van-icon-arrow{
                color: #999999;
            }
        }
        //内容
        .contant_vid{
            .bW;
            display: flex;
            flex-wrap: wrap;
            .fBB;
            padding: .5rem .5rem;
            // 子
            .child{
                overflow: hidden;
                border-radius: .3rem;
                margin: .5rem .5rem;
                width: calc(50% - 1rem);
                .fBB;
                border:1px solid rgb(245, 245, 245);
            }
        }
    }
}
</style>
