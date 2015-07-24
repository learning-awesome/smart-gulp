(function(global){
  var View={};

  View.get = function(id){
    return document.getElementById(id);
  }

  View.render = function(id, key, value){
    var element = View.get(id);
    if(element){
      var data={};
      data[key]=value;
      var html = template.render(id+"Template", data);
      element.innerHTML = html;
    }
  }

  View.renderComplex=function(id, key, value){
     if(value && value.data){
       if(value.data.adms){
         View.render(id, key, value.data.adms);
       }else if(value.data.list){
         View.render(id, key, value.data.list);
       }
     }
  }

  View.renderObject = function(data, renderKeyArray){
    if(renderKeyArray&&renderKeyArray.length>0){
      for(var i=0;i<renderKeyArray.length;i++){
        var key = renderKeyArray[i];
        if(data.hasOwnProperty(key)){
          View.renderComplex(key, key, data[key]);
        }
      }
    }else{
      for(var key in data){
        View.renderComplex(key, key, data[key]);
      }
    }
  }

  View.renderObjectFilter = function(data, renderFilterKeyArray){
    var _renderFilterKeyArra= renderFilterKeyArray||[];
    for(var key in data){
      if(!_renderFilterKeyArra.indexOf(key)){
        View.renderComplex(key, key, data[key]);
      }
    }
  }

  global.View = View;

})(window);