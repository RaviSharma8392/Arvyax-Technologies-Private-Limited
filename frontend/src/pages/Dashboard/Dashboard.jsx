import { useEffect, useState } from "react";
import SessionCard from "../../components/Card/SessionCard";
import SesssionAPI from "../../services/api/sessionAPI";
import Button from "../../components/Buttons/Button";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?"))
      return;

    const response = await SesssionAPI.deleteSession(id);
    if (response.success) {
      setSessions((prev) => prev.filter((s) => s._id !== id));
      alert("Session deleted successfully");
    } else {
      alert("Failed to delete session: " + response.error);
    }
  };

  // fetchSessions function
  const fetchSessions = async () => {
    try {
      const data = await SesssionAPI.fetchAllSession();
      if (data.success) {
        setSessions(data.data.sessions);
      } else {
        setError("Failed to load published sessions");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // calling fetch session function
    fetchSessions();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading published sessions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center h-96">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 max-w-md w-full">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={fetchSessions}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Published Sessions
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Browse all published teaching and learning sessions
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button to="/dashboard/sessions/new">New Session</Button>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No published sessions
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new session.
              </p>
              <div className="mt-6">
                <Button to="/dashboard/sessions/new">New Session</Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden sm:rounded-md">
          <SessionCard data={sessions} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
