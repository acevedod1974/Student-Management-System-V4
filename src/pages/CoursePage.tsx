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
import { useParams, Navigate } from "react-router-dom";
import { UserPlus, Edit2 } from "lucide-react";
import { GradesTable } from "../components/GradesTable";
import { CourseStats } from "../components/CourseStats";
import { ExamPerformanceChart } from "../components/ExamPerformanceChart";
import { StudentForm } from "../components/StudentForm";
import { useCourseStore } from "../store/useCourseStore";
import { Link } from "react-router-dom";
import { CourseCard } from "../components/CourseCard";
import { PlusCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { confirmAction } from "../utils/confirmAction";
import { DataManagement } from "../components/DataManagement";
import { CourseOverviewChart } from "../components/CourseOverviewChart";

/**
 * CoursePage Component
 *
 * This component displays detailed information about a specific course,
 * including student grades, course statistics, grade distribution, and exam performance.
 * It also allows adding new students and editing course details.
 *
 * @returns {JSX.Element} The CoursePage component.
 */

export const CoursePage: React.FC = () => {
  // Extract courseId from the URL parameters
  const { courseId } = useParams();

  // State to manage the visibility of the add student form/modal
  const [showAddStudent, setShowAddStudent] = useState(false);

  // State to manage the visibility of the edit course form/modal
  const [showEditCourse, setShowEditCourse] = useState(false);

  // State to manage the course name input for editing
  const [courseName, setCourseName] = useState("");

  // Retrieve the updateCourse, addStudent, and deleteStudent functions from the Zustand store
  const updateCourse = useCourseStore((state) => state.updateCourse);
  const addStudent = useCourseStore((state) => state.addStudent);
  const deleteStudent = useCourseStore((state) => state.deleteStudent);

  // Retrieve the specific course based on the URL parameter
  const course = useCourseStore((state) =>
    state.courses.find((course) => course.id === courseId)
  );

  // Handle the case where the course is not found
  if (!course) {
    return <Navigate to="/" />;
  }

  /**
   * Handle the edit course button click
   */
  const handleEditCourse = () => {
    setCourseName(course.name);
    setShowEditCourse(true);
  };

  /**
   * Handle saving the edited course details
   */
  const handleSaveCourse = () => {
    updateCourse(course.id, { name: courseName });
    setShowEditCourse(false);
    toast.success("Curso actualizado exitosamente");
  };

  return (
    <div className="space-y-8">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setShowAddStudent(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            <UserPlus className="w-4 h-4" />
            Agregar Estudiante
          </button>
          <button
            onClick={handleEditCourse}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Edit2 className="w-4 h-4" />
            Editar Curso
          </button>
        </div>

        {showEditCourse && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h2 className="text-xl font-semibold mb-4">Editar Curso</h2>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="block w-full px-2 py-1 text-sm border rounded mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowEditCourse(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveCourse}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CourseStats course={course} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Rendimiento por Examen</h2>
          <ExamPerformanceChart course={course} />
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Calificaciones Detalladas</h2>
          </div>
          <div className="p-6">
            <GradesTable
              course={course}
              onDeleteStudent={(studentId) =>
                deleteStudent(course.id, studentId)
              }
            />
          </div>
        </div>

        {showAddStudent && (
          <StudentForm
            courseId={course.id}
            onSubmit={(courseId, student) => {
              addStudent(courseId, {
                ...student,
                finalGrade: 0,
                studentId: student.id,
              });
              setShowAddStudent(false);
            }}
            onClose={() => setShowAddStudent(false)}
          />
        )}
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const courses = useCourseStore((state) => state.courses);

  const addCourse = useCourseStore((state) => state.addCourse);

  const deleteCourse = useCourseStore((state) => state.deleteCourse);

  const [newCourseName, setNewCourseName] = useState("");

  const handleAddCourse = () => {
    if (!newCourseName.trim()) {
      toast.error("El nombre del curso no puede estar vacío");
      return;
    }
    addCourse({ name: newCourseName, students: [], exams: [] });
    setNewCourseName("");
    toast.success("Curso agregado exitosamente");
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirmAction("¿Está seguro de eliminar este curso?")) {
      deleteCourse(courseId);
      toast.success("Curso eliminado exitosamente");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Vista General</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="relative">
            <Link to={`/course/${course.id}`}>
              <CourseCard
                course={course}
                isSelected={false}
                onClick={() => {}}
              />
            </Link>
            <button
              onClick={() => handleDeleteCourse(course.id)}
              className="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Curso</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
            placeholder="Nombre del nuevo curso"
            className="block w-full px-2 py-1 text-sm border rounded"
          />
          <button
            onClick={handleAddCourse}
            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
          >
            <PlusCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Comparación de Cursos</h2>
        <CourseOverviewChart courses={courses} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Gestión de Datos</h2>
        <DataManagement />
      </div>
    </div>
  );
};
