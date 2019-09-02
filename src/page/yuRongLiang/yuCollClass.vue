<template>
    <div id="yuCollClass">
        <van-tabs v-model="active">
            <van-tab title="线下课程">
                <van-list
                    v-model="classLoading"
                    :finished="classFinished"
                    finished-text="没有更多了"
                    @load="getClassList"
                >
                    <div class="yuClassCard" v-for="(item,index) in classList" :key="index" @click="toDetail(item)">
                        <div class="classImgWrapper">
                            <img :src="item.CourseLogo" class="classImg"/>
                            <div class="wantToLearn">{{item.StudyCount}}人已学习</div>
                        </div>
                        <div class="classContentWrapper">
                            <p class="className">{{item.CourseName}}</p>
                            <p class="classPrice">￥{{item.Price}}</p>
                            <p class="classLong">共<span style="color:#4086f5">{{item.ChapterCount}}</span>节课程</p>
                        </div>
                    </div>
                </van-list>
                <!-- <div class="emptyPage" v-if="!classList.length&&active==0">
                    <div>
                        <img src="../../image/yuRongLiang/emptyOrderList.jpg"/>
                        <p>你还没有收藏课程哦</p>
                        <p>到首页去看看吧</p>
                    </div>
                </div> -->
            </van-tab>
            <van-tab title="视频">
                <van-list
                    v-model="videoLoading"
                    :finished="videoFinished"
                    finished-text="没有更多了"
                    @load="getVideoList"
                >
                    <div class="yuClassCard" v-for="(item,index) in videoList" :key="index"  @click="toDetail(item)">
                        <div class="classImgWrapper">
                            <img :src="item.CourseLogo" class="classImg"/>
                            <div class="wantToLearn">{{item.StudyCount}}人已学习</div>
                        </div>
                        <div class="classContentWrapper">
                            <p class="className">{{item.CourseName}}</p>
                            <p class="classPrice">￥{{item.Price}}</p>
                            <p class="classLong">共<span style="color:#4086f5">{{item.ChapterCount}}</span>节课程</p>
                        </div>
                    </div>
                </van-list>
                <!-- <div class="emptyPage" v-if="!videoList.length&&active==1">
                    <div>
                        <img src="../../image/yuRongLiang/emptyOrderList.jpg"/>
                        <p>你还没有收藏课程哦</p>
                        <p>到首页去看看吧</p>
                    </div>
                </div> -->
            </van-tab>
            <van-tab title="音频">
                <van-list
                    v-model="audioLoading"
                    :finished="audioFinished"
                    finished-text="没有更多了"
                    @load="getAudioList"
                >
                    <div class="yuClassCard" v-for="(item,index) in audioList" :key="index"  @click="toDetail(item)">
                        <div class="classImgWrapper">
                            <img :src="item.CourseLogo" class="classImg"/>
                            <div class="wantToLearn">{{item.StudyCount}}人已学习</div>
                        </div>
                        <div class="classContentWrapper">
                            <p class="className">{{item.CourseName}}</p>
                            <p class="classPrice">￥{{item.Price}}</p>
                            <p class="classLong">共<span style="color:#4086f5">{{item.ChapterCount}}</span>节课程</p>
                        </div>
                    </div>
                </van-list>
                <!-- <div class="emptyPage" v-if="!audioList.length&&active==2">
                    <div>
                        <img src="../../image/yuRongLiang/emptyOrderList.jpg"/>
                        <p>你还没有收藏课程哦</p>
                        <p>到首页去看看吧</p>
                    </div>
                </div> -->
            </van-tab>
                <div class="emptyPage" v-if="!classList.length&&active==0">
                    <div>
                        <img src="../../image/yuRongLiang/emptyOrderList.jpg"/>
                        <p>你还没有收藏课程哦</p>
                        <p>到首页去看看吧</p>
                    </div>
                </div>
                <div class="emptyPage" v-if="!videoList.length&&active==1">
                    <div>
                        <img src="../../image/yuRongLiang/emptyOrderList.jpg"/>
                        <p>你还没有收藏课程哦</p>
                        <p>到首页去看看吧</p>
                    </div>
                </div>
                <div class="emptyPage" v-if="!audioList.length&&active==2">
                    <div>
                        <img src="../../image/yuRongLiang/emptyOrderList.jpg"/>
                        <p>你还没有收藏课程哦</p>
                        <p>到首页去看看吧</p>
                    </div>
                </div>
        </van-tabs>
    </div>
</template>

<script>
import yuClassCard from "./../yuRongLiang/yuClassCard";
import liveCurn from "../../components/yuRongLiang/liveCurn";

