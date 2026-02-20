# Smart Compliment AI - AI-Powered Caption Generator

A full-stack web application that generates creative captions for images using Google Gemini AI with multiple style options.

## Features

- **Image Upload** - Drag & drop or click to upload images
- **Style Mixer** - 6 pre-built styles + custom style creator
- **AI Caption Generation** - Powered by Google Gemini 2.5 Flash
- **Edit & Regenerate** - Edit captions or regenerate individual ones
- **Analytics Dashboard** - Track usage statistics and style popularity
- **MongoDB Storage** - Persistent data storage with automatic retrieval
- **Export Options** - Export as text, JSON, or share to Twitter
- **Social Media Optimization** - Character counts for Twitter/Instagram
- **Batch Upload** - Upload multiple images at once

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Google Gemini API Key** - [Get free key](https://aistudio.google.com/app/apikey)
- **MongoDB Atlas Account** (optional but recommended) - [Sign up free](https://www.mongodb.com/cloud/atlas/register)

---

## Installation

### Option 1: Clone from Git

```bash
git clone https://github.com/RakeshYemineni1/Compliment-Ai.git
cd Compliment-Ai
```

### Option 2: Extract from ZIP

1. Extract the ZIP file to your desired location
2. Open terminal/command prompt in the extracted folder

---

## Setup Instructions

### Step 1: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Configure environment variables (see below)
# Edit the .env file

# Start backend server
npm start
```

**Backend .env Configuration:**

Open `backend/.env` and update:

```env
# MongoDB Connection (see MongoDB Setup section below)
MONGO_URI=your_mongodb_connection_string

# Admin Secret Key (change this!)
ADMIN_SECRET_KEY=your_secret_key_here

# Server Port
PORT=5000
```

### Step 2: Frontend Setup

Open a **NEW terminal** (keep backend running):

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

---

## API Key Setup

### Get Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIzaSy...`)

### Add API Key to Application

**Method 1: Direct Edit (Quick)**

Open `backend/services/aiService.js` and replace:

```javascript
const API_KEYS = {
  gemini: "YOUR_GEMINI_KEY_HERE",  // Replace this
  openai: "YOUR_OPENAI_KEY_HERE"
};
```

**Method 2: Admin Panel (Recommended for production)**

1. Start the application
2. Click "Admin" button (top-right)
3. Enter admin secret key from `.env`
4. Add your Gemini API key
5. Save

---

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

**Step 1: Create Account**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for free
3. Create a new project

**Step 2: Create Cluster**
1. Click "Build a Database"
2. Choose **FREE M0 Cluster**
3. Select your region
4. Click "Create"

**Step 3: Create Database User**
1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password (remember these!)
5. Set role to "Read and write to any database"
6. Click "Add User"

**Step 4: Configure Network Access**
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

**Step 5: Get Connection String**
1. Go back to "Database" → Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Add database name: `/compliment_ai` before the `?`

**Example:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/compliment_ai?retryWrites=true&w=majority
```

**Step 6: Update .env**

Paste the connection string in `backend/.env`:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/compliment_ai?retryWrites=true&w=majority
```

**Important:** If your password contains special characters like `@`, `#`, `$`, encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`

### Option 2: Local MongoDB (Advanced)

1. Install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use connection string:
```env
MONGO_URI=mongodb://localhost:27017/compliment_ai
```

---

## Troubleshooting

### MongoDB Connection Issues

#### Error: "querySrv ECONNREFUSED"

**Cause:** DNS lookup failure or network blocking MongoDB

**Solutions:**

**1. Check Network Access in MongoDB Atlas**
- Ensure IP `0.0.0.0/0` is added in Network Access

**2. Try Different Network**
- Use mobile hotspot instead of WiFi
- Disable VPN if active

**3. Change DNS Settings (Windows)**

```bash
# Open Command Prompt as Administrator

# Set Google DNS
netsh interface ip set dns "Wi-Fi" static 8.8.8.8
netsh interface ip add dns "Wi-Fi" 8.8.4.4 index=2

# Flush DNS cache
ipscmd /flushdns
```

**4. Change DNS Settings (Manual)**

Windows:
1. Open Control Panel → Network and Internet → Network Connections
2. Right-click your connection → Properties
3. Select "Internet Protocol Version 4 (TCP/IPv4)" → Properties
4. Choose "Use the following DNS server addresses"
5. Preferred DNS: `8.8.8.8`
6. Alternate DNS: `8.8.4.4`
7. Click OK

**5. Disable Firewall Temporarily**

```bash
# Windows (Run as Administrator)
netsh advfirewall set allprofiles state off

# Test connection, then turn back on
netsh advfirewall set allprofiles state on
```

**6. Use In-Memory Storage (Temporary)**

If MongoDB still fails, the app will automatically use in-memory storage. Data will work but won't persist after restart.

#### Error: "Authentication failed"

- Check username and password in connection string
- Ensure password special characters are URL-encoded
- Verify user has correct permissions in MongoDB Atlas

#### Error: "Network timeout"

- Check internet connection
- Verify MongoDB Atlas cluster is running
- Try increasing timeout in `backend/config/db.js`:
```javascript
serverSelectionTimeoutMS: 10000  // Increase to 10 seconds
```

### Port Already in Use

**Backend (Port 5000):**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Frontend (Port 5173):**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

### API Key Issues

**Error: "No active API key for gemini"**

- Ensure you've added your Gemini API key
- Check `backend/services/aiService.js` has the correct key
- Verify key is valid at [Google AI Studio](https://aistudio.google.com/)

**Error: "API key invalid"**

- Generate a new API key
- Ensure no extra spaces in the key
- Check key hasn't expired

### Module Not Found Errors

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## Project Structure

```
compliment_ai/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   └── Upload.js             # Upload schema
│   ├── routes/
│   │   ├── captionRoutes.js      # Caption generation endpoints
│   │   ├── analyticsRoutes.js    # Analytics endpoints
│   │   └── historyRoutes.js      # History endpoints
│   ├── services/
│   │   └── aiService.js          # AI service (Gemini integration)
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ImageUploader.jsx
│   │   │   ├── StyleMixer.jsx
│   │   │   ├── CaptionPanel.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CustomStyleCreator.jsx
│   │   │   ├── ExportModal.jsx
│   │   │   └── SoundManager.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Usage Guide

### 1. Upload Image
- Click or drag & drop image into upload area
- Supports JPG, PNG, GIF
- Multiple images supported

### 2. Select Styles
- Choose from 6 pre-built styles:
  - Romantic
  - Funny
  - Poetic
  - Savage
  - Mysterious
  - Confident
- Or create custom style with your own description

### 3. Generate Captions
- Click "Generate Captions" button
- AI will analyze image and create 3 unique captions
- View character counts for Twitter/Instagram

### 4. Manage Captions
- **Copy** - Copy to clipboard
- **Edit** - Modify caption text
- **Regenerate** - Generate new caption for that slot

### 5. Export Options
- Export as text file
- Export as JSON
- Share to Twitter
- Copy all captions

### 6. View Analytics
- Click "Analytics" button
- See total uploads and captions
- View style usage statistics
- Browse recent activity
- Click any activity to view generated captions

---

## Configuration

### Change Port Numbers

**Backend:**
Edit `backend/.env`:
```env
PORT=5000  # Change to your preferred port
```

**Frontend:**
Edit `frontend/vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 5173  // Change to your preferred port
  }
})
```

### Customize Styles

Edit `frontend/src/components/StyleMixer.jsx`:

```javascript
const STYLES = [
  { id: "your-style", name: "Your Style", icon: "...", color: "from-color-to-color" },
  // Add more styles
];
```

---

## Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables:
   - `MONGO_URI`
   - `ADMIN_SECRET_KEY`
   - `PORT`
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Build frontend:
```bash
cd frontend
npm run build
```

2. Deploy `dist` folder to hosting platform

3. Update API URL in frontend code to your backend URL

---

## Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `ADMIN_SECRET_KEY` | Secret key for admin access | `your_secret_key` |
| `PORT` | Backend server port | `5000` |

---

## Support

If you encounter issues:

1. Check this README's Troubleshooting section
2. Verify all prerequisites are installed
3. Ensure API keys are correct
4. Check MongoDB connection
5. Review console logs for errors

---

## License

This project is for educational purposes.

---

## Credits

- **AI Provider:** Google Gemini 2.5 Flash
- **Database:** MongoDB Atlas
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express

---

**Made with love using AI**
