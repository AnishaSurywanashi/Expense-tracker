# 🌌 FinanceFlow — Smart Expense Tracking Reimagined

<div align="center">

![FinanceFlow Banner](https://images.unsplash.com/photo-1611974714024-462cd9312dc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

**A premium, full-stack MERN expense tracker with a stunning 3D UI, real-time analytics, and smart budgeting tools.**

[![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## ✨ Features

### 🧊 Immersive 3D Landing Experience
- **Antigravity Landing Page** — An organic, multi-axis drifting UI that makes financial management feel futuristic.
- **3D Hero Scene** — Real-time rotating dashboard previews, floating AI data badges, and particle-based background animations.
- **Word-Level Fade-Up Animations** & smooth CSS 3D card flip transitions.

### 📊 Powerful Analytics Dashboard
- **Interactive Charts** — Visualize weekly spending patterns with glassmorphism-styled line and pie charts (powered by Chart.js).
- **Real-Time Sync** — Every transaction is instantly processed and reflected across the full dashboard.
- **Category-Based Breakdown** — See exactly where your money goes with color-coded category badges.

### 💰 Smart Budgeting System
- **Budget Cards** — Set monthly spending limits per category and track progress visually.
- **Income vs. Expense Overview** — At-a-glance balance stats on the dashboard.
- **Transaction Management** — Add, view, and delete transactions with a sleek modal interface.

### 🎨 Premium UI / UX
- **Glassmorphism Design** — Dark violet & teal color system with frosted-glass components.
- **Responsive Sidebar Navigation** — Smooth animated sidebar with icon-based routing.
- **Particle Background** — Canvas-based animated particle system for depth and atmosphere.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, React Router v6, Chart.js, Lucide Icons, CSS Variables |
| **Animations** | Framer Motion, CSS 3D Transforms, Canvas API |
| **Backend** | Node.js, Express.js, Morgan |
| **Database** | MongoDB (Local or Atlas), Mongoose ODM |
| **Dev Tools** | Nodemon, Concurrently, dotenv |

---

## 📁 Project Structure

```
expense-tracker-mern/
├── client/                    # React frontend
│   └── src/
│       ├── components/        # Reusable UI components
│       │   ├── AddTransactionModal.js
│       │   ├── BudgetCard.js
│       │   ├── CategoryBadge.js
│       │   ├── Hero3DScene.js
│       │   ├── ParticleBackground.js
│       │   ├── Sidebar.js
│       │   ├── StatCard.js
│       │   ├── TransactionRow.js
│       │   └── ...
│       ├── pages/             # Application pages
│       │   ├── Home.js        # Animated 3D landing page
│       │   ├── Dashboard.js   # Main financial hub
│       │   ├── Transactions.js
│       │   ├── Analytics.js
│       │   └── Budgets.js
│       ├── context/           # Global state (React Context)
│       └── utils/             # Helper functions
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   └── transactions.js        # API logic
├── models/                    # Mongoose schemas
├── routes/
│   ├── transactions.js
│   └── budgets.js
└── server.js                  # Express entry point
```

---

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v14+
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/AnishaSurywanashi/Expense-tracker.git
cd Expense-tracker
```

### 2. Install Dependencies
```bash
# Install root (backend) dependencies
npm install

# Install client (frontend) dependencies
cd client
npm install
cd ..
```

### 3. Environment Setup

Create a `config/config.env` file in the **root directory**:

```env
NODE_ENV=development
PORT=5007
MONGO_URI=mongodb://localhost:27017/financeflow
```

> 💡 Replace `MONGO_URI` with your MongoDB Atlas connection string for production.

### 4. Run the Application
```bash
# Runs both the backend server & React frontend concurrently
npm run dev
```

| Service | URL |
|---|---|
| **Frontend** | `http://localhost:3000` |
| **Backend API** | `http://localhost:5007/api/v1` |

---

## 🔌 API Endpoints

### Transactions
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/transactions` | Get all transactions |
| `POST` | `/api/v1/transactions` | Add a new transaction |
| `DELETE` | `/api/v1/transactions/:id` | Delete a transaction |

### Budgets
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/budgets` | Get all budgets |
| `POST` | `/api/v1/budgets` | Create/update a budget |
| `DELETE` | `/api/v1/budgets/:id` | Delete a budget |

---

## 📸 Screenshots

> **Landing Page** — Antigravity 3D floating UI with particle animations.

> **Dashboard** — Real-time balance summary, recent transactions, and quick actions.

> **Analytics** — Interactive spending charts with weekly breakdowns.

> **Budgets** — Category budget cards with live progress tracking.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

*Built with ❤️ by [Anisha Surywanashi](https://github.com/AnishaSurywanashi)*

</div>
