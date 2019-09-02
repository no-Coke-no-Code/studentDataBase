/*
 * @Author: fujihang 
 * @Date: 2019-04-04 17:54:40 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 11:42:17
    成功或者失败
 */
<template>
<div id="okOrerr">
    <img src="../../image/yuRongLiang/buyOK.jpg" v-show="state" class="success"/>
    <van-icon name="info" color="red" size="8rem" v-show="!state"/>
    <!-- <van-icon name="checked" color="#27BCD5" size="8rem" v-show="state"/> -->
    <div class="state">
        {{state?'支付成功':'订单支付失败'}}
    </div>
    <div class="btn">
        <!-- <van-button class="ret" v-show="state" @click="toFN('/fuReceipt')">查看凭证</van-button> -->
        <!-- <van-button class="to" @click="toFN('/fuMyOrder')">查看订单</van-button>
        <van-button class="ret" v-show="!state" @click="toFN(false)">返回</van-button> -->
        <div class="to"  @click="toFN('/fuMyOrder')" v-show="state">查看订单</div>
        <div class="ret" @click="toFN(false)">返回</div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            state:false,//支付失败
            orderId:'',//订单id
            liveLocation:"",
        };
    },

    methods: {
        toFN(url){
            // if(!url){
            //     let courseId=localStorage.getItem('courseId')
            //     let amount=localStorage.getItem('amount')
            //     this.$router.replace({path:"/fuPurchase?courseId="+courseId+'&amount='+amount})
            //     return;
            // }
            if(!url)
            {
                this.$router.push({path:'/'});
            }
            this.$router.replace({path:url+"?orderId="+this.orderId})
        },
    },
    created(){
        let url=window.location.href
        this.orderId=url.split("?order=")[1].split("&state")[0]
        let isOk=url.split('&state=')[1]
        if(isOk.indexOf('0')!=-1)
        {
            this.state=true
        }
        var liveLocation = window.localStorage.getItem("liveLocation");
        if(liveLocation)
        {
            window.localStorage.removeItem("liveLocation");
            window.location.href = liveLocation;
        }
    }
    
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#okOrerr{
    .nC;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #f0eff5;
    .fBB; 
    .state{
        font-size: 1.4rem;
        margin: 1rem 0 1.5rem;
    }
    .success
    {
        width: 8rem;
        height: 8rem;
    }
    .btn{
        width: 100%;
        padding: 0 15%;
        margin-bottom: 2rem;
        .fBB;
        .van-button{
            flex: 1;
            margin: 1rem .5rem; 
        }
        div
        {
            height: 4rem;
            line-height: 4rem;
            font-size: 1.3rem;
            text-align: center;
        }
        .to{
            .fBMRB;
            color: white;
            background-color: #ddb04b;
            margin-bottom: 1rem;
        }
        .ret
        {
            .fBMRB;
            color: white;
            background-color: #e4e4e4;
        }
    }
    .backToLiveBtn
    {
        width: 69%;
        display: block;
        margin: 0 auto;
        box-sizing: content-box;
    }
}
</style>