const {getInfoUsers, update_InfoUsers, update_Pass, getIdUsers} = require('../models/user.model');
const {ad_Bill, ad_DetailBill, db_AllBillUser, get_BillDetail, db_RateProduct, add_Rating} = require('../models/bill.model');
const baseForm = require('../migration/view.func');
const moment = require('moment');
const bcrypt = require('bcrypt');
const {decodeToken} = require('../middleware/token');


const { v4: uuidv4 } = require('uuid');

const getCart = async function (req, res){
    if (req.session.isLoggedIn === true) {
        return res.render('cart.ejs', { detail_cart : req.session.cart});
    }
    
    
    
};


const postUpdateCart = async function (req, res){
    if (req.session.isLoggedIn === true) {
        let Ma_san_pham = req.body.Ma_san_pham;
        let So_luong = parseInt(req.body.So_luong, 10);

    
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
        const productIndex = req.session.cart.findIndex(item => item.Ma_san_pham === Ma_san_pham);
    
        if (productIndex !== -1) {
            // Sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
            req.session.cart[productIndex].So_luong = So_luong;
        }
        const totalQuantity = req.session.cart.reduce((total, product) => total + product.So_luong, 0);
        res.send({ success: true, So_luong: totalQuantity});
    } else {
        res.send({ success: false });
    }

    
};







const postRemoveCart = async function (req, res){
    if (req.session.isLoggedIn === true) {
        let Ma_san_pham = req.body.Ma_san_pham;
        //Tìm chỉ số của sản phẩm trong mảng bằng Ma_san_pham
    
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
        req.session.cart = req.session.cart.filter(item => item.Ma_san_pham !== Ma_san_pham);
        const totalQuantity = req.session.cart.reduce((total, product) => total + product.So_luong, 0);
        res.send({ success: true, So_luong: totalQuantity});
    } else {
        res.send({ success: false });
    }

    
};







const getCheckout = async function (req, res){
    if (req.session.isLoggedIn === true) {
        if (req.session.checkout) {   
            let user = decodeToken(req.session.token);
            let info_user = await getInfoUsers(user.User_ID);
            let checkout = req.session.checkout;
            return res.render('checkout.ejs', { checkout : checkout, info_user : info_user[0]});
        }
        
    }
    
    
};




const postCartPay = async function (req, res) {
    if (req.session.isLoggedIn === true) {
        let ar_data = req.body.ar_data;
        if (ar_data === undefined){
            res.send({success: false});
        }else{
            
            req.session.checkout = ar_data;
            // Gửi phản hồi về cho client
            res.send({success: true});
        }
    }
    
    
};




const getAccount = async function (req, res){
    if (req.session.isLoggedIn === true) {
        let user = decodeToken(req.session.token);
        let all_bill = await db_AllBillUser(user.User_ID);
        let info_user = await getInfoUsers(user.User_ID);
        return res.render('account.ejs', {all_bill: all_bill, info_user: info_user[0], baseForm: baseForm});
    }
    
    
    
};






const postUpdateAddressAccount = async function (req, res){
    if (req.session.isLoggedIn === true) {

        let user = decodeToken(req.session.token);
        let User_ID  = user.User_ID;
        let Ho_ten = req.body.Ho_ten ;
        let Dien_thoai = req.body.Dien_thoai ;
        let Dia_chi = req.body.Dia_chi ;
        let check_update = await update_InfoUsers(User_ID, Ho_ten, Dien_thoai, Dia_chi);
        if(check_update === true){
            res.send({success: true});
        }else{
            res.send({success: false});
        }
        
    }
    
};



const postUpdatePass = async function (req, res){
    if (req.session.isLoggedIn === true) {
        
        let user = decodeToken(req.session.token);
        let User_ID  = user.User_ID;
        let Old_pass = req.body.oldPassword;
        let Pass_word = req.body.newPassword ;
        let check_pass = await getIdUsers(User_ID);
        const data_pass = await bcrypt.hash(check_pass[0].Pass_word, 10);

        bcrypt.compare(Old_pass, data_pass, function(err, result) {
            if (err) {
                res.send({success: false, message: 'Lỗi server!'});
            } else {
                if(result){
                    update_Pass(User_ID, Pass_word);
                    res.send({success: true});
                }else{
                    res.send({success: false, message: 'Sai mật khẩu!'});
                }
               
            }
        });
    }
    
};




