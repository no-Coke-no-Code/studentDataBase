/*
 * @Author: fujihang 
 * @Date: 2019-03-25 11:20:52 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-10 17:48:26
    学员管理
 */
<template>
<div class="studentCard">
    <div class="top_ma">
        <img class="logo" :src="data.F_HeadIcon">
        <div class="detail">
            <div class="name">{{data.UserName?data.UserName:data.F_NickName}}
                <span class="icon" v-show="data.State==0">待到校</span>
                <span class="icon" v-show="data.State==1">到校意愿</span>
                <span class="icon" v-show="data.State==2">已到校</span>
            </div>
            <div class="phone">
                <img class="img" src="../../image/fuJiHang/phone.png">手机：{{data.Phone?data.Phone:'无'}}
            </div>
            <div class="teach">
                <img class="img" src="../../image/fuJiHang/teach.png">所属学校：{{data.SchoolName?data.SchoolName:'无'}} 课程：{{data.CourseName?data.CourseName:'无'}}
            </div>
            <div class="teach">
                <img class="img" src="../../image/fuJiHang/time.svg">预计到校日期：{{data.F_CreatorTime?data.F_CreatorTime:'无'}}
            </div>
        </div>
        <div class="r_b">
            <van-button size="mini" class="fBMRB wC" @click="toFN">选取</van-button>
        </div>
    </div>
    
</div>
</template>

<script>
export default {
    props:['data'],
    data(){
        return {
            check:false,
        };
    },

    methods: {
       toFN(){
           this.$router.push({path:"/fuReturnVisit?id="+this.data.F_Id})
       }
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.studentCard{
    .fBB;.bW;
    padding: 0 1rem;
    .mB;
    // 头
    .top_ma{
        display: flex;
        align-items: center;
        padding: 1rem 0;
        .fBB;.bBS;
        .logo{
            height:5rem;
            width:5rem;
            object-fit: cover;
            border-radius: 50%;
        }
        .img{
            height: 1.2rem;
            margin-right: .6rem;
        }
        .detail{
            flex: 1;
            margin-left: 1rem;
            .name{
                display: flex;
                align-items: center;
                font-size: 1.3rem;
                font-weight: 650;
                .icon{
                    font-size: 1.1rem;
                    border-radius: .5rem 0 .5rem 0;
                    background: #FF8499;
                    font-size: 1rem;
                    padding: .1rem .6rem;
                    margin-left: 1rem;
                    .fBB;
                    color: white;
                }
            }
            .phone{
                font-size: 1.15rem;
                display: flex;
                color: #999;
                margin: .3rem 0;
                align-items: center;
                
            }
            .teach{
                font-size: 1.15rem;
               display: flex;
               align-items: center;
                color: #999;
            }
        }
        .r_b{
            margin-top: 3rem;
        }
    }
    
   
}
</style>