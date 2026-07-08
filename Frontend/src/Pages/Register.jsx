import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAuthUser } from '../Redux/authSlice';


const Register = () => {
  const {userProfile,user} = useSelector(store => store.auth);
  const [input , setInput] = useState({
    username : "",
    email : "",
    password :""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) =>{
    setInput({...input,[e.target.name]:e.target.value});
  }

  const [loading , setLoading] = useState(false);

  const registerHandler = async (e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/v2/user/register",input,{
        headers:{
          'Content-Type' : "application/json",
        },
        withCredentials: true,
      });
      if(res.data.success){
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message,{style:{background:"white",borderRadius:"10px"}});
        setInput({
          username:"",
          email:"",
          password:""
        });
      }
      
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || "Unable to reach the server . Please make sure the backend is running.";
      toast.error(message,{style:{background : "white",borderRadius : "10px"}});
    } finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    if(user){
      navigate("/");
    }
  },[]);

  return (
   <div className="min-h-screen flex justify-center items-center bg-slate-100 p-4">
  <div className="bg-sky-300 w-full max-w-6xl rounded-2xl shadow-xl p-8 flex flex-col lg:flex-row items-center justify-center gap-8">

    {/* Left Side */}
    <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-8 flex justify-center">
      <form
        onSubmit={registerHandler}
        className="w-full max-w-md flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">
          Create an Account
        </h1>

        <div className="w-full mb-2 font-semibold">
          Full Name
        </div>
        <input
          type="text"
          name="username"
          value={input.username}
          onChange={changeEventHandler}
          placeholder="Enter Username..."
          className="w-full p-3 mb-4 border rounded-full outline-none"
        />

        <div className="w-full mb-2 font-semibold">
          Email Address
        </div>
        <input
          type="email"
          name="email"
          value={input.email}
          onChange={changeEventHandler}
          placeholder="Enter Email..."
          className="w-full p-3 mb-4 border rounded-full outline-none"
        />

        <div className="w-full mb-2 font-semibold">
          Password
        </div>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={changeEventHandler}
          placeholder="Enter Password..."
          className="w-full p-3 mb-6 border rounded-full outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full text-lg transition"
        >
          {loading ? "Creating..." : "Create an Account"}
        </button>

        <p className="mt-5 text-center">
          Already have an Account?{" "}
          <a href="/Login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>

    {/* Right Side */}
    <div className="w-full lg:w-1/2 flex justify-center items-center">
      <img
        src="/register.png"
        alt="register"
        className="max-h-[500px] w-auto object-contain"
      />
    </div>

  </div>
</div>
  )
}

export default Register
