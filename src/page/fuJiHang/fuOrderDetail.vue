/*
 * @Author: fujihang 
 * @Date: 2019-03-21 11:26:52 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-17 10:54:13
    确认订单
 */
<template>
<div id="fuOrderDetail">

    <navBarTow btn="true" name="订单详情" ></navBarTow>

    <div class="PurchaseContant">
    <!-- 头部 -->
    <purchaseCard :Data="Data" ></purchaseCard>

    <!-- 订单信息 -->
    <div class="info" v-for="(item,index) in infoList" :key="index">
        <div class="infoNar">
            <img src="../../image/fuJiHang/xin.png" class="img">
            {{item.name}}
        </div>
        <div v-for="(cItem,cIndex) in item.list" :key="cIndex">
            <div class="list" v-if="cIndex==3&&index==0&&payType">
                <span class="name">
                    {{cItem.name}}
                    <i class="redSpot" v-if="cItem.required">*</i>
                </span>
                <span class="value red"  v-show="!cItem.xie">
                    {{cItem.val?'￥'+cItem.val:'无'}}
                </span>
                <span class="value"  v-show="cItem.xie">
                    <input v-show="state=='待付款'" v-model="cItem.val" :placeholder="cItem.val?cItem.val:cItem.plr">
                    <input :readonly="state!='待付款'" v-show="state!='待付款'" :value="cItem.val?cItem.val:'无'" :placeholder="cItem.val?cItem.val:cItem.plr">
                </span>
            </div>
            <div class="list" v-if="cIndex==4&&index==0&&!payType">
                <span class="name">
                    {{cItem.name}}
                    <i class="redSpot" v-if="cItem.required">*</i>
                </span>
                <span class="value red"  v-show="!cItem.xie">
                    {{cItem.val?'￥'+cItem.val:'无'}}
                </span>
                <span class="value"  v-show="cItem.xie">
                    <input v-show="state=='待付款'" v-model="cItem.val" :placeholder="cItem.val?cItem.val:cItem.plr">
                    <input :readonly="state!='待付款'" v-show="state!='待付款'" :value="cItem.val?cItem.val:'无'" :placeholder="cItem.val?cItem.val:cItem.plr">
                </span>
            </div>
            <div class="list" v-if="cIndex==3&&index==1">
                <span class="name">
                    {{cItem.name}}
                    <i class="redSpot" v-if="cItem.required">*</i>
                </span>
                <span class="value"  v-show="!cItem.xie">
                    {{cItem.val?cItem.val:'无'}}
                </span>
                <span class="value"  v-show="cItem.xie">
                    <input v-show="state=='待付款'" v-model="cItem.val" :placeholder="cItem.val?cItem.val:cItem.plr">
                    <input :readonly="state!='待付款'" v-show="state!='待付款'" :value="cItem.val?cItem.val:'无'" :placeholder="cItem.val?cItem.val:cItem.plr">
                </span>
            </div>
            <div class="list" v-if="cIndex==4&&index==1">
                <span class="name">
                    {{cItem.name}}
                    <i class="redSpot" v-if="cItem.required">*</i>
                </span>
                <span class="value"  v-show="!cItem.xie">
                    {{cItem.val?cItem.val:'无'}}
                </span>
                <span class="value"  v-show="cItem.xie">
                    <input v-show="state=='待付款'" v-model="cItem.val" :placeholder="cItem.val?cItem.val:cItem.plr">
                    <input :readonly="state!='待付款'" v-show="state!='待付款'" :value="cItem.val?cItem.val:'无'" :placeholder="cItem.val?cItem.val:cItem.plr">
                </span>
            </div>
            <div class="list" v-if="cIndex!=3&&cIndex!=4">
                <span class="name">
                    {{cItem.name}}
                    <i class="redSpot" v-if="cItem.required">*</i>
                </span>
                <span class="value"  v-show="!cItem.xie">
                    {{cItem.val?cItem.val:'无'}}
                </span>
                <span class="value"  v-show="cItem.xie">
                    <input v-show="state=='待付款'" v-model="cItem.val" :placeholder="cItem.val?cItem.val:cItem.plr">
                    <input :readonly="state!='待付款'" v-show="state!='待付款'" :value="cItem.val?cItem.val:'无'" :placeholder="cItem.val?cItem.val:cItem.plr">
                </span>
            </div>
        </div>
    </div>

    <!-- 立即支付 -->
    <div class="enroll" v-if="state=='待付款'">
        <van-button @click="delFN" >删除</van-button>
        <van-button @click="okFNE" class="ok">立即支付</van-button>
    </div>

    </div>
</div>
</template>

