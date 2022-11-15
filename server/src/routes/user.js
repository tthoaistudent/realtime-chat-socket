const express = require('express');
const router = express();

const userController = require('../controllers/userController');

router.patch('/set-avatar/:id', userController.setAvatar)
router.get('/get-all-user/:id', userController.getAllUser)

module.exports = router;