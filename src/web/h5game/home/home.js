(function (global) {

    var Home={
        domain:'http://999game.sinaapp.com/api/',
        getList:function(categoryId,freeId, pageIndex, pageSize, orderBy,callback){
            SmartNativeAPI.httpPost(this.domain+'list.php',{action:'list', freeId:freeId, i:pageIndex,p:pageSize,o:orderBy},function (response) {
                console.log('>>>getList response:' + JSON.stringify(response));
                callback(response);
            });
        },
        init:function(){
            Home.getList(0,101,1,5,1,function(responseText){
                var data = {title:'编辑推荐', list:JSON.parse(responseText)};
                View.render('recommendList','data', data);
            });

            Home.getList(0,0,1,5,1,function(responseText){
                var data = {title:'最新游戏', list:JSON.parse(responseText)};
                View.render('newList','data', data);
            });

            Home.getList(0,0,1,5,2,function(responseText){
                var data = {title:'热门游戏', list:JSON.parse(responseText)};
                View.render('hotList','data', data);
            });
        },
        openWindow:function(gameId,name, url){
            SmartNativeAPI.openWindow(name, url, {gameId:gameId,gameName:name}, 'common');
        }
    };


    Home.init();


    global.Home=Home;

})(window);
