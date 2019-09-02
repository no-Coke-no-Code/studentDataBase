<template>
    <div id="schoolManageWrapper">
        <div class="cascadeWrapper">
            <div class="classItem" v-for="(item1,index1) in classList" :key="index1">
                <span @click="choooseClass(item1,index1)" :class="{'active':index1==classIndex}">{{item1.F_Name}}</span>
                <div class="chooseWrapper">
                    <div class="school" v-if="chosenClass&&classIndex==index1">
                        <span v-for="(item,index) in schoolList" :key="index" :class="{'active':index==schoolIndex}" @click="chooseSchool(item,index)">{{item.SchoolName}}</span>
                    </div>
                    <div class="triangle1" v-if="chosenClass&&classIndex==index1&&schoolList">
                        <div class="outer">
                            <div class="inner"></div>
                        </div>
                    </div>
                    <div class="time" v-if="chosenSchool&&classIndex==index1&&timeList">
                        <span v-for="(item,index) in timeList" :key="index" :class="{'active':index==timeIndex}" @click="chooseTime(item,index)">{{item.StartTime.split(" ")[0]}}</span>
                    </div>
                    <div class="triangle2" v-if="chosenSchool&&classIndex==index1">
                        <div class="outer">
                            <div class="inner"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="checkBtn" @click="check">确认查看</div>
    </div>
</template>

<script>
export default {
    name:"schoolManage", 
    data(){
        return{
            // 各种获取的数据列表
            classList:[],
            schoolList:[],
            timeList:[],

            // 各种选中
            chosenClass:"",
            chosenClassId:"",
            chosenSchool:"",
            chosenSchoolId:"",
            chosenTime:"",

            // 各种选中的标识
            classIndex:-1,
            schoolIndex:-1,
            timeIndex:-1,
        }
    },
    methods:{
        // 点击课程
        choooseClass(item,index){
            this.classIndex = index;
            this.schoolIndex = -1;
            this.timeIndex = -1;

            this.chosenClass = item.F_Name;
            this.chosenClassId = item.F_Id;
            this.chosenSchool = "";
            this.chosenSchoolId = "";
            this.postFN({
                url:"/StudentCourse/GetOpenCourseSchoolList",
                data:{
                    courseId:this.chosenClassId
                }
            }).then((res)=>{
                console.log(res);
                this.schoolList = res.data.data;
            });
        },
        // 点击学校
        chooseSchool(item,index){
            this.schoolIndex = index;
            this.timeIndex = -1;

            this.chosenSchool = item.SchoolName;
            this.chosenSchoolId = item.SchoolId;
            this.chosenTime = "";
            this.postFN({
                url:"/StudentCourse/GetStartTimeList",
                data:{
                    courseId:this.chosenClassId,
                    schoolId:this.chosenSchoolId,
                }
            }).then((res)=>{
                this.timeList = res.data.data;
            });
        },
        // 点击时间
        chooseTime(item,index){
            this.timeIndex = index;

            this.chosenTime = item.StartTime;
        },
        init(){
            this.getFN({
                url:"/StudentCourse/GetCourseList",
            }).then((res)=>{
                this.classList = res.data.data;
            });
        },
        getData(){
            this.loading = true;
            this.getFN({
                url:"/StudentCourse/GetCourseInfoList?pageSize=10&pageIndex="+this.pageIndex+"&courseTypeId=-1"
            }).then((r)=>{
                console.log(r);
                if(r.data.state=="success"){
                    console.log(r);
                    for(let i=0;i<data.length;i++){
                        this.classList.push(data[i])
                    }
                    if(data.length<10){
                        this.loading=false;
                        this.finished=true;
                        return
                    }
                    this.pageIndex++;
                    this.loading=false
                }
                else{
                    this.notFN('获取更多课程失败，请刷新重试！')
                    this.loading=false
                } 
            });
        },
        check(){
            if(this.chosenSchoolId==""||this.chosenClassId==""||this.chosenTime=="")
            {
                this.errFN("请选择完整信息");
                return;
            }
            else
            {
                this.$router.push({path:"/yuStudentList",query:{
                    schoolName:this.chosenSchool,
                    schoolId:this.chosenSchoolId,
                    courseId:this.chosenClassId,
                    courseName:this.chosenClass,
                    dateTime:this.chosenTime,
                }});
            }
        },
    },
    created(){
        this.init();
    },
}
</script>

<style lang="less" scoped>
    #schoolManageWrapper
    {
        position: relative;
        height: 100%;
        .classItem
        {
            height: 3rem;
            line-height: 3rem;
            padding: 0 1rem;
            font-size: 1.1rem;
            border-bottom: 1px solid #f9f9f9;
            background-color: #fff;
            position: relative;
            .chooseWrapper
            {
                background-color: #fff;
                width: 58%;
                position: absolute;
                top: 0;
                right: 0;
                height: 10px;
                .school
                {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 45%;
                    z-index: 2;
                    border: 1px solid #f7f7f7;
                    padding: 0 .5rem;
                    box-sizing: border-box; 
                    max-height: 15rem;
                    overflow: auto;
                    background-color: #fff;
                }
                .time
                {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 45%;
                    border: 1px solid #f7f7f7;
                    z-index: 2;
                    padding: 0 .5rem;
                    box-sizing: border-box;
                    max-height: 15rem;
                    overflow: auto;
                    background-color: #fff;
                }
                .triangle1,.triangle2
                {
                    position: absolute;
                    top: 1rem;
                    left: -1rem;
                    z-index: 9;
                    .outer
                    {
                        width: 0;
                        height: 0;
                        border: .56rem solid transparent;
                        border-right-color: #dbdbdb;
                        position: relative;
                        .inner
                        {
                            position: absolute;
                            top: -.4rem;
                            right: -0.6rem;
                            width: 0;
                            height: 0;
                            border: .4rem solid transparent;
                            border-right-color: #fff;
                        }
                    }
                }
                .triangle2
                {
                    left: 49.9%;
                }
            }
            span
            {
                display: inline-block;
                width: 100%;
            }
            .schoolWrapper
            {
                position: absolute;
                left: 8rem;
                top: 0;
                width: 23rem;
                height: 13rem;
                overflow: auto;
                z-index: 2;
                border: 1px solid #f7f7f7;
                background-color: #fff;
                .schoolItem
                {
                    height: 3rem;
                    line-height: 3rem;
                    padding: 0 1rem;
                    font-size: 1.1rem;
                    border-bottom: 1px solid #f9f9f9;
                    position: relative
                }
                .timeWrapper
                {
                    position: absolute;
                    left: 10rem;
                    top: -1px;
                    width: 13rem;
                    z-index: 2;
                    border: 1px solid #f7f7f7;
                    background-color: #fff;
                    .timeItem
                    {
                        height: 3rem;
                        line-height: 3rem;
                        padding: 0 1rem;
                        font-size: 1.1rem;
                        border-bottom: 1px solid #f9f9f9;
                        position: relative
                    }
                }
            }
        }
        .active
        {
            color: #26bcd7;
        }
        .checkBtn
        {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            margin:auto;
            background-color: #26bcd7;
            color: #fff;
            height: 4rem;
            font-size: 1.3rem;
            line-height: 4rem;
            text-align: center;
        }
    }
</style>
