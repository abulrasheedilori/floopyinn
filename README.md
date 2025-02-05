Project Name: Floopyinn
A project management tools that allow members to manage their tasks, ensure completion in due time, messaging etc.

Table of Contents
- Project Description
- Features
- Technologies Used
- Installation
- Usage
- Contributing
- License


Project Description
This project is a web application developed using React, TypeScript, Tailwind CSS, and Firebase. It features a user authentication system with Facebook and Google login options, a responsive dashboard, and a task management interface. The design closely follows the provided Figma design, ensuring a clean and professional UI.

Features
  User Authentication:
- Sign up and log in using Facebook or Google accounts.
- Form validation for user inputs.

  Dashboard:
- Responsive layout with a navigation bar and content section.
- Search functionality and user profile management.
  
Task Management:
- Create, update, and delete tasks.
- Organize tasks into categories: To Do, On Going, and Complete.
- Technologies Used
- Frontend:

Technology used
- React with TypeScript
- Tailwind CSS
- Backend:
  - Firebase Authentication
  - Firebase Firestore

Installation

- Clone the Repository:
  git clone https://github.com/abulrasheedilori/floopyinn.git

- Navigate to the Project Directory:
cd floopyinn

Install Dependencies:
  - npm install

- Set Up Firebase:
  - Create a Firebase project in the Firebase Console.
  - Enable Authentication methods (Facebook and Google) in the Firebase Authentication section.
  - Add Firebase to your web app and obtain the configuration object.
  - Create a firebase.ts file in the src directory and add your Firebase configuration:
- typescript


import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  // Your Firebase config
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

export { auth, facebookProvider, googleProvider };

Start the Development Server:

npm run dev

note: The application will be accessible at http://localhost:3000.

Usage
Authentication:

  - Use the "Continue with Facebook" or "Continue with Google" buttons to sign up or log in.
  - Fill in the form with your name, email, and password to create a new account.

Dashboard:
  - Use the search bar to find tasks.
  - Manage your profile by clicking on your username.
Task Management:
  - Add new tasks by clicking the "Add Task" button.
  - Organize tasks into categories: To Do, On Going, and Complete.

Contributing
  - Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your changes.

License
  - This project is licensed under the MIT License.
