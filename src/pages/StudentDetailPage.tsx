import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCourseStore } from "../store/useCourseStore";
import { ExamPerformanceChart } from "../components/ExamPerformanceChart";
import { GradesTable } from "../components/GradesTable";

export const StudentDetailPage: React.FC = () => {
  const { courseId, studentId } = useParams();
  const courses = useCourseStore((state) => state.courses);
  const course = courses.find((c) => c.id === courseId);
  const student = course?.students.find((s) => s.id === studentId);

  if (!course || !student) {
    return <div>Student not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {student.firstName} {student.lastName}
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
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
            className="text-blue-600 hover:underline"
          >
            Back to Course
          </Link>
        </div>
      </div>
    </div>
  );
};
