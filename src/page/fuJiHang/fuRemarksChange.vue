/*
 * @Author: fujihang
 * @Date: 2019-03-27 09:51:40
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 15:21:57
    跟进备注修改
 */
<template>
<div id="fuRemarksChange">

    <!-- 导航条 -->
    <navBarTow name="跟进备注" btn="true"></navBarTow>
    <div class="his" @click = "FNgoHistoryRemarks()">
        历史备注
    </div>

    <div class="contant_Change">
        <!-- 学员信息 -->
        <!-- <div class="student student_remark">
            <div class="list" v-for="(item,index) in student" :key="index">
                <span class="name" >
                    {{item.name}}
                </span>
                <span class="val" v-show="index!=0&&index!=3">
                    {{item.val?item.val:'无'}}
                </span>
                <div class="input" v-show="index==0||index==3">
                    <input v-model="item.val" >
                </div>

            </div>
            <div class="border"></div>
        </div>

        <div class="remark student_remark">
            <div class="list" v-for="(item,index) in remark" :key="index">
                <span class="name">
                    {{item.name}}
                </span>
                <span class="val" v-show="index!=2">
                    {{item.val?item.val:'无'}}
                </span>
                <textarea class="texarea"  v-model="item.val" v-show="index==2"></textarea>
            </div>
            <div class="border"></div>
        </div> -->

        <div class="mainWrapper">
            <div class="item">
                <span class="itemName">学员姓名：</span>
                <!-- <span class="itemContent">{{remarksItem.Name}}</span> -->
                <input placeholder="请输入真实姓名" class="itemInput" v-model="remarksItem.Name"/>
            </div>
            <div class="item">
                <span class="itemName">性别：</span>
                <van-radio-group v-model="gender">
                    <van-radio name="true">男</van-radio>
                    <van-radio name="false">女</van-radio>
                </van-radio-group>
            </div>
            <div class="item">
                <span class="itemName">微信账号：</span>
                <span class="itemContent">{{remarksItem.WeChat?remarksItem.WeChat:"无"}}</span>
            </div>
            <div class="item">
                <span class="itemName">手机号码：</span>
                <!-- <span class="itemContent">{{remarksItem.Phone}}</span> -->
                <input placeholder="请输入手机号" class="itemInput" v-model="remarksItem.Phone"/>
            </div>

            <div class="border"></div>

            <div class="item">
                <span class="itemName">指派人：</span>
                <input readonly v-model="remarksItem.AssignName"/>
            </div>
            <div class="item">
                <span class="itemName">认领时间：</span>
                <input readonly v-model="remarksItem.AssignDate"/>
            </div>
            <div class="item">
                <span class="itemName">其他备注：</span>
                <textarea rows="4" class="textArea" v-model="remarksItem.Remark" placeholder="请填写备注"></textarea>
            </div>

            <div class="border"></div>

            <!-- 上传附件 -->
            <div class="Enclosure" ref="Enclosure">
                <div class="imgList">

                </div>
                <div class="inputWrapper">
                    <img :src="yiLan">
                    <input type="file" id="file" class="file" @change="postImg" ref='imgPost'>
                </div>
            </div>
            <div class="fujian">附件</div>

        </div>

    </div>


    <!-- 保存 -->
    <van-button @click="submit">
        保存
    </van-button>
</div>
</template>

<script>
import navBarTow from '../../public/navBarTow'
export default {
    components:{
        navBarTow,
    },
    data(){
        return {
            imgList:[],
            imgBoldList:[],
            imgUrlList:[],
            remarks:"",
            gender:"",
            remarksItem:{},
            imgE:null,
             yiLan:require('../../image/fuJiHang/addFU.svg'),
          F_UserID:this.$route.query.userId,//这是当前所需的F_UserID,也是下个页面需要的F_UserID
          // UserId:'197601E3-4732-44FF-9760-AABAB47E9735',
            student:[
                {
                    name:'学员姓名：',
                    val:'',
                    data:'Name',
                },
                {
                    name:'生日：',
                    val:'',
                    data:'Birthday'
                },
                // {
                //     name:'职位：',
                //     val:'学生',
                //     data:''
                // },
                {
                    name:'微信账号：',
                    val:'',
                    data:'WeChat'
                },
                {
                    name:'手机号码：',
                    val:'',
                    data:'Phone'
                },
                // {
                //     name:'年收入：',
                //     val:'3k-5k',
                // },
            ],//学员信息
            remark:[
                {
                    name:'指派人：',
                    val:'',
                    data:'AssignName'
                },
                {
                    name:'认领时间：',
                    val:'',
                    data:'AssignDate'
                },
                {
                    name:'其他备注：',
                    // val:'对xx学校的美甲课程非常感兴趣，因此报名意愿很大，附微信交流截图',
                    val:'',
                    data:''
                },
            ],//指派人
        };
    },
    methods: {
        // 获取数据
      getData(){
        var F_UserID = this.F_UserID;

          this.postFN({
            url:'/Student/GetFollowUpInfo',
            data:{
                UserId:F_UserID
                //用户id
              }
          }).then(r=>{
            if(r.data.state == 'success'){
                localStorage.setItem('F_UserID',F_UserID)
                //成功拿到数据后直接把ID存本地
                let data=r.data.data
                this.remarksItem = data;
            }else{
              this.errFN('获取数据失败')
            }
          })
      },
    // 获取图片
    postImg(e){
        if(this.imgUrlList.length == 6)
        {
            alert("最多上传六张图片");
            return;
        }
        let reader=new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(e)=>{
            // this.yiLan=e.target.result
            this.imgUrlList.push(e.target.result);
            let img = document.createElement("img");
            img.src = e.target.result;
            // this.$refs['Enclosure'].appendChild(img);
            document.getElementsByClassName("imgList")[0].appendChild(img);
        }
        this.imgList.push(e);
        this.imgE=e
        
    },

    //   提交
      submit(){
        if(!(/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(this.remarksItem.Phone))) return this.notFN("请输入正确的手机号")
        if(this.imgE==null||this.imgE==undefined) return this.notFN("请选择上传图片")
        if(this.gender == "")
        {
            this.notFN("请选择性别");
            return;
        }
        let param=new FormData();
        for(let i = 0;i<this.imgUrlList.length;i++)
        {
            let img = this.convertBase64UrlToBlob(this.imgUrlList[i]);
            param.append("FileUrl"+(i+1),img,this.imgList[i].target.files[0].name)
        }
        param.append("Remark",this.remarksItem.Remark)
        param.append("F_UserID",this.F_UserID)
        param.append("Name",this.remarksItem.Name)
        param.append("Phone",this.remarksItem.Phone)
        param.append("gender",this.gender);
        this.tipFN()
        this.postFN({
          url:'/Student/SubmitFollowUpInfo',
          data:param
        }).then(r=>{
        this.tipHFN()
          if( r.data.state == 'success'){
            this.okFN('跟进提交成功');
            this.$router.push({path:'/fuHistory'});
          }else{
            this.errFN('提交失败')
          }
        })
      },
      
      //跳转路由到历史记录
      FNgoHistoryRemarks(){
        var F_UserID =  this.F_UserID;
        this.$router.push({
          name:'fuHistory',
          params:{//这是传递的参数
            F_UserID:F_UserID
          }

        });
      },
      getLocalstorage(){
        if(this.F_UserID){
          return
        }else{
            this.F_UserID = localStorage.getItem('F_UserID');
        }
        // this.F_Remark = localStorage.getItem('F_Remark');
      }
    },
    created:function(){
       this.getData();
       this.getLocalstorage();
    }
}
</script>

