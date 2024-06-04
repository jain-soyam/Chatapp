Introduction

This project is a React application integrated with Firebase to provide functionalities like (replace with your functionalities, e.g., authentication, database access, etc.). This README provides a comprehensive overview of the project setup, installation instructions, and usage.

Technologies Used

Frontend: React-TypeScript, Material UI
Backend: Firebase (Authentication, Database, etc.)

Prerequisites

Node.js and npm installed on your system.
A Firebase project created and configured with the desired services (Authentication, Database, etc.).

Installation

1. Clone this repository:

git clone https://github.com/jain-soyam/Chatapp.git

2. Navigate to the project directory:

3. Install dependencies:

npm install (This will bring the node modules in the project's root directory)

Running the Application

1. Start the development server:

npm run dev (This command will start the project on http://localhost:5173)

Features

1. This project allows users to create an account (signup) by using any email and password. After successful signup, users are redirected to login page.
2. After signup, users need to login to their account by using the same email and password they used while creating their account (signup)
3. On successful login, users will be redirected to Chat window where they will be able to chat to another user in realtime. Realtime chat has been made possible by using Firebase's Firestore Database features.
4. This project allows user to update their personal information like "Name", "password", etc. Updating "Email" and "Profile Picture"is in progress and will be integrated soon.
