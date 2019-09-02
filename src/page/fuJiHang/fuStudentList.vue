/*
 * @Author: fujihang 
 * @Date: 2019-04-04 14:31:36 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-05-09 16:29:02
    ab管理员学员
 */
<template>
<div id="fuStudentList">

    <!-- 释放 -->
    <div class="release" v-if="userIofn.RoleName=='B组客服管理员'">
        <span class="left">释放峰值量 <input placeholder="请输入释放峰值" v-model="apex"></span>
        <van-button size="small" @click="cancalFN">确定</van-button>
    </div>

    <!-- 搜索 -->
    <div class="bW">
        <seach plr="请输入姓名或者手机号或者微信号" @seachFN="seachFN"></seach>
    </div>

    <!-- 内容 -->
    <van-tabs  class="contantSL" v-model="active"  swipeable color="#27BCD5" title-active-color="#27BCD5" title-inactive-color='#999999' @change="getData">
        <van-tab v-for="(item,index) in funContant" :title="item.name" :key="index">
            
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getData"
        >
            <div v-show="active==0">
                <studentListCard :data="item" v-for="(item,index) in funContant[0].data" :key="index"></studentListCard>
            </div>
            <div v-show="active==1">
                <studentListCard :data="item" v-for="(item,index) in funContant[1].data" :key="index"></studentListCard>
            </div>
            <div v-show="active==2">
                <studentListCard :data="item" v-for="(item,index) in funContant[2].data" :key="index"></studentListCard>
            </div>
            
            
        </van-list>
        
        </van-tab>
    </van-tabs>
</div>
</template>

<script>
import studentListCard from '../../components/fujihang/studentListCard'
import seach from '../../components/fujihang/seach'
export default {
    components:{
        seach,studentListCard
    },
    data(){
        return {
            apex:0,//峰值
            active:0,//导航条
            loading:false,//加载状态
            finished:false,//是否加载完成
            funContant:[
                {
                    name:'全部',//名字
                    page:1,//页数
                    data:[],//列表内容
                    finished:false,//是否加载完成
                    type:0,//全部
                },
                {
                    name:'锁定',//名字
                    page:1,//页数
                    data:[],//列表内容
                    finished:false,//是否加载完成
                    type:1,//锁定
                },
                {
                    name:'跟进',//名字
                    page:1,//页数
                    data:[],//列表内容
                    finished:false,//是否加载完成
                    type:2,//跟进
                },
            ],//数据
            seach:'',//搜索字段
            userIofn:JSON.parse(localStorage.getItem('userInfo'))
        };
    },

    methods: {
        // 搜索
        seachFN(data){
            this.seach=data
            for(let i=0;i<this.funContant.length;i++){
                this.funContant[i].finished=false
                this.funContant[i].data=[]
                this.funContant[i].page=1
            }
            this.getData()
        },
        // 获取数据
        getData(sea){
            this.finished=false
            if(this.funContant[this.active].finished) return this.finished=true
            this.loading=true
            this.getFN({
                url:'/StudentCourse/GetMyUserList?pageSize=10&pageIndex='+this.funContant[this.active].page+'&typeId='+this.funContant[this.active].type+"&nameOrPhone="+this.seach,
            }).then(r=>{
                if(r.data.state=="success"){
                    let data=r.data.data.rows
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
                }else {
                    this.funContant[this.active].finished=true
                    this.loading=false
                    this.notFN('获取学员列表失败！')
                }
            })
        },
        // 释放峰值
        cancalFN(){
            this.tipFN()
            this.getFN({
                url:'/StudentCourse/SetPeakCount?peakCount='+this.apex
            }).then(r=>{
                this.tipHFN()
                if(r.data.state=="success") this.okFN("设置成功！")
                else this.notFN('设置失败，请刷新页面重试！')
        
            })
        }
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuStudentList{
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .nC;.bW;
    // 释放
    .release{
        .fBB;
        display: flex;
        padding:.8rem 1rem .5rem;
        align-items: center;
        font-size: 1.1rem;
        .left{
            flex: 1;
            >input{
                padding:0 1rem;
                .fBB;
                width: 40%;
                margin-left: .3rem;
                background: #F8F8F8;
                height: 2rem;
            }
        }
        
        .van-button{
            background: white;
            border: none;
            color: #27BCD5;
            font-size: 1.15rem;
        }
    }
    
    // 内容
    .contantSL{
        flex: 1;
        .mRB;
        overflow: hidden;
        .van-tabs__nav{
            background: none;
        }
        .van-tabs__content{
            height: 100%;
            overflow: hidden;
            .van-tab__pane{
                height: 100%;
                .fBB;
                overflow: hidden;
                .van-list{
                    overflow: auto;
                    height: 100%;
                }
            }
        }
    }
}
</style>