export default {
    name:"yuCollClass",
    components:{
        yuClassCard,
        liveCurn,
    },
    data(){
        return{
            classList:[],
            videoList:[],
            audioList:[],

            classPageIndex:1,
            videoIndex:1,
            audioIndex:1,

            classLoading:false,
            classFinished:false,
            videoLoading:false,
            videoFinished:false,
            audioLoading:false,
            audioFinished:false,
            active:0,
        }
    },
    methods:{
        toDetail(item){
            console.log(item);
            if(item.F_LiveType == 0)
            {
                this.$router.push({path:'/fuProduct?CourseId='+item.CourseId})
            }
            else
            {
                this.$router.push({path:"/yuLive",query:{courseId:item.CourseId,SchoolCourseId:item.SchoolCourseId}});
            }
        },
        init(){
            // this.getClassList();
            // this.getVideoList();
            // this.getAudioList();
        },

        getClassList(){
            this.getFN({
                url:"/StudentCourse/GetUserCourseCollection?rows=10&page="+this.classPageIndex+"&type=-1",
            }).then((r)=>{
                console.log(r);
                this.classLoading = true;
                if(r.data.state=="success"){
                    let data=r.data.data
                    console.log(r.data.data,'查看返回的收藏家数据');
                    for(let i=0;i<data.length;i++){
                        this.classList.push(data[i])
                    }
                    if(data.length<10){
                        this.classFinished=true
                        this.classLoading=false
                        return;
                    }
                    this.classPageIndex.page++
                    this.classLoading=false
                }else this.notFN("获取失败，请刷新重试！")
                this.classList = [];
            });
        },
        getVideoList(){
            this.getFN({
                url:"/StudentCourse/GetUserCourseCollection?rows=10&page="+this.videoIndex+"&type=0",
            }).then((r)=>{
                console.log(r);
                this.videoLoading = true;
                if(r.data.state=="success"){
                    let data=r.data.data
                    console.log(r.data.data,'查看返回的收藏家数据');
                    for(let i=0;i<data.length;i++){
                        this.videoList.push(data[i])
                    }
                    if(data.length<10){
                        this.videoFinished=true
                        this.videoLoading=false
                        return;
                    }
                    this.videoIndex++
                    this.videoLoading=false
                }else this.notFN("获取失败，请刷新重试！")
                this.videoList = [];
            });
        },
        getAudioList(){
            this.getFN({
                url:"/StudentCourse/GetUserCourseCollection?rows=10&page="+this.audioIndex+"&type=2",
            }).then((r)=>{
                console.log(r);
                this.audioLoading = true;
                if(r.data.state=="success"){
                    let data=r.data.data
                    console.log(r.data.data,'查看返回的收藏家数据');
                    for(let i=0;i<data.length;i++){
                        this.audioList.push(data[i])
                    }
                    if(data.length<10){
                        this.audioFinished=true
                        this.audioLoading=false
                        return;
                    }
                    this.audioIndex++
                    this.audioLoading=false
                }else this.notFN("获取失败，请刷新重试！")
                this.audioIndex = [];
            });
        },

        toLiveDetail(){
            // this.$router.push({path:'/fuProduct?CourseId='+this.data.CourseId})
            this.$router.push({path:"/yuLive",query:{courseId:this.data.CourseId,SchoolCourseId:this.data.SchoolCourseId}});
        },
    },
    created(){
        // init();
    },
}
</script>


<style lang="less">
@import '../../style/base.less';
@import '../../style/fujihangBase.less';

    #yuCollClass{

        .emptyPage
        {
            width: 100%;
            height: 100%;
            background-color: #fff;
            position: fixed;
            top: 44px;
            text-align: center;
            z-index: 2;
            div
            {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: auto;
                width: 50%;
                height: 50%;
                img
                {
                    width: 6rem;
                    height: 6rem;
                }
                p
                {
                    margin-top: 1rem;
                    &:first-of-type
                    {
                        color: #c1c1c1;
                        font-size: 1.2rem;
                    }
                    &:nth-of-type(2)
                    {
                        font-size: 1rem;
                    }
                }
            }
        }

        // 卡片样式
        .yuClassCard
        {
            position: relative;
            display: flex;
            border-bottom: 1px solid #f4f5f9;
            padding: 1rem;
            background-color: #fff;
            .badge
            {
                position: absolute;
                top: 1rem;
                left: 2rem;
                z-index: 9;
                .badgeText
                {
                    width: 3rem;
                    height: 2rem;
                    background-color: #27BCD5;
                    color: #fff;
                    text-align: center;
                    line-height: 2rem;
                }
                .badgeBottom
                {
                    position: absolute;
                    top: 1.8rem;
                    width: 0; 
                    height: 0;
                    border-bottom-width: 1rem;
                    border-left-width: 1.5rem;
                    border-right-width: 1.5rem;
                    border-top-width: 0;
                    border-style: solid;
                    border-color:#27BCD5;
                    border-bottom-color: transparent;
                }
            }
            .classImgWrapper
            {
                width: 11rem;
                height: 8.5rem;
                margin-right: 1rem;
                position:relative;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                overflow: hidden;
                .classImg
                {
                    width: 100%;
                    height: 100%;
                }
                .wantToLearn
                {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    background-color: rgba(0, 0, 0, .5);
                    color: #fff;
                    padding: .1rem .5rem;
                }
            }
            .classContentWrapper
            {
                flex: 1;
                overflow: hidden;
                font-size: 1.25rem;
                .className,.classPrice
                {
                    margin-bottom: 1.5rem;
                }
                .className
                {
                    font-size: 1.5rem;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    color: #000;
                }
                .classPrice
                {
                    color: #e6540b;
                }
                .classLong
                {
                    color:#000;
                }
            }
        }

        .van-tabs__line
        {
            background-color: rgb(39, 188, 213) !important;
        }
    }
</style>
