/*
 * @Author: fujihang
 * @Date: 2019-03-22 09:36:37
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 14:36:06
    点评
 */
<template>
<div id="fuEvaluate">
    <!-- 点评内容 -->
    <textarea class="eva" v-model="evaValue" placeholder="写下你对本课程的评价"></textarea>
    <!-- 发布按钮 -->
    <div class="Release">
        <van-button @click="submit">发布</van-button>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            evaValue:'',//点评内容
            courseId:this.$route.query.id,
            comment:''
        };
    },
    methods: {
        // 提交
        submit(){
            if(!this.evaValue){
              this.sysFN("系统提示","当前评论内容为空，不能提交");
            }
            this.postFN({
              url:'/StudentCourse/AddComment?comment='+ this.evaValue+'&courseId='+this.courseId
            }).then(r =>{
              console.log(r)
              if(r.data.state == 'success'){
                console.log('成功');
                this.okFN('成功')
              }else{
                this.errFN('失败提交')
              }
            })
        }
    }
}
</script>
<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuEvaluate{
    padding:1rem;
    .fBB;.nC;
    // 评价内容
    .eva{
        padding: 1.3rem;
        .fBB;
        width: 100%;
        height: 16rem;
        border:1px solid rgb(245, 245, 245);
        .bR;
        font-size: 1.2rem;
    }
    .eva::placeholder{
        color: #999;
    }
    // 按钮
    .Release{
        margin-top: 1rem;
        width: 100%;
        .van-button{
            width: 100%;
            .fBMRB;
            color: white;
        }
    }
}
</style>
