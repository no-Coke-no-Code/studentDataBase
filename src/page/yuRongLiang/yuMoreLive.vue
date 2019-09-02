<template>
    <div id="yuMoreLive">
        <navBarTow btn="true" :name="name"></navBarTow>

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
            <yu-class-card :type="cardType" v-for="(item,index) in classList" :key="index" :item="item"></yu-class-card>
        </van-list>
    </div>
</template>

<script>
import navBarTow from '../../public/navBarTow'
import yuClassCard from "./yuClassCard.vue";

export default {
    components:{
        navBarTow,
        yuClassCard,
    },
    data(){
        return{
            pageIndex:1,
            name:"",
            cardType:"listClassCardType",
            loading:false,//加载状态
            finished:false,//加载完成
            classList:[],
        }
    },
    methods:{
        // 获取列表
        getData(){
            this.classList = [];
            this.loading = true;
            this.getFN({
                url:"/StudentCourse/GetLiveCourseInfoList?pageSize=10&pageIndex="+this.pageIndex+"&teachingType=1&liveType="+this.liveType
            }).then((r)=>{
                console.log(r);
                if(r.data.state=="success"){
                    let data=r.data.data.rows
                    console.log(this.classList,'查看课程列表');
                    for(let i=0;i<data.length;i++){
                        this.classList.push(data[i])
                    }
                    if(data.length<10){
                        this.loading=false;
                        this.finished=true;
                        return
                    }
                    this.pageIndex++;
                    this.loading=false
                }
                else{
                    this.notFN('获取更多课程失败，请刷新重试！')
                    this.loading=false
                } 
            });
        },
    },
    mounted(){
        this.name = this.$route.query.name;
        console.log(this.$route.query);
        this.liveType = this.$route.query.type;
        this.getFN({
            url:"/StudentCourse/GetLiveCourseInfoList?pageSize=10&pageIndex="+this.pageIndex+"&teachingType=1&liveType="+this.liveType,
        }).then((res)=>{
            console.log(res,"更多课程列表");
        });
    },
}
</script>

<style lang="less" scoped>
    #yuMoreLive
    {
        height: calc(100% - 1.6rem);
        background-color: #f4f5f9;
        #navBar
        {
            margin-bottom: 1.5rem;
        }
    }
</style>
