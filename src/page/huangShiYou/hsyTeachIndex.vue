/*
* @Author: fujihang
* @Date: 2019-03-28 17:33:08
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 20:41:34
老师客服首页
*/
<template>
<div id = "hsyTeachIndex">
  <div class="teach-top">
      <!-- <img src="../../hsyimg/touxiang.png" alt="" class="teach-hand-img"> -->
      <img :src="userInfo.F_HeadIcon" alt="" class="teach-hand-img">
    <div class="teach-name">
      {{userInfo.F_NickName}}
      <!-- dasd -->
    </div>
    <div class="Azukefu">
      <!-- A组客服 -->
        {{userInfo.RoleName}}
    </div>
    <div class="set-btn">
      <!-- <img src="" alt=""> -->
      <img src="../../hsyimg/icon_set_up.png" alt="" @click='futoMyData'>
    </div>
    
    <div class="fukuai-box" >
    <!-- 11 -->
    <div class="fukuai-list" v-for="item in fukuaiList" :key="item">
      <div class="fukuai-num">
        {{item.fkNum}}
      </div>
      <div class="fukuai-tip">
        {{item.fkMsg}}
      </div>
    </div>
<!--  22-->

  </div>
  </div>
  
  <div class="teach-center">
    <div class="center-top">
      <img src="../../hsyimg/home_icon_01@2x.png" alt="" class="center-top-img">
      <!-- <img :src="userInfo.F_HeadIcon" alt="" class="center-top-img"> -->

      <div class="">
        常用功能
      </div>
    </div>
    <div class="center-btn">
      <div class="btn-box" v-for="(item,index) in gongneng" @click="toFN(item.to)" :key="index">
        <div class="btn-img-box">
          <!-- <div class=""> </div> -->
          <img :src="item.imgPath" alt="">

        </div>
        <div class="btn-tip-box">
          {{item.name}}
        </div>
      </div>
    </div>


  </div>
  <div class="teach-bottom-box">
    <div class="bottom-top">
      <img src="../../hsyimg/home_icon_01@2x.png" alt="" class="center-top-img">
      <div class="">
        最新资讯
      </div>
    </div>

      <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getNews"
        >

         <div class="list_infor" v-for="(item,index) in newList.data" :key="index">
                <div class="hot"></div>
                <div class="content">
                    <div class="name">
                        {{item.Information}}
                    </div>
                    <div class="time">
                        {{item.F_CreatorTime}}
                    </div>
                </div>
            </div>
         
            
    </van-list>
    


    
  </div>

</div>
</template>

