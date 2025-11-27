# DTS Task Manager – Frontend

This project is the Angular frontend built as part of the DTS Developer Technical Test.  
It provides a simple UI for caseworkers to create and manage tasks, communicating with a .NET Web API backend.

---

## 🚀 Features

- Create a new task with:
  - Title
  - Optional description
  - Status (Not Started / In Progress / Complete)
  - Due date and time (validated to ensure it's in the future)
- Form validation with clear error messages
- Sends data to the backend via a dedicated TaskService
- Displays success or error responses from the API

---

## 🛠️ Tech Stack

- **Angular 18** (standalone components)
- **Reactive Forms**
- **TypeScript**
- **HTTPClient** for API integration

---

## 📦 Project Setup

Install dependencies:

```bash
npm install
