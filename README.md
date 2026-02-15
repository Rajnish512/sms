# School Management System (SMS)

🔗 **Live Demo:** https://mistyrose-lion-729162.hostingersite.com
💻 **GitHub Repository:** https://github.com/Rajnish512/sms

---

## Overview

A modern full-stack School Management System built using **Laravel 12** and the **Laravel React Starter Kit**. This application allows administrators to manage students, teachers, courses, and enrollments through a clean and responsive dashboard interface.

This project demonstrates real-world full-stack development using modern Laravel and React architecture.

---

## Tech Stack

### Backend

* Laravel 12
* PHP 8+
* MySQL
* Eloquent ORM
* RESTful Controllers

### Frontend

* React (Laravel Starter Kit)
* Inertia.js
* Vite
* Tailwind CSS

### Tools & Environment

* Git & GitHub
* Composer
* Node.js & NPM

---

## Features

* Dashboard with real-time statistics
* Student Management (Create, Read, Update, Delete)
* Teacher Management
* Course Management
* Enrollment Management (Student ↔ Course relationship)
* Modal-based form UI
* Clean and responsive layout
* Full-stack integration using Inertia.js

---

## Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Students

![Students](screenshots/students.png)

### Teachers

![Teachers](screenshots/teachers.png)

### Courses

![Courses](screenshots/courses.png)

### Enrollments

![Enrollments](screenshots/enrollments.png)

---

## Database Design

This system uses relational database structure:

* Students table
* Teachers table
* Courses table
* Enrollments table (relationship table)

Relationships:

* One Teacher → Many Courses
* One Student → Many Enrollments
* One Course → Many Enrollments
* Enrollment connects Student and Course

---

## Architecture

Frontend (React + Inertia.js)
↓
Laravel Routes
↓
Controllers
↓
Eloquent Models
↓
MySQL Database

This architecture ensures clean separation of concerns and maintainable code.

---

## Installation Guide

Clone repository:

```bash
git clone https://github.com/Rajnish512/sms.git
cd sms
```

Install backend dependencies:

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Install frontend dependencies:

```bash
npm install
npm run dev
```

---

## Key Technical Implementation

* Laravel MVC architecture
* Eloquent ORM relationships
* React component-based architecture
* Inertia.js for seamless frontend-backend integration
* RESTful routing
* Form handling and validation
* Modal-based CRUD operations

---

## Skills Demonstrated

* Full-stack development
* Laravel 12 development
* React integration with Laravel
* Database design and relationships
* REST API design
* Modern frontend architecture
* Git version control

---

## Author

Rajnish Mishra
GitHub: https://github.com/Rajnish512

---

## Purpose

This project was developed to demonstrate production-level full-stack development skills using Laravel 12 and React Starter Kit, following modern development best practices.
