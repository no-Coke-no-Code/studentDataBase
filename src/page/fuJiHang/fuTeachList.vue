/*
 * @Author: fujihang 
 * @Date: 2019-04-08 16:36:22 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-08 18:43:34
    更多老师
 */
<template>
<div id="fuTeachList">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
    >
    <div class="searchWrapper">
        <div class="inputWrapper">
            <img class="searchIcon" src="../../image/yuRongLiang/searchIcon.jpg" @click="searchTeacher"/>
            <input placeholder="搜索老师名称" v-model="searchKey"/>
        </div>
    </div>
    <!-- <div class="teacherTL" v-for="(item,index) in dataList" :key="index" @click="toFN(item.F_Id)">
        <img :src="item.F_HeadIcon" class="teacherImg">
        <div class="contant">
            <div class="contantHead">
                <div class="name">{{item.F_Name}}</div>
                <div class="det">{{item.F_Achievement}}</div>
            </div>
            <div class="smallTag"></div>
            <div class="good"><span>擅长：</span>{{item.F_Speciality}}</div>
            <div class="learn">了解详情 > ></div>
        </div>
    </div> -->
        <div class="contant_tea">
            <div v-for="(item,index) in teacherList" class="child" :key="index">
                <teacher :data="item"></teacher>
            </div>
        </div>
    </van-list>
    
    

</div>
</template>

<script>
import teacher from '../../components/fujihang/teacher'

export default {
    components:{
        teacher
    },

    data(){
        return {
            loading:false,//加载状态
            finished:false,//加载完成
            page:1,//页数
            teacherList:[],//数据
            searchKey:'',//搜索的老师名字
        };
    },

    methods: {
        // 搜索老师按钮
        searchTeacher(){
            this.page = 1;
            this.teacherList = [];
            this.postFN({
                url:'/Student/GetTeacherJson',
                data:{
                    page:this.page,
                    rows:10,
                    name:this.searchKey,
                }
            }).then(r=>{
                if(r.data.state=="success"){
                    for(let i=0;i<r.data.data.length;i++){
                        this.teacherList.push(r.data.data[i])
                    }
                    if(r.data.data.length<10){
                        this.loading=false;
                        this.finished=true;
                        return
                    }
                    this.page++;
                    this.loading=false
                }else{
                    this.notFN('获取老师公告失败')
                    this.loading=false
                } 
            })
        },
        // 获取列表
        getData(){
            this.postFN({
                url:'/Student/GetTeacherJson',
                data:{
                    page:this.page,
                    rows:10,
                    name:'',
                }
            }).then(r=>{
                if(r.data.state=="success"){
                    for(let i=0;i<r.data.data.length;i++){
                        this.teacherList.push(r.data.data[i])
                    }
                    if(r.data.data.length<10){
                        this.loading=false;
                        this.finished=true;
                        return
                    }
                    this.page++;
                    this.loading=false
                }else{
                    this.notFN('获取老师公告失败')
                    this.loading=false
                } 
            })
        },
        // 跳转页面
        toFN(id){
            this.$router.push({path:'/fuTeacherMien?id='+id})
        }
    },
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuTeachList{
    overflow: hidden;
    height: 100%;
    .nC;
    // 输入框区域
    .searchWrapper
    {
        background: #fff;
        overflow: hidden;
        border-bottom: 1px solid #f7f7f7;
        .inputWrapper
        {
            display: flex;
            align-items: center;
            border: 1px solid #fff;
            margin: 1rem;
            border: 1px solid #f7f7f7;
            .searchIcon
            {
                width: 1.5rem;
                height: 1.5rem;
                margin: 1rem;

            }
            input
            {
                flex: 1;
                box-sizing: border-box;
                display: block;
                height: 3rem;
                font-size: 1.2rem;
            }
        }
    }
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
            border-radius: 50%;
        }
        .contant{
            flex: 1;
            margin-left: 1rem;
            .contantHead
            {
                .name{
                    margin-bottom: .3rem;
                    font-size: 1.2rem;
                    color: #27BCD5;
                }
            }
            .smallTag
            {
                width: 1.25rem;
                height: .1rem;
                background-color: @theme;
            }
            .good,.det{
                font-size: 1.1rem;
                color: #999;
            }
            .good
            {
                >span
                {
                    color: @theme;
                }
            }
            .det{
                margin-top: .1rem;
                .Tline;
                float:left;
            }
            .learn
            {
                color: #fff;
                background-color: @theme;
                display: inline-block;
                padding: .3rem;
                border-radius:.3rem;
            }
        }
    }

    .van-list{
        overflow: auto;
        height: 100%;
    }
}
</style>