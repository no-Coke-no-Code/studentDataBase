/*
 * @Author: fujihang
 * @Date: 2019-03-22 15:28:40
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 19:42:25
    发表作品
 */
<template>
<div id="fuPublished">
    <div class="bW">
        <!-- 作品标题 -->
        <div class="title">
            <span class="name">作品标题</span>
            <input placeholder="请输入作品标题" v-model="worksTitle">
        </div>
        <!-- 组课 -->
        <div class="zhu" @click="showZhu = true">
            <span class="name">组课</span>
            <span class="val" v-model="choose">{{choose}}</span>
            <van-icon name="arrow" />
        </div>
    </div>
    <!-- 作品正文 -->
    <div class="contant">
        <!-- 头部 -->
        <div class="TopName">
            <img class="img" src="../../image/fuJiHang/xin.png">作品正文
        </div>
        <div class="upload_c">
            <div class="Enclosure">
                <img :src=" yuLan ? yuLan :addImg">
                <div class="val">
                    上传图片
                </div>
                <input type="file" class="flie" @change="postImg">
            </div>
            <div class="Enclosure">
                <img :src=" Uploader ? Uploaderimg :UploaderImg">
                <div class="val">
                    {{UploaderName ? UploaderName :shangchuanfujian}}
                </div>
                <input type="file" class="flie" @change="postUploader">
            </div>
        </div>
    </div>
    <!-- 正文 -->
    <div class="text_fu">
        <textarea class="text" v-model="wenben"></textarea>
    </div>
    <!-- 发表 -->
    <div class="submit">
        <van-button @click="submitFN">发表</van-button>
    </div>
    <!-- 组队 -->
    <!-- <van-actionsheet
        v-model="showZhu"
        :actions="zhuVal"
        @select="onZhuFN"
    /> -->
    
    <!-- 组课 -->
    <van-popup v-model="showZhu" position="bottom" >
      <div class="classRight" v-for="(item,index) in zhuVal"  :key="index" @click='classRight(index)'>
        <span>{{item.CourseName}}</span>
      </div>
    </van-popup>

    <!-- 发布成功 -->
    <div :class="['submitOk',aaa?'okAlert':'']">
        <div class="ok">
            <div class="title_Ok">
                发布成功
            </div>
            <img src="../../image/fuJiHang/ok.png">
            <van-button @click="okCall" :class="miao==0?'back':''"> 我知道了{{miao?'('+miao+'s'+')':''}}</van-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            choose:'请选择',//组队
            addImg:require('../../image/fuJiHang/pic.svg'),
            UploaderImg:require('../../image/fuJiHang/fujian.png'),
            showZhu:false,//显隐藏
            yuLan:'',
            worksTitle:'',//绑定作品标题
            shangchuanfujian:'上传附件',
            UploaderName:'',
            yuLanName:'',//目前上传图片的图片名字是空,选了图片后会更改
            yuLanData:'',
            Uploader:'',
            wenben:'',//输入的文本内容双向绑定
            UploaderData:'',//转换的loader
            filedata:'',//UploaderData转成 blob的参数
            schoolCourseId:'',//选择的课程ID
            Uploaderimg:require('../../image/fuJiHang/ok.png'),
            userInfo:JSON.parse(localStorage.getItem('userInfo')),
            // param:new FormData(),//全局的param开始的时候创建,为了提交图片和附件数据
            zhuVal:[],
            miao:5,
            aaa:false,
        };
    },

    methods: {
        onZhuFN(){

        },
        kezu(){//点击科组选择框请求科组数据
        this.tipFN()
          this.getFN({
            url:"/StudentCourse/GetCourseTypeCourseList?pageSize=99999&pageIndex=1"
          }).then(r=>{
            this.tipHFN()
            this.zhuVal = r.data.data.rows
          })
        },
        classRight(i){//点击列表选项
          this.showZhu = false;
          this.schoolCourseId = this.zhuVal[i].ItemId  
          this.choose  = this.zhuVal[i].CourseName  
          // console.log(i)
        },
        postImg(e){
          if(e.target.files[0].size>3*1024*1024) return this.notFN('图片不能超过3M哦！')
          let reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          this.yuLanName = e.target.files[0].name;
          reader.onload=(e)=>{
          this.yuLan = e.target.result;
          let img=this.convertBase64UrlToBlob(this.yuLan);
          this.yuLanData = img
          }
        },
        postUploader(e){//上传附件
        if(e.target.files[0].size>3*1024*1024) return this.notFN('附件不能超过3M哦！')
          let reader2 = new FileReader();
          //成功获取附件的回调
          //成功获取附件 的名字以及后缀名
          let UploaderName = e.target.files[0].name
          //检查文件格式doc  docx xls xlsx pdf zip 7z rar 其他的不行
          if(UploaderName.indexOf(".doc") > 0 ){
            reader2.readAsDataURL(e.target.files[0]);

            // this.param.append("FileUrl",img,"aaa.jpg");
            reader2.onload=(e)=>{
              this.UploaderData = e.target.result
              this.filedata = this.convertBase64UrlToBlob(this.UploaderData);
            }
            this.Uploader = true;
            this.UploaderName = UploaderName;
          }else if(UploaderName.indexOf(".docx") > 0 ){
            reader2.readAsDataURL(e.target.files[0]);
            reader2.onload=(e)=>{
              this.UploaderData = e.target.result;
              this.filedata = this.convertBase64UrlToBlob(this.UploaderData);
            }
            this.Uploader = true;
            this.UploaderName = UploaderName;
          }else if(UploaderName.indexOf(".xls") > 0){
            reader2.readAsDataURL(e.target.files[0]);
            reader2.onload=(e)=>{
              this.UploaderData = e.target.result;
              this.filedata = this.convertBase64UrlToBlob(this.UploaderData);
            }
            this.Uploader = true;
            this.UploaderName = UploaderName;
          }else if(UploaderName.indexOf(".xlsx")> 0){
            reader2.readAsDataURL(e.target.files[0]);
            reader2.onload=(e)=>{
              this.UploaderData = e.target.result;
              this.filedata = this.convertBase64UrlToBlob(this.UploaderData);
            }
            this.Uploader = true;
            this.UploaderName = UploaderName;
          }else if(UploaderName.indexOf(".pdf")> 0){
            reader2.readAsDataURL(e.target.files[0]);
            reader2.onload=(e)=>{
              this.UploaderData = e.target.result;
              let filedata=this.convertBase64UrlToBlob(this.UploaderData);
              this.filedata = filedata;
            }
            this.Uploader = true;
            this.UploaderName = UploaderName;
          }else if(UploaderName.indexOf(".zip")> 0){
            reader2.readAsDataURL(e.target.files[0]);
            reader2.onload=(e)=>{
              this.UploaderData = e.target.result;
              let filedata=this.convertBase64UrlToBlob(this.UploaderData);
              this.filedata = filedata;
            }
            this.Uploader = true;
            this.UploaderName = UploaderName;

          }else if(UploaderName.indexOf(".7z")> 0){
            reader2.readAsDataURL(e.target.files[0]);
            reader2.onload=(e)=>{
              this.UploaderData = e.target.result;
              let filedata=this.convertBase64UrlToBlob(this.UploaderData);
              this.filedata = filedata;
            }
            this.Uploader = true;
            this.UploaderName = UploaderName;

          }else if(UploaderName.indexOf(".rar")> 0){
            reader2.readAsDataURL(e.target.files[0]);
            reader2.onload=(e)=>{
              this.UploaderData = e.target.result;
              let filedata=this.convertBase64UrlToBlob(this.UploaderData);
              this.filedata = filedata;
            }
            this.Uploader = true;
            this.UploaderName = UploaderName;
          }else{
            this.errFN('仅支持格式为doc  docx xls xlsx pdf zip 7z rar')
          }
        },
        submitFN(){
            if(!this.filedata) return this.notFN("请上传附件！")
            if(!this.yuLanData) return this.notFN("请上传图片！")
            if(!this.wenben) return this.notFN("请填写正文！")
            if(!this.worksTitle) return this.notFN("请填写标题！")
            if(this.schoolCourseId !=  "" ) {
              let param=new FormData()
              param.append("FileUrl",this.filedata,this.UploaderName);
              param.append("title",this.worksTitle);
              param.append("FileImgUrl",this.yuLanData,this.yuLanName);
              param.append("schoolCourseId",this.schoolCourseId);
              param.append('info',this.wenben);
              this.postFN({
                url:"/StudentCourse/UserWorksUploadFile",
                data:param,
              }).then(r=>{
                if(r.data.state == 'success'){
                  this.aaa=true;
                  setInterval(()=>{
                      if(this.miao==0) return this.miao=''
                      this.miao--;
                  },1000)
                }else{
                  this.errFN('提交失败')
                }
              })
            }else{
              this.errFN('请您选择课程')
          }
        },
        okCall(){
             this.aaa=false
        },
    },
    created (){
      this.kezu()
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuPublished{
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    .nC;.mRB;
    .van-popup{
      max-height: 40%;
    }
    .classRight{
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        font-size: 1.2rem;
        .fBB;
        .bBS;
      }
    // 标题
    .title{
        display: flex;
        padding: 1.2rem 1rem 1.2rem 0;
        margin-left: 1rem;
        align-items: center;
        .fBB;.bBS;
        .name{
           font-size: 1.25rem;
        }
        >input{
            font-size: 1.15rem;
            flex: 1;
            margin-left: 2rem;
        }
        >input::placeholder{
            color: #999;
        }

    }
    // 组课
    .zhu{
        display: flex;
        padding: 1.2rem 1rem;
        align-items: center;
        .fBB;
        .name{
           font-size: 1.25rem;
           flex: 1;
        }
        .val{
        font-size: 1.15rem;
           margin-right: .6rem;
        }
    }
    // 作品正文
    .contant{
        margin-top: 1rem;
        // 头部
        .TopName{
            .bW;
            display: flex;
            align-items: center;
            padding: 1rem 1rem;
            font-size: 1.3rem;
            .fBB;.bBS;.tC;
            .img{
                margin-right: .3rem;
                height: 1.7rem;
            }
        }
        // 图片 附件
        .upload_c{
            display: flex;
            .bW;
            .Enclosure{
                position: relative;
                margin: 1rem;
                box-sizing: border-box;
                text-align: center;
                >img{
                    height: 2rem;
                    width: 2rem;
                }
                .flie{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    opacity: 0;
                }
                .val{
                    font-size: 1.15rem;
                    color: #999;
                }
            }
        }

    }
    // 文本
    .text_fu{
        flex: 1;
        .bW;
        .text{
            margin: .5rem 1rem 0;
            border:1px solid rgb(240, 240, 240);
            border-radius: .3rem;
            width: calc(100% - 2rem);
            padding: 1rem;
            .fBB;
            height: 25rem;
            font-size: 1.25rem;
        }
    }
    .submit{
        bottom: 0;
        width: 100%;
        position:absolute;
        .van-button{
            width: 100%;
            .fBMRB;
            color: white
        }
    }

    .submitOk{
        opacity: 0;
        z-index: -9;
        position: fixed;
        height: 100%;
        width: 100%;
        transition:background ease .3s ;
        background: rgba(0, 0, 0, 0);
        display: flex;
        align-items: center;
        justify-content: center;
        .ok{
            margin-top: -20%;
            transition: .3s;
            transform: translateX(-100%);
            .bW;
            .bR;
            width: 60%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .fBB;
            >img{
                width: 4.5rem;
                height: 4.5rem;
                margin-bottom: 1rem;
            }
            .title_Ok{
                padding: 1rem;
                font-size: 1.3rem;
                font-weight: 650;
            }
            .van-button{
                color: #999;
                width: 100%;
            }
            .back{
                .fBMRB;
                color: white;
            }
        }
    }
    .okAlert{
        z-index: 9;
        opacity: 1;
        background: rgba(0, 0, 0, .6);
        .ok{
            transform: translateX(0);
        }
    }
}
</style>
