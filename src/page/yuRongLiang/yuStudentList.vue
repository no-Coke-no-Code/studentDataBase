<template>
<div id='yuStudentList'>
    <!-- 内容 -->
    <div class="stuContant">

        <!-- 搜索框 -->
        <div class="bW searchArea">
            <!-- <seach :plr="'请输入姓名或手机号或微信号'"></seach> -->
            <div class="seach">
                <input placeholder="请输入用户名或者手机号" v-model="searchData">
                <div class="btn"  @click="search">
                    <van-icon name="search"/>确定
                </div>
            </div>
        </div>
        
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
            <div class="studentCard" v-for="(item,index) in studentList" :key="index" @click="toConfirm(item)">
                <img :src="item.F_HeadIcon" class="studentIcon"/>
                <div class="studentMsg">
                    <div class="content">
                        <p class="studentName">{{item.F_NickName}}</p>
                        <p class="studentPhone"><img src="../../image/fuJiHang/phone.png"/>{{item.F_MobilePhone}}</p>
                    </div>
                    <div class="btn" :class="{'arrived':item.F_ItemName!='待到校','noArrived':item.F_ItemName=='待到校'}">
                        <span>{{item.F_ItemName=="待到校"?'未到校':'已到校'}}</span>
                    </div>
                </div>
                <span style="font-size:1.5rem;"> > </span>
            </div>
        </van-list>

        <!-- 管理 -->
        <!-- <van-tabs v-model="active"  swipeable color="#27BCD5" title-active-color="#27BCD5" title-inactive-color='#999999'>
            <van-tab v-for="(item,index) in funContant" :title="item.name+'('+item.num+')'" :key="index">
                <stuManage v-for="i in 10" :key="i"></stuManage>
            </van-tab>
        </van-tabs> -->
    </div>
    <!-- 底部按钮 -->
    <!-- <div class="btnBot">
        <van-checkbox checked-color="#27BCD5" v-model="all">共选{{stuNum}}名学员</van-checkbox>
        <van-button class="botton">快速批过</van-button>
    </div> -->
</div>
</template>

