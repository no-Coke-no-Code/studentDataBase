/*
 * @Author: fujihang 
 * @Date: 2019-03-19 15:57:59 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-10 11:48:47
    我的修改
 */
<template>
<div id="fuMyTwo">

    <!-- 头部 -->
    <div class="logo_order">
        <img class="bg" src="../../image/fuJiHang/fuMy/pic_order_bg@2x.png">
        <div class="allContant">
            <div class="logo_contant">
                <!-- <img :src="userInfo.F_HeadIcon" class="logo"> -->
                <div class="name_type">
                    <!-- <div class="name">{{userInfo.F_NickName}}</div> -->
                    <div class="type">
                        <!-- <span>{{userInfo.RoleName}}</span> -->
                    </div>
                </div>
                <van-icon name="arrow" size="1.5rem" color="#fff"/>
            </div>
            
            <div class="order">
                <div class="child" v-for="(item,index) in orderList" :key="index" @click="toFN(item.to)">
                    <img :src="item.img">
                    <div class="name">
                        {{item.name}}
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- 常用功能，我的资料，账号切换 -->
    <div class="funtion" v-for="(items,indexs) in funtionList" :key="indexs">
        <!-- 头部 -->
        <div class="TopName">
            <img class="img" :src="items.icon">{{items.title}}
        </div>
        <!-- 功能 -->
        <div class="contant">
            <div class="child" v-for="(item,index) in items.child" :key="index" @click="toFN(item.to)">
                <img :src="item.img" v-show="item.img">
                <div class="name">
                    {{item.name}}
                </div>
            </div>

        </div>

    </div>

</div>
</template>

<script>
export default {
    data(){
        return {
            userInfo:JSON.parse(localStorage.getItem('userInfo')),
            // userInfo:{
            //     wxInfo:{}
            // },
            orderList:[
                {
                    name:'全部',
                    img:require('../../image/fuJiHang/fuMy/icon_order_01@2x.png'),
                    to:'/fuMyOrder?active=0'
                },
                {
                    name:'待付款',
                    img:require('../../image/fuJiHang/fuMy/icon_order_02@2x.png'),
                    to:'/fuMyOrder?active=1'
                },
                {
                    name:'待发货',
                    img:require('../../image/fuJiHang/fuMy/icon_order_03@2x.png'),
                    to:'/fuMyOrder?active=2'
                },
                {
                    name:'售后',
                    img:require('../../image/fuJiHang/fuMy/icon_order_04@2x.png'),
                    to:'/fuMyOrder?active=3'
                },
            ],//订单功能

            funtionList:[
                {
                    title:'常用功能',
                    icon:require("../../image/fuJiHang/fuMy/icon_title_01@2x.png"),
                    child:[
                        {
                            name:'我的收藏',
                            img:require('../../image/fuJiHang/fuMy/icon_order_001@2x.png'),
                            to:'/fuMyColl'
                        },
                        {
                            name:'我的团队',
                            img:require('../../image/fuJiHang/fuMy/icon_order_002@2x.png')
                        },
                        {
                            name:'我的佣金',
                            img:require('../../image/fuJiHang/fuMy/icon_order_003@2x.png')
                        },
                        {
                            name:'积分商城',
                            img:require('../../image/fuJiHang/fuMy/icon_order_004@2x.png')
                        },
                    ]
                },
                {
                    title:'我的资料',
                    icon:require("../../image/fuJiHang/fuMy/icon_title_02@2x.png"),
                    child:[
                        {
                            name:'我的资料',
                            img:require('../../image/fuJiHang/fuMy/icon_order_005@2x.png'),
                            to:'/fuMyData'
                        },
                        {
                            name:'我的作品',
                            img:require('../../image/fuJiHang/fuMy/icon_order_006@2x.png'),
                            to:'/fuMyWorks'
                            
                        },
                        {
                            name:'学前视频',
                            img:require('../../image/fuJiHang/fuMy/icon_order_007@2x.png')
                        },
                        {
                            name:'学后视频',
                            img:require('../../image/fuJiHang/fuMy/icon_order_008@2x.png')
                        },
                    ]
                },
                // {
                //     title:'账号切换',
                //     icon:require("../../image/fuJiHang/fuMy/icon_title_03@2x.png"),
                //     child:[
                //         {
                //             name:'老板',
                //             img:require('../../image/fuJiHang/fuMy/icon_order_011@2x.png'),
                //             to:'/fieraa'
                //         },
                //         {
                //             name:'客服',
                //             img:require('../../image/fuJiHang/fuMy/icon_order_010@2x.png'),
                //             to:'/fuManageApp/fuManageMonth'
                            
                //         },
                //         {
                //             name:'管理员',
                //             img:require('../../image/fuJiHang/fuMy/icon_order_011@2x.png'),
                //             to:'/fuManageApp/fuManageIndex'
                //         },
                //         {
                           
                //         },
                //     ]
                // },
            ]
        };
    },

    methods: {
        // 
        toFN(to){
            this.$router.push({path:to})
        }
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuMyTwo{
    .hO;.mRB;.nC;
    // 头部
    .logo_order{
        margin-bottom: 2.7rem;
        position: relative;
        .bg{
            width: 100%;
            height: 12rem;
            object-fit: cover;
        }
        .allContant{
            top: 0;
            position: absolute;
            width: 100%;
            .logo_contant{
                .fBB;
                padding: 1rem 1rem;
                display: flex;
                align-items: center;
                .logo{
                    height: 5rem;
                    width: 5rem;
                    object-fit: cover;
                    border-radius: 50%;
                }
                .name_type{
                    flex: 1;
                    margin: 0 1rem;
                    .name{
                        margin-left: .3rem;
                        color: white;
                        font-size: 1.5rem;
                        margin-bottom: 1rem;
                    }
                    .type{
                        >span{
                            padding: .2rem .6rem;
                            .fBB;.tC;
                            .bW;
                            border-radius: 1rem;
                            font-size: 1.05rem;
                        }
                    }
                }
            }
            .order{
                margin: 0 1rem;
                border-radius: .3rem;
                .bW;
                display: flex;
                .child{
                    flex: 1;
                    text-align: center;
                    padding: 1.5rem 0;
                    .fBB;
                    >img{
                        height: 2rem;
                    }
                    .name{
                        font-size: 1.1rem;
                        color: #999;
                        margin-top: .3rem;
                    }
                }
            }
        }
    }

    // 常用功能等等
    .funtion{
        .bW;
        margin-bottom: 1rem;
        border-radius: .6rem .6rem 0 0;
        // 头部
        .TopName{
            
            display: flex;
            align-items: center;
            padding: .8rem 1rem;
            font-size: 1.3rem;
            .fBB;.bBS;.tC;
            .img{
                margin-right: .3rem;
                height: 1.7rem;
            }
        }
        .contant{
            display: flex;
            .child{
                flex: 1;
                text-align: center;
                padding: 1.5rem 0;
       
                .fBB;
                >img{
                    width: 2.4rem;
                    object-fit: cover;
                    height: 2.4rem;
                }
                .name{
                    font-size: 1.1rem;
                    color: #999;
                    margin-top: .3rem;
                }
            }
        }
    }
        
   
}
</style>