/*
 * @Author: fujihang 
 * @Date: 2019-03-22 17:10:49 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 14:33:11
    作品详情
 */
<template>
<div id="fuWorksDetail">
    <!-- 标题 -->
    <div class="name">
        {{Data.WorksTitle?Data.WorksTitle:'无'}}
    </div>
    
    <!-- 时间类型 -->
    <div class="zhuTime">
        <span>组课：{{Data.CourseName?Data.CourseName:'无'}}</span>
        <span>发布时间：{{Data.CreatorTime?Data.CreatorTime:'无'}}</span>
    </div>

    <div class="contantWD" v-html="Data.Info">


        <!-- <div class="img_det">
            <img class="img" src="../../image/fuJiHang/school.png">
            <div class="det">
                好学校是中国领先的在线教育服务提供商,提供覆盖各大城市的资质认证学校、强大智慧的课程和地图搜索、优质课程、真实用户点评、请教师兄、低价赔付和读书保障等教育
            </div>
        </div>
        <div class="contant_bot">
            好学校是中国领先的在线教育服务提供商,提供覆盖各大城市的资质认证学校、强大智慧的课程和地图搜索、优质课程、真实用户点评、请教师兄、低价赔付和读书保障等教育...好学校是中国领先的在线教育服务提供商,提供覆盖各大城市的资质认证学校、强大智慧的课程和地图搜索、优质课程、真实用户点评、请教师兄、低价赔付和读书保障等教育...
        </div> -->
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            id:this.$route.query.F_Id,
            Data:{},//数据
        };
    },

    methods: {
        getData(){
            this.postFN({
                url:"/StudentCourse/GetWorksInfo?worksId="+this.id
            }).then(r=>{
                if(r.data.state=="success"){
                    this.Data=r.data.data
                    axios({
                        url:this.Data.Info,
                        method:'get',
                        headers:{
                        'Content-Type': 'application/json; application/octet-stream'
                    },
                    responseType: 'blob',
                    }).then(r=>{
                        this.changeRGB(r.data).then(j=>{
                            this.Data.Info=j
                        })
                    })
                }else this.notFN(r.data.message)
            })
        }
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuWorksDetail{
    .hO;
    .bW;
    .nC;
    .name{
        text-align: center;
        padding: 1rem 1rem;
        font-size: 1.3rem;
    }
    .zhuTime{
        .mRB;
        text-align: center;
        color: #999;
        font-size: 1.15rem;
        padding: .5rem 0;
        >span{
            margin: 0 1rem;
        }
    }

    .contantWD{
        color: #999;
        .fBB;
        padding: 1rem ;
        div,li,h1,h2,h3,img{
            max-width: 100%;
        }
        .img_det{
            display: flex;
            .img{
                height: 5.8rem;
                width: 35%;
                object-fit: cover;
            }
            .det{
                height: 100%;
                .fOTH;
                -webkit-line-clamp:5;
                flex: 1;
                margin-left: 1rem;
            }
        }
        .contant_bot{
            margin-top: .3rem;
        }
    }
}
</style>