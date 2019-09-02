/*
 * @Author: fujihang 
 * @Date: 2019-04-04 09:23:46 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-11 10:14:47
    组员信息
 */
<template>
<div id="fuCrewInfor">

    <!-- 头部 -->
    <div class="student student_remarkCI">
        <div class="logo" >
            <img :src="student[0].val">
        </div>
        <div v-show="index!=0" class="list" v-for="(item,index) in student" :key="index">
            <span class="name">
                {{item.name}}
            </span>
            <span class="val">
                {{item.val?item.val:'无'}}
            </span>
        </div>
        <div class="border"></div>
    </div>

    <!-- 中部 -->
    <div class="middit student_remarkCI">
        <div class="list" v-for="(item,index) in middit" :key="index">
            <span class="name">
                {{item.name}}
            </span>
            <span class="val" >
                {{item.val?item.val:'无'}}
            </span>
            
        </div>
        <div class="border"></div>
    </div>

    <!-- 底部 -->
    <div class="remark student_remarkCI">
        <div class="list" v-for="(item,index) in remark" :key="index">
            <span class="name">
                {{item.name}}
            </span>
            <span class="val" >
                {{item.val||item.val==0?item.val:'无'}}
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
                    val:'',
                    data:'F_HeadIcon',
                },
                {
                    name:'姓名：',
                    val:'',
                    data:'F_NickName'
                },
                {
                    name:'职位：',
                    val:'',
                    data:'Position'
                },
                {
                    name:'工号：',
                    val:'',
                    data:'UDID'
                },
                {
                    name:'手机号码：',
                    val:'',
                    data:'F_MobilePhone'
                },
            ],//学员信息
            middit:[
                {
                    name:'所属部门：',
                    val:'',
                    data:'VipName'
                },
                {
                    name:'入职时间：',
                    val:'',
                    data:'F_CreatorTime'
                },
            ],
            remark:[
                {
                    name:'添加微信量：',
                    val:'',
                    data:'AddWeChat'
                },
                {
                    name:'锁定人数：',
                    val:'',
                    data:'LockInNumber'
                },
                {
                    name:'目前跟进：',
                    val:'',
                    data:'FollowUpCount'
                },
                {
                    name:'释放人数：',
                    val:'',
                    data:'Release'
                },
                {
                    name:'促成订单量：',
                    val:'',
                    data:'OrderCount'
                },
                {
                    name:'已到校人数：',
                    val:'',
                    data:'ArriveAtSchoolCount'
                },
            ],//状态
        };
    },

    methods: {
        getData(){
            this.tipFN();
            this.postFN({
                url:"/Student/GetTeacherInfo",
                data:{
                    UserID:this.id
                }
            }).then(r=>{
                this.tipHFN();
                console.log(r)
                if(r.status){
                // if(r.data.state=="success"){
                    let data=r.data[0]
                    for(let i=0;i<this.student.length;i++){
                        this.student[i].val=data[this.student[i].data]
                    }
                    for(let i=0;i<this.middit.length;i++){
                        this.middit[i].val=data[this.middit[i].data]
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
#fuCrewInfor{
    .fBB;
    .mRB;
    .hO;.nC;
    padding-top: 1rem;
    // 学员信息
    .student_remarkCI{
        .logo{
            margin: 1rem 0;
            text-align: center;
            >img{
                width: 4.5rem;
                border-radius: 50%;
                height: 4.5rem;
            }   
            
        }
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
   
}
</style>