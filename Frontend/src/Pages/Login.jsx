import { setAuthUser } from "../Redux/authSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
    
  const {user} = useSelector(store => store.auth);
  const [input , setInput] = useState({
    email :"",
    password : "",
  });
  const nevigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) =>{
    setInput({...input,[e.target.name] : e.target.value});
  }
  const [loading,setLoading] = useState(false);

  const loginHandler = async (e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v2/user/login',input,{
        headers:{
          'Content-Type' : 'application/json'
        },
        withCredentials:true,
      });
      if(res.data.success){
        dispatch(setAuthUser(res.data.user));
        nevigate('/');
        toast.success(res.data.message, { style: { background: "white", borderRadius: "10px" } });
        setInput({
          email: "",
          password: ""
        })
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong", { style: { background: "white", borderRadius: "10px" } });
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(user){
      nevigate("/");
    }
  },[]);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-4">
  <div className="bg-sky-300 w-full max-w-6xl rounded-2xl shadow-xl flex flex-col lg:flex-row overflow-hidden">

    {/* Left Side */}
    <div className="w-full lg:w-1/2 bg-white flex justify-center items-center p-8">
      <form
        method="POST"
        onSubmit={loginHandler}
        className="w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-center mb-10">
          Login
        </h1>

        <div className="font-semibold mb-2">
          Email Address
        </div>
        <input
          type="email"
          name="email"
          value={input.email}
          onChange={changeEventHandler}
          placeholder="Enter Your Email..."
          className="w-full p-3 mb-4 border rounded-full outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="font-semibold mb-2">
          Password
        </div>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={changeEventHandler}
          placeholder="Enter Your Password..."
          className="w-full p-3 mb-4 border rounded-full outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* <div className="flex justify-end mb-6 text-sm">

          <a
            href="/forgot-password"
            className="text-sky-500 hover:underline"
          >
            Forgot Password?
          </a>
        </div> */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded text-lg   hover:bg-blue-600 rounded-full"
        >
          Login
        </button>

        <p className="mt-6 text-center">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-red-500 hover:underline font-medium"
          >
            Create Account for Free
          </a>
        </p>
      </form>
    </div>

    {/* Right Side Image */}
    <div className="hidden lg:flex lg:w-1/2 justify-center items-center p-8">
      <img
        src="/login.png"
        alt="Login"
        className="max-h-[500px] w-auto object-contain"
      />
    </div>

  </div>
</div>
  );
};

export default Login;