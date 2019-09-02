/*
 * @Author: fujihang
 * @Date: 2019-03-19 15:16:20
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 12:55:43
 */
<template>
<div id="HsyCrewMsg">
  <div class="HsyCrewMsgTop">
    <div class="HsyHsyCrewMsgTopHand">
      <img src="../../hsyimg/people.png" >
    </div>
    <div class="HsyCrewMsgTop2">
      <div class="HsyMsgTopLeft">
        <ul>
          <li v-for="(item,index) in studentData" :key="index"> {{item.name}} </li>
        </ul>
      </div>

      <div class="HsyMsgTopRight">
        <ul>
          <li v-for="(item, index) in studentData"  :key="index">{{item.msg}}</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="HsyCrewMsgMiddle">
    <div class="HsyCrewMsgMiddle2">
      <div class="HsyMiddleLeft">
        <ul>
          <li v-for="(item,index) in department"  :key="index"> {{item.name}}</li>
        </ul>
      </div>

      <div class="HsyMiddleRight">
        <ul>
          <li v-for="(item,index) in department"  :key="index">{{item.msg}} {{item.time}}</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="HsyCrewMsgBottom">
    <div class="HsyCrewMsgBottom2">
      <div class="HsyCrewBottomLeft">
        <ul>
          <li v-for="(item,index) in information"  :key="index"> {{item.name}}</li>
        </ul>
      </div>
      <div class="HsyCrewBottomRight">
        <ul>
          <li v-for="(item,index) in information"  :key="index"> {{item.msg}}</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    data(){
        return {
          userInfo:JSON.parse(localStorage.getItem("userInfo")),
          studentData:[
            {
              name:"学生姓名",
              msg:"李孝利"
            },
            {
              name:"职位",
              msg:"客服老师"
            },
            {
              name:'工号',
              msg:10086
            },
            {
              name:'手机号码',
              msg:1355555555
            }
          ],
          department:[
            {
              name:'所属部门:',
              msg:'A组'
            },{
              name:'入职时间:',
              msg:"2019/12/01",
              time:'19:00:00'
            }
          ],
           information:[
             {
               name:'添加微信: ',
               msg:'A组'
             },
             {
               name:'有效信息人数:',
               msg:'A组'
              },
              {
                name:'锁定人数:',
                msg:'600'
              },
              {
                name:'目前跟进:',
                msg:'600'
              },
              {
                name:'释放人数:',
                msg:'60x的说法付付付付付付付付付付付付付付付付付付付付付付付付cv0'
              },
              {
                name:'促成订单量:',
                msg:'600'
              },
              {
                name:'已到校人数:',
                msg:'600'
              }
           ]



        };
    },

    methods: {
        getData(){
          this.postFN({
            url:"/Student/GetTeacherInfo",
            data:{
              // UserID:'55A7675B-5241-4570-902C-619D02717517'
              UserID:this.userInfo.wxInfo.UserId,
            }
          }).then(r=>{
            console.log(r)
          })
      }
    },
    created:function(){
      this.getData();
    }
}

</script>


<style lang='less'>
#app{
  background: #f7f7f7;
}
#HsyCrewMsg{
  width: 100%;
  justify-content: center;
  .HsyCrewMsgTop{
    margin: 0 auto;
    width: 90%;
    position: relative;
    background: #FFFFFF;
    .HsyHsyCrewMsgTopHand{
      height: 8rem;
      margin: 0 auto 1rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
      height:  5rem;
      width: 5rem;

      }
    }
    .HsyCrewMsgTop2{
      display: flex;
      width: 80%;
      margin: 0 auto;
      border-bottom: 1px dashed #E5E5E5;
      .HsyMsgTopLeft{
        width: 50%;
        padding-right: 2rem;
        li{
          // height: 2.5rem;
          font-size: 1.3rem;
          line-height: 2.5rem;
          color: #666666;
        }
        text-align: right;
      }
      .HsyMsgTopRight{
        li{
          height: 2.5rem;
          font-size: 1.3rem;
          line-height: 2.5rem;
          color: #999999;
        }
        width: 50%;
        margin-bottom: 1rem;
      }

    }


  }
  .HsyCrewMsgMiddle{
    margin: 0 auto;
    display: flex;
    background: #FFFFFF;
    width: 90%;
    .HsyCrewMsgMiddle2{
      // margin-top: 2rem;
      width: 80%;
      border-bottom: 1px dashed #E5E5E5;
      margin: 2rem auto;
      display: flex;
      .HsyMiddleLeft{
        width: 50%;
        padding-right: 2rem;
        font-size: 1.3rem;

        text-align: right;
        li{
          height: 2.5rem;
          font-size: 1.3rem;
          line-height: 2.5rem;
          color: #666666;
        }
      }
      .HsyMiddleRight{
        width: 50%;
        font-size: 1.3rem;
        margin-bottom: 1rem;
        li{
          width: 120%;
          height: 2.5rem;
          font-size: 1.3rem;
          line-height: 2.5rem;
          color: #999999;
        }
      }
    }
  }
  .HsyCrewMsgBottom{
    width: 90%;
    background: #FFFFFF;
    display: flex;
    margin: 0 auto;
    .HsyCrewMsgBottom2{
      width: 80%;
      display: flex;
      margin: 0 auto;
      // border-bottom: 1px dashed #E5E5E5;
      .HsyCrewBottomLeft{
        width: 50%;
        // background: red;
        // height: 10rem;
        text-align: right;
        padding-right: 2rem;
        li{
          height: 2.5rem;
          font-size: 1.3rem;
          line-height: 2rem;
          color: #666666;
        }
      }
      .HsyCrewBottomRight{
        width: 50%;
        margin-bottom: 1rem;
        // background: yellow;
        // height: 10rem;
        li{
          // width: 110%;
          // height: 2.5rem;
          font-size: 1.3rem;
          line-height: 2.5rem;
          color: #999999;
        }
      }
    }
  }
}
html{
  // font-size: 12px;
}
</style>
