/*
 * @Author: fujihang 
 * @Date: 2019-03-27 15:27:52 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-02 17:23:52
    学员标签
 */
<template>
<div id="fuStudentTag">
    <!-- 标签内容 -->
    <div class="contant">
        <div class="tag" v-for="(item,index) in tag" :key="index">
            <img src="../../image/fuJiHang/tag.svg">
            {{item}}
        </div>
    </div>

    <!-- 底部按钮 -->
     <div class="ling">
        <van-button @click="show=true">新建标签</van-button>
    </div>

    <!-- 弹窗 -->
    <van-dialog
    v-model="show"
    show-cancel-button
    @confirm="addTap"
    >
        <input class="biaoqian" v-model="addData" placeholder="请输入添加的标签">
    </van-dialog>
</div>
</template>

<script>
export default {
    data(){
        return {
            addData:'',
            tag:[],
            userId:this.$route.query.userId,
            show:false,
        };
    },

    methods: {
        // 获取数据
        getData(){
           
            this.getFN({
                url:"/StudentCourse/GetUserLabel?userId="+this.userId
            }).then(r=>{
                if(r.data.state='success'){
                    let data=r.data.data.CustomLabel
                    if(data==null) return this.notFN("该学员没有标签")
                    this.tag=data.split(',')
                }else{
                    this.errFN('获取数据失败')
                }
            })
        },
        // 添加标签
        addTap(){
            if(this.addData=='') return this.notFN('请输入标签内容');
            this.postFN({
                url:"/StudentCourse/AddUserLabel?userId="+this.userId+"&labelStr="+this.addData
            }).then(r=>{
                if(r.data.state=="success") {
                    this.tag.push(this.addData)
                    this.addData=''
                }
                this.notFN(r.data.message)
            })
        },
    },
    mounted(){
        this.getData();
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuStudentTag{
    .hO;.mRB;
    // <!-- 标签内容 -->
    .contant{
        .fBB;.bW;
        padding: 2rem .5rem 3rem;
        display: flex;
        flex-wrap: wrap;
        .tag{
            color: #27BCD5;
            width: calc(33.33% - 1rem);
            border:1px solid #27BCD5;
            border-radius: .3rem;
            .fBB;
            margin:0 .5rem 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: .5rem 0;
            >img{
                height: 1.3rem;
                margin-right: .3rem;
            }
        }
    }
    // 按钮
    .ling{
        bottom: 0;
        position: fixed;
        width: 100%;
        .van-button{
            .fBMRB;
            color: white;
            width: 100%;
        }
    }
    // 标签
    .biaoqian{
        padding: 1rem;
        .fBB;
        width: 100%;
        font-size: 1.2rem;
        height: 4rem;
    }
}
</style>