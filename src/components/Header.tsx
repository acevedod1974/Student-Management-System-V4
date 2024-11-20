import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-gray-900 text-2xl font-bold hover:underline"
        >
          Student Management System
        </Link>
      </div>
    </nav>
  );
};
