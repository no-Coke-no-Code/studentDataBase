/*
 * @Author: fujihang
 * @Date: 2019-03-19 15:16:20
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-11 20:25:42
    组员列表
 */
<template>
<div id="HsyCrew">
  <div class="HsySearchBox">
    <div class="HsySearchBg">
      <div class="HsyInputBox">
        <input type="text" v-model="seach" placeholder="请输入学员/课程名称" class="HsySearchInput">
      </div>
      <div class="HsySearchRight">
        <img src="../../hsyimg/icon_search.png" alt="" class="HsySearchImg">
        <span @click="getData(true)">查询</span>
      </div>
    </div>
  </div>

  <div class="HsyTitle">
    <span>组员列表</span>
  </div>

  <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
    >


      <div class="HsyCrewList" v-for="(item,index) in dataList" :key="index">
        <div class="HsyCrewHand">
          <img :src="item.F_HeadIcon" alt="">
        </div>
        <div class="HsyCrewListBox">
          <ul>
            <li class="HsyCrewName">{{item.F_NickName?item.F_NickName:'无'}}<span>{{item.UDID?item.UDID:'无'}}(员工)</span> </li>
            <li> <img src="../../hsyimg/phone.png" > <span>手机:</span> <span>{{item.F_MobilePhone?item.F_MobilePhone:'无'}}</span></li>
            <li><img src="../../hsyimg/teach.png" ><span>专属部门 :</span> <span>{{item.department?item.department:'无'}}</span></li>
            <li> <img src="../../hsyimg/teach.png" > <span>入职时间 :</span> <span>{{item.F_CreatorTime?item.F_CreatorTime:'无'}}</span></li>
          </ul>
        </div>
        <div class="HsyCrewListRight" @click="toFN(item.F_Id)">
          <img src="../../hsyimg/HsyRight.png" alt="">
        </div>
      </div>

    </van-list>
  



  
</div>
</template>

<script>
export default {
    data(){
        return {
          loading:false,//加载状态
          finished:false,//加载完成
          page:1,//页数
          dataList:[],//数据
          seach:'',//搜索
          userInfo:JSON.parse(localStorage.getItem("userInfo")),

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
                url:'/Student/GetTeacherList',
                data:{
                    // UserID:'7AAFA442-F458-4935-A9DC-C5D8EE951D60',
                    UserID:this.userInfo.wxInfo.UserId,
                    Name:this.seach?this.seach:null,
                    rows:10,
                    page:this.page
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
                    this.notFN('获取组员列表失败！')
                }
            })
        },
        // 跳转
        toFN(id){
          this.$router.push({path:"/fuCrewInfor?id="+id})
        }

    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#HsyCrew{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  .HsySearchBox{
    height: 3.5rem;
    display: flex;
    justify-content: center;;
    align-items: center;
    width: 100%;
    background: #FFFFFF;
    .HsySearchBg{
      width: 90%;
      border-radius: 2rem;
      background: #EFEFEF;
      height:70%;
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
          width: 1.5rem;
          // background: red;
          height: 1.5rem;
          margin-right: .2rem;
          object-fit: cover;
        }
        span{
          font-size: 1.2rem;
          color: #FFFFFF;
        }
      }
      // HsySearchRight
    }
  }
  // HsySearchBox
  .HsyTitle{
    width: 100%;
    height: 2.5rem;
    display: flex;
    // justify-content: center;
    align-items: center;
    span{
      margin-left: 5%;
      font-size: 1.2rem;
      color:#999999;
    }
  }
  .HsyCrewList{
    width: 100%;
    padding: .5rem 0;
    box-sizing: border-box;
    background: #FFFFFF;
    display: flex;
    align-items: center;

    .HsyCrewHand{
      display: flex;
      width: 7rem;
      height: 100%;
      justify-content: center;
      // align-items: center;
      // background: blue;
      img{
        width: 4.5rem;
        height: 4.5rem;
        background: yellow;
        object-fit: cover;
        border-radius: 50%;

      }
    }

    .HsyCrewListBox{
      flex: 1;
      height:90%;
      // background: yellow;
      li{
        align-items: center;
        height: 1.5rem;
        display: flex;
        // line-height: 1.7rem;
        font-size: 1.1rem;
        color: #999999;
        span{
          margin-left: 0.5rem;
        }
        img{
          width:1rem;
          height: 1.3rem;
        }
      }
      .HsyCrewName{
        height: 2rem;
        color: #333333;
        font-size: 1.2rem;
        font-weight: 650;
        margin-bottom: .3rem;
        span{
          color: #27BCD5;
          margin-left: 1rem;
          font-size: 1.1rem;
        }
      }

    }
    .HsyCrewListRight{
      width: 3rem;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      opacity: .5;
      img{
        width: 0.8rem;
        height: 1rem;
        opacity: .5;
      }
      // background: blue;
    }

  }
  .van-list{
    flex: 1;
    .fBB;
    overflow: auto;
  }
}

</style>
