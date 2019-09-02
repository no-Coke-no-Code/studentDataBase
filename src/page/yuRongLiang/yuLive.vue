<template>
    <div id="yuLive">
        <div class="yuLiveBanner">
            <img :src="courseDetail.F_Logo" style="width:100%;height:100%;"/>
        </div>
        <van-tabs v-model="activeOnline" swipeable color="#27BCD5" :swipe-threshold="5" title-active-color="#27BCD5" title-inactive-color='#999999' @change="getClassFN" class="tabsWrapper">
            <!-- <van-tab v-for="(item,index) in liveChoose" :title="item.ItemName" :key="index">
            </van-tab> -->
            <van-tab title="详情">
                <div class="detailWrapper" v-html="courseDetail.OutLine">
                </div>
            </van-tab>
            <van-tab title="目录" class="testing">
                <div class="liveList">
                    <div v-for="(item,index) in chapterList" :key="index" class="liveListItem" @click="toLiveDetail(item)">
                        <p>
                            <i class="icon">{{item.F_LiveType==1?'视频':item.F_LiveType==2?'音频':'直播'}}</i>
                            {{item.F_Name}}
                            <span v-if="ifBuy" class="bought">[已购买]</span>
                            <span v-else-if="item.F_Audition==true" class="try">[试听]</span>
                            <span v-else-if="item.F_Audition==false" class="price">[收费]</span>
                            <img src="../../image/yuRongLiang/play.jpg" class="playIcon" v-if="!item.F_LiveStatus&&item.F_LiveType"/>
                            <span class="living" v-if="item.F_LiveStatus==1"><i>直播中</i></span>
                        </p>
                        <span class="liveLong" v-if="item.F_LiveType">{{item.F_timeLong}}</span>
                        <img src="../../image/yuRongLiang/play.jpg" class="playIcon" v-if="item.F_LiveStatus==2&&!item.F_LiveType"/>
                    </div>
                </div>
                <div class="warning" v-if="!ifBuy">
                    <img src="../../image/yuRongLiang/warn.jpg"/>
                    <p>请先购买课程后再学习!!!</p>
                </div>
            </van-tab>

            <van-popup v-model="videoPop" class="videoPop">
                <div class="close" @click="closeVideo">X</div>
                <video autoplay :src="videoSrc" controls="controls"></video>
            </van-popup>
            <van-popup v-model="audioPop" class="audioPop">
                <audio autoplay controls :src="audioSrc"></audio>
            </van-popup>

            <van-tab :title="'评价('+ commentNum +')'">
                <div class="ratingWrapper">
                    <div class="rating">
                        <p>评价该课程</p>
                        <van-rate v-model="comment.point" color="#898a8e"></van-rate>
                        <textarea class="contentArea" placeholder="请输入评论（200字以内）" v-model="comment.content" ></textarea>
                        <p>您的宝贵评价，对我们十分重要哦</p>
                        <van-button type="info" @click="makeComment">发表评价</van-button>
                    </div>
                    <div class="rateList">
                        <p>全部评价</p>
                        <div class="ratetotal">
                            <span>{{this.pointAverage}}</span>
                            <div class="starList">
                                <div>
                                    <van-rate v-model="initRateList[4]" readonly></van-rate>
                                    <van-rate v-model="initRateList[4]" readonly></van-rate>
                                    <van-rate v-model="initRateList[4]" readonly></van-rate>
                                    <van-rate v-model="initRateList[4]" readonly></van-rate>
                                    <van-rate v-model="initRateList[4]" readonly></van-rate>
                                </div>
                            </div>
                            <div class="barList">
                                <van-progress :percentage="datapointGroup[4]" :show-pivot="false" color="#757575" ></van-progress>
                                <van-progress :percentage="datapointGroup[3]" :show-pivot="false" color="#757575" ></van-progress>
                                <van-progress :percentage="datapointGroup[2]" :show-pivot="false" color="#757575" ></van-progress>
                                <van-progress :percentage="datapointGroup[1]" :show-pivot="false" color="#757575" ></van-progress>
                                <van-progress :percentage="datapointGroup[0]" :show-pivot="false" color="#757575" ></van-progress>
                            </div>
                        </div>

                        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
                            <yuRateCard v-for="(item,index) in commentList" :key="index" :item="item"></yuRateCard>
                        </van-list>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <div class="bottomBar">
            <span class="advice" @click="getAdvice">
                <img src="../../image/yuRongLiang/chat.jpg"/>
                咨询
            </span>
            <span class="collect" @click="collect">
                <img src="../../image/yuRongLiang/star.jpg"/>
                <span>{{ifCollect?"已收藏":"收藏"}}</span>
            </span>
            <!-- 未购买状态 -->
            <span v-if="!ifBuy" class="buyNow" @click="buyClass">立刻购买</span>
            <!-- 已购买状态 -->
            <span v-if="ifBuy" class="haveBought">已购买</span>
        </div>

        <van-popup v-model="ifPopShow" position="bottom">
            <div class="popHeader">
                <span>咨询交流</span>
            </div>
            <div class="popContent" @click="showErWeiMa">
                <img :src="erWeiMa" class="erWeiMa"/>
                <div class="content">
                    <p>
                        <span>微信咨询</span>
                        <span>></span>
                    </p>
                    <span>点击弹出二维码并识别</span>
                </div>
            </div>
            <div class="popFooter" @click="closePop">
                <span>关闭</span>
            </div>
        </van-popup>

        <van-popup class="erWeiMaPop"  v-model="ifShowBigErweiMa">
            <img :src="erWeiMa"/>
            <p class="notice">长按识别二维码</p>
        </van-popup>
    </div>
