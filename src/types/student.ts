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

/**
 * Represents a student with personal and academic information.
 */
export interface Student {
  id: string; // Numeric ID of 8 digits
  firstName: string; // First name of the student
  lastName: string; // Last name of the student
  email: string; // Email address of the student
  dateOfBirth: string; // Date of birth of the student
  grade: string; // Academic grade of the student
  profileImage?: string; // Optional property for the student's profile image
  major?: string; // Optional property for the student's major
  gpa?: number; // Optional property for the student's GPA
  enrollmentDate?: string; // Optional property for the student's enrollment date
  status?: string; // Optional property for the student's status
}
