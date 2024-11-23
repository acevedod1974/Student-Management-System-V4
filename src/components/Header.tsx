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
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
          className="text-gray-900 text-3xl font-bold hover:underline flex items-center"
        >
          <Home className="w-8 h-8 mr-2" />
          Student Management System
        </Link>
      </div>
    </nav>
  );
};
