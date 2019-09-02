/*
 * @Author: fujihang
 * @Date: 2019-03-22 17:59:34
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-19 15:00:59
 //A\B组客服老板首页

 */
<template>
  <div id="fieraa">
    <div class="topMsg">
      <div class="fuTop">
        <img :src="userInfo.F_HeadIcon">
        <span class="contant">
          <div class="name_day">
            <span class="name">{{userInfo.wxInfo.UserNickName}}</span>
            <span class="day" :id = "item.bg == true ? 'listbG' : ''" @click = 'selectedday(index)' v-for="(item,index) in xuanzeriqi"  :key="index">{{item.day}}</span>
          </div>
          <div class="type">
            <span>{{userInfo.RoleName}}</span>
          </div>
        </span>
        
      </div>

      <!-- <div class="topMsgId"> -->
        <!-- <div class="userHand"> -->
            <!-- <img src="../../hsyimg/touxiang.png" alt="" class="userHand"> -->
              <!-- /动态本地用户/ -->
              <!-- <img :src="userInfo.F_HeadIcon" alt="" class="userHand"> -->
        <!-- </div> -->
        <!-- <div class="userName"> -->
          <!-- 李孝利 -->
            <!-- {{userInfo.wxInfo.UserNickName}} -->
        <!-- </div>
        <div class="userTitle" > -->
          <!-- 老板 -->
            <!-- {{userInfo.RoleName}}
        </div>
      </div>
      <div class="topMsgDay">
        <ul>
          <li v-for="(item,index) in xuanzeriqi"  :key="index" @click = 'selectedday(index)' :id = "item.bg == true ? 'listbG' : ''" >{{item.day}}</li>
        </ul> -->

      <!-- </div> -->
      <!-- <div class="topMsgMon">
        2019/12/04
      </div> -->
      <div class="topMsgNum">
        <ul>
          <li>{{tongji.AddWechatNumber}}</li>
          <li>{{tongji.Excess}}</li>
          <li>{{tongji.volume}}</li>
          <!-- A组客户老板没有下期到校 -->
          <li v-if="isBzu">{{tongji.arriveAtSchool}}</li>
        </ul>
      </div>
      <div class="topMsgTip" >
        <ul>
          <li v-on:click = "das">添加微信量</li>
          <li>超出量</li>
          <li>成交量</li>
          <!-- A组客户老板没有下期到校 -->
          <li v-if="isBzu">下期到校</li>
        </ul>
      </div>

    </div>
    <div class="dayReport">
      <div class="dayReportTitle">
        <li>今日汇报</li>
      </div>


      <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getNews"
        >

          <div class="dayReportList" v-for="(item,index) in newList.data" :key="index">
            <div class="ListConter">
              {{item.Information}}
            </div>
            <div class="ListDay">
              {{item.F_CreatorTime}}
            </div>
            <div class="clr">

            </div>
          </div>
        </van-list>
      </div>
      <div class="fieraaMark" v-show = "showMask">
      </div>
      <transition name="fade">
      <div class="fieraa-pop-up" v-show = "showMask">
        <div class="pop-title">
          设置达成指标
        </div>
        <div class="pop-num" >
          <input type="text" name="" v-model="setNumber" class="pop-num-input">

        </div>
        <div class="pop-tip">
          注：设置每天需要完成的指标，及时更改及时生效
        </div>
        <div class="pop-btn" v-on:click="setnumber" >
          确定
        </div>
      </div>
    </transition>
    <div class="setTarget-box">
      <div class="setTarget" v-on:click="popmark">
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
          newList:{
              page:1,
              data:[]

          },//最新资讯
          loading:false,//加载状态
          finished:false,//是否加载完成
          isBzu:false,
          UserID:'',
          showMask:false,
          F_IndexInfo:'10',
          tongji:{
          },
          nowTime:'',//现在的时间
          timestamp:'',//现在的时间
          zuotian:'',//昨天的时间
          qitian:'',//前天
          // userInfo:JSON.parse(localStorage.getItem('userInfo')),
          userInfo:{
            wxInfo:{
              UserId:"9339D983-BBEB-47B5-8217-2D1B1C762C7C"
            }
          },
          setNumber:'10',
          xuanzeriqi:[
            {
              day:'今日',
              bg:true,
              time:"nowday"
            },
            {
              day:'昨日',
              bg:false,
              time:"yesterday"
            },
            {
              day:'近7日',
              bg:false,
              time:"oneweek"
            }
          ]
        };
    },
    methods: {
      popmark(time1,time2){
        this.showMask = !this.showMask
      },
      setnumber(){
        this.showMask = !this.showMask;
        var setNumber = this.setNumber;
        var UserID = this.UserID ;
        this.postFN({
          url:'/Student/SettingIndex',
          data:{
            F_UserID:UserID,
            F_IndexInfo:setNumber
          }
        }).then(r =>{
          console.log(r)
          if(r.data.state == 'success'){
            this.okFN('设置' +setNumber+'成功' );
          }else{
            this.okFN('设置' +setNumber+'失败' );
          }
        })
      },
      das(e){
        console.log(e)
      },
      selectedday(i){
        console.log(i)
        //设置样式
        var xuanzeriqi = this.xuanzeriqi;
        xuanzeriqi.filter((item) => {
          item.bg = false;
        })
        xuanzeriqi[i].bg = true;
        //点击昨天转换时间戳
        if(i == 0){
          var UserID = this.UserID ;
          var startTime = new Date(new Date().setHours(0, 0, 0, 0));
          var endTime = new Date(new Date().setHours(23, 23, 23, 59));
          // var nowTime = this.nowTime;
          this.postFN({
            url:"/Student/GetStatistics",
            data:{
              UserID:UserID,
              StartTime:startTime,
              EndTime:endTime
            }
          }).then(r=>{
            console.log(r.data)
            if(r.data.state == 'success'){
              console.log('拿今天统计数据成功')
              this.tongji = r.data.data
            }
          })
        }
        if(i == 1){
          var UserID = this.UserID ;
          // var zuotian = this.zuotian;
          var op1 = new Date()-24*60*60*1000
          var endTime = new Date(new Date().setHours(23, 23, 23, 59));
          var startTime = new Date(new Date(op1))
          this.postFN({
            url:"/Student/GetStatistics",
            data:{
              UserID:UserID,
              StartTime:startTime,
              EndTime:endTime
            }
          }).then(r=>{
            console.log(r.data)
            if(r.data.state == 'success'){
              console.log('拿昨天统计数据成功')
              this.tongji = r.data.data
            }
          })
        }
        if(i == 2){
          var op7 = new Date()-24*60*60*1000*7
          var startTime = new Date(new Date().setHours(0, 0, 0, 0));
          // var endTime = new Date(new Date().setHours(23, 23, 23, 59));
          var endTime = new Date(op7)
          var UserID = this.UserID ;
          // var qitian = this.qitian;
          this.postFN({
            url:"/Student/GetStatistics",
            data:{
              UserID:UserID,
              StartTime:startTime,
              EndTime:endTime
            }
          }).then(r=>{
            console.log(r.data)
            if(r.data.state == 'success'){
              console.log('拿近七天统计数据成功')
              this.tongji = r.data.data
            }
          })
        }
        // console.log(i)
      },
      laoban(){
        console.log(this.userInfo)
        if(this.userInfo.RoleName == 'A组老板'){
          this.isBzu = false;
          console.log('老板')
        }
        if(this.userInfo.RoleName == 'B组老板'){
          this.isBzu = true;
          console.log('老板B')
        }
      },
      getdata(){//首次获取数据,默认今天
        console.log('开始那你的数据888')
        var UserID = this.UserID ;
        var startTime = new Date(new Date().setHours(0, 0, 0, 0));
        var endTime = new Date(new Date().setHours(23, 23, 23, 59));
        this.postFN({
          url:"/Student/GetStatistics",
          data:{
            UserID:UserID,
            StartTime:startTime,
            EndTime:endTime
          }
        }).then(r=>{
          console.log(r.data)
          if(r.data.state == 'success'){
            console.log('拿同届数据成功')
            this.tongji = r.data.data
          }
        })
      },
      getUserId(){
        this.UserID = this.userInfo.wxInfo.UserId
      },
      // 获取最新咨询
      getNews(){
          this.loading=true
          this.postFN({
              url:'/Student/GetInformation',
              data:{
                  // UserID:'7AAFA442-F458-4935-A9DC-C5D8EE951D60',
                  UserID:this.userInfo.wxInfo.UserId,
                  rows:7,
                  page:this.newList.page,
              }
          }).then(r=>{
              if(r.data.state=="success"){
                  let data=r.data.data
                  for(let i=0;i<data.length;i++){
                      this.newList.data.push(data[i])
                  }
                  if(data.length<7){
                      this.loading=false
                      this.finished=true
                      return
                  }
                  this.newList.page++
                  this.loading=false
              }else this.notFN('最新资讯获取失败，请刷新页面重试！')
          })
      }
    },
    created(){
      // console.log('开始请求你的数据')
      this.getUserId();//获取用户iD
      this.laoban();
      this.getdata();
      //判断老板AB
    }
}

