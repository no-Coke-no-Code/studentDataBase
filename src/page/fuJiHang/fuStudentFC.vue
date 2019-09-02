/*
 * @Author: fujihang 
 * @Date: 2019-04-29 14:02:41 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-29 14:10:22
    学员风采
 */
<template>
<div id="fuStudentFC" v-html="htmlData">

</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            F_Outline:this.$route.query.F_Outline,
            htmlData:'',
        };
    },
    mounted(){
        axios({
            url:this.F_Outline,
            method:'get',
            headers:{
            'Content-Type': 'application/json; application/octet-stream'
        },
        responseType: 'blob',
        }).then(r=>{
            this.changeRGB(r.data).then(j=>{
                this.htmlData=j
            })
        })
    },
    methods: {

    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuStudentFC{
    height: 100%;
    overflow: auto;
    font-size: 1.2rem;
    .nC;
    img,div{
        width:100%;

    }
}
</style>