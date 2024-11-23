/**
 * @fileoverview
 * Student Management System
 *
 * Description: The Student Management System is a comprehensive web application designed to manage student data efficiently.
 * Built with modern web technologies, this system offers a robust and user-friendly interface for managing courses, students, and their performance.
 *
 * Technologies Used:
 * - React
 * - TypeScript
 * - Zustand (State Management)
 * - Tailwind CSS (Styling)
 * - Vite (Building and Serving)
 *
 * Author: Daniel Acevedo Lopez
 * GitHub: https://github.com/acevedod1974/Student-Management-System-V4
 *
 * Copyright © 2023 Daniel Acevedo Lopez. All rights reserved.
 *
 * This project is licensed under the MIT License. See the LICENSE file for more details.
 */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { CoursePage } from "./pages/CoursePage";
import { StudentDetailPage } from "./pages/StudentDetailPage";
import { Header } from "./components/Header";

/**
 * App Component
 *
 * This is the main entry point of the application. It sets up the router and defines the routes
 * for different pages of the application.
 *
 * @returns {JSX.Element} The main application component.
 */
function App() {
  return (
    <Router>
      {/* Header component that is displayed on all pages */}
      <Header />
      <div className="mt-8 font-sans">
        <Routes>
          {/* Route for the Dashboard page */}
          <Route path="/" element={<Dashboard />} />
          {/* Route for the Course detail page */}
          <Route path="/course/:courseId" element={<CoursePage />} />
          {/* Route for the Student detail page */}
          <Route
            path="/course/:courseId/student/:studentId"
            element={<StudentDetailPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
