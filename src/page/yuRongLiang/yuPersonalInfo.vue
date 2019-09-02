<template>
    <div id="yuPersonalInfoWrapper">
        <!-- <navBarTow btn="true" name='我的资料' url='/yuPersonalCenter'></navBarTow> -->
        <div class="infoItem">
            <span class="infoText">头像</span>
            <img :src="userInfo.F_HeadIcon"/>
        </div>
        <div class="infoItem">
            <span class="infoText">姓名</span>
            <input v-model="userInfo.F_NickName" readonly/>
        </div>
        <div class="infoItem">
            <span class="infoText">性别</span>
            <input v-model="gender" readonly/>
        </div>
        <div class="infoItem">
            <span class="infoText">手机号</span>
            <input v-model="userInfo.F_MobilePhone" readonly/>
        </div>
        <div class="infoItem">
            <span class="infoText">微信</span>
            <input v-model="userInfo.F_WeChat" readonly/>
        </div>
        <div class="infoItem">
            <span class="infoText">地址</span>
            <input v-model="address" readonly/>
        </div>

        <div class="editBtn" @click="edit">编辑个人资料</div>
    </div>
</template>

<script>
import navBarTow from '../../public/navBarTow'
export default {
    name:"yuPersonalInfoWrapper",
    components: {navBarTow},
    data(){
        return{
            address:"",
            gender:"",
            userInfo:{},
        }
    },
    methods:{
        // 前往编辑个人资料
        edit(){
            this.$router.push({path:"/yuEditPersonalInfo",query:{}});
        },
        // 初始化页面
        init(){
            this.getFN({
                url:"/user/GetUserInfo"
            }).then((res)=>{
                console.log(res);
                this.userInfo = res.data.data;
                this.address = this.userInfo.Province+this.userInfo.City+this.userInfo.Area;
                if(this.address == 0)
                {
                    this.address = "";
                }
                if(this.userInfo.F_Gender == 1)
                {
                    this.gender = "男";
                }
                else
                {
                    this.gender = "女";
                }
                window.localStorage.setItem("editUserInfo",JSON.stringify(this.userInfo));
            });
        },
    },

    created(){
        this.init();
    },
}
</script>

<style lang="less" scoped>
    #yuPersonalInfoWrapper
    {
        background-color: #f7f7f7;
        .infoItem
        {
            position: relative;
            display: flex;
            padding: 1rem 2rem;
            font-size: 1.2rem;
            border-bottom: 1px solid #f7f7f7;
            background-color: #fff;
            &:first-of-type
            {
                padding-top: 1.5rem;
                padding-bottom: 1.5rem;
                justify-content: space-between;
                height: 3rem;
                line-height: 3rem;
                img
                {
                    border-radius: 50%;
                    width: 3rem;
                    height: 3rem;
                }
            }
            .infoText
            {
                margin-right: 1rem;
                display: inline-block;
                width: 5rem;
            }
            input
            {
                flex: 1;
                text-align: right;
            }
        }

        .editBtn
        {
            background-color: #27bbd5;
            color: #fff;
            text-align: center;
            height: 4rem;
            line-height: 4rem;
            margin-top: 3rem;
            font-size: 1.5rem;
        }
    }
</style>
