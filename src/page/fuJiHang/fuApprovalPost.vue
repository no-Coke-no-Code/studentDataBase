/*
 * @Author: fujihang 
 * @Date: 2019-03-27 09:51:40 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-11 18:45:03
    申请审批
 */
<template>
<div id="fuApprovalPost">
    
    <!-- 学员信息 -->
    <div class="student student_remark">
        <div class="list" v-for="(item,index) in student" :key="index">
            <span class="name">
                {{item.name}}
            </span>
            <span class="val">{{item.val?item.val:'无'}}
            </span>
        </div>
        <div class="border"></div>
    </div>

    <!-- 指派人 -->
    <div class="remark student_remark">
        <div class="list" v-for="(item,index) in remark" :key="index">
            <span class="name">
                {{item.name}}
            </span>
            <span class="val" v-show="item.data!='State'">{{item.val?item.val:'无'}}
            </span>
            <span class="val" v-show="item.val==0&&item.data=='State'">未审核
            </span>
            <span class="val" v-show="item.val==1&&item.data=='State'">已审核
            </span>
            <span class="val" v-show="item.val==2&&item.data=='State'">已驳回
            </span>
        </div>
        <div class="border"></div>
    </div>
    <!-- 附件 -->
    <div class="Enclosure">
        <img :src="dataInfo.Voucher">
        <div class="name">凭证附件</div>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom_btn">
        <van-button class="bw" @click="appFN(2)">驳回拒绝</van-button>
        <van-button @click="appFN(1)">审批通过</van-button>
    </div>

<!-- 弹窗 -->
    <div :class="['reason',Reason.show?'showReason':'']">
        <textarea placeholder="请输入驳回理由" v-model="Reason.val"></textarea>
        <div style="display:flex">
            <van-button @click="Reason.show=false">取消</van-button>
            <van-button class="ok" @click="appFN(2)">确认</van-button>
        </div>
        
    </div>
    
</div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.query.id,
            student:[
                {
                    name:'申请人：',
                    val:'',
                    data:'CustomerName',
                },
                {
                    name:'学员微信：',
                    val:'',
                    data:'WeChat',
                },
            ],//申请信息
            remark:[
                {
                    name:'审核状态：',
                    val:'',
                    data:'State',
                },
                {
                    name:'归属学员：',
                    val:'',
                    data:'Name',
                },
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
                    name:'申请时间：',
                    val:'',
                    data:'CreatorTime',
                },
                {
                    name:'所交定金：',
                    val:'',
                    data:'Price',
                },
            ],//申请详情
            Reason:{
                val:'',
                show:false,
            },//驳回理由
            dataInfo:{},//请求内容
        };
    },

    methods: {
        // 获取信息
        getData(){
            this.postFN({
                url:'/Student/GetOrderAudit',
                data:{
                    ApprovalId:this.id
                }
            }).then(r=>{
                if(r.data.state=="success"){
                    this.dataInfo=r.data.data
                    for(let i=0;i<this.student.length;i++){
                        this.student[i].val=this.dataInfo[this.student[i].data]
                    }
                    for(let i=0;i<this.remark.length;i++){
                        this.remark[i].val=this.dataInfo[this.remark[i].data]
                    }
                }
            })
        },
        // 审批或者驳回
        appFN(state){
            let data={
                keyValue:this.dataInfo.Id,
                F_State:state
            }
            if(state==2){
                if(this.Reason.val) data.F_Reason=this.Reason.val
                else{
                    this.Reason.show=true
                    return
                }
            }
            this.postFN({
                url:'/Student/UpdateOrderAudit',
                data:data
            }).then(r=>{
                if(r.data.state=='success') this.okFN("操作成功")
                else this.notFN(r.data.message)
                this.Reason={
                    show:false,
                    val:""
                }
            })
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
#fuApprovalPost{
    .fBB;
    .mRB;
    .nC;
    height: 100%;
    overflow: hidden;
    position: relative;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    // 学员信息
    .student_remark{
        .bW;
        padding: .5rem 3rem 0;
        margin:0 1rem ;
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
        }
        .border{
            margin-top: .5rem;
            border-bottom: 1px dashed rgb(212, 212, 212);
        }
        
    }
    // 附件
    .Enclosure{
        .bW;
        margin:0 1rem ;
        padding: 3rem 0;
        text-align: center;
        >img{
            height: 7.5rem;
        }
        .name{
            margin-top: 1rem;
            font-size: 1.1rem;
        }
    }

    //按钮
    .bottom_btn{
        flex: 1;
        display: flex;
        align-items: flex-end;
        .van-button{
            flex: 1;
            .fBMRB;
            border: none;
            border-radius: 0;
            color: white;
        }
        .bw{
            color: #666;
            .bW;
        }
    }
    // 弹窗
    .reason{
        .bW;
        border:1px solid rgb(236, 236, 236);
        position: absolute;
        width: 60%;
        .fBB;
        top: 30%;
        transition: .3s;
        transform: translateX(180%);
        border-radius: .6rem;
        opacity: 0;
        >textarea{
            padding: 1rem;
            font-size: 1.2rem;
            // height: 3rem;
            width: 100%;
            .fBB;
        }
        .ok{
            .fBMRB;
            color: white;
        }
        .van-button{
            width: 50%;
        }
    }
    .showReason{
        opacity: 1;
        transform: translateX(35%);
    }
}
</style>