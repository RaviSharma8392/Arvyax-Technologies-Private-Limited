import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/AlertMessage";
import SessionCard from "../../components/Card/SessionCard";
import SesssionAPI from "../../services/api/sessionApi";

const MySessions = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSessions = async () => {
      setLoading(true);
      try {
        const data = await SesssionAPI.fetchSession();
        if (data.success) {
          setSessions(data.data.sessions);
        } else {
          setError("Failed to load sessions.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Sessions
          </h1>
          <button
            onClick={() => navigate("/dashboard/sessions/new")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
            + New Session
          </button>
        </div>

        {/* Error alert */}
        {error && (
          <div className="mb-6">
            <Alert type="error" message={error} />
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : sessions.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              No sessions yet
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Start by creating your first session.
            </p>
            <button
              onClick={() => navigate("/dashboard/sessions/new")}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
              Create Session
            </button>
          </div>
        ) : (
          /* Sessions grid */
          <div className="overflow-hidden sm:rounded-lg">
            <SessionCard data={sessions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MySessions;
