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

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Course, Student } from "../types/course";

/**
 * Zustand store for managing course-related state.
 *
 * This store includes functions for adding, deleting, and updating courses, students, and exams.
 * It also provides functions for exporting and importing course data.
 */
interface CourseStore {
  courses: Course[];
  selectedCourse: string | null;
  setSelectedCourse: (courseId: string | null) => void;
  addStudent: (
    courseId: string,
    student: Omit<Student, "id" | "grades">
  ) => void;
  deleteStudent: (courseId: string, studentId: string) => void;
  updateGrade: (
    courseId: string,
    studentId: string,
    gradeId: string,
    newScore: number
  ) => void;
  updateStudent: (
    courseId: string,
    studentId: string,
    updates: Partial<Omit<Student, "id" | "grades" | "finalGrade">>
  ) => void;
  exportData: () => string;
  importData: (jsonData: string) => void;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  updateExamDescription: (
    courseId: string,
    examIndex: number,
    newDescription: string
  ) => void;
  addExam: (courseId: string, examName: string) => void;
  deleteExam: (courseId: string, examIndex: number) => void;
  updateExamMaxScore: (
    courseId: string,
    examIndex: number,
    newMaxScore: number
  ) => void;
  addCourse: (course: Omit<Course, "id">) => void;
  deleteCourse: (courseId: string) => void;
}

/**
 * Helper function to calculate the final grade for a student.
 *
 * @param grades - Array of grade objects containing scores.
 * @returns The calculated final grade as a number.
 */
const calculateFinalGrade = (grades: { score: number }[]): number => {
  if (grades.length === 0) return 0;
  const totalScore = grades.reduce((acc, grade) => acc + grade.score, 0);
  return Number((totalScore / grades.length).toFixed(1));
};

/**
 * Helper function to generate a unique student ID.
 *
 * @returns A unique student ID as a string.
 */
const generateStudentId = (): string => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

