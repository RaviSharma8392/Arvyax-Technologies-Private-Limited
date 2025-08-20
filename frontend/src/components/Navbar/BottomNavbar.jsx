import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Plus, User } from "lucide-react";

export const BottomNavbar = () => {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/dashboard/sessions", icon: BookOpen, label: "Sessions" },
    { to: "/dashboard/sessions/new", icon: Plus, label: "Create" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30 md:hidden">
      <div className="flex justify-around p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center p-2 rounded-lg text-xs ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`}>
              <Icon size={20} />
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavbar;
