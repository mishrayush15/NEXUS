import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase/firebase";
import { setPersistence, browserSessionPersistence } from "firebase/auth";

const Login = () => {
  const { userLoggedin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (userLoggedin) {
      navigate("/");
    }
  }, [userLoggedin]);

  const handleSubmit = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      await doSignInWithEmailAndPassword(formData.email, formData.password);
      alert("Login successful!");
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error.message || "Login failed");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      await doSignInWithGoogle();
      alert("Logged in with Google!");
      navigate("/");
    } catch (error: any) {
      console.error("Google login error:", error);
      alert(error.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <img
        src="/images/bgimg.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      />
      <div className="absolute inset-0 bg-black/50 z-[-1]" />

      <div className="w-full max-w-md relative">
        <div className="relative z-10 backdrop-blur-xl bg-black/50 rounded-3xl p-12 overflow-hidden border border-black/40">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Login
          </h2>

          <div className="flex flex-col gap-6">
            {/* Email Field */}
            <div className="relative">
              <svg
                className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-white/70 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full py-4 pl-12 pr-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-base focus:outline-none focus:ring-2 focus:ring-white/30 placeholder:text-white/70"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <svg
                className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-white/70 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full py-4 pl-12 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-base focus:outline-none focus:ring-2 focus:ring-white/30 placeholder:text-white/70"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-white/70 hover:text-white">
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-xl font-semibold text-gray-800 bg-[#f4e3b5] text-base transition-transform transform hover:scale-105 hover:shadow-xl active:scale-95">
              Login
            </button>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium text-base flex items-center justify-center gap-3 transition-transform hover:scale-105 hover:shadow-xl active:scale-95">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Register Link */}
            <div className="text-center text-white/90 mt-6 text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-semibold underline hover:text-white">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
