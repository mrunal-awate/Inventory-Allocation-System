# Inventory Allocation System

A robust inventory management system designed to handle concurrent order processing with strict stock validation.

## 🚀 Tech Stack

*   **Backend**: Node.js, Express.js, Sequelize ORM
*   **Database**: PostgreSQL
*   **Web Frontend**: React.js, Vite
*   **Mobile Frontend**: Flutter (Structure only)

## 📂 Project Structure

```
/backend          # Node.js Express API
/frontend-web     # React Web App
/frontend-mobile  # Flutter Mobile App
```

## ✨ Features

*   **Concurrency Control**: Uses database transactions and pessimistic locking to prevent race conditions during simultaneous orders.
*   **Stock Validation**: strict checks to ensure stock never drops below zero.
*   **Unified API**: Single `POST /order` endpoint used by all clients.

## 🛠️ Setup & Installation

### Prerequisites
*   Node.js (v16+)
*   PostgreSQL

### 1. Database Setup
Create a PostgreSQL database (e.g., `inventory_db`).

### 2. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment:
    *   Open `.env` file.
    *   Update `DB_USER`, `DB_PASSWORD`, `DB_NAME` with your qualifications.
4.  Start the server:
    ```bash
    npm start
    ```
    *Server runs on port 3000.*

### 3. Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd frontend-web
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

## 📡 API Reference

### Place Order
**POST** `/order`

**Body:**
```json
{
  "productId": 1,
  "quantity": 5
}
```

**Response:**
```json
{
  "message": "Order created successfully",
  "order": {
    "id": 12,
    "productId": 1,
    "quantity": 5,
    "status": "confirmed"
  }
}
```

## 🧪 Testing Concurrency
A test script is included to simulate concurrent requests.
```bash
node backend/test-concurrency.js
```
