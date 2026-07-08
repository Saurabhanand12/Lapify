import React, { useState } from 'react'
import Navbar from '../Pages/Navbar.jsx'
import axios from 'axios';

const Compareform = () => {

    const [input, setInput] = useState({
        laptop1: "",
        laptop2: "",
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }


    const comparehandle = async () => {
        try {
            setLoading(true);

            const res = await axios.post('http://localhost:8004/compare', {
                laptop1: input.laptop1,
                laptop2: input.laptop2,
            });

            setResult(res.data);

            await axios.post("http://localhost:8000/api/v2/history/add",{
            activity_type: "comparison",
            data: {
            laptop1: res.data.matched_laptop1,
            laptop2: res.data.matched_laptop2,
            winner: res.data.final_best_match,
            score: res.data.score
            }
        },
        {
            withCredentials: true
        });

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <Navbar />
            <div className='bg-sky-100 min-h-screen flex justify-center '>
                <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-6xl h-full min-h-100 mt-20">

                    <div className="text-center mb-8 ">
                        <h2 className="text-3xl font-bold">Compare Two Laptops</h2>

                        <p className="text-gray-500 mt-2">
                            Enter laptop names and get a detailed comparison.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 items-center">

                        {/* Laptop 1 */}
                        <div>
                            <label className="block mb-2 font-medium">Laptop 1 </label>

                            <input
                                type="text"
                                name='laptop1'
                                value={input.laptop1}
                                onChange={handleChange}
                                placeholder="Dell XPS 15"
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>

                        {/* VS */}
                        <div className="flex justify-center">
                            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                                VS
                            </div>
                        </div>

                        {/* Laptop 2 */}
                        <div>
                            <label className="block mb-2 font-medium">Laptop 2</label>
                            <input
                                type="text"
                                name='laptop2'
                                value={input.laptop2}
                                onChange={handleChange}
                                placeholder="HP Pavilion"
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>

                    </div>

                    <button onClick={comparehandle} disabled={loading} className=" w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white font-semibold text-lg hover:scale-[1.02] transition-all">{loading ? "Comparing..." : "Compare Laptops"}</button>



                    {result?.score && (
                        <div className="mt-10 bg-white rounded-3xl shadow-xl p-8">

                            <h2 className="text-4xl font-bold text-center mb-8">
                                Laptop Comparison Result
                            </h2>

                            {/* Winner */}
                            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center">
                                <h3 className="text-2xl font-bold">
                                    🏆 Best Laptop
                                </h3>

                                <p className="text-xl mt-2">
                                    {result?.final_best_match}
                                </p>
                            </div>

                            {/* Score */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">

                                <div className="bg-blue-50 p-5 rounded-2xl text-center">
                                    <h3 className="font-bold text-lg">
                                        {result.matched_laptop1}

                                    </h3>

                                    <p className="text-4xl font-bold text-blue-600">
                                        {result.score.laptop1}
                                    </p>
                                </div>

                                <div className="bg-purple-50 p-5 rounded-2xl text-center">
                                    <h3 className="font-bold text-lg">
                                        {result.matched_laptop2}
                                    </h3>

                                    <p className="text-4xl font-bold text-purple-600">
                                        {result.score.laptop2}
                                    </p>
                                </div>

                            </div>

                            {/* Comparison Table */}
                            <div className="overflow-x-auto">

                                <table className="w-full border-collapse">

                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-4 border">Feature</th>
                                            <th className="p-4 border">
                                                {result.laptop1.Company}
                                            </th>
                                            <th className="p-4 border">
                                                {result.laptop2.Company}
                                            </th>
                                            <th className="p-4 border">Winner</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <tr>
                                            <td className="border p-3 font-semibold">RAM</td>
                                            <td className="border p-3">
                                                {result.laptop1.Ram}
                                            </td>
                                            <td className="border p-3">
                                                {result.laptop2.Ram}
                                            </td>
                                            <td className="border p-3 text-green-600 font-bold">
                                                {result.better_ram}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border p-3 font-semibold">Storage</td>
                                            <td className="border p-3">
                                                {result.laptop1.Memory}
                                            </td>
                                            <td className="border p-3">
                                                {result.laptop2.Memory}
                                            </td>
                                            <td className="border p-3 text-green-600 font-bold">
                                                {result.better_storage}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border p-3 font-semibold">Processor</td>
                                            <td className="border p-3">
                                                {result.laptop1.Cpu}
                                            </td>
                                            <td className="border p-3">
                                                {result.laptop2.Cpu}
                                            </td>
                                            <td className="border p-3 text-green-600 font-bold">
                                                {result.better_processor}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border p-3 font-semibold">Screen</td>
                                            <td className="border p-3">
                                                {result.laptop1.ScreenResolution}
                                            </td>
                                            <td className="border p-3">
                                                {result.laptop2.ScreenResolution}
                                            </td>
                                            <td className="border p-3 text-green-600 font-bold">
                                                {result.better_screen}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border p-3 font-semibold">Price</td>
                                            <td className="border p-3">
                                                ₹{Math.round(result.laptop1.Price)}
                                            </td>
                                            <td className="border p-3">
                                                ₹{Math.round(result.laptop2.Price)}
                                            </td>
                                            <td className="border p-3 text-green-600 font-bold">
                                                {result.better_price}
                                            </td>
                                        </tr>

                                    </tbody>

                                </table>

                            </div>
                            <button
                        onClick={() =>
                            window.open(
                                `https://www.flipkart.com/search?q=${encodeURIComponent(
                                    result.final_best_match
                                )}`,
                                "_blank"
                            )
                        }
                        className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl"
                    >
                        Buy on Flipkart
                    </button>

                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Compareform
