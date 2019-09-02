/*
 * @Author: fujihang 
 * @Date: 2019-03-27 15:04:47 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-16 19:27:39
    报单申请
 */
<template>
<div id="fuDeclaratPost">

    <div class="contantDP">
        <!-- 学员信息 -->
        <div class="student_remark">
            <div class="list" v-for="(item,index) in student" :key="index">
                <span class="name">
                    {{item.name}}
                </span>
                <span class="val">
                    {{item.val?item.val:'无'}}
                </span>
            </div>
            <div class="border"></div>
        </div>
        <div class="class_data student_remark">
            <div class="list" v-for="(item,index) in classData" :key="index">
                <span class="name">
                    {{item.name}}
                </span>
                <div class="valC">
                    <div class="mRB" v-if="!item.fix">
                        {{item.q?'￥':''}}
                        <div class="input">
                            <div class="jiaxg" @click="btmFN(index)" v-show="index!=5">
                                {{item.val}}
                            </div>
                            <input v-model="item.val" type="number" v-show="index==5">
                        </div>
                        <div class="right">
                            <van-icon name="arrow-down" v-show="index!=5"/>
                        </div>
                    </div>
                    <div v-if="item.fix" class="coursePrice">
                        ￥{{coursePrice}}
                    </div>
                </div>
            </div>
            <div class="border"></div>
        </div>

        
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
    


    <!-- 按钮 -->
    <div class="ling">
        <van-button class="save" @click="ApplicaFN">保存</van-button>
        <van-button class="go" @click="toFN">前往报单中心</van-button>
    </div>

    <!-- 弹窗 -->
    <van-popup v-model="showPop.show" position="bottom" >
        <div v-show="showPop.index==0">
            <div @click="choose(ind,item,0)"   :class="['listData',showPop.choose==ind?'choose':'']"  v-for="(item,ind) in schoolList" :key="ind">{{item.SchoolName}}</div>
        </div>
        <div v-show="showPop.index==1">
            <div @click="choose(inde,item,1)"   :class="['listData',showPop.choose==inde?'choose':'']"  v-for="(item,inde) in Classify" :key="inde">{{item.ItemName}}</div>
        </div>
        <div v-show="showPop.index==2">
            <div @click="choose(indexs,item,2)"   :class="['listData',showPop.choose==indexs?'choose':'']"  v-for="(item,indexs) in Course" :key="indexs">{{item.F_Name}}</div>
        </div>
        <div v-show="showPop.index==3">
            <div @click="choose(indexes,item,3)"   :class="['listData',showPop.choose==indexes?'choose':'']"  v-for="(item,indexes) in Time" :key="indexes">{{item.StartTime}}</div>
        </div>

    </van-popup>
</div>
</template>

