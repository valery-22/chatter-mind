const express = require('express');
const router = express.Router();
const { handleUserMessage } = require('../controllers/chatController');

router.post('/message', handleUserMessage);

module.exports = router;