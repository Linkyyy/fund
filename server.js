const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser")
//路由
const users=require('./routes/api/users')
const profile=require('./routes/api/profile')
//config
const db=require('./config/keys').mongoURI;
//数据库模型
const User=require('./models/User')
//使用passport
const passport=require('passport')

const app =express();
const port =process.env.PORT ||5000;
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(passport.initialize())
require("./config/passport")(passport)
mongoose.connect(db,{
    useNewUrlParser: true
})
.then(()=>{
    console.log("Connected")
}).catch(err=>console.log(err))

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
app.get("/",(req,res)=>{
    res.send("hello world!");
});

//使用路由
app.use("/api/user",users);
app.use("/api/profile",profile);

app.listen(port,()=>{
    console.log(`Server runing on port ${port}`)
})