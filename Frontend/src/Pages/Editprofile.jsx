import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "sonner";
import { setUserProfile } from "../Redux/authSlice";

const Editprofile = () => {
    const { userProfile } = useSelector((store) => store.auth);

    const [loading, setLoading] = useState(false);
    const [profilepic, setProfilepic] = useState(null);
     
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        profilepic: "",
    });

    useEffect(() => {
        if (userProfile) {
            setInput({
                username: userProfile.username || "",
                email: userProfile.email || "",
                password: "",
                profilepic: userProfile.profilepic || "",
            });
        }
    }, [userProfile]);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const fileChangeHandler = (e) => {
        setProfilepic(e.target.files[0]);
    };

    const saveProfileHandler = async () => {
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("username", input.username);

            if (profilepic) {
                formData.append("profilepic", profilepic);
            }

            const res = await axios.put("http://localhost:8000/api/v2/user/profile/edit",formData,{
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                dispatch(setUserProfile(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="min-h-screen bg-sky-200 p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
                    
                    {/* Profile Header */}
                    <div className="flex flex-col items-center gap-4 mb-10">
                        <img
                            src={
                                profilepic
                                    ? URL.createObjectURL(profilepic)
                                    : input.profilepic ||
                                      `https://ui-avatars.com/api/?name=${input?.username}`
                            }
                            alt="Profile"
                            className="h-28 w-28 rounded-full border-4 border-white shadow-md"
                        />

                        <h1 className="text-4xl font-bold">
                            {input?.username || "User"}
                        </h1>
                    </div>

                    {/* Form */}
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Account Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        
                        {/* Username */}
                        <div>
                            <p className="text-gray-700 mb-2">Username</p>
                            <input
                                type="text"
                                name="username"
                                value={input?.username}
                                onChange={changeEventHandler}
                                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        {/* Email (Read Only) */}
                        <div>
                            <p className="text-gray-700 mb-2">Email</p>
                            <input
                                type="email"
                                value={input.email}
                                readOnly
                                className="w-full border rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* Profile Picture Upload */}
                        <div>
                            <p className="text-gray-700 mb-2">
                                Profile Picture
                            </p>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={fileChangeHandler}
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <p className="text-gray-700 mb-2">Role</p>
                            <h3 className="font-semibold text-lg">
                                {userProfile?.role}
                            </h3>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={saveProfileHandler}
                            disabled={loading}
                            className="px-6 py-3 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 disabled:bg-gray-400"
                        >
                            {loading ? "Saving..." : "Save Profile"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editprofile;