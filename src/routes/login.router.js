const express = require('express');
const router = express.Router();
const {getLogin, postLogin, postSign} = require('../controllers/login.controller');

router.get('/', getLogin);


router.post('/login-user', postLogin);

router.post('/sign-user', postSign);





module.exports = router;