<template>
    <div id="yuConfirmLiveOrder">
        <div class="orderMessage">
            <p>
                <span class="orderNum">订单编号:{{orderDetail.OrderList.OrderNum}}</span>
                <span class="orderState">未支付</span>
            </p>
            <div class="wrapper">
                <div class="imgWrapper">
                    <img :src="orderDetail.CourseList.CourseIcon"/>
                    <p class="imgClassName">{{orderDetail.CourseList.CourserName}}</p>
                </div>
                <div class="contentWrapper">
                    <p class="className">{{orderDetail.CourseList.CourserName}}</p>
                    <p>实付：<span class="priceWrapper">￥{{orderDetail.CourseList.Price}}</span></p>
                    <p class="classType">课程类型：线上课程</p>
                </div>
            </div>
            <span class="orderTime">{{orderDetail.OrderList.OrderCreate}}</span>
        </div>

        <div class="personalInfo">
            <p class="infoNav">个人信息</p>
            <div class="item">
                <span>姓名<i class="redSpot">*</i></span>
                <input type="text" v-model="personalInfo.UserName" readonly/>
            </div>
            <div class="item">
                <span>手机号码<i class="redSpot">*</i></span>
                <input type="number" v-model="personalInfo.UserPhone" placeholder="请填写手机号码"/>
            </div>
            <div class="item">
                <span>微信账号<i class="redSpot">*</i></span>
                <input type="text" v-model="personalInfo.UserWechat" placeholder="请填写微信账号"/>
            </div>
            <div class="item">
                <span>备注</span>
                <input type="text" v-model="personalInfo.UserRemake" placeholder="请填写备注"/>
            </div>
        </div>
        <div class="payNowBtn" @click="payNow">立即支付</div>
    </div>
</template>

<script>
export default {
    name:"yuConfirmLiveOrder",
    data(){
        return{
            courseDetail:"",
            orderDetail:{},
            orderId:"",
            courseId:"",
            amount:"",
            personalInfo:{
                UserName:"",
                UserRemake:"",
                UserWechat:"",
                UserPhone:"",
            },
        }
    },
    methods:{
        payNow(){
            if(this.personalInfo.UserPhone == "" || this.personalInfo.UserPhone == null || !(/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(this.personalInfo.UserPhone)))
            {
                this.notFN("请填写手机");
                return;
            }
            if(this.personalInfo.UserWechat == "" || this.personalInfo.UserWechat == null)
            {
                this.notFN("请填写微信");
                return;
            }
            this.postFN({
                url:'/Student/UpdateOrderInfo',
                data:{
                    OrderID:this.orderDetail.StudentUserCourseList.F_Id,
                    Phone:this.personalInfo.UserPhone,
                    WeChat:this.personalInfo.UserWechat,
                    Remarks:this.personalInfo.UserRemake,
                },
            }).then(r=>{
                if(r.data.state=="success"){
                    this.postFN({
                        url:"/TenPay/JsApiPay?body=订单支付&tradeno="+this.orderDetail.OrderList.OrderNum+'&callbackurl='+'https://live.9oasd.com/#/okOrerr?order='+this.orderDetail.OrderList.OrderNum,
                        data:{
                            body:'订单支付',
                            tradeno:this.orderDetail.OrderList.OrderNum,
                            callbackurl:'https://live.9oasd.com/#/okOrerr?order='+this.orderDetail.OrderList.OrderNum,
                        }
                    }).then(r=>{    
                        console.log(r);
                        if(r.data.state=="info"){
                            window.localStorage.setItem('courseId',this.courseId)
                            window.localStorage.setItem('amount',this.amount)
                            window.localStorage.removeItem("liveLocation");
                            window.location.href = r.data.data
                        }else this.errFN(r.data.message)
                    })
                }
                else
                {
                    this.notFN(r.data.message)
                }
            })
        },
    },
    created(){
        this.tipFN();
        this.courseDetail = JSON.parse(window.localStorage.getItem("courseDetail"));
        console.log(this.courseDetail);
        this.postFN({
            url:"/StudentCourse/AddOrder",
            data:{
                courseId:this.courseDetail.SchoolCourseId,
                amount:this.courseDetail.Price,
            }
        }).then((res)=>{
            console.log(res);
            this.orderDetail = res.data.data;
            this.personalInfo = JSON.parse(JSON.stringify(this.orderDetail.UserList));
            console.log(this.personalInfo);
            this.tipHFN();
        });
    },
}
</script>

<style lang="less" scoped>
    #yuConfirmLiveOrder
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
                    width: 10rem;
                    height: 7rem;
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
                }
                .contentWrapper
                {
                    flex: 1;
                    overflow: hidden;
                    p
                    {
                        margin-bottom: 1rem;
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
            p:nth-of-type(2)
            {
                margin:1rem 0;
            }
            .price
            {
                color: #de1330;
                float: right;
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
        .payNowBtn
        {
            background-color: #7AD6E5;
            color: #fff;
        }


        .personalInfo
        {
            background-color: #fff;
            padding: 1rem;
            .infoNav
            {
                margin: 0 .5rem;
                box-sizing: border-box;
                color: #7AD6E5;
                border-bottom: 1px solid #f5f5f5;
                display: flex;
                align-items: center;
                padding: 1rem 0;
                font-size: 1.3rem;
            }
            .item
            {
                margin-top: 1rem;
                font-size: 1.2rem;
                display: flex;
                align-items: center;
                span
                {
                    display: inline-block;
                    width: 5rem;
                    text-align: right;
                    position: relative;
                    .redSpot
                    {
                        position: absolute;
                        top: 0;
                        right: -0.5rem;
                        color: red;
                        font-size: .8rem;
                    }
                }
                input
                {
                    margin-left: 1rem;
                    border-bottom: 1px solid #f5f5f5;
                    outline: none;
                    flex: 1;
                    padding: .5rem;
                }
                &:last-of-type
                {
                    margin-bottom: 1rem;
                }
            }
        }

        .payNowBtn
        {
            margin-top: 3rem;
            font-size: 1.8rem;
            height: 4rem;
            line-height: 4rem;
            text-align: center;
            border-radius: .5rem;
        }
    }
</style>
