
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

  
    const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post(
            "http://localhost:8080/user/login",
            {
              email: email,
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          toast.success("login successfully")
          setError("");
        } catch (err) {
          console.error("Login error:", err.response || err);
          setError(
            err.response?.data?.message || "Invalid email or password. Please try again."
          );
        }
      };
      
  
    return (
      <div className="min-h-screen w-screen flex  items-center justify-center bg-gray-100">
        <form
          className="bg-white p-6  w-1/3 rounded-xl shadow-md "
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
  
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              id="email"
              className="w-full px-3 py-2  h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <Input.Password
              type="password"
              id="password"
              className="w-full px-3 py-2 h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              required
            />
          </div>
  
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

           <div className="divider text-sm">OR</div>
  
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  };
  
export default Login