// import React, { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const ResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v2/user/resetpassword/${token}`,
//         { password }
//       );

//       toast.success(res.data.message);

//       navigate("/login");
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
//           Reset Password
//         </h1>

//         <input
//           type="password"
//           placeholder="New Password"
//           className="border w-full p-3 rounded-lg mb-4"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="border w-full p-3 rounded-lg mb-6"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />

//         <button className="w-full bg-green-600 text-white py-3 rounded-lg">
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;