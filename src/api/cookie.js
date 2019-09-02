

import router from '../router'
import Vue from "vue";

function setCookie(name,value,time)
{
    var exp = new Date();
    exp.setTime(exp.getTime() + time*1000*3600);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}


function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return false;
}

let userInfo=JSON.parse(localStorage.getItem('userInfo'))

//路由拦截
router.beforeEach((to, from, next) => {
    if(userInfo){
        if(userInfo.RoleName=='A组客服管理员'||userInfo.RoleName=='B组客服管理员'){
            
        }
        else if(userInfo.RoleName=='A组客服'||userInfo.RoleName=='B组客服'){

        }
        else if(userInfo.RoleName=='A组老板'||userInfo.RoleName=='B组老板'){

        }
        else{

        }
        
    }
    // console.log(to.name)
    
    next(); 
})

var redirctFN=(RoleName)=>{
    
    let name
    if(RoleName) name=RoleName
    else name=userInfo.RoleName
    setTimeout(()=>{
        // console.log("进入")
        if(name=='A组客服管理员'||name=='B组客服管理员'){
            router.replace({path:'/fuManageApp/fuManageIndex'})
        }
        else if(name=='学校'){
            router.replace({path:'/yuSchoolIndex'})
        }
        else if(name=='A组客服'||name=='B组客服'){
            // console.log("进入+1")
            // router.replace({path:'/hsyTeachIndex'})
            router.replace({path:'/yuManageIndex'})
        }
        else if(name=='A组老板'||name=='B组老板'){
            router.replace({path:'/fieraa'})
        }
    },1)
    
}


const install=()=>{
    Vue.prototype.setCookie=setCookie
    Vue.prototype.getCookie=getCookie
    Vue.prototype.redirctFN=redirctFN
}
export default install