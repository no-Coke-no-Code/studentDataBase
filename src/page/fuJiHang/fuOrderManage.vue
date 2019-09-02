/*
 * @Author: fujihang 
 * @Date: 2019-04-03 17:30:56 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-09 20:51:53
    订单管理
 */
<template>
<div id='fuOrderManage'>
    <!-- 搜索 -->
    <div class="bW" style="padding-bottom:.1rem">
        <seach plr="请输入课程名称"  @seachFN="seachFN"></seach>
    </div>
    

    <!-- 内容 -->
    <div class="contantOM">
        <!-- <van-tabs v-model="active" background="#F7F7F7"  swipeable color="#27BCD5" title-active-color="#27BCD5" title-inactive-color='#999999' @change="getData()">
            <van-tab v-for="(items,index) in funContant" :title="items.Name" :key="index"> -->
                
                <!-- <div class="navOM">
                    <span class="schoolChoose" @click="showSchool=true">
                        <van-icon name="bars" size="1.5rem"/>
                        学校 {{isChool.name?'> '+isChool.name:''}}
                    </span>
                    <van-button @click="isBtnFN(true)" :class="isBtn?'isBtn':''" size="small">待到校</van-button>
                    <van-button @click="isBtnFN(false)" :class="isBtn?'':'isBtn'" size="small">已到校</van-button>
                </div> -->

                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getData"
                >

                    <!-- <div class="childOME" v-for="(items,indexs) in funContant[active].data" :key="indexs" >
                        <img :src="items.HeadIcon">
                        <span class="clCont">
                            <div class="momey">
                                <img src="../../image/fuJiHang/money.svg">
                                <span class="name">定金：</span><span class="jG">￥{{items.Price}}</span>
                                <van-checkbox v-show="isBtn" v-model="items.State" checked-color="#FF3C5C" @change="changeSta(items)">到校意愿</van-checkbox>
                            </div>
                            <div class="cont_des">
                                <img src="../../image/fuJiHang/teach.png">
                                <span class="name">购买者：</span>{{items.Name}}
                            </div>
                            <div class="cont_des">
                                <img src="../../image/fuJiHang/time.svg">
                                <span class="name">成交时间：</span>{{items.CreatorTime}}
                            </div>
                        </span>
                    </div> -->

                        <div class="orderList" v-for="(items,indexs) in funContant[active].data" :key="indexs">
                            <div class="pre">
                                <div class="img">
                                    <img :src="items.HeadIcon">
                                    <div class="className">
                                        {{items.CourseName}}
                                    </div>
                                    <div class="badge">
                                        <p class="badgeText">{{items.F_TeachingType==1?"线上":"线下"}}</p>
                                        <div class="badgeBottom"></div>
                                    </div>
                                </div>
                                <div class="content">
                                    <!-- <div class="name">
                                        {{data.CourserName}}
                                    </div> -->
                                    <div class="num">
                                        订单编号：{{items.OrderNum?items.OrderNum:'无'}}
                                    </div>
                                    <div class="time">
                                        下单时间：{{items.CreatorTime}}
                                    </div>
                                    <div class="state">
                                        订单状态：<span class="red">{{items.OrderState==0?"待付款":"已付款"}}</span>
                                    </div>
                                    <div class="name">
                                        学员姓名：{{items.Name}}
                                    </div>
                                    <div class="phone">
                                        手机号：{{items.F_MobilePhone}}
                                    </div>
                                </div>
                            </div>
                            <div class="new">
                                <div class="priceWrapper">
                                    <p>课程价格：<span class="price">￥{{items.Price}}</span></p>
                                    <p>订单总额：<span class="price">￥{{items.Price}}</span></p>
                                </div>
                                <div class="btnGroup">
                                    <span class="state">{{items.State==0?"待到校":items.State==1?"到校意愿":"已到校"}}</span>
                                    <span class="checkOrder" @click="checkOrder(items)">查看订单</span>
                                </div>
                            </div>
                        </div>

                </van-list>
                    <!-- <div class="childOME" >
                        <img src="../../image/fuJiHang/classList.png">
                        <span class="clCont">
                            <div class="momey">
                                <img src="../../image/fuJiHang/money.svg">
                                <span class="name">定金：</span><span class="jG">￥99.00</span>
                                <van-checkbox v-model="checked" checked-color="#FF3C5C">到校意愿</van-checkbox>
                            </div>
                            <div class="cont_des">
                                <img src="../../image/fuJiHang/teach.png">
                                <span class="name">购买者：</span>卡罗拉
                            </div>
                            <div class="cont_des">
                                <img src="../../image/fuJiHang/time.svg">
                                <span class="name">成交时间：</span>2019/05/05 13:50:40
                            </div>
                        </span>
                    </div> -->

            <!-- </van-tab>
        </van-tabs> -->
    </div>

    <!-- 学校列表 -->
    <van-popup v-model="showSchool" position="bottom">
        <div :class="['schoolP',isChool.index==index?'isChool':'']" v-for="(item,index) in schoolList" :key="index" @click="isChoolFN(item,index)">
            {{item.F_Name}}
        </div>
    </van-popup>
