/*
 * @Author: fujihang 
 * @Date: 2019-03-25 10:22:49 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-01 19:04:40
    学员管理修改
 */
<template>
<div id='fuStudentManageCT'>
    <!-- 内容 -->
    <div class="stuContant">

        <!-- 我的学员 公有池 -->
        <div class="myStu_gon">
            <span :class="['stu_gon',topChoose==index?'choose':'']" v-for="(item,index) in topList" :key="index" @click="chooseFN(index)">
                {{item.name}}
            </span>
        </div>

        <!-- 搜索框 -->
        <div class="bW" >
            <seach plr="请输入姓名或者手机号" @seachFN="seachFN"></seach>
        </div>

        <!-- 我的学员 -->
        <van-tabs v-show="!topChoose" v-model="active"  swipeable color="#27BCD5" title-active-color="#27BCD5" title-inactive-color='#999999' background="#f7f7f7" @change="getData(true)">
            <van-tab v-for="(item,index) in funContant" :title="item.name+'('+item.num+')'" :key="index">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getData"
                >
                    <stuManage @releaseMore='releaseMore' @release="release" :data="item" v-for="(item,index) in funContant[active].data" :key="index" ></stuManage>
                </van-list>
            </van-tab>
        </van-tabs>


        <!-- 公有池 -->
        <div class="title" v-show="topChoose">会员列表（3）
        </div>

        <div v-show="topChoose" class="publicPoolCpnatnt">
            <van-list
                v-model="loading"
                :finished="finishedPool"
                finished-text="没有更多了"
                @load="getDataPool"
            >
                <publicPool @ClaimMore="ClaimMore" @Claim="ClaimFN" :data="item"   v-for="(item,index) in dataPool" :key="index"></publicPool>
            </van-list>
        </div>
        
    </div>
    <!-- 底部按钮 -->
    <div class="btnBot">
        <van-checkbox v-show="!topChoose" @click="allCheck(false)" checked-color="#27BCD5" v-model="all[active]">共选{{isCheckData.num}}名学员</van-checkbox>
        <van-checkbox v-show="topChoose" @click="allCheck(true)" checked-color="#27BCD5" v-model="allT">共选{{isCheckData.num}}名学员</van-checkbox>
        <van-button @click="ClaimOrRid" class="botton">{{topChoose?'立即认领':'一键释放'}}</van-button>
    </div>
</div>
</template>

