# 🎨 ShareBoard

[![Next.js](https://img.shields.io/badge/Next.js-100000?style=for-the-badge&logo=next.js&logoColor=whitee)](https://nextjs.org) [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org) [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org) [![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

> A modern, real-time collaborative whiteboard app for remote teams, brainstorming, and online tutoring.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started) 
  - [Installation](#installation)  
  - [Running the App](#running-the-app)  
- [🎨 Usage](#-usage)

---

## ✨ Features

- 🖌 **Freehand Drawing**: Adjustable pen/eraser, stroke width, and color picker.  
- 🆎 **Text Annotations**: Insert styled text with font, size, and color controls.  
- 🌈 **Background Color**: Dynamic canvas background updates via custom color picker.  
- 🔄 **Real-Time Sync**: Instant updates across all connected clients using Socket.IO.  
- 🔒 **Multi-Room Support**: Unique room URLs isolate sessions.  
- 🕒 **Persistent History**: New joiners see full replay of past strokes, text, and bg changes.  
- 🧹 **Clear Board**: Reset canvas for everyone, live and on reload.  
- 📱 **Responsive Design**: Full-screen canvas and floating toolbar adapt to any device.

---

## 🛠️ Tech Stack

| Category         | Technology                                                                                   |
|------------------|----------------------------------------------------------------------------------------------|
| **Frontend**     | Next.js, React, Tailwind CSS                                                                |
| **Backend**      | Node.js, Express, Socket.IO                                                                  |
| **Database**     | PostgreSQL (via Prisma ORM)                                                                  |
| **Styling**      | Tailwind CSS, Material-UI                                                                    |
| **Utilities**    | TypeScript, Docker, ESLint, Prettier                                                         |
| **Color Picker** | react-color (SketchPicker)                                                                   |

---

## 🚀 Getting Started

### Installation

```bash
# Clone repo
git clone https://github.com/Aarav-95/ShareBoard.git
cd shareboard

# Install dependencies
npm install
```

### Running the App

```bash
# Start server (Socket.IO on :3001)
npm run server

# Start client (Next.js on :3000)
npm run dev
```

## 🎨 Usage

1. **Create/Join a Room**  
   Navigate to `http://localhost:3000/room/<roomId>` or share the URL with collaborators.

2. **Draw & Erase**  
   - Click the pen/brush icon to draw freehand.  
   - Click the eraser icon to erase.  
   - Adjust stroke width with the slider.  
   - Pick pen color from the color picker.

3. **Text Mode**  
   - Click the text icon to enter Text Mode.  
   - Type your text in the input field.  
   - Select font family and font size.  
   - Click anywhere on the canvas to place the text.

4. **Background Color**  
   - Click the background-color swatch in the toolbar.  
   - Choose a new background color from the custom picker.  
   - The new color applies instantly for all participants.

5. **Clear Board**  
   - Click the trash/clear icon to reset the canvas for everyone.  
   - New joiners will see the cleared board (no past strokes or text).

6. **Real-Time Collaboration**  
   - All drawing, text, and background changes sync immediately across connected clients.  
   - New users joining a room receive the full history (strokes, text, and background).

