<template>
    <div id="yuRateCard">
        <img :src="item.HeadIcon==null?'/':item.HeadIcon" class="userImg"/>
        <div class="rateContent">
            <p>
                <span class="userName">
                    {{item.NickName}}
                </span>
                <van-rate v-model="item.Point" readonly></van-rate>
            </p>
            <p>
                <span>已学习课时8小时</span>
                <span class="commentTime">{{item.CreatorTime}}</span>
            </p>
            <p class="commentContent">{{item.CommentContent}}</p>
            <div class="replyArea" v-if="item.ReplyContent">
                <div class="triangle"></div>
                <p>课程团队回复</p>
                <p>{{item.ReplyContent}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:["item"],
    data(){
        return{
            
        }
    },
    name:"yuRateCard",
    mounted(){
        console.log(this.item);
    },
}
</script>

<style lang="less">
    #yuRateCard
    {
        display: flex;
        margin-bottom: 2rem;
        .userImg
        {
            width: 3rem;
            height: 3rem;
            border-radius:50%;
            margin-right:1rem;
        }
        .rateContent
        {
            flex: 1;
            p
            {
                margin-bottom: .5rem;
                .userName
                {
                    font-size: 1.5rem;
                }
                .van-rate,span:nth-of-type(2)
                {
                    float:right;
                }
                .van-rate__icon
                {
                    color: #2ba8be !important;
                }
            }
            p:nth-of-type(2)
            {
                color:#b7b8bc;
            }
            .commentContent
            {
                font-size: 1.5rem;
            }
            .replyArea
            {
                position: relative;
                background-color: #f3f4f6;
                margin-top: 1.5rem;
                padding: .8rem 1.25rem;
                border-radius: .3rem;
                .triangle
                {
                    position: absolute;
                    top: -1.6rem;
                    left: 2rem;
                    width: 0;
                    height: 0;
                    border-top: .8rem solid transparent;
                    border-left: .8rem solid transparent;
                    border-right: .8rem solid transparent;
                    border-bottom: .8rem solid #f3f4f6;
                }
                p:nth-of-type(1)
                {
                    color: #3689ab;
                }
                p:nth-of-type(2)
                {
                    color: #000;
                    font-size: 1.35rem;
                }
            }
        }
    }
</style>