<script>
import navBarTow from '../../public/navBarTow'
import purchaseCard from '../../components/fujihang/purchaseCard';
export default {
    components:{
        purchaseCard,navBarTow
    },
    data(){
        return {
            payType:"",
            state:this.$route.query.state,//状态
            id:this.$route.query.id,//订单id
            Data:{},
            infoList:[
                {
                    name:'订单信息',
                    img:require('../../image/fuJiHang/xin.png'),
                    ifOnline:false,
                    list:[
                        {
                            name:'订单编号：',
                            val:'',
                            data:'OrderNum'
                        },
                        {
                            name:'创建时间：',
                            val:'',
                            data:'OrderCreate'
                        },
                        {
                            name:'到校时间：',
                            val:'',
                            data:'StartTime'
                        },
                        {
                            name:'定金：',
                            val:'',
                            data:'F_EarnestMoney',
                            price:true,
                        },
                        {
                            name:'课程总额：',
                            val:'',
                            data:'ActualPayMoney'
                        }
                    ]
                },
                {
                    name:'订单信息',
                    img:require('../../image/fuJiHang/xin.png'),
                    list:[
                        {
                            name:'姓   名：',
                            val:'',
                            data:'UserName',
                            required:true,
                        },
                        {
                            name:'手机号码：',
                            val:'',
                            data:'UserPhone',
                            xie:true,
                            plr:'请输入手机号码',
                            post:'Phone',
                            required:true,
                        },
                        {
                            name:'微信账号：',
                            val:'',
                            data:'UserWechat',
                            xie:true,
                            plr:'请输入微信账号',
                            post:'WeChat',
                            required:true,
                        },
                        {
                            name:'备   注：',
                            val:'',
                            data:'UserRemake',
                            xie:true,
                            plr:'请输入备注',
                            post:'Remarks'
                        },
                    ]
                }, 
            ],
            psotYZ:{

            },//验证能否下单
        };
    },

    methods: {
        okFNE(){
            for(let i=0;i<this.infoList[1].list.length;i++){
                if(this.infoList[1].list[i].data=='UserPhone'&&!this.infoList[1].list[i].val) return this.notFN("请输入手机号！")
                if(this.infoList[1].list[i].xie){
                    this.psotYZ[this.infoList[1].list[i].post]=this.infoList[1].list[i].val
                }
            }
            this.postFN({
                url:'/Student/UpdateOrderInfo',
                data:this.psotYZ
            }).then(r=>{
                if(r.data.state=="success"){
                    window.localStorage.setItem("orderId",this.infoList[0].list[0].val);
                    this.postFN({
                        url:"/TenPay/JsApiPay?body=订单支付&tradeno="+this.infoList[0].list[0].val+'&callbackurl='+'https://live.9oasd.com/#/okOrerr?order='+this.infoList[0].list[0].val,
                        data:{
                            body:'订单支付',
                            tradeno:this.infoList[0].list[0].val,
                            callbackurl:'https://live.9oasd.com/#/okOrerr?order='+this.infoList[0].list[0].val,
                        }
                    }).then(r=>{    
                        if(r.data.state=="info"){
                            window.location.href = r.data.data
                        }else this.errFN(r.data.message)
                    })
                }else this.notFN(r.data.message)
            })


            
        },
        getData(){
            this.tipFN();
            this.ifOnline = parseInt(this.$route.query.courseType) + 1;
            this.postFN({
                url:'/Student/GetOrderInfo',
                data:{
                    OrderID:this.id,
                }
            }).then(r=>{
                this.tipHFN();
                if(r.data.state=="success"){
                    let data=r.data.data
                    this.Data=data.CourseList
                    console.log(this.Data);
                    for(let i=0;i<this.infoList[0].list.length;i++){
                        this.infoList[0].list[i].val=data.OrderList[this.infoList[0].list[i].data]
                    }
                    for(let i=0;i<this.infoList[1].list.length;i++){
                        this.infoList[1].list[i].val=data.UserList[this.infoList[1].list[i].data]
                    }
                    this.psotYZ.OrderID=data.StudentUserCourseList.F_Id
                    this.payType = data.OrderList.F_PayType;
                    console.log(this.payType);
                    console.log(typeof this.payType);
                }else notFN(r.data.message)
            })
        },
        //删除
        delFN(){
            this.postFN({
                url:"/Student/DeleteOrderInfo",
                data:{
                    OrderID:this.psotYZ.OrderID
                }
            }).then(r=>{
                if(r.data.state=="success"){
                    this.okFN("删除成功！")
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1500)
                }else this.notFN(r.data.message)
            })
            
        }
    },
    mounted(){
        this.getData()
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuOrderDetail{
    .mRB;.nC;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .PurchaseContant{
        flex: 1;
        overflow: auto;
    }
    .info{
        .fBB;
        padding:0 1.3rem .5rem;
        .bW;
        .infoNar{
            margin: 1rem 0 .5rem;
            .fBB;.tC;.bBS;
            display: flex;
            align-items: center;
            padding: 1rem 0;
            font-size: 1.3rem;
            .img{
                margin-right: .3rem;
                height: 1.7rem;
            }
        }
        div
        {
            .list{
                font-size: 1.1rem;
                display: flex;
                padding: .5rem 0;
                align-items: center;
                .name{
                    font-size: 1.2rem;
                    width: 7.5rem;
                    .redSpot
                    {
                        transform: translate(-0.9rem,-0.5rem);
                        display: inline-block;
                        color: red;
                        font-size: .8rem;
                    }
                }
                .value{
                    font-size: 1.1rem;
                    flex: 1;
                    color: #999;
                    >input{
                        .bBS;
                        padding: .5rem ;
                        .fBB;
                        font-size: 1.15rem;
                        width: 100%;
                    }
                }
                .red
                {
                    color: red;
                    font-size: 1.5rem;
                }
            }
        }
    }
    
    // 立即支付
    .enroll{
        width: 100%;
        position: fixed;
        bottom: 0; 
        display: flex;
        .ok{
            .fBMRB;
            color: white;
        }
        .van-button{
            flex: 1;
            border:none;
        }
    }
}
</style>