/*
 * @Author: fujihang
 * @Date: 2019-03-22 11:26:01
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 21:24:01
    我的资料
 */
<template>
<div id="fuMyData">
    <!-- 信息卡  http://localhost:8080/#/fuMyData-->
    <div class="bW">
        <div :class="['MyList',item.img?'pd':'']" v-for="(item,index) in myList" :key="index" @click="changeFN(index,item.val)">
            <span class="name">
                {{item.name}}
            </span>
            <span class="val" v-show="index!=2">
                <span v-show="index!=0">{{item.val}}</span>
                <div class="img" v-show="item.img">
                    <!-- <input class="file" type="file"> -->
                    <img  :src="item.val">
                </div>

            </span>
            <span class="val" v-show="index==2">
                {{item.val?'男':"女"}}
            </span>
            <van-icon name="arrow" />
        </div>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="true" class="mark">
      <div class=" fuweixintouxiang" @click="userWeChathand">
        微信头像
      </div>
      <div class="fubendixiangce">
        <input type="file" class="getfile"  @change="postImg">
        本地相册
      </div>
      <div class=" fucancel" @click='show = false'>
        取消
      </div>
    </van-popup>
    <!-- <div class="mark2">

    </div> -->

   <!-- <van-area :area-list="areaList" :columns-num="2" title="标题" /> -->
    <!-- 男女 -->
    <van-actionsheet
        v-model="showSex"
        :actions="sexVal"
        @select="onSexFN"
    />
    <!-- /下面是省市联动框/ isShowSelectArea控制是否展示-->
    <van-popup v-model="isShowSelectArea" position="bottom">
      <van-area :area-list="areaList" :columns-num="3"  @confirm="onConfirm"  @cancel="isShowSelectArea = false"/>
    </van-popup>
    <!-- <van-area :area-list="areaList" /> -->
</div>
</template>

