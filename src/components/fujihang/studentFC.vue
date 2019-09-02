/*
 * @Author: fujihang 
 * @Date: 2019-03-26 11:11:05 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-29 14:06:46
    学员风采
 */
<template>
<div class="studentFC" @click="toFN">
    <!-- 上面 -->
    <div class="img_det">
        <img :src="data.F_HeadIcon">
        <div class="detailSC">
            <div class="childSC">
                年龄：{{data.F_Birthday==null?'无':data.F_Birthday}}
            </div>
            <div class="childSC">
                籍贯：{{data.Province?data.Province:'无'}}
            </div>
            <div class="childSC">
                课程：{{data.CourseName}}
            </div>
        </div>
    </div>
    <!-- 下面 -->
    <div class="name_adept">
        <span class="name">{{data.F_NickName}}
        </span>
        <span class="adept">指导老师：{{data.TeacherName}}
        </span>
    </div>
</div>
</template>

<script>
export default {
    props:["data"],
    data(){
        return {

        };
    },

    methods: {
        toFN(){
            this.$router.push({path:'/fuStudentFC?F_Outline='+this.data.F_Outline})
        }
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.studentFC{
    .nC;.bW;
    border:1px solid rgb(245, 245, 245);
    .fBB;
    .img_det{
        display: flex;
        align-items: center;
        .fBB;
        padding: 1rem 1rem .5rem;
        >img{
            height: 4.5rem;
            width: 4.5rem;
            border-radius: 50%;
            object-fit: cover;
        }
        .detailSC{
            flex: 1;
            margin-left: .9rem;
            font-size: 1.2rem;
           .childSC{
               .Tline;
               margin-bottom: .3rem;
           }
        }
    }
    .name_adept{
        display: flex;
        align-items: center;
        .fBB;
        padding: 0 1rem 1rem 0;
        .name{
            width: 41%;
            .tB;
            overflow: hidden;
            text-align: center;
            border-radius: 0 3rem 3rem 0;
            color: white;
            padding: .3rem .1rem ;
            .fBB;
            font-size: 1.2rem;
        }
        .adept{
            margin-left: 1rem;
            flex: 1;
            .Tline;
            font-size: 1.1rem;
        }
    }
}
</style>