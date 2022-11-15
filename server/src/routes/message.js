const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController')

router.post('/add-message', messageController.addMessage)
router.post('/get-all-message', messageController.getAllMessage)

module.exports = router;