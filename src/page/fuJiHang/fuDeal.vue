/*
 * @Author: fujihang 
 * @Date: 2019-03-28 18:11:21 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-11 20:38:39
    成交（客服）
 */
<template>
<div id="fuDeal">
    <!-- 搜索框 -->
    <div class="seachSC">
        <div class="input">
            <input placeholder="请输入名字" v-model="seach">
            <!-- <div class="clea">
                <van-icon name="clear" />
            </div> -->
        </div>
        <div class="button_sea" @click="getData(true)">
            <van-icon name="search" size="1.3rem" />确定
        </div>
    </div>

    <!-- 会员列表 -->
    <div class="topNavSC">
        清单列表（2）
        <span class="time">
            <span @click="chooseTime(index)" :class="['day',cos==index?'cos':'']" v-for="(item,index) in seaTime" :key="index"><img src="../../image/fuJiHang/time.png" v-show="index==3">{{item}}
            </span>
        </span>
    </div>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
    >
       <dealCard v-for="(item,index) in dataList" :key="index" :data="item"></dealCard>
    </van-list>
        
    <van-popup v-model="showTime.show" position="bottom" :close-on-click-overlay='false'>
        <van-datetime-picker
            v-model="currentDate"
            type="date" 
            @confirm="okTime"
        />
    </van-popup>
</div>
</template>

<script>
import dealCard from '../../components/fujihang/dealCard'
export default {
    components:{
        dealCard
    },
    data(){
        return {
            userInfo:JSON.parse(localStorage.getItem("userInfo")),
              // userInfo:{
              //   wxInfo:{}
              // }
            loading:false,//加载状态
            finished:false,//加载完成
            showTime:{
                show:false,
                num:0,
            },//显示时间
            currentDate: new Date(),//时间选择器
            startTime:new Date(new Date().setHours(0,0,0,0)),
            endTime:new Date(),
            page:1,//页数
            dataList:[],//数据
            seach:'',//搜索
            cos:0,
            seaTime:['今日','昨日','近7日'],//搜索时间
        };
    },

    methods: {
        // 选择时间
        chooseTime(index){
            this.cos=index
            switch(index){
                case 0:
                    this.startTime=new Date(new Date().setHours(0,0,0,0))
                    this.endTime=new Date()
                    this.getData(true)
                break;
                case 1:
                    let time=new Date().setHours(0,0,0,0)-86400*1000
                    this.startTime=new Date(time)
                    this.endTime=new Date(new Date().setHours(0,0,0,0))
                    this.getData(true)
                break;
                case 2:
                    let timeL=new Date().setHours(0,0,0,0)-86400*7000
                    this.startTime=new Date(timeL)
                    this.endTime=new Date()
                    this.getData(true)
                break;
                case 3:
                    this.notFN("请选择开始时间",1200)
                    setTimeout(()=>{
                        this.showTime.show=true
                    },1200)
                break;
            }

        },
        // 确定选择时间
        okTime(){
            this.showTime.num++
            if(this.showTime.num==2){
                this.endTime=this.currentDate
                this.getData(true)
                this.showTime.show=false
                this.seaTime[3]=this.timestampToTime(this.currentDate)
                this.showTime.num=0
                return;
            }
            this.startTime=this.currentDate
            this.notFN('请选择结束时间',1000)
        },
        // 获取列表数据
        getData(sea){
            if(sea){
                this.dataList=[]
                this.page=1
                this.finished=false
            }
            this.loading=true
            this.postFN({
                url:'/Student/GetOrderList',
                data:{
                    // UserID:'7AAFA442-F458-4935-A9DC-C5D8EE951D60',
                    UserID:this.userInfo.wxInfo.UserId,
                    Name:this.seach?this.seach:null,
                    rows:10,
                    page:this.page,
                    StartTime:this.startTime,
                    EndTime:this.endTime,
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
                    this.notFN('获取成交列表失败！')
                }
            })
        },
        // 搜索
        seachFN(){
            
        },
    },
    mounted(){
        let time=this.timestampToTime(new Date())
        this.seaTime.push(time)
        this.getData()
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuDeal{
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
                font-size: 1.12rem;
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
            justify-content: center;
            width: 5.5rem;
            font-size: 1.2rem;
            color: white;
            .van-icon{
                margin-right: 0.2rem;
            }
        }
    }
    .topNavSC{
        padding:.8rem 1rem;
        .fBB;
        color: #999;
        display: flex;
        align-items: center;
        font-size: 1.15rem;
        img{
            height: 1.2rem;
            width: 1.2rem;
            margin-right: .3rem;
        }
        .day{
            margin: 0 .4rem;
            display: flex;
            align-items: center;
        }
        .time{
            flex: 1;
            display:flex;
            flex-wrap: wrap;
            text-align: right;
            justify-content: flex-end;
            >:last-child{
                margin-right: 0;
            }
        }
        .cos{
            color: #27BCD5;
        }
    }
    // 内容
    .van-list{
        flex: 1;
        overflow: auto;
    }
    .van-picker__cancel{
        opacity: 0;
    }
}
</style>