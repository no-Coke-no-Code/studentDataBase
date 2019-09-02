/*
 * @Author: fujihang 
 * @Date: 2019-03-28 13:57:56 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-28 14:09:21
    测试登录
 */
<template>
<div id="login">
    <van-button @click="toFN">登录</van-button>
</div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return {
            url:''
        };
    },

    methods: {
        getLogin(){
            axios({
                method:"get",
                url:'http://9oasd.com/user/GetUserInfo'
            }).then(r=>{
                console.log(r.data)
                this.url=r.data.data
            })
        },
        toFN(){
            window.location.href=this.url
        }
    },
    mounted(){
        this.getLogin()
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#login{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>