<template>
    <div id="yuInformationDetail">
        <div class="infoHeader">
            <p class="infoTitle">
                {{informationTitle}}
            </p>
            <p class="infoTime">
                <span>聚亿美官微</span>
                <span>{{informationTime}}</span>
            </p>
        </div>

        <div class="infoContent">
            <div v-html="informationOutline" class="infoOutline"></div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name:"yuInformationDetail",
    data(){
        return{
            informationId:"",
            informationDetail:"",
            informationTitle:"",
            informationTime:"",
            informationOutline:"",
        }
    },
    methods:{
        // 获取资讯详情
        getDetail(){
            this.postFN({
                url:"/Student/GetInformationInfo",
                data:{
                    informationId:this.informationId
                }
            }).then((res)=>{
                console.log(res);
                if(res.data.state == "success")
                {
                    this.informationDetail = res.data.data;
                    this.informationTime = this.informationDetail.F_CreatorTime;
                    this.informationTitle = this.informationDetail.F_Name;
                    axios({
                        url:this.informationDetail.F_Outline,
                        method:'get',
                        headers:{
                        'Content-Type': 'application/json; application/octet-stream'
                    },
                    responseType: 'blob',
                    }).then(r=>{
                        this.changeRGB(r.data).then(j=>{
                            this.informationOutline=j
                        })
                    })
                }
                else
                {
                    this.errFN("出现错误");
                }
            });
        },
        // 初始化页面
        init(){
            this.getDetail();
        }, 
    },
    created(){
        this.informationId = this.$route.query.informationId;
        this.init();
    },
}
</script>

<style lang="less" scoped>
    #yuInformationDetail
    {
        padding: 2rem 1rem;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        background-color: #fff;
        .infoHeader
        {
            margin-bottom: 2rem;
            .infoTitle
            {
                font-size: 2rem;
                margin-bottom: 1rem;
            }
            .infoTime
            {
                span
                {
                    &:first-of-type
                    {
                        color: #566c95;
                        font-size: 1.3rem;
                        margin-right: 2rem;
                    }
                    &:nth-of-type(2)
                    {
                        font-size: 1.2rem;
                        color: #b3b3b3;
                    }
                }
            }
        }
        .infoContent
        {
            padding-top: 1rem;
        }
    }
</style>
