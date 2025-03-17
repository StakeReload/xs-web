const express = require('express');
const router = express.Router();
const { createPayment, handleIpnCallback } = require('../controllers/paymentController');

// Route to create a new payment
router.post('/create', createPayment);

// IPN (Instant Payment Notification) callback route for NOWPayments
router.post('/ipn-callback', handleIpnCallback);

module.exports = router;