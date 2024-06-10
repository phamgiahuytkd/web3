const path = require('path');
const fs = require('fs');
const baseForm = require('../migration/view.func');
const {db_AllProductAdmin, db_IdProduct, db_AddProduct, db_UpdateProduct, db_CatalogAdmin, set_Quantity0_Product, 
    ad_Discount, db_AllCodeDiscountProduct, db_DiscountAdmin
} = require('../models/product.model');
const {db_AllBill, get_BillDetail, db_StatisticsCatalog, db_StatisticsMonth, db_Top10Product, db_Overview,
    db_RecentBill, db_AllBillUser, update_StatusBill
} = require('../models/bill.model');
const {getAllInfoUsers, getIdUsers, update_Pass} = require('../models/user.model');
const {decodeToken} = require('../middleware/token');
const bcrypt = require('bcrypt');



//Hàm tạo mã sản phẩm bất kỳ
function generateProductCode(categoryCode) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${categoryCode}${year}${month}${day}${hours}${minutes}${seconds}`;
}






const getAdmin = async function (req, res){
    const overview = await db_Overview();
    const top_product = await db_Top10Product();
    const recent_bill = await db_RecentBill();
    if(top_product && recent_bill){
        return res.render('admin/index.ejs',{top_product: top_product, baseForm: baseForm, recent_bill: recent_bill, overview: overview[0]});
    }else{
        res.send('Lỗi server!');
    }
    

    
};


const getAdminProduct = async function (req, res){
    let product = await db_AllProductAdmin();
    if(product){
        return res.render('admin/product.ejs', {all_Product: product});
    }else{
        res.send('Lỗi server!');
    }
    

    
};


const postAddProduct = async function (req, res){
    const {Ten_san_pham, Don_gia, So_luong, productDescription, productCategory } = req.body;
    Ma_san_pham = generateProductCode(productCategory);
    const filenames = req.files.map(file => file.filename).join(',');
    let product = await db_AddProduct(Ma_san_pham, Ten_san_pham, productDescription, filenames, Don_gia, So_luong, productCategory);
    if(product){
        res.send({ success: true})
    }else{
        res.send({ success: false});
    }
    

    
};



const postQuantity0Product = async function (req, res){
    const Ma_san_pham = req.body.Ma_san_pham;
    let check = set_Quantity0_Product(Ma_san_pham);
    
    if(check){
        res.send({ success: true})
    }else{
        res.send({ success: false});
    }
    

    
};







const getAdminIdProduct = async function (req, res){
    const Ma_san_pham = req.params.productId;
    let product = await db_IdProduct(Ma_san_pham);
    if(product){
        res.send({ success: true, productId: product[0]})
    }else{
        res.send({ success: false});
    }
    

    
};


const postUpdateProduct = async function (req, res) {
    const { Ma_san_pham, Ten_san_pham, Don_gia, So_luong, productDescription, productCategory, old_images } = req.body;
    let filenames;
    if (!req.files || req.files.length === 0) {
        filenames = old_images;
    }else{
        filenames = req.files.map(file => file.filename).join(',');
        const productFolder = path.join(__dirname, '../public/product_img/');

        if(old_images){
            const oldImages = old_images.split(',');
            oldImages.forEach(image => {
                const imagePath = path.join(productFolder, image);
                try {
                    fs.unlinkSync(imagePath); 
                } catch (err) {
                    console.error(`Lỗi khi xóa ảnh ${image}:`, err);
                }
            });    
        }
    }
     
    
   
    // Update product in the database
    let product = await db_UpdateProduct(Ma_san_pham, Ten_san_pham, productDescription, filenames, Don_gia, So_luong, productCategory);

    
    if(product){
        res.send({ success: true });
    }else{
        res.send({ success: false});
    }
    
    
};





const getCatalogAdmin = async function (req, res){
    let id_catalog = req.params.id_catalog;
    let product = await db_CatalogAdmin(id_catalog);
    if(product){
        return res.render('admin/product.ejs', {all_Product: product});
    }else{
        res.send('Lỗi server!');
    }
    

    
};


const getAdminOrder = async function (req, res){
    let all_bill = await db_AllBill();
    if(all_bill){
        return res.render('admin/order.ejs', {all_bill: all_bill, baseForm: baseForm});
    }else{
        res.send('Lỗi server!');
    }
    

    
};




const getAdminOrderDetail = async function (req, res){
    const id_order = req.params.id_order;
    let detail = await get_BillDetail(id_order);
    if(detail){
        res.send({ success: true, detail: detail})
    }else{
        res.send({ success: false});
    }
    

    
};







const getStatistics = async function (req, res){
    const overview = await db_Overview();
    let chart2 = await db_StatisticsCatalog();
    let chart1 = await db_StatisticsMonth();
   
    if(chart2 && chart1){
        return res.render('admin/statistical.ejs', {chart2: chart2, chart1: chart1, baseForm: baseForm, overview: overview[0]});
    }else{
        res.send('Lỗi server!');
    }


    
};





const getCustomer = async function (req, res){
    const all_info_user = await getAllInfoUsers();
    if(all_info_user){
        return res.render('admin/customer.ejs', {all_info_user: all_info_user});
    }else{
        res.send('Lỗi server!');
    }
    

};




const getCustomerID = async function (req, res){
    const customerID = req.params.customerID;
    let bill_customer = await db_AllBillUser(customerID);
    if(bill_customer){
        res.send({ success: true, bill_customer: bill_customer})
    }else{
        res.send({ success: false});
    }
    

    
};








const postStatusBill = async function (req, res){
    const Ma_hoa_don = req.body.Ma_hoa_don;
    const Trang_thai = req.body.Trang_thai;
    let check = await update_StatusBill(Ma_hoa_don, Trang_thai);
    
    if(check){
        res.send({ success: true})
    }else{
        res.send({ success: false});
    }
    

    
};



const getDiscount = async function (req, res){
    let all_Product = await db_AllCodeDiscountProduct();
    let all_Discount = await db_DiscountAdmin();
    if(all_Product){
        return res.render('admin/discount.ejs', {baseForm: baseForm, all_Product: all_Product, all_Discount: all_Discount});
    }else{
        res.send('Lỗi server!');
    }
   



};



function convertDateFormat(dateStr) {
    let [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
}

// Tạo một đối tượng Date và thêm một ngày
function addOneDay(dateStr) {
    let [day, month, year] = dateStr.split('-');
    let date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 1); // Thêm một ngày
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

const postAddDiscount = async function (req, res){
    const {Ma_san_pham , Phan_tram, Thoi_gian} = req.body;
    let dates = Thoi_gian.split(" to ");

// Ngày bắt đầu
    let Ngay_bat_dau = convertDateFormat(dates[0].trim());

// Ngày kết thúc
    let Ngay_ket_thuc = convertDateFormat(addOneDay(dates[1].trim()));
    let check = await ad_Discount(Ma_san_pham, Phan_tram, Ngay_bat_dau, Ngay_ket_thuc);
    if(check){
        res.redirect('/manager/discount');
    }else{
        res.send('Lỗi server!');
    }
    
    

    
};




const getAdminAccount = async function (req, res){
    let user = decodeToken(req.session.token);
    let User_ID  = user.User_ID;
    return res.render('admin/admin_account.ejs', {User_ID: User_ID});
};


const postChangePass = async function (req, res){
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

module.exports = {
    getAdmin,
    getAdminProduct, postAddProduct, getAdminIdProduct, postUpdateProduct, getCatalogAdmin, getAdminOrder,
    getAdminOrderDetail, getStatistics, postQuantity0Product, getCustomer, getCustomerID, getDiscount, postStatusBill, postAddDiscount,
    getAdminAccount, postChangePass
};