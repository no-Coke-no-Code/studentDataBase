/*
 * @Author: fujihang 
 * @Date: 2019-03-25 10:22:49 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-16 21:06:58
    报单申请列表
 */
<template>
<div id='fuDeclaratList'>
    <!-- 内容 -->
    <div class="stuContant">

        <!-- 时间，搜索 -->
        <!-- <seachTime @seach="seachFN" @callbackT="getTime" btn="查询" plr="请输入学员/课程名称"></seachTime> -->
        <seach @seachFN="seachFN" plr='请输入学员/课程名称' btn="查询"></seach>
        

        <!-- 管理 -->
        <van-tabs v-model="active" background="#F7F7F7"  swipeable color="#27BCD5" title-active-color="#27BCD5" title-inactive-color='#999999' @change="getData()">
            <van-tab v-for="(items,index) in funContant" :title="items.name+'('+items.num+')'" :key="index">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getData"
                >
                <div  @click="toFN('/fuDeclaratDet?id='+item.F_Id)" v-for="(item,ic) in items.data" :key="ic">
                    <DeclaratCard  :data="item"></DeclaratCard>
                </div>
                    
                </van-list>
            </van-tab>
        </van-tabs>
    </div>

    <!-- 右边按钮 -->
    <div class="right_btn">
        <van-button size="small" @click="toFN('/fuStudentManage')">前往学员管理</van-button>
    </div>

    
</div>
</template>

<script>
import seach from '../../components/fujihang/seach'
import seachTime from '../../components/fujihang/seachTime';
import DeclaratCard from '../../components/fujihang/DeclaratCard';
export default {
    components:{
        seachTime,DeclaratCard,seach
    },
    data(){
        return {
            funContant:[
                {
                    name:'全部',//标题
                    num:2,//总多少条数据
                    data:[],//数据
                    page:1,//页数
                    type:-1,//请求类型
                    finished:false,//是否加载完成
                },
                {
                    name:'待审批',
                    num:0,
                    data:[],//数据
                    page:1,//页数
                    type:0,//请求类型
                    finished:false,//是否加载完成
                },
                {
                    name:'已通过',
                    num:0,
                    data:[],//数据
                    page:1,//页数
                    type:1,//请求类型
                    finished:false,//是否加载完成
                },
                {
                    name:'被驳回',
                    num:0,
                    data:[],//数据
                    page:1,//页数
                    type:2,//请求类型
                    finished:false,//是否加载完成
                },
            ],
            //报单申请导航条
            active:0,//当前内容在哪
            dataList:[],//列表数据
            loading:false,//加载状态
            finished:false,//是否加载完毕
            sea:null,//搜索
            startTime:null,//开始时间
            endTime:null,//结束时间
            userInfo:JSON.parse(localStorage.getItem('userInfo'))
        };
    },

    methods: {
        getData(){
            if(this.funContant[this.active].finished) {
                this.loading=false
                this.finished=true
                 return
            }
            this.finished=false
            this.loading=true
            this.postFN({
                url:'/Student/GetExamineInfo',
                data:{
                    // UserID:'DA423A52-AC05-4D34-B28C-0B057D1A2FAD',
                    UserID:this.userInfo.wxInfo.UserId,
                    State:this.funContant[this.active].type,
                    Name:this.sea,
                    StartTime:this.startTime,
                    EndTime:this.endTime,
                    rows:10,
                    page:this.funContant[this.active].page,
                }
            }).then(r=>{
                let data=r.data
                if(data.state=="success"){
                    this.funContant[0].num=data.data.whole
                    this.funContant[1].num=data.data.Unaudited
                    this.funContant[2].num=data.data.Audit
                    this.funContant[3].num=data.data.Reject
                    for(let i=0;i<data.data.List.length;i++){
                        this.funContant[this.active].data.push(data.data.List[i])
                    }
                    if(data.data.List.length<10){
                        this.loading=false;
                        this.funContant[this.active].finished=true
                        return;
                    }
                    this.funContant[this.active].page++
                    this.loading=false
                }else{
                    this.notFN(data.message)
                    this.loading=false
                }
            })
        },
        // 获取时间
        getTime(time){
            this.funContant=[
                {
                    name:'全部',//标题
                    num:2,//总多少条数据
                    data:[],//数据
                    page:1,//页数
                    type:-1,//请求类型
                    finished:false,//是否加载完成
                },
                {
                    name:'待审批',
                    num:1,
                    data:[],//数据
                    page:1,//页数
                    type:0,//请求类型
                    finished:false,//是否加载完成
                },
                {
                    name:'已通过',
                    num:1,
                    data:[],//数据
                    page:1,//页数
                    type:1,//请求类型
                    finished:false,//是否加载完成
                },
                {
                    name:'被驳回',
                    num:1,
                    data:[],//数据
                    page:1,//页数
                    type:2,//请求类型
                    finished:false,//是否加载完成
                },
            ]
            this.startTime=time[0];
            this.endTime=time[1]
            this.getData();
            // console.log(time)
        },
        // 搜索
        seachFN(sea){
            this.funContant=[
                {
                    name:'全部',//标题
                    num:2,//总多少条数据
                    data:[],//数据
                    page:1,//页数
                    type:-1,//请求类型
                    finished:false,//是否加载完成
                },
                {
                    name:'待审批',
                    num:1,
                    data:[],//数据
                    page:1,//页数
                    type:0,//请求类型
                    finished:false,//是否加载完成
                },
                {
                    name:'已通过',
                    num:1,
                    data:[],//数据
                    page:1,//页数
                    type:1,//请求类型
                    finished:false,//是否加载完成
                },
                {
                    name:'被驳回',
                    num:1,
                    data:[],//数据
                    page:1,//页数
                    type:2,//请求类型
                    finished:false,//是否加载完成
                },
            ]
            this.sea=sea
            if(this.sea=='') this.sea=null
            this.getData();
        },
        //去
        toFN(to){
            this.$router.push({path:to})
        }
    },
    mounted(){
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuDeclaratList{
    height: 100%;
    display: flex;
    flex-direction: column;
    .mRB;
    overflow: hidden;
    position: relative;
    .nC;
    // 内容
    .stuContant{
        flex: 1;
        display: flex;
        flex-direction: column;
        .van-tabs{
            .van-hairline--top-bottom::after{
                border-width: 0;
            }
            padding-right: 1rem;
            padding-left: 1rem;
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
    }

    

    // 右边按钮
    .right_btn{
        position: absolute;
        right: 0;
        top: 35%;
        .van-button{
            z-index: 2;
            .fBMRB;
            color: white;
            border-radius: 3rem 0 0 3rem;
        }
    }
}
</style>