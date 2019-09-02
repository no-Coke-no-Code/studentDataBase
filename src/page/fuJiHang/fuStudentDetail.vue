/*
 * @Author: fujihang 
 * @Date: 2019-04-04 09:23:46 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 17:23:52
    学员信息
 */
<template>
<div id="fuStudentDetail">

    <!-- 导航条 -->
    <div class="sDTop">
        <navBarTow btn="true" name="学员信息"></navBarTow>
        <div class="moreSD">
            更多备注
        </div>
    </div>
    

    
    <!-- 学员信息 -->
    <div class="student student_remarkSD">
        <div class="list" v-for="(item,index) in student" :key="index">
            <span class="name">
                {{item.name}}
            </span>
            <span class="val">
                {{item.val?item.val:'无'}}
            </span>
        </div>
        <div class="border"></div>
    </div>

    <!-- 指派人 -->
    <div class="remark student_remarkSD">
        <div class="list" v-for="(item,index) in remark" :key="index">
            <span class="name">
                {{item.name}}
            </span>
            <span class="val" v-show="index!=2">
                {{item.val?item.val:'无'}}
            </span>
            <span class="val" v-show="index==2">
                <span class="tag" v-for="(ite,ind) in item.val" :key="ind">
                    <img src="../../image/fuJiHang/tag.svg">
                    {{ite}}
                </span>
            </span>
        </div>
        <div class="border"></div>
    </div>


</div>
</template>

<script>
import navBarTow from '../../public/navBarTow'
export default {
    components:{
        navBarTow
    },
    data(){
        return {
            id:this.$route.query.id,//
            student:[
                {
                    name:'学员姓名：',
                    val:'',
                    data:'UserName'
                },
                {
                    name:'性别：',
                    val:'',
                    data:'Sex'
                },
                {
                    name:'生日：',
                    val:'',
                    data:'Birthday'
                },
                // {
                //     name:'职位：',
                //     val:'学生',
                //     data:''
                // },
                {
                    name:'微信账号：',
                    val:'',
                    data:'WeChat'
                },
                {
                    name:'手机号码：',
                    val:'',
                    data:'UserPhone'
                },
                // {
                //     name:'年收入：',
                //     val:'3k-5k',
                //     data:''
                // },
            ],//学员信息
            remark:[
                {
                    name:'系统状态：',
                    val:'',
                    data:'UserState'
                },
                {
                    name:'专属老师：',
                    val:'',
                    data:'followUpUser'
                },
                {
                    name:'标签标记：',
                    val:[],
                    data:'CustomLabel'
                },
                {
                    name:'添加时间：',
                    val:'',
                    data:'CreateTime'
                },
                {
                    name:'商户通名称：',
                    val:'',
                    data:'swtNickName'
                },
                {
                    name:'老师备注：',
                    val:'',
                    data:''
                },
                
            ],//状态
        };
    },

    methods: {
        getData(){
            this.tipFN();
            this.getFN({
                url:"/StudentCourse/GetUserDetails?steId="+this.id
            }).then(r=>{
                this.tipHFN();
                if(r.data.state=="success"){
                    let data=r.data.data
                    for(let i=0;i<this.student.length;i++){
                        this.student[i].val=data[this.student[i].data]
                    }
                    for(let i=0;i<this.remark.length;i++){
                        this.remark[i].val=data[this.remark[i].data]
                    }
                }else this.notFN("获取学员信息失败，请刷新重试！")
            })
        }
    },
    mounted(){
        this.getData()
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuStudentDetail{
    .fBB;
    .mRB;
    .hO;.nC;
    // 学员信息
    .student_remarkSD{
        .bW;
        padding: .5rem 2rem 0;
        margin: 0 1rem;
        .fBB;
        .list{
            display: flex;
            align-items: baseline;
            padding: .5rem 0;
            >span{
                display: block;
                flex: 1;
            }
            .name{
                height: 100%;
                font-size: 1.2rem;
                text-align: right;
                margin-right: 2rem;
            }
            .val{
                color: #999;
                font-size: 1.1rem;
                display: flex;
                flex-wrap: wrap;
                .tag{
                    display: flex;
                    align-items: center;
                    padding: .2rem 0;
                    margin-right: .2rem;
                    color: #27BCD5;
                    >img{
                        height: 1.1rem;
                    }
                }
            }
        }
        .border{
            margin-top: .5rem;
            border-bottom: 1px dashed rgb(212, 212, 212);
        }

    }
    // 导航条
    .sDTop{
        position: relative;
        .mB;
        .moreSD{
            color: #999;
            font-size: 1.1rem;
            position: absolute;
            top: 1.3rem;
            right: 1rem;;
        }
    }
}
</style>