import React from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

const SaveStatusIndicator = ({ saveStatus, lastSaved }) => {
  const baseClasses =
    "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition";

  const variants = {
    saving: "bg-blue-50 text-blue-600",
    saved: "bg-green-50 text-green-700",
    error: "bg-red-50 text-red-600",
  };

  return (
    <div className="flex items-center space-x-2">
      {saveStatus === "saving" && (
        <span className={`${baseClasses} ${variants.saving}`}>
          <ArrowPathIcon className="h-4 w-4 mr-1 animate-spin" />
          Saving...
        </span>
      )}

      {saveStatus === "saved" && lastSaved && (
        <span className={`${baseClasses} ${variants.saved}`}>
          <CheckCircleIcon className="h-4 w-4 mr-1" />
          Saved{" "}
          {lastSaved.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      )}
      {/* savestaus */}
      {saveStatus === "error" && (
        <span className={`${baseClasses} ${variants.error}`}>
          <ExclamationCircleIcon className="h-4 w-4 mr-1" />
          Save failed
        </span>
      )}
    </div>
  );
};

export default SaveStatusIndicator;
