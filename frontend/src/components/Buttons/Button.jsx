import { NavLink } from "react-router-dom";

const Button = ({ to, children, variant = "primary" }) => {
  const baseClasses =
    "px-4 py-2 font-medium rounded-lg text-sm shadow-sm transition-colors duration-200";
  const variants = {
    primary: "bg-blue-600 text-white border border-blue-700 hover:bg-blue-700",
    secondary: "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50",
    ghost:
      "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50",
  };

  return (
    <NavLink to={to} className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </NavLink>
  );
};

export default Button;
