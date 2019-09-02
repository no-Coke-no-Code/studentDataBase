<template>
    <div id="yuManageOrderDet">
        <div class="orderMessage">
            <p>
                <span class="orderNum">订单编号:{{orderDetail.OrderList.OrderNum?orderDetail.OrderList.OrderNum:'无'}}</span>
                <span class="orderState">已完成</span>
            </p>
            <div class="wrapper">
                <div class="imgWrapper">
                    <img :src="orderDetail.CourseList.CourseIcon"/>
                    <p class="imgClassName">{{orderDetail.CourseList.CourserName}}</p>
                </div>
                <div class="contentWrapper">
                    <p class="className">{{orderDetail.CourseList.CourserName}}</p>
                    <p>实付：<span class="priceWrapper">￥{{orderDetail.CourseList.Price}}</span></p>
                    <p class="classType">课程类型：{{orderDetail2.F_LiveType==-1?'线下课程':'线上课程'}}</p>
                </div>
            </div>
            <span class="orderTime">{{orderDetail.OrderList.OrderCreate}}</span>
        </div>
        <div class="orderPrice">
            <p>
                <span>商品金额</span>
                <span class="price">￥{{orderDetail.CourseList.Price}}</span>
            </p>
            <p>
                <span>实付金额</span>
                <span class="price">￥{{orderDetail.CourseList.Price}}</span>
            </p>
            <p v-if="orderDetail2.F_LiveType==-1">
                <span>开课地点</span>
                <span class="place">{{orderDetail.CourseList.SchoolName}}</span>
            </p>
            <p v-if="orderDetail2.F_LiveType==-1">
                <span>开课时间</span>
                <span class="time">{{orderDetail.CourseList.CourseTime}}</span>
            </p>
            <p>
                <span>学员姓名</span>
                <span class="time">{{orderDetail.UserList.UserName?orderDetail.UserList.UserName:'无'}}</span>
            </p>
            <p>
                <span>手机号</span>
                <span class="time">{{orderDetail.UserList.UserPhone?orderDetail.UserList.UserPhone:'无'}}</span>
            </p>
            <p>
                <span>微信号</span>
                <span class="time">{{orderDetail.UserList.UserWechat?orderDetail.UserList.UserWechat:'无'}}</span>
            </p>
        </div>
        <div class="orderPayment">
            <p>
                <span>支付方式</span>
                <span class="payment">微信支付</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            orderId:"",
            orderDetail:{
                CourseList:{
                    CourseIcon:"",
                    CourseTime:"",
                    CourserName:"",
                    Price:"",
                    SchoolName:"",
                    TeacherName:"",
                },
                OrderList:{
                    EndTime:"",
                    F_EarnestMoney:"",
                    F_QrCodeUrl:"",
                    OrderCreate:"",
                    OrderNum:"",
                    StartTime:"",
                },
                StudentUserCourseList:{
                    ApprovalId:"",
                    F_CreatorTime:"",
                    F_CreatorUserId:"",
                    F_DeleteMark:"",
                    F_DeleteTime:"",
                    F_DeleteUserId:"",
                    F_Id:"",
                    F_LastModifyTime:"",
                    F_LastModifyUserId:"",
                    F_OrganizeId:"",
                    IsApproval:"",
                    OrderNum:"",
                    OrderState:"",
                    Phone:"",
                    Remarks:"",
                    SchoolCourseId:"",
                    ToSchoolState:"",
                    ToSchoolTime:"",
                    UserId:"",

                },
                UserList:{
                    UserName:"",
                    UserPhone:"",
                    UserRemake:"",
                    UserWechat:"",
                },
            },
            orderDetail2:{
                F_LiveType:"",
            },
        }
    },

    mounted(){
        this.orderId = this.$route.query.id;
        console.log(this.orderId);
        this.orderDetail2 = JSON.parse(window.localStorage.getItem("orderDetail"));
        window.localStorage.removeItem("orderDetail");
        this.postFN({
            url:"/Student/GetOrderInfo",
            data:{
                OrderID:this.orderId,
            }
        }).then((res)=>{
            console.log(res);
            if(res.data.state)
            {
                this.orderDetail = res.data.data;
            }
            else
            {
                this.errFN("获取订单详情失败，请刷新重试");
            }
        });
    },
}
</script>

<style lang="less" scoped>
    #yuManageOrderDet
    {
        padding: .8rem;
        height:calc(100% - 1.6rem);
        background-color: #f4f5f9;
        .orderMessage,.orderPrice,.orderPayment
        {
            margin-bottom: 2rem;
            padding: 1.25rem 1rem;
            background-color: #fff;
            box-shadow: 0 0.5rem #f1f0f5;
        }
        .orderMessage
        {
            .orderNum,.orderState
            {
                color: #696a6f;
            }
            .orderState
            {
                float: right;
            }
            .wrapper
            {
                display: flex;
                margin-top: 1rem;
                margin-bottom: 1rem;
                .imgWrapper
                {
                    width: 30%;
                    height: 6rem;
                    margin-right: 1rem;
                    overflow: hidden;
                    position: relative;
                    border-radius: .5rem;
                    img
                    {
                        width: 100%;
                        height: 100%;
                    }
                    .imgClassName
                    {
                        position: absolute;
                        right: 0;
                        left: 0;
                        bottom: .2rem;
                        background-color: rgba(0, 0, 0, .5);
                        color: #fff;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
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
                }
                .contentWrapper
                {
                    flex: 1;
                    overflow: hidden;
                    p
                    {
                        margin-bottom: .5rem;
                        font-size: 1.2rem;
                    }
                    .className
                    {
                        font-size: 1.5rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .priceWrapper
                    {
                        color: #e73102;
                    }
                    .classType
                    {
                        margin: 0;
                    }
                }
            }
            .orderTime
            {
                color: #adadad;
            }
        }

        .orderPrice
        {
            font-size: 1.2rem;
            p
            {
                margin-bottom: 1rem;
            }
            .price
            {
                color: #de1330;
                float: right;
            }
            .place,.time
            {
                color: #b2b2b2;
                float: right;
            }
            .erWeiMa
            {
                width: 35%;
                height: 10rem;
                display: block;
                margin: 2rem auto;
            }
        }

        .orderPayment
        {
            font-size: 1.2rem;
            margin-bottom: 0;
            .payment
            {
                float:right;
            }
        }
    }
</style>
