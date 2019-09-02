/*
 * @Author: fujihang 
 * @Date: 2019-03-21 18:54:00 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-21 19:32:53
    学院介绍
 */
<template>
<div id='fuCollegeIntro'>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000"  :show-indicators="false">
        <van-swipe-item v-for="(item,index) in banner" :key="index" :style="{'height':wwWH*2/5+'px'}">
            <img :src="item.img" >
        </van-swipe-item>
    </van-swipe>

    <!-- 功能 -->
    <div class="funtion">
        <van-tabs v-model="active" swipeable color="#27BCD5" title-active-color="#27BCD5" title-inactive-color='#999999'>
            <van-tab v-for="(item,index) in funContant" :title="item.name" :key="index">
                
                <div class="cs">
                    <div class="contant">
                        <div class="img_det">
                            <img class="img" src="../../image/fuJiHang/school.png">
                            <div class="det">
                                好学校是中国领先的在线教育服务提供商,提供覆盖各大城市的资质认证学校、强大智慧的课程和地图搜索、优质课程、真实用户点评、请教师兄、低价赔付和读书保障等教育
                            </div>
                        </div>
                        <div class="contant_bot">
                            好学校是中国领先的在线教育服务提供商,提供覆盖各大城市的资质认证学校、强大智慧的课程和地图搜索、优质课程、真实用户点评、请教师兄、低价赔付和读书保障等教育...好学校是中国领先的在线教育服务提供商,提供覆盖各大城市的资质认证学校、强大智慧的课程和地图搜索、优质课程、真实用户点评、请教师兄、低价赔付和读书保障等教育...
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
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
            active:0,//默认显示学校概要
            funContant:[
                {
                    name:'学校概要',
                },
                {
                    name:'学校环境',
                },
                {
                    name:'师资介绍',
                },
            ],//功能导航条
        };
    },

    methods: {

    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuCollegeIntro{
    .nC;
    .mRB;
    height: 100%;
    display: flex;
    flex-direction: column;
    // 首页轮播图
    .van-swipe{
        img{
            height: 100%;
            object-fit: cover;
            width: 100%;
        }
    }

    //功能
    .funtion{
        flex: 1;
        overflow: hidden;
        .van-tabs{
            height: 100%;
            .van-tabs__content{
                height: 100%;
                margin-top: 1rem;
                .bW;
                 .van-tab__pane{
                    height: 100%;
                    .fBB;
                    padding-bottom: 44px;
                    overflow: auto;
                }
            }
        }
    }

    // 测试
    .cs{
        .fBB;
        padding: 0 1rem;
        .contant{
            color: #999;
            .fBB;
            padding: 1rem 0;
            .img_det{
                display: flex;
                .img{
                    height: 5.8rem;
                    width: 35%;
                    object-fit: cover;
                }
                .det{
                    height: 100%;
                    .fOTH;
                    -webkit-line-clamp:5;
                    flex: 1;
                    margin-left: 1rem;
                }
            }
            .contant_bot{
                margin-top: .3rem;
            }
        }
    }
    
}
</style>