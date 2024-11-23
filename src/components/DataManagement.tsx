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
import { Download, Upload } from "lucide-react";
import { useStudentStore } from "../store/useStudentStore";
import toast from "react-hot-toast";

/**
 * DataManagement Component
 *
 * This component provides functionality for exporting and importing student data.
 * It includes buttons to trigger the export and import actions.
 *
 * @returns {JSX.Element} The DataManagement component.
 */
export const DataManagement: React.FC = () => {
  const { exportData, importData } = useStudentStore();

  /**
   * Handle exporting student data to a JSON file.
   *
   * This function retrieves the student data from the store, creates a JSON file,
   * and triggers a download of the file.
   */
  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `students-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Datos exportados exitosamente");
  };

  /**
   * Handle importing student data from a JSON file.
   *
   * This function reads the selected JSON file, parses its content,
   * and updates the student data in the store.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event triggered by selecting a file.
   */
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        importData(content);
        toast.success("Datos importados exitosamente");
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        <Download className="w-4 h-4" />
        Exportar Datos
      </button>
      <label className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
        <Upload className="w-4 h-4" />
        Importar Datos
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
};
