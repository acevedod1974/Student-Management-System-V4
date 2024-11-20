import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { UserPlus, Edit2 } from "lucide-react";
import { GradesTable } from "../components/GradesTable";
import { CourseStats } from "../components/CourseStats";
import { GradeDistributionChart } from "../components/GradeDistributionChart";
import { ExamPerformanceChart } from "../components/ExamPerformanceChart";
import { StudentForm } from "../components/StudentForm";
import { useCourseStore } from "../store/useCourseStore";

export const CoursePage: React.FC = () => {
  const { courseId } = useParams();
  const [showAddStudent, setShowAddStudent] = useState(false);
  const { courses, addStudent, deleteStudent } = useCourseStore();
  const course = courses.find((c) => c.id === courseId);
  const bannerImage = course?.bannerImage; // Assuming bannerImage is a property of course

  if (!course) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="container mx-auto p-4">
        {bannerImage && (
          <div className="mb-4">
            <img
              src={bannerImage}
              alt={course.name}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setShowAddStudent(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            <UserPlus className="w-4 h-4" />
            Agregar Estudiante
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            <Edit2 className="w-4 h-4" />
            Editar Curso
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CourseStats course={course} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Distribución de Notas Finales
            </h2>
            <GradeDistributionChart course={course} />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Rendimiento por Examen
            </h2>
            <ExamPerformanceChart course={course} />
          </div>
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
