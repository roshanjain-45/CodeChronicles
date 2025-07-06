# Code Chronicles 🧠💻

**Code Chronicles** is an interactive web-based quiz platform built for a Techno-Management Fest. It challenges users with coding-related questions and quizzes in a clean, responsive interface. Designed with engagement and learning in mind, it's perf

---

## 🚀 Features

Code Chronicles is packed with features to ensure a robust and fair assessment experience:

* ### **Secure Quiz Environment**
    Prevent cheating with built-in security measures:
    * **Tab/Application Switch Disqualification:** Automatically flags or disqualifies users who navigate away from the quiz interface.
    * **Developer Tools Detection:** Identifies and responds to attempts to open browser developer tools (F12/Ctrl+Shift+I).

* ### **Intuitive Question Navigation**
    Effortlessly move through the quiz:
    * **Multiple Coding Questions:** Supports a diverse set of coding challenges.
    * **Previous/Next Buttons:** Seamlessly navigate between questions.
    * **Auto-Saving Answers:** Ensures user progress is continuously saved, preventing data loss.

* ### **Integrated Code Editor**
    A powerful environment for coding:
    * **Syntax Highlighting:** Write code with clear and readable syntax for various languages.
    * **Live Code Execution:** Run and test code in a dedicated output panel to instantly verify solutions.

* ### **Multi-language Support**
    Code in your preferred language:
    * Supports **C, C++, Java, Python, and JavaScript**.

* ### **Timer-Based Submission**
    Fair and time-bound assessments:
    * A **50-minute timer** ensures all users adhere to the same time constraints.
    * **Automatic Submission:** Answers are submitted automatically upon timeout, preventing late submissions.

---

## 🧑‍💻 Tech Stack

Code Chronicles is built using modern and efficient technologies:

* **Frontend**: React, Tailwind CSS
* **Code Execution**: Judge0 (configurable)
* **Routing**: React Router
* **State Management**: React Hooks (`useState`, `useEffect`, `useRef`)

---

## 📦 Folder Structure
```
CodeChronicles/
│
├── backend/                         # Backend (Express + MongoDB)
│   ├── .env                         # Environment variables (API keys, DB URI)
│   ├── config.js                    # Configuration (e.g., DB connection)
│   ├── execute.js                   # Code execution logic
│   ├── server.js                    # Entry point for Express server
│   ├── package.json                 # Backend dependencies and scripts
│   ├── package-lock.json
│   │
│   ├── models/                      # Mongoose schema definitions
│   │   ├── Question.js              # Schema for quiz questions
│   │   └── Submission.js            # Schema for code submissions
│   │
│   └── routes/                      # API route handlers
│       ├── quizRoutes.js            # Quiz-related endpoints
│       └── submissionRoutes.js      # Code submission endpoints
│
└── frontend/src/                    # Frontend (React + Vite)
    ├── index.css                    # Global CSS styles
    ├── App.css                      # Component-specific styles
    ├── App.jsx                      # Main application component
    ├── main.jsx                     # Entry point (React DOM rendering)
    ├── config.js                    # API base URL or environment settings
    │
    ├── api/                         # API calls
    │   ├── api.js                   # Base axios instance
    │   └── executeCode.js           # Code execution request handler
    │
    ├── assets/                      # Static assets
    │   └── react.svg                # Example image
    │
    ├── components/                  # Reusable UI components
    │   ├── CodeEditor.jsx           # Code editor component
    │   └── Timer.jsx                # Timer component for quizzes
    │
    └── pages/                       # Main application pages
        ├── Home.jsx                 # Home/landing page
        ├── Quiz.jsx                 # Quiz interface
        ├── Rules.jsx                # Rules page
        └── SubmissionSuccess.jsx    # Success message after quiz submission

```
---

## ⚙️ Getting Started

Follow these steps to get CodeQuiz up and running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/roshanjain-45/CodeChronicles.git](https://github.com/roshanjain-45/CodeChronicles.git)
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the application:**
    ```bash
    npm run dev
    ```

**Important:** If you are using an external code execution API (like Judge0 or JDoodle), remember to set up your `.env` file with the necessary API keys and endpoints.

---

## 🔮 Future Enhancements

Constantly working to improve Code Chronicles. Here are some exciting features planned for future updates:

* ### **Enhanced Code Runner**
    * **Input Fields:** Allow users to provide custom input for their code and view corresponding output.
    * **Self-Validation:** Automatically validate user code against predefined test cases and provide "Correct/Wrong" verdicts.
    * **Error Highlighting:** Display detailed syntax and runtime error messages for easier debugging.

* ### **Performance & Scalability**
    * **Lazy Loading:** Optimize performance by lazy loading the code editor.
    * **Question Pagination:** Improve scalability for quizzes with a large number of questions.

* ### **User Management & Analytics**
    * **User Authentication & Dashboard:** Implement user login, quiz history, and performance tracking.
    * **Result Analytics:** Provide detailed post-submission analytics, including total score, accuracy, and time spent per question.

* ### **Improved User Experience**
    * **Test Case Format UI:** Clearly display input and output samples for each question.
    * **Difficulty Tags:** Tag questions as Easy, Medium, or Hard for better filtering and organization.
    * **Multilingual UI:** Expand language support to include Hindi, English, and more for a wider global reach.



---
