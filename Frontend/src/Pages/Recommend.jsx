import React from 'react'
import { FaBrain, FaDatabase, FaLaptop, FaRobot, FaUserCog } from 'react-icons/fa'
import { FaArrowRightLong } from 'react-icons/fa6'
import { IoRocketSharp } from 'react-icons/io5'

const Recommend = () => {
  return (
    <div>
      <div className='bg-sky-100 min-h-screen rounded-xl w-full'>
        <div className='flex flex-col justify-center items-center'>

          <div className="bg-purple-100 text-purple-700 px-6 py-2 rounded-full flex items-center gap-2 font-medium mt-20">
            <FaRobot />AI Recommendation Engine</div>

          <h1 className="text-7xl font-bold text-center max-w-6xl mt-6 leading-tight">
            Discover Your Next
            <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Perfect Laptop
            </span>
          </h1>

          <p className="text-xl text-slate-600 text-center max-w-3xl mt-8">
            Personalized laptop recommendations powered by machine learning,
            market intelligence, and performance analysis.
          </p>

          <a href="/Recommendation" className='mt-15 mb-10 '><div className='mega-glow-btn text-xl font-semibold bg-green-500 px-5 py-3 rounded-full text-white flex items-center gap-2 border-2 border-green-700 hover:bg-green-300 ' > <IoRocketSharp  />Let Start Recommending <FaArrowRightLong  /></div></a>

          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-12 w-full max-w-6xl">

            <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-semibold text-lg">AI Powered</h3>
              <p className="text-sm text-gray-500 mt-2">
                Advanced machine learning recommendation engine.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg">Instant Results</h3>
              <p className="text-sm text-gray-500 mt-2">
                Get personalized laptop suggestions in seconds.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-lg">95%  Smart Matching</h3>
              <p className="text-sm text-gray-500 mt-2">
                Recommendations tailored to your exact needs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-lg">Market Analysis</h3>
              <p className="text-sm text-gray-500 mt-2">
                Uses real laptop specifications and trends.
              </p>
            </div>

          </div>

          <div className='mt-25 mb-10'>
            <div className='text-3xl font-semibold flex items-center justify-center mb-8'>How It Works ?</div>

            <div className='flex flex-row justify-between items-center w-full space-x-10 bg-white rounded-xl p-6'>

              {/* Step 1 */}
              <div className='flex flex-col items-center'>
                <div className='h-20 w-20 bg-blue-200 rounded-xl flex items-center justify-center shadow-xl hover:bg-blue-300 transition-all'>
                  <FaUserCog className='h-10 w-10 text-blue-700' />
                </div>

                <div className='font-semibold mt-6'>1. Select Preferences</div>
                <div className='mt-3 w-60 text-center text-gray-600'>Choose your budget, usage type, RAM, storage and preferred brand.</div>
              </div>

              <FaArrowRightLong className='text-3xl text-slate-400' />

              {/* Step 2 */}
              <div className='flex flex-col items-center'>
                <div className='h-20 w-20 bg-green-200 rounded-xl flex items-center justify-center shadow-xl hover:bg-green-300 transition-all'>
                  <FaDatabase className='h-10 w-10 text-green-700' />
                </div>

                <div className='font-semibold mt-6'>2. Analyze Requirements</div>

                <div className='mt-3 w-60 text-center text-gray-600'>
                  Lapify processes your requirements and compares thousands of laptops.
                </div>
              </div>

              <FaArrowRightLong className='text-3xl text-slate-400' />

              {/* Step 3 */}
              <div className='flex flex-col items-center'>
                <div className='h-20 w-20 bg-purple-200 rounded-xl flex items-center justify-center shadow-xl hover:bg-purple-300 transition-all'>
                  <FaBrain className='h-10 w-10 text-purple-700' />
                </div>

                <div className='font-semibold mt-6'>3. AI Recommendation</div>

                <div className='mt-3 w-60 text-center text-gray-600'>
                  Our recommendation engine calculates the best laptop matches.
                </div>
              </div>

              <FaArrowRightLong className='text-3xl text-slate-400' />

              {/* Step 4 */}
              <div className='flex flex-col items-center'>
                <div className='h-20 w-20 bg-yellow-200 rounded-xl flex items-center justify-center shadow-xl hover:bg-yellow-300 transition-all'>
                  <FaLaptop className='h-10 w-10 text-yellow-700' />
                </div>

                <div className='font-semibold mt-6'>4. Get Results</div>
                <div className='mt-3 w-60 text-center text-gray-600'>
                  Receive personalized laptop recommendations with match scores.
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Recommend
