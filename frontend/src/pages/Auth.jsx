import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie"; // Securely store JWT tokens
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
  
    const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
    const endpoint = isLogin ? `${API_BASE_URL}/auth/login/` : `${API_BASE_URL}/auth/signup/`;
  
    console.log("🔵 Sending request to:", endpoint);
    console.log("📤 Payload:", { username, password });
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      console.log("🟢 Response Status:", response.status);
  
      const data = await response.json();
      console.log("🟢 Response Data:", data);
  
      if (response.ok) {
        Cookies.set("authToken", data.access, { expires: 7 });
        alert(isLogin ? "Login successful!" : "Signup successful!");
        navigate("/profile");
      } else {
        setErrorMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("🔴 Fetch Error:", error);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://backend:8000/auth/google/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set("authToken", data.access, { expires: 7 }); // Store JWT securely
        alert("Google login successful!");
        navigate("/profile");
      } else {
        setErrorMessage(data.error || "Google login failed.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-800 text-white">
        <div className="p-10 bg-white bg-opacity-10 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

          {errorMessage && (
            <div className="bg-red-500 text-white p-3 mb-4 rounded">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="p-3 rounded bg-white bg-opacity-20"/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-3 rounded bg-white bg-opacity-20"/>
            <button type="submit" className={`p-3 rounded font-bold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setErrorMessage("Google login failed.")} />

          <button className="mt-4 text-sm" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create an account" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
