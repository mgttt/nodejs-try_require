# try_require 是乜鬼

一个自己用的 try_require 函数。不过印入远程同步返回需要依赖 deasync
```
npm install try_require
```
then
```
var try_require=require('try_require');
var cmp=try_require("https://raw.githubusercontent.com/tangxw1983/mega-common/master/mg_core.js");
console.log(cmp);
```
