# Kindergarten SaaS - Deployment Guide

## 📦 Separate Frontend & Backend Deployment

This project is structured for independent deployment:
- **Frontend** → Vercel
- **Backend** → Render (or any Node.js host)

---

## 🚀 Frontend Deployment (Vercel)

### 1. Navigate to frontend folder
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Update API URL
Edit `frontend/src/lib/queryClient.ts` and set your backend URL:
```typescript
const API_URL = "https://your-backend-url.onrender.com";
```

### 4. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel dashboard.

**Build Settings**:
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

## 🔧 Backend Deployment (Render)

### 1. Navigate to backend folder
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `render.yaml` (optional)
```yaml
services:
  - type: web
    name: kindergarten-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: PORT
        value: 10000
```

### 4. Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

---

## 🔗 Connecting Frontend to Backend

After deploying backend, update frontend API URL:

**File**: `frontend/src/hooks/use-auth.ts` (and all other hooks)

```typescript
const API_URL = "https://kindergarten-api.onrender.com"; // Your Render URL
```

Then redeploy frontend.

---

## 📝 Environment Variables

### Backend (Render)
- `PORT`: Auto-set by Render (usually 10000)
- `NODE_ENV`: production

### Frontend (Vercel)
- `VITE_API_URL`: Your backend URL (optional, can hardcode)

---

## ✅ Testing Deployment

1. **Backend Health Check**:
   ```
   https://your-backend.onrender.com/
   ```
   Should return: `{"message":"Kindergarten API Server","status":"running"}`

2. **Frontend**:
   ```
   https://your-app.vercel.app
   ```
   Should load login page

3. **Test Login**:
   - Username: `admin`
   - Password: `123`

---

## 🐛 Troubleshooting

### CORS Errors
Make sure backend has CORS enabled (already included in `index.ts`):
```typescript
import cors from "cors";
app.use(cors());
```

### API Not Found
Check that frontend is calling correct backend URL.

### Build Failures
- Frontend: Ensure all dependencies in `package.json`
- Backend: Check Node version (18+)

---

## 📁 Folder Structure

```
Kindergarten-Canvas/
├── frontend/          # React app (deploy to Vercel)
│   ├── src/
│   ├── package.json
│   └── vercel.json
├── backend/           # Express API (deploy to Render)
│   ├── index.ts
│   ├── shared/
│   └── package.json
├── design-tokens.json
├── style-guide.md
├── demo-script.md
└── README.md
```

---

## 🎯 Quick Deploy Commands

**Frontend**:
```bash
cd frontend
npm install
npm run build
vercel --prod
```

**Backend**:
```bash
cd backend
npm install
# Push to GitHub, then deploy via Render dashboard
```

---

**Good luck with your deployment!** 🚀
