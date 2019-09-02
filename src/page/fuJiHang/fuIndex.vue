/*
 * @Author: fujihang
 * @Date: 2019-03-19 15:56:30
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-26 20:25:26
    首页
 */
<template>
<div id="fuIndex">

    <!-- 首页轮播图 -->
    <van-swipe :autoplay="3000"  :show-indicators="false">
        <van-swipe-item v-for="(item,index) in banner" :key="index">
            <img :src="item.img" :style="{'height':wwWH*2/5+'px'}">
        </van-swipe-item>
    </van-swipe>

    <!-- 功能选项 -->
    <div class="function">
        <span class="fun_child" v-for="(item,index) in functionList" :key="index" @click="toFN(item.to)">
            <img :src="item.img">
        </span>
    </div>

    <!-- 课程列表 -->
    <div class="classList">
        <div class="nameTop">
            <img src="../../image/fuJiHang/className.png">
            课程列表
        </div>
        <div class="list" v-for="(item,index) in classList" :key="index">
            <img :src="item.img">
            <div class="content">
                <div class="name">
                    {{item.name}}
                </div>
                <div class="time">
                    {{item.time}}
                </div>
                <div class="teach">
                    {{item.teach}}
                </div>
                <div class="money_det">
                    <span class="money">
                        {{item.money}}
                    </span>
                    <van-button size="mini" @click="toFN('/fuProduct')">预约</van-button>
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
            banner:[
                {
                    img:require("../../image/fuJiHang/psff920b48032d4a64-4d9a-4331-9b6b-9643f71809d8.png")
                },
                {
                    img:require("../../image/fuJiHang/psff920b48032d4a64-4d9a-4331-9b6b-9643f71809d8.png")
                },
            ],//首页轮播图

            functionList:[
                {
                    img:require('../../image/fuJiHang/chooseClass.png'),
                    to:'/fuSchoolCurn'
                },
                {
                    img:require('../../image/fuJiHang/introduce.png'),
                    to:'/fuSchoolIntro'
                },
            ],//功能模块

            classList:[
                {
                    img:require("../../image/fuJiHang/classList.png"),
                    name:'ZM逐美专业美甲课程培训美甲练习视频',
                    time:'时间：2019/3/18',
                    teach:'讲师：李孝利 韩山师范学院',
                    money:'¥99.00'
                },
                {
                    img:require("../../image/fuJiHang/classList.png"),
                    name:'ZM逐美专业美甲课程培训美甲练习视频',
                    time:'时间：2019/3/18',
                    teach:'讲师：李孝利 韩山师范学院',
                    money:'¥99.00'
                },
            ],//课程列表
        };
    },

    methods: {
        getClass(){
            this.getFN({
                url:'/GetSchoolList?pageSize='+10+'&pageIndex='+1,
            }).then(r=>{
                let data=r.data
                if(data.state=="success"){
                    
                }else this.notFN(data.message)
                console.log(r.data.state)
            })
        },

        // 跳转
        toFN(to){
            this.$router.push({path:to})
        }

    },
    mounted(){
        this.getClass()
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuIndex{
    .nC;
    background: #F7F7F7;
    height: 100%;
    // 首页轮播图
    .van-swipe{
        img{
            object-fit: cover;
            width: 100%;
        }
    }

    // 功能选项
    .function{
        padding: .9rem;
        box-sizing: border-box;
        display: flex;
        .fun_child{
            box-sizing: border-box;
            padding: 0 .3rem;
            >img{
                object-fit: cover;
                width: 100%;
                height: 7rem;
            }

        }
        >:first-child{
            padding-right: .4rem;
        }
    }

    // 课程列表
    .classList{
        .bW;
        .nameTop{
            display: flex;
            align-items: center;
            justify-content: center;
            padding: .8rem;
            box-sizing: border-box;
            .bBS;
            font-size: 1.3rem;
            >img{
                height: 2rem;
            }
        }
        .list{
            margin: 0 1rem;
            padding: .9rem 0;
            box-sizing: border-box;
            display: flex;
            .bBS;
            >img{
                object-fit: cover;
                width:13rem;
                height:8.5rem;
                border-radius: .3rem;
            }
            .content{
                flex: 1;
                margin-left: .9rem;
                display: flex;
                flex-direction: column;
                .name{
                    font-size:1.25rem; 
                    .Tline;
                    font-weight: 650;
                    margin-bottom: .1rem;
                }
                .time{
                    font-size:1.1rem; 
                    color: #999;
                    margin-bottom: .1rem;
                }
                .teach{
                    font-size:1.1rem;
                    color: #999;
                }
                .money_det{
                    flex: 1;
                    display: flex;
                    align-items: flex-end;
                    .van-button{
                        .fBMRB;
                        color: white;
                        border:none;
                    }
                    .money{
                        flex: 1;
                        .jG;
                        font-size:1.3rem; 

                    }
                }

            }
        }
    }
}
</style>
