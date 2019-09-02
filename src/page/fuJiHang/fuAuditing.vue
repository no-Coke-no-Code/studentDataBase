/*
 * @Author: fujihang
 * @Date: 2019-03-28 10:40:06
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-16 21:14:02
    a/b管理员审核
 */
<template>
<div id="fuAuditing">
    <!-- 导航条 -->
    <div class="navtop">
        <span class="name">
            清单列表（2）
        </span>
        <span class="time">
            <span @click="chooseTime(index)" :class="['day',cos==index?'cos':'']" v-for="(item,index) in timeList" :key="index">
               <img src="../../image/fuJiHang/time.png" v-show="index==2">{{item}}
            </span>
           
        </span>
    </div>

    <!-- 内容 -->
      <van-list
        class="auditingCantant"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
      >
       <auditCard @Approval="Approval" @Reject="Reject" @callBack="isChange" :item = "item" v-for="(item,index) in nowData"  :key="index"> </auditCard>

      </van-list>
       

    <!-- 底部按钮 -->
    <div class="botton_btn">
      <div class="checkFa">
        <van-checkbox v-model="checked" >共选{{j}}名学生</van-checkbox>
        <div class="checkChild" @click="isAll">
        </div>
      </div>
          
        
        
        <van-button class="back" @click="AllChange(2)">一键驳回</van-button>
        <van-button class="toGo" @click="AllChange(1)">快速批过</van-button>
    </div>


    <!-- 时间选择器 -->
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
import auditCard from "../../components/fujihang/auditCard";

export default {
    components:{
        auditCard,
    },
    data(){
        return {
          timeList:['今日','昨日'],//时间选择列表
              cos:0,
              showTime:{
                show:false,
                num:0,
              },//显示时间
              currentDate: new Date(),
              startTime:new Date(new Date().setHours(0,0,0,0)),
              endTime:new Date(),
              checked:false,
              nowData:[],
              loading:false,//加载状态
              finished:false,//加载完成
              j:0,
              page:1,//页数
              userInfo:JSON.parse(localStorage.getItem("userInfo")),
              // userInfo:{
              //   wxInfo:{}
              // }
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
                this.timeList[2]=this.timestampToTime(this.currentDate)
                this.showTime.num=0
                return;
            }
            this.startTime=this.currentDate
            this.notFN('请选择结束时间',1000)
        },
        // 获取数据
        getData(sea){
          if(sea){
            this.page=1;
            this.nowData=[]
            this.finished=false
          }
          this.loading=true
            this.postFN({
                url:'/Student/GetAdminExamineInfo',
                data:{
                    // UserID:'7AAFA442-F458-4935-A9DC-C5D8EE951D60',
                    UserID:this.userInfo.wxInfo.UserId,
                    State:0,
                    StartTime:this.startTime,
                    EndTime:this.endTime,
                    rows:10,
                    page:this.page
                }
            }).then(r=>{
              if(r.data.state == 'success'){
                let data = r.data.data;
                for(let i=0;i<data.length;i++){
                    data[i].check = false
                    this.nowData.push(data[i])
                }
                if(data.length<10){
                  this.finished=true
                  this.loading=false
                  return;
                }
                this.page++
                this.loading=false
              }else{
                this.errFN('没能获取数据')
              }
            })
        },
        // 当选
        isChange(){
          this.j=0
          for(let i=0;i<this.nowData.length;i++){
            if(this.nowData[i].check) this.j++
          }
          if(this.nowData.length==this.j) this.checked=true
          else this.checked=false
          
        },
        // 多选
        isAll(){
          this.checked=!this.checked
          for(let i=0;i<this.nowData.length;i++){
            this.nowData[i].check=this.checked
          }
        },
        // 审批
        Approval(id){
          this.postFN({
                url:'/Student/UpdateOrderAudit',
                data:{
                  F_State:1,
                  keyValue:id
                }
            }).then(r=>{
                if(r.data.state=='success') {
                  this.okFN("审批成功！")
                  this.getData(true)
                }
                else this.notFN(r.data.message)
            })
        },
        // 驳回
        Reject(id){
          this.postFN({
                url:'/Student/UpdateOrderAudit',
                data:{
                  F_State:2,
                  keyValue:id
                }
            }).then(r=>{
                if(r.data.state=='success'){
                  this.okFN("驳回成功！")
                  this.getData(true)
                }
                else this.notFN(r.data.message)
            })
        },
        // 一键驳回或通过
        AllChange(state){
          let id=""
          for(let i=0;i<this.nowData.length;i++){
            if(this.nowData[i].check) id=this.nowData[i].F_Id+','
          }
          this.postFN({
                url:'/Student/UpdateOrderAudits',
                data:{
                  F_State:state,
                  keyValue:id
                }
            }).then(r=>{
                if(r.data.state=='success'){
                  this.okFN("操作成功！")
                  this.getData(true)
                }
                else this.notFN(r.data.message)
            })
        }
    },
    mounted(){
        this.timeList.push(this.timestampToTime(new Date()))
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuAuditing{
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .mRB;.nC;
    // 导航条
    
    .navtop{
        display: flex;
        align-items: center;
        padding: 1rem;
        color: #999;
        .fBB;
        .name{
            flex: 1;
            font-size: 1.2rem;
        }
        .time{
          display: flex;
          align-items: center;
            font-size: 1.1rem;
            .cos{
              color: #27BCD5;
            }
            .day{
              display: flex;
              align-items: center;
                margin: 0 .3rem;
                >img{
                    margin: 0 .3rem;
                    height: 1.1rem;
                }
            }
        }
    }
    // 内容
    .auditingCantant{
        flex: 1;
        overflow: auto;
    }
    // 按钮
    .botton_btn{
        padding-left: 1rem;
        .fBB;.bW;
        display: flex;
        align-items: center;
        .checkFa{
            position: relative;
            flex: 1;
            .checkChild{
              opacity: 0;
              top: 0;
              left: 0;
              position: absolute;
              width: 100%;
              height: 44px;
              background: white;
            }
          }
        .van-checkbox{
          
            .van-checkbox__label{
                margin-left: 1.5rem;
            }
        }
        .van-button{
            border:none;
            color: white;
        }
        .back {
            .tB;
        }
        .toGo{
            .fBMRB;
        }

    }
    .van-picker__cancel{
      opacity: 0;
    }
}
</style>
