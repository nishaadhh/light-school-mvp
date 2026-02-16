# Light International School - Management System

## 📁 Project Structure

This project is organized into two main folders for independent deployment:

```
Kindergarten-Canvas/
├── frontend/          # React application (Deploy to Vercel)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── vercel.json
│
├── backend/           # Express API (Deploy to Render)
│   ├── index.ts
│   ├── shared/
│   └── package.json
│
├── README.md
├── DEPLOYMENT.md
├── design-tokens.json
├── style-guide.md
└── demo-script.md
```

---

## 🚀 Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access at: `http://localhost:5173`

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
API runs at: `http://localhost:5000`

---

## 🎯 Features

- ✅ **Admin Dashboard** - Revenue, attendance, student management
- ✅ **Teacher Portal** - Daily attendance marking with bulk actions
- ✅ **Parent Portal** - Child profile, fees, notices (mobile-first)
- ✅ **Glassmorphism UI** - Premium design with smooth animations
- ✅ **Role-Based Access** - Separate views for admin/teacher/parent

---

## 🔐 Login Credentials

| Role    | Username  | Password |
|---------|-----------|----------|
| Admin   | `admin`   | `123`    |
| Teacher | `teacher` | `123`    |
| Parent  | `parent`  | `123`    |

---

## 📦 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed deployment instructions:
- Frontend → Vercel
- Backend → Render

---

## 🎨 Design System

- **Colors**: Blue (#3b82f6), Purple (#a855f7), Pink (#ec4899)
- **Typography**: Inter font family
- **UI Pattern**: Glassmorphism with gradient backgrounds
- **Animations**: Framer Motion for smooth transitions

See **[style-guide.md](./style-guide.md)** for complete design documentation.

---

## 📖 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guide for Vercel & Render
- **[style-guide.md](./style-guide.md)** - UI/UX design guidelines
- **[demo-script.md](./demo-script.md)** - Client presentation script
- **[design-tokens.json](./design-tokens.json)** - Design system tokens

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- TailwindCSS + Framer Motion
- TanStack Query
- Wouter (routing)

**Backend:**
- Express + TypeScript
- In-memory storage (mock data)
- CORS enabled

---

## 📱 Mobile-First Design

The parent portal is optimized for mobile devices with:
- Touch-friendly buttons (44x44px minimum)
- Bottom navigation
- Responsive layouts
- Glassmorphism cards

---

## 📄 License

MIT License - © 2026 Light International School

---

**Built with ❤️ for Light International School** 🇮🇳
