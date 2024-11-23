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
import { useNavigate } from "react-router-dom";
import { Student } from "../types/student";
import { Edit2, Trash2, GraduationCap, Mail, Calendar } from "lucide-react";

interface StudentCardProps {
  student: Student;
  courseId: string;
  onEdit: (student: Student) => void;
  onDelete: (studentId: string) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  courseId,
  onEdit,
  onDelete,
}) => {
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
  const navigate = useNavigate();

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
  const handleNameClick = () => {
    navigate(`/course/${courseId}/student/${student.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={student.profileImage}
          alt={`${student.firstName} ${student.lastName}`}
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
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3
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
            className="text-white text-xl font-semibold cursor-pointer"
            onClick={handleNameClick}
          >
            {student.firstName} {student.lastName}
          </h3>
          <p className="text-white/80">{student.major}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Mail className="w-4 h-4" />
          <span className="text-sm">{student.id}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <GraduationCap className="w-4 h-4" />
          <span className="text-sm">GPA: {student.gpa}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span
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
            className={`px-3 py-1 rounded-full text-sm ${
              student.status === "active"
                ? "bg-green-100 text-green-800"
                : student.status === "graduated"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(student)}
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
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(student.id)}
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
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
