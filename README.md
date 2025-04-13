# StakeReload

StakeReload is a subscription-based web application that allows users to claim casino reloads and social drops quickly and easily with a pay-as-you-go model.




## Features

- **Blazing-fast processing**: Automate reload claims in under 2 seconds.
- **Real-time updates and monitoring**: Stay informed with real-time updates.
- **Easy subscription model**: Pay as you go with our flexible subscription plans.
- **Trusted by thousands**: Join a community of players who trust StakeReloadXS for their reload needs.
- **Professional team**: Built by a team of experienced Web3 developers.

## Getting Started

# StakeReload Payment Backend

This is the payment processing backend for StakeReload website. It handles cryptocurrency payments via NOWPayments and sends notifications to Telegram when payments are received.

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

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/StakeReload/xs-web
    ```

2. Navigate to the project directory:
    ```bash
    cd stakereload
    ```

3. Open [index.html](http://_vscodecontentref_/1) in your web browser to view the site.

## Usage

1. Visit [StakeReload](https://stakereload.com).
2. Sign up for an account.
3. Choose a subscription plan that suits your needs.
4. Start claiming your casino reloads and social drops effortlessly.

## Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add your commit message"
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request on GitHub.

## To-do
1. Add Pages(some are partially completed): 
- Home
- Affiliates
- Team
- Privacy, Terms, Refunds
- Merch/Services
- Login with telegram widget


## License

This project is licensed under the MIT License. See the [LICENSE](http://_vscodecontentref_/2) file for details.

## Contact

For any inquiries or support, please contact us at [support@stakereloadxs.com](mailto:support@stakereloadxs.com).

## Social Media

Follow us on social media for the latest updates:

- Twitter: [@reloadedxs](https://twitter.com/reloadedxs)
- GitHub 1: [StakeReloadXS](https://github.com/stakereloadxs)
- GitHub 2: [StakeReload](https://github.com/stakereload)
- Discord: [ReloadedXS](https://discord.gg/KsFPXT5QDW)
- Telegram: [StakeReloadXS](https://t.me/StakeReloadXS)
- LinkedIn: [StakeReloadXS](https://www.linkedin.com/company/stakereloadxs/)

---
@StakeReloadXS @StakeReload

© 2025 StakeReload™. All Rights Reserved.
# StakeReload.com xs-web
