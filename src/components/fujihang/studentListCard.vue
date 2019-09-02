/*
 * @Author: fujihang 
 * @Date: 2019-04-10 15:14:13 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-10 19:12:18
    客服管理员学卡片
 */
<template>
<div class="studentListCard">
    <img :src="data.UserHearIcon">
    <div class="contant_Le">
        <div class="name">{{data.UserName}}<span class="type">{{data.StateName}}</span></div>
        <div class="det_slc">
            <img src="../../image/fuJiHang/phone.png">手机：{{data.Phone?data.Phone:'无'}}
        </div>
        <div class="det_slc">
            <img src="../../image/fuJiHang/teach.png">专属老师：{{data.FollowUpUserName}}
        </div>
        <div class="det_slc">
            <img src="../../image/fuJiHang/time.png">添加时间：{{data.CreateTime}}
        </div>
    </div>
    <van-icon name="arrow"  color="#999" size="1.5rem" @click="toFN"/>
</div>
</template>

<script>
export default {
    props:['data'],
    data(){
        return {

        };
    },

    methods: {
        toFN(){
            this.$router.push({path:'/fuStudentDetail?id='+this.data.F_Id})
        }

    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.studentListCard{
    .fBB;
    padding: 1rem;
    .bW;.nC;
    display: flex;
    align-items: center;
    .mB;
    >img{
        height: 3.5rem;
        width: 3.5rem;
        object-fit: cover;
        border-radius: 50%;
    }
    .contant_Le{
        flex: 1;
        margin: 0 1rem;
        .name{
            .type{
                margin-left: .6rem;
                border-radius: .6rem 0 .6rem 0;
                color: white;
                padding: .2rem .6rem;
                .fBB;
                background: #FF8499;
                font-size: 1.05rem;
            }
            font-size: 1.2rem;
            font-weight: 650;
            margin-bottom: .3rem;
        }
        .det_slc{
            color: #999;
            display: flex;
            align-items: center;
            font-size: 1.1rem;
            margin-top: .1rem;
            >img{
                margin-right: .6rem;
                height: 1rem;
                width: 1rem;
                object-fit: cover;
            }
        }
    }
}
</style>