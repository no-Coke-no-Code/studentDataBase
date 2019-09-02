/*
 * @Author: fujihang 
 * @Date: 2019-03-27 15:04:47 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-16 17:48:22
    报单详情
 */
<template>
<div id="fuDeclaratDet">
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
    <div class="student_remark">
        <div class="list" v-for="(item,index) in classData" :key="index">
            <span class="name">
                {{item.name}}
            </span>
            <span class="val" :class="{'red':item.red}">
                {{item.price?"￥":""}}{{item.val?item.val:'无'}}
            </span>
        </div>
        <div class="border"></div>
    </div>
    

    <div class="Enclosure">
        <img v-for="(item,index) in imgList" :key="index" :src="item"/>
    </div>

    <div class="student_remark">
        <div class="list">
            <span class="name">
                审核意见：
            </span>
            <span class="val">
                <textarea class="reason" readonly resize="false" rows="4" v-model="Data.Reason"></textarea>
            </span>
        </div>
        <div class="list">
            <span class="name">
                审核结果：
            </span>
            <span class="result">
                <span v-show="Data.State==0" class="approval">待审批</span>
                <span v-show="Data.State==1" class="pass">已通过</span>
                <span v-show="Data.State==2" class="reject">被驳回</span>
            </span>
        </div>
    </div>

    <div class="toDeclaratCenter" @click="toDeclaratCenter">
        前往报单中心
    </div>
        <!-- <div class="state" v-show="Data.State==0">未审核</div>
        <div class="state" v-show="Data.State==1">已审核</div>
        <div class="state" v-show="Data.State==2">已驳回</div> -->
    <!-- </div> -->

    <!-- <div class="new" v-show="Data.State==2">
        驳回理由:{{Data.Reason?Data.Reason:'无'}}
    </div> -->
    
   
</div>
</template>

<script>
export default {
    data(){
        return {
            imgList:[],
            Data:{},//数据
            student:[
                {
                    name:'学员姓名：',
                    val:'',
                    data:'CustomerName',
                },
                {
                    name:'微信账号：',
                    val:'',
                    data:'WeChat',
                },
                {
                    name:'手机号码：',
                    val:'',
                    data:'Phone',
                },
            ],//学员信息
            classData:[
                {
                    name:'分校：',
                    val:'',
                    data:'SchoolName',
                },
                {
                    name:'课程分类：',
                    val:'',
                    data:'GroupName',
                },
                {
                    name:'学习课程：',
                    val:'',
                    data:'CourseName',
                },
                {
                    name:'开课时间：',
                    val:'',
                    data:'StartTime',
                },
                {
                    name:'应缴金额：',
                    val:'',
                    data:'YingFuPrice',
                    red:true,
                    price:true
                },
                {
                    name:'实缴金额：',
                    val:'',
                    data:'Price',
                    price:true,
                },
            ],
            id:this.$route.query.id,//用户id
           
        };
    },

    methods: {
        //  前往报单中心
        toDeclaratCenter(){
            this.$router.push({path:"/fuDeclaratList"});
        },    
        // 获取信息
        getInfo(){
            this.tipFN();
            this.postFN({
                url:'/Student/GetOrderAudit',
                data:{
                    ApprovalId:this.id
                    // ApprovalId:'29294288-AAD4-4FE9-8F50-30E0F372A719'
                }
            }).then(r=>{
                this.Data=r.data.data;
                this.imgList = this.Data.Voucher.split(",");
                console.log(this.imgList,'分裂后的图片列表');
                let data=r.data
                if(data.state=="success"){
                    this.tipHFN();
                    for(let i=0;i<this.student.length;i++){
                        this.student[i].val=data.data[this.student[i].data]
                    }
                    for(let i=0;i<this.classData.length;i++){
                        this.classData[i].val=data.data[this.classData[i].data]
                    }
                }else this.errFN(data.message)
            })
        },
       
      
    },
    mounted(){
        
        this.getInfo()
    }
}
 
</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuDeclaratDet{
    .fBB;
    .mRB;
    .hO;.nC;
    padding: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 3rem;
    // 学员信息
    .student_remark{
        .bW;
        padding: .5rem 3rem 1rem;
        &:first-of-type
        {
            padding-top: 2rem;
        }
        .fBB;
        .list{
            display: flex;
            // align-items: baseline;
            padding: .5rem 0;
            >span{
                display: block;
            }
            .name{
                width: 7rem;
                height: 100%;
                font-size: 1.2rem;
                text-align: right;
                margin-right: 2rem;
            }
            .val{
                color: #999;
                font-size: 1.1rem;
                flex: 1;
            }
            .red
            {
                color: red;
            }
            .reason
            {
                resize: none;
                word-break: break-all;
                word-wrap: break-word;
                height: 6rem;
                overflow: hidden;
                text-overflow: ellipsis;
                border: 1px solid #c1c1c1;
                padding: .2rem;
                border-radius: .5rem;
                box-sizing: border-box;
                background-color: #f7f7f7;
                width: 100%;
            }
        }
        .border{
            margin-top: .5rem;
            border-bottom: 1px dashed rgb(212, 212, 212);
        }

        .result
        {
            span
            {
                display: inline-block;
                height: 100%;
                padding: .1rem 1rem;
                text-align: center;
                border-radius: 1rem;
                font-size: 1.1rem;
                margin-right: .5rem;
                .fBB;
                color: white;
            }
            .approval
            {
                background-color: #d7b754;
            }
            .pass
            {
                background-color: #a0d75f;
            }
            .reject
            {
                background-color: #d87055;
            }
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
                }
                .right{
                    margin-right: .5rem;
                }
            }
            
            
        }        
    }
    // 附件
    .Enclosure{
        .bW;
        position: relative;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        padding: 0 3rem;
        >img{
            object-fit: contain;
            width: 17%;
            height: 7.5rem;
            margin-right: 1rem;
            margin-left: 1rem;
        }
        .name{
            margin-top: 1rem;
            font-size: 1.1rem;
        }
        // 状态
        .state{
            font-size: 1.2rem;
            color: red;
            bottom: 1rem;
            transform: rotateZ(-45deg);
            right: 0;
            position: absolute;
        }
    }

    .toDeclaratCenter
    {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: #26bcd7;
        color: #fff;
        font-size: 1.2rem;
        height: 4rem;
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .new{
        color: red;
        .bW;
        padding: 1rem;
        font-size: 1.15rem;
        box-sizing: border-box;
    }
    
}
</style>