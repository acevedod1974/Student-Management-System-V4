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
import { X } from "lucide-react";
import toast from "react-hot-toast";

interface StudentFormProps {
  courseId: string;
  onSubmit: (
    courseId: string,
    student: {
      firstName: string;
      lastName: string;
      id: string;
      finalGrade: number;
    }
  ) => void;
  onClose: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  courseId,
  onSubmit,
  onClose,
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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    finalGrade: 0,
  });

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{8}$/.test(formData.id)) {
      toast.error("La ID debe ser un número de 8 dígitos");
      return;
    }
    onSubmit(courseId, formData);
    toast.success("Estudiante agregado exitosamente");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Agregar Nuevo Estudiante</h2>
          <button
            onClick={onClose}
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
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              ID (8 dígitos)
            </label>
            <input
              type="text"
              required
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
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
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
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
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Agregar Estudiante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
