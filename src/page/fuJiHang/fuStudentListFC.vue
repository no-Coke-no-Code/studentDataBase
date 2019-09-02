/*
 * @Author: fujihang 
 * @Date: 2019-04-08 16:36:22 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-29 14:11:36
    更多学员风采
 */
<template>
<div id="fuStudentListFC">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
    >
    <div class="teacherTL" v-for="(item,index) in dataList" :key="index" @click="toFN(item.F_Outline)">
        <img :src="item.F_HeadIcon">
        <div class="contant">
            <div class="name">{{item.F_NickName}}</div>
            <div class="good">课程：{{item.CourseName}}</div>
            <div class="det">分数：{{item.F_Grade}}</div>
        </div>
    </div>
      
    </van-list>
    
    

</div>
</template>

<script>
export default {
    data(){
        return {
            loading:false,//加载状态
            finished:false,//加载完成
            page:1,//页数
            dataList:[],//数据
        };
    },

    methods: {
        // 获取列表
        getData(){
            this.postFN({
                url:'/Student/GetStudentJson',
                data:{
                    page:this.page,
                    rows:10,
                }
            }).then(r=>{
                if(r.data.state=="success"){
                    for(let i=0;i<r.data.data.length;i++){
                        this.dataList.push(r.data.data[i])
                    }
                    if(r.data.data.length<10){
                        this.loading=false;
                        this.finished=true;
                        return
                    }
                    this.page++;
                    this.loading=false
                }else{
                    this.notFN('获取学员风采失败')
                    this.loading=false
                } 
            })
        },
        // 跳转页面
        toFN(id){
            this.$router.push({path:'/fuStudentFC?F_Outline='+id})
        }
    },
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuStudentListFC{
    overflow: hidden;
    height: 100%;
    .nC;
    // 老师卡片
    .teacherTL{
        padding: 1rem;
        .fBB;
        display: flex;
        align-items: center;
        >img{
            height: 5rem;
            width: 5rem;
            object-fit: cover;
        }
        .contant{
            flex: 1;
            margin-left: 1rem;
            .name{
                margin-bottom: .3rem;
                font-size: 1.2rem;
            }
            .good,.det{
                font-size: 1.1rem;
                color: #999;
                
            }
            .det{
                margin-top: .1rem;
                .Tline;
            }
        }
    }

    .van-list{
        overflow: auto;
        height: 100%;
    }
}
</style>