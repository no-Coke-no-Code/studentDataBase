/*
 * @Author: fujihang 
 * @Date: 2019-03-28 18:11:21 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-11 20:33:48
    学员选取
 */
<template>
<div id="fuStudentChoose">
    <!-- 搜索框 -->
    <div class="seachSC">
        <div class="input">
            <input placeholder="请输入名字" v-model="seach">
            <!-- <div class="clea">
                <van-icon name="clear" />
            </div> -->
        </div>
        <div class="button_sea" @click="getData">
            <van-icon name="search" size="1.3rem" />确定
        </div>
    </div>

    <!-- 会员列表 -->
    <div class="topNavSC">
        会员列表（2）
    </div>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
    >
       <studentCard v-for="(item,index) in dataList" :key="index" :data="item"></studentCard>

    </van-list>


</div>
</template>

<script>
import studentCard from '../../components/fujihang/studentCard'
export default {
    components:{
        studentCard,
    },
    data(){
        return {
            loading:false,//加载状态
            finished:false,//加载完成
            page:1,//页数
            dataList:[],//数据
            seach:'',//搜索
            userInfo:JSON.parse(localStorage.getItem('userInfo')),
        };
    },

    methods: {
        // 获取列表数据
        getData(sea){
            if(sea){
                this.dataList=[]
                this.page=1
                this.finished=false
            }
            this.loading=true
            this.postFN({
                url:'/Student/ReturnVisitList',
                data:{
                    // UserID:'7AAFA442-F458-4935-A9DC-C5D8EE951D60',
                    UserID:this.userInfo.wxInfo.UserId,
                    Name:this.seach?this.seach:null,
                    rows:10,
                    page:this.page
                },
            }).then(r=>{
                console.log(r)
                if(r.data.state=="success"){
                    let data=r.data.data
                    for(let i=0;i<data.length;i++){
                        this.dataList.push(data[i])
                    }
                    if(data.length<10){
                        this.finished=true
                        this.loading=false
                        return;
                    }
                    this.page++
                    this.loading=false
                }else {
                    this.loading=false
                    this.notFN('获取学员列表失败！')
                }
            })
        },
        // 搜索
        seachFN(){
            
        },
    },
    mounted(){
        this.getData()
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuStudentChoose{
    height: 100%;
    display: flex;
    .mRB;
    flex-direction: column;
    overflow: hidden;
    // 搜索
    .seachSC{
        .bW;
        display: flex;
        align-items: center;
        padding: .5rem 2rem;
        width: 100%;
        .fBB;
        
        .input{
            border-radius: 2rem 0 0 2rem;
            background: #f7f7f7;
            flex: 1;
            position: relative;
            >input{
                padding: 0 1rem;
                .fBB;
                font-size: 1.1rem;
                height: 2.8rem;
                width: 100%;
            }
            // .clea{
            //     right: .5rem;
            //     opacity: .5;
            //     top: .7rem;
            //     position: absolute;
            // }
        }
        .button_sea{
            border-radius:0 2rem  2rem 0 ;
            height: 2.8rem;
            .tB;
            display: flex;
            align-items: center;
            width: 5rem;
            font-size: 1.2rem;
            color: white;
            .van-icon{
                margin: 0 .3rem;
            }
        }
    }
    .topNavSC{
        padding:.8rem 1rem;
        .fBB;
        color: #999;
        font-size: 1.15rem;
    }
    // 内容
    .van-list{
        flex: 1;
        overflow: auto;
    }
}
</style>