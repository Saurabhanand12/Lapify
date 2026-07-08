// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/v2/user/forgetpassword",
//         { email }
//       );

//       toast.success(res.data.message);

//       console.log(res.data.resetLink); // Remove in production
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form
//         onSubmit={submitHandler}
//         className="bg-white p-8 rounded-lg shadow-lg w-[400px]"
//       >
//         <h1 className="text-3xl font-bold text-center mb-6">
//           Forgot Password
//         </h1>

//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="border w-full p-3 rounded-lg mb-5"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
//           Send Reset Link
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;