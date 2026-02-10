# React + TypeScript CRUD Application (Full Stack)

A full-stack CRUD (Create, Read, Update, Delete) web application built using modern technologies.

This project allows users to manage user records with proper validation, search, pagination, and a clean user interface.

---

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

---

## ✨ Features

### ✅ Frontend
- React with TypeScript
- Tailwind CSS UI
- Responsive layout
- Form validation with error messages
- Toast notifications (success & error)
- Search and filter
- Material-style pagination
- Separate pages using React Router
- Edit & Delete functionality

### ✅ Backend
- Node.js + Express with TypeScript
- MongoDB with Mongoose
- RESTful CRUD APIs
- Centralized error handling
- Input validation
- Clean architecture (Routes, Controllers, Models)

---

## 📂 Project Repository

Clone the repository:

```bash
git clone https://github.com/Inshiya1904/CRUD-App.git
```

---

## Backend Setup

Step 1: Go to Backend Folder
```bash
cd Backend
```

Step 2: Install Dependencies
```bash
npm install
```

Step 3: Start Backend Server
```bash
npm run dev
```

---

## Frontend Setup

Step 1: Go to Frontend Folder
```bash
cd Frontend
```

Step 2: Install Dependencies
```bash
npm install
```

Step 3: Start Frontend Server
```bash
npm run dev
```
---

## Extensibility (Adding New Fields)
To add a new field (example: Date of Birth):

### Backend

Update models/User.ts
Add the new field
Update validation in controller

### Frontend

Update types/user.ts
Add input in UserForm.tsx
Add validation logic
