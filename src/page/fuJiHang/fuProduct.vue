/*
* @Author: fujihang
* @Date: 2019-03-20 16:43:41
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-05-14 18:44:51
产品 立即报名界面
*/
<template>
  <div id="fuProduct">
    <!-- 导航条 -->
    <navBarTow btn='true' name='课程详情' url='/fuClass'></navBarTow>

    <div class="ProductContant">

      <!-- 课程信息,听课地址 -->

      <!-- <div class="xinZhen">
         <div class="topName">
          <img class="img" src="../../image/fuJiHang/xin.png">
          课程信息
        </div>
        <div class="contantX">
          xxxx
        </div>
      </div> -->

      


      <!-- 产品图 -->
      <div class="banner">
        <!-- <van-swipe :autoplay="3000" :show-indicators="false">
          <van-swipe-item v-for="(item,index) in Data.picture" :key="index" :style="{'height':wwWH*2/5+'px'}">
            <img :src="item.FileUrl">
          </van-swipe-item>
        </van-swipe> -->
        <img class="bannerImg" :src="Data.F_Logo"/>
        <div class="detail">
          <div style="display: flex;justify-content: space-between;align-items: center">
            <div class="name">{{Data.CourseName}}</div>
            <div @click="openMask" style="display: flex;align-items: center;color: #999;font-size: 1.25rem">
              <img style="width: 1.25rem" src="../../image/share.png"/>分享
            </div>
          </div>
          <div class="mon_time">
            <!-- <span class="mon">定金：¥{{Data.Price}}</span> -->
            <!-- <span class="time">开课时间：{{Data.StartTime}}</span> -->
          </div>
        </div>
      </div>


      <div class="topNvBar">
        <span :class="['child',topChoose==index?'open':'']" @click="changeFN(index)" v-for="(item,index) in topList" :key="index">{{item}}</span>
      </div>

      <!-- 老师信息 -->
      <!-- <div class="teacher">
        <img src="../../image/fuJiHang/people.png">
        <span class="nameCompany">
            <div class="name">{{Data.TeacherName}}
            </div>
            <div class="company">{{Data.Speciality}}</div>
        </span>
      </div> -->


      <div class="xinZhen "  v-show="!topChoose">
         <div class="topName">
          <img class="img" src="../../image/fuJiHang/xin.png">
            听课地点
        </div>
        <div class="contantX" v-for="(items,indexs) in tingClass" :key="indexs">
            <div :class="['child',item.index?'max':''] " v-for="(item,index) in items.child" :key="index">
              <span class="name">{{item.name}}</span>
              <span class="val">{{item.val}}</span>
            </div>
        </div>
      </div>

      <!-- 课程介绍 -->
      <div class="introduce" v-show="topChoose">
        <div class="topName">
          <img class="img" src="../../image/fuJiHang/xin.png">
          课程介绍
          <span class="starD">
            <van-icon :name="Data.Collection==1?'star':'star-o'" color="#FF8499" size='1.5rem' @click="CollectFN"/>
            </span>
        </div>
        <div class="contant" v-html="Data.Outline">
          <!-- <div class="img_det">
              <img class="img" src="../../image/fuJiHang/school.png">
              <div class="det">
                  好学校是中国领先的在线教育服务提供商,提供覆盖各大城市的资质认证学校、强大智慧的课程和地图搜索、优质课程、真实用户点评、请教师兄、低价赔付和读书保障等教育
              </div>
          </div>
          <div class="contant_bot">
              好学校是中国领先的在线教育服务提供商,提供覆盖各大城市的资质认证学校、强大智慧的课程和地图搜索、优质课程、真实用户点评、请教师兄、低价赔付和读书保障等教育...好学校是中国领先的在线教育服务提供商,提供覆盖各大城市的资质认证学校、强大智慧的课程和地图搜索、优质课程、真实用户点评、请教师兄、低价赔付和读书保障等教育...
          </div> -->
        </div>
      </div>

      


      <!-- 立即报名 -->
      <div class="enroll">
        <van-button @click="show=!show">立即报名</van-button>
      </div>

    </div>
    <div class="mask" v-if="isMask" @click="openMask">
      <div class="maskTips">点击右上角分享</div>
    </div>
    <!-- 新增功能 -->
    <!-- 培训地点 -->
    <div class="mask" v-show="show" >
         <transition name="slide-fade">
      <!-- v-if="show" -->
      <div class="Area">
          <!-- <div class="areTop">
            <img :src="Data.F_Logo" alt="产品图" class="areaimg"/>
            <div class="areaPrice">￥{{Data.Price}} + {{Data.F_EarnestMoney}}</div>
            <div class="cha" @click="show=!show"></div>
            <div class="cha cha2" @click="show=!show"></div>
          </div> -->
          <span class="closeIcon" @click="closeMask">X</span>
          <div class="schooldetail">
            <div class="ifPayType" v-if="ifPayType">
              <span>是否只支付定金：</span>
              <van-radio-group v-model="payType">
                <van-radio name="true">是</van-radio>
                <van-radio name="false">否</van-radio>
              </van-radio-group>
            </div>
            <div class="schoolAera">
              学校名字&nbsp;:
            </div>
            <!-- <div :class="['school',-1==isChoose?'COLO':'']"   @click="chooseFN(-1)">不选</div> -->
            <div :class="['school',index==isChoose?'COLO':'']" v-for="(item,index) in Data.Schools"  :key="index" @click="chooseFN(index,item)">
              {{item.SchoolName}}{{item.F_StartTime}}{{item.F_Address}}
            </div>
          </div>
         <!-- 立即报名 -->
          <div class="enroll">
            <van-button @click="toFN">确定报名</van-button>
          </div>
      </div>

        
      </transition>
    </div>
       
      </div>
  <!-- </div> -->
