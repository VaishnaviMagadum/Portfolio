# 🚀 AI Dashboard Portfolio | Vaishnavi Magadum

A high-end, futuristic developer portfolio designed as an interactive AI Dashboard. Built with the MERN stack, this project features glassmorphism, spatial UI elements, and a dynamic GitHub repository showcase.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FVaishnaviMagadum%2FPortfolio&root-directory=client)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/VaishnaviMagadum/Portfolio)

🚀 **Live Portfolio**: [https://vaishnavi-ai-dashboard.vercel.app](https://vaishnavi-ai-dashboard.vercel.app)

![Portfolio Preview](client/public/profile.png) 

## 🛠️ Tech Stack

- **Frontend**: React.js, Vanilla CSS, Lucide Icons, Glassmorphism
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, MySQL
- **Design**: "Vivek-style" Bento Grid, Minimalist Spatial UI, Scanline Effects

---

## 🌐 Production Deployment Guide

I have updated the code to be production-ready! To make your portfolio live, follow these steps:

### 1. Deploy the Backend (e.g., on Render or Railway)
Since Vercel is best for the frontend, I recommend hosting the `server` folder on **Render**.
1. Create a new "Web Service" on [Render](https://render.com/).
2. Point it to your GitHub repo.
3. Set the **Root Directory** to `server`.
4. Add the following **Environment Variables** in the Render dashboard:
   - `MONGODB_URI`: (Your MongoDB Atlas connection string)
   - `GEMINI_API_KEY`: (Your Google Gemini API key)
   - `JWT_SECRET`: (A random secure string)
   - `FRONTEND_URL`: `https://your-portfolio-url.vercel.app`

### 2. Deploy the Frontend (on Vercel)
1. Import your repo into [Vercel](https://vercel.com/).
2. Set the **Root Directory** to `client`.
3. Add this **Environment Variable** in the Vercel dashboard:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com` (The URL Render gives you)

---

## ✨ Key Features

- **Interactive Bento Grid**: A premium, motion-heavy skills and profile matrix.
- **GitHub Integration**: Automatically fetches and displays live project data from GitHub.
- **AI Aesthetic**: Futuristic scanlines, neon glows, and a "System Dashboard" theme.
- **Typewriter Hero**: Dynamic core-identity animation.
- **Responsive Design**: Full glassmorphism experience across all device sizes.

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v16+)
- NPM

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/VaishnaviMagadum/Portfolio.git
   ```

2. **Install All Dependencies**
   ```bash
   npm run install-all
   ```

3. **Run the Application**
   - **Full Stack**: `npm run dev` (Runs concurrently)
   - **Frontend**: `http://localhost:5173`
   - **Backend**: `http://localhost:5000`

## 👤 Author

**Vaishnavi Magadum**
- LinkedIn: [Vaishnavi Magadum](https://www.linkedin.com/in/vaishnavi-magadum-60a08633a)
- GitHub: [@VaishnaviMagadum](https://github.com/VaishnaviMagadum)

---
*Optimized for Production by Antigravity AI*
