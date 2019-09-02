/*
 * @Author: fujihang 
 * @Date: 2019-04-08 19:57:23 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-05-14 18:46:45
    更多热门课程
 */
<template>
<div id="fuMoreClass">
    <!-- 导航条 -->
    <navBarTow btn="true" :name="name"></navBarTow>

    <!-- 内容 -->
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
    >
    <!-- v-show="item.Price>99" -->
        <schoolCurn type="true"  :data="item" v-for="(item,index) in dataList"  :key="index"></schoolCurn>

    </van-list>
</div>
</template>

<script>
import navBarTow from '../../public/navBarTow'
import schoolCurn from '../../components/fujihang/schoolCurn'
export default {
    components:{
        navBarTow,schoolCurn
    },
    data(){
        return {
            loading:false,//加载状态
            finished:false,//加载完成
            page:1,//页数
            dataList:[],//数据
            CourseId:this.$route.query.id,//课程id
            name:this.$route.query.name,//课程类别名称
        };
    },

    methods: {
        // 获取列表
        getData(){
            this.loading=true
            this.getFN({
                url:"/StudentCourse/GetCourseTypeCourseList?pageSize="+10+"&pageIndex="+this.page+"&itemId="+this.CourseId,
            }).then(r=>{
                if(r.data.state=="success"){
                    let data=r.data.data.rows
                    for(let i=0;i<data.length;i++){
                        this.dataList.push(data[i])
                    }
                    if(data.length<10){
                        this.loading=false;
                        this.finished=true;
                        return
                    }
                    this.page++;
                    this.loading=false
                }else{
                    this.notFN('获取更多课程失败，请刷新重试！')
                    this.loading=false
                } 
            })
        },
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuMoreClass{
    height: 100%;
    overflow: hidden;
    .van-list{
        height: 100%;
        overflow: auto;
    }
}
</style>