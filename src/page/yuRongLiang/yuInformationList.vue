<template>
    <div id="yuInformationList">
        <div class="listWrapper">
            <!-- 内容 -->
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getInfoList"
            >
                <div class="listItem" v-for="(item,index) in informationList" :key="index" @click="toInfoDetail(item)">
                    <p class="infoName">{{item.Information}}</p>
                    <p class="infoTime">{{item.F_CreatorTime}}</p>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
export default {
    name:"yuInformationList",
    data(){
        return{
            informationList:[],
            loading:false,
            finished:false,
            page:1,
            userInfo:{},
        }
    },
    methods:{
        // 获取最新资讯列表
        getInfoList(){
            this.loading = true;
            this.postFN({
                url:"/Student/GetInformation",
                data:{
                    UserID:this.userInfo.wxInfo.UserId,
                    rows:10,
                    page:this.page,
                },
            }).then((res)=>{
                console.log(res,'返回的资讯列表');
                this.informationList = res.data.data;
                this.loading = false;
                this.finished = true;
            });
        },
        // 页面初始化
        init(){
            this.getInfoList();
        },
        // 进入资讯详情
        toInfoDetail(item){
            console.log(item);
            // if(item.Type == 3)
            // {
                this.$router.push({path:"/yuInformationDetail",query:{
                    informationId:item.Id
                }});
            // }
            // else
            // {
            //     this.errFN("当前资讯只有游客与用户进入");
            // }
        },
    },
    created(){
        this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        this.init();
    },
}
</script>

<style lang="less" scoped>
    #yuInformationList
    {
        overflow:hidden;
        height: 100%;
        background-color: #f7f7f7;
        .listWrapper
        {
            margin-top: 1rem;
            background-color: #fff;
            padding: 1rem;
            padding-bottom: 0;
            .listItem
            {
                border-bottom: 1px solid #f7f7f7;
                padding: .5rem;
                .infoName
                {
                    margin-bottom: .5rem;
                    font-size: 1.5rem;
                }
                .infoTime
                {
                    margin-bottom: .5rem;
                    font-size: 1.2rem;
                    color: #555555;
                }
            }
        }
        .van-list__finished-text
        {
            line-height: 35px !important;
        }
    }
</style>
