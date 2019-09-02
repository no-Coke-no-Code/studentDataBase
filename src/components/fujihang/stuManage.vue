/*
 * @Author: fujihang 
 * @Date: 2019-03-25 11:20:52 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-03 10:25:43
    学员管理
 */
<template>
<div class="stuManage">
    <div class="top_ma">
        <van-checkbox checked-color="#FF3C5C" v-model="data.isCheck" @change="releaseMore"></van-checkbox>
        <img class="logo" :src="data.UserHearIcon">
        <div class="detail">
            <div class="name">{{data.UserName}}
                <span class="icon">{{data.StateName}}</span>
                <div class="tag" @click="toTap">
                    <img src="../../image/fuJiHang/tag.svg">
                    标签设置
                </div>
            </div>
            <div class="phone">
                <img class="img" src="../../image/fuJiHang/phone.png">
                手机：{{data.Phone?data.Phone:'无'}}
                <span class="fire_flex" v-if="!data.UserState">
                    <van-icon name="bullhorn-o" size="1.3rem" color="red"/>
                </span> 
                
            </div>
            <div class="teach">
                <img class="img" src="../../image/fuJiHang/teach.png">                
                指派员：{{data.AssignUserName?data.AssignUserName:'无'}} 
            </div>
        </div>
    </div>
    <div class="bot_btn">
        <van-button class="wu" size="small" @click="invite">邀请</van-button>
        <van-button class="wu" size="small" @click="release">释放</van-button>
        <van-button class="wu" size="small" @click="Assign">指派</van-button>
        <van-button class="fan" size="small" @click="Follow">跟进</van-button>
        <van-button class="jin" size="small" @click="Declaration">报单</van-button>
    </div>
    <van-popup v-model="ifShowPop" round class="invitePop">
        <p class="title">邀请学员绑定</p>
        <div class="invite1">
            <p>方式1：复制下面链接给学员</p>
            <textarea readonly rows="2" resize="false" class="textArea" v-model="data.BindUrl" ></textarea>
        </div>
        <div class="invite2">
            <p>方式2：保存下方二维码发送给学员</p>
            <img :src="data.QrCodeUrl"/>
            <p>邀请学习</p>
        </div>
        <div class="backBtn" @click="back">返回</div>
    </van-popup>

    <van-popup v-model="releasePop" class="releasePop">
        <p class="title">确定释放吗？</p>
        <p class="content">
            释放成功后学员信息将会被推送到公有池中！
            <br/>
            所有客服都可以领取
        </p>
        <div class="btnGroup">
            <div class="confirmBtn" @click="confirmRelease">确定</div>
            <div class="cancelBtn" @click="cancelRelease">取消</div>
        </div>
    </van-popup>
</div>
</template>

