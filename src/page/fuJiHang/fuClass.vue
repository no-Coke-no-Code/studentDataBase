/*
 * @Author: fujihang 
 * @Date: 2019-03-19 15:57:08 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-05-14 18:46:24
    线下课程
 */
<template>
<div id="fuClass"> 
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
    >
    <div class="bW">
      <!-- v-show="item.Price>99" -->
         <schoolCurn type="true"  v-for="(item,index) in dataList" :key="index" :data="item" qudiao="true"></schoolCurn>
    </div>
      
    </van-list>
    <!-- <classContent :data="item" v-for="(item,index) in classList" :key="index"></classContent> -->
</div>
</template>
 
<script>
import classContent from '../../components/fujihang/classContent'
import schoolCurn from '../../components/fujihang/schoolCurn'
export default {
    components:{
        classContent,schoolCurn
    },
    data(){
        return {
            loading:false,//
            finished:false,//
            dataList:[],
            page:1,
            classList:[
                {
                    icon:require('../../image/fuJiHang/xin.png'),
                    barName:'预约课程',
                    list:[
                        {
                            type:'已预约',
                            name:'ZM逐美专业美甲课程培训美甲练习视频',
                            teach:'讲师：李孝利 韩山师范学院',
                            img:require("../../image/fuJiHang/classList.png"),
                            sta:0
                        },
                        {
                            type:'已预约',
                            name:'ZM逐美专业美甲课程培训美甲练习视频',
                            teach:'讲师：李孝利 韩山师范学院',
                            img:require("../../image/fuJiHang/classList.png"),
                            sta:0
                        },
                    ]
                },
               
                {
                    icon:require('../../image/fuJiHang/xin.png'),
                    barName:'已开课课程',
                    list:[
                        {
                            type:'已开课',
                            name:'ZM逐美专业美甲课程培训美甲练习视频',
                            teach:'讲师：李孝利 韩山师范学院',
                            img:require("../../image/fuJiHang/classList.png"),
                            sta:1,
                        },
                        {
                            type:'已开课',
                            name:'ZM逐美专业美甲课程培训美甲练习视频',
                            teach:'讲师：李孝利 韩山师范学院',
                            img:require("../../image/fuJiHang/classList.png"),
                            sta:1,
                        },
                    ]
                },
                {
                    icon:require('../../image/fuJiHang/xin.png'),
                    barName:'已完成课程',
                    list:[
                        {
                            type:'已完成',
                            name:'ZM逐美专业美甲课程培训美甲练习视频',
                            teach:'讲师：李孝利 韩山师范学院',
                            img:require("../../image/fuJiHang/classList.png"),
                            sta:2,
                        },
                        {
                            type:'已完成',
                            name:'ZM逐美专业美甲课程培训美甲练习视频',
                            teach:'讲师：李孝利 韩山师范学院',
                            img:require("../../image/fuJiHang/classList.png"),
                            sta:2,
                        },
                    ]
                },
            ],//课程
        };
    },

    methods: {
        // 获取数据
        getData(){
            this.getFN({
                url:'/StudentCourse/GetCourseTypeCourseList?pageSize=10&pageIndex='+this.page,
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
    }
}

</script>


<style lang='less'>
#fuClass{
    height: 100%;
    overflow: hidden;
    position: relative;
    background:#F7F7F7;
    .van-list{
        height: 100%;
        overflow: auto;
    }
    
}
</style>