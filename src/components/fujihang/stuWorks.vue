/*
 * @Author: fujihang
 * @Date: 2019-03-21 20:21:01
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 14:32:33
    学生作品卡片
 */
<template>
<div class="stuWorks" @click="toFN">
    <img :src="data.CourserLogo" class="img">
    <div class="contant">
        <div class="name">
            {{data.CourserName}}
        </div>
        <div class="works">
            {{data.work}}
        </div>
        <div class="timeDet">
            <span class="time">
                {{data.CreatorTime}}
            </span>
            <van-button class="det" size="mini">详情</van-button>
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
        toFN(){
            this.$router.push({path:'/fuWorksDetail?F_Id=' + this.data.F_Id})
        }

    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.stuWorks{
    .nC;
    margin-left: 1.3rem;
    display: flex;
    padding: 1rem 1rem 1rem 0;
    .fBB;.bBS;.bW;
    .img{
        height: 6.5rem;
        width: 6.5rem;
        border-radius: .3rem;
        object-fit: cover;
    }
    .contant{
        flex: 1;
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        .name{
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: .3rem;
        }
        .works{
            font-size: 1.1rem;
            color: #999;
        }
        .timeDet{
            font-size: 1.1rem;
            flex: 1;
            display: flex;
            align-items: flex-end;
            .time{
                flex: 1;
                color: #999;
            }
            .det{
                .fBMRB;
                color: white;
            }

        }
    }
}
</style>
