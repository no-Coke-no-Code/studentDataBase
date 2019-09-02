/*
 * @Author: fujihang 
 * @Date: 2019-03-25 14:59:40 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-27 17:20:16
    成交订单
 */
<template>
<div class="okOrderC">
    <!-- 头像 -->
    <img :src="data.F_HeadIcon" class="logo">
    <!-- 内容 -->
    <div class="nMT">
        <div class="name">
            {{data.F_NickName}}
            <span class="icon">
                {{data.F_State==0?'待审核':''}}
            </span>
        </div>
        <div class="money">
            <img class="img" src="../../image/fuJiHang/money.svg">
            定金：<span class="mon">￥{{data.F_Price}}</span>
        </div>
        <div class="time">
            <img class="img" src="../../image/fuJiHang/time.svg">
            申请时间：{{data.F_CreatorTime}}
        </div>
    </div>
    <!-- 箭头 -->
    <van-icon name="arrow" />
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
.okOrderC{
    display: flex;
    padding: 1.1rem 1.5rem .9rem 0;
    margin-left: 1.5rem;
    align-items: center;
    .bBS;
    .logo{
        height: 4.5rem;
        width: 4.5rem;
        border-radius: 50%;
    }
    .nMT{
        margin-left: 1rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name{
            display: flex;
            align-items: center;
            font-weight: 600;
            font-size: 1.3rem;
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
        .img{
            height: 1.2rem;
            margin-right: .6rem;
        }
        .money{
            color: #999;
            margin: .5rem 0 .1rem;
            font-size: 1.15rem;
            .mon{
                color: #FF8499;
            }
        }
        .time{
            font-size: 1.15rem;

            color: #999;
        }
    }
}
</style>