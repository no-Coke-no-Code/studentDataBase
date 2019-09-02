<template>
    <div id="yuWatchRec">
        <yuClassCard :type="cardType" v-for="(item,index) in yuWatchRecList" :key="index" :item="item"></yuClassCard>
        <div class="emptyPage" v-if="!yuWatchRecList.length">
            <div>
                <img src="../../image/yuRongLiang/emptyOrderList.jpg"/>
                <p>你还没有观看课程哦</p>
                <p>到首页去看看吧</p>
            </div>
        </div>
    </div>
</template>

<script>
import yuClassCard from "./../yuRongLiang/yuClassCard";

export default {
    components:{
        yuClassCard
    },
    name:"yuWatchRec",
    data(){
        return{
            cardType:"listClassCardType",
            yuWatchRecList:[],
            pageIndex:1,
            type:1,
        }
    },
    methods:{
        init(){
            this.getFN({
                url:"/StudyLog/GetStudyLogList?page="+this.pageIndex+"&rows=10&type="+this.type,
            }).then((res)=>{
                console.log(res);
                if(res.data.state == "success")
                {
                    this.yuWatchRecList = res.data.data.rows;
                    console.log(res.data.rows);

                    if(r.state=="success"){
                        let data=r.data.rows;
                        for(let i=0;i<data.length;i++){
                            this.yuWatchRecList.push(data[i])
                        }
                        if(data.length<10){
                            this.loading=false;
                            this.finished=true;
                            return
                        }
                        this.pageIndex++;
                        this.loading=false
                    }else{
                        this.notFN('获取失败，请刷新重试！')
                        this.loading=false
                    } 
                }
            });
        },
    },
    created(){
        this.init();
    },
}
</script>

<style lang="less" scoped>
    #yuWatchRec
    {
        .emptyPage
        {
            width: 100%;
            height: 100%;
            background-color: #fff;
            position: absolute;
            text-align: center;
            z-index: 2;
            div
            {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: auto;
                width: 50%;
                height: 25%;
                img
                {
                    width: 6rem;
                    height: 6rem;
                }
                p
                {
                    margin-top: 1rem;
                    &:first-of-type
                    {
                        color: #c1c1c1;
                        font-size: 1.2rem;
                    }
                    &:nth-of-type(2)
                    {
                        font-size: 1rem;
                    }
                }
            }
        }
    }
</style>
