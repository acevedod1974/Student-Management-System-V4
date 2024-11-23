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

import React from 'react';
import { Users, Award, TrendingUp } from 'lucide-react';
import { Course } from '../types/course';

interface CourseStatsProps {
  course: Course;
}

export const CourseStats: React.FC<CourseStatsProps> = ({ course }) => {
  const averageGrade = course.students.reduce(
    (acc, student) => acc + student.finalGrade,
    0
  ) / course.students.length;

  const highestGrade = Math.max(
    ...course.students.map((student) => student.finalGrade)
  );

  const passingStudents = course.students.filter(
    (student) => student.finalGrade >= 6
  ).length;

  const stats = [
    {
      label: 'Promedio del Curso',
      value: averageGrade.toFixed(1),
      icon: TrendingUp,
      color: 'text-blue-600',
    },
    {
      label: 'Nota Más Alta',
      value: highestGrade.toFixed(1),
      icon: Award,
      color: 'text-green-600',
    },
    {
      label: 'Estudiantes Aprobados',
      value: `${passingStudents}/${course.students.length}`,
      icon: Users,
      color: 'text-purple-600',
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full bg-opacity-10 ${stat.color} bg-current`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};