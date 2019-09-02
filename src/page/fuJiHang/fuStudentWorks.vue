/*
 * @Author: fujihang 
 * @Date: 2019-03-21 20:18:56 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-25 16:36:13
    学生作品
 */
<template>
<div id="fuStudentWorks">
    <div class="bW">
        <!-- 头部 -->
        <div class="TopName">
            <img class="img" src="../../image/fuJiHang/xin.png">学员作品展示
        </div>

        <!-- 内容 -->
        <stuWorks :data="item" v-for="(item,index) in worksList" :key="index"></stuWorks>
    </div>
    
</div>
</template>

<script>
import stuWorks from '../../components/fujihang/stuWorks'
export default {
    components:{
        stuWorks,
    },
    data(){
        return {
            worksList:[
                {
                    img:require('../../image/fuJiHang/classList.png'),
                    name:"专业美甲研究展示",
                    work:'03作品',
                    time:'2019/02/26 13:20:23',
                },
                {
                    img:require('../../image/fuJiHang/classList.png'),
                    name:"专业美甲研究展示",
                    work:'03作品',
                    time:'2019/02/26 13:20:23',
                },
            ],//展示内容
        };
    },

    methods: {

    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuStudentWorks{
    .nC;.mRB;
    .hO;
    // 头部
    .TopName{
        .bW;
        display: flex;
        align-items: center;
        padding: 1rem 1.3rem 1rem 0;
        margin-left: 1.3rem;
        font-size: 1.25rem;
        .fBB;.bBS;.tC;
        .img{
            margin-right: .6rem;
            height: 1.7rem;
        }
    }
}
</style>