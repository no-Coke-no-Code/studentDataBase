/*
 * @Author: fujihang 
 * @Date: 2019-03-21 10:12:04 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-26 14:51:00
    学院介绍
 */
<template>
<div id='fuSchoolIntro'>
    <div class="contant">
        <schoolIntro v-for="i in 2" :key="i"></schoolIntro>
    </div>
    
</div>
</template>

<script>
import schoolIntro from '../../components/fujihang/schoolIntro'
export default {
    components:{
        schoolIntro,
    },
    data(){
        return {

        };
    },

    methods: {
        //获取学院介绍
        getData(){
            this.getFN({
                url:'/GetSchoolList?pageSize='+10+'&pageIndex='+1+'&schoolName='+''
            }).then(r=>{
                console.log(r)
            })
        }
    },
    mounted(){
        this.getData();
    }
}

</script>


<style lang='less'>
@import "../../style/base.less";
@import "../../style/fujihangBase.less";
#fuSchoolIntro{
    padding: 1rem .7rem 0;
    .fBB;.hO;
    .contant{

        display: flex;
        flex-wrap: wrap;
    }
    
}

</style>