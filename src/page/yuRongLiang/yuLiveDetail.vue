<template>
    <div id="yuLiveDetail">
        <div class="yuLiveBanner">
            <video class="video" controls></video>
        </div>
        <p class="liveCommentTitle">你已进入直播间！！！</p>
        <div class="liveCommentList">
            <div v-for="(item,index) in commentList" :key="index" class="liveCommentItem">
                <div class="userImgWrapper">
                    <img class="userImg" :src="item.userImg"/>
                </div>
                <span class="userName">{{item.userName}}：</span>
                <span class="userComment">{{item.userComment}}</span>
            </div>
        </div>
        <div class="liveCommentInput">
            <input class="commentInput" placeholder="聊天点这里" @focus="focusInput" @blur="blurInput" ref="commentInput"/>
            <!-- <span class="gift">礼物</span> -->
            <img class="giftIcon" src="../../image/yuRongLiang/gift.jpg"/>
        </div>

        <div class="actionGroup">
            <div class="yaoqing">邀</div>
            <div class="dashang">赏</div>
            <div class="like"><img src="../../image/yuRongLiang/like.jpg" class="likeIcon"/></div>
            <div class="likeNum">
                1.14万
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            roomPassword:"",
            show:true,
            activeOnline:"",
            commentList:[],
        }
    },
    methods:{
        dialogConfirm(){
            alert(this.roomPassword);
            this.postFN({
                url:"/Course/CheckLivePassowrd",
                data:{
                    chapterId:"",
                    password:this.roomPassword

                    // 参数:
                    // chapterId（章节F_Id）,
                    // password（密码）
                },
            }).then((res)=>{
                console.log(res,'查看密码返回参数');
            });
        },

        getClassFN(){},

        focusInput(e){
            e.target.style.backgroundColor = "#fff";
            e.target.style.border = "1px solid #f0f0f0";
        },
        blurInput(e){
            e.target.style.backgroundColor = "#f0f0f0";
            e.target.style.border = "1px solid transparent";
        },
    },
    created(){
        
        console.log(this.$route.query.id);
        console.log(this.$route.query.room);
    },
}
</script>

<style lang="less">
#yuLiveDetail
{
    .yuLiveBanner
    {
        width:100%;
        height: 200px;
        // background-color: red;
        .video
        {
            width: 100%;
            height: 100%;
        }
    }
        .liveCommentTitle
        {
            width: 80%;
            margin: 1rem auto;
            background-color: #f0f0f0;
            padding: .8rem;
        }
        .liveCommentList
        {
            .liveCommentItem
            {
                width: 80%;
                margin: .5rem auto;
                display:flex;
                .userImgWrapper
                {
                    display: flex;
                    align-items:center;
                    .userImg
                    {
                        width:4rem;
                        height: 4rem;
                        border-radius: 50%;
                    }
                }
                .userName
                {
                    width: 20%;
                    margin-left: .5rem;
                    color: gray;
                    display: flex;
                    justify-content:center;
                    align-items: center;
                }
                .userComment
                {
                    margin-left: 0.3rem;
                    flex: 1;
                    display: flex;
                    align-items: center;
                }
            }
        }
        .liveCommentInput
        {
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
            margin: auto;
            width: 80%;
            height: 3.5rem;
            line-height: 2.5rem;
            padding: 1rem 0;
            background-color: #fff;
            .commentInput
            {
                width: 90%;
                height: 2.5rem;
                line-height: 2.5rem;
                font-size: 1.25rem;
                padding:.1rem 1rem;
                border-radius: 5px;
                background-color: #f0f0f0;
                border: 1px solid transparent;
            }
            .gift
            {
                position: absolute;
                right: -3rem;
                color: #fff;
                background-color: #27BCD5;
                border-radius: 5px;
                padding: 0.15rem 0.5rem;
            }
            .giftIcon
            {
                position: absolute;
                right: -3rem;
                border-radius: 5px;
                padding: 0.15rem 0.5rem;
                width: 2.5rem;
                height: 2.5rem;
            }
        }

    .actionGroup
    {
        position: fixed;
        right: .8rem;
        bottom: 10rem;
        .yaoqing,.dashang,.like
        {
            width: 3rem;
            height: 3rem;
            line-height: 3rem;
            margin-bottom: .5rem;
            text-align: center;
            border-radius: 50%;
            color: #fff;
            font-size: 1.3rem;
        }
        .yaoqing
        {
            background-color: #00b8ec;
            display: flex;
            justify-content:center;
            align-items: center;
        }
        .dashang
        {
            background-color: #ffc100;
            display: flex;
            justify-content:center;
            align-items: center;
        }
        .like
        {
            background-color: #fe5655;
            .likeIcon
            {
                width:1.5rem;
                height:1.5rem;
                vertical-align: text-top;
            }
        }
        .likeNum
        {
            background-color: #7f7f7f;
            border-radius: 3px;
            padding: .2rem;
            color: #fff;
        }
    }
}
</style>
