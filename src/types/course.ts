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
 * Represents a grade for a specific exam.
 */
export interface Grade {
  id: string;
  examName: string;
  score: number;
  maxScore: number;
}

/**
 * Represents a student enrolled in a course.
 */
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string; // Numeric ID of 8 digits
  grades: Grade[];
  finalGrade: number;
  profileImage?: string; // Optional property for the student's profile image
}

/**
 * Represents an exam in a course.
 */
export interface Exam {
  id: string;
  name: string;
  maxScore: number;
}

/**
 * Represents a course with students and exams.
 */
export interface Course {
  id: string;
  name: string;
  bannerImage?: string; // Optional property for the course banner image
  students: Student[];
  exams: Exam[];
}
