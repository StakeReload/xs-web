const axios = require('axios');

// NOWPayments API base URL
const API_BASE_URL = 'https://api.nowpayments.io/v1';

/**
 * Create an invoice using NOWPayments API
 * @param {Object} invoiceData - Invoice data
 * @returns {Promise<Object>} - Payment data
 */
const createNowPaymentsInvoice = async (invoiceData) => {
  try {
    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    
    if (!apiKey) {
      throw new Error('NOWPayments API key is not configured');
    }

    const response = await axios.post(`${API_BASE_URL}/invoice`, invoiceData, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error creating NOWPayments invoice:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Check payment status using NOWPayments API
 * @param {string} paymentId - Payment ID
 * @returns {Promise<Object>} - Payment status data
 */
const checkPaymentStatus = async (paymentId) => {
  try {
    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    
    if (!apiKey) {
      throw new Error('NOWPayments API key is not configured');
    }

    const response = await axios.get(`${API_BASE_URL}/payment/${paymentId}`, {
      headers: {
        'x-api-key': apiKey
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error checking payment status:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = {
  createNowPaymentsInvoice,
  checkPaymentStatus
};