/*
 * @Author: fujihang 
 * @Date: 2019-03-21 10:03:35 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-26 14:43:36
    学院介绍卡片
 */
<template>
<div class="schoolIntro" @click="toFN">
    <div class="nameBg">
        <img src="../../image/fuJiHang/xyuan.png" class="Bg">
        <div class="nameEn">
            CCNP培训机构
        </div>
    </div>
    <div class="detail">先进高端美甲技艺、理念、仪器设备、经操，项目场景化
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
        toFN(){
            this.$router.push({path:'/fuSchoolIndex'})
        }
    }
}

</script>


<style lang='less'>
@import "../../style/base.less";
.schoolIntro{
    width: 50%;
    padding: 0 .3rem;
    box-sizing: border-box;
    margin-bottom: .6rem;
    .nameBg{
        position: relative;
        height: 7rem;
        .nameEn{
            color: white;
            position: absolute;
            top: 0;left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-size: 1.3rem;
            background: rgba(0, 0, 0, .2);
        }
        .Bg{
            height:100%;
            object-fit: cover;
            width: 100%;
        }
    }
    .detail{
        padding: .9rem .5rem;
        box-sizing: border-box;
        color: #999;
        .Tline;
        font-size: 1.1rem;
        box-shadow: .3rem .3rem .1rem rgb(236, 236, 236);
    }
}

</style>