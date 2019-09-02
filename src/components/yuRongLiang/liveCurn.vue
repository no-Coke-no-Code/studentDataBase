<template>
<div class="liveCurn .bW" @click="toLiveDetail">
    <!-- <div class="imgWrapper"> -->
        <img class="img" :src="data.CourseLogo">
        <div class="badge">
            <p class="badgeText">{{mediaType}}</p>
            <div class="badgeBottom"></div>
        </div>
    <!-- </div> -->
    <div class="Curn_detail">
        <!-- 直播名称 -->
        <div class="name">
            {{data.CourseName}}
        </div>
        <!-- 直播副标题 -->
        <div class="subTitle">
            <!-- {{data.CourseName}} -->
        </div>
        <!-- 直播时间 -->
        <div class="time">
            <span v-show="!qudiao">
                {{data.LiveType==0?'直播':'上传'}}时间：{{data.liveType==0?data.LiveTime:data.CreatorTime}}
            </span>
            
        </div>
        <!-- <div class="teach">
            <span v-show="!qudiao">
            讲师：{{data.TeacherName}} {{data.SchoolName}}
            </span>
        </div> -->
        <div class="picBtn">
            <!-- 播放量 -->
            <div class="count">
                <img src="../../image/yuRongLiang/play.jpg"/>
                播放量：{{data.PlayCount}}
            </div>
            <!-- 价钱 -->
            <span class="pic">¥{{data.SchoolCoursePrice}}</span>
            <van-button class="detail" size="mini">预约</van-button>
        </div>

    </div>
</div>
</template>

<script>
export default {
    props:["data","type","qudiao"],
    data(){
        return {
            mediaType:"",
        };
    },

    methods: {
        toLiveDetail(){
            // this.$router.push({path:'/fuProduct?CourseId='+this.data.CourseId})
            this.$router.push({path:"/yuLive",query:{courseId:this.data.CourseId,SchoolCourseId:this.data.SchoolCourseId}});
        },
        getMediaType(){
            if(this.data.LiveType == 0)
            {
                this.mediaType = "直播";
            }
            else if(this.data.LiveType == 1)
            {
                this.mediaType = "录播";
            }
            else if(this.data.LiveType == 2)
            {
                this.mediaType = "音频";
            }
        },
    },
    created(){
        console.log(this.data);
        this.getMediaType();
    },
    updated(){
        this.getMediaType();
    },
    watch:{
        "this.data":function(oldVal,newVal){
            console.log(oldVal);
            console.log(newVal);
        },
    },
}

</script>


<style lang='less'>
@import "../../style/base.less";
@import "../../style/fujihangBase.less";
.liveCurn{
    .nC;
    padding: 1rem 1.3rem 1rem 0;
    margin-left:1.3rem; 
    box-sizing: border-box;
    display: flex;
    position:relative;
    .bBS;
    // .imgWrapper
    // {
        .img{
            height: 8.5rem;
            width: 38%;
            object-fit: cover;
            border-radius: .3rem;
            position:relative;
        }
        .badge
        {
            position: absolute;
            top: 1rem;
            left: 1rem;
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
    // }
    .Curn_detail{
        margin-left: .8rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        .subTitle
        {
            margin-top: .4rem;
            margin-bottom: .4rem;
        }
        .time,.teach{
            margin-top: .1rem;
            color: #999;
            .Oline;
            font-size: 1.1rem;
        }
        .name{
            .Tline;
            font-size: 1.3rem;
            font-weight: 650;
        }
        .picBtn{
            flex: 1;
            display: flex;
            align-items: flex-end;
            .pic{
                flex: 1;
                .Oline;
                .jG;
                font-size: 1.3rem;
                text-align:right;
                padding-right: 1rem;
            }
            .count
            {
                img
                {
                    width: 1rem;
                    height: 1rem;
                }
            }
            .rightPart
            {
                flex: 1;
            }
            .detail{
                .fBMRB;
                color: #27BCD5;
                background-color: #fff;
                border-radius:10px;
                border: 1px solid #27BCD5;
            }
        }
    }
    .van-button--mini
    {
        line-height: 22px !important;
    }
}
</style>