<script>
// /'hsy/User/SaveUserInfo?F_Id='+ this.F_id  接口和参数,参数传递过去的参数名是跟原来拿到的参数名是一样的,只是必须加一个用户id
import list from '@/page/huangShiYou/address/address.json'
export default {
    data(){
        return {
          isShowSelectArea: false,  //是否显示省市联动
          areaList: {},
          show:false,
          nowData:{},
          yiLan:'',
            myList:[
                {
                    name:'头像',
                    img:true,
                    data:'F_HeadIcon'
                },
                {
                    name:"姓名",
                    val:"",
                    data:'F_NickName'
                },
                {
                    name:"性别",
                    val:"请选择",
                    data:'F_Gender'
                },
                {
                    name:"手机",
                    val:"",
                    data:'F_MobilePhone'
                },
                {
                    name:"常住地址",
                    val:"",
                    data:'Province'
                },
            ],//资料列表
            showSex:false,//修改性别弹窗
            sexVal:[
                {
                    name:'男',
                },
                {
                    name:'女',
                },
            ],//修改性别弹窗

        };
    },

    methods: {
        // 修改方法
        changeFN(index,val){
          console.log(index)
            switch(index){
                case 1 :
                    this.$router.push({path:"/fuChange?name=修改名字"+"&val="+val+ "&F_id="+ this.nowData.F_Id})
                break;
                // case 2:
                //     this.showSex=true
                // break;
                case 3 :
                    this.$router.push({path:"/fuChange?name=修改手机"+"&val="+val})
                break;
                case 0:
                this.show = true;
                break;
                case 4 :
                console.log('点击地址')
                this.isShowSelectArea = true
                break;
            }
        },
        onConfirm (info) {
          if (info[0].code === '-1') {
            this.$toast({
              type: 'fail',
              message: '请选择省',
              position: 'bottom',
              duration: 1000
            })
          } else if (info[1].code === '-1') {
            this.$toast({
              type: 'fail',
              message: '请选择市',
              position: 'bottom',
              duration: 1000
            })
          } else if (info[2].code === '-1') {
            this.$toast({
              type: 'fail',
              message: '请选择区',
              position: 'bottom',
              duration: 1000
            })
          } else {
            // this.province = info[0].name
            // this.provinceCode = info[0].code
            // this.city = info[1].name
            // this.cityCode = info[1].code
            // this.country = info[2].name
            // this.countryCode = info[2].code

            this.postFN({//本地使用请用hsy在url头
              url:'/User/SaveUserInfo?'+'F_ID ='+this.nowData.F_Id
                  + '&ProvinceCode=' + info[0].code
                  + '&Province=' + info[0].name
                  + '&City=' + info[1].name
                  + '&CityCode=' + info[1].code
                  + '&Area=' + info[2].name
                  + '&AreaCode=' + info[2].code
            }).then(r=>{
              this.isShowSelectArea = false
              if(r.data.state == 'success'){
                this.okFN('修改成功')
                this.getData();
              }else{
                this.errFN('修改失败，请刷新页面重试!')
              }
            })
          }
        },
        //使用微信头像
        userWeChathand(){
          var img = this.nowData.wxInfo.HeadIcon;
          var F_Id = this.nowData.F_Id;
          this.show = false;
          this.postFN({//本地使用请用hsy在url头
            url:'/User/SaveUserInfo?'+'F_ID ='+F_Id + '&F_HeadIcon=' + img
          }).then(r=>{
            if(r.data.state == 'success'){
              this.okFN('使用微信头像成功')
              this.getData();
            }else{
              this.errFN('使用微信头像成功')
            }
          })
        },
        // 修改性别
        onSexFN(item){
          console.log(item.name)
            if(item.name=='男') this.myList[2].val=true
            else this.myList[2].val=false
            
            this.showSex=false
        },
        getData(){
          // this.tipFN();
          // console.log(address)
          this.getFN({
            // url:'/hsy/user/GetUserInfo',
            //打包使用下面,做的时候用上面
            url:'/user/GetUserInfo',
          }).then(r =>{
            // this.tipHFN();
            let data=r.data.data;
            this.nowData = data
            for(let i=0;i<this.myList.length;i++){
              this.myList[i].val=data[this.myList[i].data]
            }
            this.myList[4].val = data.Province + data.City
          })
        },
        // 获取图片
      postImg(e){
        var F_Id = this.nowData.F_Id;
        let reader=new FileReader();
        if(e.target.files[0].size>3*1024*1024) return this.notFN('图片不能超过3M哦！')
        var Name=e.target.files[0].name
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(e)=>{
        this.yiLan = e.target.result
        let param = new FormData();
        let img=this.convertBase64UrlToBlob(this.yiLan);
        for(let i in this.nowData){
          if(i=="FileUrl"||i=="F_ID") break;
          param.append(i,this.nowData[i])
        }
        param.append("FileUrl",img,Name);
        param.append('F_ID',F_Id);
        this.tipFN('正在上传图片中...')
        this.postFN({
          url:'/User/SaveUserInfo',
          data:param
        }).then(r=>{
          this.tipHFN();
          if(r.data.state == 'success'){
            this.okFN('修改成功')
            this.getData()
          }else{
            this.errFN('修改失败')
          }
          this.show = false
        })
      }
      },
    },
    
    created(){
      this.areaList = list ;
      this.getData()
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuMyData{
    .mRB;.nC;
    position: relative;
    height: 100%;

    .mark{
      width: 100%;
      div{
        height: 4.4rem;
        width: 100%;
        text-align: center;
        line-height: 4.4rem;
        font-size: 1.8rem;
        background: #F5F5F5;
      }
      .fuweixintouxiang{
        color: #333333;

      }
      .fubendixiangce{
        position: relative;
          color: #333333;
          .getfile{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
          }
      }
      .fucancel{
        color: #999999;
      }
    }
    .MyList{
        padding: 1rem 1rem 1rem 0;
        margin-left: 1rem;
        .fBB;
        .bBS;
        display: flex;
        align-items: center;
        .name{
            flex: 1;
            font-size: 1.25rem;
            font-weight:650;
        }
        .val{
            font-size: 1.15rem;
            color: #999;
            margin-right: .6rem;
            .img{
                position: relative;
                .file{
                    position: absolute;
                    height: 4rem;
                    width: 4rem;
                    opacity: 0;
                }
                >img{
                    height: 4.5rem;
                    width: 4.5rem;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }
        }
    }
    //缩小padding
    .pd{
        padding: .6rem 1rem .6rem 0;
    }
}
</style>
