/*
 * @Author: fujihang
 * @Date: 2019-03-27 14:23:17
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-03 11:51:20
    历史备注
 */
<template>
<div id="fuHistory">
    <!-- <div class="contant_his" v-for="(item,index) in dataNew" :key="index">
        <div class="title">
            备注序号{{index + 1}}
        </div>
        <div class="contant">
            <div class="left">
                <div class="name">
                    {{item.Remark?item.Remark : '无'}}
                </div>
                <div class="time">
                    跟进时间：{{item.F_CreatorTime}}
                </div>
            </div>
            <van-icon name="arrow"  @click = "FNgofuRemarks(item.F_Id)"/>
        </div>
    </div> -->

    <div class="item" v-for="(item,index) in dataNew" :key="index" @click="FNgofuRemarks(item.F_Id)">
      <span class="weChat">
        学员微信：{{item.F_WeChat}}
      </span>
      <span class="time">
        跟进日期：{{item.F_CreatorTime.split(" ")[0]}}
      </span>
      <i class="icon">></i>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
          F_UserID:'',//这个id是接收过来的
          Id:'',
          code:'',
          dataNew:[],
          dataList:[]
        };
    },

    methods: {
      getData(){//获取数据
        var F_UserID = this.F_UserID
        this.postFN({
          url:'/Student/GetFollowUpList',
          data:{
            UserID:F_UserID
          }
        }).then(r=>{
          console.log(r)
          if(r.data.state == 'success'){
            if(r.data.data.length == 0){
              this.errFN('无数据')
            }else{
              var dataNew = r.data.data;
              this.dataNew = dataNew
              this.Id = r.data.F_Id
              console.log(dataNew)
            }
          }else{
            this.errFN('获取数据失败')
          }
        })
      },
      //前面路由传递参数
      getRouterData(){
        this.F_UserID = this.$route.params.F_UserID
      },
      // 点击前往fuRemarks
      FNgofuRemarks(F_Id){
        localStorage.setItem('fuHistoryid',F_Id);
        this.$router.push({
          name:'fuRemarks',
          params:{//这是传递的参数
            Id:F_Id
          }
        });
      },
      getLocalstorage(){
          this.F_UserID = localStorage.getItem('F_UserID');
      }
    },
    created:function(){
      this.getLocalstorage();
      this.getData();
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuHistory{
    padding: 1rem;
    padding-top: 2rem;
    box-sizing: border-box;
    .hO;.nC;
    .mRB;
    .hsyTop{
      position: relative;
      // height: 0rem;
      .goReturn{
        position: absolute;
        width: 2rem;
        height:2rem;
        background-size: 2rem 2rem;
        background-image: url("../../image/fuJiHang/goLeft.png");
      }

    }
    .contant_his{
        .bW;.mB;
        .title{
            .fBB;
            color: #27BCD5;
            padding: .5rem 1rem;
            font-size: 1.05rem;
        }
        .contant{
            padding: .5rem 1rem 1rem;
            .fBB;
            display: flex;
            align-items: center;
            .left{
                flex: 1;
                .name{
                    .Oline;
                    font-size: 1.2rem;
                    margin-bottom: .3rem;
                }
                .time{
                    color: #999;
                    font-size: 1.1rem;
                }
            }
        }
    }


    .item
    {
      position: relative;
      display: flex;
      height: 3.5rem;
      padding: 0 3rem 0 1rem;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      margin-bottom: 1rem;
      span
      {
        flex: 1;
      }
      .weChat
      {
        font-size: 1.2rem;
        color: #000;
      }
      .time
      {
        font-size: 1rem;
        text-align: right;
      }
      .icon
      {
        position: absolute;
        right: 1rem;
        top: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
      }
    }
}
</style>
