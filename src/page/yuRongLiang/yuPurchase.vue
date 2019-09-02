<template>

</template>

<script>
export default {
    name:"yuPurchase",
    data(){
        return{
            courseId:"11",
            amount:"22",
            schoolCourseId:"22"
        }
    },
    mounted(){
        var location = window.location.href;
        var query = location.split("?")[1];
        query = query.split("&");
        var queryObj = {};
        for(let i = 0;i<query.length;i++)
        {
            query[i].split("=")[0];
            queryObj[query[i].split("=")[0]] = query[i].split("=")[1];
        }
        console.log(queryObj);
        this.courseId = queryObj.courseId;
        this.amount = queryObj.amount;
        this.schoolCourseId = queryObj.schoolCourseId;
        this.postFN({
            url:"/StudentCourse/AddOrderReward",
            data:{
                schoolCourseId:this.schoolCourseId,
                amount:this.amount
            },
        }).then((res)=>{
            console.log(res);
            if(res.data.state == "success")
            {
                alert("生成订单成功");
                var orderNo = res.data.data.OrderNum;

                this.postFN({
                    url:"/TenPay/JsApiPay?body=订单支付&tradeno="+orderNo+'&callbackurl='+'https://live.9oasd.com/#/okOrerr?order='+orderNo,
                    data:{
                        body:'订单支付',
                        tradeno:orderNo,
                        callbackurl:'https://live.9oasd.com/#/okOrerr?order='+orderNo,
                    },
                }).then((r)=>{
                    console.log(r);
                    if(r.data.state=="info"){
                        localStorage.setItem('courseId',this.courseId)
                        localStorage.setItem('amount',this.amount)
                        window.location.href = r.data.data;
                    }else this.errFN(r.data.message)
                });
            }
            else
            {
                alert("生成订单失败");
            }
        });
    },
}
</script>
