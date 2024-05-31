const express = require('express'); //commonjs
//import express from 'express';
const app = express(); //app express
const port = process.env.PORT || 3000; //port 3000
const hostname = process.env.HOSTNAME;


//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//config session 
const session = require('express-session');
app.use(session({
  secret: 'secret-key', // Chuỗi bí mật để ký và mã hóa phiên
  resave: false,
  saveUninitialized: true,
}));


//config cookie 
const cookieParser = require('cookie-parser');
app.use(cookieParser()); 

//config tamplate engine
const configViewEngine = require('./config/viewEngine');
configViewEngine(app);



//check login
const {decodeToken} = require('./middleware/token');
app.use((req, res, next) => {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (req.session && req.session.token) {
      // Nếu người dùng đã đăng nhập, gán thông tin người dùng vào biến res.locals.user
      if(req.session.isLoggedIn === true)
        user = decodeToken(req.session.token);
       
        res.locals.user = user.User_ID;
        if (!req.session.cart) {        
            req.session.cart = [];
        }
        res.locals.cart = req.session.cart.length;
      // Kiểm tra xem có mảng cart trong session chưa
    
  } else {
      // Nếu không có người dùng đã đăng nhập, có thể gán một giá trị mặc định khác
      res.locals.user = null;
      res.locals.cart = 0;
       // hoặc res.locals.user = {} hoặc bất kỳ giá trị khác tùy thuộc vào yêu cầu của bạn
  }
  next();
});





//check routers
app.use((req, res, next) => {
  if (req.path.substr(-1) === '/' && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
});



//config routers
const web_router = require('./routes/web');
app.use('/web', web_router);


const home_router = require('./routes/home.router');
app.use('/', home_router);


const login_router = require('./routes/login.router');
app.use('/login', login_router);





//các biến global




app.listen(port, hostname, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});