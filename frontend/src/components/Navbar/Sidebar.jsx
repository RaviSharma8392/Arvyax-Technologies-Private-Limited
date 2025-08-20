import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, LogOut, Home, BookOpen, Plus } from "lucide-react";

export const Sidebar = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/dashboard/sessions", icon: BookOpen, label: "My Sessions" },
    { to: "/dashboard/sessions/new", icon: Plus, label: "Create Session" },
  ];

  // Collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`hidden md:flex h-screen fixed flex-col bg-white shadow-xl  w-${
        isOpen ? "64" : "20"
      } transition-all duration-300`}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1
          className={`font-bold text-xl text-blue-600 ${!isOpen && "hidden"}`}>
          WellnessApp
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 space-y-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}>
              <Icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span className="ml-3">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div
          className={`flex items-center mb-4 ${!isOpen && "justify-center"}`}>
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            {currentUser?.email?.charAt(0).toUpperCase()}
          </div>
          {isOpen && (
            <div className="ml-3 overflow-hidden">
              <p className="text-xs text-gray-500 truncate">
                {currentUser?.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
