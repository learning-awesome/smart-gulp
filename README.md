## Gulp集成前端打包框架


###框架说明

1. 支持HTML、CSS、JavaScript 压缩混淆
2. 支持CSS、JavaScript 自动引用合并
3. 支持模板include和变量引入
4. 支持CSS、JavaScript内联
5. 更多更能待完善......

###初始化说明

1. 安装[nodejs](http://nodejs.org) -- 下载对应版本并安装
2. 命令行下执行: npm install -g gulp
3. 安装依赖库 -- 命令行到项目根目录,执行 `npm install`


###安装指定插件

npm install --save-dev gulp-if

#html文件中css, js 合并
npm install --save-dev gulp-useref

依赖会自动添加package.json 中