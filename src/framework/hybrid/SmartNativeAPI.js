(function (global) {

  var SmartNativeAPI = {

    callNative: function (method, args, callback) {
      return SmartNativeJSBridge.callNative(SmartNativeJSBridge.defaultClassName, method, args, callback);
    },

    registerEvent: function (type, params, callback) {
      SmartNativeJSBridge.registerEvent(type, params, callback);
    },

    toast: function (message) {
      this.callNative('toast', {message: message});
    },

    showDialog: function (title, content, description, btnList) {
      this.callNative('showDialog', {title: title, content: content, description: description, btnList: btnList});
    },

    showLoading: function (message) {
      this.callNative('showLoading', {message: message});
    },

    getEnv: function (key) {
      return this.callNative('getEnv', {key: key, sync:true});
    },

    setCache: function (key, value, maxAge) {
      this.callNative('setCache', {key: key, value: value, maxAge: maxAge || 24 * 3600});
    },

    getCache: function (key) {
      return this.callNative('getCache', {key: key});
    },

    setTitle: function (title) {
      this.callNative('setTitle', {title: title});
    },

    openWindow: function (title, url, params, target, options) {
      this.callNative('openWindow', {title: title, url: url, params: params, target: target, options: options});
    },

    pullRefresh: function (state) {
      this.callNative('pullRefresh', {state: state});
    },

    httpGet: function (url, params, callback) {
      this.callNative('httpGet', {url: url, params:params}, callback);
    },

    httpPost: function (url, params, callback) {
      this.callNative('httpPost', {url: url, params:params}, callback);
    }

  };

  global.SmartNativeAPI = SmartNativeAPI;

})(window);
