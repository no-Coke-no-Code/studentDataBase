/*
 * @Author: fujihang 
 * @Date: 2019-04-08 15:43:49 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 21:19:40
    老师风采详情
 */
<template>
<div id="fuTeacherMien">
    <!-- <navBarTow btn='true' :name='
    Data.F_Name' ></navBarTow> -->

    <!-- 头部 -->
    <div class="topTM">
        <img class="bgTM" src="../../image/fuJiHang/fuMy/pic_order_bg@2x.png">
        <div class="postion">
            <img :src="Data.data.F_HeadIcon">
            <div class="name_join">
                <div class="name">
                    {{Data.data.F_Name}}
                </div>
                <div class="classNum">
                    <p>{{Data.courseCount}}</p>
                    <p>课程数量</p>
                </div>
                <div class="studentNum">
                    <p>{{Data.studentCount}}</p>
                    <p>学生数量</p>
                </div>
            </div>
            <div class="collectBtn" @click="CollectFN">
                <van-icon  :name="aaa?'like':'like-o'" color="#FF8499"  size='1.5rem'/>
                <span>{{aaa?'已收藏':'收藏'}}</span>
            </div>
        </div>
    </div>

    <van-tabs v-model="index" title-active-color="#27BCD5" title-inactive-color='#999999' swipeable color="#27BCD5" :swipe-threshold="5">
        <van-tab :title="'全部课程('+ Data.courseCount +')'">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getCourseList"
                >
                <yuClassCard :type="cardType" v-for="(item,index) in classData" :key="index" :item="item"></yuClassCard>
            </van-list>
        </van-tab>
        <van-tab title="教师介绍">
            <div class="contantTM">
                <!-- <div class="type">
                    <span class="good">擅长 :</span>{{Data.F_Speciality}}
                </div> -->
                <div class="html" v-html="htmlData">
                </div>
            </div>
        </van-tab>
    </van-tabs>

</div>
</template>

<script>
import navBarTow from '../../public/navBarTow'
import axios from 'axios'
import yuClassCard from "./../yuRongLiang/yuClassCard";
export default {
    components:{
        navBarTow,yuClassCard
    },
    data(){
        return {
            loading:false,
            finished:false,
            cardType:"teacherClassCardType",
            id:"",
            Data:{},//数据
            htmlData:'',
            aaa:false,
            index:0,
            pageIndex:1,
            classData:[],//该老师的课程信息
            classNum:0,
        };
    },

    methods: {
        // 初始化页面
        init(){
            this.getData();
            // this.getCourseList();
        },

        // 获取老师的课程列表
        getCourseList(){
            this.loading = true;
            this.getFN({
                url:"/Teacher/GetTeacherCourseList?teacherId="+ this.id +"&rows=10&page="+this.pageIndex,
            }).then((r)=>{
                console.log(r);

                if(r.data.state=="success"){
                    let data=r.data.data.rows;
                    this.classNum = r.data.data.records;
                    for(let i=0;i<data.length;i++){
                        this.classData.push(data[i])
                    }
                    if(data.length<10){
                        this.loading=false;
                        this.finished=true;
                        return
                    }
                    this.pageIndex++;
                    this.loading=false
                }else{
                    this.notFN('获取更多课程失败，请刷新重试！')
                    this.loading=false
                } 
            });
        },

        // 获取老师的基础信息
        getData(){
            this.tipFN()
            this.postFN({
                url:'/Teacher/GetTeacherInfo',
                data:{
                    teacherId:this.id
                }
            }).then(r=>{
                 this.tipHFN()
                 console.log(r);
                if(r.data.state=="success"){
                    this.Data=r.data.data;
                    if(r.data.collect)
                    {
                        this.aaa=true
                    }
                    console.log(this.Data.F_Outline);
                    axios({
                        url:this.Data.data.F_Outline,
                        method:'get',
                        headers:{
                        'Content-Type': 'application/json; application/octet-stream'
                    },
                    responseType: 'blob',
                    }).then(r=>{
                        this.changeRGB(r.data).then(j=>{
                            this.htmlData=j
                        })
                    })
                }else this.notFN('获取老师信息失败')
            })
        },
        // 收藏
        CollectFN(){
            this.postFN({
                url:'/StudentCourse/SetUserTeacherOrCourse?type=1&collectionId='+this.id,
            }).then(r=>{
                if(r.data.state=="success"){
                    this.aaa=!this.aaa
                } 
                this.notFN(r.data.message)
                
            })
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        this.init();
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuTeacherMien{
    .nC;
    overflow: auto;
    height: 100%;
    background-color: #f4f5f9;
    .topTM{
        position: relative;
        color:#fff;
        .bgTM{
            width: 100%;
            object-fit: cover;
            height: 12rem;
        }
        .postion{
            position: absolute;
            top: 0;left: 0;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            padding: 0 1.5rem;
            .fBB;
            >img{
                border-radius: 50%;
                object-fit: cover;
                width: 7rem;
                height: 7rem;
            }
            .name_join{
                flex: 1;
                margin-left: 1rem;
                .name{
                    font-size: 1.4rem;
                    text-align: center;
                    margin-bottom: .3rem;
                }
                .classNum,.studentNum
                {
                    box-sizing: border-box;
                    float: left;
                    width: 5rem;
                    text-align: center;
                    font-size: 1.2rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 48%;
                    >p
                    {
                        margin-bottom: .3rem;
                    }
                }
                .classNum
                {
                    border-right: 1px solid #c2c2c2;
                }
                // .studentNum
                // {
                // }
                .join{
                    .fBB;
                    background: white;
                    color: #27BCD5;
                    font-size: 1.05rem;
                    padding: .3rem .8rem;
                    border-radius: 2rem;
                }
            }
            .collectBtn
            {
                width: 6rem;
                height: 3rem;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-right: 0.3rem;
                padding-left: 0.3rem;
                border: 1px solid rgba(255,255,255,.3);
                margin-left: 1rem;
                background-color: rgba(255, 255, 255, 0.3);
                transform: translateY(.9rem);
                .van-icon
                {
                    vertical-align: sub;
                    margin-right: .5rem;
                }
                span
                {
                    font-size:1.25rem;
                }
            }
        }
    }
    // 导航条
    .topName{
        display: flex;
        align-items: center;
        .tC;
        padding: 1.1rem 1rem;
        .bBS;
        .fBB;
        font-size: 1.3rem;
        .img{
            height: 1.7rem;
            margin-right: .3rem;
        }
        .starD{
            flex: 1;
            text-align: right;
        }
    }
    // 课程介绍
    .contantTM{
        .fBB;
        padding: 0 1rem;
        .type{
            color: #FF8499;
            font-size: 1.05rem;
            .fBB;
            padding: 1rem 0;
            .good{
                padding:.2rem .8rem;
                margin-right: 1rem;
                color: white;
                font-size: 1.1rem;
                border-radius: .6rem 0 .6rem 0;
                background: #FF8499;
            }
        }
        .html{
            font-size: 1.15rem;
            div,p,span,h1,h2,h3,em,img{
                max-width: 100%;
            }
            color: #999;
        }
    }
}
</style>