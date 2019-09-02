<template>
    <div id="yuTeacherLive">
        <div class="row">
            <div class="row" style="margin-top:1%">

            <div class="col-sm hiden">
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                <label class="input-group-text" for="audioList"><strong class="text-gray-dark">音频设备</strong></label>
                </div>
                <select class="custom-select" id="audioList" ref="audioList" style="width: 60%">
                </select>
            </div>
            </div>

            <div class="col-sm hiden">
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                <label class="input-group-text" for="videoList"><strong class="text-gray-dark">视频设备</strong></label>
                </div>
                <select class="custom-select" id="videoList" ref="videoList" style="width: 60%">
                </select>
            </div>
            </div>

            <div class="col-sm hiden">
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                <label class="input-group-text" for="roomId"><strong class="text-gray-dark">房间号</strong></label>
                </div>
                <input type="email" class="form-control d-inline" id="roomId" style="width: 60%" v-model="config.idName">
                <!-- v-model="config.idName" -->
            </div>
            </div>

            <div class="col-sm">
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                <label class="input-group-text" for="memberList"><strong class="text-gray-dark">房间人员</strong></label>
                </div>
                <select class="custom-select" id="memberList" style="width: 60%">
                </select>
            </div>
            </div>


        </div>

        <div class="row">

            <div class="col-sm hiden">
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                    <label class="input-group-text" for="videoList"><strong class="text-gray-dark">推流质量</strong></label>
                    </div>
                    <select class="custom-select" id="videoQuality" style="width: 70%">
                    <option value="1">标清</option>
                    <option value="2" selected>高清</option>
                    <option value="3">超清</option>
                    </select>
                </div>
            </div>

            <div class="col-sm hiden">
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                    <label class="input-group-text" for="videoList"><strong class="text-gray-dark">最大拉流数</strong></label>
                    </div>
                    <input type="email" class="form-control d-inline" id="maxPullNamber" style="width: 75%" value="7"
                    aria-describedby="emailHelp" placeholder="最大拉流数默认为4">
                </div>
            </div>
        </div>

            <div class="col-sm">
            <button type="button" id="createRoom" @click="createRoom" class="btn btn-primary btn-sm">创建房间(作为主播)</button>
            <button type="button" id="openRoom" class="btn btn-primary btn-sm hiden">进入房间(作为观众)</button>
            <button type="button" id="leaveRoom" class="btn btn-secondary btn-sm">退出</button>
            <button type="button" id="endJoinLive" class="btn btn-primary btn-sm hiden">结束连麦(作为主播)</button>
            <button type="button" id="endLive" class="btn btn-primary btn-sm hiden">结束连麦(作为观众)</button>
            <button type="button" id="requestJoinLive" class="btn btn-primary btn-sm hiden">请求连麦(作为观众)</button>
            <button type="button" id="inviteJoinLive" class="btn btn-primary btn-sm hiden">邀请连麦(作为主播)</button>
            </div>
        </div>

        <div class="row videoRow">
            <div class="col-sm">
            <label id="previewLabel" class="text-white"></label>
            <video id="previewVideo" ref="previewVideo" autoplay muted playsinline></video>
            </div>
            <div class="col-sm remoteVideo">
            <!-- <video  autoplay muted playsinline></video> -->
            </div>
      </div>

        <van-dialog
        v-model="show"
        title="请输入密码"
        @confirm="checkPassword"
        >
            <input v-model="password"/>
        </van-dialog>
    </div>
</template>

<script>
import Zego from "./../../../static/jZego-rtc.js";

