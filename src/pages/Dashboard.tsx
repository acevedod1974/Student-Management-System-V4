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
import { Link } from "react-router-dom";
import { CourseCard } from "../components/CourseCard";
import { CourseOverviewChart } from "../components/CourseOverviewChart";
import { useCourseStore } from "../store/useCourseStore";
import { PlusCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { confirmAction } from "../utils/confirmAction";
import { DataManagement } from "../components/DataManagement";

/**
 * Dashboard Component
 *
 * This component displays an overview of all courses, allows adding new courses,
 * and provides data management options.
 */
export const Dashboard: React.FC = () => {
  // Retrieve courses and functions to add/delete courses from the Zustand store
  const courses = useCourseStore((state) => state.courses);
  const addCourse = useCourseStore((state) => state.addCourse);
  const deleteCourse = useCourseStore((state) => state.deleteCourse);

  // State to manage the new course name input
  const [newCourseName, setNewCourseName] = useState("");

  // Function to handle adding a new course
  const handleAddCourse = () => {
    if (!newCourseName.trim()) {
      toast.error("El nombre del curso no puede estar vacío");
      return;
    }
    addCourse({ name: newCourseName, students: [], exams: [] });
    setNewCourseName("");
    toast.success("Curso agregado exitosamente");
  };

  // Function to handle deleting a course
  const handleDeleteCourse = (courseId: string) => {
    if (confirmAction("¿Está seguro de eliminar este curso?")) {
      deleteCourse(courseId);
      toast.success("Curso eliminado exitosamente");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Vista General</h1>

      {/* Display a grid of course cards */}
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

      {/* Form to add a new course */}
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

      {/* Display a chart comparing courses */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Comparación de Cursos</h2>
        <CourseOverviewChart courses={courses} />
      </div>

      {/* Data management section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Gestión de Datos</h2>
        <DataManagement />
      </div>
    </div>
  );
};
