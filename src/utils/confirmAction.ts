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
 * confirmAction Function
 *
 * This function displays a confirmation dialog with the provided message.
 * It returns true if the user confirms the action, and false otherwise.
 *
 * @param {string} message - The message to display in the confirmation dialog.
 * @returns {boolean} - A boolean indicating whether the user confirmed the action.
 */
export const confirmAction = (message: string): boolean => {
  return window.confirm(message);
};
