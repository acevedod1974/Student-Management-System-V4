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
  const data = course.exams.map((exam, index) => {
    const examGrades = course.students.map(
      (student) => student.grades[index].score
    );
    const average =
      examGrades.reduce((acc, grade) => acc + grade, 0) / examGrades.length;
    const passing = examGrades.filter((grade) => grade >= 6).length;
    const passingPercentage = (passing / examGrades.length) * 100;

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
