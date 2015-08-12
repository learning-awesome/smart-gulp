/*
 * bridge.java
 *˵����JavaScript �� Native ����ͨ��
 *Created by Sky on 2015/6/8
 *Copyright(c) 2015 Sky All Rights Reserved
 */

(function (global) {

    console.log(">>>init SmartNativeJSBridge:" + window.SmartNativeJSBridge);

    var bridge = window.SmartNativeJSBridge || {};

    bridge.defaultClassName = "SmartNativeAPI";
    bridge.nativeJSQueue = {};
    bridge.eventList = {};
    bridge.callbackId = 0;

    bridge.mode = {
        server: 1 /* http server */,
        prompt: 2 /* android promptģʽ */,
        iframe: 3 /* iframeģʽ */,
        protocol: 4 /* �Զ���Э�� */
    };

    bridge.isAndroid = navigator.userAgent && navigator.userAgent.indexOf('smart/android') > -1;
    bridge.isIOS = navigator.userAgent && navigator.userAgent.indexOf('smart/ios') > -1;
    bridge.android = {defaultMode: bridge.mode.server};
    bridge.ios = {defaultMode: bridge.mode.server};

    bridge.callbackJS = function (callbackId, data) {
        if (bridge.nativeJSQueue.hasOwnProperty(callbackId)) {
            bridge.nativeJSQueue[callbackId](data);
            bridge.nativeJSQueue[callbackId] = undefined;
            delete bridge.nativeJSQueue[callbackId];
        }
    }

    bridge.registerEvent = function (type, params, callback) {
        if (!bridge.eventList.hasOwnProperty(type)) {
            bridge.eventList[type] = callback;
            bridge.callNative(bridge.defaultClassName, "registerEvent", params)
        }
    }

    bridge.broadcastEvent = function (type, params, data) {
        if (bridge.eventList.hasOwnProperty(type)) {
            bridge.eventList[type](params, data);
        }
    }

    bridge.callNative = function (className, method, args, callback) {
        var params = {"className": className, "method": method, "args": args || {}};
        params.args.webViewId = bridge.webViewId;
        if (callback) {
            bridge.nativeJSQueue[++bridge.callbackId] = callback;
            params.args.callbackId = bridge.callbackId;
        }
        if (bridge.isAndroid) {
            if (bridge.android.defaultMode == bridge.mode.server) {
                return bridge.xhr(params, callback);
            } else if (bridge.android.defaultMode == bridge.mode.prompt) {
                return prompt(JSON.stringify(params));
            } else {
                console.log('The android mode ' + bridge.android.defaultMode + ' not suport');
            }
        } else if (bridge.isIOS) {
            if (bridge.ios.defaultMode == bridge.mode.server) {
                return bridge.xhr(params, callback);
            } else if (bridge.ios.defaultMode == bridge.mode.iframe) {

            } else if (bridge.ios.defaultMode == bridge.mode.protocol) {

            } else {
                console.log('The ios mode ' + bridge.defaultMode.ios + ' not suport');
            }
        }else{
           console.log('pc request:' + JSON.stringify(params));
        }
    }

    bridge.xhr = function (params, callback) {
        var start = +new Date();
        console.log('>>>H5 params:' + JSON.stringify(params));
        var async = !(!!params.args.sync);
        console.log('>>>H5 async:' + async);
        var paramsString = encodeURIComponent(JSON.stringify(params));
        var requestUrl = 'http://127.0.0.1:9999?st=' + new Date().getTime();
        var xhr = new XMLHttpRequest();
        xhr.open("POST", requestUrl, async);
        xhr.setRequestHeader("Connection", "close");
        xhr.setRequestHeader("Content-length", paramsString.length);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var end = +new Date();
                console.log('>>>NativeH5 xhr response return end time:' + end + " responseText:" + xhr.responseText);
                console.log('>>>NativeH5[' + params.method + '] async total cost: ' + (end - start) + 'ms  readyState:' + xhr.readyState + " status:" + xhr.status);
                if (xhr.responseText && callback) {
                    bridge.callbackJS(params.args.callbackId, xhr.responseText);
                }
            }
        };
        xhr.send(paramsString);
        // 同步直接返回结果
        if (!async) {
            var end = +new Date();
            console.log('>>>NativeH5[' + params.method + '] sync cost: ' + (end - start) + 'ms  readyState:' + xhr.readyState + " status:" + xhr.status + " responseText:" + xhr.responseText);
            return xhr.responseText;
        }
    }

    console.log('>>>isAndroid:'+ bridge.isAndroid + " isIOS:" + bridge.isIOS);
    global.SmartNativeJSBridge = bridge;

})(window);
