/*
 * @Author: fujihang 
 * @Date: 2019-03-20 11:30:56 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-25 18:59:59
    自选课程
 */

<template>
<div id="fuOptCou">

    <!-- 搜索框 -->
    <seach plr='请输入课程关键字'></seach>

    <!-- 选课类型 -->
    <div class="classType">
        <div class="type" v-for="i in 4" :key="i">
            <div class="nameBg">
                <img src="../../image/fuJiHang/OptCou.png" class="Bg">
                <div class="nameEn">
                    <div class="name">
                        美甲
                    </div>
                    <div class="En">
                        MANICURE
                    </div>
                </div>
            </div>
            <div class="detail">先进高端美甲技艺、理念、仪器设备、经操，项目场景化
            </div>
        </div>
    </div>


</div>
</template>

<script>
import seach from '../../components/fujihang/seach';
export default {
    components:{
        seach,
    },
    data(){
        return {

        };
    },

    methods: {

    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuOptCou{
    .bW;
    .hO;.nC;
    

    // 内容
    .classType{
        display: flex;
        padding: .8rem .9rem;
        box-sizing: border-box;
        flex-wrap: wrap;
        .type{
            width: 50%;
            padding: 0 .3rem;
            box-sizing: border-box;
            margin-bottom: .6rem;
            .nameBg{
                position: relative;
                height: 6.2rem;
                .nameEn{
                    color: white;
                    position: absolute;
                    top: 0;left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    .name{
                        font-size: 1.25rem;
                        margin-bottom: .3rem;
                    }
                }
                .Bg{
                    height:100%;
                    object-fit: cover;
                    width: 100%;
                }
            }
            .detail{
                padding: .9rem .5rem;
                box-sizing: border-box;
                color: #999;
                .Tline;
                font-size: 1.1rem;
                .bW;
                box-shadow: .2rem .2rem .5rem rgb(236, 236, 236);
            }
        }
    }
}
</style>