/*
 * @Author: fujihang 
 * @Date: 2019-03-19 14:56:49 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-04-09 10:58:19
    请求借口封装
 */


import axios from 'axios'
import Vue from 'vue'




var parameter = "data";//默认json数据
var BaseUrl = ''; //半路径请求
// http://live.9oasd.com/
var imgSrc='';//半路径图片

// 请求拦截
axios.interceptors.response.use(
    response=>{
        return response
    }
);



export async function getFN(o) {
    //get方法
    return new Promise((resolve, reject) => {
        requestFN({ type: 'GET', url: BaseUrl + o.url }).then((r) => {
            resolve(r);
        })
    })
}

export async function postFN(o) {
    //post方法
    // console.log(router,'路由信息')
    // console.log(router.getMatchedComponents())
    var url = BaseUrl + o.url;
    var handleUrl = { type: 'POST', url: url, data: o.data }
    if (o.params != undefined) {
        parameter = "params"
        handleUrl = { type: 'POST', url: url, data: o.params }
    }
    return new Promise((resolve, reject) => {
        requestFN(handleUrl).then((r) => {
            resolve(r);
        })
    })
}
export async function putFN(o) {
    //put方法
    var url = BaseUrl + o.url;
    var handleUrl = { type: 'POST', url: url, data: o.data }
    if (o.params != undefined) {
        parameter = "params"
        handleUrl = { type: 'POST', url: url, data: o.params }
    }
    return new Promise((resolve, reject) => {
        requestFN(handleUrl).then((r) => {
            resolve(r);
        })
    })
}

export async function delFN(o) {
    //delt方法
    return new Promise((resolve, reject) => {
        requestFN({ type: 'DELETE', url: BaseUrl + o.url }).then((r) => {
            resolve(r);
        })
    })
}


export function requestFN(o) {
    //基础请求方法
    //o.type //请求类型
    //o.url //请求路径
    //o.data //请求参数
    return new Promise((resolve, reject) => {
        var obj = {
            method: o.type,
            url: o.url
        }
       if(obj.url.split("?")[0]=="/StudentCourse/UserWorksUploadFile"){
            obj.headers={'Content-Type':'multipart/form-data'}
        }
        if (o.type == "POST" || o.type == "PUT") {
            if (parameter == "params") { obj.params = o.data }
            else { obj.data = o.data }
        }
        axios(obj).then((r) => {
            resolve(r)
        })
    })
}



const install = () => {
    Vue.prototype.getFN = getFN;
    Vue.prototype.postFN = postFN;
    Vue.prototype.putFN = putFN;
    Vue.prototype.delFN = delFN;
    Vue.prototype.imgSrc = imgSrc;
}
export default install
