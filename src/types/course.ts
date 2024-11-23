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

// src/types/course.ts
export interface Exam {
  name: string;
  maxScore: number;
}

export interface Grade {
  id: string;
  examName: string;
  score: number;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string; // ID numérica de 8 dígitos
  grades: Grade[];
  finalGrade: number;
}

export interface Course {
  id: string;
  name: string;
  bannerImage?: string; // Added bannerImage property
  students: Student[];
  exams: Exam[];
}
