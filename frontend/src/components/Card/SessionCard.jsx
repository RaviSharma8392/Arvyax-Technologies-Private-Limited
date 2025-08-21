import React from "react";
import Button from "../Buttons/Button";
import PrimaryButton from "../Buttons/PrimaryButton";

const SessionCard = ({ data, onDelete }) => {
  // console.log(data);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((session) => (
        <div
          key={session._id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            {/* Status */}
            <div className="flex items-center space-x-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  session.status === "draft" ? "bg-yellow-400" : "bg-green-500"
                }`}></span>
              <span
                className={`text-xs font-medium uppercase ${
                  session.status === "draft"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}>
                {session.status}
              </span>
            </div>

            {/* Date */}
            <span className="text-xs text-gray-400">
              {new Date(session.updatedAt).toLocaleDateString()}
            </span>
          </div>

          {/* Body */}
          <div className="p-5 flex-grow">
            {/* Title + Icon */}
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-3">
                <svg
                  className="h-6 w-6 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 leading-snug line-clamp-2">
                {session.title}
              </h3>
            </div>

            {/* Tags */}
            {session.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {session.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    {tag}
                  </span>
                ))}
                {session.tags.length > 3 && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    +{session.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <svg
                className="w-4 h-4 mr-1.5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Updated {new Date(session.updatedAt).toLocaleDateString()}
            </div>
            <div className="flex gap-3.5">
              {session.user_id === currentUser?.user_id && (
                <Button
                  to={`/dashboard/sessions/edit/${session._id}`}
                  variant="primary">
                  Edit
                </Button>
              )}
              {/* delete button */}
              {session.user_id === currentUser?.user_id && (
                <PrimaryButton
                  onClick={() => onDelete(session._id)}
                  label="Delete"
                  variant="danger"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionCard;