const postOrderDetail = async function (req, res){
    if (req.session.isLoggedIn === true) {
        let Ma_hoa_don  = req.body.Ma_hoa_don;
        let bill_detail = await get_BillDetail(Ma_hoa_don);
        if(bill_detail){
            
            res.send({success: true, bill_detail: bill_detail});
        }else{
            res.send({success: false});
        }

        
    }
    
};







const postUpdateAddressCheckout = async function (req, res){
    if (req.session.isLoggedIn === true) {
        
        let user = decodeToken(req.session.token);
        let User_ID  = user.User_ID;
        let Ho_ten = req.body.Ho_ten ;
        let Dien_thoai = req.body.Dien_thoai ;
        let Dia_chi = req.body.Dia_chi ;
        update_InfoUsers(User_ID, Ho_ten, Dien_thoai, Dia_chi);
        res.redirect('/checkout');
    }
    
};




const postAddBill = async function (req, res){
    if (req.session.isLoggedIn === true) {

        let user = decodeToken(req.session.token);

        let makhachhang  = user.User_ID;
        let Ma_hoa_don = uuidv4();
        let Thoi_gian_xuat_hoa_don = moment().format('YYYY-MM-DD HH:mm:ss');
        let Dia_chi  = req.body.Dia_chi;
        let total_Checkout =  req.body.total_Checkout;
        req.session.checkout.forEach(data => {
            const duplicateIndex = req.session.cart.findIndex(item => item.Ma_san_pham === data.Ma_san_pham);
            // Kiểm tra xem mã sản phẩm của đối tượng trong ar_data có tồn tại trong req.session.cart không
            if (duplicateIndex !== -1) {
                // Nếu tồn tại, xóa đối tượng đó khỏi req.session.cart
                req.session.cart.splice(duplicateIndex, 1);
            }
        });

        let check_bill = await ad_Bill(Ma_hoa_don , makhachhang, Thoi_gian_xuat_hoa_don, Dia_chi, total_Checkout);
        let check_detail_bill = false;
        for (const item of req.session.checkout) {
            check_detail_bill = await ad_DetailBill(Ma_hoa_don , item.Ma_san_pham, item.Ten_san_pham, item.So_luong, item.Gia_san_pham, item.Gia_san_pham * item.So_luong);
        };
        if(check_bill === true && check_detail_bill === true) {
            delete req.session.checkout;
            res.send({success: true});
        }else{
            res.send({success: false});
        }
    }
    
};









const getRating = async function (req, res){
    if (req.session.isLoggedIn === true) {
        let id_rating = req.params.id_rating;
        let RateProduct = await db_RateProduct(id_rating);
        return res.render('rating.ejs',{RateProduct: RateProduct, id_rating: id_rating});
    }
        
    
    
    
    
};




const postAddRate = async function (req, res){
    if (req.session.isLoggedIn === true) {
        let Ma_hoa_don  = req.body.Ma_hoa_don;
        let Ma_san_pham  = req.body.Ma_san_pham;
        let Sao = req.body.rating;
        let Binh_luan = req.body.Mo_ta;
        let check = await add_Rating(Ma_hoa_don, Ma_san_pham, Sao, Binh_luan);
        if(check === true){
            res.redirect('/rating/'+Ma_hoa_don);
        }else{
            res.send({success: false});
        }
        
        
        
    }
    
};

module.exports = {
    getCart, postUpdateCart, postRemoveCart, getCheckout, postCartPay, getAccount, postUpdateAddressCheckout, postAddBill, postUpdateAddressAccount,
    postUpdatePass, postOrderDetail, getRating, postAddRate
};