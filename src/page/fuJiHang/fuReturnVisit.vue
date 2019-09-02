/*
 * @Author: fujihang 
 * @Date: 2019-03-27 09:51:40 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-10 17:44:29
    回访详情(可操作)
 */
<template>
<div id="fuReturnVisit">
    
    <!-- 学员信息 -->
    <div class="student student_remark">
        <div class="list" v-for="(item,index) in student" :key="index">
            <span class="name">{{item.name}}
            </span>
            <span class="val">{{item.val?item.val:"无"}}
            </span>
        </div>
        <div class="border"></div>
    </div>

    <!-- 学习课程 -->
    <div class="remark student_remark">
        <div class="list" v-for="(item,index) in remark" :key="index">
            <span class="name">{{item.name}}
            </span>
             <span class="val" v-show="index!=5&&index!=4">{{item.val?item.val:'无'}}
            </span>
            <span class="val jg" v-show="index==4">{{item.val?'￥'+item.val:0}}
            </span>
            <span class="val" v-show="index==5"><textarea v-model="item.val"></textarea>
            </span>
        </div>
        <div class="border"></div>
    </div>
   
   <div class="RVbtn">
       <van-button class="hold" @click="submit">保存</van-button>
       <van-button @click="toFN">历史回访</van-button>
   </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.query.id,//获取的id
            student:[
                {
                    name:'学员姓名：',
                    val:'',
                    data:'Name',
                },
                {
                    name:'学员微信：',
                    val:'',
                    data:'WeChat',
                },
                {
                    name:'手机号码：',
                    val:'',
                    data:'MobilePhone',
                },
            ],//学员信息
            remark:[
                {
                    name:'学习课程：',
                    val:'',
                    data:'CourseName',
                },
                {
                    name:'所属分校：',
                    val:'',
                    data:'SchoolName',
                },
                {
                    name:'所属客服：',
                    val:'',
                    data:'CustomerName',
                },
                {
                    name:'申请时间：',
                    val:'',
                    data:'StartTime',
                },
                {
                    name:'所交定金：',
                    val:"",
                    data:'Price',
                },
                {
                    name:'填写回访结果：',
                    val:"",
                },
            ],//学习课程
        };
    },

    methods: {
        // 获取数据
        getData(){
            this.tipFN();
            this.postFN({
                url:'/Student/GetReturnVisit',
                data:{
                    OrderId:this.id
                }
            }).then(r=>{
                this.tipHFN();
                if(r.data.state=='success'){
                    let data=r.data.data
                    for(let i=0;i<this.student.length;i++){
                        this.student[i].val=data[this.student[i].data]
                    }
                    for(let i=0;i<this.remark.length;i++){
                        this.remark[i].val=data[this.remark[i].data]
                    }
                }else this.notFN(r.data.message)

            })
        },
        // 保存
        submit(){
            // return console.log(this.remark[5].val)
            if(!this.remark[5].val) return this.notFN('请填写回访信息')
            this.tipFN('正在保存...');
            this.postFN({
                url:'/Student/SubmitReturnVisitInfo',
                data:{
                    F_OrderID:this.id,
                    F_ReturnVisitInfo:this.remark[5].val
                }
            }).then(r=>{
                this.tipHFN();
                if(r.data.state=='success') this.okFN("保存成功！")
                else this.notFN(r.data.message)

            })
        },
        // 历史回访
        toFN(){
            this.$router.push({path:'/fuHistoryRecord?id='+this.id})
        }
    },
    mounted(){
        this.getData();
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuReturnVisit{
    .fBB;
    .mRB;
    .nC;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    // 学员信息
    .student_remark{
        .bW;
        margin: 0 1rem ;
        padding: .5rem 3rem 0;
        .fBB;
        .list{
            display: flex;
            align-items: flex-start;
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
                >textarea{
                    height:4rem;
                    background: #F8F8F8;
                    width: 100%;
                }
            }
            .jg{
                .tC;
            }

        }
        .border{
            margin-top: .5rem;
            border-bottom: 1px dashed rgb(212, 212, 212);
        }
    }
    // 按钮
    .RVbtn{
        display: flex;
        align-items: flex-end;
        flex: 1;
        .van-button{
            flex: 1;
            .fBMRB;
            color: white;
        }
        .hold{
            .bW;
            .nC;
        }
    }
   
}
</style>