/*
 * @Author: fujihang 
 * @Date: 2019-03-22 13:40:03 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 10:12:06
    第二个导航条
 */
<template>
<div id="navBar">
    <span class="bar">
        <img v-show="btn" src="../image/public/Return.svg" @click="goFN">
    </span>
    <span class="name">
        {{name}}
    </span>
    <span class="bar"></span>
</div>
</template>

<script>
export default {
    props:["btn","name","url"],
    data(){
        return {

    };
},

    methods: {
        // 返回上一层
        goFN(){
            if(this.url) return this.$router.replace(this.url)
            this.$router.go(-1)
        },
    }
}

</script>

<style lang="less">
@import "../style/base.less";
#navBar{
    .nC;
    height: 4rem;
    padding: 0 1rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(245, 245, 245);
    background: white;
    
    .bar{
        width: 3rem;
        >img{
            height:1.9rem;
        }
    }
    .name{
        flex: 1;
        text-align: center;
        font-size: 1.5rem;
    }
}
</style>
