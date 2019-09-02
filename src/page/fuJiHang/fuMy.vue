/*
 * @Author: fujihang 
 * @Date: 2019-03-19 15:57:59 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-09 09:57:24
    我的
 */
<template>
<div id="fuMy">

    <!-- 头部 -->
    <div class="myTop">
        <img class="bg" src="../../image/fuJiHang/myBg.png">
        <div class="logoName">
            <div class="nameCollege">
                <div class="name">{{userInfo.RoleName}}</div>
                <div class="College">匠心学院</div>
            </div>
            <div class="logo">
                <img :src="userInfo.F_HeadIcon">
            </div>
        </div>
    </div>

    <!-- 我的功能 -->
    <div class="myContent">

        <!-- 我的订单 -->
        <div class="myOrder" @click="toFN('/fuMyOrder')">
            <div class="order">
                <div class="name">我的订单</div>
                <div class="En">MY ORDER</div>
            </div>
            <div class="order_img">
                <img class="order_img" src="../../image/fuJiHang/order.png">
            </div>
            
        </div>

        <!-- 我的资料；我的作品 -->
        <div class="dataWorks">
            <div class="child" v-for="(item,index) in dataWorks" :key="index" @click="toFN(item.to)">
                <div class="det">
                    <div class="name">
                        {{item.name}}
                    </div>
                    <div class="En">
                        {{item.En}}
                    </div>
                </div>
                <div class="img">
                    <img  :src="item.img">
                </div>
            </div>
        </div>

        <!-- 身份 -->
        <div class="identity">
            <span class="child"  v-for="(item,index) in identity" :key="index" @click="toFN(item.to)">
                <img :src="item.img">
                <div class="name">
                    {{item.name}}
                </div>
                <div class="En">
                    {{item.En}}
                </div>
            </span>
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
            dataWorks:[
                {
                    name:'我的资料',
                    En:'MY PROFILE',
                    img:require("../../image/fuJiHang/data.png"),
                    to:'/fuMyData'
                },
                {
                    name:'我的作品',
                    En:'MY WORKS',
                    img:require("../../image/fuJiHang/works.png"),
                    to:'/fuMyWorks'
                },
            ],//资料作品

            identity:[
                {
                    img:require("../../image/fuJiHang/boss.png"),
                    name:'老板',
                    En:'buckra',
                    to:'/fieraa'
                },
                {
                    img:require("../../image/fuJiHang/Customer.png"),
                    name:'客服',
                    En:'Customer',
                    to:"/fuManageApp/fuManageMonth"
                },
                {
                    img:require("../../image/fuJiHang/manage.png"),
                    name:'客服管理员',
                    En:'Administrator',
                    to:"/fuManageApp/fuManageIndex"
                },
            ]
        };
    },

    mounted(){
        alert(this.userInfo);
        console.log(this.userInfo);
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
#fuMy{
    .hO;.mRB;.nC;

    // 头部
    .myTop{
        position: relative;
        height: 8.6rem;
        .bg{
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
        .logoName{
            top: 0;
            width: 100%;
            height:100%;
            position: absolute;
            display: flex;
            align-items: center;
            padding: 0 3rem;
            box-sizing: border-box;
            .logo{
                flex: 1;
                text-align: right;
                >img{
                    object-fit: cover;
                    border-radius: 50%;
                    height: 5rem;
                    width: 5rem
                }
            }
            .nameCollege{
                margin-left: 1.5rem;
                color: white;
                .name{
                    font-weight: 600;
                    font-size: 1.3rem;
                    text-align: center;
                    margin-bottom: .3rem;
                }
                .College{
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255,.8);
                }
            }
        }
    }

    // 功能描述 我的订单等等
    .myContent{
        .bW;
        padding-top: .6rem;
        font-weight: 650;

        .myOrder{
            height: 5.5rem;
            display: flex;
            align-items: center;
            .bBS;
            box-sizing: border-box;
            .order{
                padding-left: 3rem; 
                .name{
                    font-size: 1.3rem;
                    margin-bottom: .3rem;
                }
            }
            .order_img{
                flex: 1;
                text-align: right;
                >img{
                    height: 5.5rem;
                }
            }
        }

        .dataWorks{
            display: flex;
            box-sizing: border-box;
            .child{
                flex: 1;
                display: flex;
                height: 6rem;
                align-items: center;
                padding-left: 3rem;
                justify-content: center;
                .img{
                    flex: 1;
                    text-align: center;
                    >img{
                        height: 4rem;
                    }
                    
                }
                .det{
                    .name{
                        font-size: 1.3rem;
                        margin-bottom: .3rem;
                    }
                    .En{

                    }
                }
            }
            >:first-child{
                .img{
                    border-right: 1px solid rgb(245, 245, 245);
                }
            }
        }
    }

    // <!-- 身份 -->
    .identity{
        display: flex;
        padding: 0 0 .5rem;;
        border-top:1px solid rgb(241, 241, 241); 
        .child{
            flex: 1;
            text-align: center;
            >img{
                height: 5rem;
                width: 5rem;
                object-fit: cover;
            }
            .name{
                font-size: 1.3rem;
                font-weight: 600;
            }
            .En{
                color: #999;
            }
        }
    }
}
</style>