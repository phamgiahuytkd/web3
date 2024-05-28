const express = require('express');
const router = express.Router();
const {getHome, getA, postCreateUser, getCreateUser, getTable, getUpdateUser} = require('../controllers/homeController');

// router.Method('route', hander)



router.get('/', getHome);
  
router.get('/a', getA);

router.get('/create', getCreateUser);

router.get('/table', getTable);

router.get('/update/:id', getUpdateUser);

router.post('/create-user', postCreateUser);




module.exports = router;