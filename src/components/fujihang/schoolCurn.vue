/*
 * @Author: fujihang 
 * @Date: 2019-03-20 13:57:43 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-05-14 14:22:52
    学校课程卡牌
 */
<template>
<div class="schoolCurn .bW" @click="toFN">
    <img class="img" :src="data.CourseLogo">
    <div class="Curn_detail">
        <div class="name">
            {{data.CourseName}}
        </div>
        <div class="time">
            <!-- <span v-show="!qudiao">
                时间：{{type?data.CreateTime:data.CourseStateTime}}
            </span> -->
            
        </div>
        <div class="teach">
            <!-- <span v-show="!qudiao">
            讲师：{{data.TeacherName}} {{data.SchoolName}}
            </span> -->
        </div>
        <div class="picBtn">
            <div class="text">
                <span class="learnNum">{{data.F_Seat}}人学习过</span>
                <span class="pic">¥{{type?data.Price:data.CoursePrice}}</span>
            </div>
            <van-button class="detail" size="mini" >预约</van-button>
        </div>

    </div>
</div>
</template>

<script>
export default {
    props:["data","type","qudiao"],
    data(){
        return {

        };
    },

    methods: {
        toFN(){
            this.$router.push({path:'/fuProduct?CourseId='+this.data.CourseId})
        }
    }
}

</script>


<style lang='less'>
@import "../../style/base.less";
@import "../../style/fujihangBase.less";
.schoolCurn{
    .nC;
    padding: 1rem 1.3rem 1rem 0;
    margin-left:1.3rem; 
    box-sizing: border-box;
    display: flex;
    background-color: #fff;
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
            font-size: 1.3rem;
            font-weight: 650;
        }
        .picBtn{
            flex: 1;
            display: flex;
            align-items: flex-end;
            .text
            {
                flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                margin-right: 1rem;
                font-size: 1rem;
                color: #c2c2c2;
                .pic{
                    .Oline;
                    .jG;
                    font-size: 1.3rem;
                }
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