/*
 * @Author: fujihang
 * @Date: 2019-03-19 15:16:20
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-11 20:26:07
 */
<template>
<div id="HsyAtSchool">
  <div class="HsyAtSchoolSearchBox">
    <div class="HsyAtSchoolSearchBg">
      <div class="HsyInputBox">
        <input v-model="seach" type="text" name="" value="" placeholder="请输入学员/课程名称" class="HsySearchInput">
      </div>
      <div class="HsySearchRight" @click="getData(true)">
        <img src="../../hsyimg/icon_search.png" alt="" class="HsySearchImg">
        <span>查询</span>
      </div>
    </div>
  </div>
  <div class="HsyAtSchoolTitleBox">
    <div class="HsyAtSchoolTitle">
      已到校名单
    </div>
    <div class="HsyAtSchoolTitleImg">
      <img src="../../image/fuJiHang/time.png" alt="">
    </div>
    <div class="HsyAtSchoolTitleDate" @click="showTimeFN">
      {{showTime.time}}
    </div>
  </div>

  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="getData"
  >
  <div class="HsyAtSchoolListBox" v-for="(item,index) in nowData"  :key="index">
    <div class="HsyAtSchoolList">
      <div class="HsyAtSchoolListBtn">
        <div :class="['HsyBtn' , item.selected ? 'HsyBtn2': '' ]" @click = "SeltedBtn(item.selected,index)"></div>
      </div>
      <div class="HsyAtSchoolListContentBox">
        <div class="HsyAtSchoolUserName">
          {{item.Name}}
        </div>
        <div class="HsyAtSchoolMsg">
          <ul>
            <li>
              <img src="../../hsyimg/phone.png" alt="">
              手机: {{item.Phone ? item.Phone :'无'}}
            </li>
            <li>
              <img src="../../hsyimg/teach.png" alt="">
              分校: {{item.SchoolName?item.SchoolName:'无'}} <span class="HSykecheng">课程 : {{item.course?item.course:'无'}}</span>
            </li>
            <li>
              <img src="../../hsyimg/teach.png" alt="">
              添加时间: {{item.CreatorTime}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  


  </van-list>



  <div class="HsyAtSchoolBottomBox">
    <div class="HsyAtSchoolBottomLeft" @click = "SeltedAll">
      <span :class="['HsyAtSchoolBottomLeftBtn' , all ? 'HsyAtSchoolBottomLeftBtn2' :'' ]" ></span><span class="HsyAtSchoolBottomLeftBtnSum">共选{{sun}}名学员</span>
    </div>
    <div class="HsyAtSchoolBottomRight" @click = "SureAtSchool">
      <span>确定到校</span>
    </div>
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
export default {
    data(){
        return {
          userInfo:JSON.parse(localStorage.getItem("userInfo")),
            showTime:{
              show:false,
              num:0,
              time:this.timestampToTime(new Date()),
            },//显示时间
            seach:'',//搜索
            currentDate: new Date(),//时间选择器
            loading:false,//加载状态
            finished:false,//加载完成
            page:1,//页数
           checked: true,
           all:false,
           sun:0,
          //  GetArrivalInfoStartTime:new Date(new Date().setHours(0,0,0,0)),//开始时间
          //  GetArrivalInfoEndTime:new Date(),//结束时间
          GetArrivalInfoStartTime:null,//开始时间
          GetArrivalInfoEndTime:null,//结束时间
           nowData:[],//这个是获取到的真实数据,你每次获取新的数据都放到这来,
          AtSchoolData:[
            // {
            //   Name:'李孝利',//Name
            //   Phone:1355555555,//Phone
            //   SchoolName:"中央学院",//SchoolName
            //   CreatorTime:'2019/3/19',//CreatorTime
            //   selected:false,
            //   course:'美甲',
            //   Id:1322213515
            // },
            // {
            //   Name:'李孝利',
            //   Phone:1355555555,
            //   SchoolName:"中央学院",
            //   CreatorTime:'2019/3/19',
            //   selected:false,
            //   course:'美甲',
            //   Id:415655611
            // },
            // {
            //   Name:'李孝利',
            //   Phone:1355555555,
            //   SchoolName:"中央学院",
            //   CreatorTime:'2019/3/19',
            //   selected:false,
            //   course:'美甲',
            //   Id:231456
            // }
          ]
        };
    },
    methods: {
      // 显示时间
      showTimeFN(){
        this.notFN("请选择开始时间",1200)
        setTimeout(()=>{
          this.showTime.show=true
        },1200)
      },
      // 确定选择时间
      okTime(){
          this.showTime.num++
          if(this.showTime.num==2){
              this.GetArrivalInfoEndTime=this.currentDate
              this.getData(true)
              this.showTime.show=false
              this.showTime.time=this.timestampToTime(this.currentDate)
              this.showTime.num=0
              return;
          }
          this.GetArrivalInfoStartTime=this.currentDate
          this.notFN('请选择结束时间',1000)
      },

        // 
      SeltedBtn(setBtn,index){
      var dat  = this.nowData;
      //交互实现
        dat[index].selected =!  dat[index].selected;
        var datLeng = [] , j = 0;
        for(var i in dat){
          if(dat[i].selected == true){
            // j是记录已选的按钮个数
            j = j + 1;
            this.sun = j;
            console.log(j)
            if(j == dat.length){
              this.all = true;
              this.sun = j;
            }else{
              this.all = false;
            }
          }
          if(j == 0){
            this.all = false;
            this.sun = 0;
          }
        }
        // this.SeltedAll();全选方法监听
      },
      SeltedAll(){//
        var dat2 = this.nowData;
        if(!this.all){//没全选的
          this.quanxuan();//使用全选
        }else{
          this.fanxuan();//使用反选
        }
      },
      quanxuan(){//全选
        var dat2 = this.nowData;
        dat2.filter(function (element){
          element.selected = true;
        })
        this.all = true;
        this.sun = dat2.length;
      },
      fanxuan(){//反选
        var dat2 = this.nowData;
        dat2.filter(function (element){
          element.selected = false;
        })
        this.all = false;
        this.sun = 0 ;
      },
      SureAtSchool(){//提交按钮交选中的ID数据原本的是数组,我们不能提交数组到后端,我们只能将数组分割
        var dat2 = this.nowData;
        var setData = [];
        dat2.filter(function(item){
          if(item.selected){
            setData.push(item.Id)
          }
        })
        let idlist = setData.join(',')//这就是获取的被选中的学生id
        if(idlist != ""){
          this.postFN({
            url:'/Student/ArriveAtSchool',//这个接口是点击确定提交的接口
            data:{
              orderIDs:idlist,
              State:2
            }
          }).then(r=>{
            if(r.data.state=="success"){
              this.okFN('操作成功！')
              this.getData(true)
            }else this.notFN('操作失败，请刷新重试！')
          })
        }
      },
      getData(sea){
        if(sea){
          this.finished=false
          this.nowData=[]
          this.page=1
        }
        this.loading=true

        this.postFN({
          url:'/Student/GetArrivalInfo',
          data:{
            // UserID:'7AAFA442-F458-4935-A9DC-C5D8EE951D60',//管理员用户ID
            UserID:this.userInfo.wxInfo.UserId,
            Name:this.seach?this.seach:null,//学员名称或课程名称
            StartTime:this.GetArrivalInfoStartTime,//开始时间
            SchoolType:0,
            EndTime:this.GetArrivalInfoEndTime,//结束时间
            rows:'10',//行数
            page:this.page//当前页
          }
        }).then(r=>{
          console.log(r.data)
          if(r.data.state=="success"){
            let data=r.data.data
            for(let i=0;i<data.length;i++){
              data[i].selected=false
              this.nowData.push(data[i])
            }
            if(data.length<10){
              this.finished=true
              this.loading=false
              return 
            }
            this.page++
            this.loading=false
          }else this.notFN('获取到校列表失败，请刷新重试！')
          // let data = r.data.data
          // console.log(data)//因为拿到的数据都没有selected我们要拿他做选择按钮的状态交互效果我们就循环添加
          // for(var i = 0; i < data.length; i++){
          //   data[i].selected = false;
          //   if(i == data.length - 1){
          //     this.nowData = data
          //     // console.log(this.nowData)
          //   }
          // }
          // console.log(r)
        })
      },
    },
    // created:function(){
    //   this.getData();
    // }
}

</script>


<style lang='less'>


#HsyAtSchool{
  background: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .van-list{
    flex: 1;
    overflow: auto;
  }
  .van-picker__cancel{
    opacity: 0;
  }
}
.HsyAtSchoolSearchBox{
  height: 4.4rem;
  display: flex;
  justify-content: center;;
  align-items: center;
  width: 100%;
  background: #FFFFFF;
  .HsyAtSchoolSearchBg{
    width: 90%;
    border-radius: 2rem;
    background: #EFEFEF;
    height:72%;
    justify-content: space-between;
    display: flex;
    .HsyInputBox{
      width: 50%;
      height: 100%;
      display:flex;
      justify-content: center;
      align-items: center;
      color: #999999;
      .HsySearchInput{
        color: #999999;
        height: 80%;
        font-size: 1.2rem;
        margin-left: 2rem;
      }
    }
    .HsySearchRight{
      width:20%;
      height: 100%;
      display: flex;
      justify-content: center;;
      align-items: center;
      border-radius: 0 2rem 2rem 0;
      background: #D6D6D6;
      .HsySearchImg{
        width: 2rem;
        // background: red;
        height: 2rem;
      }
      span{
        font-size: 1.2rem;
        color: #FFFFFF;
      }
    }
    // HsySearchRight
  }
}
.HsyAtSchoolTitleBox{
  width: 100%;
  display: flex;
  background: #F7F7F7;
  align-items: center;
  color: #999999;
  height: 3.5rem;
  .HsyAtSchoolTitle{
    font-size: 1.2rem;
    margin-left: 1rem;
    color: #999999;
    flex: 1;
  }
  .HsyAtSchoolTitleImg{
    justify-content: center;
    align-items: center;
    img{
      width: 1.6rem;
      height: 1.6rem;
      padding-right: .3rem;
    }
    height: 100%;
    display: flex;
  }
  .HsyAtSchoolTitleDate{
    font-size: 1.2rem;
    height: 4.4rem;
    padding-right: 1rem;
    line-height: 4.4rem;
  }
}
.HsyAtSchoolListBox{
  display: flex;
  width: 100%;
  background: #FFFFFF;
  margin-bottom: 1rem;
  .HsyAtSchoolList{
    width:100%;
    display: flex;
    height: 8.4rem;
    // background: yellow;

    .HsyAtSchoolListBtn{
      width: 4.5rem;
      height: 100%;
      display: flex;
      // background: blue;
      justify-content: center;
      align-items: center;
      .HsyBtn{
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 2px solid #F7F7F7;
      }
      .HsyBtn2{
        background-image: url(../../hsyimg/dagou-shi.png);
        background-size:2rem 2rem;
      }
    }

    .HsyAtSchoolListContentBox{

      flex:1;

      // background: red;
      .HsyAtSchoolUserName{
        width: 100%;
        height: 2rem;
        // background: yellow;
        display: flex;
        align-items: center;
        margin-top: 1rem;
        font-size: 1.3rem;

      }
      .HsyAtSchoolMsg {
        width: 100%;
        // height: 50%;
        li{
          display: flex;
          height: 1.5rem;
          font-size: 1.2rem;

          align-items: center;
          letter-spacing: 0.5px;
          color:#999999;
          .HSykecheng{
            margin-left: 2rem;
          }
          img{
            width: 1.2rem;
            height: 1.2rem;
          }
        }
      }
    }
  }
}
.HsyAtSchoolBottomBox{
  display: flex;
  width: 100%;
  height: 4.5rem;
  background: #FFFFFF;
  .HsyAtSchoolBottomLeft{
    width: 50%;
    height: 100%;
    display: flex;

    align-items: center;
    .HsyAtSchoolBottomLeftBtnSum{
      margin-left: 1.5rem;
      font-size: 1.4rem;
      color: #666666;
    }
    .HsyAtSchoolBottomLeftBtn{
      width: 2rem;
      margin-left: 14%;
      height: 2rem;
      border-radius: 50%;
      border-radius: 50%;
      border: 2px solid #F7F7F7;

    }
    .HsyAtSchoolBottomLeftBtn2{
      background-image: url(../../hsyimg/dagou-shi.png);
      background-size:2rem 2rem;

    }
  }

  .HsyAtSchoolBottomRight{
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #27BCD5;
    span{
      font-size: 1.5rem;
      color: #FFFFFF;
      text-align: center;
    }
  }
  
}
</style>
