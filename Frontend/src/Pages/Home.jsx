import React from 'react'
import { MdElectricBolt, MdOutlineVerifiedUser } from "react-icons/md";
import { FaArrowRight, FaAward, FaLaptop, FaRegStar, FaSearch, FaSmile, FaTrophy, FaUsers } from "react-icons/fa";
import { FaArrowRightLong, FaCodeCompare, FaMicrochip, FaRobot } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { BsDatabaseCheck } from "react-icons/bs";
import { GrCompliance } from "react-icons/gr";
import { TbMoneybag } from "react-icons/tb";
import { RiPriceTag3Line } from "react-icons/ri";

const Home = () => {
  return (
    <div className='bg-sky-100 min-h-screen w-full rounded-xl'>
      <div className='flex min-h-[40vh] flex-col justify-center items-center px-6 gap-6'>

        <div className='bg-sky-200 rounded-full px-6 py-2 flex items-center justify-center mt-20 text-md'><FaRobot className='mr-2 text-sky-500' /> AI-Powered Laptop Recommendations</div>
        <div className='font-bold text-5xl text-center max-w-5xl text-wrap mt-6'>Smart Laptop Recommendations
          Powered By <div className='italic bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent mt-4 font-extrabold h-13 '>Artificial Intelligence.</div></div>

        <div className="mt-3 text-gray-700 max-w-xl leading-relaxed text-xl">
          Compare, predict, and discover the best laptops for gaming,
          coding, study, and professional work—all in one place.
        </div>

        <a href="/Recommend" className='cursor-pointer text-xl font-semibold border-2 border-pink-700 rounded-full text-white bg-pink-500 py-3 px-7 items-center flex gap-3 hover:bg-pink-600 mt-6'> <FaSearch /> Find My Laptop <FaArrowRight className='ml-2' /></a>

        <div className='flex flex-row items-center space-x-20  mt-10'>
          <div className='flex items-center gap-2'> <MdOutlineVerifiedUser className='text-green-500 h-6 w-6' /> 100%  Reliable AI Predictions</div>
          <div className='flex items-center gap-2' > <MdElectricBolt className='text-blue-500 h-6 w-6' />Save Time & Effort </div>
          <div className='flex items-center gap-2' > <RiPriceTag3Line className='text-pink-500 h-6 w-6' />Best Price Guaranteed </div>
          <div className='flex items-center gap-2' > <FaRegStar className='text-yellow-500 h-6 w-6' /> Top Brand Included </div>
        </div>

        {/* Scroll bar */}
        <div className='mt-20 overflow-hidden w-full'>
          <div className='text-3xl  text-center mt-2 mb-20 font-semibold'> Works with Many Brands </div>
          <div className="flex items-center justify-center gap-20 animate-scroll">
            <div className="w-16 h-16 transition-all duration-300 hover:scale-110">
              <img src="delllogo.jpg" alt="Dell" className="rounded-full w-full h-full object-cover" />
            </div>
            <div className="w-30 transition-all duration-300 hover:scale-110">
              <img src="asus.png" alt="asus" className="w-full h-full object-cover" />
            </div>
            <div className="w-16 h-16 transition-all duration-300 hover:scale-110">
              <img src="hplogo.svg" alt="HP" className="rounded-full w-full h-full object-cover" />
            </div>
            <div className="w-26 transition-all duration-300 hover:scale-110">
              <img src="acer.png" alt="acer" className="w-full h-full object-cover " />
            </div>
            <div className="w-16 h-16 transition-all duration-300 hover:scale-110">
              <img src="maclogo.png" alt="mac" className="w-full h-full object-cover" />
            </div>
            <div className="w-40 h-10  transition-all duration-300 hover:scale-110">
              <img src="sam.png" alt="samsung" className="w-full h-full object-cover" />
            </div>
            <div className="w-35  transition-all duration-300 hover:scale-110">
              <img src="lenovo.png" alt="acer" className="w-full h-full object-cover" />
            </div>

            <div className="w-16 h-16 transition-all duration-300 hover:scale-110">
              <img src="delllogo.jpg" alt="Dell" className="rounded-full w-full h-full object-cover" />
            </div>
            <div className="w-30 transition-all duration-300 hover:scale-110">
              <img src="asus.png" alt="asus" className="w-full h-full object-cover" />
            </div>

            <div className="w-16 h-16 transition-all duration-300 hover:scale-110">
              <img src="hplogo.svg" alt="HP" className="rounded-full w-full h-full object-cover" />
            </div>

            <div className="w-26 transition-all duration-300 hover:scale-110">
              <img src="acer.png" alt="acer" className="w-full h-full object-cover " />
            </div>
            <div className="w-16 h-16 transition-all duration-300 hover:scale-110">
              <img src="maclogo.png" alt="mac" className="w-full h-full object-cover" />
            </div>
            <div className="w-40 h-10  transition-all duration-300 hover:scale-110">
              <img src="sam.png" alt="samsung" className="w-full h-full object-cover" />
            </div>
            <div className="w-35  transition-all duration-300 hover:scale-110">
              <img src="lenovo.png" alt="acer" className="w-full h-full object-cover" />
            </div>
            <div className="w-16 h-16 transition-all duration-300 hover:scale-110">
              <img src="delllogo.jpg" alt="Dell" className="rounded-full w-full h-full object-cover" />
            </div>
            <div className="w-30 transition-all duration-300 hover:scale-110">
              <img src="asus.png" alt="asus" className="w-full h-full object-cover" />
            </div>

            <div className="w-16 h-16 transition-all duration-300 hover:scale-110">
              <img src="hplogo.svg" alt="HP" className="rounded-full w-full h-full object-cover" />
            </div>

            <div className="w-26 transition-all duration-300 hover:scale-110">
              <img src="acer.png" alt="acer" className="w-full h-full object-cover " />
            </div>
          </div>

        </div>

        {/* how its work */}
        <div className='mt-25'>
          <div className=' text-3xl font-semibold flex items-center justify-center mb-8 '> How Lapify.ai Works </div>
          <div className='flex flex-row justify-between items-center w-full space-x-15'>
            <div className='flex flex-col mt-6 items-center  '>
              <div className='h-20 w-20 bg-blue-300 rounded-xl flex items-center justify-center shadow-xl hover:bg-blue-400'><LuNotebookPen className='h-10 w-10 text-blue-900' /></div>
              <div className='font-semibold mt-6'>1. Tell Us Your Needs </div>
              <div className='mt-3 w-60 text-center'> Answer a few simple questions about your usage and budget.</div>
            </div>
            <FaArrowRightLong className='text-3xl text-slate-400 hover:text-slate-500' />
            <div className='flex flex-col mt-6 items-center '>
              <div className='h-20 w-20 bg-green-300 rounded-xl flex items-center justify-center shadow-xl hover:bg-green-400'><FaMicrochip className='h-10 w-10 text-green-900' /></div>
              <div className='font-semibold mt-6'>2. Ai Analyzes </div>
              <div className='mt-3 w-60 text-center'> Our Ai analyzes thousands of laptops and performance data.</div>
            </div>
            <FaArrowRightLong className='text-3xl text-slate-400 hover:text-slate-500' />
            <div className='flex flex-col mt-6 items-center '>
              <div className='h-20 w-20 bg-purple-300 rounded-xl flex items-center justify-center shadow-xl hover:bg-purple-400'><FaLaptop className='h-10 w-10 text-purple-900' /></div>
              <div className='font-semibold mt-6'>3. Get Recommandations </div>
              <div className='mt-3 w-60 text-center'> Receive the best laptop recommendations for you </div>
            </div>
            <FaArrowRightLong className='text-3xl text-slate-400 hover:text-slate-500' />
            <div className='flex flex-col mt-6 items-center '>
              <div className='h-20 w-20 bg-yellow-200 rounded-xl flex items-center justify-center shadow-xl hover:bg-yellow-300'><FaCodeCompare className='h-10 w-10 text-yellow-900' /></div>
              <div className='font-semibold mt-6'>4. Compare & Decide </div>
              <div className='mt-3 w-60 text-center'> Compare specs , performance and prices. Choose confidently </div>
            </div>


          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 ">
          <div className="bg-white border rounded-3xl shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

              {/* Stat 1 */}
              <div className="flex items-center gap-4 px-6">
                <div className="h-16 w-16 rounded-2xl bg-purple-100 flex items-center justify-center">
                  <FaLaptop className="text-3xl text-purple-600" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold">5000+</h2>
                  <p className="text-gray-600 font-medium">Laptops Analyzed</p>
                </div>
              </div>

              <div className="hidden lg:block border-r border-gray-200 absolute"></div>

              <div className="flex items-center gap-4 px-6 border-l border-gray-200">
                <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center">
                  <FaUsers className="text-3xl text-green-600" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold">10,000+</h2>
                  <p className="text-gray-600 font-medium">Users Trust Lapify</p>
                </div>
              </div>

              <div className="flex items-center gap-4 px-6 border-l border-gray-200">
                <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <FaSmile className="text-3xl text-blue-600" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold">98%</h2>
                  <p className="text-gray-600 font-medium">Satisfaction Rate</p>
                </div>
              </div>

              <div className="flex items-center gap-4 px-6 border-l border-gray-200">
                <div className="h-16 w-16 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <FaAward className="text-3xl text-orange-600" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold ">100+</h2>
                  <p className="text-gray-600 font-medium">Brands Covered</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className='mt-15 space-x-30'>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium ">
            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
            Laptop Price Prediction
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-medium">
            <span className="h-2 w-2 rounded-full bg-pink-500"></span>
            Laptop Recommendation System
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Laptop Compare System
          </div>

        </div>

        {/* why choose lapify.ai */}
        <div className="py-16 px-10">
          <h1 className="text-4xl font-bold mb-10">Why Choose Lapify.ai?</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <div className="border rounded-2xl p-6 shadow-md bg-white hover:bg-slate-100">
              <div className="h-14 w-14 rounded-full bg-pink-100 flex items-center justify-center mb-4"><FaRobot className='w-6 h-6' /></div>
              <div className="text-xl font-semibold">AI Recommendation</div>
              <div className="text-gray-500 mt-2">Smart suggestions tailored to your needs.</div>
            </div>

            {/* Card 2 */}
            <div className="border rounded-2xl p-6 shadow-md bg-white hover:bg-slate-100">
              <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mb-4"><FaCodeCompare className='h-6 w-6' /></div>
              <div className="text-xl font-semibold">Smart Comparisons</div>
              <div className="text-gray-500 mt-2">Compare laptops side-by-side with ease.</div>
            </div>

            {/* Card 3 */}
            <div className="border rounded-2xl p-6 shadow-md bg-white hover:bg-slate-100">
              <div className="h-14 w-14 rounded-full bg-orange-100 flex items-center justify-center mb-4"><TbMoneybag className='w-6 h-6' /></div>
              <div className="text-xl font-semibold">Budget Friendly</div>
              <div className="text-gray-500 mt-2">Find the best laptops within your budget.</div>
            </div>

            {/* Card 4 */}
            <div className="border rounded-2xl p-6 shadow-md bg-white hover:bg-slate-100">
              <div className="h-14 w-14 rounded-full bg-yellow-100 flex items-center justify-center mb-4"><BsDatabaseCheck className='w-6 h-6' /></div>
              <div className="text-xl font-semibold">Latest Database</div>
              <div className="text-gray-500 mt-2">Access to up-to-date prices and specs.</div>
            </div>

            {/* Card 5 */}
            <div className="border rounded-2xl p-6 shadow-md bg-white hover:bg-slate-100">
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4"><MdElectricBolt className='h-6 w-6' /></div>
              <div className="text-xl font-semibold">Fast & Accurate</div>
              <div className="text-gray-500 mt-2">AI engine provides fast and accurate predictions.</div>
            </div>

            {/* Card 6 */}
            <div className="border rounded-2xl p-6 shadow-md bg-white hover:bg-slate-100">
              <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mb-4"><GrCompliance className='w-6 h-6' /></div>
              <div className="text-xl font-semibold">Personalized Results</div>
              <div className="text-gray-500 mt-2">Get results that match your unique requirements.</div>
            </div>

          </div>
        </div>

        {/* compare laptop  */}
        <div className="mt-4 flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-10">Compare Laptops Instantly</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-[900px]">

            {/* Header */}
            <div className="grid grid-cols-3 bg-green-400 text-white font-semibold text-lg">
              <div className="p-4">Feature</div>
              <div className="p-4 text-center">MacBook Air M3</div>
              <div className="p-4 text-center">Dell XPS 13</div>
            </div>

            {/* Processor */}
            <div className="grid grid-cols-3 border-b">
              <div className="p-4 font-medium">Processor</div>
              <div className="p-4 text-center">Apple M3</div>
              <div className="p-4 text-center">Intel Core Ultra 7</div>
            </div>

            {/* Graphics */}
            <div className="grid grid-cols-3 border-b">
              <div className="p-4 font-medium">Graphics</div>
              <div className="p-4 text-center">Integrated GPU</div>
              <div className="p-4 text-center">Intel Arc</div>
            </div>

            {/* RAM */}
            <div className="grid grid-cols-3 border-b">
              <div className="p-4 font-medium">RAM</div>
              <div className="p-4 text-center">16 GB</div>
              <div className="p-4 text-center">16 GB</div>
            </div>

            {/* Storage */}
            <div className="grid grid-cols-3 border-b">
              <div className="p-4 font-medium">Storage</div>
              <div className="p-4 text-center">512 GB SSD</div>
              <div className="p-4 text-center">1 TB SSD</div>
            </div>

            {/* Weight */}
            <div className="grid grid-cols-3 border-b">
              <div className="p-4 font-medium">Weight</div>
              <div className="p-4 text-center">1.24 kg</div>
              <div className="p-4 text-center">1.17 kg</div>
            </div>

            {/* Price */}
            <div className="grid grid-cols-3">
              <div className="p-4 font-medium">Price</div>
              <div className="p-4 text-center">₹1,14,999</div>
              <div className="p-4 text-center">₹1,24,999</div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-sky-300 to-emerald-400 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-2 text-black flex gap-3 items-center">
                <FaTrophy className='text-yellow-400' /> AI Recommendation
              </h3>

              <p className="text-lg text-black">
                Based on processor performance, battery life, portability, and overall value,
                <span className="font-bold"> MacBook Air M3 </span>
                is the best choice among these laptops.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl w-full mt-16 mb-20">
          <div className="bg-gradient-to-r from-yellow-200 to-pink-200 rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Compare Laptops
              </h2>
              <p className="text-gray-600 mt-3 max-w-xl">
                Compare specifications, performance, battery life, pricing,
                and AI predictions side-by-side to find the perfect laptop.
              </p>
            </div>

            <a href="/Compare"><button className="mt-6 md:mt-0 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl shadow-md transition-all duration-300 flex items-center">
              Compare Now <FaArrowRight className='ml-2 text-xl' />
            </button></a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