</script>


<style lang='less' scoped>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fieraa{
  background:rgba(247,247,247,1);
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  .fuTop{
    padding: 1rem;
    box-sizing: border-box;
    display: flex;
  >img{
    object-fit: cover;
    border-radius: 50%;
    width: 5.5rem;
    height: 5.5rem;
  }
  .contant{
    flex: 1;
    margin-left: 1rem;
    .name_day{
      align-items: center;
      display: flex;
      margin: .3rem 0 1rem;
      color: white;
      .name{
        flex: 1;
        font-size: 1.6rem;
        
      }
      .day{
        font-size: 1.2rem;
        padding: .1rem .3rem;
        margin:0 .3rem;
      }
      
    }
    .type{
      >span{
        .bW;
        color: #27BCD5;
        font-size: 1.3rem;
        border-radius: .5rem;
        padding: .2 .6rem;
        box-sizing: border-box;
      }
      
    }
  }
}
}
.fade-enter-active, .fade-leave-active {
  // transition: opacity .5s;
   transition: all .3s ease;
}
.fade-leave-active{
   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  // opacity: 0;
  transform: translateX(10px);
  opacity: 0;
}
.setTarget-box{
  bottom: 5%;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}
#listbG{
  color: #27BCD5;
  background: #FFFFFF;
}
.pop-title{
  height: 4rem;
  width: 100%;
  text-align: center;
  line-height: 4rem;
  color: #000000;
  font-size: 16px;
  // background: red;
}
.pop-num{
  height: 4rem;
  width: 100%;
  text-align: center;
  line-height: 4rem;

  font-size: 16px;
  .pop-num-input{
    width: 50%;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    background: #F8F8F8;


  }
  // background: red;
}
.pop-tip{
  height: 4rem;
  width: 100%;
  text-align: center;
  line-height: 4rem;
  color: #CCCCCC;
  font-size: 12px;
  border-bottom: 2px solid #f7f7f7;

}
.pop-btn{
  height: 4rem;
  width: 100%;
  color: #666666;
  text-align: center;
  line-height: 4rem;
  font-size: 16px;

}
.fieraaMark{
  top: 0rem;
  bottom: 0rem;
  position: fixed;
  width: 100%;
  background: black;
  opacity: 0.5;
  height:100%;
}
.fieraa-pop-up{
  width: 25rem;
  height: 17rem;
  background: #FFFFFF;
  border-radius: 5px;
  top: 50%;
  position: fixed;
  left: 50%;
  margin: -10.5rem 0 0 -12.5rem;

  // margin-left: -20rem 0 0 -20rem;
  // opacity: 1;

}
.topMsg{
     width: 100%;
     position: relative;
     height:12.75rem;
     background: rgba(39,188,213,1);
}
.topMsgId{
  width:14rem;
  height: 10rem;
  // background: red;
  position: absolute;

}
.userHand{
  width: 6rem;
  height: 6rem;
  position: absolute;
  border-radius: 50%;
  // background: yellow;
  left: 10%;
  top: 10%;
}
.userName{
    width: 5rem;
    height: 2rem;
    font-size: 1.5rem;
    // background: black;
    color: #FFFFFF;
    position: absolute;
    left: 62%;
    top: 20%;
}
.userTitle{
  width: 3rem;
  height: 1.5rem;
  font-size: 0.5rem;
  line-height: 1.5rem;
  text-align: center;
  // background: black;
  color: #27BCD5;
  background: #FFFFFF;
  border-radius: 3rem;
  position: absolute;
  left: 62%;
  top: 50%;

}
.topMsgDay{
  width: 30%;
  height: 2.00rem;
  // background: red;
  position: absolute;
  right: 1rem;

  top:2rem;

  // line-height: 100%;
}
.topMsgDay ul{
  display: flex;
  justify-content: space-between;
  color: rgba(255,255,255,1);

}
.topMsgDay ul li {
  border-radius: 4px;
  padding-left: 1px;
  padding-right: 1px;

}

