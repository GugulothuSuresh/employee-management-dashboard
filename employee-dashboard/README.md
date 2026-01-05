# employee-management-dashboard

A React.js employee dashboard using Material UI to manage employees.  
Features include login/logout flow, mock data authentication, and full CRUD (Create, Read, Update, Delete) with print functionality.

---

## Table of Contents

- [Demo](#demo)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Features](#features)
  - [Login & Logout Flow](#login--logout-flow)
  - [Employee Management](#employee-management)
    - [Add Employee](#add-employee)
    - [Edit Employee](#edit-employee)
    - [Delete Employee](#delete-employee)
    - [Print Employees](#print-employees)
- [User Flow diagram](#user-flow-diagram)
- [Usage](#usage)

---

## Demo

Here are the ss what employee management system looks like.

## Screenshots

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)

---

## Tech Stack

- **Frontend:** React.js
- **UI Library:** Material UI (MUI)
- **Routing:** React Router DOM
- **Date Formatting:** dayjs
- **State Management:** useState, useEffect
- **Data Storage:** Local Storage (for mock API / mock data)

---

## Project Structure

src/
├─ components/
│ ├─ EmployeeForm.js
│ ├─ DeleteConfirmDialog.js
│ ├─ StatCard.js
├─ pages/
│ ├─ Dashboard.js
│ ├─ Login.js
├─ App.js
├─ index.js

---

## Setup & Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd employee-management-dashboard

npm install

npm start

Open your browser at http://localhost:3000


---

```

## Features

## Login & Logout Flow:

Login Page

Enter username and password (validated with mock data) (username = admin, password = admin123).

On success, redirected to Dashboard.

Protected Dashboard

Routes are protected. If not logged in, redirect to login page.

Logout

Click logout button to clear session/local storage.

Redirects to login page.

---

## Employee Management

## Add Employee

Click Add Employee button.

Fill the form: profile picture, full name, gender, date of birth, state, active status.

Inline validation ensures proper data.

Submit saves the employee to local storage.

## Edit Employee

Click Edit icon on employee row.

Form opens pre-filled with employee data.

Update fields and submit to modify employee in local storage.

## Delete Employee

Click Delete icon on employee row.

Confirmation dialog appears with employee name.

Confirm to delete the employee permanently from local storage.

## Print Employees

Click Print to generate a printer-friendly employee table.

---

## User Flow Diagram

flowchart TD
A[Login Page] -->|Successful login| B[Dashboard]
B --> C[Add Employee Form]
B --> D[Edit Employee Form]
B --> E[Delete Employee Confirmation]
B --> F[Print Employee Table]
B -->|Logout| A

## Flow Explanation:

Login Page: Enter username/password (mock validation).

Dashboard: Shows paginated employee table with search, status, and actions.

Add Employee Form: Click "Add Employee" → fill form → save to mock data.

Edit Employee Form: Click Edit icon → update fields → save changes.

Delete Employee Confirmation: Click Delete icon → confirm → remove employee.

Print Employee Table: Optional printer-friendly view.

Logout: Clears session and returns to login page.

---

## Usage

Login with mock credentials.

View employees in paginated table.

Add a new employee using the form.

Edit existing employee using Edit icon.

Delete employee using Delete icon and confirmation dialog.

Print employee table if needed.

Logout to end the session.

---
