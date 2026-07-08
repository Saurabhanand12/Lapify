import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "./Navbar";
import { IoEyeOutline , IoEyeOff } from "react-icons/io5";

const Changepassword = () => {
  const { userProfile } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const ChangepasswordHandler = async () => {
    try {
      if (!input.oldPassword || !input.newPassword || !input.confirmPassword) {
        return toast.error("Please fill all password fields");
      }

      if (input.newPassword !== input.confirmPassword) {
        return toast.error("Passwords do not match");
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v2/user/changepassword",
        {
          oldPassword: input.oldPassword,
          newPassword: input.newPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setInput({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-sky-200 p-8">

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Change Password
          </h2>

          <div className="grid gap-6">

            {/* Email */}
            <div>
              <p className="text-gray-700 mb-2">Email</p>
              <input
                type="email"
                value={userProfile?.email}
                readOnly
                className="w-full border rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Current Password */}
            <div>
              <p className="text-gray-700 mb-2">Current password</p>
              <div className="relative flex items-center w-full">
                <input
                  name="oldPassword"
                  type={showPassword.oldPassword ? "text" : "password"}
                  value={input.oldPassword}
                  onChange={handleChange}
                  className="w-full pl-4 pr-16 py-3 bg-gray-200 rounded-xl focus:outline-none"
                  placeholder="Enter Current Password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("oldPassword")}
                  className="absolute right-4 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  {showPassword.oldPassword ? <IoEyeOutline className="h-6 w-6 text-bold" /> : <IoEyeOff className="h-6 w-6 text-bold" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <p className="text-gray-700 mb-2">New password</p>
              <div className="relative flex items-center w-full">
                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={input.newPassword}
                  onChange={handleChange}
                  className="w-full pl-4 pr-16 py-3 bg-gray-200 rounded-xl focus:outline-none"
                  placeholder="Enter New Password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute right-4 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  {showPassword.newPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <p className="text-gray-700 mb-2">Confirm New password</p>
              <div className="relative flex items-center w-full">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-4 pr-16 py-3 bg-gray-200 rounded-xl focus:outline-none"
                  placeholder="Confirm New Password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-4 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  {showPassword.confirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

          </div>

          {/* Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={ChangepasswordHandler}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Changepassword;
