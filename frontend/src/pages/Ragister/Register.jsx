import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../../services/api/'authAPI.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword)
      return setError("All fields are required");
    if (!email.includes("@"))
      return setError("Please enter a valid email address");
    if (password !== confirmPassword) return setError("Passwords do not match");

    try {
      setIsLoading(true);

      const registerData = { email, password };
      const res = await authAPI.registerUser(registerData);

      if (res.success) {
        console.log("✅ Registration success:", res.data);
        window.alert("✅ Registration success");
        navigate("/"); // redirect to login
      } else {
        setError(res.error || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/"
              className="text-indigo-600 hover:text-indigo-500 font-medium">
              Sign in
            </a>
          </p>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 p-3 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-2 px-4 rounded-md text-white text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}>
            {isLoading && (
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A8 8 0 014 12H0c0 
                  3.04 1.13 5.82 3 7.94l3-2.65z"
                />
              </svg>
            )}
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
