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

import { create } from "zustand";
import { Student } from "../types/student";

// Define the StudentStore interface
interface StudentStore {
  students: Student[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addStudent: (student: Omit<Student, "id">) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  exportData: () => string;
  importData: (jsonData: string) => void;
}

// Helper function to generate a unique student ID
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
const generateStudentId = (): string => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

// Create the Zustand store
export const useStudentStore = create<StudentStore>((set, get) => ({
  students: [
    {
      id: "12345678",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      dateOfBirth: "1999-05-15",
      grade: "Senior",
    },
  ],
  searchQuery: "",

  // Set the search query
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Add a new student
  addStudent: (studentData) =>
    set((state) => ({
      students: [
        ...state.students,
        {
          id: generateStudentId(),
          ...studentData,
        },
      ],
    })),

  // Update a student's information
  updateStudent: (id, updatedStudent) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? { ...student, ...updatedStudent } : student
      ),
    })),

  // Delete a student
  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
    })),

  // Export student data as JSON
  exportData: () => JSON.stringify(get().students, null, 2),

  // Import student data from JSON
  importData: (jsonData) => {
    try {
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
      const students = JSON.parse(jsonData);
      if (Array.isArray(students)) {
        set({ students });
      }
    } catch (error) {
      console.error("Error importing data:", error);
    }
  },
}));
