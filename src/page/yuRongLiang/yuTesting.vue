<template>
    <div></div>
</template>

<script>
import axios from "axios";
export default {
    name:'yuTesting',
    methods:{
        getFN(option){
            var handler = {
                type:'GET',url:option.url,data:option.data
            };
            return new Promise((resolve,reject)=>{
                this.request(handler).then((r)=>{
                    resolve(r);
                });
            });
        },
        postFN(){

        },
        request:function(option){
            axios(option).then((r)=>{
                resolve(r);
            });
        },
    },
    mounted() {
        // this.getFN({
        //     url:'/StudentCourse/GetCourseTypeCourseList?pageSize=10&pageIndex=1',
        // }).then((res)=>{
        //     console.log(res);
        // });


        // function testing(num){
        //     return new Promise((resolve,reject)=>{
        //         if(num >= 4)
        //         {
        //             resolve(num);
        //         }
        //         else
        //         {
        //             reject(num);
        //         }
        //     });
        // };
        // testing(5).then((data)=>{
        //     console.log(data)
        // },(err)=>{
        //     console.log(err);
        // });

        let obj = {
            type:"GET",
            url:'/StudentCourse/GetCourseTypeCourseList?pageSize=10&pageIndex=1'
        }
        function promise(obj){
            return new Promise((resolve,reject)=>{
                axios(obj).then((res)=>{
                    resolve(res);
                });
            });
        };
        promise(obj).then((res)=>{
            console.log(res);
        });
    },
}
</script>

<style scoped>

</style>
