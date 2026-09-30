require("dotenv").config();
const express= require('express');
const app=express();
const path= require('path');  
const cookieParser = require('cookie-parser');
const ownersRouter=require("./routes/ownersRouter");
const productsRouter=require("./routes/productsRouter");
const usersRouter=require("./routes/usersRouter");
const indexRouter = require("./routes/index");
const experssSession=require("express-session");
const flash = require("connect-flash");
require("dotenv").config();


const db=require("./config/mongoose-connection");


app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.use(cookieParser());
app.use(
    experssSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.JWT_SECRET,
    })
);
app.use(flash());

app.use("/", indexRouter);
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);


app.listen(3000);