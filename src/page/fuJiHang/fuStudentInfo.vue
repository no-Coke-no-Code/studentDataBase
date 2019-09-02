/*
 * @Author: fujihang 
 * @Date: 2019-03-27 15:04:47 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-27 15:26:18
    学员信息
 */
<template>
<div id="fuStudentInfo">
    <!-- 学员信息 -->
    <div class="student_remark">
        <div class="list" v-for="(item,index) in student" :key="index">
            <span class="name">
                {{item.name}}
            </span>
            <span class="val">
                {{item.val}}
            </span>
        </div>
        <div class="border"></div>
        <div class="time">
            <span class="name">
                录入时间：
            </span>
            <span class="val">
                2019/02/19  13:46:25
            </span>
        </div>
    </div>

    <div class="ling">
        <van-button>认领</van-button>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            student:[
                {
                    name:'学员姓名：',
                    val:'李选课',
                },
                {
                    name:'性别：',
                    val:'男',
                },
                {
                    name:'生日：',
                    val:'2018/02/20',
                },
                {
                    name:'职位：',
                    val:'学生',
                },
                {
                    name:'微信账号：',
                    val:'lixiaoli',
                },
                {
                    name:'手机号码：',
                    val:'13553570072',
                },
                {
                    name:'年收入：',
                    val:'3k-5k',
                },
            ],//学员信息
        };
    },

    methods: {

    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuStudentInfo{
    .fBB;
    .mRB;
    .hO;.nC;
    padding: 1rem;
    // 学员信息
    .student_remark{
        .bW;
        padding: .5rem 3rem 0;
        .fBB;
        .list{
            display: flex;
            align-items: baseline;
            padding: .5rem 0;
            >span{
                display: block;
                flex: 1;
            }
            .name{
                height: 100%;
                font-size: 1.2rem;
                text-align: right;
                margin-right: 2rem;
            }
            .val{
                color: #999;
                font-size: 1.1rem;
            }
        }
        .border{
            margin-top: .5rem;
            border-bottom: 1px dashed rgb(212, 212, 212);
        }
        .time{
            display: flex;
            align-items: baseline;
            padding: 1.5rem 0;
            >span{
                display: block;
                flex: 1;
            }
            .name{
                height: 100%;
                font-size: 1.2rem;
                text-align: right;
                margin-right: 2rem;
            }
            .val{
                color: #999;
                font-size: 1.1rem;
            }
        }
    }

    // 按钮
    .ling{
        margin-top: 10%;
        .van-button{
            .fBMRB;
            color: white;
            width: 100%;
        }
    }
}
</style>