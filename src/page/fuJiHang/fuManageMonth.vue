/*
 * @Author: fujihang 
 * @Date: 2019-03-23 17:21:56 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-25 18:44:49
    本页
 */
<template>
    <div id="fuManageMonth">
        <div class="navTop">
            <span class="name">
                本月
            </span>
            <van-icon name="setting-o" size="1.6rem"/>
        </div>

        <div class="info">
            <span class="child" v-for="(item,index) in info" :key="index">
                <div class="name">{{item.val}}</div>
                <div>{{item.name}}</div>
            </span>
        </div>

        <div class="function">
            <!-- <div class="child">
                <img src="" class="img">
                <div class="name"></div>
            </div> -->
            <div :class="['img',index==0?'qian':'']" v-for="(item,index) in fun" :key="index">
                <img  :src="item.img" >
            </div>
            <img class="month" src="../../image/fuJiHang/month.png">
        </div>


    </div>
</template>

<script>
    export default {
        data(){
            return{
                info:[
                    {
                        name:'添加微信',
                        val:'130'
                    },
                    {
                        name:'成单数量',
                        val:'1304'
                    },
                    {
                        name:'成交量',
                        val:'12'
                    },
                    {
                        name:'到校人数',
                        val:'12'
                    },
                    
                ],
                fun:[
                    {
                        img:require("../../image/fuJiHang/xygl.png")
                    },
                    {
                        img:require("../../image/fuJiHang/ddxq.png")
                    },
                ]
            }
        }
    }
</script>

<style lang="less">
@import '../../style/fujihangBase.less';
#fuManageMonth{
    .navTop{
        background: #27BCD5;
        color: white;
        text-align: center;
        font-size: 1.3rem;
        padding: 1rem 0;
        position: relative;
        .van-icon{
            top: 1rem;
            right: 1rem;
            position:absolute;
        }
    }
    .info{
        background: #27BCD5;
        padding: 1rem 0;
        display: flex;
        color: white;
        .child{
            font-size: 1.2rem;
            flex: 1;
            text-align: center;
            .name{
                margin-bottom: .6rem;
            }
        }
    }
    .function{
        position: relative;
        display: flex;
        .img{
            flex: 1;
            padding: 2.5rem;
            .fBB;
            text-align: center;
            >img{
                width: 60%;
            }
            background: #3dcee6;
        }
        .qian{
            background: #4fdef6;
        }
        .month{
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            height: 2.5rem;
            position: absolute;
        }
    }
}

</style>