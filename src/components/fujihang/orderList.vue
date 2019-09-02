/*
 * @Author: fujihang 
 * @Date: 2019-03-22 10:35:27 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-17 10:48:32
 */
<template>
<div class="orderList">
    <div class="pre">
        <div class="img">
            <img :src="data.CourserLogo">
            <div class="className">
                {{data.CourserName}}
            </div>
            <div class="badge">
                <p class="badgeText">{{mediaType}}</p>
                <div class="badgeBottom"></div>
            </div>
        </div>
        <div class="content">
            <!-- <div class="name">
                {{data.CourserName}}
            </div> -->
            <div class="num">
                订单编号：{{data.OrderNum}}
            </div>
            <div class="time">
                下单时间：{{data.F_CreatorTime}}
            </div>
            <div class="state">
                订单状态：<span :class="{'red':data.OrderState=='待付款','green':data.OrderState!='待付款'}">{{data.OrderState}}</span>
            </div>
        </div>
    </div>
    <div class="new">
        <div class="priceWrapper">
            <p>课程价格：<span class="price">￥{{data.ProductTotalAmount}}</span></p>
            <p>订单总额：<span class="price">￥{{data.ActualPayMoney}}</span></p>
            <p v-if="data.F_PayType">订金价格：<span class="price">￥{{data.EarnestMoney}}</span></p>
        </div>
        <div class="btnGroup">
            <span class="checkOrder" @click="checkOrder(data)" v-if="ifPay">查看订单</span>
            <span class="cancelOrder" @click="cancelOrder" v-if="!ifPay">取消订单</span>
            <span class="nowPay" @click="payNow" v-if="!ifPay">立即支付</span>
            <span class="alreadyPay" v-if="ifPay">已支付</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:["data"],
    data(){
        return {
            ifPay:false,
            mediaType:"",
        };
    },

    methods: {
        // 付款
        okFNE(){
            this.postFN({
                url:"/TenPay/JsApiPay?body=订单支付&tradeno="+this.data.OrderNum+'&callbackurl='+'https://live.9oasd.com/#/okOrerr?order='+this.data.OrderNum,
                data:{
                    body:'订单支付',
                    tradeno:this.data.OrderNum,
                    callbackurl:'https://live.9oasd.com/#/okOrerr?order='+this.data.OrderNum,
                }
            }).then(r=>{    
                if(r.data.state=="info"){
                    window.location.href = r.data.data
                }else this.errFN(r.data.message)
            })
        },
        // 去
        // toFN(){
        //     this.$router.push({path:'/fuOrderDetail?id='+this.data.F_Id+"&state="+this.data.OrderState})
        // },

        // 立刻支付
        payNow(){
            this.$router.push({path:'/fuOrderDetail?id='+this.data.F_Id+"&state="+this.data.OrderState+"&courseType="+this.data.CourseType});
        },

        // 查看订单
        checkOrder(item){
            window.localStorage.setItem("orderDetail",JSON.stringify(item));
            this.$router.push({path:"/yuOrderDetail",query:{id:item.F_Id}});
        },

        // 取消订单
        cancelOrder(){
            this.postFN({
                url:"/Student/DeleteOrderInfo",
                data:{
                    OrderID:this.data.F_Id
                }
            }).then(r=>{
                if(r.data.state=="success")
                {
                    this.okFN("删除成功！")
                    // window.location.reload();
                    this.$emit('deleteOrderSuc');
                }
                else
                {
                    this.notFN(r.data.message)
                }
            })
        },
    },

    created(){
        if(this.data.OrderState == "待付款")
        {
            this.ifPay = false;
        }
        else
        {
            this.ifPay = true;
        }
        console.log(this.data.CourseType,'课程类型');
        if(this.data.CourseType == -1)
        {
            this.mediaType = "线下";
        }
        else if(this.data.CourseType == 0)
        {
            this.mediaType = "直播";
        }
        else if(this.data.CourseType == 1)
        {
            this.mediaType = "录播";
        }
        else if(this.data.CourseType == 2)
        {
            this.mediaType = "音频";
        }
    },
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.orderList{
    background-color: #fff;
    overflow: hidden;
    margin-bottom: .2rem;
    .pre
    {
        .bW;.nC;
        display: flex;
        padding: .9rem 1rem;
        box-sizing: border-box;
        margin-top: .3rem;
        .img{
            position: relative;
            height: 6rem;
            width: 30%;
            .type{
                position: absolute;
                .tB;
                padding: .4rem .2rem;
                box-sizing: border-box;
                color: white;
                border-radius: .5rem 0 .5rem 0;
            }
            >img{
                object-fit: cover;
                width: 100%;
                border-radius: .5rem;
                height: 100%;
            }
            .badge
            {
                position: absolute;
                top: 0rem;
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
            .className
            {
                position: absolute;
                bottom: 0;
                right: 0;
                left: 0;
                height: 1.5rem;
                line-height: 1.5rem;
                color: #fff;
                background-color: rgba(0,0,0,.5);
            }
        }
        .content
        {
            margin-left: 1rem;
            display: flex;
            flex-direction: column;
            flex: 1;
            // .name
            // {
            //     .Tline;
            //     font-size: 1.25rem;
            //     font-weight: 650;
            // }
            .time,.num,.state
            {
                font-size: 1rem;
                color: #999;
                margin-top: .3rem;
                .red
                {
                    color: red;
                }
                .green
                {
                    color: green;
                }
            }
            .detail{
                .fBMRB;
                color: white;
            }
        }
    }
    .new
    {
        margin: 0 1rem;
        border-top: 1px solid #f7f7f7;
        .priceWrapper
        {
            font-size: 1.1rem;
            margin: 1rem 1rem;
            display: flex;
            p
            {
                margin-right: 1.5rem;
                .price
                {
                    color: red;
                }
            }
        }
        .btnGroup
        {
            text-align: right;
            margin-bottom: .3rem;
            span
            {
                display: inline-block;
                padding: 0.3rem 1rem;
                color: #fff;
                border-radius: 0.5rem;
                text-align: center;
                height: 2rem;
                line-height: 2rem;
                font-size: 1.2rem;
            }
            .checkOrder
            {
                background-color: #ddb04b;
            }
            .cancelOrder
            {
                background-color: #a1a1a1;
            }
            .nowPay
            {
                background-color: #f23030;
            }
            .alreadyPay
            {
                background-color: #e1e1e1;
            }   
        }
    }
}
</style>