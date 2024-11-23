import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const notice = `/**
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
 */`;

const fileExtensions = [".ts", ".tsx", ".js", ".jsx", ".html", ".css"];

function addNoticeToFile(filePath) {
  const ext = path.extname(filePath);
  if (!fileExtensions.includes(ext)) return;

  const content = fs.readFileSync(filePath, "utf8");
  if (content.includes(notice)) return;

  const newContent = `${notice}\n\n${content}`;
  fs.writeFileSync(filePath, newContent, "utf8");
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else {
      addNoticeToFile(filePath);
    }
  });
}

processDirectory(path.join(__dirname, "src"));
