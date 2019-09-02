/*
 * @Author: fujihang 
 * @Date: 2019-03-20 13:50:08 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-25 16:27:40
    学校课程
 */
<template>
<div id="fuSchoolCurn"> 
    <!-- 导航条 -->
    <div class="navBar">
        <span class="goBtn">
            <img src="../../image/public/Return.svg" @click="goFN">
        </span>
        <span class="name">学校课程</span>
        <span class="schoolN">
            <van-icon name="bars" size="1.8rem" @click="choose=!choose"/>
            聚亿美
            <div :class="['alert',choose?'openAlert':'']">
                <img src="../../image/fuJiHang/alertJ.svg">
                <div class="chooseList">
                    <div class="choose" v-for="(item,index) in chooseList" :key="index">
                        {{item}}
                    </div>
                </div>
            </div>
        </span>
    </div>


    <!--  -->
    <schoolCurn v-for="i in 2" :key="i"></schoolCurn>
</div>
</template>

<script>
import schoolCurn from "../../components/fujihang/schoolCurn"
export default {
    components:{
        schoolCurn,
    },
    data(){
        return {
            chooseList:['聚亿美','匠心','其他'],//选择列表
            choose:false,//列表弹窗
        };
    },

    methods: {
        // 返回上一层
        goFN(){
            this.$router.go(-1);
        }
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
#fuSchoolCurn{
    .hO;.nC;
    position: relative;
    // 导航条
    .navBar{
        display: flex;
        align-items: center;
        padding:.8rem 1rem;
        box-sizing: border-box; 
        background: #F7F7F7;
        .bBS;
        >span{
            flex: 1;
        }
        .goBtn{
            >img{
                height: 1.9rem;
            }
        }
        .name{
            font-size: 1.5rem;
            text-align: center;
        }
        .schoolN{
            display: flex;
            align-items: center;
            font-size: 1.3rem;
            justify-content: flex-end;
            color: #999;
            position: relative;
            .van-icon-bars{
                margin-right: .4rem;
            }
            //选择的卡片弹窗
            .alert{
                position:absolute;
                top: 0;
                text-align:center;
                width: 6rem;
                z-index: -1;
                transform: translate(-3rem,2rem);
                opacity: 0;
                transition: .3s;
                >img{
                    margin-left: 1rem;
                    height: 2rem;
                }
                .chooseList{
                    .bW;
                    margin-top: -.9rem;
                    box-shadow: .3rem .3rem .6rem rgb(153, 153, 153);
                    .choose{
                        box-sizing: border-box;
                        margin: 0 .6rem;
                        padding: .6rem 0;
                        .bBS;
                    }
                }
            }
            .openAlert{
                z-index: 9;
                opacity: 1;
                transform: translate(-3rem,1rem);
            }
        }
    }
    

    
}
</style>