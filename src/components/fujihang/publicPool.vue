/*
 * @Author: fujihang 
 * @Date: 2019-03-27 14:48:40 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-01 17:33:47
    公有池卡片
 */
<template>
<div class="publicPool">
    <div class="contant_pool">
        <van-checkbox @change="ClaimMore" v-model="data.isCheck" checked-color="#FF3C5C"></van-checkbox>
        <img :src="data.UserHearIcon?data.UserHearIcon:img">
        <div class="info">
            <div class="name">{{data.UserName}} 
                <!-- <span class="hao">10086（编号）</span> -->
            </div>
            <div class="phone_w">
                <img class="icon" src="../../image/fuJiHang/phone.png">
                手机：{{data.Phone?data.Phone:'无'}} <span class="wei">微信：{{data.WeChat?data.WeChat:'无'}}</span>
            </div>
        </div>
    </div>

    <div class="battom_pool">
        <van-button size="small" @click="callback">认领</van-button>
    </div>
    
</div>
</template>

<script>
export default {
    props:['data'],
    data(){
        return {
            checked:false,
            img:require('../../image/fuJiHang/people.png')
        };
    },

    methods: {
        // 认领
        callback(){
            this.$emit("Claim",this.data.F_Id)
        },
        // 选择
        ClaimMore(){
            this.$emit('ClaimMore')
        }
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.publicPool{
    .bW;
    margin-bottom: 1rem;
    .contant_pool{
        display: flex;
        align-items: center;
        .fBB;
        margin-left: 1rem;
        padding: 1rem 1rem 1rem 0;
        .bBS;
        >img{
            margin-left: 1rem;
            height: 3.5rem;
            width: 3.5rem;
            border-radius: 50%;
        }
        .info{
            flex: 1;
            margin: 0 .8rem;
            .name{
                font-size: 1.25rem;
                margin-bottom: .8rem;
                .hao{
                    .tC;
                    font-size: 1.1rem;
                    margin-left: .3rem;
                }
            }
            .phone_w{
                display: flex;
                align-items: center;
                font-size: 1.1rem;
                color: #999;
                .icon{
                    height: 1rem;
                }
                .wei{
                    margin-left: .8rem;
                }
            }
        }
    }
    
    .battom_pool{
        text-align:right;
        padding: .5rem 1rem;
        .fBB;
        .van-button{
            .fBMRB;
            color: white;
        }
    }
    
    
}
</style>