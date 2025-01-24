
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, useNavigation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const navigate = useNavigate();

    

  
    const handleLogin = async (e) => {
        console.log(isSubmitting);
        
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
          navigate("/add-product");
        } catch (err) {
          console.error("Login error:", err.response || err);
          setError(
            err.response?.data?.message || "Invalid email or password. Please try again."
          );
        }
        console.log(isSubmitting);
        
      };
      
  
    return (
      <div className="min-h-screen w-screen flex  items-center justify-center bg-gray-100">
        <Form
           method='post'
          className="bg-white p-6  w-1/3 rounded-xl shadow-md "
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
  
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <Input
            variant="filled"
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
            variant="filled"
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

           <div className="divider hidden text-sm">OR</div>
  
          <button
            type="submit"
            className="w-full btn bg-slate-800 hover:bg-black text-white rounded-xl   py-2 flex items-center justify-center transition"
          >
              {isSubmitting ? (
        <>
         <span className="loading loading-dots loading-sm"></span>
         
        </>
      ) : (
        'Login'
      )}
          </button>
        </Form>
      </div>
    );
  };
  
export default Login