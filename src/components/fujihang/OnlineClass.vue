/*
 * @Author: fujihang 
 * @Date: 2019-03-20 13:57:43 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-10 10:26:43
    线上课程
 */
<template>
<div class="OnlineClass" @click="toFN">
    <img class="img" :src="data.CourseLogo">
    <div class="Curn_detail">
        <div class="name">
            {{data.CourseName}}
        </div>
        <div class="time">
            时间：{{data.CourseStateTime}}
        </div>
        <div class="teach">
            讲师：{{data.TeacherName}} {{data.SchoolName}}
        </div>
        <div class="picBtn">
            <span class="pic">¥{{data.CoursePrice}}</span>
        </div>

    </div>
</div>
</template>

<script>
export default {
    props:["data"],
    data(){
        return {

        };
    },

    methods: {
        toFN(){
            this.$router.push({path:'/fuProduct?CourseId='+this.data.SchoolCourseId})
        }
    }
}

</script>


<style lang='less'>
@import "../../style/base.less";
@import "../../style/fujihangBase.less";
.OnlineClass{
    .nC;
    padding: .8rem 1rem .8rem 0;
    margin-left:1rem; 
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .bBS;
    .img{
        height: 8.5rem;
        width: 38%;
        object-fit: cover;
        border-radius: .3rem;
    }
    .Curn_detail{
        margin-left: .8rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        .time,.teach{
            margin-top: .1rem;
            color: #999;
            .Oline;
            font-size: 1.1rem;
        }
        .name{
            .Tline;
            margin-bottom: .1rem;
            font-size: 1.3rem;
            font-weight: 650;
        }
        .picBtn{
            margin-top: .6rem;
            flex: 1;
            display: flex;
            align-items: flex-end;
            .pic{
                flex: 1;
                .Oline;
                .jG;
                font-size: 1.3rem;
            }
        }
    }
}
</style>