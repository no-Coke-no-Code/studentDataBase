/*
 * @Author: fujihang 
 * @Date: 2019-03-27 09:16:06 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-03 13:36:50
    指派人员
 */
<template>
<div id="fuGuidance">
    <!-- 搜索框 -->
    <div class="bW" style="padding-bottom:.2rem;">
        <seach @seachFN="seachFN" plr='请输入老师编号或者名称' btn="查询"></seach>
    </div>

    <!-- 老师列表 -->
    <div class="topName">
        老师列表（{{all}}）
    </div>
    <div class="teachList">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getData"
        >
            <div class="teacher" v-for="(item,index) in dataList" :key="index">
                <img :src="item.UserHeadIcon?item.UserHeadIcon:img">
                <div class="info">
                    <div class="name">{{item.UserName}} <span class="hao">{{item.UserNum}}（编号）</span>
                    </div>
                    <div class="phone_w">
                        <img class="icon" src="../../image/fuJiHang/phone.png">
                        手机：{{item.UserPhone?item.UserPhone:'无'}} <span class="wei">微信：{{item.UserWeChat?item.UserWeChat:'无'}}</span>
                    </div>
                </div>
                <van-button size="mini" @click="AssignFN(item.UserId)">指派</van-button>
            </div>
        </van-list>
        
    </div>
</div>
</template>

<script>
import seach from '../../components/fujihang/seach'
export default {
    components:{
        seach
    },
    data(){
        return {
            all:0,//总老师
            F_Id:this.$route.query.F_Id,//学生ID
            dataList:[],//数据列表
            loading:false,//加载状态
            finished:false,//是否完成
            page:1,//页数
            img:require('../../image/fuJiHang/people.png'),//默认头像
            sea:''
        };
    },

    methods: {
        // 获取老师列表
        getData(){
            if(this.finished) return
            this.loading=true
            this.getFN({
                url:"/StudentCourse/GetCRBuserList?pageSize=10&pageIndex="+this.page+"&nameOrNum="+this.sea
            }).then(r=>{
                if(r.data.state='success'){
                    this.all=r.data.data.records
                    let data=r.data.data.rows
                    for(let i=0;i<data.length;i++){
                        this.dataList.push(data[i])
                    }
                    if(data.length<10){
                        this.finished=true
                    }
                    this.loading=false
                    this.page++;
                }else{
                    this.loading=false
                    this.errFN('获取数据失败')
                }
            })
        },
        // 指派
        AssignFN(id){
            this.tipFN();
            this.postFN({
                url:'/StudentCourse/AssginForB?studentId='+this.F_Id+'&followUpUserId='+id
            }).then(r=>{
                this.tipHFN();
                if(r.data.state=="success"){
                    this.okFN("指派成功")
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1500)
                }else this.notFN(r.data.message)
            })
        },
        seachFN(sea){
            this.sea=sea
            this.finished=false
            this.page=1;
            this.dataList=[]
            this.getData();
            
        }
    },
    mounted(){
        // this.getData();
        console.log()
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuGuidance{
    height: 100%;
    .mRB;.nC;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    //老师列表
    .topName{
        padding: 1rem;
        .fBB;
        font-size: 1.2rem;
    }
    .teachList{
        flex: 1;
        overflow: auto;
    }
    .teacher{
        .bW;
        display: flex;
        align-items: center;
        .fBB;
        padding: 1rem;
        margin-bottom: 1rem;
        .van-button--mini
        {
            line-height: 22px;
        }
        >img{
            height: 3.5rem;
            width: 3.5rem;
            border-radius: 50%;
        }
        .info{
            flex: 1;
            margin: 0 .8rem;
            .name{
                font-size: 1.25rem;
                margin-bottom: .8rem;
                .hao{
                    .tC;
                    font-size: 1.1rem;
                    margin-left: .3rem;
                }
            }
            .phone_w{
                display: flex;
                align-items: center;
                font-size: 1.1rem;
                color: #999;
                .icon{
                    height: 1rem;
                }
                .wei{
                    margin-left: .8rem;
                }
            }
        }
        .van-button{
            .fBMRB;
            color: white;
        }
    }
}
</style>