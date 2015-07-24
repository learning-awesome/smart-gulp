(function(global){

  var request ={};

  request.request = function(method, params, callback){
    var url = "http://xxx/api";
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type","application/x-www-urlencoded");
    xhr.onreadystatechange = function(){
      if (xhr.readyState==4 && xhr.status==200) {
        var json = JSON.parse(xhr.responseText);
        console.log('>>>xhr response:%o',json);
        callback(json);
      }
    };
    xhr.send(JSON.stringify(params));
  }

  request.get = function(params, callback){
    request.request("GET", params, callback);
  }

  request.post = function(params, callback){
    request.request("POST", params, callback);
  }

  global.xhr = request;

})(window);