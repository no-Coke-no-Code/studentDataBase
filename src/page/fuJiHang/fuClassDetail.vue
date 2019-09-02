/*
 * @Author: fujihang 
 * @Date: 2019-03-20 15:37:38 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-25 19:04:49
    课程详情
 */
<template>
<div id="fuClassDetail">
    <!-- 头部 -->
    <classCard :data="list"></classCard>

    <div class="black"></div>

    <!-- 课程详情 -->
    <div class="classInfo">
        <div class="TopName">
            <img class="img" src="../../image/fuJiHang/xin.png">课程详情
        </div>
        <div class="contant" v-for="(item,index) in classInfo" :key="index">
            <span class="name">
                {{item.name}}
            </span>
            <span class="value">
                {{item.val}}
            </span>
        </div>
    </div>
</div>
</template>

<script>
import classCard from "../../components/fujihang/classCard.vue"
export default {
    components:{
        classCard,
    },
    data(){
        return {
            list:{
                type:'已预约',
                name:'ZM逐美专业美甲课程培训美甲练习视频',
                teach:'讲师：李孝利 韩山师范学院',
                img:require("../../image/fuJiHang/classList.png")
            },//头部信息
            classInfo:[
                {
                    name:'课程概要：',
                    val:'林旭老师生动讲解了美甲的作用和处理方法林旭老师生动讲解了美甲的作用和处理方法'
                },
                {
                    name:'开课时间：',
                    val:'2019/3/18 ~ 2019/3/19'
                },
            ]
        };
    },

    methods: {

    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuClassDetail{
    .hO;.nC;
    // 分割线
    .black{
        height: 1rem;
        .mRB;
    }

    // 课程详情
    .classInfo{
        .TopName{
            display: flex;
            align-items: center;
            padding: 1rem 1.3rem 1rem 0;
            margin-left: 1.3rem;
            font-size: 1.3rem;
            .fBB;.bBS;
            .img{
                margin-right: .3rem;
                height: 1.7rem;
            }
        }
        .contant{
            display: flex;
            padding: .8rem 1.3rem .8rem 0;
            margin-left: 1.3rem;
            .fBB;
            align-items: center;
            .name{
                font-size: 1.25rem;
                font-weight: 600;
            }
            .value{
                font-size: 1.2rem;
                margin-left: 1rem;
                flex: 1;
            }
        }
    }
    
}
</style>