/*
 * @Author: fujihang
 * @Date: 2019-03-19 15:16:20
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-29 10:43:37
 */
<template>
<div id="cs">
    <!-- <div class="overImg">
        <div class="img" v-for="i in 30"><div class="sss"></div></div>

    </div> -->
    <div class="cen" @click="ta"></div>
</div>
</template>

<script>
export default {
    data(){
        return {

        };
    },

    methods: {
        ta(){
            alert("saadsas")
        }
    }
}

</script>


<style lang='less'>
#app{
  background: #f7f7f7;
}

</style>
