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

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCourseStore } from "../store/useCourseStore";
import { ExamPerformanceChart } from "../components/ExamPerformanceChart";
import { GradesTable } from "../components/GradesTable";
import toast from "react-hot-toast";

/**
 * StudentDetailPage Component
 *
 * This component displays detailed information about a specific student,
 * including their grades and exam performance. It also allows editing
 * the student's details.
 */
export const StudentDetailPage: React.FC = () => {
  // Extract courseId and studentId from the URL parameters
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
  const { courseId, studentId } = useParams();

  // Retrieve courses and updateStudent function from the Zustand store
  /**
   * Function description.
   *
   * @param {type} param - Description.
   * @returns {type} Description.
   */
  const courses = useCourseStore((state) => state.courses);
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
  const updateStudent = useCourseStore((state) => state.updateStudent);

  // Find the specific course and student based on the URL parameters
  /**
   * Function description.
   *
   * @param {type} param - Description.
   * @returns {type} Description.
   */
  const course = courses.find((c) => c.id === courseId);
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
  const student = course?.students.find((s) => s.id === studentId);

  // State to manage the visibility of the edit student form/modal
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
  const [showEditStudent, setShowEditStudent] = useState(false);

  // State to manage the form data for editing the student
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
  const [formData, setFormData] = useState({
    firstName: student?.firstName || "",
    lastName: student?.lastName || "",
    id: student?.id || "",
    finalGrade: student?.finalGrade || 0,
  });

  // Handle the case where the course or student is not found
  if (!course || !student) {
    return <div>Student not found</div>;
  }

  // Function to handle the edit student button click
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
  const handleEditStudent = () => {
    setShowEditStudent(true);
  };

  // Function to handle saving the edited student details
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
  const handleSaveStudent = () => {
    updateStudent(course.id, student.id, formData);
    setShowEditStudent(false);
    toast.success("Estudiante actualizado exitosamente");
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {student.firstName} {student.lastName}
        </h1>
        <button
          onClick={handleEditStudent}
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
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Editar Estudiante
        </button>
        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <h2 className="text-xl font-semibold mb-4">Calificaciones</h2>
          <GradesTable
            course={course}
            student={student}
            onDeleteStudent={() => {}}
          />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Rendimiento por Examen</h2>
          <ExamPerformanceChart course={course} student={student} />
        </div>
        <div className="mt-4">
          <Link
            to={`/course/${courseId}`}
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
            className="text-blue-600 hover:underline"
          >
            Back to Course
          </Link>
        </div>

        {showEditStudent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h2 className="text-xl font-semibold mb-4">Editar Estudiante</h2>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Apellido
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowEditStudent(false)}
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
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveStudent}
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
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
