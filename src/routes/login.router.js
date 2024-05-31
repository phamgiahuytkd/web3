const express = require('express');
const router = express.Router();
const {getLogin, postLogin} = require('../controllers/login.controller');

router.get('/', getLogin);


router.post('/login-user', postLogin);





module.exports = router;