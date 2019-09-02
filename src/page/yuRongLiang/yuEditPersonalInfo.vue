<template>
    <div id="yuEditPersonalInfoWrapper">
        <div class="infoItem">
            <span class="infoText">头像</span>
            <div class="changeIcon">
                <!-- <img :src="userInfo.F_HeadIcon"/> -->
                <img :src="imgUrl"/>
                <span @click="show=true">
                    更换头像
                </span>
            </div>
            <van-popup v-model="show" position="bottom" :overlay="true" class="mark">
                <div class=" fuweixintouxiang" @click="userWeChathand">
                    微信头像
                </div>
                <div class="fubendixiangce">
                    <input type="file" class="getfile"  @change="postImg">
                    本地相册
                </div>
                <div class=" fucancel" @click='ifShow = false'>
                    取消
                </div>
            </van-popup>
        </div>
        <div class="infoItem">
            <span class="infoText">姓名<i class="redSpot">*</i></span>
            <input v-model="userInfo.F_NickName" placeholder="请输入姓名"/>
        </div>
        <div class="infoItem">
            <span class="infoText">性别</span>
            <input v-model="sex" readonly placeholder="请选择性别" @click="changeSex"/>
            <i class="triangle"></i>
            <van-popup v-model="ifShow" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirmSex"
                />
            </van-popup>
        </div>
        <div class="infoItem">
            <span class="infoText">手机号<i class="redSpot">*</i></span>
            <input v-model="userInfo.F_MobilePhone" placeholder="请输入手机号"/>
            <div class="VCodeBtn" @click="getVCode">获取验证码</div>
        </div>
        <div class="infoItem">
            <span class="infoText">验证码<i class="redSpot">*</i></span>
            <input v-model="VCode" placeholder="请输入验证码"/>
        </div>
        <div class="infoItem">
            <span class="infoText">微信</span>
            <input v-model="userInfo.F_WeChat" placeholder="请输入微信号"/>
        </div>
        <div class="infoItem">
            <span class="infoText">地址</span>
            <input v-model="address" placeholder="请输入地址" @click="changeAddress"/>
        </div>
        <van-popup v-model="isShowSelectArea" position="bottom">
            <van-area :area-list="areaList" :columns-num="3"  @confirm="onConfirm" :value="userInfo.AreaCode" @cancel="isShowSelectArea = false"/>
        </van-popup>

        <div class="saveBtn" @click="save">保存</div>
    </div>
</template>