<script>
export default {
    props:['data'],
    data(){
        return {
            check:false,
            ifShowPop:false,
            releasePop:false,
        };
    },

    methods: {
        // 取消释放
        cancelRelease(){
            this.releasePop = false;
        },
        // 确认释放
        confirmRelease(){
            this.$emit("release",this.data)
            this.removeNew()
            this.releasePop = false;
        },
        back(){
            this.ifShowPop = false;
        },
        // 取消最新
        removeNew(){
            this.postFN({
                url:'/Student/UpdateUserState',
                data:{
                    UserID:this.data.UserId
                }
            })
        },
        // 邀请
        invite(){
            this.ifShowPop = true;
        },
        // 释放
        release(){
            // this.$emit("release",this.data)
            // this.removeNew()
            this.releasePop = true;
        },
        // 释放选中的
        releaseMore(){
            this.$emit('releaseMore')
            this.removeNew()
        },
        // 指派
        Assign(){
            this.$router.push({path:'/fuGuidance?F_Id='+this.data.F_Id})
            this.removeNew()
        },
        // 跟进
        Follow(){
            this.$router.push({path:'/fuRemarksChange?userId='+this.data.UserId})
            this.removeNew()
        },
        // 报单
        Declaration(){
            this.$router.push({path:'/fuDeclaratPost?userId='+this.data.UserId})
            this.removeNew()
        },
        // 标签
        toTap(){
            this.$router.push({path:'/fuStudentTag?userId='+this.data.F_Id})
        }
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.stuManage{
    .fBB;.bW;
    padding: 0 1rem;
    .mB;
    // 头
    .top_ma{
        display: flex;
        align-items: center;
        padding: 1rem 0;
        .fBB;.bBS;
        .logo{
            margin: 0 1rem 0 2rem;
            height:5rem;
            width:5rem;
            object-fit: cover;
            border-radius: 50%;
        }
        .img{
            height: 1.2rem;
            margin-right: .6rem;
        }
        .detail{
            flex: 1;
            .name{
                display: flex;
                align-items: center;
                font-size: 1.3rem;
                font-weight: 650;
                .icon{
                    font-size: 1.1rem;
                    border-radius: .5rem 0 .5rem 0;
                    background: #FF8499;
                    font-size: 1rem;
                    padding: .1rem .6rem;
                    margin-left: 1rem;
                    .fBB;
                    color: white;
                }
                .tag{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    font-size: 1.05rem;
                    .tC;
                    >img{
                        height: 1.3rem;
                    }
                }
            }
            .phone{
                font-size: 1.15rem;
                display: flex;
                color: #999;
                margin: .3rem 0;
                align-items: center;
                .fire_flex{
                    flex: 1;
                    text-align: right;
                }
                
            }
            .teach{
                font-size: 1.15rem;
               display: flex;
               align-items: center;
                color: #999;
            }
        }
    }

    // 底部按钮
    .bot_btn{
        display: flex;
        justify-content: flex-end;
        padding: .5rem 0;
        .van-button{
            border-color: #27BCD5;
            width: 19%;
            margin-left: 1rem;
        }
        .wu{
            border: none;
            background: none;
            color: #999;
        }
        .fan{
            .bW;
            color: #27BCD5;           
            
        }
        .jin{
            border:none;
            background: #27BCD5;
            color: white;
        }
    }

    .invitePop
    {
        padding: 0 2rem 4rem;
        padding-bottom: 0;
        height: 45%;
        width: 60%;
        border-radius: 1.5rem;
        .title
        {
            color: #000;
            text-align: center;
            margin-bottom: .5rem;
        }
        .invite1
        {
            margin-bottom: .5rem;
            p
            {
                margin-bottom: .5rem;
            }
        }
        .invite2
        {
            p
            {
                margin-bottom: .5rem;
                &:last-of-type
                {
                    text-align: center;
                }
            }
            img
            {
                width: 8rem;
                height: 8rem;
                margin: auto;
                display: block;
                margin-bottom: .5rem;
            }
        }
        .textArea
        {
            resize: none;
            word-break: break-all;
            word-wrap: break-word;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            border: 1px solid #c0c0c0;
            padding: .2rem;
            border-radius: .5rem;
            background-color: #f7f7f7;
        }
        .backBtn
        {
            position: absolute;
            bottom: 0;
            left:0;
            right: 0;
            margin: auto;
            background-color: #27BCD5;
            color: #fff;
            text-align: center;
            height:4rem;
            line-height: 4rem;
            font-size: 1.5rem;
        }
    }
    .releasePop
    {
        height: 25%;
        width: 60%;
        border-radius: 1.5rem;
        padding: 1rem 1rem 0 1rem;
        .title
        {
            text-align: center;
            margin-bottom:.5rem;
            color: #000;
        }
        .content
        {
        }
        .btnGroup
        {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            margin: auto;
            height: 4rem;
            line-height: 4rem;
            text-align: center;
            color: #fff;
            background-color: #27BCD5;
            display: flex;
            .confirmBtn,.cancelBtn
            {
                flex: 1;
            }
            .confirmBtn
            {
                background-color: #27BCD5;
            }
            .cancelBtn
            {
                background-color: #d6d6d6;
            }
        }
    }
}
</style>