/*
 * @Author: fujihang
 * @Date: 2019-03-22 14:53:34
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 14:17:41
    我的作品
 */
<template>
<div id="fuMyWorks">

    <!-- 发作品 -->
    <div class="uploadMorks">
        <img @click="toFN" src="../../image/fuJiHang/upload.png" class="img">
        <div class="name">
            我要发作品
        </div>
    </div>

    <!-- 个人作品 -->
    <div class="record">
        <!-- 头部 -->
        <div class="TopName">
            <img class="img" src="../../image/fuJiHang/xin.png">个人作品记录
        </div>
        <!-- 作品 -->

        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getData"
        >
            <div class="bW">
                <stuWorks v-for="(item,index) in nowData" :key="index" :data="item"></stuWorks>
            </div>
        </van-list>
    </div>


</div>
</template>

<script>
import stuWorks from '../../components/fujihang/stuWorks'
export default {
    components:{
        stuWorks,
    },
    data(){
        return {

            loading:false,//加载状态
            finished:false,//是否加载完成
            pageSize:'10',
            pageIndex:1,
            nowData:[],
            worksList:[
                {
                    img:require('../../image/fuJiHang/classList.png'),
                    name:"专业美甲研究展示",
                    time:'2019/02/26 13:20:23',
                },
                {
                    img:require('../../image/fuJiHang/classList.png'),
                    name:"专业美甲研究展示",
                    time:'2019/02/26 13:20:23',
                },
            ],//展示内容
        };
    },
    methods: {
        // 去发表作品
        toFN(){
            this.$router.push({path:'/fuPublished'})
        },
        getData(){
            this.loading=true
          this.postFN({
            url:'/StudentCourse/GetWorksList?pageSize='+this.pageSize + "&pageIndex=" + this.pageIndex
          }).then(r=>{
            if(r.data.state == 'success'){
                let data=r.data.data.rows
                
                for(let i=0;i<data.length;i++){
                    this.nowData.push(data[i])
                }
                if(data.length<10){
                    this.loading=false
                    this.finished=true;
                    return;
                }
                this.pageIndex++
                this.loading=false

            }else{
                this.loading=false
                this.finished=true
              this.notFN(r.data.message)
            }
          })

        }
    },
    created(){
      this.getData()
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuMyWorks{
    .mRB;.nC;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    // <!-- 发作品 -->
    .uploadMorks{
        .bW;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 3rem 0;
        .fBB;
        .img{
            height: 7rem;
            width: 7rem;
        }
        .name{
            margin-top: 1rem;
            font-size: 1.3rem;
            font-weight: 600;
        }
    }

    // <!-- 个人作品 -->
    .record{
        flex: 1;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        // 头部
        .TopName{
            .bW;
            display: flex;
            align-items: center;
            padding: 1rem 1rem;
            font-size: 1.2rem;
            .fBB;.bBS;.tC;
            .img{
                margin-right: 1rem;
                height: 1.5rem;
            }
        }
        .van-list{
            flex: 1;
            overflow: auto;
        }
    }
}
</style>