<script>
import list from '@/page/huangShiYou/address/address.json'
export default {
    name:"yuEditPersonalInfoWrapper",
    data(){
        return{
            columns:[
                '男',
                '女'
            ],
            sex:"",
            show:false,
            areaList: {},
            isShowSelectArea: false,  //是否显示省市联动
            userInfo:{},
            VCode:"",
            address:"",
            // 转换图片为文件流
            imgStream:"",
            // 上传的图片名字
            imgName:'',
            // 展示用图片地址
            imgUrl:"",

            ifShow:false,
        }
    },
    methods:{
        // 获取验证码
        getVCode(){
            // 验证手机号
            this.getFN({
                url:"/Common/SendCode?phone="+this.userInfo.F_MobilePhone
            }).then((res)=>{
                console.log(res);
                if(res.data.state == "success")
                {
                    this.tipFN("验证码已成功发送，请留意查收");
                    setTimeout(()=>{
                        this.tipHFN();
                    },1000);
                }
                else
                {
                    this.errFN(res.data.message);
                }
            });
        },
        // 保存个人资料
        save(){
            if(this.sex == "男")
            {
                this.userInfo.Gender = true;
            }
            else
            {
                this.userInfo.Gender = false;
            }
            // 姓名验证
            if(this.userInfo.F_NickName == "")
            {
                this.errFN("请输入姓名");
                return;
            }
            // 手机号验证
            if(!(/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(this.userInfo.F_MobilePhone)))
            {
                this.errFN("请输入手机号！");
                return;
            }

            let param=new FormData();

            if(this.imgStream)
            {
                let img=this.convertBase64UrlToBlob(this.imgStream);
                param.append("FileUrl",img,this.imgName);
            }
            param.append("F_HeadIcon",this.imgUrl);
            param.append("F_Id",this.userInfo.F_Id);
            param.append("F_MobilePhone",this.userInfo.F_MobilePhone);
            param.append("F_NickName",this.userInfo.F_NickName);
            param.append("F_Gender",this.userInfo.Gender);
            param.append("code",this.VCode);
            param.append("F_WeChat",this.userInfo.F_WeChat);
            param.append("Province",this.userInfo.Province);
            param.append("ProvinceCode",this.userInfo.ProvinceCode);
            param.append("City",this.userInfo.City);
            param.append("CityCode",this.userInfo.CityCode);
            param.append("Area",this.userInfo.Area);
            param.append("AreaCode",this.userInfo.AreaCode);
            this.postFN({
                url:"/User/SaveUserInfo",
                data:param
            }).then((res)=>{
                if(res.data.state == "success")
                {
                    this.tipFN("编辑信息成功");
                    this.$router.push({path:"/yuPersonalInfo"});
                }
                else
                {
                    this.errFN(res.data.message);
                }
            });
        },
        // 初始化页面
        init(){
            this.userInfo = JSON.parse(window.localStorage.getItem("editUserInfo"));
            console.log(this.userInfo);
            this.address = this.userInfo.Province+this.userInfo.City+this.userInfo.Area;
            this.imgUrl = this.userInfo.F_HeadIcon;
            // 初始化地址
            if(this.address == 0)
            {
                this.address = "";
            }
            // 初始化性别
            if(this.userInfo.F_Gender)
            {
                this.sex = "男";
            }
            else
            {
                this.sex = "女";
            }
        },

        changeSex(){
            this.ifShow = true;
        },
        onConfirmSex(value){
            this.sex = value;
            this.ifShow = false;
        },

        changeAddress(){
            this.isShowSelectArea = true;
            this.address = this.userInfo.Province + this.userInfo.City + this.userInfo.Area;
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
            this.userInfo.Province = info[0].name
            this.userInfo.ProvinceCode = info[0].code
            this.userInfo.City = info[1].name
            this.userInfo.CityCode = info[1].code
            this.userInfo.Area = info[2].name
            this.userInfo.AreaCode = info[2].code
            this.address = this.userInfo.Province + this.userInfo.City + this.userInfo.Area;
            this.isShowSelectArea = false;
          }
        },

        //使用微信头像
        userWeChathand(){
            this.imgStream = "";
            this.imgUrl = this.userInfo.wxInfo.HeadIcon;
        //   var img = this.userInfo.wxInfo.HeadIcon;
        //   var F_Id = this.userInfo.F_Id;
        //   console.log(img,"图片");
        //   console.log(F_Id,'用户的Id');
        //   this.show = false;
        //   this.postFN({//本地使用请用hsy在url头
        //     url:'/User/SaveUserInfo?'+'F_ID ='+F_Id + '&F_HeadIcon=' + img,
        //     data:{

        //     }
        //   }).then(r=>{
              
        //     if(r.data.state == 'success'){
        //       this.okFN('使用微信头像成功')
        //       this.init();
        //     }else{
        //       this.errFN('使用微信头像失败')
        //     }
        //   })

        },

        // 获取图片
        postImg(e){
            // var F_Id = this.userInfo.F_Id;
            // let reader=new FileReader();
            // if(e.target.files[0].size>3*1024*1024) return this.notFN('图片不能超过3M哦！')
            // var Name=e.target.files[0].name
            // reader.readAsDataURL(e.target.files[0]);
            // reader.onload=(e)=>{
            //     this.yiLan = e.target.result
            //     let param = new FormData();
            //     let img=this.convertBase64UrlToBlob(this.yiLan);
            //     for(let i in this.userInfo){
            //         console.log(this.userInfo[i],'查看一下每一项');
            //         if(i=="FileUrl"||i=="F_ID") break;
            //         param.append(i,this.userInfo[i])
            //     }
            //     param.append("FileUrl",img,Name);
            //     param.append('F_ID',F_Id);
            //     this.tipFN('正在上传图片中...')
            //     this.postFN({
            //         url:'/User/SaveUserInfo',
            //         data:param
            //     }).then(r=>{
            //         this.tipHFN();
            //         if(r.data.state == 'success')
            //         {
            //             this.okFN('修改成功')
            //             this.init()
            //         }
            //         else
            //         {
            //             this.errFN('修改失败')
            //         }
            //         this.show = false
            //     })
            // }
            console.log(e.target.files[0],'图片上传的对象');
            let reader=new FileReader();
            this.imgName = e.target.files[0].name
            reader.readAsDataURL(e.target.files[0]);
            reader.onload=(ex)=>{
                this.imgStream = ex.target.result
                this.imgUrl = this.imgStream;
                console.log(ex,'图片上传后转化为dataURL');
            }
        },
    },

    created(){
        this.areaList = list;
        this.init();
    },
}
</script>

<style lang="less">
    #yuEditPersonalInfoWrapper
    {
        background-color: #f7f7f7;
        .infoItem
        {
            position: relative;
            display: flex;
            padding: 1rem 2rem;
            font-size: 1.2rem;
            border-bottom: 1px solid #f7f7f7;
            background-color: #fff;
            &:first-of-type
            {
                height: 3rem;
                line-height: 3rem;
            }
            .infoText
            {
                margin-right: 1rem;
                display: inline-block;
                width: 5rem;
                .redSpot
                {
                    transform: translate(.5rem,-.5rem);
                    display: inline-block;
                    color: red;
                    font-size: .8rem;
                }
            }
            input
            {
                flex: 1;
            }
            .triangle
            {
                position: absolute;
                width: 0;
                height: 0;
                border: .5rem solid transparent;
                border-top: 1rem solid gray;
                right: 2rem;
                top: 1.3rem;
            }
            .changeIcon
            {
                display: flex;
                justify-content: space-between;
                flex: 1;
                img
                {
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                }
                span
                {
                    display: flex;
                    color: #999999;
                    text-decoration: underline;
                    position: relative;
                    justify-content: space-between;
                }
                .uploadImg
                {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }

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

            .VCodeBtn
            {
                padding-right: .5rem;
                padding-left: .5rem;
                height: 2rem;
                line-height: 2rem;
                border-radius: 2rem;
                position: absolute;
                right: 2rem;
                top: 0;
                bottom: 0;
                margin: auto;
                color: #fff;
                background-color: #65cade;
            }
        }

        .saveBtn
        {
            background-color: #27bbd5;
            color: #fff;
            text-align: center;
            height: 4rem;
            line-height: 4rem;
            margin-top: 3rem;
            font-size: 1.5rem;
        }
    }

</style>
