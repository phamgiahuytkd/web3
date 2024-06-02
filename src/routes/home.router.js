const express = require('express');
const router = express.Router();

const {getHome, getLogout, getProduct, getIdProduct, postAddCart, getCatalog, getGroup, getDiscountProdcut, postSearch} = require('../controllers/home.controller');

const {getCart} = require('../controllers/account.controller');





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



module.exports = router;