// Create the Zustand store with persistence
export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      courses: [],
      selectedCourse: null,

      /**
       * Set the selected course.
       *
       * @param courseId - The ID of the course to select.
       */
      setSelectedCourse: (courseId) => set({ selectedCourse: courseId }),

      /**
       * Add a new student to a course.
       *
       * @param courseId - The ID of the course to add the student to.
       * @param studentData - The data of the student to add.
       */
      addStudent: (courseId, studentData) =>
        set((state) => {
          const course = state.courses.find((c) => c.id === courseId);
          if (!course) return state;

          const grades = course.exams.map((exam) => ({
            id: `grade-${crypto.randomUUID()}`,
            examName: exam.name,
            score: 0,
            maxScore: exam.maxScore,
          }));

          const newStudent: Student = {
            id: crypto.randomUUID(),
            ...studentData,
            studentId: generateStudentId(),
            grades,
            finalGrade: calculateFinalGrade(grades),
          };

          return {
            courses: state.courses.map((c) =>
              c.id === courseId
                ? { ...c, students: [...c.students, newStudent] }
                : c
            ),
          };
        }),

      /**
       * Delete a student from a course.
       *
       * @param courseId - The ID of the course to delete the student from.
       * @param studentId - The ID of the student to delete.
       */
      deleteStudent: (courseId, studentId) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  students: course.students.filter((s) => s.id !== studentId),
                }
              : course
          ),
        })),

      /**
       * Update a student's grade.
       *
       * @param courseId - The ID of the course the student belongs to.
       * @param studentId - The ID of the student whose grade is being updated.
       * @param gradeId - The ID of the grade to update.
       * @param newScore - The new score for the grade.
       */
      updateGrade: (courseId, studentId, gradeId, newScore) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  students: course.students.map((student) =>
                    student.id === studentId
                      ? {
                          ...student,
                          grades: student.grades.map((grade) =>
                            grade.id === gradeId
                              ? { ...grade, score: newScore }
                              : grade
                          ),
                          finalGrade: calculateFinalGrade(
                            student.grades.map((grade) =>
                              grade.id === gradeId
                                ? { ...grade, score: newScore }
                                : grade
                            )
                          ),
                        }
                      : student
                  ),
                }
              : course
          ),
        })),

      /**
       * Update a student's information.
       *
       * @param courseId - The ID of the course the student belongs to.
       * @param studentId - The ID of the student to update.
       * @param updates - The updates to apply to the student.
       */
      updateStudent: (courseId, studentId, updates) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  students: course.students.map((student) =>
                    student.id === studentId
                      ? { ...student, ...updates }
                      : student
                  ),
                }
              : course
          ),
        })),

      /**
       * Export course data as JSON.
       *
       * @returns The course data as a JSON string.
       */
      exportData: () => JSON.stringify(get().courses, null, 2),

      /**
       * Import course data from JSON.
       *
       * @param jsonData - The JSON data to import.
       */
      importData: (jsonData) => {
        try {
          const courses = JSON.parse(jsonData);
          if (Array.isArray(courses)) {
            set({ courses });
          }
        } catch (error) {
          console.error("Error importing data:", error);
        }
      },

      /**
       * Update course information.
       *
       * @param courseId - The ID of the course to update.
       * @param updates - The updates to apply to the course.
       */
      updateCourse: (courseId, updates) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId ? { ...course, ...updates } : course
          ),
        })),

      /**
       * Update exam description.
       *
       * @param courseId - The ID of the course the exam belongs to.
       * @param examIndex - The index of the exam to update.
       * @param newDescription - The new description for the exam.
       */
      updateExamDescription: (courseId, examIndex, newDescription) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  exams: course.exams.map((exam, index) =>
                    index === examIndex
                      ? { ...exam, name: newDescription }
                      : exam
                  ),
                }
              : course
          ),
        })),

      /**
       * Add a new exam to a course.
       *
       * @param courseId - The ID of the course to add the exam to.
       * @param examName - The name of the new exam.
       */
      addExam: (courseId, examName) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  exams: [
                    ...course.exams,
                    {
                      id: `exam-${crypto.randomUUID()}`,
                      name: examName,
                      maxScore: 100,
                    },
                  ],
                  students: course.students.map((student) => ({
                    ...student,
                    grades: [
                      ...student.grades,
                      {
                        id: `grade-${crypto.randomUUID()}`,
                        examName,
                        score: 0,
                        maxScore: 100,
                      },
                    ],
                  })),
                }
              : course
          ),
        })),

      /**
       * Delete an exam from a course.
       *
       * @param courseId - The ID of the course to delete the exam from.
       * @param examIndex - The index of the exam to delete.
       */
      deleteExam: (courseId, examIndex) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  exams: course.exams.filter((_, index) => index !== examIndex),
                  students: course.students.map((student) => ({
                    ...student,
                    grades: student.grades.filter(
                      (_, index) => index !== examIndex
                    ),
                  })),
                }
              : course
          ),
        })),

      /**
       * Update the maximum score for an exam.
       *
       * @param courseId - The ID of the course the exam belongs to.
       * @param examIndex - The index of the exam to update.
       * @param newMaxScore - The new maximum score for the exam.
       */
      updateExamMaxScore: (courseId, examIndex, newMaxScore) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  exams: course.exams.map((exam, index) =>
                    index === examIndex
                      ? { ...exam, maxScore: newMaxScore }
                      : exam
                  ),
                }
              : course
          ),
        })),

      /**
       * Add a new course.
       *
       * @param courseData - The data of the course to add.
       */
      addCourse: (courseData) =>
        set((state) => ({
          courses: [
            ...state.courses,
            {
              id: crypto.randomUUID(),
              ...courseData,
            },
          ],
        })),

      /**
       * Delete a course.
       *
       * @param courseId - The ID of the course to delete.
       */
      deleteCourse: (courseId) =>
        set((state) => ({
          courses: state.courses.filter((course) => course.id !== courseId),
        })),
    }),
    {
      name: "course-storage",
    }
  )
);