</template>

<script>
  import navBarTow from '../../public/navBarTow'
  import axios from 'axios'
  import wxapi from '../../api/wxapi.js'
  // import wxShare from "../../api/wxShare.js";

  export default {
    components: {navBarTow},
    data() {
      return {
        // 判断是否可以全款
        ifPayType:false,
        // 顾客选择是否全款
        payType:false,
        banner: [
          {
            img: require("../../image/fuJiHang/psff920b48032d4a64-4d9a-4331-9b6b-9643f71809d8.png")
          },
          {
            img: require("../../image/fuJiHang/psff920b48032d4a64-4d9a-4331-9b6b-9643f71809d8.png")
          },
        ],//首页轮播图
        Data: {},//获取数据
        CourseId: this.$route.query.CourseId,
        isMask:false,
        F_Logo:'',
        CourseName:'',
        show:false,   //弹窗
        isActive: true,
        areaActive:false,
        areaIndex:"" ,//学校地区的下标
        tingClass:[
          // {
          //   name:'',
          //   child:[
          //     {
          //       name:'开课讲师：',
          //       val:'',
          //       data:'',
          //     },
          //     {
          //       name:'开课地点：',
          //       val:'',
          //       data:'',
          //     },
          //     {
          //       name:'开课时间：',
          //       val:'',
          //       data:'',
          //     },
          //     {
          //       name:'席位：',
          //       val:'',
          //       data:'',
          //     },
          //   ]
          // },
        ],//听课地点
        isChoose:-1,//选择价格卡片
        topList:['课程信息','课程详情'],
        topChoose:0,
        SchoolCourseId:0,
      };
    },

    methods: {
      // 关闭蒙层
      closeMask(){
        this.show = false;
      },

      changeFN(index){
        this.topChoose=index
      },

      // 微信分享
      wxRegCallback() {
        // 用于微信JS-SDK回调
        this.wxShareTimeline()
        this.wxShareAppMessage()
      },
      wxShareTimeline() {
        // 微信自定义分享到朋友圈
        // var shareWxLink = window.location.href.split('#')[0] + 'static/html/redirect.html?app3Redirect=' + encodeURIComponent(window.location.href);
        var shareWxLink = window.location.href;
        let option = {
          title: this.CourseName, // 分享标题
          link: shareWxLink, // 分享链接
          imgUrl: this.F_Logo, // 分享图标
          success: () => {
            alert('分享成功')
          },
          error: () => {
            alert('已取消分享')
          }
        }
        wxapi.ShareTimeline(option)
      },
      wxShareAppMessage() {
        // 微信自定义分享给朋友
        var shareWxLink = window.location.href.split('#')[0] + 'static/html/redirect.html?app3Redirect=' + encodeURIComponent(window.location.href);
        var shareWxLink = window.location.href;

        let option = {
          title: this.CourseName, // 分享标题
          desc: '测试分享', // 分享描述
          link: shareWxLink, // 分享链接
          imgUrl: this.F_Logo, // 分享图标
          success: () => {
            alert('分享成功')
            console.log("测试是否出发了分享成功的方法");
          },
          error: () => {
            alert('已取消分享')
            console.log("测试是否触发分享失败方法");
          }
        }
        wxapi.ShareAppMessage(option)
      },
      // 蒙层
      openMask() {
        this.isMask = !this.isMask
      },
      // 激活类
      chooseFN(index,item){
        if(this.ifPayType)
        {
          this.payType = "";
        }
        else
        {
          this.payType = false;
        }
        this.ifPayType = item.F_PayType;
        this.isChoose=index
        // if(index==-1){
        //   this.Data.Price=this.Data.moRen
        //   return 
        // }
        this.SchoolCourseId=this.Data.Schools[index].SchoolCourseId
        this.Data.Price=this.Data.Schools[index].F_Price
        this.Data.F_EarnestMoney=this.Data.Schools[index].F_EarnestMoney
      },
      //判断能否下订单
      toFN() {
        if(!this.SchoolCourseId) return this.notFN("当前课程没有学校可选")
        if(this.isChoose == -1)
        {
          this.notFN("请选择课程");
          return;
        }
        if(this.ifPayType && this.payType=='')
        {
          this.notFN("请选择是否交全款");
          return;
        }
        this.getFN({
          url: '/StudentCourse/IsAddOrderInspect?courseId=' + this.SchoolCourseId + "&payType=" + this.payType,
        }).then(r => {
          if (r.data.state == "success"){
            this.$router.push({path: "/fuPurchase?courseId=" + this.SchoolCourseId + '&amount=' + this.Data.Price +'&cId='+this.CourseId + "&payType=" + this.payType})
          }
          else this.sysFN('系统提示', r.data.message)
        })

      },
      // 获取数据
      getData() {
        this.tipFN();
        this.postFN({
          url: '/Student/GetSchoolCourse',
          data: {
            CourseId: this.CourseId
          }
        }).then(r => {
          this.tipHFN()
          if (r.data.state == "success") {
            let data=r.data.data
            let SchoolFU=[]
            for(let i=0;i<data.Schools.length;i++){
              // if(data.Schools[i].F_Price<99) continue
              SchoolFU.push(data.Schools[i])
              data.Schools[i].FTime=this.getTimeC(data.Schools[i].F_StartTime)
              let zhenli={
                name:data.Schools[i].SchoolName,
                child:[
                  {
                    name:'',
                    val:data.Schools[i].SchoolName+data.Schools[i].FTime+data.Schools[i].SchoolName,
                    index:1,
                  },
                  {
                    name:'开课讲师：',
                    val:data.Schools[i].TeacherName
                  },
                  {
                    name:'开课地点：',
                    val:data.Schools[i].SchoolName
                  },
                  {
                    name:'开课时间：',
                    val:data.Schools[i].F_StartTime
                  },
                  {
                    name:'已报名人数：',
                    val:data.Schools[i].F_Seat
                  },
                ]  
              }
              this.tingClass.push(zhenli)
              
            }
            data.Schools=SchoolFU
            this.Data =data
            console.log(this.Data,'我想看看这个');
            if(this.Data.Schools.length!=0){
              this.Data.Price=this.Data.Schools[0].F_Price
              this.SchoolCourseId=this.Data.Schools[0].SchoolCourseId
              this.Data.F_EarnestMoney=this.Data.Schools[0].F_EarnestMoney
            }
            
            // this.Data.moRen=data.Price
            // this.Data.moRenEM=0
            // this.Data.F_EarnestMoney=0
            this.CourseName = data.CourseName
            this.F_Logo = data.F_Logo
            // console.log("商品数据",r.data.data);
            
            // console.log("windows",window.location.href.split('#')[0]+window.location.href.split('#')[1])
            axios({
              url: this.Data.Outline,
              method: 'get',
              headers: {
                'Content-Type': 'application/json; application/octet-stream'
              },
              responseType: 'blob',
            }).then(r => {
              this.changeRGB(r.data).then(j => {
                this.Data.Outline = j
              })
            })
          } else this.notFN('获取课程信息失败')
        })
      },
      // 收藏
      CollectFN() {
        this.postFN({
          url: '/StudentCourse/SetUserTeacherOrCourse?type=0&collectionId=' + this.CourseId,
        }).then(r => {
          if (r.data.state == "success") {
            this.Data.Collection = !this.Data.Collection
          }
          this.notFN(r.data.message)

        })
      },

      // wxShare(){
      //   wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
      //     wx.updateAppMessageShareData({ 
      //         title: '', // 分享标题
      //         desc: '', // 分享描述
      //         link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //         imgUrl: '', // 分享图标
      //         success: function () {
      //           // 设置成功
      //           //不会执行呀
      //           alert("分享成功了老哥");
      //         }
      //     })
      //   });
      // },

    },
    mounted() {
      this.getData();
    }
  }

