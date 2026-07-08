import React from 'react'
import { FaBalanceScale, FaExchangeAlt, FaLaptop, FaRocket, FaTrophy } from 'react-icons/fa'
import { FaArrowRightLong } from 'react-icons/fa6'
import { IoBarChart, IoRocketSharp } from 'react-icons/io5'
import { MdOutlinePriceCheck } from 'react-icons/md'
import { BsGraphUp } from "react-icons/bs";


const Compare = () => {
    return (
        <div className='bg-sky-100'>
            <div className="flex flex-col items-center">

                <div className="bg-blue-200 px-6 py-2 rounded-full flex items-center gap-2 mt-15"><FaBalanceScale /> Laptop Comparison Tool </div>

                <h1 className="text-7xl font-bold text-center mt-6">
                    Compare
                    <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Laptops Side-by-Side
                    </span>
                </h1>

                <p className="text-xl text-slate-600 mt-6 text-center max-w-3xl">
                    Compare specifications, performance, pricing and features
                    to make the best buying decision.
                </p>

                <a href="/CompareLaptop" className='mt-15 mb-10 '><div className='mega-glow-btn text-xl font-semibold bg-blue-500 px-5 py-3 rounded-full text-white flex items-center gap-2 border-2 border-blue-700 hover:bg-blue-300 ' > <IoRocketSharp />Let Start Comparing <FaArrowRightLong /></div></a>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto mt-12">

                    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all">
                        <div className="text-3xl mb-3"><FaBalanceScale className='text-blue-500'/></div>
                        <h3 className="font-semibold text-lg">Smart Comparison</h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Compare laptops side-by-side with detailed specifications.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all">
                        <div className="text-3xl mb-3"><FaRocket className='text-green-500'/></div>
                        <h3 className="font-semibold text-lg">Performance Focus</h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Evaluate speed, multitasking and hardware capabilities.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all">
                        <div className="text-3xl mb-3"><BsGraphUp className='text-pink-500' /></div>
                        <h3 className="font-semibold text-lg">Detailed Insights</h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Get a clear breakdown of strengths and weaknesses.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all">
                        <div className="text-3xl mb-3"><FaTrophy className='text-yellow-500'/></div>
                        <h3 className="font-semibold text-lg">Better Buying Decision</h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Choose the laptop that best matches your requirements.
                        </p>
                    </div>

                </div>

                <div className='mt-25 mb-10'>
                    <div className='text-3xl font-semibold flex items-center justify-center mb-8'>
                        How It Works ?
                    </div>

                    <div className='flex flex-row justify-between items-center w-full space-x-10 bg-white rounded-xl p-6'>

                        {/* Step 1 */}
                        <div className='flex flex-col items-center'>
                            <div className='h-20 w-20 bg-blue-200 rounded-xl flex items-center justify-center shadow-xl hover:bg-blue-300 transition-all'>
                                <FaLaptop className='h-10 w-10 text-blue-700' />
                            </div>

                            <div className='font-semibold mt-6'>
                                1. Select Laptop 1
                            </div>

                            <div className='mt-3 w-60 text-center text-gray-600'>
                                Choose the first laptop you want to compare.
                            </div>
                        </div>

                        <FaArrowRightLong className='text-3xl text-slate-400' />

                        {/* Step 2 */}
                        <div className='flex flex-col items-center'>
                            <div className='h-20 w-20 bg-green-200 rounded-xl flex items-center justify-center shadow-xl hover:bg-green-300 transition-all'>
                                <FaExchangeAlt className='h-10 w-10 text-green-700' />
                            </div>

                            <div className='font-semibold mt-6'>
                                2. Select Laptop 2
                            </div>

                            <div className='mt-3 w-60 text-center text-gray-600'>
                                Pick another laptop to compare side-by-side.
                            </div>
                        </div>

                        <FaArrowRightLong className='text-3xl text-slate-400' />

                        {/* Step 3 */}
                        <div className='flex flex-col items-center'>
                            <div className='h-20 w-20 bg-purple-200 rounded-xl flex items-center justify-center shadow-xl hover:bg-purple-300 transition-all'>
                                <FaBalanceScale className='h-10 w-10 text-purple-700' />
                            </div>

                            <div className='font-semibold mt-6'>
                                3. Compare Specs
                            </div>

                            <div className='mt-3 w-60 text-center text-gray-600'>
                                Analyze processor, RAM, storage, GPU, display and price.
                            </div>
                        </div>

                        <FaArrowRightLong className='text-3xl text-slate-400' />

                        {/* Step 4 */}
                        <div className='flex flex-col items-center'>
                            <div className='h-20 w-20 bg-yellow-200 rounded-xl flex items-center justify-center shadow-xl hover:bg-yellow-300 transition-all'>
                                <FaTrophy className='h-10 w-10 text-yellow-700' />
                            </div>

                            <div className='font-semibold mt-6'>
                                4. Make Better Choice
                            </div>

                            <div className='mt-3 w-60 text-center text-gray-600'>
                                Find the laptop that offers the best value and performance.
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Compare
