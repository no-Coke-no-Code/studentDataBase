/*
 * @Author: fujihang 
 * @Date: 2019-03-20 15:43:26 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-25 19:05:33
    课程详情卡片
 */
<template>
<div class="classCard" >
    <div class="img">
        <div class="type">{{data.type}}</div>
        <img :src="data.img">
    </div>
    <div class="content">
        <div class="name">
            {{data.name}}
        </div>
        <div class="teach_detail">
            <div class="teach">
                {{data.teach}}
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
.classCard{
    .nC;
    display: flex;
    padding: 1rem 1.2rem;
    box-sizing: border-box;
    height: 8rem;
    .img{
       
        position: relative;
        width: 35%;
        .type{
            position: absolute;
            .tB;
            padding: .4rem .2rem;
            box-sizing: border-box;
            color: white;
            border-radius: .5rem 0 .5rem 0;
        }
        >img{
            object-fit: cover;
            border-radius: .5rem;
            height: 100%;
            width: 100%;
        }
    }
    .content{
        margin-left: .9rem;
        display: flex;
        flex-direction: column;
        flex: 1;
        .name{
            font-size: 1.25rem;
            .Tline;
            font-weight: 650;
        }
        .teach_detail{
            flex: 1;
            font-size: 1.1rem;
            display: flex;
            align-items: flex-end;
            .teach{
                .Oline;
                flex: 1;
                color: #999;
            }
        }
    }
}
</style>