<script>
export default {
  data(){
    return {
      UserID:'',
      noeData:[],
      newList:{
          page:1,
          data:[]

      },//最新资讯
      loading:false,//加载状态
      finished:false,//是否加载完成
      fukuaiList:[
        {
          fkNum:'',
          fkMsg:"添加微信",
          data:'AddWechatNumber'
        },
        {
          fkNum:'',
          fkMsg:"成单数量",
          data:'volume'
        },

        {
          fkNum:'',
          fkMsg:"到校人数",
          data:'arrivingAtSchool'
        }

      ],
      gongneng:[
        {
          name:"学生管理",
          to:'/fuStudentManage',
          imgPath:require("../../hsyimg/icon_ding.png")
        },
        {
          name:"订单详情",
          to:'/fuOrderManage',
            imgPath:require("../../hsyimg/icon_xue.png")
        },
        {
          name:"报单中心",
          to:'/fuDeclaratList',
            imgPath:require("../../hsyimg/icon_bao.png")
        }
      ],
      listDate:[
        {
          listtip:"组员李明明 与 学员王超促成一笔1999元订单",
          dateTime:"2019/02/19"
        },
        {
          listtip:"组员李明明 与 学员王超促成一笔1999元订单",
          dateTime:"2019/02/19"
        },
        {
          listtip:"组员李明明 与 学员王超促成一笔1999元订单",
          dateTime:"2019/02/19"
        },
        {
          listtip:"组员李明明 与 学员王超促成一笔1999元订单",
          dateTime:"2019/02/19"
        }

      ],
      userInfo:JSON.parse(localStorage.getItem('userInfo')),
      // userInfo:{
      //   wxInfo:{}
      // }
    };
  },

  methods: {
    toFN(item){
      this.$router.push({path:item})
    },
    futoMyData(){
        this.$router.push({path:'/fuMyData'})
    },
    getTeachIndexData ( ){
      var UserID = this.UserID


      // 083B6CCC-B5E0-4EF2-9D45-7015BE2B31B6/
      // var UserID="083B6CCC-B5E0-4EF2-9D45-7015BE2B31B6"
      var UserID = this.userInfo.wxInfo.UserId;
      this.postFN({
        url:"/Student/GetStatistics",
        data:{
          UserID:UserID,
          StartTime:new Date(1546272000000),
          EndTime:new Date(),
        }
      }).then(r=>{
        console.log(r)
        if(r.data.state == 'success' ){
          let data = r.data.data
          for(let i=0;i<this.fukuaiList.length;i++){
            this.fukuaiList[i].fkNum=data[this.fukuaiList[i].data]
          // this.okFN('首页数据成功');
          }
        }else{
          this.errFN('获取数据失败');
        }
      })
    },

      //拿数据

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
  created:function (){
    this.getTeachIndexData();
  }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.teach-top{
  width: 100%;
  height: 16rem;
  display: flex;
  align-items: center;
  position: relative;
  background-image: url("../../hsyimg/pic_order_bg.png");

}
.set-btn{
    margin-top: -5rem;
}
.set-btn img{
  width: 1.9rem;
  height: 1.9rem;
  // background-image: url("../../hsyimg/icon_set_up.png");
  // position: absolute;
  padding-right: 1rem;
  // margin-top: -5rem;
  // right: 10%;
  // top: 10%;
}
.teach-name{
  // position: absolute;
  // left: 30%;
  // top: 10%;
  margin-top: -5rem;
  flex: 1;
  font-size: 1.8rem;
  color: #FFFFFF;
  // text-align: center;
  line-height: 3rem;
  height: 3rem;
  width: 8rem;
  // background: red;
}
.teach-hand-img{
  margin-top: -5rem;
  margin-left: 2rem;
  width: 6rem;
  height: 6rem;
  // position: absolute;
  // left: 5%;
  // top: 5%;
  border-radius: 50%;
  // background: yellow;
}
.right-tip{
   margin-top: 4%;
   font-size: 1.4rem;
}
.right-list {

  color: #666666;
  border-bottom: 1px solid #f7f7f7;
  flex: 1;
  // background: red;
}

.left-list{
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  // background: red;
  align-items: center;
}
.left-list span{
  width: .5rem;
  background: #E69D7D;
  height: .5rem;
  overflow: hidden;
  // border: 50%;
  border-radius: 50%;

}
.Azukefu{
  position:absolute;
  margin-left: 8.5rem;
  margin-top: -0.5rem;
  background: #FFFFFF;
  color: #7AD6E5;
  width: 4.5rem;
  border-radius: 2rem;
  height: 1.5rem;
  text-align: center;
  line-height: 1.5rem;


}
.bottom-list-box{
  // height: 7rem;
  display: flex;
  background: white;
  width: 100%;
  .mB;
  padding: 1rem;
  .fBB;
}
.bottom-top{
  width: 100%;
  display: flex;
  // margin-top:5px;
  height: 3.8rem;
  text-align: center;
  background: white;
  border-bottom: 1px solid #f7f7f7;
  // justify-content: center;
  align-items: center;
}
.bottom-top div{
  margin-left: 2px;
  color: #7AD6E5;
  font-size: 1.5rem;
}
.bottom-top img{
  width: 2.3rem;
  height: 2.3rem;
}
.teach-bottom-box{
  width: 100%;
  // background: #FFFFFF;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 1rem;
  // height:
}
.fukuai-box{
    width: 90%;
    height: 8rem;
    background: #FFFFFF;
    position: absolute;
    border-radius: 4px;
    display: flex;
    bottom: -2rem;
    left: 5%;
}
.fukuai-list{
  // width: 25%;
  flex: 1;
}
.fukuai-num ,.fukuai-tip{
  font-size: 1.2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  color: #999999;

}
.fukuai-num{
    height: 4rem;
    line-height: 5rem;
}
.btn-img-box{
  height: 23%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-img-box img{
  width: 2.3rem;
  height: 2.3rem;
  // background: pink;
  margin-top: 30%;
}
.btn-tip-box{
  height: 3rem;
  width: 100%;
  color: #999999;
  text-align: center;
  font-size: 1.2rem;
  line-height: 2rem;
  margin-top: 17%;
}

.center-top{
  width: 100%;
  height: 3.8rem;
  color: #7AD6E5;
  align-items: center;
  border-bottom: 1px solid #f7f7f7;
  display: flex;
}
 #hsyTeachIndex{
  position: relative;
  background: #f7f7f7;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .van-list{
    flex: 1;
    overflow: auto;
  .bW;
    .list_infor{

            padding: 1rem 1rem 1rem 0;
            margin-left: 1rem;
            .fBB;
            display: flex;
            align-items: center;
            .bBS;
            .content{
                flex: 1;
                margin-left: 1rem;
                .name{
                    font-size: 1.2rem;
                    margin-bottom: .6rem;
                }
                .time{
                    font-size: 1.1rem;
                    color: #999;
                }
            }
            .hot{
                height: .5rem;
                width: .5rem;
                background: #E69D7D;
                border-radius: 50%;
            }
        }
  }
}
.teach-center{
  width: 100%;
  background: #FFFFFF;
  border-radius: 4px 0 0 4px;
  margin-top: 11%;

}
.center-top-img{
  width: rem;
  margin-left: 5%;
  height: 2.3rem;
  color: #999999;
  line-height: 3rem;

}
.center-top div{
  font-size: 1.5rem;
}
.center-btn{

  width:100%;
  display: flex;
  flex-wrap:wrap;
  justify-content: space-around;
}
.btn-box{
  // flex-grow: 1;
  width: 30%;

  // height: 30%;
  height: 8rem;
  // background: red;

}



</style>