</script>


<style lang='less'>
  @import '../../style/base.less';
  @import '../../style/fujihangBase.less';

  // 蒙层
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left:0;
    background: rgba(0,0,0,0.6);
    z-index: 10;
    display: flex;
}
.maskTips{
  background: #fff;
  color: #333;
  padding: 10px 0;
  width: 30vw;
  text-align: center;
  float: right;
  margin: 20px 5px;
  border-radius: 5px;
  position: absolute;
  right: 0;
}
.maskTips:after{
  position: absolute;
  content: '';
  top: -22px;
  right: 10px;
  width: 0px;
  height: 0px;
  border-width: 12px;
  border-style: solid;
  border-color: transparent transparent #fff transparent;
}

#fuProduct {
  .mRB;
  .nC;
  .fBB;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .ProductContant {
    flex: 1;
    position: relative;
    padding-bottom: 4.5rem;
    overflow: auto;
    .topNvBar{
      display: flex;
      background: white;
      .child{
        padding: 1rem;
        .fBB;
        width: 50%;
        text-align: center;
        font-size: 1.2rem;
      }
      .open{
        color: #27BCD5;
        border-bottom: 2px solid #27BCD5;
      }
    }
    .xinZhen{
      margin-top: 1rem;
      .bW;
      padding: 0 1rem;
      .fBB;
      .topName {
          display: flex;
          align-items: center;
          .tC;
          padding: 1.1rem 0;
          
          .fBB;
          font-size: 1.3rem;
        .img {
          height: 1.7rem;
          margin-right: .3rem;
        }
      }
      .contantX{
        padding: 0 0 .3rem;
        .fBB;
        font-size: 1.15rem;
        .child{
          padding: .3rem;
          .fBB;
        }
        .max{
          padding-top: .6rem;
          font-weight: bold;
          font-size: 1.4rem;
          border-top:1px solid rgb(241, 241, 241);
        }
      }
      .contantXP{
        border-top:1px solid rgb(241, 241, 241);
        padding: 1rem 0 0;
      }
    }
    .mNTB{
      margin-top: 0;
      margin-bottom: 1rem;
      
    }
  }
  // 产品介绍
  .banner {
    .bW;
    .bBS;
    .bannerImg
    {
      width: 100%;
      height: 20rem;
    }
    .van-swipe {
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .detail {
      padding: 1.2rem 1.1rem .6rem;
      .fBB;
      .name {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: .6rem;
      }
      .mon_time {
        display: flex;
        .mon {
          flex: 1;
          .jG;
          font-size: 1.25rem;
        }
        .time {
          font-size: 1.1rem;
          color: #999;
        }
      }
    }
  }

  // 老师信息
  .teacher {
    .bW;
    .fBB;
    display: flex;
    padding: 1.1rem;
    align-items: center;
    margin-bottom: 1rem;
    > img {
      height: 4.5rem;
    }
    .nameCompany {
      flex: 1;
      margin-left: 1rem;
      .name {
        font-size: 1.25rem;
        font-weight: 650;
      }
      .company {
        font-size: 1.1rem;
        margin-top: .3rem;
        color: #999;
      }
    }
  }

  //课程介绍
  .introduce {
    .bW;
    padding: 0 1.1rem;
    .fBB;
    .topName {
      
      display: flex;
      align-items: center;
      .tC;
      padding: 1.1rem 0;
      .bBS;
      .fBB;
      font-size: 1.3rem;
      .img {
        height: 1.7rem;
        margin-right: .3rem;
      }
      .starD {
        flex: 1;
        text-align: right;
      }
    }
    .contant {
      color: #999;
      .fBB;
      padding: 1rem 0;
      font-size: 1.2rem;
      div, p, span, h1, h2, h3, em, img {
        max-width: 100%;
      }
      .img_det {
        display: flex;
        .img {
          height: 5.8rem;
          width: 35%;
          object-fit: cover;
        }
        .det {
          height: 100%;
          .fOTH;
          -webkit-line-clamp: 5;
          flex: 1;
          margin-left: 1rem;
        }
      }
      .contant_bot {
        margin-top: .3rem;
      }
    }
  }
  .enroll {
    width: 100%;
    position: fixed;
    bottom: 0;
    .van-button {
      width: 100%;
      .fBMRB;
      color: white;
    }
  }
  // 弹窗
  .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(50%);
  opacity: 0;
}
.closeArea
{
  position: absolute;
  top: 0;
  height:50%;
  width: 100%;
  background-color: transparent;
}
.Area{
  position: absolute;
  bottom: 0;
  height: 50%;
  width: 100%;
  background:white;
  .closeIcon
  {
    position:absolute;
    top: 1.7rem;
    right: 1.7rem;
    font-size: 1.3rem;
    font-weight: bold;
  }
  .areTop{
    position: relative;
    height: 10%;
    .cha{
      position: absolute;
      width: 5%;
      height: 5%;
      display: inline-block;
      background:gainsboro;
      top: 28%;
      right: 3%;
      // border-left: 5px solid red;
      transform: rotate(45deg)

    }
    .cha2{
      transform: rotate(135deg)
    }
    .areaimg{
    position: absolute;
    top: -107%;
    left: 5%;
    width: 34%;
    height: 238%;
  }
  .areaPrice{
    color: red;
    position: absolute;
    left: 40%;
    top: 57%;
  }
  }
  .schooldetail{
    height: 80%;
    margin-top: 5%;
    overflow: auto;

  .ifPayType
  {
    display: flex;
    margin-left: 5%;
    span
    {
      font-size: 1.2rem;
      color: #999;
    }
    .van-radio
    {
      overflow: hidden;
      margin-right: 2rem;
      margin-left: 1rem;
    }
    .van-radio-group
    {
      display: flex;
    }
    .van-radio__icon--checked .van-icon
    {
      border-color: #27bcd5;
      background-color: #27bcd5;
    }
  }
    
  .schoolAera{
    margin-bottom: .5rem;
    width: 18%;
    font-size: 1.2rem;
    color: #999;
    margin-left: 5%; 
    height: 2rem ;
    box-sizing: border-box;
    padding: .3rem 0;
  }
  .school{
      display:inline-block; 
      height: 2.5rem;
      line-height: 2.5rem;
      overflow:hidden;
      text-overflow: ellipsis;
      border-radius: 2rem;
      border: 1px solid #27BCD5;
      margin-left: 1rem;
      box-sizing: border-box;
      padding: 0 .8rem;
      color: #27BCD5;
      margin-bottom: 1rem;
    }
    .COLO{
       color:white;
       background: #27BCD5;
    }
  }

}
}
</style>
