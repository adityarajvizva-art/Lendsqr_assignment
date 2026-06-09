# Demo Credit Wallet API

A Node.js + TypeScript wallet API for user onboarding, wallet funding, withdrawals, and wallet-to-wallet transfers.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MySQL
- Knex.js
- Zod
- Jest
- Supertest

## Features

- User registration
- Automatic wallet creation
- Karma blacklist validation using Lendsqr Adjutor
- Fund wallet
- Withdraw from wallet
- Transfer funds between users
- Transaction history records
- Fake bearer-token authentication
- Request validation
- Centralized error handling
- Database transaction scoping for money operations

## Project Structure

```text
src
├── config
├── database
│   └── migrations
├── modules
│   ├── karma
│   ├── transactions
│   ├── users
│   └── wallets
├── shared
│   ├── errors
│   └── middleware
├── app.ts
└── server.ts
```

## Database Design

```text
User 1 --- 1 Wallet
Wallet 1 --- many Transactions
```

### Tables

- `users`
- `wallets`
- `transactions`

## Environment Variables

Create a `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=demo_credit_wallet
KARMA_BASE_URL=https://adjutor.lendsqr.com/v2
KARMA_API_KEY=your_adjutor_api_key
```

## Setup

```bash
npm install
```

Create database:

```sql
CREATE DATABASE demo_credit_wallet;
```

Run migrations:

```bash
npm run migrate
```

Start development server:

```bash
npm run dev
```

Health check:

```http
GET /health
```

## Authentication

Wallet endpoints require:

```http
Authorization: Bearer demo-token
```

## API Endpoints

### Create User

```http
POST /api/v1/users
```

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "08012345678"
}
```

### Fund Wallet

```http
POST /api/v1/wallets/fund
```

```json
{
  "userId": "user-uuid",
  "amount": 1000
}
```

### Withdraw

```http
POST /api/v1/wallets/withdraw
```

```json
{
  "userId": "user-uuid",
  "amount": 300
}
```

### Transfer

```http
POST /api/v1/wallets/transfer
```

```json
{
  "senderUserId": "sender-user-uuid",
  "recipientUserId": "recipient-user-uuid",
  "amount": 200
}
```

## Testing

```bash
npm test
```

## Notes

The Karma API integration is implemented. Access depends on using a valid Adjutor API key with permission for the Karma verification endpoint.

Money operations are wrapped in database transactions to prevent partial updates.
## ER Diagram

```mermaid
erDiagram

    USERS ||--|| WALLETS : owns
    WALLETS ||--o TRANSACTIONS : records

    USERS {
        uuid id
        string email
        string phone
    }

    WALLETS {
        uuid id
        uuid user_id
        decimal balance
    }

    TRANSACTIONS {
        uuid id
        uuid wallet_id
        string type
        decimal amount
        string reference
    }
```

## Karma Validation

The Adjutor Karma integration has been implemented through a dedicated service layer.

During development, the provided API credentials returned an authorization error for the Karma verification endpoint. The integration code remains in place and can be activated by supplying valid credentials with access to the Karma API.

## Assumptions

- Each user owns exactly one wallet.
- Wallet balances cannot be negative.
- Authentication is mocked using a static bearer token.
- Transfers generate two transaction records:
  - TRANSFER_OUT
  - TRANSFER_IN
- Wallet operations are wrapped in database transactions to maintain consistency.
