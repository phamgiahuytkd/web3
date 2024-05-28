const express = require('express'); //commonjs
//import express from 'express';
const app = express(); //app express
const port = process.env.PORT || 3000; //port 3000
const hostname = process.env.HOSTNAME;


//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





//config tamplate engine
const configViewEngine = require('./config/viewEngine');
configViewEngine(app);




//test connection





//config routers
const web_router = require('./routes/web');
app.use('/', web_router);




app.listen(port, hostname, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});