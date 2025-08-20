import React from "react";

const AutoSaveNotice = () => (
  <div className="mt-4 flex items-center text-sm text-gray-500">
    <svg
      className="h-4 w-4 mr-1.5 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 
        11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>Changes are auto-saved every 5 seconds</span>
  </div>
);

export default AutoSaveNotice;
