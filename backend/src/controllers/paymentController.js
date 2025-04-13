const axios = require('axios');
const crypto = require('crypto');
const { sendTelegramNotification } = require('../services/telegramService');
const { createNowPaymentsInvoice } = require('../services/nowPaymentsService');

// Price mapping for different packages
const PRICE_MAP = {
  'new-xsid': 5.00,
  'xs-credits-50k': 50.00,
  'xs-credits-100k': 100.00,
  'xs-credits-200k': 200.00,
  'xs-credits-1m': 1000.00
};

// Package descriptions
const PACKAGE_DESCRIPTIONS = {
  'new-xsid': 'New XSID setup with 5000 XSID Credits',
  'xs-credits-50k': '50,000 XS Credits with 5% Additional Boost',
  'xs-credits-100k': '100,000 XS Credits with 10% Additional Boost',
  'xs-credits-200k': '200,000 XS Credits with 15% Additional Boost',
  'xs-credits-1m': '1,000,000 XS Credits with 20% Additional Boost'
};

/**
 * Create a new payment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createPayment = async (req, res) => {
  try {
    const { packageId, telegramUsername, customerId } = req.body;
  
      // Validate required fields
      if (!packageId || !telegramUsername) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: packageId and telegramUsername are required'
        });
      }

    // Validate package ID
    if (!PRICE_MAP[packageId]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid package ID'
      });
    }

    const amount = PRICE_MAP[packageId];
    const description = PACKAGE_DESCRIPTIONS[packageId];

    // Create payment invoice using NOWPayments
    const paymentData = await createNowPaymentsInvoice({
      price_amount: amount,
      price_currency: 'USD',
      order_id: `${packageId}-${Date.now()}`,
      order_description: `${description} - Telegram: ${telegramUsername}`,
      ipn_callback_url: `${req.protocol}://${req.get('host')}/api/payments/ipn-callback`,
      success_url: `${req.protocol}://${req.get('host')}/payment-success.html`,
      cancel_url: `${req.protocol}://${req.get('host')}/payment-cancel.html`
      // Removed payer_telegram parameter as it's not supported by the API
    });

    // Return payment data to client
    return res.status(200).json({
      success: true,
      data: paymentData
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create payment',
      error: error.message
    });
  }
};

/**
 * Handle IPN callback from NOWPayments
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const handleIpnCallback = async (req, res) => {
  try {
    // Verify the authenticity of the IPN request
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;
    const requestData = req.body;
    
    // Verify HMAC signature if provided
    const hmacHeader = req.headers['x-nowpayments-sig'];
    if (hmacHeader && ipnSecret) {
      const hmac = crypto.createHmac('sha512', ipnSecret);
      const digest = hmac.update(JSON.stringify(requestData)).digest('hex');
      
      if (digest !== hmacHeader) {
        console.error('Invalid HMAC signature');
        return res.status(401).json({ message: 'Invalid signature' });
      }
    }

    // Process the payment notification
    const { payment_status, order_id, pay_amount, pay_currency, order_description } = requestData;

    // Check if payment is completed
    if (payment_status === 'finished') {
      // Extract package ID from order_id
      const packageId = order_id.split('-')[0];
      const packageName = PACKAGE_DESCRIPTIONS[packageId] || 'Unknown package';
      
      // Extract Telegram username from order description if available
      let telegramUsername = "Not provided";
      if (order_description && order_description.includes("Telegram:")) {
        telegramUsername = order_description.split("Telegram:")[1].trim();
      }
      
      // Send notification to Telegram
      await sendTelegramNotification(`
🎉 New Payment Received!
Package: ${packageName}
Amount: ${pay_amount} ${pay_currency}
Order ID: ${order_id}
Telegram: ${telegramUsername}
Status: Completed
      `);
      
      // Here you would typically update your database to mark the order as paid
      // and perform any necessary actions (e.g., activating the user's package)
    }

    // Acknowledge receipt of the IPN
    return res.status(200).json({ message: 'IPN received successfully' });
  } catch (error) {
    console.error('Error processing IPN callback:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process IPN callback',
      error: error.message
    });
  }
};

module.exports = {
  createPayment,
  handleIpnCallback
};