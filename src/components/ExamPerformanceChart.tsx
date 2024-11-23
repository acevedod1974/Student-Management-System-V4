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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Course, Student } from "../types/course";

interface ExamPerformanceChartProps {
  course: Course;
  student?: Student;
}

export const ExamPerformanceChart: React.FC<ExamPerformanceChartProps> = ({
  course,
  student,
}) => {
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
  const data = course.exams.map((exam, index) => {
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
    const examGrades = course.students.map(
      (student) => student.grades[index].score
    );
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
    const average =
      examGrades.reduce((acc, grade) => acc + grade, 0) / examGrades.length;
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
    const passing = examGrades.filter((grade) => grade >= 6).length;
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
    const passingPercentage = (passing / examGrades.length) * 100;

/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
    const studentScore = student ? student.grades[index].score : null;

    return {
      name: exam.name,
      promedio: Number(average.toFixed(1)),
      aprobados: Number(passingPercentage.toFixed(1)),
      studentScore:
        studentScore !== null ? Number(studentScore.toFixed(1)) : null,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="promedio"
          name="Promedio"
          stroke="#3b82f6"
          strokeWidth={2}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="aprobados"
          name="% Aprobados"
          stroke="#10b981"
          strokeWidth={2}
        />
        {student && (
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="studentScore"
            name={`${student.firstName} ${student.lastName}`}
            stroke="#ff7300"
            strokeWidth={2}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};
