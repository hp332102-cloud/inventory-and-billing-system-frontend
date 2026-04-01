import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", {
        mobile: mobile,
        password: password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      login(token);
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] relative overflow-hidden font-sans">
      
      {/* Animated background shapes using Tailwind arbitrary values & pulse for dynamic feel */}
      <div className="absolute rounded-full blur-[80px] z-0 animate-pulse w-[400px] h-[400px] bg-indigo-500/25 -top-[100px] -left-[100px] duration-1000"></div>
      <div className="absolute rounded-full blur-[80px] z-0 animate-pulse w-[500px] h-[500px] bg-pink-500/25 -bottom-[150px] -right-[100px] duration-700 delay-500"></div>
      <div className="absolute rounded-full blur-[80px] z-0 animate-pulse w-[300px] h-[300px] bg-sky-500/25 top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 duration-1000 delay-200"></div>

      <div className="bg-white/85 backdrop-blur-[20px] border border-white/50 rounded-[24px] p-12 w-full max-w-[420px] shadow-2xl z-10 flex flex-col mx-4 sm:mx-0">
        <div className="text-center mb-8">
          <h2 className="text-[28px] font-bold text-gray-900 mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-[15px] text-gray-500 m-0">Sign in to your account to continue</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              className="w-full px-4 py-[14px] bg-white/90 border border-gray-200 rounded-xl text-[15px] text-gray-800 transition-all duration-300 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 focus:bg-white placeholder-gray-400"
              type="text"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                className="w-full px-4 py-[14px] bg-white/90 border border-gray-200 rounded-xl text-[15px] text-gray-800 transition-all duration-300 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 focus:bg-white placeholder-gray-400 pr-12"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none flex justify-center items-center w-6 h-6 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="mt-3 p-[14px] bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl text-base font-semibold transition-all duration-300 shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(99,102,241,0.4)] active:translate-y-0 flex justify-center items-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;