import React, { useState } from 'react'
import Navbar from '../Pages/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setAuthUser } from '../Redux/authSlice';
import { toast } from 'sonner';
import useGetUserProfile from '../Hooks/useGetUserProfile';
import { useEffect } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";

const Profile = () => {

  const { user, userProfile } = useSelector(store => store.auth);
  const [openId, setOpenId] = useState(null);

  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const { _id } = useParams(userProfile);
  useGetUserProfile(userProfile._id);

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v2/user/logout', { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        nevigate('/login');
        toast.success(res.data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  }

  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState({
    username: userProfile?.username || " ",
  })

  useEffect(() => {
    if (userProfile) {
      setInput({
        username: userProfile.username,
      });
    }
  }, [userProfile]);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v2/history/get', { withCredentials: true });

      setHistory(res.data.historydata);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteHistory = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this history?");

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:8000/api/v2/history/delete/${id}`, { withCredentials: true });

      if (res.data.success) {
        setHistory((prev) =>
          prev.filter((item) => item._id !== id)
        );
        toast.success("History deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete history");
      console.log(error);
    }
  }

  const clearHistory = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all history?"
    );

    if (!confirmClear) return;

    try {
      const res = await axios.delete(
        "http://localhost:8000/api/v2/history/clear",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setHistory([]);
        toast.success("History cleared successfully");
      }

      if (res.data.success) {
        setHistory([]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const predictionCount = history.filter(
    (item) => item.activity_type === "prediction"
  ).length;

  const comparisonCount = history.filter(
    (item) => item.activity_type === "comparison"
  ).length;

  const recommendationCount = history.filter(
    (item) => item.activity_type == 'recommendation'
  ).length;

  // Wishlist 

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v2/wishlist/get', { withCredentials: true });

      setWishlist(res.data.wishlistdata);

    } catch (error) {
      console.log(error);
    }
  }

  /// Remove wishlist
  const removeWishlist = async (id) => {
    const confirmDelete = window.confirm("Remove this laptop from wishlist?");

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v2/wishlist/remove/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setWishlist((prev) =>
          prev.filter((item) => item._id !== id)
        );

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to remove wishlist");
    }
  };

  const handleWishlist = async (laptop) => {
    try {
      await addwishlist(laptop);

      fetchWishlist(); // refresh after adding
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="bg-sky-200 rounded-3xl p-8">
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <div className="flex items-center gap-6 flex justify-center items-center mb-8">

            <img
              src={
                userProfile?.profilepic ||
                `https://ui-avatars.com/api/?name=${userProfile?.username || "User"}`
              }
              alt=""
              className="h-28 w-28 rounded-full border-4 border-white"
            />
            <h1 className="text-4xl font-bold">{userProfile?.username}</h1>

          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">Account Information</h2>

          <div className="grid xl:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500">Full Name</p>
              <input type="text" value={input.username} readOnly onChange={(e) => setInput({ ...input, username: e.target.value })} placeholder={userProfile?.username} className='placeholder-black px-2 py-3 outline-none' />
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <input type="email" name="" id="" readOnly placeholder={userProfile?.email} className='placeholder-black px-2 py-3 outline-none' />
            </div>

            <div>
              <p className="text-gray-500">Role</p>
              <h3 className="font-semibold">{userProfile?.role}</h3>
            </div>

            <div>
              <p className="text-gray-500">Member Since</p>
              <h3 className="font-semibold text-black">{userProfile?.createdAt}</h3>
            </div>

          </div>
          <div className="grid md:grid-cols-4 gap-5 mt-8 text-center">

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-4xl font-bold text-purple-600">{predictionCount}</h3>
              <p className="text-gray-500 mt-2">Predictions</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-4xl font-bold text-blue-600">{recommendationCount}</h3>
              <p className="text-gray-500 mt-2">Recommendations</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-4xl font-bold text-green-600">{comparisonCount}</h3>
              <p className="text-gray-500 mt-2">Comparisons</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-4xl font-bold text-pink-600">{history.length}</h3>
              <p className="text-gray-500 mt-2">Total History</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

            <div className='flex justify-between mb-4 items-center'>
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              {
                history.length !== 0 && (
                  <button onClick={clearHistory} className='text-white font-bold border-2 border-red-600 rounded-full px-2 py-2 bg-red-500 hover:bg-red-600'>Clear All History</button>
                )
              }

            </div>

            <div className="space-y-5">

              {
                history.length === 0 ? (
                  <p className='text-center'>No History Found</p>
                ) : (
                  history.map((ele) => (
                    <div
                      key={ele._id}
                      className="bg-white shadow-lg rounded-xl p-6 mb-6 border"
                    >
                      {/* Header */}
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() =>
                          setOpenId(openId === ele._id ? null : ele._id)
                        }
                      >
                        <div>
                          <h2 className="text-xl font-bold capitalize">
                            {ele.activity_type}
                          </h2>

                          <p className="text-gray-500 text-sm">
                            {new Date(ele.createdAt).toLocaleString()}
                          </p>
                        </div>

                        <div className='flex justify-center items-center gap-6'>
                          <div className="text-xl">
                            {openId === ele._id ? (
                              <FaArrowUp />
                            ) : (
                              <FaArrowDown />
                            )}
                          </div>

                          {/* Delete Button */}
                          <span onClick={() => deleteHistory(ele._id)} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                            <MdDelete />
                          </span>
                        </div>
                      </div>

                      {/* Open Details */}
                      {openId === ele._id && (
                        <div className="mt-5">

                          {/* Recommendation */}
                          {ele.activity_type === "recommendation" && (
                            <>
                              <h3 className="font-semibold mb-3">
                                Recommended Laptops
                              </h3>

                              <ul className="space-y-2">
                                {ele.data.recommendations.map((laptop, index) => (
                                  <li
                                    key={index}
                                    className="border rounded-lg p-3 hover:bg-gray-50"
                                  >
                                    <p className="font-bold">
                                      {laptop.Company}
                                    </p>

                                    <p className="text-gray-600">
                                      {laptop.Cpu}
                                    </p>

                                    <p className="text-gray-600">
                                      {laptop.Ram} GB RAM • {laptop.Memory}
                                    </p>

                                    <p className="font-bold text-purple-600">
                                      ₹{laptop.Price}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}

                          {/* Prediction */}
                          {ele.activity_type === "prediction" && (
                            <>
                              <h3 className="font-semibold">
                                Predicted Price
                              </h3>

                              <p className="text-2xl text-green-600 font-bold mt-2">
                                ₹{ele.data.predicted_price}
                              </p>
                            </>
                          )}

                          {/* Comparison */}
                          {ele.activity_type === "comparison" && (
                            <>
                              <div className="border rounded-lg p-3 mb-3">
                                <h3 className="font-bold">Laptop 1</h3>

                                <p>{ele.data.laptop1.Company}</p>
                                <p>{ele.data.laptop1.Cpu}</p>
                              </div>

                              <div className="border rounded-lg p-3 mb-3">
                                <h3 className="font-bold">Laptop 2</h3>

                                <p>{ele.data.laptop2.Company}</p>
                                <p>{ele.data.laptop2.Cpu}</p>
                              </div>

                              <div className="bg-green-100 rounded-lg p-3">
                                <h3 className="font-bold text-green-700">
                                  Winner
                                </h3>

                                <p>{ele.data.winner.Company}</p>

                                <p>Score : {ele.data.score}</p>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )
              }
            </div>

          </div>
          <div className="flex  gap-4 mt-8 items-center justify-center">
            <Link to='/Editprofile'>
              <button className="px-6 py-3 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600">
                Edit Profile
              </button>
            </Link>
            <Link to='/changepassword'>
              <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700">
                Change Password
              </button>
            </Link>
            <button onClick={logoutHandler} className="px-6 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 ">
              Logout
            </button>

          </div>
        </div>
        <div className="mt-10 bg-white rounded-xl p-6">
          <h2 className="text-3xl font-bold mb-8"> ❤️ Wishlist Laptops </h2>

          {wishlist.filter((item) => item.laptop).length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-xl font-semibold text-gray-500">
                No Wishlist Found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist
                .filter((item) => item.laptop)
                .map((ele) => (
                  <div
                    key={ele._id}
                    className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">
                        {ele.laptop.Company}
                      </h3>

                      <MdDelete
                        onClick={() => removeWishlist(ele._id)}
                        className="h-6 w-6 text-red-400 hover:text-red-600 cursor-pointer"
                      />
                    </div>

                    <p className="text-gray-500 mt-2">
                      {ele.laptop.Cpu}
                    </p>

                    <p className="text-gray-500">
                      {ele.laptop.Ram} GB RAM • {ele.laptop.Memory}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{Math.round(ele.laptop.Price)}
                      </span>

                      <button
                        onClick={() =>
                          window.open(
                            `https://www.flipkart.com/search?q=${encodeURIComponent(
                              `${ele.laptop.Company} ${ele.laptop.Cpu}`
                            )}`,
                            "_blank"
                          )
                        }
                        className="bg-yellow-400 hover:bg-yellow-500 text-blue-600 font-bold px-4 py-2 rounded-lg"
                      >
                        View On Flipkart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile

