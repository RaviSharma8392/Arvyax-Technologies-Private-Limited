import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with decorative elements */}
        <div className="bg-green-600 p-6 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-green-700 opacity-20"></div>
          <div className="absolute -bottom-16 -right-10 w-32 h-32 rounded-full bg-green-500 opacity-30"></div>

          <div className="relative z-10 text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-ping"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-leaf text-4xl text-white"></i>
              </div>
            </div>
            <h1 className="text-8xl font-bold text-white mb-2">404</h1>
            <p className="text-green-100 font-medium">Page not found</p>
          </div>
        </div>

        {/* Content area */}
        <div className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Oops! This wellness path doesn't exist.
          </h2>
          <p className="text-gray-600 mb-6">
            You seem to have wandered off your wellness journey. Don't worry -
            even the best paths sometimes lead to unexpected places.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2">
              <i className="fas fa-home"></i>
              Go to Dashboard
            </Link>
            <Link
              to="/sessions"
              className="px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg shadow-sm hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2">
              <i className="fas fa-heart"></i>
              Explore Sessions
            </Link>
          </div>

          <Link
            to="/"
            className="text-green-600 hover:text-green-700 transition-colors duration-300 text-sm flex items-center justify-center gap-1">
            <i className="fas fa-arrow-left"></i>
            Return to Login Page
          </Link>
        </div>

        {/* Decorative footer */}
        <div className="bg-green-50 p-4 flex justify-center gap-6 text-green-800">
          <i className="fas fa-spa"></i>
          <i className="fas fa-heart"></i>
          <i className="fas fa-seedling"></i>
          <i className="fas fa-wind"></i>
          <i className="fas fa-mountain"></i>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
