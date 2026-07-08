# Lapify 💻

Lapify is a comprehensive full-stack application that helps users find, compare, and predict the prices of laptops. It integrates a robust MERN stack backend with a FastAPI-powered Machine Learning microservice to deliver intelligent laptop recommendations and accurate price predictions.

## 🚀 Features

- **Price Prediction:** Utilizes a trained machine learning model to estimate laptop prices based on hardware specifications (RAM, CPU, GPU, Storage, Display).
- **Intelligent Recommendations:** Suggests laptops to users based on their budget and preferred specifications.
- **Laptop Comparison:** Side-by-side spec comparisons to help users make informed purchasing decisions.
- **User Authentication:** Secure login and registration system with protected routes.
- **Wishlist & History:** Users can save their favorite laptops and view their past prediction/comparison history.
- **Responsive UI:** Built with React and Tailwind CSS for a seamless experience across all devices.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- React Router (Data API)
- Redux Toolkit & Redux Persist (State Management)
- Tailwind CSS

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcrypt (Authentication)
- Cloudinary & Multer (Image processing)

**Machine Learning / Data Science:**
- Python & FastAPI
- Pandas & Scikit-learn (Data processing and model training)
- XGBoost (Regression Modeling)

## ⚙️ Installation & Setup

This project requires running three separate servers: the frontend, the backend, and the ML FastAPI server.

### 1. Clone the Repository
```bash
git clone [https://github.com/Saurabhanand12/lapify.git](https://github.com/Saurabhanand12/lapify.git)
cd lapify
