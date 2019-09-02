/*
 * @Author: fujihang 
 * @Date: 2019-03-21 10:03:35 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-27 18:16:36
    热门视频
 */
<template>
<div class="videoChild">

        <img src="../../image/fuJiHang/psff920b48032d4a64-4d9a-4331-9b6b-9643f71809d8.png">

    
    <div class="detail">
        <div class="name">唇部快速去死皮+完美唇形画法 纯干货!</div>
        <div class="val">美妆博主的唇妆为何这么好</div>
    </div>
    
</div>
</template>

<script>
export default {
    data(){
        return {

        };
    },

    methods: {
       
    }
}

</script>


<style lang='less'>
@import "../../style/base.less";
@import "../../style/fujihangBase.less";
.videoChild{
    width: 100%;
    box-sizing: border-box;
    >img{
        width: 100%;
        height: 6.8rem;
        object-fit: cover;
    }
    .detail{
        padding: .3rem;
        .fBB;
       .name{
           font-size: 1.2rem;
           font-weight: 650;
           .Tline;
       }
       .val{
           font-size: 1.1rem;
           .Oline;
           color: #999;
       }
    }
}

</style>