.topMsgNum ul ,.topMsgTip ul{
  display: flex;
  justify-content: space-between;
}
.topMsgNum ul li,.topMsgTip ul li{
  width: 25%;
  text-align: center;
  color: rgba(255,255,255,1);

}
.topMsgNum {
  position: relative;
  margin-bottom: .5rem;
}
.topMsgTip{
  position: relative;
  // top:8.4rem;
}
.dayReportTitle{
  width: 100%;
  background: white;
  height: 4.5rem;
  margin-top: 10px;
  line-height: 4.5rem;
  border-bottom: 1px solid rgba(247,247,247,1);;
}
.dayReportTitle li {
  list-style: none;
  margin-left: 3.5rem;
  font-size:18px;
  color: #7AD6E5;
}
.dayReportList{
  height: 4.4rem;
  padding-top: 16px;
  margin-top: 1px;
  color: #666666;
  position: relative;
  border-bottom: 1px solid #f7f7f7;
  background: rgba(255,255,255,1);
}
.ListConter , .ListDay{
  margin-left: 4rem;
  // color: #7AD6E5;

}
.ListConter{
  // margin-top: 2rem;
  // padding-top:
}
.clr{
  background: #e69d7d;
position: absolute;
top: 29px;
border-radius: 50%;
width: 6px;
height: 6px;
left: 33px;
}
.topMsgMon{
  width: 19%;
  height: 2.00rem;
  // background: red;
  color: rgba(255,255,255,1);
  position: absolute;
  right: 1rem;
  display: flex;
  top:2rem;
}
.dayReport{
  width: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .van-list{
    flex: 1;
    overflow: auto;
  }
}
.setTarget{
     width: 10rem;
     height: 10rem;
     background-image: url("../../hsyimg/home_big_2.png");
     background-size: 10rem 10rem;
     margin-top: 10%;
     border-radius: 50%;
}

#app #appContext{
      background: rgba(247,247,247,1);
}

</style>