<script>
export default {
    data(){
        return {
            coursePrice:0,
            studentInfo:{},
            classInfo:{},
            schoolId:0,//
            yiLan:require('../../image/fuJiHang/addFU.svg'),
            student:[
                {
                    name:'学员姓名：',
                    val:'',
                    data:'F_NickName',
                },
                {
                    name:'微信账号：',
                    val:'',
                    data:'F_WeChat',
                },
                {
                    name:'手机号码：',
                    val:'',
                    data:'F_MobilePhone',
                },
            ],//学员信息
            classData:[
                {
                    name:'分校：',
                    val:'',
                    id:null,
                },
                {
                    name:'课程分类：',
                    val:'',
                    id:null,
                },
                {
                    name:'学习课程：',
                    val:'',
                    id:null,
                },
                {
                    name:'开课时间：',
                    val:'',
                    id:null,
                },
                {
                    name:'应缴金额：',
                    val:'',
                    id:null,
                    fix:true,
                },
                {
                    name:'实缴金额：',
                    val:'',
                    q:true,
                },
            ],
            userId:"",//用户id
            showPop: {
                index:0,
                show:false,
                choose:-1
            },//弹窗
            schoolList:[],//学校列表
            Classify:[],//课程分类列表
            Course:[],//课程列表
            Time:[],
            postData:{
                // F_UserId:'55A7675B-5241-4570-902C-619D02717517',
                F_UserId:'',
                F_Price:0,
                F_SchoolCourseId:'',
                F_StartTime:"",
            },//请求
            imgE:null,
            imgList:[],
            imgBoldList:[],
            imgUrlList:[],
            userInfo:JSON.parse(localStorage.getItem('userInfo')),
        };
    },

    methods: {
        // 去
        toFN(){
            this.$router.push({path:'/fuDeclaratList'})
        },
        // 获取信息
        getInfo(){
            this.tipFN();
            this.postFN({
                url:'/Student/GetApprovalInfo',
                data:{
                    UserID:this.userId
                }
            }).then(r=>{
                let data=r.data
                if(data.state=="success"){
                    this.tipHFN();
                    for(let i=0;i<this.student.length;i++){
                        this.student[i].val=data.data[this.student[i].data]
                    }
                    this.studentInfo = data;
                }else this.errFN(data.message)
            })
        },
        // 报单申请
        ApplicaFN(){
            this.postData.F_Price=this.classData[5].val
            console.log(this.postData);
            for(let i in this.postData){
                if(this.postData[i]=='') return this.notFN("请填完数据")
            }
            if(!this.imgUrlList.length) return this.notFN("请选择上传图片")

            // if(this.imgE==null||this.imgE==undefined) return this.notFN("请选择上传图片")
            // let img=this.convertBase64UrlToBlob(this.yiLan)
            // param.append("FileUrl",img,this.imgE.target.files[0].name)

            let param=new FormData();
            for(let i = 0;i<this.imgUrlList.length;i++)
            {
                let img = this.convertBase64UrlToBlob(this.imgUrlList[i]);
                param.append("FileUrl"+(i+1),img,this.imgList[i].target.files[0].name)
            }
            for(let i in this.postData){
                param.append(i,this.postData[i])
            }
            // for(let i in this.postData){
            //     console.log(param.get(i))
            // }
            

            // return;
            this.tipFN()
            this.postFN({
                url:'/Student/SubmitApproval',
                data:param
            }).then(r=>{
                this.tipHFN()
                let data=r.data
                if(data.state=="success"){
                    this.okFN('申请报单成功')
                    setTimeout(()=>{
                        this.$router.push({path:'/fuDeclaratList'})
                    },1400)
                }
                else this.notFN(data.message)
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
                document.getElementsByClassName("imgList")[0].appendChild(img);
            }
            this.imgList.push(e);
            this.imgE=e
           
        },
        // 弹窗
        btmFN(index){
            if(index==1&&this.Classify.length==0) return this.notFN('该分校没有课程分类')
            if(index==2&&this.Course.length==0) return this.notFN('该课程分类没有课程')
            if(index==3&&this.Time.length==0) return this.notFN('该课程没有开课时间')
            this.showPop={
                show:true,
                index:index,
                choose:-1,
            }
        },
        // 获取分校信息
        getSchool(){
            this.getFN({
                url:'/StudentCourse/GetSchoolList?pageSize=10000&pageIndex=1',
            }).then(r=>{
                if(r.data.state=="success"){
                   this.schoolList=r.data.data.rows
                }else this.notFN(data.message)
            })
        },
        // 获课程分类信息
        getClassify(id){

            this.getFN({
                url:'/StudentCourse/GetCourseTypeList?pageSize=10000&pageIndex=1&schoolid='+id,
            }).then(r=>{
                if(r.data.state=="success"){
                   this.Classify=r.data.data.rows
                }else this.notFN(data.message)
            })
        },
        // 获课程信息
        getCourse(id){
            this.getFN({
                url:'/StudentCourse/GetCourseList?pageSize=10000&pageIndex=1&courseTypeId='+id+'&schoolId='+this.schoolId,
            }).then(r=>{
                if(r.data.state=="success"){
                   this.Course=r.data.data;

                }else this.notFN(data.message)
            })
        },
        // 获取开课时间
        getTime(item){
            console.log(item);
            this.postFN({
                url:"/StudentCourse/GetStartTimeList",
                data:{
                    courseId:item.F_Id,
                    schoolId:this.schoolId,
                },
            }).then((res)=>{
                console.log(res);
                if(res.data.state == "success")
                {
                    this.Time = res.data.data;
                }
                else
                {
                    this.notFN(data.message)
                }
            });
        },
        // 选择的列表
        choose(i,item,index){
            this.showPop.choose=i;
            setTimeout(()=>{
                this.showPop.show=false
            },400)
            switch(index){
                case 0:
                    this.classData[index].val=item.SchoolName
                    this.Classify=[]
                    this.classData[index+1].val=''
                    this.classData[index+2].val=''
                    this.postData.F_SchoolCourseId=''
                    this.getClassify(item.SchoolId)
                    this.schoolId=item.SchoolId
                break;
                case 1:
                    this.classData[index].val=item.ItemName
                    this.Course=[]
                    this.classData[index+1].val=''
                    this.postData.F_SchoolCourseId=''
                    this.getCourse(item.ItemId)
                break;
                case 2:
                    this.classData[index].val=item.F_Name
                    this.Time = [];
                    this.getTime(item);
                break;
                case 3:
                    this.classData[index].val=item.StartTime;
                    this.postData.F_StartTime=item.StartTime;
                    this.postData.F_SchoolCourseId = item.SchoolCourseId;
                    this.coursePrice = item.SchoolCoursePrice;
                    console.log(this.postData);
                break;
            }
        },
    },
    mounted(){
        this.userId = this.$route.query.userId;
        console.log(this.userId);
        this.getInfo()
        this.getSchool();
        this.postData.F_UserId=this.userId
    }
}
 
</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuDeclaratPost{
    .fBB;
    .nC;
    height: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    .contantDP{
        flex: 1;
        padding: 1rem;
        .mRB;
        overflow: auto;
    }
    // 学员信息
    .student_remark{
        .bW;
        padding: .5rem 3rem 0;
        .fBB;
        &:first-of-type
        {
            padding-top: 2rem;
        }
        .list{
            display: flex;
            align-items: center;
            padding: .5rem 0;
            >span{
                display: block;
                // flex: 1;
            }
            .name{
                height: 100%;
                font-size: 1.2rem;
                text-align: right;
                margin-right: 2rem;
                width: 7rem;
            }
            .val{
                color: #999;
                font-size: 1.1rem;
            }
        }
        .border{
            margin-top: .5rem;
            border-bottom: 1px dashed rgb(212, 212, 212);
        }
    }
    .class_data{
        .valC{
            flex: 1;
            .mRB{
                display: flex;
                width: 90%;
                align-items: center;
                font-size: 1.1rem;
                .input{
                    flex: 1;
                    >input{
                        padding: 0 .5rem;
                        .fBB;
                        height: 2rem;
                        width: 100%;
                    }
                    .jiaxg{
                        display: flex;
                        align-items: center;
                        height: 2rem;
                        padding: 0 .5rem;
                        .fBB;
                        width: 100%;
                    }
                }
                .right{
                    
                    margin-right: .5rem;
                }
            }
        }    
        .coursePrice
        {
            color: red;
            font-size: 1.1rem;
        }    
    }
    .fujian{
        font-size: 1.1rem;
        background: #fff;
        height: 2rem;
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
    // 按钮
    .ling{
        width: 100% ;
        display: flex;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.3rem;
        .van-button{
           flex: 1;
           border: none;
        }
        .go{
            .fBMRB;
            color: white;
        }
        .save{
            color: #666;
        }
    }
    // 弹窗选择
    .listData{
        text-align: center;
        padding: 1rem;
        font-size: 1.2rem;
        color: #999;
        transition: .2s;
    }
    .choose{
        background: rgb(241, 241, 241);
    }
    .van-popup{
        max-height: 50%;
    }


    .mainWrapper
    {
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
        padding: 2rem 3rem;
        .item
        {
            display: flex;
            margin-bottom: 1rem;
            font-size: 1.2rem;
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
            input
            {
                width: 12rem;
                height: 2rem;
                line-height: 2rem;
                background-color: #f8f8f8;
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
                border: 1px solid silver;
                padding: .2rem;
                border-radius: .5rem;
                box-sizing: border-box;
                background-color: #f8f8f8;
            }
            .van-radio-group
            {
                display: flex;
                .van-radio
                {
                    margin-right: 2rem;
                    .van-radio__icon--checked .van-icon
                    {
                        background-color: red;
                        border: red;
                    }
                    .van-icon-success:before
                    {
                        display: none;
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