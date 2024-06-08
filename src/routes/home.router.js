const express = require('express');
const router = express.Router();

const {getHome, getLogout, getProduct, getIdProduct, postAddCart, getCatalog, getGroup, getDiscountProdcut, postSearch} = require('../controllers/home.controller');

const {getCart, postUpdateCart, postRemoveCart, getCheckout, postCartPay, getAccount, postUpdateAddressCheckout, postAddBill, postUpdateAddressAccount, 
    postUpdatePass, postOrderDetail
} = require('../controllers/account.controller');





router.get('/', getHome);

router.get('/logout', getLogout);

router.get('/product', getProduct);

router.get('/product/:id_product', getIdProduct);

router.post('/add_cart', postAddCart);


router.get('/catalog/:id_catalog', getCatalog);

router.get('/group/:catalog', getGroup);


router.get('/discount', getDiscountProdcut);

router.post('/search', postSearch);


router.get('/cart', getCart);


router.post('/cart/update_cart', postUpdateCart);

router.post('/cart/remove_cart', postRemoveCart);

router.get('/checkout', getCheckout);


router.post('/pay', postCartPay);



router.get('/account', getAccount);





router.post('/checkout/update_address', postUpdateAddressCheckout);


router.post('/checkout/add_bill', postAddBill);


router.post('/account/update_address', postUpdateAddressAccount);


router.post('/account/update_pass', postUpdatePass);



router.post('/account/order_detail', postOrderDetail);



module.exports = router;