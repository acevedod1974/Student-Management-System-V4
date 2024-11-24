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

/**
 * Props for the GradesTable component.
 */
interface GradesTableProps {
  course: Course;
  student?: Student;
  onDeleteStudent: (studentId: string) => void;
}

/**
 * GradesTable Component
 *
 * This component displays a table of grades for students in a course. It allows editing grades,
 * adding and deleting exams, and deleting students.
 *
 * @param {GradesTableProps} props - The props for the GradesTable component.
 * @returns {JSX.Element} The GradesTable component.
 */
export const GradesTable: React.FC<GradesTableProps> = ({
  course,
  student,
  onDeleteStudent,
}) => {
  const {
    updateGrade,
    updateStudent,
    updateExamDescription,
    addExam,
    deleteExam,
    updateExamMaxScore,
  } = useCourseStore();

  // State to manage the currently editing cell for grades
  const [editingCell, setEditingCell] = useState<{
    studentId: string;
    gradeId: string;
    currentValue: number;
  } | null>(null);

  // State to manage the currently editing student
  const [editingStudent, setEditingStudent] = useState<{
    id: string;
    firstName: string;
    lastName: string;
  } | null>(null);

  // State to manage the currently editing exam description
  const [editingExam, setEditingExam] = useState<number | null>(null);
  const [newExamDescription, setNewExamDescription] = useState<string>("");
  const [newExamName, setNewExamName] = useState<string>("");
  const [editingMaxScore, setEditingMaxScore] = useState<number | null>(null);
  const [newMaxScore, setNewMaxScore] = useState<number>(100);

  const navigate = useNavigate();

  /**
   * Handle starting the edit of a cell.
   *
   * @param {string} type - The type of the cell being edited (grade, student, exam, maxScore).
   * @param {string} id - The ID of the item being edited.
   * @param {number | string | { gradeId: string; currentValue: number }} value - The current value of the cell.
   */
  const handleEditStart = (
    type: "grade" | "student" | "exam" | "maxScore",
    id: string,
    value: number | string | { gradeId: string; currentValue: number }
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
        setEditingStudent({ id, firstName: value as string, lastName: "" });
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
   * Handle saving the edited cell.
   *
   * @param {string} type - The type of the cell being edited (grade, student, exam, maxScore).
   * @param {string} id - The ID of the item being edited.
   */
  const handleEditSave = (
    type: "grade" | "student" | "exam" | "maxScore",
    id: string
  ) => {
    switch (type) {
      case "grade":
        if (editingCell) {
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
        toast.success("Puntuación máxima actualizada");
        break;
    }
  };

  /**
   * Handle key press events for editing cells.
   *
   * @param {React.KeyboardEvent} e - The keyboard event.
   * @param {string} type - The type of the cell being edited (grade, student, exam, maxScore).
   * @param {number} [index] - The index of the item being edited.
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
   * Handle adding a new exam.
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
   * Handle deleting an exam.
   *
   * @param {number} index - The index of the exam to delete.
   */
  const handleDeleteExam = (index: number) => {
    if (confirmAction("¿Está seguro de eliminar este examen?")) {
      deleteExam(course.id, index);
      toast.success("Examen eliminado exitosamente");
    }
  };

  /**
   * Handle navigating to the student detail page.
   *
   * @param {string} studentId - The ID of the student to navigate to.
   */
  const handleNameClick = (studentId: string) => {
    navigate(`/course/${course.id}/student/${studentId}`);
  };

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
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {editingExam === index ? (
                  <input
                    type="text"
                    value={newExamDescription}
                    onChange={(e) => setNewExamDescription(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, "exam", index)}
                    className="block w-full px-2 py-1 text-sm border rounded"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() =>
                      handleEditStart("exam", index.toString(), exam.name)
                    }
                    className="cursor-pointer"
                  >
                    {exam.name}
                  </span>
                )}
                {editingMaxScore === index ? (
                  <input
                    type="number"
                    value={newMaxScore}
                    onChange={(e) => setNewMaxScore(Number(e.target.value))}
                    onKeyDown={(e) => handleKeyPress(e, "maxScore", index)}
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
                    className="cursor-pointer"
                  >
                    Max: {exam.maxScore}
                  </span>
                )}
                <button
                  onClick={() => handleDeleteExam(index)}
                  className="ml-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <MinusCircle className="w-4 h-4" />
                </button>
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
                    onClick={() => handleNameClick(student.id)}
                    className="cursor-pointer text-blue-600 hover:underline"
                  >
                    {student.firstName} {student.lastName}
                  </span>
                  {editingStudent?.id === student.id && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingStudent.firstName}
                        onChange={(e) =>
                          setEditingStudent({
                            ...editingStudent,
                            firstName: e.target.value,
                          })
                        }
                        onKeyDown={(e) => handleKeyPress(e, "student")}
                        className="block w-full px-2 py-1 text-sm border rounded"
                        autoFocus
                      />
                      <input
                        type="text"
                        value={editingStudent.lastName}
                        onChange={(e) =>
                          setEditingStudent({
                            ...editingStudent,
                            lastName: e.target.value,
                          })
                        }
                        onKeyDown={(e) => handleKeyPress(e, "student")}
                        className="block w-full px-2 py-1 text-sm border rounded"
                      />
                      <button
                        onClick={() => handleEditSave("student", student.id)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </td>
              {course.exams.map((exam, index) => {
                const grade = student.grades.find(
                  (g) => g.examName === exam.name
                );
                return (
                  <td key={exam.name} className="px-6 py-4 whitespace-nowrap">
                    {editingCell?.studentId === student.id &&
                    editingCell.gradeId === exam.name ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editingCell.currentValue}
                          onChange={(e) =>
                            setEditingCell({
                              ...editingCell,
                              currentValue: Number(e.target.value),
                            })
                          }
                          onKeyDown={(e) => handleKeyPress(e, "grade")}
                          className="block w-full px-2 py-1 text-sm border rounded"
                          autoFocus
                        />
                        <button
                          onClick={() => handleEditSave("grade", exam.name)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span
                        onClick={() =>
                          handleEditStart("grade", student.id, {
                            gradeId: exam.name,
                            currentValue: grade ? grade.score : 0,
                          })
                        }
                        className="cursor-pointer"
                      >
                        {grade ? grade.score : 0}
                      </span>
                    )}
                  </td>
                );
              })}
              <td className="px-6 py-4 whitespace-nowrap">
                {student.grades.reduce((acc, grade) => acc + grade.score, 0)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDeleteStudent(student.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
            className="block w-full px-2 py-1 text-sm border rounded"
          />
          <button
            onClick={handleAddExam}
            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
          >
            <PlusCircle className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
