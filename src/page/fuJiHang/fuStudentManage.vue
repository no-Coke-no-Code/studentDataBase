/*
 * @Author: fujihang 
 * @Date: 2019-03-25 10:22:49 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-29 17:30:58
    学员管理
 */
<template>
<div id='fuStudentManage'>
    <!-- 内容 -->
    <div class="stuContant">

        <!-- 搜索框 -->
        <div class="bW" style="padding-bottom:.6rem">
            <seach></seach>
        </div>
        

        <!-- 管理 -->
        <van-tabs v-model="active"  swipeable color="#27BCD5" title-active-color="#27BCD5" title-inactive-color='#999999'>
            <van-tab v-for="(item,index) in funContant" :title="item.name+'('+item.num+')'" :key="index">
                <stuManage v-for="i in 10" :key="i"></stuManage>
               
            </van-tab>
        </van-tabs>
    </div>
    <!-- 底部按钮 -->
    <div class="btnBot">
        <van-checkbox checked-color="#27BCD5" v-model="all">共选{{stuNum}}名学员</van-checkbox>
        <van-button class="botton">快速批过</van-button>
    </div>
</div>
</template>

<script>
import seach from '../../components/fujihang/seach';
import stuManage from '../../components/fujihang/stuManage';
export default {
    components:{
        seach,stuManage
    },
    data(){
        return {
            funContant:[
                {
                    name:'全部',
                    num:2,
                },
                {
                    name:'锁定',
                    num:1,
                },
                {
                    name:'跟进',
                    num:1,
                },
                {
                    name:'待到校',
                    num:1,
                },
                {
                    name:'已到校',
                    num:2,
                },
            ],
            //管理内容导航条
            active:0,//当前内容在哪
            stuNum:0,//选择的学生数量
            all:false,//全选或者不全选
        };
    },

    methods: {
        getData(){
            this.getFN({
                url:"/StudentCourse/GetMyUserList?pageSize=10&pageIndex=1&typeId=0&nameOrPhone='"
            }).then(r=>{
                console.log(r.data)
            })
        }
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuStudentManage{
    height: 100%;
    display: flex;
    flex-direction: column;
    .mRB;
    .nC;
    // 内容
    .stuContant{
        flex: 1;
        display: flex;
        flex-direction: column;
        .van-tabs{
            .fBB;
            flex: 1;
            overflow: hidden;
            .van-tabs__content{
                height: 100%;
                margin-top: 1rem;
                .van-tab__pane{
                    height: 100%;
                    overflow: auto;
                    .fBB;
                    padding-bottom: 1rem;
                }
            }
        }
    }

    // 底部按钮
    .btnBot{
        .bW;
        display: flex;
        height: 44px;
        align-items: center;
        padding-left: 1rem;
        border-top: 1px solid rgb(245, 245, 245);
        .fBB;

        .van-checkbox{
            .van-checkbox__label{
                color: #666666;
                font-size: 1.2rem;
            }
            flex: 1;
        }
        .botton{
            border: none;
            width: 40%;
            .fBMRB;
            color: white;
        }
    }
}
</style>