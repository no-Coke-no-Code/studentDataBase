/*
 * @Author: fujihang 
 * @Date: 2019-04-02 20:26:14 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-11 16:24:52
    历史记录
 */
<template>
<div id="fuHistoryRecord">
    <!-- 头部 -->
    <div class="topNameHR">
        <span class="nameHR">回访记录</span>
        <div class="valHR">
            <span @click="chooseTime(0)" :class="['name',cos==0?'cos':'']">今日</span>
            <span @click="chooseTime(1)" :class="['name',cos==1?'cos':'']">昨日</span>
            <span @click="chooseTime(2)" :class="['time',cos==2?'cos':'']"><img src="../../image/fuJiHang/time.png">{{showTime.time}}
            </span>
        </div>
    </div>

    <!-- 内容 -->
    
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
    >


        <div class="HRchild" v-for="(item,index) in dataList" :key="index" @click="toFN(item.Id)">
            <img :src="item.HeadIcon">
            <div class="right_con">
                <div class="name">{{item.Name}}</div>
                <div class="con_det">
                    <img src="../../image/fuJiHang/teach.png">
                    <span class="left">所属分校：{{item.SchoolName}}</span>课程：{{item.CourseName}}
                </div>
                <div class="con_det">
                    <img src="../../image/fuJiHang/time.svg">
                    <span class="left">回访时间：{{item.F_CreatorTime}}</span>
                </div>
            </div>
            <van-icon name="arrow" color="#999" size="1.2rem"/>
        </div>


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
export default {
    data(){
        return {
            id:this.$route.query.id,//
            showTime:{
                show:false,
                num:0,
                time:this.timestampToTime(new Date()),
            },//显示时间
            currentDate: new Date(),//时间选择器
            startTime:new Date(new Date().setHours(0,0,0,0)),
            endTime:new Date(),
            cos:0,//选择的时间
            loading:false,//加载状态
            finished:false,//加载完成
            page:1,//页数
            dataList:[],//数据
        };
    },

    methods: {
        // 选择时间查询
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
                this.showTime.time=this.timestampToTime(this.currentDate)
                this.showTime.num=0
                return;
            }
            this.startTime=this.currentDate
            this.notFN('请选择结束时间',1000)
        },
        // 获取数据
         getData(aaa){
            if(aaa){
                this.finished=false//加载完成
                this.page=1//页数
                this.dataList=[]//数据
             }
            this.loading=true
            this.postFN({
                url:'/Student/GetReturnVisitRecord',
                data:{
                    OrderId:this.id,
                    rows:10,
                    page:this.page,
                    StartTime:this.startTime,
                    EndTime:this.endTime,
                },
            }).then(r=>{
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
                    this.notFN('获取历史记录失败！')
                }
            })
        },
        // 查看历史回访
        toFN(id){
            this.$router.push({path:'/fuReturnVisitDet?id='+id})
        },
    },
    mounted(){
        this.getData();
        console.log(new Date())
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuHistoryRecord{
    height: 100%;
    display: flex;
    .mRB;.nC;
    flex-direction: column;
    overflow: hidden;
    // 头部
    .topNameHR{
        display: flex;
        padding: .5rem 1rem;
        align-items: center;
        .fBB;
        color: #999;
        .nameHR{
            flex: 1;
            font-size: 1.25rem;
        }
        .valHR{
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            .name{
                margin: 0 .3rem;
                padding: .3rem;
            }
            .cos{
                color: #27BCD5;
            }
            .time{
                padding: .3rem;
                display: flex;
                align-items: center;
                >img{
                    height: 1.15rem;
                    width: 1.1rem;
                    margin-right: .3rem;
                }
            }
        }
    }
    // 内容
    .van-list{
        flex: 1;
        overflow: auto;
        .HRchild{
            .bW;.mB;
            display: flex;
            align-items: center;
            padding:.6rem 1rem;
            .fBB;
            >img{
                border-radius: 50%;
                object-fit: cover;
                height: 4rem;
                width: 4rem
            }
            .right_con{
                flex: 1;
                margin: 0 .6rem;
                .name{
                    font-size: 1.2rem;
                    font-weight: 650;
                    margin-bottom: .5rem;
                }
                .con_det{
                    font-size: 1.1rem;
                    color: #999;
                    margin: .15rem 0;
                    display: flex;
                    align-items: center;
                    >img{
                        margin-right: .3rem;
                        height: 1rem;
                        width: 1rem;
                        object-fit: cover;
                        
                    }
                    .left{
                        margin-right: .8rem;
                    }
                }
            }
        }
    }
    .van-picker__cancel{
        opacity: 0;
    }

}
</style>