<template>
    <div id="yuClassCard" @click="toLiveDetail(item)">
        <div class="badge" v-if="type=='listClassCardType'">
            <p class="badgeText">{{mediaType}}</p>
            <div class="badgeBottom"></div>
        </div>
        <div class="classImgWrapper">
            <img :src="item.CourseLogo" class="classImg"/>
            <div v-if="type=='teacherClassCardType'" class="wantToLearn">{{item.StudyCount}}人已学习</div>
            <div v-if="type=='listClassCardType'" class="wantToLearn">{{item.CreatorTime}}</div>
        </div>
        <div class="classContentWrapper">
            <p class="className">{{item.CourseName}}</p>
            <p class="classPrice">￥{{item.SchoolCoursePrice}}</p>
            <p class="classLong">共<span style="color:#4086f5">{{item.ChapterCount}}</span>节课程</p>
        </div>
    </div>
</template>

<script>
export default {
    name:"yuClassCard",
    props:["item","type"],
    data(){
        return{
            mediaType:"",
        }
    },
    mounted(){
        console.log(this.item);
        if(this.type=='listClassCardType')
        {
            this.getMediaType();
        }
    },
    updated(){
        if(this.type=='listClassCardType')
        {
            this.getMediaType();
        }
    },
    methods:{
        toLiveDetail(item){
            if(item.F_LiveType == 0)
            {
                this.$router.push({path:'/fuProduct?CourseId='+this.item.CourseId})
            }
            else
            {
                this.$router.push({path:"/yuLive",query:{courseId:this.item.CourseId,SchoolCourseId:this.item.SchoolCourseId}});
            }
        },

        getMediaType(){
            if(this.item.LiveType == -1)
            {
                this.mediaType = "线下";
            }
            else if(this.item.LiveType == 0)
            {
                this.mediaType = "直播";
            }
            else if(this.item.LiveType == 1)
            {
                this.mediaType = "录播";
            }
            else if(this.item.LiveType == 2)
            {
                this.mediaType = "音频";
            }
        },
    },
}
</script>

<style lang="less">
    #yuClassCard
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
</style>
