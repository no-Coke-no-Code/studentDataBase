/*
 * @Author: fujihang 
 * @Date: 2019-04-10 09:21:50 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 20:51:17
    我的收藏
 */
<template>
<div id="fuMyColl">
   
    <van-tabs v-model="active" swipeable color="#27BCD5" :swipe-threshold="5" title-active-color="#27BCD5" title-inactive-color='#999999'>
        <van-tab title="老师">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getCollectTeacher"
            >
                <div class="teacherTL" v-for="(item,index) in collectTeacherList" :key="index" @click="toFN(item.TeacherId)">
                    <img :src="item.TeacherHeadIcon">
                    <div class="contant">
                        <div class="name">{{item.TeacherName}}</div>
                        <div class="good">擅长：{{item.Speciality}}</div>
                        <div class="det">{{item.Achievement}}</div>
                    </div>
                </div>
                <div class="emptyPage" v-if="!collectTeacherList.length">
                    <div>
                        <img src="../../image/yuRongLiang/emptyOrderList.jpg"/>
                        <p>你还没有收藏老师哦</p>
                        <p>到首页去看看吧</p>
                    </div>
                </div>
            </van-list>
        </van-tab>
        <van-tab title="课程"></van-tab>
        <!-- <van-tab v-for="(item,index) in funContant" :title="item.name" :key="index">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getData"
                >
                    <div v-show="active==0">
                        <div class="bW">
                            <schoolCurn type="true" v-for="(itemC,indexC) in funContant[0].data" :key="indexC" :data="itemC"></schoolCurn>
                        </div>
                        <div class="emptyPage" v-if="!funContant[0].data.length">
                            <div>
                                <img src="../../image/yuRongLiang/emptyOrderList.jpg"/>
                                <p>你还没有收藏课程哦</p>
                                <p>到首页去看看吧</p>
                            </div>
                        </div>
                    </div>
                    <div v-show="active==1">
                        <div class="teacherTL" v-for="(item,index) in funContant[1].data" :key="index" @click="toFN(item.TeacherId)">
                            <img :src="item.TeacherHeadIcon">
                            <div class="contant">
                                <div class="name">{{item.TeacherName}}</div>
                                <div class="good">擅长：{{item.Speciality}}</div>
                                <div class="det">{{item.Achievement}}</div>
                            </div>
                        </div>
                        <div class="emptyPage" v-if="!funContant[1].data.length">
                            <div>
                                <img src="../../image/yuRongLiang/emptyOrderList.jpg"/>
                                <p>你还没有收藏老师哦</p>
                                <p>到首页去看看吧</p>
                            </div>
                        </div>
                    </div>
                   
                </van-list>

        </van-tab> -->
    </van-tabs>
   
    
</div>
</template>

<script>
export default {
    watch:{
        active(val){
            if(val == 1)
            {
                this.$router.push({path:"/yuCollClass"});
            }
        },
    },
    data(){
        return {
            loading:false,//加载状态
            finished:false,//加载完成
            funContant:[
                {
                    name:"课程",//
                    finished:false,//完成
                    page:1,//页数
                    data:[],//数据
                },
                {
                    name:"老师",//
                    page:1,//页数
                    finished:false,//完成
                    data:[],//数据
                },
            ],//数据
            collectTeacherList:[],
            pageIndex:1,
            active:0,//
        };
    },

    mounted(){
        this.getCollectTeacher();
    },

    methods: {
        getCollectTeacher(){
            this.getFN({
                url:"/StudentCourse/GetUserTeacherCollection?rows=10&page="+this.pageIndex,
            }).then((r)=>{
                console.log(r)
                if(r.data.state=="success"){
                    let data=r.data.data
                    console.log(r.data.data,'查看返回的收藏家数据');
                    for(let i=0;i<data.length;i++){
                        this.collectTeacherList.push(data[i])
                    }
                    if(data.length<10){
                        this.finished=true
                        this.loading=false
                        return;
                    }
                    this.pageIndex++
                    this.loading=false
                }
                else this.notFN("获取失败，请刷新重试！")
                this.collectTeacherList = [];
            });
        },

        // 获取数据
        getData(){
            let url="/StudentCourse/GetUserCourseCollection"
            if(this.active) url="/StudentCourse/GetUserTeacherCollection"
            url+='?rows=10&page='+this.funContant[this.active].page
            this.finished=false
            if(this.funContant[this.active].finished)  {
                this.finished=true
                this.loading=false
                return
            }
            this.loading=true
            this.getFN({
                url:url
            }).then(r=>{
                console.log(r)
                if(r.data.state=="success"){
                    let data=r.data.data
                    console.log(r.data.data,'查看返回的收藏家数据');
                    for(let i=0;i<data.length;i++){
                        this.funContant[this.active].data.push(data[i])
                    }
                    if(data.length<10){
                        this.finished=true
                        this.loading=false
                        this.funContant[this.active].finished=true
                        return;
                    }
                    this.funContant[this.active].page++
                    this.loading=false
                }else this.notFN("获取失败，请刷新重试！")
                this.funContant[0].data = [];
            })
        },
        // 跳转页面
        toFN(id){
            this.$router.push({path:'/fuTeacherMien?id='+id})
        }

    }
}

</script>


<style lang='less' scoped>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuMyColl{
    height: 100%;
    overflow: hidden;
    .van-tabs{
        height: 100%;
        overflow: hidden;
        .van-tabs__content{
            height: 100%;
            overflow: hidden;
            .van-tab__pane{
                height: 100%;
                padding-bottom: 45px;
                .fBB;
                overflow:hidden;
                .van-list{
                    height: 100%;
                    overflow: auto;
                }
            }
        }
    }
    // 老师卡片
    .teacherTL{
        .bW;
        padding: 1rem;
        .fBB;.bBS;
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

    .emptyPage
    {
        width: 100%;
        height: 100%;
        background-color: #fff;
        position: absolute;
        text-align: center;
        z-index: 2;
        div
        {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            width: 50%;
            height: 50%;
            img
            {
                width: 6rem;
                height: 6rem;
            }
            p
            {
                margin-top: 1rem;
                &:first-of-type
                {
                    color: #c1c1c1;
                    font-size: 1.2rem;
                }
                &:nth-of-type(2)
                {
                    font-size: 1rem;
                }
            }
        }
    }
}
</style>