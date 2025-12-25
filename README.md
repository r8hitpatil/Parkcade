# 🚗 Parkcade

Parkcade is a **full-stack parking management and booking system** designed to simplify how users find, book, and manage parking slots, while providing administrators complete control over parking operations.

---

## 📌 Problem Statement

Finding available parking in real time is inefficient and time-consuming. Traditional systems lack centralized booking, availability tracking, and admin control.

**Parkcade solves this problem** by providing a centralized platform for:

* Discovering available parking slots
* Booking parking slots seamlessly
* Managing parking infrastructure efficiently

---

## ✨ Features

### 🔐 Role-Based Access Control (RBAC) — **Highlight**

Parkcade implements **fine-grained Role-Based Access Control (RBAC)** using **OpenFGA**, enabling scalable and flexible authorization beyond traditional role checks.

* Integrated **OpenFGA** for relationship-based authorization
* Defined access control models for **Admin** and **User** roles
* Enforced permissions at API level for secure resource access
* Enabled future extensibility for complex roles and policies

RBAC ensures that **only authorized users can perform sensitive operations**, such as parking slot management and administrative actions.

* 💳 Integrated **Razorpay Payment Gateway** for secure parking slot booking transactions and payment handling.

### 👤 User Features

* User authentication and authorization
* View available parking slots
* Book parking slots
* View booking history

### 🛠️ Admin Features

* Admin authentication with role-based access
* Create, update, and delete parking slots
* Monitor parking availability
* Manage users and bookings

---

## 🧱 System Architecture

Parkcade follows a **client–server architecture** with a dedicated authorization layer:

* **Frontend** communicates with the backend via REST APIs
* **Backend** handles business logic, authentication, and authorization checks
* **OpenFGA** manages relationship-based access control decisions
* **Database** stores users, admins, parking slots, and booking data

Parkcade follows a **client–server architecture**:

* **Frontend** communicates with the backend via REST APIs
* **Backend** handles business logic, authentication, and database operations
* **Database** stores users, admins, parking slots, and booking data

---

## 🛠️ Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **Prisma ORM**
* **OpenFGA (RBAC & Authorization)**

### Backend

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **Prisma ORM**

### Frontend

* Web-based UI (integrated with backend APIs)

### Other Tools

* RESTful API architecture
* Role-Based Authentication
* Environment-based configuration

---

## 🗄️ Database Design

* Users
* Admins
* Parking Slots
* Bookings

Relational data modeling ensures consistency, scalability, and efficient querying.

---

### 💳 Payment Integration

- Integrated **Razorpay Payment Gateway** to handle secure parking slot booking payments, including order creation, payment verification, and transaction handling.

---

## 🔐 Security

* Secure authentication flow

* **Fine-grained authorization using OpenFGA (RBAC)**

* Role-based access enforcement for Admin and User actions

* Protected routes and controlled API access

* Secure authentication flow

* Role-based authorization for Admin and User

* Protected routes and controlled access

---
