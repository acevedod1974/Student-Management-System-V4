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

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useCourseStore } from "../store/useCourseStore";

export const Navigation: React.FC = () => {
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
  const location = useLocation();
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
  const courses = useCourseStore((state) => state.courses);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              Student Management System
            </span>
          </Link>

          <div className="flex gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === `/course/${course.id}`
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {course.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
