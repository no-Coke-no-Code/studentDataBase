import Vue from 'vue';
import axios from 'axios'
import crypto from 'crypto'
export function checkPhone(number){
    //验证手机号码的方法
    if (number.length == 0 || number.length < 11) {
        return false;
    }
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(number)) {
        return false;
    }
    return true;
}

function compressImg(){

}
var scale=(w,h,maxSize)=>{
    //指将最大边转为maxsize,最小边等比例缩小
			var Max=w>=h?w:h;
			if(Max<maxSize){
				return {w:w,h:h}
			}
			var dividend=Max/maxSize;
			// console.log(dividend)
			var Min;
			if(Max==w){
				Min=h
			}else{
				Min=w;
			}
			Min=Min/dividend;
			Max=Max/dividend;
			if(w>=h){
				w=Max;
				h=Min;
			}else{
				h=Max;
				w=Min;
			}
			var o={
				w: Math.round(w),
				h: Math.round(h)
            }
            // console.log(o)
			return o
}
var imgSmall=async (r,maxSize,blur)=>{
    //r指的是file文件
    //maxSize指的是将最大值转为maxsize,最小值等比缩小
    //blur指清晰度
    return new Promise((resolve, reject)=>{
        var reader = new FileReader();
        var img=new Image();
        reader.readAsDataURL(r.target.files[0]);
        reader.onload=(e)=>{
            console.log(e)
            img.src=e.target.result;
            img.onload=()=>{
                var o=scale(img.width,img.height,maxSize);
                var iw=o.w;
                var ih=o.h;
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var w=document.createAttribute("width")
                w.nodeValue=iw;
                var h=document.createAttribute("height")
                h.nodeValue=ih
                canvas.setAttributeNode(w);
                canvas.setAttributeNode(h); 
                ctx.drawImage(img,0,0,iw,ih);
                var imgR=canvas.toDataURL('image/jpeg',blur)
                var newfile=convertBase64UrlToBlob(imgR)
                newfile.name=r.target.files[0].name
                resolve(newfile)
            }
        }
    })
}

var convertBase64UrlToBlob=(urlData)=>{
    //将base64 转为 file
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte  
    var ab = new ArrayBuffer(bytes.length);  
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {  
        ia[i] = bytes.charCodeAt(i);  
    }
    return new Blob( [ab] , {type:'image/png'});
    }


var getName=(url)=>{
    //获取链接中最后的文件名字
    return url.substr(url.lastIndexOf('/')+1)
}
var getBase64=async (e)=>{
    //e 指的是file文件
    //该方法指的是将file文件转为base64
    return new Promise((resolve, reject)=>{
        var reader = new FileReader();
        var img=new Image();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(e)=>{
            resolve(e.target.result);
        }
    })
}



var replaceBase64ForHttp=(obj)=>{
    //该方法是将富文本编辑器的base64上传到服务器并且将base64替换为将返回的http链接
    //参数 
    //content 富文本内容
    //url 上传地址
    //


    var htmlhead="<!DOCTYPE html><html lang="+"en"+"><head><meta charset="+"UTF-8"+"><meta name="+"viewport"+" content="+"width=device-width,initial-scale=1.0"+"><style>img{width:100%;}</style></head><body>"
    var htmlend="</body></html>"
    // var htmlhead="";
    // var htmlend="";

    return new Promise((resolve, reject)=>{

    var imgRG=/"data(.*?>)/g;
    var base64ImgArr=obj.content.match(imgRG);
    if(!base64ImgArr||base64ImgArr.length==0){
        resolve(htmlhead+obj.content+htmlend)
    }
    var re2=/^"data.*?,/
    var re3=/">/
    var fileArr=[];//除去头和尾的base64 文件

    var uploadNum=0;//上传的条数
    var uploadSuccessFileArr=[];//上传成功之后的文件列表
    var repleceArr=[];
    for(var i=0;i<base64ImgArr.length;i++){
        var str=base64ImgArr[i].replace(re2,'')
        repleceArr.push(base64ImgArr[i].replace(re3,''))//用来截取base64的数组 保存的是base64
        fileArr.push(setFile(str.replace(re3,'')))
    }

    uploadArticleFile();//上传文章中的图片

    function setFile(str){
        //设置为file文件
        var bytes=window.atob(str);
        var ab = new ArrayBuffer(bytes.length);  
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {  
            ia[i] = bytes.charCodeAt(i);  
        }
        return new Blob( [ab] , {type:'image/png'});
    }

    async function uploadArticleFile(){
        //上传文章文件

        let param = new FormData()  // 创建form对象
        param.append('files',fileArr[uploadNum],Math.random().toString().substr(2)+'.jpg')

        return await axios({
            method: 'post',
            // responseType: 'json', // 默认的
            url:obj.url,
            data:param,
            headers: {
                'Content-Type': 'multipart/form-data',
                'charset':'utf-8'
            }
        }).then(function (r) {
            
            if(uploadNum==fileArr.length){
                //所有文件上传成功
                // console.log(uploadSuccessFileArr)
                var startIndex;
                var endIndex
                for(var i=0;i<repleceArr.length;i++){
                    startIndex=obj.content.indexOf(repleceArr[i])//找到替换的字符串的开头
                    endIndex=startIndex+repleceArr[i].length//找到替换的字符串的结尾
                    obj.content=obj.content.slice(0,startIndex+1)+uploadSuccessFileArr[i]+obj.content.slice(endIndex)//拼接文章内容
                }
                resolve(htmlhead+obj.content+htmlend)
                return;
            }else{
                uploadSuccessFileArr.push("/static/article/"+obj.urlId+"/"+r.data[0])//将上传成功文件保存在数组里面
                uploadNum+=1;
                uploadArticleFile()
            }
            return r.data
        }).catch(function (error) {
            throw error
        });

    }

    })

}//将富文本编辑器中的base64图片转为http图片

var MD5FN=(str)=>{
    var md5 = crypto.createHash("md5");
    md5.update(str);
    var newStr = md5.digest('hex');
    return newStr
}



var rd=()=>{
    //获取字符数随机数，不一定是数字
    return Math.random().toString().slice(2)
}

// 解决txt乱码问题
var changeRGB=(data)=>{
    return new Promise((resolve, reject)=>{
        let reader = new FileReader();
        reader.readAsText(data, 'GBK');
        reader.onload = function (e) {
            resolve(reader.result) 
        }
    })
}

const install = function(Vue) { //通过install方法挂载到Vue原型上去
    Vue.prototype.imgSmall=imgSmall;
    Vue.prototype.changeRGB=changeRGB;
    Vue.prototype.getName=getName;
    Vue.prototype.getBase64=getBase64;
    Vue.prototype.replaceBase64ForHttp=replaceBase64ForHttp;
    Vue.prototype.rd=rd;
    Vue.prototype.MD5FN=MD5FN;
    Vue.prototype.convertBase64UrlToBlob=convertBase64UrlToBlob;
}
export default install