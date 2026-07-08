import React from 'react'
import { FaBrain, FaLaptop, FaMicrochip, FaRobot } from 'react-icons/fa'
import { MdElectricBolt, MdOutlineVerifiedUser } from 'react-icons/md'
import { IoBarChart, IoRocketSharp } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import { FaArrowRightArrowLeft, FaArrowRightLong, FaCodeCompare, FaRightLeft } from 'react-icons/fa6';

const Predict = () => {
    return (
        <div className='bg-sky-100 min-h-screen rounded-xl w-full'>
            <div className='flex flex-col justify-center items-center'>

                <div className='bg-blue-200 rounded-full px-6 py-2 flex items-center justify-center mt-20 text-md'><FaRobot className='mr-2 text-blue-500' /> AI Price Preditor</div>
                <div className='font-bold text-7xl text-center max-w-5xl text-wrap mt-6'>Predict Laptop Price with
                    <div className='italic bg-gradient-to-r from-yellow-500 to-green-400 bg-clip-text text-transparent mt-4 font-extrabold  min-h-15'>AI Precision</div></div>

                <div className="mt-8 text-sky-900 max-w-4xl leading-relaxed text-xl">
                    Get Accurate Price Predictions based on spackfications, market trends , and historical data
                </div>

                <a href="/PricePrediction" className='mt-15 mb-10 '><div className='mega-glow-btn text-xl font-semibold bg-green-500 px-5 py-3 rounded-full text-white flex items-center gap-2 border-2 border-green-700 hover:bg-green-300' > <IoRocketSharp  />Let Start Predicting <FaArrowRightLong/></div></a>


                <div className='flex flex-row items-center space-x-20  mt-10'>
                    <div className='flex items-center gap-2'> <MdElectricBolt className='text-green-500 h-6 w-6' /> Instant & Accurate Predictions </div>
                    <div className='flex items-center gap-2' > <FaRobot className='text-blue-500 h-6 w-6' />Ai & Machine Learning </div>
                    <div className='flex items-center gap-2' > <IoBarChart className='text-pink-500 h-6 w-6' />Market Trend Analysis </div>
                    <div className='flex items-center gap-2' > <GoGoal className='text-yellow-600 h-6 w-6 text-bold' /> High Prediction Accuracy </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-4 gap-5 mt-20">
                    {/* Predicted Price */}
                    <div className="flex flex-col justify-center border-r border-gray-200 ">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                            <IoBarChart className='text-pink-500 h-6 w-6' />
                        </div>

                        <p className="text-sm text-gray-500">Predicted Price</p>

                        <h2 className="text-4xl font-bold text-blue-600 mt-2"> ₹78,500</h2>
                        <p className="text-xs text-gray-400 mt-2">Based on current market analysis</p>
                    </div>

                    {/* Confidence Score */}
                    <div className="flex flex-col items-center justify-center border-r border-gray-200">
                        <div className="relative w-24 h-24">
                            <div className="absolute inset-0 rounded-full border-[8px] border-green-200"></div>
                            <div
                                className="absolute inset-0 rounded-full border-[8px] border-green-500"
                                style={{
                                    clipPath: "polygon(0 0,100% 0,100% 94%,0 94%)"
                                }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-green-600"> 94%</div>
                        </div>
                        <p className="mt-3 text-sm text-gray-500">Confidence Score</p>
                        <p className="text-green-600 font-semibold text-sm">Very High Confidence</p>
                    </div>

                    {/* Price Range */}
                    <div className="flex flex-col justify-center border-r border-gray-200">
                        <p className="text-sm text-gray-500">Price Range (Expected)</p>
                        <h2 className="text-2xl font-bold text-blue-600 mt-3">₹75,000 - ₹82,000</h2>
                        <p className="text-xs text-gray-400 mt-3">Expected market price range</p>
                    </div>

                    {/* Market Trend */}
                    <div className="flex flex-col justify-center ml-10">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Market Trend</span>
                            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">Positive</span>
                        </div>

                        <div className="mt-4 h-20 flex items-end gap-2">
                            <div className="w-3 h-6 bg-purple-200 rounded"></div>
                            <div className="w-3 h-8 bg-purple-300 rounded"></div>
                            <div className="w-3 h-10 bg-purple-400 rounded"></div>
                            <div className="w-3 h-12 bg-purple-500 rounded"></div>
                            <div className="w-3 h-16 bg-purple-600 rounded"></div>
                            <div className="w-3 h-20 bg-purple-700 rounded"></div>
                        </div>

                        <p className="text-xs text-gray-500 mt-3">Prices are trending up by 6.2% this month</p>
                    </div>

                </div>

                 <div className='mt-25 mb-10'>
                          <div className=' text-3xl font-semibold flex items-center justify-center mb-8 '> How its Works ? </div>
                          <div className='flex flex-row justify-between items-center w-full space-x-15 bg-white rounded-xl '>
                            <div className='flex flex-col mt-6 items-center  '>
                              <div className='h-20 w-20 bg-yellow-200 rounded-xl flex items-center justify-center shadow-xl hover:bg-yellow-300'><FaLaptop className='h-10 w-10 text-yellow-600' /></div>
                              <div className='font-semibold mt-6'>1. Enter Your Details </div>
                              <div className='mt-3 w-60 text-center mb-5'> Provide Your Laptop Specification.</div>
                            </div>
                            <FaArrowRightLong className='text-3xl text-slate-400 hover:text-slate-500' />
                            <div className='flex flex-col mt-6 items-center '>
                              <div className='h-20 w-20 bg-green-300 rounded-xl flex items-center justify-center shadow-xl hover:bg-green-400'><FaBrain className='h-10 w-10 text-green-900' /></div>
                              <div className='font-semibold mt-6'>2. Ai Analyzes </div>
                              <div className='mt-3 w-60 text-center mb-5'> Our Ai analyzes Market Data and Trends.</div>
                            </div>
                            <FaArrowRightLong className='text-3xl text-slate-400 hover:text-slate-500' />
                            <div className='flex flex-col mt-6 items-center '>
                              <div className='h-20 w-20 bg-purple-300 rounded-xl flex items-center justify-center shadow-xl hover:bg-purple-400'><IoBarChart className='h-10 w-10 text-purple-900' /></div>
                              <div className='font-semibold mt-6'>3. Get Prediction </div>
                              <div className='mt-3 w-60 text-center mb-5'> Receive the Accurate Price Prediction Instantly. </div>
                            </div>
                
                          </div>
                </div>

            </div>
        </div>
    )
}

export default Predict
