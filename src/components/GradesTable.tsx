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
import { useNavigate } from "react-router-dom";
import { Trash2, Save, PlusCircle, MinusCircle } from "lucide-react";
import { Course, Student } from "../types/course";
import { useCourseStore } from "../store/useCourseStore";
import toast from "react-hot-toast";
import { confirmAction } from "../utils/confirmAction";

interface GradesTableProps {
  course: Course;
  student?: Student;
  onDeleteStudent: (studentId: string) => void;
}

export const GradesTable: React.FC<GradesTableProps> = ({
  course,
  student,
  onDeleteStudent,
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
  const {
    updateGrade,
    updateStudent,
    updateExamDescription,
    addExam,
    deleteExam,
    updateExamMaxScore,
  } = useCourseStore();
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
  const [editingCell, setEditingCell] = useState<{
    studentId: string;
    gradeId: string;
    currentValue: number;
  } | null>(null);

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
  const [editingStudent, setEditingStudent] = useState<{
    id: string;
    firstName: string;
    lastName: string;
  } | null>(null);

/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
  const [editingExam, setEditingExam] = useState<number | null>(null);
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
  const [newExamDescription, setNewExamDescription] = useState<string>("");
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
  const [newExamName, setNewExamName] = useState<string>("");
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
  const [editingMaxScore, setEditingMaxScore] = useState<number | null>(null);
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
  const [newMaxScore, setNewMaxScore] = useState<number>(100);

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
  const handleEditStart = (
    type: "grade" | "student" | "exam" | "maxScore",
    id: string,
    value:
      | {
          gradeId?: string;
          currentValue?: number;
          firstName?: string;
          lastName?: string;
        }
      | string
      | number
  ) => {
    switch (type) {
      case "grade":
        setEditingCell({
          studentId: id,
          gradeId: (value as { gradeId: string }).gradeId,
          currentValue: (value as { currentValue: number }).currentValue,
        });
        break;
      case "student":
        if (typeof value === "object" && value !== null) {
          setEditingStudent({
            id,
            firstName: (value as { firstName: string }).firstName || "",
            lastName: (value as { lastName: string }).lastName || "",
          });
        }
        break;
      case "exam":
        setEditingExam(Number(id));
        setNewExamDescription(value as string);
        break;
      case "maxScore":
        setEditingMaxScore(Number(id));
        setNewMaxScore(Number(value));
        break;
    }
  };

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
  const handleEditSave = (
    type: "grade" | "student" | "exam" | "maxScore",
    id: string
  ) => {
    switch (type) {
      case "grade":
        if (editingCell) {
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
          const newScore = Number(editingCell.currentValue);
          if (isNaN(newScore) || newScore < 0 || newScore > 100) {
            toast.error("La calificación debe ser un número entre 0 y 100");
            return;
          }
          updateGrade(
            course.id,
            editingCell.studentId,
            editingCell.gradeId,
            newScore
          );
          setEditingCell(null);
          toast.success("Calificación actualizada");
        }
        break;
      case "student":
        if (editingStudent) {
          if (!editingStudent.firstName || !editingStudent.lastName) {
            toast.error("Todos los campos son requeridos");
            return;
          }
          updateStudent(course.id, editingStudent.id, {
            firstName: editingStudent.firstName,
            lastName: editingStudent.lastName,
          });
          setEditingStudent(null);
          toast.success("Datos del estudiante actualizados");
        }
        break;
      case "exam":
        updateExamDescription(course.id, Number(id), newExamDescription);
        setEditingExam(null);
        toast.success("Descripción del examen actualizada");
        break;
      case "maxScore":
        updateExamMaxScore(course.id, Number(id), newMaxScore);
        setEditingMaxScore(null);
        toast.success("Calificación máxima del examen actualizada");
        break;
    }
  };

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
  const handleKeyPress = (
    e: React.KeyboardEvent,
    type: "grade" | "student" | "exam" | "maxScore",
    index?: number
  ) => {
    if (e.key === "Enter") {
      handleEditSave(type, index?.toString() || "");
    } else if (e.key === "Escape") {
      if (type === "grade") {
        setEditingCell(null);
      } else if (type === "student") {
        setEditingStudent(null);
      } else if (type === "exam") {
        setEditingExam(null);
      } else if (type === "maxScore") {
        setEditingMaxScore(null);
      }
    }
  };

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
  const handleAddExam = () => {
    if (!newExamName.trim()) {
      toast.error("El nombre del examen no puede estar vacío");
      return;
    }
    addExam(course.id, newExamName);
    setNewExamName("");
    toast.success("Examen agregado exitosamente");
  };

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
  const handleDeleteExam = (index: number) => {
    if (confirmAction("¿Está seguro de eliminar este examen?")) {
      deleteExam(course.id, index);
      toast.success("Examen eliminado exitosamente");
    }
  };

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
  const handleNameClick = (studentId: string) => {
    navigate(`/course/${course.id}/student/${studentId}`);
  };

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
  const students = student ? [student] : course.students;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estudiante
            </th>
            {course.exams.map((exam, index) => (
              <th
                key={exam.name}
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
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {editingExam === index ? (
                  <input
                    type="text"
                    value={newExamDescription}
                    onChange={(e) => setNewExamDescription(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, "exam", index)}
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
                    className="block w-full px-2 py-1 text-sm border rounded"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() =>
                      handleEditStart("exam", index.toString(), exam.name)
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
                    className="cursor-pointer"
                  >
                    {exam.name}
                  </span>
                )}
                <button
                  onClick={() => handleDeleteExam(index)}
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
                  className="ml-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <MinusCircle className="w-4 h-4" />
                </button>
                {editingMaxScore === index ? (
                  <input
                    type="number"
                    min="0"
                    value={newMaxScore}
                    onChange={(e) => setNewMaxScore(Number(e.target.value))}
                    onKeyDown={(e) => handleKeyPress(e, "maxScore", index)}
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
                    className="block w-full px-2 py-1 text-sm border rounded"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() =>
                      handleEditStart(
                        "maxScore",
                        index.toString(),
                        exam.maxScore
                      )
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
                    className="cursor-pointer"
                  >
                    Max: {exam.maxScore}
                  </span>
                )}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nota Final
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-y-2">
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
                    className="font-medium text-gray-900 cursor-pointer"
                    onClick={() => handleNameClick(student.id)}
                  >
                    {student.firstName} {student.lastName}
                  </span>
                  <div className="text-sm text-gray-500">{student.id}</div>
                </div>
              </td>
              {student.grades.map((grade) => {
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
                const exam = course.exams.find(
                  (exam) => exam.name === grade.examName
                );
/**
 * Function description.
 * 
 * @param {type} param - Description.
 * @returns {type} Description.
 */
                const maxScore = exam ? exam.maxScore : 100;
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
                const isPassing = grade.score > maxScore / 2;
                return (
                  <td
                    key={grade.id}
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
                    className={`px-6 py-4 whitespace-nowrap ${
                      isPassing ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {editingCell?.studentId === student.id &&
                    editingCell?.gradeId === grade.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max={maxScore}
                          step="1"
                          value={editingCell.currentValue}
                          onChange={(e) =>
                            setEditingCell({
                              ...editingCell,
                              currentValue: Number(e.target.value),
                            })
                          }
                          onKeyDown={(e) => handleKeyPress(e, "grade")}
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
                          className="w-20 px-2 py-1 border rounded"
                          autoFocus
                        />
                        <button
                          onClick={() => handleEditSave("grade", student.id)}
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
                          className="p-1 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
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
                        className={`px-2 py-1 rounded cursor-pointer hover:bg-gray-100 ${
                          isPassing
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                        onClick={() =>
                          handleEditStart("grade", student.id, {
                            gradeId: grade.id,
                            currentValue: grade.score,
                          })
                        }
                      >
                        {grade.score.toFixed(1)}
                      </span>
                    )}
                  </td>
                );
              })}
              <td className="px-6 py-4 whitespace-nowrap">
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
                  className={`font-semibold ${
                    student.finalGrade >
                    course.exams.reduce((acc, exam) => acc + exam.maxScore, 0) /
                      2
                      ? "text-green-800 bg-green-100"
                      : "text-red-800 bg-red-100"
                  } px-2 py-1 rounded`}
                >
                  {student.finalGrade.toFixed(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => {
                    if (
                      confirmAction("¿Está seguro de eliminar este estudiante?")
                    ) {
                      onDeleteStudent(student.id);
                    }
                  }}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!student && (
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            value={newExamName}
            onChange={(e) => setNewExamName(e.target.value)}
            placeholder="Nombre del nuevo examen"
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
            className="block w-full px-2 py-1 text-sm border rounded"
          />
          <button
            onClick={handleAddExam}
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
            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
          >
            <PlusCircle className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
