const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path')

dotenv.config({path:'./config.env'});



require('./db/conn');
app.use(express.json());

const User = require('./model/userSchema');

//linking the router files to make routing easy..
app.use(require('./router/auth'));

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
});

const PORT = process.env.PORT;

// ,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true,
//     usesFindAndModify:false
// }
// middleawar
//WE DON'T NEED MIDDLEWARE LIKE POSTMAN
// const middleware =(req ,res, next)=>{
//     console.log("from middle ware");
//     next();
// }



// app.get('/',(req,res)=>{
//     res.send(`Hello world from the server from app.js`);
// });

// app.get('/about',(req,res)=>{
//     console.log("from about page")
//     res.send(`this is about page ss`);
// });

const cookieParser = require("cookie-parser");
app.use(cookieParser());


app.get('/contact',(req,res)=>{
    res.cookie('testiing','santoshgiri',{
        expires: new Date(Date.now()+500),
        httpOnly:true
    });
    res.send(`this is contact page`);
});
app.get('/signin',(req,res)=>{
    res.send(`this is signin page`);
});
app.get('/signup',(req,res)=>{
    res.send(`this is signup page`);
});

app.listen(PORT,()=>{
    console.log(`server ${PORT}`)
})