/*
 * @Author: fujihang 
 * @Date: 2019-03-28 15:39:51 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-03 15:59:10
    搜索，时间
 */
<template>
<div class="seachTime">
    <div class="seachTe">
        <input :placeholder="plr" v-model="sea">
        <div class="btn" @click="seachFN">
            <van-icon name="search" />{{btn?btn:'确定'}}
        </div>
    </div>
    
    <div class="time" @click="showTimeFN">
        <img src="../../image/fuJiHang/time.png">
        <div class="val">
            {{topTime}}
        </div>
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
export default {
    props:['plr','btn'],
    data(){
        return {
            showTime:false,//时间弹窗
            currentDate:new Date(),//时间
            returnTime:[],//时间
            sea:'',//搜索
            topTime:this.timestampToTime(new Date),
        };
    },

    methods: {
        // 选择提示
        showTimeFN(){
            this.notFN("请选择开始时间",1500)
            setTimeout(()=>{
                this.showTime=true
            },1400)
            
        },
        // 时间弹窗
        chooseTime(){
            this.returnTime.push(this.currentDate)
            if(this.returnTime.length==2){
                this.topTime=this.timestampToTime(this.returnTime[1])
                this.$emit("callbackT",this.returnTime)
                this.showTime=false
                this.returnTime=[]
            }else this.notFN("请选择结束时间",1000)
        },
        // 搜索回调
        seachFN(){
            this.$emit("seach",this.sea)
        }
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.seachTime{
    .bW;
    display: flex;
    padding: .6rem 1rem;
    .fBB;
    align-items: center;
    .seachTe{
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
</style>