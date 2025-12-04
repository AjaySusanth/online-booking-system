# 🗂️ **Online Appointment Booking System (MERN)**

A minimal, production-ready **MERN stack** application that allows users to book appointments with time-slot validation, view all appointments, and store data securely in MongoDB.
Built as part of the **Venticinque Aeyon Groupe (V25 Groupe) MERN Hiring Task**.

---

## 🚀 **Features**

### ✅ Booking Features

* Add new appointments
* Full validation (name, phone, date, reason)
* Predefined time slots (10AM, 11AM, 12PM, 4PM, 5PM)
* **Prevents double-booking**:

  > “This slot is already booked. Please choose another time.”

### 📄 Appointment Management

* View all appointments
* Responsive table layout (TailwindCSS)

# ⚙️ **Tech Stack**

### **Frontend**

* React + Vite
* Tailwind CSS
* Axios

### **Backend**

* Node.js
* Express.js
* MongoDB (Mongoose ORM)

---

# 🛠️ **Installation & Setup (Without Docker)**

## 1️⃣ Clone the repository

```bash
git clone https://github.com/AjaySusanth/appointment-booking-system.git
cd appointment-booking-system
```

---

## **Backend Setup**

```bash
cd backend
npm install
npm run dev
```

Create **backend `.env`**:

```
MONGO_URI=mongodb://localhost:27017/appointments
PORT=5000
```

---

## **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

Create **frontend `.env`**:

```
VITE_API_BASE_URL=http://localhost:5000/api/appointments
```

---

# 🐳 **Docker Setup (Frontend + Backend + MongoDB)**

### Start all services:

```bash
docker compose up -d --build
```

### Stop services:

```bash
docker compose down
```

📌 **Service URLs**

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend:** [http://localhost:5000](http://localhost:5000)
* **MongoDB:** mongodb://localhost:27017

---

# 📬 **API Endpoints**

### **POST /api/appointments**

Create an appointment
Validates duplicate date/time slot

### **GET /api/appointments**

Get all appointments
