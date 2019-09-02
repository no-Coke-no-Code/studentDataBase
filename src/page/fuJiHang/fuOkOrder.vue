/*
 * @Author: fujihang 
 * @Date: 2019-03-25 14:24:02 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-27 17:18:27
    成交订单
 */
<template>
<div id="fuOkOrder">
    <!-- 搜索 ，时间 -->
    <div class="seachTime">
        <div class="seach">
            <input placeholder="请输入学员/课程名称">
            <div class="btn">
                <van-icon name="search" />确定
            </div>
        </div>
        
        <div class="time" @click="showTime=true">
            <img src="../../image/fuJiHang/time.png">
            <div class="val">
                2019/12/04
            </div>
        </div>
    </div>

    <!-- 内容 -->
    <van-tabs v-model="active"  swipeable color="#27BCD5" title-active-color="#27BCD5" title-inactive-color='#999999'>
        <van-tab v-for="(item,index) in funContant" :title="item.name+'('+item.num+')'" :key="index">
            
            <!-- <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getData"
            > -->
                <div class="bW">
                    <okOrderC :data="item" v-for="(item,index) in funContant[active].Data" :key="index"></okOrderC>
                </div>  
            <!-- </van-list> -->
            
        </van-tab>
    </van-tabs>

    <!-- 申请审批 -->
    <div class="post">
        <van-button>
            申请审批
        </van-button>
    </div>


    <!-- 日期弹窗 -->
    <van-popup v-model="showTime" position="bottom" >
        <van-datetime-picker
            @cancel="showTime=false"
            @confirm="chooseTime"
            v-model="currentDate"
            type="date"
        />
    </van-popup>
</div>
</template>

<script>
import okOrderC from '../../components/fujihang/okOrderC'
export default {
    components:{
        okOrderC
    },
    data(){
        return {
            funContant:[
                {
                    name:'全部',
                    num:2,
                    page:1,
                    finished:false,
                    Data:[],
                },
                {
                    name:'待审批',
                    num:1,
                    page:1,
                    finished:false,
                    Data:[],
                },
                {
                    name:'已通过',
                    num:1,
                    page:1,
                    finished:false,
                    Data:[],
                },
                {
                    name:'被驳回',
                    num:1,
                    page:1,
                    finished:false,
                    Data:[],
                },
            ],//管理内容导航条
            active:0,//当前内容在哪
            showTime:false,//时间展示
            currentDate: new Date(),//选择的时间
            loading:false,//加载状态
            finished:false,//加载已经完成
        };
    },

    methods: {
        // 选择的时间
        chooseTime(){
            this.showTime=false
            console.log(this.currentDate)
        },
        // 获取数据
        getData(){
            this.postFN({
                url:'/Student/GetExamineInfo',
                data:{
                    UserID:'6E8C6663-1101-4255-B8C5-3B339A7A82B9',
                    State:-1,
                    Name:null,
                    CourseName:null,
                }
            }).then(r=>{
                if(r.data.state=="success"){
                    this.funContant[0].Data=r.data.data
                }else this.notFN(r.data.message)
                
                console.log(r)
            })
        }
    },
    mounted(){
        this.getData();
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuOkOrder{
    height: 100%;
    .mRB;
    display: flex;
    flex-direction: column;
    // 搜索时间
    .seachTime{
        .bW;
        display: flex;
        padding: .6rem 1rem;
        .fBB;
        align-items: center;
        .seach{
            height: 3rem;
            flex: 1;
            display: flex;
            box-sizing: border-box;
            border-radius: 1.5rem;
            margin-right: 1rem;
            .mRB;
            >input{
                flex: 1;
                height: 100%;
                padding-left:1.2rem;
                box-sizing: border-box; 
                font-size: 1.2rem;
            }
            .btn{
                justify-content: center;
                background: #D6D6D6;
                width: 6rem;
                display: flex;
                align-items: center;
                border-radius:0 1.5rem 1.5rem 0;
                color: white;
                font-size: 1.2rem;
                .van-icon{
                    margin-right: .6rem;
                    font-size: 1.6rem;
                }
            }
        }
        .time{
            text-align: center;
            >img{
                height: 1.5rem;
            }
            .val{
                font-size: 1.1rem;
                color: #999;
            }
        }
    }

    // 中间内容
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


    // 申请审批
    .post{
        width: 100%;
        .van-button{
            color: white;
            .fBMRB;
            width: 100%;
        }
    }
}
</style>