</div>
</template>

<script>
import seach from '../../components/fujihang/seach'
export default {
    components:{
        seach,
    },
    data(){
        return {
            payType:"",
            mediaType:"",
            isChool:{
                index:-1,
                id:'',
                name:'',
            },//选择的学校
            schoolList:[
                1,2,3,4
            ],//学校列表
            showSchool:false,//显示隐藏学校选择
            funContant:[
                {
                    page:1,
                    data:[],
                    finished:false,
                    SchoolCourseId:"",
                }
            ],//导航条
            isBtn:true,//按钮
            active:0,
            checked:false,
            loading:false,//加载状态
            finished:false,//加载完成
            seachName:'',//搜索字
            userInfo:JSON.parse(localStorage.getItem("userInfo"))
        };
    },

    methods: {
        checkOrder(item){
            console.log(item,'查看订单详情');
            window.localStorage.setItem("orderDetail",JSON.stringify(item));
            this.$router.push({path:"/yuManageOrderDet",query:{
                id:item.F_Id
            }});
        },
        // 查询
        seachFN(name){
             for(let i=0;i<this.funContant.length;i++){
                this.funContant[i].finished=false
                this.funContant[i].page=1
                this.funContant[i].data=[]
            }
            this.seachName=name
            this.getData()
        },
        // 到校切换
        // isBtnFN(change){
        //     this.isBtn=change
        //     for(let i=0;i<this.funContant.length;i++){
        //         this.funContant[i].finished=false
        //         this.funContant[i].page=1
        //         this.funContant[i].data=[]
        //     }
        //     this.getData()
        // },
        // 获取数据
        getData(){ 
            let data={
                UserID:this.userInfo.wxInfo.UserId,
                rows:10,
                page:this.funContant[this.active].page,
                State:this.isBtn?0:1,
            }
            if(this.seachName) data.CourseName=this.seachName
            else data.CourseName=null
            if(this.funContant[this.active].SchoolCourseId) data.SchoolCourseId=this.funContant[this.active].SchoolCourseId
            else data.SchoolCourseId=null
            this.finished=false
            if(this.funContant[this.active].finished) return this.finished=true;
            this.loading=true
            this.postFN({
                url:"/Student/GetCustomerOrderList",
                data:data
            }).then(r=>{
                // F_TeachingType：0：线下，1：线上
                // F_LiveType：-1：普通课程，0：直播课程，1：录播课程，2：音频课程
                console.log(r);
                if(r.data.state=='success'){
                    let data=r.data.data
                    for(let i=0;i<data.length;i++){
                        this.funContant[this.active].data.push(data[i])
                    }
                    if(data.length<10){
                        this.finished=true
                        this.funContant[this.active].finished=true
                        this.loading=false
                        return;
                    }

                    this.funContant[this.active].page++;
                    this.loading=false
                }
                else this.notFN('获取列表失败！')
            })
        },
        //获取学校
        // getShool(){
        //     this.postFN({
        //         url:'/Student/GetSchoolList',
        //         data:{
        //             UserID:this.userInfo.wxInfo.UserId,
        //         }
        //     }).then(r=>{
        //         console.log(r);
        //         if(r.data.state=="success"){
        //             this.schoolList=r.data.data
        //             this.isChool={
        //                 SchoolId:this.schoolList[0].F_Id,
        //                 index:-1,
        //                 name:this.schoolList[0].F_Name,
        //             }
        //             this.getClass();
        //         }else this.notFN('获取学校列表失败，请刷新重试！')
        //     })
        // },
        // 获取课程类型
        // getClass(){
        //     this.postFN({
        //         url:'/Student/GetCourseList',
        //         data:{
        //             // UserID:'13972CAC-50FD-4A6C-B59C-D5E89B072D46',
        //             userID:this.userInfo.wxInfo.UserId,
        //             SchoolID:this.isChool.SchoolId
        //         }
        //     }).then(r=>{
        //         if(r.data.state=="success"){
        //             this.funContant=[]
        //             let data=r.data.data
        //             let all={
        //                 Name:'全部',
        //                 finished:false,
        //                 page:1,
        //                 data:[],
        //             }
        //             this.funContant.push(all)
        //             for(let i=0;i<data.length;i++){
        //                 data[i].finished=false;
        //                 data[i].page=1;
        //                 data[i].data=[]
        //                 this.funContant.push(data[i])
        //             }
        //         }else this.notFN('获取学校列表失败，请刷新重试！')
        //     })

        // },
        // 选择学校
        // isChoolFN(data,index){
        //     this.isChool={
        //         SchoolId:data.F_Id,
        //         index:index,
        //         name:data.F_Name,
        //     }
        //     this.funContant=[]
        //     setTimeout(()=>{
        //         this.isChool.index=-1
        //         this.showSchool=false
        //     },100)
        //     this.getClass();
        // },
        // 修改到校意愿
        // changeSta(items){
        //     let a=0
        //     if(items.State) a=1
        //     this.postFN({
        //         url:'/Student/UpdateSchoolState',
        //         data:{
        //             OrderID:items.F_Id,
        //             State:a
        //         }
        //     }).then(r=>{
        //         if(r.data.state=="success")this.okFN('修改成功！')
        //         else{
        //             items.State=!items.State
        //             this.notFN("修改失败！")
        //         } 
        //     })
        // },
    },
    mounted(){
        this.getData();
        // this.getShool();
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuOrderManage{
    .mRB;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    // 内容
    .contantOM{
        flex: 1;
        .fBB;
        overflow: hidden;
        .van-tabs{
            height: 100%;
            display: flex;
            flex-direction: column;
            .fBB;
            .van-tabs__content{
                flex: 1;
                overflow: hidden;
                .van-tab__pane{
                    overflow: hidden;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    .fBB;
                    // 子导航条
                    .navOM{
                        display: flex;
                        padding: 1rem;
                        .fBB;
                        .schoolChoose{
                            flex: 1;
                            color: #999;
                            font-size: 1.15rem;
                            display: flex;
                            align-items: center;
                        }
                        .van-button{
                            .mRB;
                            border:none;
                            color: #999;
                        }
                        .isBtn{
                            .fBMRB;
                            color: white;
                        }
                    }
                    .van-list{
                        flex: 1;
                        .fBB;
                        overflow: auto;
                    }
                }
            }
        }
        .van-list
        {
            padding: .5rem;
            background-color: #f7f7f7;
        }
    }


    // 卡片
    .childOME{
        display: flex;
        .bW;
        padding: .5rem 1rem;
        align-items: center;
        .fBB;.mB;
        >img{
            height: 8rem;
            width: 35%;
            object-fit: cover;
        }
        .clCont{
            flex: 1;
            margin-left: .6rem;
            color: #999;
            font-size: 1.15rem;
            .name{
                margin: 0 .2rem;
            }
            .momey{
                display: flex;
                align-items: center;
                >img{
                    height: .9rem;
                }
                .jG{
                    font-size: 1.2rem;
                    flex: 1;
                }
                .van-checkbox__label{
                    color: #999;
                }
            }
            .cont_des{
                margin-top: .1rem;
                >img{
                    height: .9rem;;
                }
            }
        }
    }
    .van-popup{
        overflow: auto;
        max-height: 40%;
        .schoolP{
            padding: 1rem;
            .fBB;
            font-size: 1.2rem;
            text-align: center;
            .bBS;
        }
        .isChool{
            background: rgb(238, 238, 238);
        }
    }
    .badgeText
    {
        width: 2.5rem;
        height: 2rem;
        background-color: #27bcd5;
        color: #fff;
        text-align: center;
        line-height: 2rem;
    }
    .badgeBottom
    {
        position: absolute;
        top: 2rem;
        width: 0;
        height: 0;
        border-color: #27bcd5 #27bcd5 transparent;
        border-style: solid;
        border-width: 0 1.25rem 1rem;
    }

    .orderList
    {
        margin-bottom: 1rem;
        background-color: #fff;
        .pre .img
        {
            position: relative;
            height: 8rem;
            width: 35%;
        }
    }

    .state
    {
        color: red;
    }
    .checkOrder
    {
        margin-left: 2rem;
    }

    .name,.phone
    {
        margin-top: .5rem;
    }
}
</style>