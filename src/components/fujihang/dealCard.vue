/*
 * @Author: fujihang 
 * @Date: 2019-04-11 14:31:16 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-11 15:06:37
    成交的卡片
 */
<template>
<div class="dealCard">
    <div class="name">{{data.Name}}<span class="bian">{{data.OrderNum=='线下支付无订单号'?data.OrderNum:data.OrderNum+'（编号）'}}</span></div>
    <div class="dealDatC">
        <img src="../../image/fuJiHang/phone.png"><span class="det">手机：{{data.Phone?data.Phone:'无'}}</span>
    </div>
    <div class="dealDatC">
        <img src="../../image/fuJiHang/teach.png"><span class="det">专属客服：{{data.CustomerName?data.CustomerName:'无'}} &nbsp; 课程：{{data.CourseName?data.CourseName:'无'}}</span>
    </div>
    <div class="dealDatC">
        <img src="../../image/fuJiHang/time.svg"><span class="det">添加时间：{{data.CreatorTime?data.CreatorTime:'无'}}</span>
    </div>
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

    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.dealCard{
    .bW;.nC;
    padding: .8rem 1rem;
    .fBB;.mB;
    .name{
        display: flex;
        align-items: flex-end;
        font-size: 1.25rem;
        font-weight: 650;
        margin-bottom: .4rem;
        .bian{
            color: #27BCD5;
            margin-left: .6rem;
            font-size: 1.12rem;
        }
    }
    .dealDatC{
        margin: .1rem 0;
        display: flex;
        align-items: center;
        font-size: 1.12rem;
        color: #999;
        >img{
            margin-right: .3rem;
            height: 1.1rem;
            width: 1.1rem;
            object-fit: cover;
        }
    }
}
</style>