/*
 * @Author: fujihang 
 * @Date: 2019-03-21 11:38:21 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-04 17:23:55
    确认订单卡片
 */
<template>
<div class="purchaseCard">
    <img class="img" :src="Data.CourseIcon">
    <div class="contant">
        <div class="name">{{Data.CourserName}}
        </div>
        <div class="time">时间：{{Data.CourseTime?Data.CourseTime:'无'}}
        </div>
        <div class="teachMoney">
            <span class="teach">讲师：{{Data.TeacherName}} {{Data.SchoolName}}
            </span>
            <!-- <span class="mon">¥{{Data.Price}}</span> -->
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:['Data'],
    data(){
        return {

        };
    },

    methods: {

    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.purchaseCard{
    display: flex;
    padding: .9rem 1.2rem;
    .fBB;.bW;
    .img{
        object-fit: cover;
        height: 7rem;
        width: 35%;
    }
    .contant{
        flex: 1;
        margin-left: .9rem;
        display: flex;
        flex-direction: column;
        .name{
            .Tline;
            font-weight: 650;
            font-size: 1.2rem;
        }
        .time{
            font-size: 1.1rem;
            display: flex;
            align-items: flex-end;
            flex: 1;
            margin-bottom: .3rem;
            color: #999;
        }
        .teachMoney{
            font-size: 1.1rem;
            display: flex;
            .teach{
                color: #999;
                flex: 1;
                .Oline;
            }
            .mon{
                .jG;
                font-size: 1.25rem;
            }
        }
    }
    
}
</style>