<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuRemarksChange{
    .mRB;.nC;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    // 历史备注
    .his{
        position: absolute;
        top: 1.2rem;
        right: 1rem;
        font-size: 1.15rem;
    }
    .contant_Change{
        .fBB;
        flex: 1;
        padding: 1rem;
        overflow: auto;
    }
    // 学员信息
    .student_remark{
        .bW;
        padding: .5rem 3rem 0;
        .fBB;
        .list{
            display: flex;
            align-items: baseline;
            padding: .5rem 0;
            >span{
                display: block;
                flex: 1;
            }
            .name{
                height: 100%;
                font-size: 1.2rem;
                text-align: right;
                margin-right: 2rem;
            }
            .val{
                color: #999;
                font-size: 1.1rem;
            }
            .input{
                .mRB;
                .fBB;
                font-size: 1.1rem;
                padding: .5rem .5rem;
                color: #999;
                width: calc(50% - 1rem);
            }
            .texarea{
                .mRB;
                .fBB;
                font-size: 1.1rem;
                padding: .5rem .5rem;
                color: #999;
                width: calc(50% - 1rem);
            }

        }
        .border{
            margin-top: .5rem;
            border-bottom: 1px dashed rgb(212, 212, 212);
        }

    }
    .fujian{
        font-size: 1.1rem;
        background: #fff;
        padding-bottom: 1rem;
        text-align: center;
    }
     // 附件
    .Enclosure{
        .bW;
        position: relative;
        padding: 1rem 0 0;
        text-align: center;
        .imgList
        {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 1rem;
            >img{
                object-fit: contain;
                width: 18%;
                height: 7.5rem;
                margin-right: 1rem;
                margin-left: 1rem;
            }
        }
        .inputWrapper
        {
            width: 7.5rem;
            height: 7.5rem;
            margin: 0 auto;
            position: relative;
            img
            {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
            .file{
                opacity: 0;
                width: 100%;
                height: 100%;
            }
        }
    }

    // 保存
    .van-button{
        .fBMRB;
        color: white;
    }


    .mainWrapper
    {
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
        padding-top: 2rem;
        .item
        {
            display: flex;
            margin-bottom: 1rem;
            font-size: 1.2rem;
            padding: 0 2rem;
            .itemName
            {
                display: inline-block;
                width: 6rem;
                text-align: right;
                margin-right: 2rem;
            }
            .itemContent
            {
                flex: 1;
            }
            .itemInput
            {
                flex: 1;
                height: 1.5rem;
                border: 1px solid #c1c1c1;
                border-radius: .3rem;
                background-color: #f7f7f7;
                font-size: 1.1rem;
            }
            input
            {
                width: 12rem;
                height: 2rem;
                line-height: 2rem;
                padding: 0 .5rem;
            }
            .textArea
            {
                resize: none;
                word-break: break-all;
                word-wrap: break-word;
                width: 13rem;
                overflow: hidden;
                text-overflow: ellipsis;
                border: 1px solid #c1c1c1;
                padding: .5rem;
                font-size: 1.1rem;
                border-radius: .5rem;
                box-sizing: border-box;
                background-color: #f7f7f7;
                flex: 1;
            }
            .van-radio-group
            {
                display: flex;
                .van-radio
                {
                    margin-right: 2rem;
                    .van-radio__icon .van-icon,.van-radio__icon
                    {
                        transform: scale(.7);
                    }
                    .van-radio__icon--checked .van-icon
                    {
                        background-color: red;
                        border: red;
                    }
                }
            }
        }
        .border
        {
            width: 100%;
            height: 1px;
            border-top: 1px dashed #d9d9d9;
            margin-bottom: 1rem;
        }
    }
}
</style>
