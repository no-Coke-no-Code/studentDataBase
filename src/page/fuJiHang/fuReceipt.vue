/*
 * @Author: fujihang 
 * @Date: 2019-03-21 15:11:04 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-19 14:15:31
    电子收据
 */
<template>
<div id="fuReceipt">
   
    <div class="receipt" >
        <div class="top"></div>
        <div class="contant" id="getImg">
            <div class="topName">
                售票依据
            </div>
            <div class="info" v-for="(item,index) in info" :key="index">
                <span class="name">
                    {{item.name}}
                </span>
                <span class="val">
                     {{item.val}}
                </span>
            </div>

            <!-- 波浪 -->
            <div class="wave">
                <span class="child" v-for="i in 30" :key="i"></span>
            </div>
        </div>

        <!-- 按钮 -->
        <div class="download">
            <img  ref="img">
            <van-button>长按保存凭证</van-button>
        </div>

        
    </div>

    <div class="returnBtn">
        <van-button @click="toFN('/')">首页</van-button>
        <van-button @click="toFN('/fuMyOrder')" class="col">查看订单</van-button>
    </div>

</div>
</template>

<script>
import html2canvas from 'html2canvas';
export default {
    data(){
        return {
            info:[
                {
                    name:'购买者',
                    val:'',
                    data:'BuyUserName',
                },
                {
                    name:'购买课程',
                    val:'',
                    data:'BuyCourseName',
                },
                {
                    name:'所属学校',
                    val:'',
                    data:'BuySchoolName',
                },
                // {
                //     name:'住宿申请',
                //     val:'2019/03/01'
                // },
                // {
                //     name:'座位',
                //     val:'么米培训机构'
                // },
                {
                    name:'开票日期',
                    val:'',
                    data:'BuyCreatorTime',
                },
            ],//信息
            orderId:this.$route.query.orderId,//订单ID
        };
    },

    methods: {
        // div生成图片
        getImage(){
            html2canvas(document.querySelector("#getImg")).then(canvas => {
                var url = canvas.toDataURL('image/png')
                // let blob = this.base64ToBlob(url);
                // let imgUrl=URL.createObjectURL(blob);
                this.$refs.img.src=url
            });
        },
        // 获取数据
        getData(){
            this.tipFN();
            this.getFN({
                url:"/StudentCourse/GetOrderCertificate?orderNum="+this.orderId
            }).then(r=>{
                this.tipHFN();
                if(r.data.state=="success"){
                    let data=r.data.data
                    for(let i=0;i<this.info.length;i++){
                        this.info[i].val=data[this.info[i].data]
                    }
                    this.getImage()
                }else this.notFN("获取凭证信息失败，请刷新重试！")
            })
        },
        toFN(to){
            this.$router.push({path:to})
        }
    },
    mounted(){
        
        this.getData();
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuReceipt{
    .mRB;
    .hO;.nC;
    // 凭据
    .receipt{
        margin: 1rem 2rem 0;
        position: relative;
        .top{
            border:.6rem solid #27BCD5;
            border-radius: 1rem;
            height: .2rem;
            background: rgb(1, 145, 170);
        }
        .contant{
            padding: 0 1rem 8rem;
            margin: -.7rem 1rem 0;
            position: relative;
            .fBB;
            .bW;
            .topName{
                color: #333;
                padding: 2rem 0;
                font-size: 1.4rem;
                font-weight: 800;
                text-align: center;
            }
            .info{
                display: flex;
                padding: .5rem 1rem;
                .fBB;
                font-size: 1.2rem;
                .name{
                    flex: 1;
                }
                .val{
                    color: #999;
                }
            }
            // 波浪
            .wave{
                position:absolute;
                bottom: -.5rem;
                width: 95%;
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                height: 1.2rem;
                .child{
                    margin: 0 .3rem;
                    transform: rotate(45deg);
                    .mRB;
                    display: block;
                    height: 1rem;
                    width: 1rem;
                    border-radius: 50%;
                }
            }
        }
    }
    

    //按钮
    .download{
        width: 100%;
        text-align: center;
        bottom: 1.5rem;
        position:absolute;
        .van-button{
            .fBMRB;
            color: white;
            width: 80%;
        }
        >img{
            position: absolute;
            width: 80%;
            height: 100%;
            z-index: 3;
            opacity: 0;
        }
    }

    .returnBtn{
        display: flex;
        width: 100%;
        position: absolute;
        bottom: 0;
        .van-button{
            .fBMRB;
            background: white;
            color: #666;
            width: 100%;
            
        }
        .col{
            background: #27BCD5;
            color: white;
        }
        
    }
    
}
</style>