<script>
import seach from '../../components/fujihang/seach';
import stuManage from '../../components/fujihang/stuManage';
export default {
    components:{
        seach,stuManage
    },
    data(){
        return {
            searchData:"",
            funContant:[
                {
                    name:'全部',
                    num:2,
                },
                {
                    name:'锁定',
                    num:1,
                },
                {
                    name:'跟进',
                    num:1,
                },
                {
                    name:'待到校',
                    num:1,
                },
                {
                    name:'已到校',
                    num:2,
                },
            ],
            //管理内容导航条
            active:0,//当前内容在哪
            stuNum:0,//选择的学生数量
            all:false,//全选或者不全选

            studentList:[],

            loading:false,
            finished:false,

            courseName:"",
            courseId:"",
            schoolId:"",
            schoolName:"",
            time:"",
            pageIndex:1,
        };
    },

    methods: {
        search(){
            this.studentList = [];
            this.pageIndex = 1;
            this.postFN({
                url:"/Student/GetStudentList",
                data:{
                    schoolId:this.schoolId,
                    courseId:this.courseId,
                    dateTime:this.time,
                    searchStr:this.searchData,
                    page:this.pageIndex,
                    rows:10,
                },
            }).then((res)=>{
                console.log(res);
                if(res.data.state=="success"){
                    let data=res.data.data.rows
                    for(let i=0;i<data.length;i++){
                        this.studentList.push(data[i])
                    }
                    if(data.length<10){
                        this.loading=false;
                        this.finished=true;
                        return
                    }
                    this.pageIndex++;
                    this.loading=false
                }
                else{
                    this.notFN('搜索失败，请刷新重试！')
                    this.loading=false
                } 
            });
        },
        init(){
            this.courseName = this.$route.query.courseName;
            this.courseId = this.$route.query.courseId;
            this.schoolId = this.$route.query.schoolId;
            this.schoolName = this.$route.query.schoolName;
            this.time = this.$route.query.dateTime;
        },
        getData(){
            this.loading = true;
            this.postFN({
                url:"/Student/GetStudentList",
                data:{
                    schoolId:this.schoolId,
                    courseId:this.courseId,
                    dateTime:this.time,
                    searchStr:"",
                    rows:"10",
                    page:this.pageIndex,
                },
            }).then((res)=>{
                console.log(res);
                if(res.data.state=="success"){
                    let data=res.data.data.rows
                    console.log(this.studentList,'查看学生列表');
                    for(let i=0;i<data.length;i++){
                        this.studentList.push(data[i])
                    }
                    if(data.length<10){
                        this.loading=false;
                        this.finished=true;
                        return
                    }
                    this.pageIndex++;
                    this.loading=false
                }
                else{
                    this.notFN('获取更多学生失败，请刷新重试！')
                    this.loading=false
                } 
            });
        },

        // 跳转至确认到校页
        toConfirm(item){
            console.log(item);
            this.$router.push({path:"/yuConfirmToSchool",query:{
                studentUserCourseId:item.F_Id
            }});
        }
    },

    created(){
        this.init();
    },
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#yuStudentList{
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    .mRB;
    .nC;
    // 内容
    .stuContant{
        .searchArea
        {
            margin-bottom: 1rem;
            .seach{
                display: flex;
                margin: .6rem 3rem;
                box-sizing: border-box;
                border-radius: 1.5rem;
                background-color: #fff;
                padding: 0 !important;
                .mRB;
                >input{
                    flex: 1;
                    height: 3rem;
                    padding-left:1.2rem;
                    box-sizing: border-box; 
                    font-size: 1.25rem;
                }
                .btn{
                    background: #D6D6D6;
                    width: 6rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius:0 1.5rem 1.5rem 0;
                    color: white;
                    font-size: 1.2rem;
                    .van-icon{
                        margin-right: .6rem;
                        font-size: 1.5rem;
                    }
                }
            }
        }
        flex: 1;
        display: flex;
        flex-direction: column;
        .van-tabs{
            .fBB;
            flex: 1;
            overflow: hidden;
            .van-tabs__content{
                height: 100%;
                margin-top: 1rem;
                .van-tab__pane{
                    height: 100%;
                    overflow: auto;
                    .fBB;
                    padding-bottom: 1rem;
                }
            }
        }
        .studentCard
        {
            margin-bottom: .5rem;
            background-color: #fff;
            padding: 2rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .studentIcon
            {
                border-radius: 50%;
                width: 4rem;
                height: 4rem;
                margin-right: 1.5rem;
            }
            .studentMsg
            {
                display: flex;
                flex: 1;
                justify-content: space-between;
                align-items: center;
                margin-right: 1.5rem;
                .studentName
                {
                    font-size: 1.3rem;
                    margin-right: .5rem;
                    margin-bottom: .5rem;
                }
                .studentPhone
                {
                    font-size: 1rem;
                    color: #c0c0c0;
                    img
                    {
                        height: 1.5rem;
                        width: 1.5rem;
                        margin-right: .5rem;
                    }
                }
                .arrived,.noArrived
                {
                    width: 4rem;
                    padding: .5rem .5rem;
                    height:1rem;
                    line-height: 1rem;
                    text-align: center;
                    color: #fff;
                    border-radius: .5rem;
                    margin-right: 1rem;
                }
                .arrived
                {
                    background-color: #26bcd7;
                }
                .noArrived
                {
                    background-color: red;
                }
            }
        }
    }

    // 底部按钮
    .btnBot{
        .bW;
        display: flex;
        height: 44px;
        align-items: center;
        padding-left: 1rem;
        border-top: 1px solid rgb(245, 245, 245);
        .fBB;

        .van-checkbox{
            .van-checkbox__label{
                color: #666666;
                font-size: 1.2rem;
            }
            flex: 1;
        }
        .botton{
            border: none;
            width: 40%;
            .fBMRB;
            color: white;
        }
    }
}
</style>