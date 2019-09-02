/*
 * @Author: fujihang 
 * @Date: 2019-03-25 10:44:45 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-01 15:52:12
    搜索框
 */
<template>
<div class="seach">
    <input :placeholder="plr" v-model="data">
    <div class="btn"  @click="callback">
        <van-icon name="search" @click="search"/>{{btn?btn:'确定'}}
    </div>
</div>
</template>

<script>
export default {
    props:['plr','btn'],
    data(){
        return {
            data:'',
        };
    },

    methods: {
        // 查询方法
        callback(){
            this.$emit("seachFN",this.data)
        },
        search(){
            
        },
    }
}

</script>


<style lang='less'>
@import '../../style/base.less';
@import '../../style/fujihangBase.less';
.seach{
    display: flex;
    padding: .6rem 3rem;
    box-sizing: border-box;
    background-color: #fff;
    // .mRB;
    >input{
        flex: 1;
        height: 3rem;
        padding-left: 1.2rem;
        box-sizing: border-box;
        font-size: 1.25rem;
        background-color: #f9f9f9;
        border-top-left-radius: 1.5rem;
        border-bottom-left-radius: 1.5rem;
    }
    .btn{
        justify-content: center;
        background: #D6D6D6;
        width: 6rem;
        display: flex;
        align-items: center;
        border-radius:0 1.5rem 1.5rem 0;
        color: white;
        font-size: 1.2rem;
        .van-icon{
            margin-right: .6rem;
            font-size: 1.5rem;
        }
    }
}
</style>