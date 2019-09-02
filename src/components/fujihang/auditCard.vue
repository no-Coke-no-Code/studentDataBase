/*
 * @Author: fujihang
 * @Date: 2019-03-25 11:20:52
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-11 18:50:30
     a/b管理员审核卡片
 */
<template>
<div class="auditCard" >
    <div class="top_ma">
        <van-checkbox checked-color="#FF3C5C" v-model="item.check" @change="danxuan"></van-checkbox>
        <div class="detail">
            <div class="name">
                申请人: {{item.F_NickName}}
                <span class="type" v-show='item.F_State == 0'>待审核</span>
                <span class="type" v-show='item.F_State == 1'>已通过</span>
            </div>
            <div class="money">
                <img class="img" src="../../image/fuJiHang/money.svg">
                定金：<span>￥{{item.F_Price}}</span>
            </div>
            <div class="teach">
                <img class="img" src="../../image/fuJiHang/time.svg">
                申请时间：{{item.F_CreatorTime}}
            </div>
        </div>
        <van-icon name="arrow" size="1.2rem" color="#999" @click="toFN"/>
    </div>
    <div class="bot_btn">
        <van-button class="fan" size="small" @click="Reject">驳回</van-button>
        <van-button class="jin" size="small" @click="Approval">审批</van-button>
    </div>
</div>
</template>

<script>
export default {
  props:['item'],
    data(){
        return {
            check:false,
        };
    },

    methods: {
      danxuan(){
        this.$emit("callBack")
      },
    //   驳回
    Reject(){
        this.$emit("Reject",this.item.F_Id)
    },
    //   审批
    Approval(){
        this.$emit("Approval",this.item.F_Id)
    },
    //   
    toFN(){
        this.$router.push({path:'/fuApprovalPost?id='+this.item.F_Id})
    }
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.auditCard{
    .fBB;.bW;
    padding: 0 1rem;
    .mB;
    // 头
    .top_ma{
        display: flex;
        align-items: center;
        padding: 1rem 0;
        .fBB;.bBS;
        .img{
            height: 1.2rem;
            margin-right: .3rem;
        }
        .detail{
            margin-left: 1rem;
            flex: 1;
            .name{
                display: flex;
                align-items: center;
                font-size: 1.3rem;
                font-weight: 650;
                .type{
                    .fBB;
                    margin-left: 1rem;
                    color: white;
                    font-size: 1rem;
                    background: #FF8499;
                    padding: .1rem .3rem;
                    border-radius: .6rem 0 .6rem 0;
                }
            }
            .money{
                font-size: 1.15rem;
                display: flex;
                margin: .3rem 0;
                align-items: center;
                >span{
                    color: red;
                }
            }
            .teach{
                font-size: 1.15rem;
               display: flex;
               align-items: center;
                color: #999;
            }
        }
    }

    // 底部按钮
    .bot_btn{
        display: flex;
        justify-content: flex-end;
        padding: .5rem 0;
        .van-button{
            border-color: #27BCD5;
            width: 19%;
            margin-left: 1rem;
        }

        .fan{
            .bW;
            color: #27BCD5;

        }
        .jin{
            border:none;
            background: #27BCD5;
            color: white;
        }
    }
}
</style>
