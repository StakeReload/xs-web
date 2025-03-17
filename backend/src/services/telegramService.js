const { Telegraf } = require('telegraf');

// Initialize Telegram bot
let bot = null;

/**
 * Initialize the Telegram bot
 * @returns {Object} - Telegram bot instance
 */
const initializeBot = () => {
  if (bot) return bot;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!botToken) {
    console.warn('Telegram bot token is not configured. Notifications will be disabled.');
    return null;
  }

  try {
    bot = new Telegraf(botToken);
    console.log('Telegram bot initialized successfully');
    return bot;
  } catch (error) {
    console.error('Failed to initialize Telegram bot:', error);
    return null;
  }
};

/**
 * Send a notification message to the configured Telegram chat
 * @param {string} message - Message to send
 * @returns {Promise<boolean>} - Success status
 */
const sendTelegramNotification = async (message) => {
  try {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!chatId) {
      console.warn('Telegram chat ID is not configured. Notification not sent.');
      return false;
    }

    // Initialize bot if not already initialized
    const botInstance = initializeBot();
    
    if (!botInstance) {
      console.warn('Telegram bot is not initialized. Notification not sent.');
      return false;
    }

    // Send message to the specified chat
    await botInstance.telegram.sendMessage(chatId, message);
    console.log('Telegram notification sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    return false;
  }
};

module.exports = {
  initializeBot,
  sendTelegramNotification
};