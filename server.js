const mongoose = require('mongoose')
require('dotenv').config();
const  nocache = require('nocache')
const sharp = require('sharp')
const fs = require('fs')
mongoose.connect("mongodb://127.0.0.1:27017/E-commerce")
console.log("loding");

const express = require('express')
const app = express()

app.use(nocache({
    maxAge: 86400
}))
const userRout = require('./router/userRouter')
app.use('/',userRout)
console.log("jhh");

const adminRout = require('./router/adminRouter');
// const nocache = require('nocache');
app.use('/admin',adminRout)
console.log("adminn server");


// const proRout = require('./router/productRouter')
// app.use = ('/admin',proRout)
// console.log("pro server");

app.listen(process.env.portnumber, ()=>{console.log("server is running");})
