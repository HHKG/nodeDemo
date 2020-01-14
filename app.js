//引入express框架
var express= require('express');
//引入逻辑处理文件（自定义模块todoController）;
var todoController=require('./controller/todoController.js');
//实例化一个express对象
var app = express();
//设置一个视图引擎
app.set('view engine','ejs');

//使用外部样式
app.use('/public',express.static('public'));

//接收app对象
console.log(todoController,'==============');
todoController.todoController(app);
//监听当前的端口号
app.listen(3000);

//****这个文件的app.js主要做的事情就是用来搭建服务器以及配置服务器当中所要用的信息
