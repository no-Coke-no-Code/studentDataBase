<template>
    <div id="yuOrderDetail">
        <div class="orderMessage">
            <p>
                <span class="orderNum">订单编号:{{orderDetail.OrderList.OrderNum}}</span>
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
                    <p class="classType">课程类型：{{orderDetail2.CourseType==-1?'线下课程':'线上课程'}}</p>
                </div>
            </div>
            <span class="orderTime">{{orderDetail.OrderList.OrderCreate}}</span>
        </div>
        <div class="orderPrice">
            <p>{{orderDetail2.CourseType==-1?'线下课程':'线上课程'}}</p>
            <p>
                <span>商品金额</span>
                <span class="price">￥{{orderDetail.CourseList.Price}}</span>
            </p>
            <p>
                <span>实付金额</span>
                <span class="price">￥{{orderDetail.CourseList.Price}}</span>
            </p>
            <p v-if="orderDetail2.CourseType==-1">
                <span>开课地点</span>
                <span class="place">{{orderDetail.CourseList.SchoolName}}</span>
            </p>
            <p v-if="orderDetail2.CourseType==-1">
                <span>开课时间</span>
                <span class="time">{{orderDetail.CourseList.CourseTime}}</span>
            </p>
            <img class="erWeiMa" :src="orderDetail.OrderList.F_QrCodeUrl" v-if="orderDetail2.CourseType==-1"/>
            <p class="notice">订单标识</p>
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
            orderDetail:{},
            orderDetail2:{},
        }
    },

    mounted(){
        this.orderId = this.$route.query.id;
        this.orderDetail2 = JSON.parse(window.localStorage.getItem("orderDetail"));
        console.log(this.orderDetail2);
        window.localStorage.removeItem("orderDetail");
        this.postFN({
            url:"/Student/GetOrderInfo",
            data:{
                OrderID:this.orderId,
            }
        }).then((res)=>{
            console.log(res.data.data);
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
    #yuOrderDetail
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
                width: 10rem;
                height: 10rem;
                display: block;
                margin: 2rem auto 0;
                box-shadow: 0.2rem 0.2rem .2rem #f7f7f7;
            }
            .notice
            {
                text-align: center;
                font-size: 1rem;
                margin-top: .5rem;
                color:#c2c2c2;
            }
        }

        .orderPayment
        {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            .payment
            {
                float:right;
            }
        }
    }
</style>
