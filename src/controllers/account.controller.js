const {getInfoUsers, update_InfoUsers} = require('../models/user.model');
const {ad_Bill, ad_DetailBill} = require('../models/product.model');
const moment = require('moment');


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
            let info_user = await getInfoUsers(res.locals.user);
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
        return res.render('account.ejs');
    }
    
    
    
};




const postUpdateAddress = async function (req, res){
    if (req.session.isLoggedIn === true) {
        
        let User_ID  = res.locals.user;
        let Ho_ten = req.body.Ho_ten ;
        let Dien_thoai = req.body.Dien_thoai ;
        let Dia_chi = req.body.Dia_chi ;
        update_InfoUsers(User_ID, Ho_ten, Dien_thoai, Dia_chi);
        res.redirect('/checkout');
    }
    
};




const postAddBill = async function (req, res){
    if (req.session.isLoggedIn === true) {

        let makhachhang  = res.locals.user;
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

        ad_Bill(Ma_hoa_don , makhachhang, Thoi_gian_xuat_hoa_don, Dia_chi, total_Checkout);
        req.session.checkout.forEach(item => {
            ad_DetailBill(Ma_hoa_don , item.Ma_san_pham, item.Ten_san_pham, item.So_luong, item.Gia_san_pham, item.Gia_san_pham * item.So_luong);
        });
        res.redirect('/cart');
    }
    
};



module.exports = {
    getCart, postUpdateCart, postRemoveCart, getCheckout, postCartPay, getAccount, postUpdateAddress, postAddBill
};