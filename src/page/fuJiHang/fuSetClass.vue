/*
 * @Author: fujihang 
 * @Date: 2019-03-21 19:34:11 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-25 16:35:17
    开设课程
 */
<template>
<div id="fuSetClass">
    <!-- 头部 -->
    <div class="TopName">
        <img class="img" src="../../image/fuJiHang/xin.png">收费标准
    </div>

    <!-- 详细信息 -->
    <div class="details">
        <div class="narTop">
            <span v-for="(item,index) in narTop" :key="index">
                {{item.name}}
            </span>
        </div>
        <div class="list" v-for="(item,index) in listData" :key="index">
            <span class="name">
                {{item.name}}
            </span>
            <span class="mon">
                {{item.mon}}
            </span>
            <span class="det">
                {{item.det}}
            </span>
        </div>
    </div>


</div>
</template>

<script>
export default {
    data(){
        return {
            narTop:[
                {
                    name:'课程'
                },
                {
                    name:'收费'
                },
                {
                    name:'住宿'
                },
            ],//详细信息头部
            listData:[
                {
                    name:'美甲',
                    mon:'￥99.00',
                    det:'包住'
                },
                {
                    name:'皮肤管理',
                    mon:'￥99.00',
                    det:'包住'
                },
                {
                    name:'纹绣',
                    mon:'￥99.00',
                    det:'包住'
                },
            ],//描述列表
        };
    },

    methods: {

    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuSetClass{
    .nC;
    // 头部
    .TopName{
        display: flex;
        align-items: center;
        padding: 1rem 1.3rem 1rem 0;
        margin-left: 1.3rem;
        font-size: 1.3rem;
        .fBB;.bBS;.tC;
        .img{
            margin-right: .6rem;
            height: 1.7rem;
        }
    }

    // 详细信息
    .details{
        margin: 1rem;
        border:1px solid rgb(245, 245, 245);
        border-top: none;
        .fBB;
        .narTop{
            padding: .8rem 0;
            font-size: 1.25rem;
            display: flex;
            background: #F0FAFC;
            >span{
                flex: 1;
                text-align: center;
            }
        }
        .list{
            font-size: 1.1rem;
            display: flex;
            padding: .8rem 0;
            >span{
                flex: 1;
                text-align: center;
            }
            .name,.det{
                color: #999;
            }
            .mon{
                font-size: 1.2rem;
                .jG;
            }
        }
    }
}
</style>