export default {
    data(){
        return{
            roll:null,
            appid : "3218602428",
            appSigin : '',
            config : {
                appid: this.appid * 1,
                idName: "1234",//这里是用户id，对接时候要在后台吧用户id值放在这里
                nickName: '',
                server: "wss://wsliveroom-test.zego.im:8282/ws",//"wss://wsliveroom-alpha.zego.im:8282/ws",
                logLevel: 0,
                logUrl: "wss://wslogger-test.zego.im:8282/log",
                remoteLogLevel: 0,
                audienceCreateRoom: true,
                testEnvironment: false,
            },
            otherConfig : {
                cgi_token: '',
                roomlist: '',
                signal: '',
                token: "https://live.9oasd.com:60002/Token"//"https://wsliveroom"+appid+"-api.zego.im:8282/token",
            },
            loginRoom : false,
            previewVideo:"",
            screenCaptrue:"",
            isPreviewed : false,
            useLocalStreamList : [],
            anchor_userid : '', 
            anchro_username : '',

            zg:{},
            show:true,
            password:"123456",
            chapterId:"b85bbee7-10c1-4489-86ef-9dade94063a9",
            schoolCourseId:"25e659f1-2304-4712-9273-5c7eee091a56",
        }
    },

    methods:{
        // 检查老师密码
        checkPassword(){
            this.getFN({
                url:"/Course/CheckLivePassowrd?chapterId="+this.chapterId+"&password="+this.password+"&schoolCourseId="+this.schoolCourseId
            }).then((res)=>{
                console.log(res);
                let response = res.data;
                if(res.data.state == "success")
                {
                    this.config.idName = 1234;//response.data.idName;
                    this.config.nickName = response.data.nickName;
                }
                console.log(this.config);
            });
        },

        // 创建房间
        createRoom(){
            this.openRoom(this.config.idName, 1);
        },
        openRoom(roomId, type){
            if (!roomId) {
                alert('请输入房间号');
                return;
            }

            // screenCaptrue && zg.stopScreenShot();
            //get token   生产环境下获取token方式
            this.getFN({
                url:"/Course/GetZeGouToken?userid="+this.config.idName,
            }).then((res)=>{
                let response = res;
                console.log(response,'获取的token');
                if(!response.data)
                {
                    alert("get token failed");
                }
                else
                {
                    console.log('gettoken success');
                    this.startLogin(roomId, response.data, type)
                }
            });
        },


        // live.js
        //覆盖index.js 中的init
        // init(){
        //     zg = new Zego.ZegoClient();
        //     zg.setUserStateUpdate(true);//重要  启动用户变化监听

        //     //内调测试用代码，客户请忽略  start
        //     setConfig(zg);
        //     //内调测试用代码，客户请忽略  end


        //     zg.config(config);
        //     enumDevices();

        //     // 监听sdk回掉
        //     listen();
        // },

        respondJoinLive(flag, requestId, fromUserId) {
            var accept = flag;
            window._fromUserId = fromUserId;
            zg.respondJoinLive(requestId, accept, function (seq) {
                console.log('respondJoinLive success', seq);
            }, function (err, seq) {
                console.log('respondJoinLive err', err, seq);
            })
        },

        listenChild() {
            var listens = {
                onGetAnchorInfo: function (userid, username) {
                    anchor_userid = userid, anchro_username = username;
                },

                onRecvJoinLiveRequest: function (requestId, from_userid, from_username, roomid) {
                    console.log('onRecvJoinLiveRequest', requestId, from_userid, from_username, roomid);
                    $('#exampleModalLabel').text("收到id为" + requestId + "的连麦请求")
                    $('#liveConfirm').click();
                    $('#liveAgree').on('click', function () {
                        respondJoinLive(true, requestId, from_userid)
                    })
                    $('#liveRefuse').on('click', function () {
                        respondJoinLive(false, requestId, from_userid)
                    })
                },

                onRecvInviteJoinLiveRequest: function (requestId, from_userid, from_username, roomid) {
                    console.log('onRecvInviteJoinLiveRequest', requestId, from_userid, from_username, roomid);
                    $('#exampleModalLabel').text("收到id为" + requestId + "的连麦请求")
                    $('#liveConfirm').click();
                    $('#liveAgree').on('click', function () {
                        doPreviewPublish()
                    })
                },

                onRecvEndJoinLiveCommand: function (requestId, from_userid, from_username, roomid) {
                    console.log('onRecvEndJoinLiveCommand', requestId, from_userid, from_username, roomid);
                    isPreviewed && this.zg.stopPreview(this.previewVideo);
                    isPreviewed && this.zg.stopPublishingStream(this.config.idName);
                },
                onUserStateUpdate: function (roomId, userList) {
                    console.log('onUserStateUpdate', roomId, userList);
                    userList.forEach(function (item) {
                        if (item.action === 1) {
                            $userList.push(item);
                        } else if (item.action === 2) {
                            $userList.forEach(function (item2, index) {
                                if (item.idName === item2.idName) {
                                    $userList.splice(index, 1)
                                }
                            })
                        }


                    })
                    $('#memberList').html('');
                    $userList.forEach(function (item) {
                        item.idName !== this.config.idName && $('#memberList').append('<option value="' + item.idName + '">' + item.nickName + '</option>');
                    });
                },
                onGetTotalUserList: function (roomId, userList) {
                    $userList = userList;
                    $('#memberList').html('');
                    $userList.forEach(function (item) {
                        item.idName !== this.config.idName && $('#memberList').append('<option value="' + item.idName + '">' + item.nickName + '</option>');
                    });
                    console.log('onGetTotalUserList', roomId, userList);
                }
            };
            for (var key in listens) {
                this.zg[key] = listens[key]
            }
        },

        loginSuccess(streamList, type) {

            let role = this.zg.stateCenter.role

            if (role == 1) {
                $('#endLive')[0].disabled = true
                $('#requestJoinLive')[0].disabled = true
            } else if (role == 2) {
                $('#endJoinLive')[0].disabled = true
                $('#inviteJoinLive')[0].disabled = true
            }


            var maxNumber = ($('#maxPullNamber') && $('#maxPullNamber').val()) || 4

            //限制房间最多人数，原因：视频软解码消耗cpu，浏览器之间能支撑的个数会有差异，太多会卡顿
            if (streamList.length >= maxNumber) {
                alert('房间太拥挤，换一个吧！');
                leaveRoom();
                return;
            }
            if ($('#streamID').val()) {
                useLocalStreamList = [{
                    anchor_id_name: 'custom',
                    stream_id: $('#streamID').val(),
                    anchor_nick_name: 'custom'
                }, ...streamList];
            } else {
                useLocalStreamList = streamList;
            }


            $('.remoteVideo').html('');
            $('#memberList').html('');
            for (var index = 0; index < useLocalStreamList.length; index++) {
                $('.remoteVideo').append($('<video  autoplay muted playsinline controls></video>'));
                $('#memberList').append('<option value="' + useLocalStreamList[index].anchor_id_name + '">' + useLocalStreamList[index].anchor_nick_name + '</option>');
                play(useLocalStreamList[index].stream_id, $('.remoteVideo video:eq(' + index + ')')[0]);
            }
            console.log(`login success`);

            loginRoom = true;


            //开始预览本地视频
            type === 1 && doPreviewPublish();
        },

        leaveRoom() {
            console.info('leave room  and close stream');

            if (isPreviewed) {
                this.zg.stopPreview(this.previewVideo);
                this.zg.stopPublishingStream(this.config.idName);
                isPreviewed = false;
            }

            for (var i = 0; i < useLocalStreamList.length; i++) {
                this.zg.stopPlayingStream(useLocalStreamList[i].stream_id);
            }

            $('#endLive')[0].disabled = false
            $('#requestJoinLive')[0].disabled = false
            $('#endJoinLive')[0].disabled = false
            $('#inviteJoinLive')[0].disabled = false

            useLocalStreamList = [];
            $('.remoteVideo').html('');
            this.zg.logout();

            role = null
        },



        // common.js
        getBrowser(){
            var ua = window.navigator.userAgent;
            var isIE = window.ActiveXObject != undefined && ua.indexOf("MSIE") != -1;
            var isFirefox = ua.indexOf("Firefox") != -1;
            var isOpera = window.opr != undefined;
            var isChrome = ua.indexOf("Chrome") && window.chrome;
            var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
            if (isIE) {
                return "IE";
            } else if (isFirefox) {
                return "Firefox";
            } else if (isOpera) {
                return "Opera";
            } else if (isChrome) {
                return "Chrome";
            } else if (isSafari) {
                return "Safari";
            } else {
                return "Unkown";
            }
        },

        IsPC(){
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },

        enumDevices(){
            // var zego = require("./../../../static/jZego-rtc.js");
            // var zg = new zego.ZegoClient();
            var audioInputList = [], videoInputList = [];
            this.zg.enumDevices(deviceInfo => {
                console.log('enumDevices' + JSON.stringify(deviceInfo));
                if (deviceInfo.microphones) {
                    for (var i = 0; i < deviceInfo.microphones.length; i++) {

                        if (!deviceInfo.microphones[i].label) {
                            deviceInfo.microphones[i].label = 'microphone' + i;
                        }
                        audioInputList.push(' <option value="' + deviceInfo.microphones[i].deviceId + '">' + deviceInfo.microphones[i].label + '</option>');
                        console.log("microphone: " + deviceInfo.microphones[i].label);
                    }
                }

                if (deviceInfo.cameras) {
                    for (var i = 0; i < deviceInfo.cameras.length; i++) {
                        if (!deviceInfo.cameras[i].label) {
                            deviceInfo.cameras[i].label = 'camera' + i;
                        }
                        videoInputList.push('<option value="' + deviceInfo.cameras[i].deviceId + '">' + deviceInfo.cameras[i].label + '</option>');
                        console.log("camera: " + deviceInfo.cameras[i].label);
                    }
                }

                audioInputList.push(' <option value="0">禁止</option>');
                videoInputList.push('<option value="0">禁止</option>');

                this.$refs['audioList'].innerHTML = audioInputList.join('');
                this.$refs['videoList'].innerHTML = videoInputList.join('');
                // $('#audioList').html(audioInputList.join(''));
                // $('#videoList').html(videoInputList.join(''));
            }, function (error) {
                console.error("enum device error: " + error);
            });
        },

        getParamByName(key){
            var search = location.search;

            if (!search || search == '?') return null;
            search = search.replace('?', '');

            var param_arr = search.split('&'), param_map = {};
            param_arr.forEach(function (item) {
                var _key = item.split('=')[0], value = item.split('=')[1];
                param_map[_key] = value;
            });

            return param_map[key];
        },

        startLogin(roomId, token,type){
            var that = this;
            that.init();
            alert("??");
            // var zego = require("./../../../static/jZego-rtc.js");
            // var zg = new zego.ZegoClient();
            that.zg.login(roomId, type, token, function (streamList) {
                alert('login success');
                that.loginSuccess(streamList, type);
            }, function (err) {
                that.loginFailed(err);
            })
         },

        loginFailed(err){
            alert('登录失败');
            console.error(err)
        },

        loginSuccess(streamList, type){
            alert("登陆成功");
            var maxNumber = ($('#maxPullNamber') && $('#maxPullNamber').val()) || 4

            //限制房间最多人数，原因：视频软解码消耗cpu，浏览器之间能支撑的个数会有差异，太多会卡顿
            if (streamList.length >= maxNumber) {
                alert('房间太拥挤，换一个吧！');
                leaveRoom();
                return;
            }
            if ($('#streamID').val()) {
                useLocalStreamList = [{
                    anchor_id_name: 'custom',
                    stream_id: $('#streamID').val(),
                    anchor_nick_name: 'custom'
                }, ...streamList];
            } else {
                useLocalStreamList = streamList;
            }


            $('.remoteVideo').html('');
            $('#memberList').html('');
            for (var index = 0; index < useLocalStreamList.length; index++) {
                $('.remoteVideo').append($('<video  autoplay muted playsinline controls></video>'));
                $('#memberList').append('<option value="' + useLocalStreamList[index].anchor_id_name + '">' + useLocalStreamList[index].anchor_nick_name + '</option>');
                play(useLocalStreamList[index].stream_id, $('.remoteVideo video:eq(' + index + ')')[0]);
            }
            console.log(`login success`);
            loginRoom = true;
            //开始预览本地视频
            type === 1 && doPreviewPublish();
        },

        doPreviewPublish(config){
            alert("开启预览视频");
            var quality = ($('#videoQuality') && $('#videoQuality').val()) || 2;

            var previewConfig = {
                "audio": $('#audioList').val() === '0' ? false : true,
                "audioInput": $('#audioList').val() || null,
                "video": $('#videoList').val() === '0' ? false : true,
                "videoInput": $('#videoList').val() || null,
                "videoQuality": quality * 1,
                "horizontal": true,
                "externalCapture": false,
                "externalMediaStream": null
            };
            previewConfig = $.extend(previewConfig, config);
            console.log('previewConfig', previewConfig);
            var result = this.zg.startPreview(this.previewVideo, previewConfig, function () {
                console.log('preview success');
                isPreviewed = true;
                $('#previewLabel').html(this.config.nickName);
                let isAudio
                $('#previewVideo')[0].srcObject.getAudioTracks().length === 0 ? isAudio = false : isAudio = true;
                publish(isAudio);
                //部分浏览器会有初次调用摄像头后才能拿到音频和视频设备label的情况，
                enumDevices();
            }, function (err) {
                alert(JSON.stringify(err));
                console.error('preview failed', err);
            });

            if (!result) alert('预览失败！')
        },

        publish(isAudio){
            if (isAudio) {
                this.zg.startPublishingStream(this.config.idName, this.previewVideo, '{"playType":"All"}');
            } else {
                this.zg.startPublishingStream(this.config.idName, this.previewVideo, '{"playType":"Video"}')
            }
        },

        play(streamId, video){
            var result = this.zg.startPlayingStream(streamId, video);

            video.muted = false;
            if (!result) {
                alert('哎呀，播放失败啦');
                video.style = 'display:none';
                console.error("play " + el.nativeElement.id + " return " + result);

            }
        },

        listen(){
            // var zego = require("./../../../static/jZego-rtc.js");
            // var zg = new zego.ZegoClient();
            var _config = {
            onPlayStateUpdate: function (type, streamid, error) {
                if (type == 0) {
                    console.info('play  success');
                } else if (type == 2) {
                    console.info('play retry');
                } else {

                    console.error("play error " + error.msg);

                    var _msg = error.msg;
                    if (error.msg.indexOf('server session closed, reason: ') > -1) {
                        var code = error.msg.replace('server session closed, reason: ', '');
                        if (code == 21) {
                            _msg = '音频编解码不支持(opus)';
                        } else if (code == 22) {
                            _msg = '视频编解码不支持(H264)'
                        } else if (code == 20) {
                            _msg = 'sdp 解释错误';
                        }
                    }
                    alert('拉流失败,reason = ' + _msg);
                }

            },
            onPublishStateUpdate: function (type, streamid, error) {
                if (type == 0) {
                    console.info(' publish  success');
                } else if (type == 2) {
                    console.info(' publish  retry');
                } else {
                    console.error('publish error ' + error.msg);
                    var _msg = error.msg;
                    if (error.msg.indexOf('server session closed, reason: ') > -1) {
                        var code = error.msg.replace('server session closed, reason: ', '');
                        if (code == 21) {
                            _msg = '音频编解码不支持(opus)';
                        } else if (code == 22) {
                            _msg = '视频编解码不支持(H264)'
                        } else if (code == 20) {
                            _msg = 'sdp 解释错误';
                        }
                    }
                    alert('推流失败,reason = ' + _msg);

                }

            },
            onPublishQualityUpdate: function (streamid, quality) {
                console.info("#" + streamid + "#" + "publish " + " audio: " + quality.audioBitrate + " video: " + quality.videoBitrate + " fps: " + quality.videoFPS);
            },

            onPlayQualityUpdate: function (streamid, quality) {
                console.info("#" + streamid + "#" + "play " + " audio: " + quality.audioBitrate + " video: " + quality.videoBitrate + " fps: " + quality.videoFPS);
            },

            onDisconnect: function (error) {
                console.error("onDisconnect " + JSON.stringify(error));
                alert('网络连接已断开' + JSON.stringify(error));
                leaveRoom();
            },

            onKickOut: function (error) {
                console.error("onKickOut " + JSON.stringify(error));
            },
            onStreamUpdated: function (type, streamList) {
                if (type == 0) {
                    for (var i = 0; i < streamList.length; i++) {
                        console.info(streamList[i].stream_id + ' was added');
                        useLocalStreamList.push(streamList[i]);
                        $('#memberList').append('<option value="' + streamList[i].anchor_id_name + '">' + streamList[i].anchor_nick_name + '</option>');
                        $('.remoteVideo').append($('<video  autoplay muted playsinline></video>'));
                        play(streamList[i].stream_id, $('.remoteVideo video:last-child')[0]);
                    }

                } else if (type == 1) {

                    for (var k = 0; k < useLocalStreamList.length; k++) {

                        for (var j = 0; j < streamList.length; j++) {

                            if (useLocalStreamList[k].stream_id === streamList[j].stream_id) {

                                this.zg.stopPlayingStream(useLocalStreamList[k].stream_id);

                                console.info(useLocalStreamList[k].stream_id + 'was devared');

                                useLocalStreamList.splice(k, 1);

                                $('.remoteVideo video:eq(' + k + ')').remove();
                                $('#memberList option:eq(' + k + ')').remove();

                                break;
                            }
                        }
                    }
                }

            }
        };

        for (var key in this.config) {
            this.zg[key] = this.config[key]
        }

        if (typeof listenChild === 'function') {
            listenChild();
        }
        },

        leaveRoom(){
            console.info('leave room  and close stream');

            if (isPreviewed) {
                this.zg.stopPreview(this.previewVideo);
                this.zg.stopPublishingStream(this.config.idName);
                isPreviewed = false;
            }

            for (var i = 0; i < useLocalStreamList.length; i++) {
                zg.stopPlayingStream(useLocalStreamList[i].stream_id);
            }

            useLocalStreamList = [];
            $('.remoteVideo').html('');
            this.zg.logout();
        },

        init(){
            // let zego = require("./../../../static/jZego-rtc.js");
            // zg = new zego.ZegoClient();

            //内调测试用代码，客户请忽略  start
            this.setConfig(this.zg);
            //内调测试用代码，客户请忽略  end

            this.zg.config(this.config);
            this.enumDevices();

            // 监听sdk回掉
            this.listen();
        },

        bindEvent(){
            // this.previewVideo = $('#previewVideo')[0];
            this.previewVideo = this.$refs['previewVideo'];

            //初始化sdk
            this.init();

            // $('#createRoom').click(function () {
            //     openRoom($('#roomId').val(), 1);
            // });

            // $('#openRoom').click(function () {
            //     openRoom($('#roomId').val(), 2);
            // });


            // $('#leaveRoom').click(function () {
            //     leaveRoom();
            // });


            //防止，暴力退出（关闭或刷新页面）--最新版本已经内部集成 不再需要
            // var isOnIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
            // var eventName = isOnIOS ? "pagehide" : "beforeunload";
            // window.addEventListener(eventName, function (event) {
            //     window.event.cancelBubble = true; // Don't know if this works on iOS but it might!
            //     leaveRoom();
            // });
        },

        setConfig(zg){
            //测试用代码，客户请忽略  start
            if (location.search) {
                let _arr_config = location.search.substr(1).split('&');
                _arr_config.forEach(function (item) {
                    var key = item.split('=')[0], value = item.split('=')[1];

                    if (value && this.config.hasOwnProperty(key)) {
                        this.config[key] = decodeURIComponent(value);
                    } else if (value && this.otherConfig.hasOwnProperty(key)) {
                        this.otherConfig[key] = decodeURIComponent(value);
                    }
                });
            }
            //测试用代码，客户请忽略  end


            console.log("config param:" + JSON.stringify(this.config));

            this.config.appid = this.config.appid * 1;
            this.config.testEnvironment = !!(this.config.testEnvironment * 1);

            //测试用代码，客户请忽略  start
            if (this.otherConfig.signal) {
                zg.setCustomSignalUrl(this.otherConfig.signal);
            }

            if (this.otherConfig.cgi_token && this.otherConfig.token == 'https://wsliveroom-demo.zego.im:8282/token') {
                $.get(this.otherConfig.cgi_token, function (cgi_token) {
                    this.otherConfig.cgi_token = cgi_token.data;
                    console.log(this.otherConfig.cgi_token);
                })
            }
            //测试用代码，客户请忽略  end
        },

        desc(){
            this.addCssByLink('./../../../static/desc.css');
            this.loadJs('./../../../static/desc.js', function () {
                var descAtag = document.createElement('a');
                descAtag.setAttribute('id', 'descModule');
                descAtag.setAttribute('role', 'button');
                descAtag.setAttribute('tabindex', '0');
                // descAtag.setAttribute('data-trigger', 'focus');
                descAtag.setAttribute('data-toggle', 'popover');
                descAtag.setAttribute('title', '调用说明');

                var pageUrl = location.pathname.split('/');
                pageUrl = pageUrl[pageUrl.length-2];

                var descArr = descObj[pageUrl] || [];
                descAtag.setAttribute('data-content', descArr.join(`<br/><br/>`));

                console.log(descObj);
                document.getElementsByTagName('body')[0].appendChild(descAtag);

                // $('#descModule').popover({
                //     html: true
                // })
            })
        },
        addCssByLink(url){
            var doc = document;
            var link = doc.createElement("link");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("type", "text/css");
            link.setAttribute("href", url);

            var heads = doc.getElementsByTagName("head");
            if (heads.length)
                heads[0].appendChild(link);
            else
                doc.documentElement.appendChild(link);
        },
        loadJs(url, callback){
            var script = document.createElement('script');
            script.type = "text/javascript";
            if (typeof (callback) != "undefined") {
                if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            callback();
                        }
                    }
                } else {
                    script.onload = function () {
                        callback();
                    }
                }
            }
            script.src = url;
            document.body.appendChild(script);
        },
    },
    mounted(){
        window.location.href = "https://studentlive.9oasd.com/live/index.html";
        let zego = require("./../../../static/jZego-rtc.js");
        this.zg = new zego.ZegoClient();
        console.log(this.zg);
        // console.log('sdk version is', ZegoClient.getCurrentVersion());
        if (zego.ZegoClient.isSupportWebrtc()) {
            zego.ZegoClient.isSupportH264(result => {
                this.bindEvent();
                if (!result) {
                    alert('浏览器不支持视频h264编码，不能推拉音频流');
                }
            }, err => {
                console.error(err);
            })
        } else {
            alert('浏览器不支持webrtc，换一个浏览器试试吧');
        }

        this.desc()
    },
}
</script>

<style lang="less">
    #yuTeacherLive{
        .van-dialog
        {
            .van-dialog__content
            {
                padding: 3rem 2rem;
                input
                {
                    border-bottom: 1px solid #c2c2c2;
                    width: 100%;
                }
            }
        }
    }
</style>
