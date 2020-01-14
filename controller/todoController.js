//引入mongoose模块
var mongoose=require('mongoose');
//链接数据库
mongoose.connect('mongodb+srv://todo:wangyiyang520@cluster0-qmrub.mongodb.net/test?retryWrites=true&w=majority',{useUnifiedTopology:true,useNewUrlParser:true},function(err){
    if(err){
        console.log('Connection Error:' + err)
    }else{
        console.log('Connection success!')}  });
//创建一个图表
var newTodo=new mongoose.Schema({
   item:String
});
//往数据库里存储数据
var Todo=mongoose.model('todo',newTodo);
Todo({item:'大家好！'}).save(function(err,data){
    if(err) throw  err;
    console.log('item saved!!!!!!!!');
})


//准备一条假数据
var bodyParser=require('body-parser'); //对页面传过来的数据进行解码
//对数据进行解析
var urlencodeParser=bodyParser.urlencoded({extended:false});
var data=[
    {item:'欢迎大家多多喜欢九九六'},
    {item:'喜欢九九五也行'},
    {item:'喜欢九九七也不差'},
];
var todoController=function(app){
    app.get('/todo',function(req,res){
      res.render('todo',{todos:data});//找到文件名为todo的ejs文件，render可传两个参数，一个是页面，另一个是传到页面的数据
    });

    //传递数据
    app.post('/todo',urlencodeParser,function(req,res){ //页面上通过post方法传过来的数据，可以通过app.post接收到
         console.log(req.body);
         data.push(req.body);
    });
    //删除数据(:item是获取页面通过链接后面传参的形式传过来的参数)
    app.delete('/todo/:item',function(req,res){
     console.log(req.params.item);
     data= data.filter(x=>{
        return req.params.item!==x.item;
     });
     console.log(data);
     //给页面返回对应的数据,此时接收数的是传递删除数据的那个成功函数的回调函数接收到这个json传递过去的数组
        res.json(data);
    });
}

module.exports={todoController,data}