/*
 * @Author: fujihang
 * @Date: 2019-03-27 09:51:40
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-12 15:24:09
    跟进备注
 */
<template>
<div id="fuRemarks">

    <!-- 学员信息 -->
    <!-- <div class="student student_remark">
        <div class="list" v-for="(item,index) in student" :key="index">
            <span class="name">
                {{item.name}}
            </span>
            <span class="val">
                {{item.val}}
            </span>
        </div>
        <div class="border"></div>
    </div>


    <div class="remark student_remark">
        <div class="list" v-for="(item,index) in remark" :key="index">
            <span class="name">
                {{item.name}}
            </span>
            <span class="val">
                {{item.val}}
            </span>
        </div>
        <div class="border"></div>
    </div>

    <div class="Enclosure">
        <img :src="item.Enclosure"/>
        <div class="name">附件</div>
    </div> -->

    <div class="mainWrapper">
        <div class="item">
            <span class="itemName">学员姓名：</span>
            <span class="itemContent">{{remarksItem.Name?remarksItem.Name:"无"}}</span>
        </div>
        <div class="item">
            <span class="itemName">性别：</span>
            <span class="itemContent">{{gender}}</span>
        </div>
        <div class="item">
            <span class="itemName">手机号码：</span>
            <span class="itemContent">{{remarksItem.Phone?remarksItem.Phone:"无"}}</span>
        </div>
        <div class="item">
            <span class="itemName">微信账号：</span>
            <span class="itemContent">{{remarksItem.WeChat?remarksItem.WeChat:"无"}}</span>
        </div>

        <div class="border"></div>

        <div class="item">
            <span class="itemName">指派人：</span>
            <input readonly v-model="remarksItem.AssignName"/>
        </div>
        <div class="item">
            <span class="itemName">认领时间：</span>
            <input readonly v-model="remarksItem.AssignDate"/>
        </div>
        <div class="item">
            <span class="itemName">其他备注：</span>
            <textarea resize='false' readonly rows="4" class="textArea" v-text="remarksItem.Remark?remarksItem.Remark:''"></textarea>
        </div>

        <div class="border"></div>

        <div class="Enclosure">
            <img v-for="(item,index) in imgList" :key="index" :src="item"/>
        </div>

    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            imgList:[],
            gender:"",
            Id:'',
            remarksItem:{},
            student:[
                {
                    name:'学员姓名：',
                    val:'李选课',
                    data:'Name'
                },
                {
                    name:'生日：',
                    val:'2018/02/20',
                    data:'Birthday'
                },
                // {
                //     name:'职位：',
                //     val:'学生',
                //     data:''
                // },
                {
                    name:'微信账号：',
                    val:'lixiaoli',
                    data:'WeChat'
                },
                {
                    name:'手机号码：',
                    val:'13553570072',
                    data:'Phone'
                },
                // {
                //     name:'年收入：',
                //     val:'3k-5k',
                //     data:''
                // },
            ],//学员信息
            remark:[
                {
                    name:'指派人：',
                    val:'李选是',
                    data:'AssignName'
                },
                {
                    name:'认领时间：',
                    val:'2019/05/04 13:55:22',
                    data:'AssignDate'
                },
                {
                    name:'其他备注：',
                    val:'对xx学校的美甲课程非常感兴趣，因此报名意愿很大，附微信交流截图',
                    data:'Remark'
                },
            ],//指派人
        };
    },

    methods: {
        // 获取数据
        getData(){
          var id = this.Id;
            this.postFN({
                url:'/Student/GetFollowUpRemark',
                data:{
                    Id:id
                }
            }).then(r=>{
                console.log(r);
                let data=r.data.data
                if(r.data.state=='success'){
                    this.remarksItem = data.info;
                    this.imgList = data.imgList;

                    if(this.remarksItem.F_Gender === null)
                    {
                        this.gender = "";
                    }
                    else if(this.remarksItem.F_Gender === true)
                    {
                        this.gender = "男";
                    }
                    else if(this.remarksItem.F_Gender === false)
                    {
                        this.gender = "女";
                    }
                }else {
                  this.notFN(r.data.message)

                }
            })


        },
        getRouterData(){
          this.Id = this.$route.params.Id
          // this.code = this.$route.params.code

          // console.log('code',this.code)
        },
        getLocalstorage(){
          this.Id = localStorage.getItem('fuHistoryid');
        }
    },
    mounted(){
      // this.getRouterData();
      this.getLocalstorage();
      this.getData();
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuRemarks{
    .fBB;
    .mRB;
    .hO;.nC;
    padding: 1rem;
    // 学员信息
    .student_remark{
        .bW;
        padding: .5rem 3rem 0;
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
            }
        }
        .border{
            margin-top: .5rem;
            border-bottom: 1px dashed rgb(212, 212, 212);
        }

    }
    // 附件
    .Enclosure{
        .bW;
        position: relative;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        >img{
            object-fit: contain;
            width: 18%;
            height: 7.5rem;
            margin-right: 1rem;
            margin-left: 1rem;
        }
        .name{
            margin-top: 1rem;
            font-size: 1.1rem;
        }
        // 状态
        .state{
            font-size: 1.2rem;
            color: red;
            bottom: 1rem;
            transform: rotateZ(-45deg);
            right: 0;
            position: absolute;
        }
    }

    .mainWrapper
    {
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
        padding: 2rem 3rem;
        .item
        {
            display: flex;
            margin-bottom: 1rem;
            font-size: 1.2rem;
            .itemName
            {
                display: inline-block;
                width: 6rem;
                text-align: right;
                margin-right: 2rem;
            }
            .itemContent
            {
                flex: 1;
            }
            input
            {
                width: 12rem;
                height: 2rem;
                line-height: 2rem;
                background-color: #f8f8f8;
                padding: 0 .5rem;
            }
            .textArea
            {
                resize: none;
                word-break: break-all;
                word-wrap: break-word;
                width: 13rem;
                overflow: hidden;
                text-overflow: ellipsis;
                border: 1px solid silver;
                padding: .5rem;
                border-radius: .5rem;
                box-sizing: border-box;
                background-color: #f8f8f8;
                flex: 1;
            }
            .van-radio-group
            {
                display: flex;
                .van-radio
                {
                    margin-right: 2rem;
                    .van-radio__icon--checked .van-icon
                    {
                        background-color: red;
                        border: red;
                    }
                    .van-icon-success:before
                    {
                        display: none;
                    }
                }
            }
        }
        .border
        {
            width: 100%;
            height: 1px;
            border-top: 1px dashed #d9d9d9;
            margin-bottom: 1rem;
        }
    }
}
</style>
