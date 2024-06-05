const connection = require('../config/database');
const bcrypt = require('bcrypt');
const {getIdUsers, add_Users, add_info_Users} = require('../models/user.model');

const {createToken} = require('../middleware/token');


const getLogin = function (req, res){
    const status = req.session.check_login || null;
    return res.render('login.ejs', {err: status})

    
};



const postLogin = async function (req, res){
    let User_ID  = req.body.User_ID ;
    let Pass_word =  req.body.Pass_word;
   
        let results = await getIdUsers(User_ID);
        if (!results || results.length === 0) {
            req.session.check_login = 'Số điện thoại chưa được đăng ký!'
            res.redirect('/login');
        }
        else{
            
            const data_pass = await bcrypt.hash(results[0].Pass_word, 10);
            bcrypt.compare(Pass_word, data_pass, function(err, result) {
                if (err) {
                    console.error('Error comparing passwords:', err);
                } else {
                    if (result) {
                        let user = {
                            User_ID: results[0].User_ID,
                            Phan_quyen: results[0].Phan_quyen
                        }
                        token = createToken(user);
                        delete req.session.check_login;
                        req.session.token = token;
                        req.session.isLoggedIn = true;        
                        if (results[0].Phan_quyen == 1)     
                            res.redirect('/');
                    } else {
                        req.session.check_login = 'Mật khẩu không chính xác!'
                        res.redirect('/login');
                    }
                }
            });
        }
        

    
};


const postSign = async function (req, res){
    let User_ID  = req.body.User_ID ;
    let Pass_word =  req.body.Pass_word;
    let Phan_quyen = 1;

    let Ho_ten  = req.body.Ho_ten ;
    let Dien_thoai  = req.body.Dien_thoai ;
    let Dia_chi  = req.body.Dia_chi ;
   
        let results = await getIdUsers(User_ID);
        if (!results || results.length === 0) {
            let check_sign = await add_Users(User_ID , Pass_word, Phan_quyen);
            add_info_Users(User_ID , Ho_ten, Dien_thoai, Dia_chi);
            if(check_sign === true){
                res.send({success: true});
            }else{
                res.send({success: false, message: "Lỗi server!"});
            }
            
        }
        else{
            
            res.send({success: false, message: "EXIT"});
        }
        

    
};




module.exports = {
    getLogin,
    postLogin,
    postSign
};