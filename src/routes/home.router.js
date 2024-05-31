const express = require('express');
const router = express.Router();

const {getHome, getLogout, getProduct, getIdProduct, postAddProduct, getCatalog, getGroup, getDiscountProdcut} = require('../controllers/home.controller');







router.get('/', getHome);

router.get('/logout', getLogout);

router.get('/product', getProduct);

router.get('/product/:id_product', getIdProduct);

router.post('/add_product', postAddProduct);


router.get('/catalog/:id_catalog', getCatalog);

router.get('/group/:catalog', getGroup);


router.get('/discount', getDiscountProdcut);

module.exports = router;