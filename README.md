# MotoVerse 🏍️

A full-stack two-wheeler company website inspired by Hero MotoCorp's layout and structure.

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React.js (Vite), React Router, Axios |
| Styling    | Tailwind CSS                      |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB, Mongoose                 |

## Project Structure

```
motoverse/
├── frontend/          # React Vite application
│   ├── src/
│   │   ├── api/       # Axios instance & API calls
│   │   ├── assets/    # Static assets (images, etc.)
│   │   ├── components/# Reusable UI components
│   │   └── pages/     # Route-level page components
│   └── ...
├── backend/           # Express.js API server
│   ├── config/        # Database & app configuration
│   ├── controllers/   # Route handler logic
│   ├── middleware/     # Custom middleware
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API route definitions
│   └── server.js      # Entry point
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The API server will start on **http://localhost:5001**.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The React dev server will start on **http://localhost:5173**.

## API Endpoints

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | `/api/health`         | Health check          |
| GET    | `/api/products`       | List all products     |
| GET    | `/api/products/:id`   | Get product by ID     |
| POST   | `/api/products`       | Create a product      |
| PUT    | `/api/products/:id`   | Update a product      |
| DELETE | `/api/products/:id`   | Delete a product      |
| GET    | `/api/dealers`        | List all dealers      |
| GET    | `/api/dealers/:id`    | Get dealer by ID      |
| GET    | `/api/dealers/city/:city` | Get dealers by city |
| POST   | `/api/dealers`        | Create a dealer       |
| GET    | `/api/news`           | List all news         |
| GET    | `/api/news/:id`       | Get news by ID        |
| POST   | `/api/news`           | Create news           |
| GET    | `/api/offers`         | List all offers       |
| GET    | `/api/offers/active`  | Get active offers     |
| POST   | `/api/offers`         | Create an offer       |

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/motoverse
NODE_ENV=development
```

## License

MIT
