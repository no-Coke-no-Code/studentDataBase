/*
 * @Author: fujihang 
 * @Date: 2019-03-19 15:29:23 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-05-08 16:44:28
    常见插件封装
 */
import Vue from 'vue'
import { Toast } from 'vant';
import { Dialog } from 'vant';

// 加载 默认提示加载中
var tipFN=(data)=>{
    let val="加载中..."
    if(data!=undefined) val=data
    Toast.loading({
        duration:0,
        forbidClick:true,
        mask: true,
        message: val
    });
}

// 关闭加载
var tipHFN=()=>{
    setTimeout(()=>{
        Toast.clear();
    },400) 
}
// 成功 默认2秒，除非传第二个参数
var okFN=(data,timeC)=>{
    let time=2000
    if(timeC) time=timeC
    if(data==undefined) data=''
    Toast.success({
        message:data,
        duration:time,
    });
}

// 失败 默认2秒，除非传第二个参数
var errFN=(data,timeC)=>{
    let time=2000
    if(timeC) time=timeC
    if(data==undefined) data=''
    Toast.fail({
        message:data,
        duration:time,
    });
}

// 通知 默认3秒，除非传第二个参数
var notFN=(data,timeC)=>{
    let time=3000
    if(timeC) time=timeC
    Toast({
        message:data,
        duration:time
    });
}

// 系统提示
var sysFN=(n,c)=>{
    Dialog.alert({
        title: n,
        message: c
    })
}

//时间错转时间
var timestampToTime=function(timestamp){
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    var D = date.getDate() + ' ';
    if(D<10){
    D='0'+D
    }
    // var h = date.getHours() + ':';
    // var m = date.getMinutes();
    // if(m<10){
    // m='0'+m
    // }
    return Y+M+D;
}
var getTimeC=function(timestamp){
    var date = new Date(timestamp.replace(/-/g,'/'));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    // var Y = date.getFullYear() + '/';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    var D = (date.getDate()< 10 ? '0'+(date.getDate()) : date.getDate()) + '日';
    // var h = date.getHours() + ':';
    // var m = date.getMinutes();
    // if(m<10){
    // m='0'+m
    // }
    return M+D;
}

// 屏幕宽度像素
var wwWH=window.screen.width


const install=()=>{
Vue.prototype.tipFN=tipFN
Vue.prototype.tipHFN=tipHFN
Vue.prototype.okFN=okFN
Vue.prototype.errFN=errFN
Vue.prototype.notFN=notFN
Vue.prototype.wwWH=wwWH
Vue.prototype.sysFN=sysFN
Vue.prototype.timestampToTime=timestampToTime
Vue.prototype.getTimeC=getTimeC

}

export default install