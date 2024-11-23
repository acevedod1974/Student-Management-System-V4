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

function App() {
  return (
    <Router>
      <Header />
      <div className="mt-8 font-sans">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
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
