import React from "react";

const PrimaryButton = ({
  onClick,
  disabled,
  loading,
  label,
  variant = "primary", // primary | secondary
}) => {
  const baseClasses =
    "inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

  const variantClasses =
    variant === "primary"
      ? "border-transparent text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500"
      : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary-500";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses}`}>
      {loading ? "Loading..." : label}
    </button>
  );
};

export default PrimaryButton;