</template>

<script>
import yuRateCard from "./yuRateCard.vue";
import axios from 'axios';

export default {
    components:{
        yuRateCard
    },
    data(){
        return{
            audioSrc:"",
            audioPop:false,
            videoSrc:"",
            videoPop:false,
            erWeiMa:"",
            schoolCourseId:"",
            ifShowBigErweiMa:false,
            ifPopShow:false,
            initRateList:[1,2,3,4,5],
            activeOnline:"",
            liveChoose:[
                {
                    ItemName:"详情",
                },
                {
                    ItemName:"目录",
                },
                {
                    ItemName:"评价",
                }
            ],
            chapterList:[],
            courseId:"",
            userId:"",
            
            loading:false,//加载状态
            finished:false,//加载完成

            commentNum:0,
            commentPageIndex:1,
            commentList:[],
            comment:{
                point:0,
                content:"",
            },
            courseDetail:{},
            pointAverage:0,
            datapointGroup:[],
            ifBuy:"",
            ifCollect:"",
        }
    },
    methods:{
        // 关闭视频直播弹窗
        closeVideo(){
            this.videoPop = false;
        },

        getClassFN(val){
            console.log(val);
        },

        toLiveDetail(course){
            if(!course.F_Audition&&!this.ifBuy)
            {
                this.notFN("请先购买该课程");
                return;
            }
            var userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
            var userId = userInfo.wxInfo.UserId;
            var userNickName = userInfo.wxInfo.UserNickName;
            var userIcon = userInfo.wxInfo.HeadIcon;
            if(course.F_LiveStatus == 0)
            {
                this.notFN("该章节尚未开始哦");
                return;
            }
            else if(course.F_LiveStatus == 1)
            {
                if(this.ifBuy || course.F_Audition)
                {
                    var url = "https://live.9oasd.com/livePage/live/class.html?chapterId="+course.F_Id;
                    window.localStorage.setItem("schoolCourseId",this.schoolCourseId);
                    this.postFN({
                        url:"/StudyLog/SubmitForm",
                        data:{
                            schoolCourseId:this.schoolCourseId,
                        },
                    }).then((res)=>{
                        console.log(res);
                        window.location = url;
                    });
                }
            }
            else if(course.F_LiveStatus == 2)
            {
                this.videoPop = true;
                this.videoSrc = course.F_PlayAddress;
            }

            if(course.F_LiveType == 1)
            {
                this.videoPop = true;
                this.videoSrc = course.F_PlayAddress;
            }
            else if(course.F_LiveType == 2)
            {
                this.audioPop = true;
                this.audioSrc = course.F_PlayAddress;
            }
        },

        getAdvice(){
            this.ifPopShow = true;
        },

        closePop(){
            this.ifPopShow = false;
        },

        showErWeiMa(){
            this.ifShowBigErweiMa = true;
        },

        // 添加课程评论
        makeComment(){
            if(this.comment.content == "" || this.comment.point == 0)
            {
                this.$toast({
                    type: 'fail',
                    message: '请完整评论',
                    position: 'middle',
                    duration: 2000
                })
                return;
            }
            axios({
                method:"post",
                url:"https://live.9oasd.com/StudentCourse/AddComment",
                data:{
                    schoolCourseId:this.courseId,
                    comment:this.comment.content,
                    point:this.comment.point,
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(r=>{
                if(r.data.state == "success")
                {
                    this.$toast({
                        type: 'success',
                        message: '成功评价',
                        position: 'middle',
                        duration: 1000
                    });
                    window.location.reload();
                }
            })
        },

        // 获取课程评论
        getComment(){
            this.postFN({
                url:"/StudentCourse/GetComment",
                data:{
                    schoolCourseId:this.courseId,
                    pageIndex:this.commentPageIndex,	
                    pageSize:10,
                },
            }).then((res)=>{
                this.commentNum = res.data.data.records;
                this.pointAverage = res.data.data.pointAvg;
                var total = 0;
                // for(let i = 0;i<res.data.data.pointGroup.length;i++)
                // {
                //     total += res.data.data.pointGroup[i];
                //     console.log(res.data.data.pointGroup[i]);
                // }
                // for(let i = 0;i<res.data.data.pointGroup.length;i++)
                // {
                //     let percentage = res.data.data.pointGroup[i]/total;
                //     this.datapointGroup.push(percentage*100);
                // }
                for(let i in res.data.data.pointGroup)
                {
                    total += res.data.data.pointGroup[i];
                }
                for(let i in res.data.data.pointGroup)
                {
                    let percentage = res.data.data.pointGroup[i]/total;
                    this.datapointGroup.push(percentage*100);
                }
            });
        },

        getData(){
            this.loading = true;
            this.postFN({
                url:"/StudentCourse/GetComment",
                data:{
                    schoolCourseId:this.courseId,
                    pageIndex:this.commentPageIndex,	
                    pageSize:10,
                },
            }).then((res)=>{
                for(let i = 0;i<res.data.data.rows.length;i++)
                {
                    this.commentList.push(res.data.data.rows[i]);
                }
                if(res.data.data.rows.length<10){
                    this.loading=false;
                    this.finished=true;
                    return
                }
                this.pageIndex++;
                this.loading=false;
                this.finished=true;
            });
        },

        // 收藏课程
        collect(){
            this.getFN({
                url:"/StudentCourse/SetUserTeacherOrCourse?type=0&collectionId="+this.schoolCourseId,
            }).then((res)=>{
                if(res.data.state == "success")
                {
                    if(this.ifCollect)
                    {
                        this.ifCollect = false;
                        this.$toast({
                            type: 'success',
                            message: '已取消收藏',
                            position: 'middle',
                            duration: 1000
                        })
                    }
                    else
                    {
                        this.ifCollect = true;
                        this.$toast({
                            type: 'success',
                            message: '已收藏',
                            position: 'middle',
                            duration: 1000
                        })
                    }
                }
            });
        },

        // 获取当前课程目录
        getChapter(){
            this.getFN({
                url:"/StudentCourse/GetCourseChapterList?courseId="+this.courseId,
            }).then((res)=>{
                this.chapterList = res.data.data;
                console.log(this.chapterList,'我想看看这个');
                for(let i = 0;i<this.chapterList.length;i++)
                {
                    let timeLong;
                    let startTime = this.chapterList[i].F_LiveStartTime;
                    let closeTime = this.chapterList[i].F_LiveCloseTime;
                    startTime = startTime.replace(/-/g,'/');
                    closeTime = closeTime.replace(/-/g,'/');
                    startTime = new Date(startTime).getTime();
                    closeTime = new Date(closeTime).getTime();
                    // 获取长度为多少秒
                    timeLong = (closeTime - startTime)/1000;
                    let minute = timeLong/60;
                    let second = timeLong%60;
                    if(minute <= 0)
                    {
                        minute = "00";
                    }
                    if(second <= 10)
                    {
                        second = "0" + second;
                    }
                    this.chapterList[i].F_timeLong = minute + ":" + second;
                }
            });
        },

        // 获取当前课程详情简介
        getLiveDetail(){
            console.log(this.courseId,'课程ID');
            console.log(this.schoolCourseId,'学校课程ID');
            this.postFN({
                url:"/Student/GetLiveSchoolCourse",
                data:{
                    schoolCourseId:this.schoolCourseId,
                },
            }).then((res)=>{
                console.log(res);
                this.courseDetail = res.data.data.model;
                this.ifBuy = res.data.data.isBuy;
                this.ifCollect = res.data.data.isCollect;
                this.erWeiMa = res.data.data.customer.QRCode;
                console.log(this.courseDetail,"课程信息");
                axios({
                    url:this.courseDetail.OutLine,
                    method:"get",
                    headers:{
                        'Content-Type': 'application/json; application/octet-stream'
                    },
                    responseType: 'blob',
                }).then((r)=>{
                    this.changeRGB(r.data).then(j => {
                        this.courseDetail.OutLine = j
                    })
                });
            });
        },

        // 增加课程播放量
        addPlayCount(){
            this.postFN({
                url:"/StudentCourse/AddPlayCount",
                data:{
                    courseId:this.courseId,
                    type:0,
                },
            }).then((res)=>{
                if(res.data.state == "success")
                {
                }
            });
        },

        initPage(){
            this.courseId = this.$route.query.courseId;
            this.schoolCourseId = this.$route.query.SchoolCourseId;
            this.getLiveDetail();
            this.getComment();
            this.getChapter();
            this.addPlayCount();
            console.log(window.localStorage);
        },

        buyClass(){
            this.getFN({
                url:"/StudentCourse/IsAddLiveOrderInspect?schoolCourseId="+this.schoolCourseId,
            }).then((res)=>{
                console.log(res);
                if(res.data.state == "success")
                {
                    window.localStorage.setItem("courseDetail",JSON.stringify(this.courseDetail));
                    this.$router.push({
                        path:"/yuConfirmLiveOrder",
                    });
                }
                else
                {
                    this.$toast({
                        type: 'fail',
                        message: res.data.message,
                        position: 'middle',
                        duration: 2000
                    })
                }
            });
        },
    },

    created(){
        this.initPage();
    },
}
</script>

<style lang="less" >
#yuLive
{
    .testing
    {
        display: flex;
        flex-direction: column;
    }
    position: relative;
    .yuLiveBanner
    {
        width:100%;
        height: 200px;
    }

    .van-tab
    {
        background-color: #f2f1f6;
    }
    .van-ellipsis
    {
        color: black;
        font-size: 1.5rem;
    }
    .van-tab--active .van-ellipsis
    {
        color:#27BCD5;
    }
    .tabsWrapper
    {
        padding-bottom: 5.5rem;
    }

    .detailWrapper
    {
        background-color: #fff;
        padding: 1rem;
    }

    .liveList
    {
        background-color: #fff;
        .liveListItem
        {
            height: 4rem;
            line-height: 4rem;
            border-bottom:1px solid #ececec;
            font-size: 1.5rem;
            display: flex;
            padding: 0 1rem;
            justify-content: space-between;
            align-items: center;
            .icon
            {
                width: .5rem;
                height:.5rem;
                border: 1px solid #27BCD5;
                border-radius: .5rem;
                color: #27BCD5;
                font-size: .9rem;
                padding: .1rem;
                vertical-align: bottom;
            }
            .try
            {
                color: green;
            }
            .price
            {
                color:red;
            }
            .bought
            {
                color: #36d49a
            }
            .liveLong
            {
                float: right;
                margin-right: 1rem;
            }
            .playIcon
            {
                margin-left: 1rem;
                vertical-align: middle;
                width: 1.5rem;
                height: 1.5rem;
            }
            .living
            {
                display: inline-block;
                height: 1.5rem;
                line-height: 1.5rem;
                width: 4rem;
                font-size: 1rem;
                text-align: center;
                border-radius: 1.5rem;
                background-color: red;
                color: #fff;
                vertical-align: middle;
                margin-left: 1rem;
                position: relative;
                i
                {
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                }
            }
        }
    }
    .warning
    {
        background-color: #f0eff5; 
        text-align: center;
        img
        {
            width: 8rem;
            height: 8rem;
            margin-top: 4rem;
        }
        p
        {
            font-size: 2.5rem;
            margin-top: 3.5rem;
            padding-bottom: 4rem;
        }
    }

    .ratingWrapper
    {
        background-color: #f8f9fb;
        // padding-bottom:5rem;
        .rating
        {
            padding: 2.5rem 2rem;
            padding-bottom: 1rem;
            background-color: #fff;
            margin-bottom: 1rem;
            text-align: center;
            font-size: 1.25rem;
            p:first-of-type
            {
                text-align: left;
            }
            .van-rate
            {
                margin-top: 1rem;
                margin-bottom: 1rem;
            }
            .van-button
            {
                height: 4rem;
                line-height: 4rem;
                margin-top: 1rem;
            }
            .contentArea
            {
                padding: 0.3rem;
                width: 18rem;
                height: 6rem;
                resize: none;
                border: 1px solid #c0c0c0;
            }
            p:last-of-type
            {
                color: #797979;
            }
        }
        .rateList
        {
            background-color: #fff;
            color: #757575;
            padding:1.5rem 1em;
            p:first-of-type
            {
                font-size:1.25rem;
            }
            .ratetotal
            {
                display: flex;
                margin-bottom:1rem;
                >span
                {
                    display: inline-block;
                    font-size: 6rem;
                    width: 6rem;
                }
                .count
                {
                    margin-left: 4rem;
                }
                .starList
                {
                    margin-left: 3rem;
                    div
                    {
                        &:nth-of-type(2)
                        {
                            .van-rate__item:nth-of-type(1)
                            {
                                visibility: hidden;
                            }
                        }
                        &:nth-of-type(3)
                        {
                            .van-rate__item:nth-of-type(1)
                            {
                                visibility: hidden;
                            }
                            .van-rate__item:nth-of-type(2)
                            {
                                visibility: hidden;
                            }
                        }
                        &:nth-of-type(4)
                        {
                            .van-rate__item:nth-of-type(1)
                            {
                                visibility: hidden;
                            }
                            .van-rate__item:nth-of-type(2)
                            {
                                visibility: hidden;
                            }
                            .van-rate__item:nth-of-type(3)
                            {
                                visibility: hidden;
                            }
                        }
                        &:nth-of-type(5)
                        {
                            .van-rate__item:nth-of-type(1)
                            {
                                visibility: hidden;
                            }
                            .van-rate__item:nth-of-type(2)
                            {
                                visibility: hidden;
                            }
                            .van-rate__item:nth-of-type(3)
                            {
                                visibility: hidden;
                            }
                            .van-rate__item:nth-of-type(4)
                            {
                                visibility: hidden;
                            }
                        }
                    }
                }
                .barList
                {
                    flex: 1;
                    margin-left: 1rem;
                    .van-progress
                    {
                        margin-top: .3rem;
                        margin-bottom: .9rem;
                    }
                }
            }
            .van-rate__icon
            {
                color: #898a8e !important;
                font-size: 1rem !important;
            }
            .van-icon-star-o:before
            {
                display: none;
            }
        }
    }


    .bottomBar
    {
        width: 100%;
        height: 5.5rem;
        display: flex;
        position: fixed;
        bottom: 0;
        border-top: 1px solid #e2e2e2;
        background-color:#fff;
        .buyNow,.haveBought
        {
            background-color: red;
            color: #fff;
            font-size: 1.8rem;
            width:45%;
        }
        .haveBought
        {
            background-color: #e2e2e2;
        }
        .buyNow,.advice,.collect,.haveBought
        {
            line-height: 5.5rem;
            text-align: center;
        }
        .advice,.collect
        {
            flex:1;
            border-right: 1px solid #e2e2e2;
            font-size: 1.5rem;
            color:#666666;
            img
            {
                width: 2rem;
                vertical-align: sub;
                height: 2rem;
            }
        }
    }

    #yuRateCard .rateContent p .van-rate__icon
    {
        color: #2ba8be !important;
    }

    .van-popup
    {
        background-color: #f4f5f9;
        .popHeader,.popContent,.popFooter
        {
            background-color: #fff;
        }
        .popHeader,.popFooter
        {
            height: 4rem;
            line-height: 4rem;
            text-align: center;
            font-size: 1.4rem;
        }
        .popHeader
        {
            border-bottom: 1px solid #f4f5f9;
        }
        .popContent
        {
            display: flex;
            padding: 2rem;
            margin-bottom: 1rem;
            .erWeiMa
            {
                width: 5rem;
                height: 5rem;
            }
            .content
            {
                margin-left: 1.5rem;
                flex: 1;
                p
                {
                    margin-bottom: 1.25rem;
                    color: #27BCD5;
                    font-size: 1.5rem;
                    span:nth-of-type(2)
                    {
                        float: right;
                    }
                }
            }
        }
        .popFooter
        {
            color: #27BCD5;
        }
        .notice
        {
            background-color: rgba(0,0,0,.69);
            text-align: center;
            padding-top: 9px;
            color: #fff;
            font-size: 1.25rem;
            letter-spacing: .2rem;
        }
    }
    .erWeiMaPop
    {
        img
        {
            width: 20rem;
            height: 20rem;
        }
    }

    .bigErWeiMaWrapper
    {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #c0c0c0;
        .bigErWeiMa
        {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
        }
    }

    .videoPop
    {
        height: 100%;
        width: 100%;
        .close
        {
            position: absolute;
            right: 2rem;
            top: 2rem;
            font-size: 2rem;
            font-weight: bold;
            color: #c2c2c2;
            z-index: 9999;
        }
        video
        {
            width: 100%;
        }
    }
    .audioPop
    {
        padding: 2rem;
        video
        {
            height: 3rem;
            width: 20rem;
        }
    }
}   
</style>
