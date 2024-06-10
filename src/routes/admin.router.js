const express = require('express');
const router = express.Router();
const {getAdmin, getAdminProduct, postAddProduct, getAdminIdProduct, postUpdateProduct,
    getCatalogAdmin, getAdminOrder, getAdminOrderDetail, getStatistics, postQuantity0Product, 
    getCustomer, getCustomerID, getDiscount, postStatusBill, postAddDiscount, getAdminAccount, postChangePass
} = require('../controllers/admin.controller');

//Upload ảnh
const multer = require('multer');
const path = require('path');
const fs = require('fs');





// Hàm kiểm tra và đổi tên file nếu trùng
function generateUniqueFilename(dir, originalname) {
    let filename = originalname;
    let ext = path.extname(originalname);
    let base = path.basename(originalname, ext);
    let counter = 1;

    while (fs.existsSync(path.join(dir, filename))) {
        filename = `${base}(${counter})${ext}`;
        counter++;
    }

    return filename;
}

// Cấu hình Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '../public/product_img');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const dir = path.join(__dirname, '../public/product_img');
        const uniqueFilename = generateUniqueFilename(dir, file.originalname);
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage: storage });





//Hướng router


router.get('/', getAdmin);


router.get('/product', getAdminProduct);


router.post('/product/add_product', upload.array('productImages[]', 10), postAddProduct);


router.get('/product/:productId', getAdminIdProduct);


router.post('/product/update_product', upload.array('productImages[]', 10), postUpdateProduct);

router.post('/product/set_quantity0_product', postQuantity0Product);

router.get('/catalog/:id_catalog', getCatalogAdmin);


router.get('/order', getAdminOrder);

router.get('/order/:id_order', getAdminOrderDetail);

router.post('/order/update_status_bill', postStatusBill);



router.get('/statistics', getStatistics);


router.get('/customer', getCustomer);

router.get('/customer/:customerID', getCustomerID);

router.get('/discount', getDiscount);


router.post('/discount/ad_discount', postAddDiscount);

router.get('/admin_account', getAdminAccount);

router.post('/admin_acount/change_pass', postChangePass);


module.exports = router;