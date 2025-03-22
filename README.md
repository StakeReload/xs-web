# StakeReloadXS Payment Backend

This is the payment processing backend for StakeReloadXS website. It handles cryptocurrency payments via NOWPayments and sends notifications to Telegram when payments are received.

## Features

- Express.js backend server
- NOWPayments integration for cryptocurrency payments
- Telegram notifications for successful payments
- IPN (Instant Payment Notification) callback handling

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- NPM (v6 or higher)
- NOWPayments account and API key
- Telegram bot token and chat ID

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required values:
     - `PORT`: Server port (default: 3000)
     - `NOWPAYMENTS_API_KEY`: Your NOWPayments API key
     - `NOWPAYMENTS_IPN_SECRET`: Your NOWPayments IPN secret
     - `TELEGRAM_BOT_TOKEN`: Your Telegram bot token
     - `TELEGRAM_CHAT_ID`: Your Telegram chat ID for notifications

### NOWPayments Setup

1. Create an account at [NOWPayments](https://nowpayments.io/)
2. Generate an API key in your account dashboard
3. Set up IPN (Instant Payment Notification) in your NOWPayments dashboard:
   - IPN callback URL: `https://your-domain.com/api/payments/ipn-callback`
   - Generate an IPN secret key

### Telegram Bot Setup

1. Create a new Telegram bot using [BotFather](https://t.me/botfather)
2. Get the bot token from BotFather
3. Create a group and add your bot to it
4. Get the chat ID (you can use the `@get_id_bot` or send a message to the group and check the chat ID via the Telegram API)

## Running the Server

### Development Mode

```
npm run dev
```

### Production Mode

```
npm start
```

## API Endpoints

### Create Payment

- **URL**: `/api/payments/create`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "packageId": "xs-credits-50k",
    "telegramUsername": "@username"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "invoice_url": "https://nowpayments.io/invoice/...",
      "invoice_id": "...",
      "order_id": "..."
    }
  }
  ```

### IPN Callback

- **URL**: `/api/payments/ipn-callback`
- **Method**: `POST`
- **Headers**:
  - `x-nowpayments-sig`: HMAC signature for verification
- **Body**: NOWPayments payment data

## Package IDs

- `new-xsid`: New XSID setup ($5.00)
- `xs-credits-50k`: 50,000 XS Credits ($50.00)
- `xs-credits-100k`: 100,000 XS Credits ($100.00)
- `xs-credits-200k`: 200,000 XS Credits ($200.00)
- `xs-credits-1m`: 1,000,000 XS Credits ($1,000.00)