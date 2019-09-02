<template>
    <div id="yuConfirmToSchool">
        <div class="mainWrapper">
            <div class="item">
                <span class="itemName">学员姓名</span>
                <span class="itemContent">{{studentInfo.F_NickName?studentInfo.F_NickName:'无'}}</span>
            </div>
            <div class="item">
                <span class="itemName">手机号码</span>
                <span class="itemContent">{{studentInfo.F_MobilePhone?studentInfo.F_MobilePhone:'无'}}</span>
            </div>
            <div class="item">
                <span class="itemName">微信账号</span>
                <span class="itemContent">{{studentInfo.F_WeChat?studentInfo.F_WeChat:'无'}}</span>
            </div>

            <div class="border"></div>

            <div class="item">
                <span class="itemName">分校</span>
                <input readonly v-model="orderInfo.SchoolName"/>
            </div>
            <div class="item">
                <span class="itemName">课程分类</span>
                <input readonly v-model="orderInfo.CourseTypeName"/>
            </div>
            <div class="item">
                <span class="itemName">学习课程</span>
                <input readonly v-model="orderInfo.CourseName"/>
            </div>
            <div class="item">
                <span class="itemName">开课时间</span>
                <input readonly v-model="orderInfo.StartTime"/>
            </div>
            <div class="item">
                <span class="itemName">应缴金额</span>
                <span class="itemContent" style="color:red;">￥{{orderInfo.Price}}</span>
            </div>
            <div class="item">
                <span class="itemName">实缴金额</span>
                <div>
                    ￥<input readonly v-model="orderInfo.PayPrice"/>
                </div>
            </div>

            <div class="border"></div>

            <div class="Enclosure" v-if="orderInfo.F_Voucher">
                <img v-for="(item,index) in orderInfo.F_Voucher" :key="index" :src="item"/>
            </div>

            <div class="item" v-if="orderInfo.ToSchoolStateName != '待到校'">
                <span class="itemName" style="width: 8rem;text-align: left;">实际到校时间</span>
                <span class="itemContent">{{orderInfo.ToSchoolTime}}</span>
            </div>
        </div>
        <div class="btnGroup">
            <div @click="back" class="back" :class="{'arrived':orderInfo.ToSchoolStateName!='待到校'}">返回</div>
            <div @click="confirmToSchool" class="confirm" v-if="orderInfo.ToSchoolStateName == '待到校'">确认到校</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"yuConfirmToSchool",
    data(){
        return{
            studentInfo:{},
            orderInfo:{},

            schoolCourseId:"",
            courseId:"",
            schoolCourseId:"",
            studentId:"",
        }
    },
    methods:{
        init(){
            this.schoolCourseId = this.$route.query.studentUserCourseId;
            console.log(this.schoolCourseId);
            this.postFN({
                url:"/StudentCourse/GetStudentOrderInfo",
                data:{
                    studentUserCourseId:this.schoolCourseId
                },
            }).then((res)=>{
                console.log(res);
                if(res.data.state == "success")
                {
                    this.studentInfo = res.data.data.model[0].UserInfo;
                    this.orderInfo = res.data.data.model[0].OrderInfo;
                }
                else
                {
                    this.errFN("获取信息失败，请重试");
                }
            });
        },

        // 返回
        back(){
            window.history.go(-1);
        },

        // 确认到校
        confirmToSchool(){
            this.postFN({
                url:"/Student/ArriveAtSchool",
                data:{
                    orderIDs:this.orderInfo.Id
                },
            }).then((res)=>{
                console.log(res);
                if(res.data.state == "success")
                {
                    this.okFN("确认到校成功");
                    window.location.reload();
                }
                else
                {
                    this.errFN("操作失败，请稍后再试");
                }
            });
        },
    },
    created(){
        this.init();
    },
}
</script>

<style lang="less" scoped>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#yuConfirmToSchool
{
    box-sizing: border-box;
    background-color: #f7f7f7;
    padding:2rem 1rem 6rem 1rem;
    height: 100%;
    .mainWrapper
    {
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
        padding: 2rem 3rem;
        .item
        {
            display: flex;
            margin-bottom: 1rem;
            font-size: 1.2rem;
            .itemName
            {
                display: inline-block;
                width: 5rem;
                text-align: right;
                margin-right: 2rem;
            }
            .itemContent
            {
                flex: 1;
            }
            input
            {
                width: 12rem;
                height: 2rem;
                line-height: 2rem;
                background-color: #f8f8f8;
                padding: 0 .5rem;
            }
            div
            {
                width: 13rem;
                background-color: #f8f8f8;
                input
                {
                    width: 10rem;
                    padding-left: 0;
                }
            }
        }
        // 附件
        .Enclosure{
            .bW;
            position: relative;
            text-align: center;
            display: flex;
            flex-wrap: wrap;
            padding: 0 3rem;
            >img{
                object-fit: contain;
                width: 17%;
                height: 7.5rem;
                margin-right: 1rem;
                margin-left: 1rem;
            }
            .name{
                margin-top: 1rem;
                font-size: 1.1rem;
            }
            // 状态
            .state{
                font-size: 1.2rem;
                color: red;
                bottom: 1rem;
                transform: rotateZ(-45deg);
                right: 0;
                position: absolute;
            }
        }
        .border
        {
            width: 100%;
            height: 1px;
            border-top: 1px dashed #d9d9d9;
            margin-bottom: 1rem;
        }
    }
    .btnGroup
    {
        display: flex;
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.3rem;
        text-align: center;
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        div
        {
            flex: 1;
            color: #fff;
        }
        .arrived
        {
            background-color: #27bbd5 !important;
            width: 100%;
        }
        .back
        {
            background-color: #d2d2d2;
        }
        .confirm
        {
            background-color: #27bbd5;
        }
    }
}
</style>
