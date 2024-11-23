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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Course } from '../types/course';

interface CourseOverviewChartProps {
  courses: Course[];
}

export const CourseOverviewChart: React.FC<CourseOverviewChartProps> = ({ courses }) => {
  const data = courses.map((course) => {
    const averageGrade = course.students.reduce(
      (acc, student) => acc + student.finalGrade,
      0
    ) / course.students.length;

    const passingStudents = course.students.filter(
      (student) => student.finalGrade >= 6
    ).length;

    return {
      name: course.name,
      promedio: Number(averageGrade.toFixed(1)),
      aprobados: (passingStudents / course.students.length) * 100,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="promedio"
          name="Promedio"
          fill="#3b82f6"
        />
        <Bar
          yAxisId="right"
          dataKey="aprobados"
          name="% Aprobados"
          fill="#10b981"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};