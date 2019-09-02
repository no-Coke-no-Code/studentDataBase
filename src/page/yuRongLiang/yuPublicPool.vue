<template>
<div id='yuPublicPool'>
    <!-- 内容 -->
    <div class="stuContant">

        <!-- 我的学员 公有池 -->
        <div class="myStu_gon" v-show="userInfo.RoleName=='B组客服'">
            <span :class="['stu_gon',topChoose==index?'choose':'']" v-for="(item,index) in topList" :key="index" @click="chooseFN(index)">
                {{item.name}}
            </span>
        </div>

        <!-- 搜索框 -->
        <div class="bW" >
            <seach plr="请输入姓名或者手机号或者微信号" @seachFN="seachFN"></seach>
        </div>



        <!-- 公有池 -->
        <van-list
            v-show="topChoose"
            v-model="loading"
            :finished="finishedPool"
            finished-text="没有更多了"
            @load="getDataPool"
        >
            <publicPool @ClaimMore="ClaimMore" @Claim="ClaimFN" :data="item"   v-for="(item,index) in dataPool" :key="index"></publicPool>
        </van-list>
        
    </div>
    <!-- 底部按钮 -->
    <div class="btnBot">
        <div class="btnDefalut" v-show="!topChoose">
            <van-checkbox   checked-color="#27BCD5" v-model="all">共选{{isCheckData.num}}名学员</van-checkbox>
           <div class="abs" @click="allCheck(false)"></div>
        </div>
        <div class="btnDefalut" v-show="topChoose">
            <van-checkbox   checked-color="#27BCD5" v-model="allT">共选{{isCheckData.num}}名学员</van-checkbox> 
            <div class="abs" @click="allCheck(true)"></div>
        </div>
         
        
        <van-button @click="ClaimOrRid" class="botton">一键认领</van-button>
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
            userInfo:JSON.parse(localStorage.getItem("userInfo")),//用户信息
            // userInfo:{
            //     wxInfo:{}
            // },
            topList:[
                {
                    name:"我的学员"
                },
                {
                    name:'公有池'
                },
            ],
            // 导航条
            topChoose:1,//选择的导航
            funContant:{
                page:1,//页数
                data:[],//数据
                sea:'',//搜索
            },
            //管理内容
            active:0,//当前内容在哪
            all:false,//全选或者不全选(学员)
            allT:false,//全选或者不全选（公有池）
            dataList:[],//数据列表
            loading:false,//加载状态
            finished:false,//学员管理是否完成
            finishedPool:false,//公有池是否完成
            page:1,//公有池页数
            dataPool:[],//公有池列表
            sea:'',//公有池搜索
            isCheckData:{
                data:[],
                num:0//选择的学生数量
            },//选中统计
            datalength:0,//会员列表
        };
    },

    methods: {
        // 选择导航调
        chooseFN(index){
            this.topChoose=index
            if(index==0) {
                this.funContant.page=1;
                this.funContant.data=[]
                this.finished=false;
                this.getData();
            }
            else{
                this.page=1
                this.dataPool=[]
                this.finishedPool=false
                this.getDataPool();
            }
        },
        // 获取我的学员数据
        getData(){
            this.releaseMore();
            if(this.finished) return
            this.loading=true
            this.getFN({
                url:"/StudentCourse/GetMyUserList?pageSize=10&pageIndex="+this.funContant.page+"&typeId=0&nameOrPhone="+this.funContant.sea
            }).then(r=>{
                console.log(r,'我的学员');
                if(r.data.state='success'){
                    let data=r.data.data
                    if(data.rows==null) {
                        this.loading=false
                        this.finished=true
                        return
                    } 
                    if(data.rows.length<10){
                        this.finished=true
                    }
                    for(let i=0;i<data.rows.length;i++){
                        data.rows[i].isCheck=false//给按钮值
                        this.funContant.data.push(data.rows[i])
                    }
                    this.funContant.page++
                    this.loading=false
                    this.all=false
                    this.releaseMore();
                }else{
                    this.finished=true
                    this.loading=false
                    this.errFN('获取数据失败')
                }
            })
        },
        // 获取公有池
        getDataPool(){
            if(this.finishedPool) return
            this.loading=true
            this.getFN({
                url:"/StudentCourse/GetMyUserList?pageSize=10&pageIndex="+this.page+"&typeId=3&&nameOrPhone="+this.sea
            }).then(r=>{
                if(r.data.state='success'){
                    let data=r.data.data
                    if(data.rows==null) {
                        this.loading=false
                        this.finishedPool=true
                        return
                    } 
                    if(data.rows.length<10) this.finishedPool=true
                    for(let i=0;i<data.rows.length;i++){
                        data.rows[i].isCheck=false
                        this.dataPool.push(data.rows[i])
                    }
                    this.allT=false
                    this.page++
                    this.loading=false
                    this.datalength=data.records
                    this.ClaimMore()
                }else{
                    this.finishedPool=true
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
                    this.funContant.data=[]
                    this.funContant.page=1
                    this.getData();
                    this.isCheckData.num-=1
                    this.okFN(r.data.message)
                }else this.notFN(r.data.message)
            })
        },
        //选择的释放卡片计算
        releaseMore(){
            let data=this.funContant.data
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
            if(this.isCheckData.num<data.length) this.all=false
            else this.all=true
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
                        this.page=1;
                        this.dataPool=[]
                        this.getDataPool();
                        // if(this.isCheckData.num==10) this.page-=1
                        // this.getDataPool()
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
                        this.funContant.data=[]
                        this.funContant.page=1
                        this.getData()
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
                        this.page=1;
                        this.dataPool=[]
                        this.finishedPool = false;
                        this.getDataPool();
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
            if(this.isCheckData.num<this.dataPool.length) this.allT=false
            else this.allT=true
        },
        // 选择所有
        allCheck(choose){
            console.log("asdsdmsalk")
            this.isCheckData={
                num:0,
                data:[]
            }
            if(choose){
                // 认领
                this.allT=!this.allT
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
                this.all=!this.all
                if(this.all){
                    for(let i=0;i<this.funContant.data.length;i++){
                        this.funContant.data[i].isCheck=true
                        this.isCheckData.data.push(this.funContant.data[i].F_Id)
                    }
                    this.isCheckData.num=this.funContant.data.length
                }else{
                    for(let i=0;i<this.funContant.data.length;i++){
                        this.funContant.data[i].isCheck=false
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
            if(this.topChoose){
                if(sea.toString().trim()!=''){
                    this.sea=sea
                }else{
                    this.sea=''
                }
                this.dataPool=[]
                this.page=1
                this.finishedPool=false
                this.getDataPool()
            }else{
                if(sea.toString().trim()!=''){
                    this.funContant={
                        page:1,//页数
                        data:[],//数据
                        sea:sea,
                    }
                }else{
                    this.funContant={
                        page:1,//页数
                        data:[],//数据
                        sea:'',
                    }
                }
                this.finished=false
                this.getData();
            }
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
#yuPublicPool{
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .mRB;
    .nC;
    // 内容
    .stuContant{
        overflow: hidden;
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
        .van-list{
            flex: 1;
            overflow: auto;
            padding-top: 1rem;
            .fBB;
           
        }

        // 标题
        .title{
            .fBB;
            padding: 1rem;
            font-size: 1.2rem;
            color: #999;
            
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
            
        }
        .botton{
            border: none;
            width: 40%;
            .fBMRB;
            color: white;
        }
        .btnDefalut{
            flex: 1;
            position: relative;
            height: 44px;
            display: flex;
            align-items: center;
            .abs{
                position: absolute;
                background: white;
                top: 0;left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
        }
    }
}
</style>