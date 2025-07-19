/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, useNavigation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("kanhaiyapandey2232@gmail.com");
    const [password, setPassword] = useState("8877592600@Kp");
    const [error, setError] = useState("");
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const navigate = useNavigate();

    

  

      
  
    return (
      <div className="min-h-screen w-screen flex  items-center justify-center bg-gray-100">
        <Form
           method='post'
          className="bg-white p-6  w-1/3 rounded-xl shadow-md "
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
              name="email"
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
            name="password"
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