<script>
import seach from '../../components/fujihang/seach';
import stuManage from '../../components/fujihang/stuManage';
import publicPool from '../../components/fujihang/publicPool';
export default {
    components:{
        seach,stuManage,publicPool
    },
    data(){
        return {
            topList:[
                {
                    name:'我的学员'
                },
                {
                    name:'公有池'
                },
            ],
            // 导航条
            topChoose:0,//选择的导航
            funContant:[
                {
                    name:'全部',
                    num:2,//总个数
                    page:1,//页数
                    finished:false,//是否加载完成
                    data:[],//数据
                    type:0,//列表标识
                },
                {
                    name:'锁定',
                    num:2,//总个数
                    page:1,//页数
                    finished:false,//是否加载完成
                    data:[],//数据
                    type:1,//列表标识
                },
                {
                    name:'跟进',
                    num:2,//总个数
                    page:1,//页数
                    finished:false,//是否加载完成
                    data:[],//数据
                    type:2,//列表标识
                },
            ],
            //管理内容导航条
            active:0,//当前内容在哪
            all:[
                false,false,false
            ],//全选或者不全选(学员)
            allT:false,//全选或者不全选（公有池）
            dataList:[],//数据列表
            loading:false,//加载状态
            finished:false,//学员管理是否完成
            finishedPool:false,//公有池是否完成
            page:1,//公有池页数
            dataPool:[],//公有池列表
            isCheckData:{
                data:[],
                num:0//选择的学生数量
            },//选中统计
        };
    },

    methods: {
        // 选择导航调
        chooseFN(index){
            this.topChoose=index
            if(index==0) this.releaseMore()
            else this.ClaimMore();
        },
        // 获取我的学员数据
        getData(isChange){
            this.releaseMore();
            this.finished=false
            if(this.funContant[this.active].finished) return this.finished=true
            this.loading=true
            this.getFN({
                url:"/StudentCourse/GetMyUserList?pageSize=10&pageIndex="+this.funContant[this.active].page+"&typeId="+this.funContant[this.active].type
            }).then(r=>{
                if(r.data.state='success'){
                    let data=r.data.data
                    this.funContant[0].num=data.LuckCount+data.FollowUpCount
                    this.funContant[1].num=data.LuckCount
                    this.funContant[2].num=data.FollowUpCount
                    if(data.rows.length<10){
                        this.finished=true
                        this.funContant[this.active].finished=true
                    }
                    for(let i=0;i<data.rows.length;i++){
                        data.rows[i].isCheck=false//给按钮值
                        this.funContant[this.active].data.push(data.rows[i])
                    }
                    this.all[this.active]=false
                    this.funContant[this.active].page++
                    this.loading=false
                }else{
                    this.loading=false
                    this.errFN('获取数据失败')
                }
            })
        },
        // 获取公有池
        getDataPool(){
            this.loading=true
            this.getFN({
                url:"/StudentCourse/GetMyUserList?pageSize=10&pageIndex="+this.page+"&typeId="+3
            }).then(r=>{
                if(r.data.state='success'){
                    let data=r.data.data
                    if(data.rows.length<10) this.finishedPool=true
                    for(let i=0;i<data.rows.length;i++){
                        data.rows[i].isCheck=false
                        this.dataPool.push(data.rows[i])
                    }
                    this.allT=false
                    this.page++
                    this.loading=false
                }else{
                    this.loading=false
                    this.errFN('获取数据失败')
                }
            })
        },
        // 点击释放
        release(data){
            let post=[]
            post.push(data.F_Id)
            this.tipFN()
            this.postFN({
                url:'/StudentCourse/FreedForAB?studentExIds='+post,
            }).then(r=>{
                this.tipHFN()
                if(r.data.state=='success'){
                    for(let i=0;i<this.funContant.length;i++){
                        this.funContant[i].data=this.funContant[i].data.filter(item=>{
                            return item.F_Id!=data.F_Id
                        })
                    }
                    this.funContant[0].num-=1
                    this.funContant[1].num-=1
                    this.releaseMore();
                    this.okFN(r.data.message)
                }else this.notFN(r.data.message)
            })
        },
        //选择的释放卡片计算
        releaseMore(){
            let data=this.funContant[this.active].data
            console.log(this.active)
            this.isCheckData={
                num:0,
                data:[]
            }
            for(let i=0;i<data.length;i++){
                if(data[i].isCheck){
                    this.isCheckData.num++;
                    this.isCheckData.data.push(data[i].F_Id)
                }
            }
        },
        //一键认领或释放
        ClaimOrRid(){
            if(this.topChoose){
                this.tipFN()
                this.postFN({
                    url:'/StudentCourse/ClaimForB?studentExIds='+this.isCheckData.data,
                }).then(r=>{
                    this.tipHFN()
                    if(r.data.state=='success'){
                        let check=this.isCheckData.data
                        for(let j=0;j<check.length;j++){
                            this.dataPool=this.dataPool.filter(item=>{
                                return item.F_Id!=check[j]
                            })
                        }
                        this.okFN('一键认领成功')
                    }else this.notFN(r.data.message)
                })
            }else{
                this.tipFN()
                this.postFN({
                    url:'/StudentCourse/FreedForAB?studentExIds='+this.isCheckData.data,
                }).then(r=>{
                    this.tipHFN()
                    if(r.data.state=='success'){
                        let check=this.isCheckData.data
                        for(let i=0;i<this.funContant.length;i++){
                            for(let j=0;j<check.length;j++){
                                this.funContant[i].data=this.funContant[i].data.filter(item=>{
                                    return item.F_Id!=check[j]
                                })
                            }
                        }
                        this.funContant[0].num-=this.isCheckData.data.length
                        this.funContant[1].num-=this.isCheckData.data.length
                        this.okFN("一键释放成功")
                    }else this.notFN(r.data.message)
                })
            }
        },
        // 认领
        ClaimFN(id){
            let post=[]
            post.push(id)
            this.tipFN()
            this.postFN({
                    url:'/StudentCourse/ClaimForB?studentExIds='+post,
                }).then(r=>{
                    this.tipHFN()
                    if(r.data.state=='success'){
                        this.dataPool=this.dataPool.filter(item=>{
                            return item.F_Id!=id
                        })
                        this.okFN('认领成功')
                    }else this.notFN(r.data.message)
                })
        },
        //选择认领
        ClaimMore(){
            this.isCheckData={
                num:0,
                data:[]
            }
            for(let i=0;i<this.dataPool.length;i++){
                if(this.dataPool[i].isCheck){
                    this.isCheckData.num++;
                    this.isCheckData.data.push(this.dataPool[i].F_Id)
                }
            }
        },
        // 选择所有
        allCheck(choose){
            console.log("asdasjkld")
            this.isCheckData={
                num:0,
                data:[]
            }
            if(choose){
                // 认领
                if(this.allT){
                    for(let i=0;i<this.dataPool.length;i++){
                        this.dataPool[i].isCheck=true
                        this.isCheckData.data.push(this.dataPool[i].F_Id)
                    }
                    this.isCheckData.num=this.dataPool.length
                }else{
                    for(let i=0;i<this.dataPool.length;i++){
                        this.dataPool[i].isCheck=false
                    }
                    this.isCheckData={
                        num:0,
                        data:[]
                    }
                }
            }else{
                // 释放
                if(this.all[this.active]){
                    for(let i=0;i<this.funContant[this.active].data.length;i++){
                        this.funContant[this.active].data[i].isCheck=true
                        this.isCheckData.data.push(this.funContant[this.active].data[i].F_Id)
                    }
                    this.isCheckData.num=this.funContant[this.active].data.length
                }else{
                    for(let i=0;i<this.funContant[this.active].data.length;i++){
                        this.funContant[this.active].data[i].isCheck=false
                    }
                    this.isCheckData={
                        num:0,
                        data:[]
                    }
                }
            }
        },
        //搜索
        seachFN(sea){
            // if(sea.toString().trim()!=''){
            //     this.
            // }else this.notFN('请输入要搜索的内容')
        }
    },
    mounted(){
        this.getDataPool();
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuStudentManageCT{
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .mRB;
    .nC;
    // 内容
    .stuContant{
        flex: 1;
        display: flex;
        flex-direction: column;
        // 导航条
        .myStu_gon{
            padding: 1rem 3rem ;
            .fBB;.bBS;
            .bW;
            display: flex;
            .stu_gon{
                text-align: center;
                flex: 1;
                padding: .5rem 0;
                .fBB;
                font-size: 1.2rem;
                color: #27BCD5;
                border:1px solid #27BCD5;
            }
            .choose{
                .fBMRB;
                color: white;
            }
        }

        // 我的学员
        .van-tabs{
            .fBB;
            flex: 1;
            overflow: hidden;
            .van-ellipsis{
                // background: #27BCD5;
            }
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

        // 标题
        .title{
            .fBB;
            padding: 1rem;
            font-size: 1.2rem;
            color: #999;
            
        }
        // 公有池
        .publicPoolCpnatnt{
            flex: 1;
            overflow: auto;
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