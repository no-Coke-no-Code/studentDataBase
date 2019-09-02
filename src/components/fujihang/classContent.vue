/*
 * @Author: fujihang 
 * @Date: 2019-03-19 18:44:08 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-25 16:46:45
    课程列表
 */
<template>
<div class="classContent">
    <!-- 标题 -->
    <div class="classBar">
        <img :src="data.icon">
        <span class="barName">{{data.barName}}</span>
        <van-icon name="arrow"></van-icon>
    </div>

    <!-- 内容列表 -->
    <div class="classList" v-for="(item,index) in data.list" :key="index">
        <div class="img">
            <div class="type s0" v-show="item.sta==0">{{item.type}}</div>
            <div class="type s1" v-show="item.sta==1">{{item.type}}</div>
            <div class="type s2" v-show="item.sta==2">{{item.type}}</div>
            <img :src="item.img">
        </div>
        <div class="content">
            <div class="name">
                {{item.name}}
            </div>
            <div class="teach_detail">
                <div class="teach">
                    {{item.teach}}
                </div>
                <van-button class="detail" size="mini">详情</van-button>
            </div>
        </div>
    </div>

    
</div>
</template>

<script>
export default {
    props:['data'],
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
.classContent{
    margin-bottom: .8rem;
    .bW;.nC;
    // 标题
    .classBar{
        display: flex;
        align-items: center;
        padding: 1rem 1rem;
        box-sizing: border-box;
        >img{
            height: 1.7rem;
        }
        .barName{
            .tC;
            font-size: 1.3rem;
            flex: 1;
            margin-left: .3rem;
        }
        .more{
            transform: rotateY(180deg);
            >img{
                height: 1.5rem;
            }
        }
    }
    // 内容列表
    .classList{
        border-top: 1px solid rgb(245, 245, 245);
        display: flex;
        padding: 1rem 1rem 1rem 0;
        margin-left: 1rem;
        box-sizing: border-box;
        .img{
            position: relative;
            .type{
                position: absolute;
               
                padding: .4rem .2rem;
                box-sizing: border-box;
                color: white;
                border-radius: .5rem 0 .5rem 0;
            }
            .s0{
                background: #FF8499;
            }
            .s1{
                background: #48ABEA;
            }
            .s2{
                background: #A0A0A0;
            }
            >img{
                border-radius: .5rem;
                height: 6rem;
            }
        }
        .content{
            margin-left: 1rem;
            display: flex;
            flex-direction: column;
            flex: 1;
            .name{
                .Tline;
                font-size: 1.25rem;
                font-weight: 650;
            }
            .teach_detail{
                flex: 1;
                display: flex;
                font-size: 1.1rem;
                align-items: flex-end;
                .teach{
                    .Oline;
                    flex: 1;
                    color: #999;
                }
            }
            .detail{
                .fBMRB;
                color: white;
            }
        }
    }
}
</style>