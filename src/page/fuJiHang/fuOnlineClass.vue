/*
 * @Author: fujihang 
 * @Date: 2019-04-04 10:12:20 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-04 11:28:42
    线上课程
 */
<template>
<div id="fuOnlineClass">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
    >
    <div class="bW">
         <OnlineClass v-for="(item,index) in dataList" :key="index" :data="item"></OnlineClass>
    </div>
      
    </van-list>
    
</div>
</template> 



<script>
import OnlineClass from '../../components/fujihang/OnlineClass'
export default {
    components:{
        OnlineClass,
    },
    data(){
        return {
            dataList:[
                // {
                //     CourseName:'唇部快速去死皮+完美唇形画法 纯干货！',
                //     CourseLogo:require('../../image/fuJiHang/classList.png'),
                //     CourseStateTime:"2018/02/05",
                //     TeacherName:"李孝利",
                //     SchoolName:'韩山师范学院',
                //     CoursePrice:'99.00'
                // }
            ],
            loading:false,//加载状态
            finished:false,//是否加载完成
            page:1,//页数
        };
    },

    methods: {
        // 获取数据
        getData(){
            this.getFN({
                url:'/StudentCourse/GetCourseInfoList?pageSize=10&pageIndex='+this.page,
            }).then(r=>{
                if(r.data.state){
                    let data=r.data.data
                    for(let i=0;i<data.rows.length;i++){
                        this.dataList.push(data.rows[i])
                    }
                    if(data.rows.length<10){
                        this.loading=false
                        this.finished=true
                        return
                    }
                    this.page++
                    this.loading=false
                }else{
                    this.loading=false
                    this.errFN("获取线上课程失败，请刷新重试！")
                }
            })
        }
    },

}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuOnlineClass{
    .mRB;
    height: 100%;
    overflow: hidden;
    .van-list{
        overflow: auto;
        height: 100%;
        .fBB;
    }
}
</style>