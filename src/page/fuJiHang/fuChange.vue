/*
 * @Author: fujihang
 * @Date: 2019-03-22 13:36:05
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-25 18:34:28
    修改页面
 */
<template>
<div id="fuChange">
    <!-- 导航条 -->
    <navBarTow btn="true" :name="name"></navBarTow>

    <div class="change">
        <!-- 修改内容名字 -->
        <textarea  v-show="name=='修改名字'" class="eva" v-model="evaValue" placeholder="写下你对本课程的评价"></textarea>
        <!-- 修改手机 -->
        <div class="phone" v-show="name!='修改名字'">
            手机：
            <input v-model="phone" maxlength="11" onkeyup="value=value.replace(/[^0-9_]/g,'')" >
        </div>
        <!-- 确定 -->
        <div class="Release">
            <van-button @click="submit">
                {{name=="修改名字"?'保存':'绑定'}}
            </van-button>
        </div>
    </div>

</div>
</template>

<script>
import navBarTow from '../../public/navBarTow';

export default {
    components:{
        navBarTow,
    },
    data(){
        return {
            name:this.$route.query.name,//类型
            evaValue:this.$route.query.val,//名字
            phone:this.$route.query.val,//手机
            F_id:this.$route.query.F_id
        };
    },

    methods: {//本地使用加上/hsy在url头
        submit(){
          let url=''
          if(this.name =='修改名字') url='/User/SaveUserInfo?F_Id='+ this.F_id +"&F_NickName=" + this.evaValue
          else url= '/User/SaveUserInfo?F_Id='+ this.F_id +"&F_MobilePhone=" + this.phone
          this.postFN({
            url:url
          }).then(r=>{
            console.log(r)
            if(r.data.state == "success"){
              this.$router.replace({path:"/fuMyData"})
            }
          })
        }
    },
    mounted(){
        // console.log(this.store.state)
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
#fuChange{
    .change{
        padding:1rem;
        .fBB;.nC;
        // 评价内容
        .eva{
            padding: 1.3rem;
            .fBB;
            width: 100%;
            height: 16rem;
            border:1px solid rgb(245, 245, 245);
            .bR;
            font-size: 1.2rem;

        }
        .eva::placeholder{
            color: #999;
        }
        // 修改手机
        .phone{
            font-size: 1.25rem;
            padding: .5rem 0 .5rem 0;
            margin: 0 0 10rem 1rem;
            .fBB;.bBS;
            display: flex;
            align-items: center;
            >input{
                font-size: 1.2rem;
                margin-left: 2rem;
                flex: 1;
                height: 2rem;
            }
            >input::placeholder{
                color: #999;
            }
        }
        // 按钮
        .Release{
            margin-top: 1rem;
            width: 100%;
            .van-button{
                width: 100%;
                .fBMRB;
                color: white;
            }
        }
    }

}
</style>
