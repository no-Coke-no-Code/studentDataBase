/*
 * @Author: fujihang
 * @Date: 2019-03-22 17:59:34
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-22 18:00:02
 
 该页面放弃

 */
<template>
<div id="hsytwo">
  <div class="topMsg2">
    <div class="topMsg2Id">
      <!-- <div class="userHand2"> -->
        <img src="../../hsyimg/touxiang.png" alt="" class="userHand2">
      <!-- </div> -->
      <div class="userName2">
        李孝利
      </div>
      <div class="userTitle2">
        老板
      </div>

    </div>
    <div class="topMsg2Day2">
      <ul>
        <li>今日</li>
        <li>昨日</li>
        <li>近7日</li>
      </ul>

    </div>
    <!-- <div class="topMsg2Mon">
      2019/12/04
    </div> -->
    <div class="topMsg2Num">
      <ul>
        <li>130</li>
        <li>1304</li>
        <li>12</li>
        <li>12</li>
        <li>12</li>
      </ul>
    </div>
    <div class="topMsg2Tip" >
      <ul>
        <li v-on:click = "das">添加微信量</li>
        <li>超出量</li>
        <li>成交量</li>
        <li>下期到校</li>
        <li>跟进人数</li>
      </ul>
    </div>

  </div>
  <div class="dayReport2">
    <div class="dayReport2Title">
      <li>今日汇报</li>
    </div>
    <div class="dayReport2List">
      <div class="ListConter">
        组员李明明 与 学员王超促成一笔1999元订单
      </div>
      <div class="ListDay2">
        2019/02/19
      </div>
      <div class="clr2">

      </div>
    </div>
    <div class="dayReport2List">
      <div class="ListConter">
        组员李明明 与 学员王超促成一笔1999元订单
      </div>
      <div class="ListDay2">
        2019/02/19
      </div>
      <div class="clr2">

      </div>
    </div>

  </div>
  <div class="setTarget-box">
    <div class="setTarget">

    </div>
  </div>

</div>
</template>

<script>
export default {
    data(){
        return {

        };
    },

    methods: {

    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#hsytwo{
  background:rgba(247,247,247,1);
}
.setTarget-box{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}
.setTarget{
     width: 10rem;
     height: 10rem;
     background-image: url("../../hsyimg/home_big_2.png");
     background-size: 10rem 10rem;
     margin-top: 10%;
     border-radius: 50%;
}

.topMsg2{
     width: 100%;
     position: relative;
     height:12.75rem;
     background: rgba(39,188,213,1);
}
.topMsg2Id{
  width:14rem;
  height: 10rem;
  // background: red;
  position: absolute;

}
.userHand2{
  width: 6rem;
  height: 6rem;
  position: absolute;
  border-radius: 50%;
  background: yellow;
  left: 10%;
  top: 10%;
}
.userName2{
    width: 5rem;
    height: 2rem;
    font-size: 1.5rem;
    // background: black;
    color: #FFFFFF;
    position: absolute;
    left: 62%;
    top: 20%;
}
.userTitle2{
  width: 4rem;
  height: 1.5rem;
  font-size: 1rem;
  line-height: 1.6rem;
  text-align: center;
  // background: black;
  color: #27BCD5;
  background: #FFFFFF;
  border-radius: 3rem;
  position: absolute;
  left: 62%;
  top: 50%;

}
.topMsg2Day2{
  width: 20%;
  display: flex;
  height: 2.00rem;
  // background: red;
  position: absolute;
  right: 1rem;
  top:2rem;
  right: 3rem;

  // line-height: 100%;
}
.topMsg2Day2 li{
  // flex-grow: 1;
  width: 3rem;

}
.topMsg2Day2 ul{
  display: flex;
  justify-content: space-between;
  color: rgba(255,255,255,1);

}

.topMsg2Day2 ul li :nth-child(1){
  background: rgba(255,255,255,1);
  color: rgba(39,188,213,1);

}
.topMsg2Num ul ,.topMsg2Tip ul{
  display: flex;
  justify-content: space-between;
}
.topMsg2Num ul li,.topMsg2Tip ul li{
  width: 20%;
  // flex-grow: 1;
  text-align: center;
  color: rgba(255,255,255,1);

}
.topMsg2Num {
  position: relative;
  top:8rem;
}
.topMsg2Tip{
  position: relative;
  top:8.4rem;
}
.dayReport2Title{
  width: 100%;
  // background: yellow;
  height: 4.5rem;
  margin-top: 10px;
  line-height: 4.5rem;
  border-bottom: 1px solid rgba(247,247,247,1);;
}
.dayReport2Title li {
  list-style: none;
  margin-left: 3.5rem;
  font-size:18px;
  color: #7AD6E5;
}
.dayReport2List{
  height: 4.4rem;
  padding-top: 16px;
  margin-top: 1px;
  color: #666666;
  position: relative;
  border-bottom: 1px solid #f7f7f7;
  background: rgba(255,255,255,1);
}
.ListConter , .ListDay2{
  margin-left: 4rem;
  // color: #7AD6E5;

}
.ListConter{
  // margin-top: 2rem;
  // padding-top:
}
.clr2{
  background: #e69d7d;
position: absolute;
top: 29px;
border-radius: 50%;
width: 6px;
height: 6px;
left: 33px;
}
.topMsg2Mon{
  width: 19%;
  height: 2.00rem;
  // background: red;
  color: rgba(255,255,255,1);
  position: absolute;
  right: 1rem;
  display: flex;
  top:2rem;
}
.dayReport2{
  width: 100%;
  background:rgba(255,255,255,1);
  // position: re

}
.setTarget2{
     width: 10rem;
     height: 10rem;
     background-image: url("../../hsyimg/home_big_2.png");
     top: 80%;
     position: fixed;
     left: 50%;
     margin: -5rem 0 0 -5rem;
     border-radius: 50%;
}

#app #appContext{
      background: rgba(247,247,247,1);
}

</style>
