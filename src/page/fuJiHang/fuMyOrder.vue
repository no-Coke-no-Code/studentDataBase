/*
 * @Author: fujihang 
 * @Date: 2019-03-22 10:13:04 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 10:57:08
    我的订单
 */
<template>
<div id="fuMyOrder">

    <!-- 导航条 -->
    <navBarTow btn="true" name='我的订单' ></navBarTow>
        <!-- 订单 -->
    <van-tabs v-model="active"  swipeable color="#27BCD5" title-active-color="#27BCD5" title-inactive-color='#999999' @change="getData">
        <van-tab v-for="(item,index) in funContant" :title="item.name" :key="index">

           <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getData"
            >
                <div class="emptyPage" v-if="(!funContant[0].data) && (active==0)">
                    <div>
                        <img src="../../image/yuRongLiang/emptyOrderList.jpg"/>
                        <p>你还没有购买课程哦</p>
                        <p>到首页去看看吧</p>
                    </div>
                </div>
                <div v-show="active==0"><orderList v-for="(item,index) in funContant[0].data" :key="index" :data="item" @deleteOrderSuc='deleteOrderSuc'></orderList></div>
                <div v-show="active==1"><orderList v-for="(item,index) in funContant[1].data" :key="index" :data="item" @deleteOrderSuc='deleteOrderSuc'></orderList></div>
                <div v-show="active==2"><orderList v-for="(item,index) in funContant[2].data" :key="index" :data="item" @deleteOrderSuc='deleteOrderSuc'></orderList></div>
                <!-- <div v-show="active==3"><orderList v-for="(item,index) in funContant[3].data" :key="index" :data="item"></orderList></div> -->
            </van-list>
            

        </van-tab>

    </van-tabs>
</div>
</template>

<script>
import navBarTow from '../../public/navBarTow'
import orderList from '../../components/fujihang/orderList';
export default {
    components:{
        orderList,navBarTow
    },
    data(){
        return {
            active:this.$route.query.active,//默认全部
            finished:false,//加载是否完成
            loading:false,//加载状态
            funContant:[
                {
                    name:'全部课程',
                    state:0,//类型
                    page:1,//加载页数
                    finished:false,//改类型是否完成
                    data:[],//数据
                },
                {
                    name:'待付款',
                    state:1,
                    page:1,
                    finished:false,
                    data:[],//数据
                },
                {
                    name:'已完成',
                    state:2,
                    page:1,
                    finished:false,
                    data:[],//数据
                },
                // {
                //     name:'售后',
                //     state:3,
                //     page:1,
                //     finished:false,
                //     data:[],//数据
                // },
            ],//导航条
            orderList:[
                {
                    type:"待付款",
                    img:require('../../image/fuJiHang/classList.png'),
                    name:"ZM逐美专业美甲课程培训美甲练习视频",
                    teach:'讲师：李孝利 韩山师范学院',
                    state:0,
                },
                {
                    type:"已完成",
                    img:require('../../image/fuJiHang/classList.png'),
                    name:"ZM逐美专业美甲课程培训美甲练习视频",
                    teach:'讲师：李孝利 韩山师范学院',
                    time:'时间：2019/3/18',
                    state:1,
                },
                {
                    img:require('../../image/fuJiHang/classList.png'),
                    name:"ZM逐美专业美甲课程培训美甲练习视频",
                    teach:'讲师：李孝利 韩山师范学院',
                    state:2,
                },
            ]
        };
    },

    methods: {
        // 删除订单成功  刷新列表
        deleteOrderSuc(){
            this.funContant[this.active].data = [];
            this.funContant[this.active].page = 1;
            this.funContant[this.active].finished = false;
            this.getData();
        },
        // 获取数据
        getData(){
            this.finished=false
            if(this.funContant[this.active].finished) return this.finished=true
            this.loading=true
            this.getFN({
                url:'/Order/GetOrderCourseList?pageSize=10&pageIndex='+this.funContant[this.active].page+'&status='+this.funContant[this.active].state,
            }).then(r=>{
                if(r.data.state=='info'){
                    let data=r.data.data.rows
                    for(let i=0;i<data.length;i++){
                        this.funContant[this.active].data.push(data[i])
                    }
                    if(data.length<10){
                        this.funContant[this.active].finished=true
                        this.loading=false
                        this.finished=true
                        return;
                    }
                    this.funContant[this.active].page++
                    this.loading=false
                }else this.notFN('获取该订单失败，请刷新重试！')
            })
        }
    },
    mounted(){
        // this.getData();
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuMyOrder{
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .mRB;
    .van-tabs{
        flex: 1;
        overflow: hidden;
        .van-tabs__content{
            height: 100%;
            overflow: hidden;
            margin-top: 1rem;
            .van-tab__pane{
                height: 100%;
                .fBB;
                overflow: hidden;
                .van-list{
                    height: 100%;
                    overflow: auto;
                }
            }
        }
    }
    .emptyPage
    {
        width: 100%;
        height: 100%;
        background-color: #fff;
        position: absolute;
        text-align: center;
        z-index: 2;
        div
        {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            width: 50%;
            height: 25%;
            img
            {
                width: 6rem;
                height: 6rem;
            }
            p
            {
                margin-top: 1rem;
                &:first-of-type
                {
                    color: #c1c1c1;
                    font-size: 1.2rem;
                }
                &:nth-of-type(2)
                {
                    font-size: 1rem;
                }
            }
        }
    }
}
</style>