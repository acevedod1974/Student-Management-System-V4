import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-gray-900 text-3xl font-bold hover:underline flex items-center"
        >
          <Home className="w-8 h-8 mr-2" />
          Student Management System
        </Link>
      </div>
    </nav>
  );
};
