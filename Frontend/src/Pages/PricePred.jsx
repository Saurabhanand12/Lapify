import React, { useState } from 'react'
import Navbar from '../Pages/Navbar.jsx'
import axios from 'axios';

const PricePred = () => {

    const [input, setInput] = useState({
        brand: "Dell",
        type_name: "Notebook",
        ram: 8,
        cpu_brand: "Intel Core i3",
        weight: "1.8",
        gpu_brand: "Intel",
        hdd: 0,
        ssd: 512,
        os: "Windows",
        touchscreen: "No",
        ips: "No",
    });

    const [price, setPrice] = useState(null);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handlePredict = async () => {
        try {
            const osMap = {
                Windows: "Windows",
                Mac: "Mac",
                Linux: "Others/No OS/Linux",
            };

            const res = await axios.post('http://localhost:8001/predict', {
                Company: input.brand,
                TypeName: input.type_name,
                Ram: Number(input.ram),
                Weight: Number(input.weight),
                Touchscreen: input.touchscreen === "Yes" ? 1 : 0,
                Ips: input.ips === "Yes" ? 1 : 0,
                Cpu_brand: input.cpu_brand,
                HDD: Number(input.hdd),
                SSD: Number(input.ssd),
                Gpu_brand: input.gpu_brand,
                os: osMap[input.os] || "Others/No OS/Linux",
            });

            setPrice(res.data["Predicted Price"]);

            await axios.post("http://localhost:8000/api/v2/history/add",
            {
                activity_type: "prediction",
                data: {
                    input,
                    predicted_price: res.data
                }
            },{withCredentials: true});

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-sky-100 flex justify-center items-center p-8">

                <div className="w-full max-w-6xl rounded-3xl bg-gray-200 p-10 shadow-[0_20px_60px_rgba(14,165,233,0.15)]
border border-sky-200">

                    <h1 className="text-5xl font-bold text-center mb-5"> Laptop Price Prediction</h1>
                    <p className="text-center mb-10">Enter your laptop specifications and get an AI-powered price prediction instantly.</p>

                    <div className="grid md:grid-cols-2 gap-6  ">
                        <div>
                            <label className=" block mb-2 " >Brand</label>
                            <select className="w-full p-4 rounded-xl bg-white/20 border-2 border-blue-500 " name="brand" value={input.brand} onChange={handleChange}>
                                <option className="text-black">Dell</option>
                                <option className="text-black">HP</option>
                                <option className="text-black">Lenovo</option>
                                <option className="text-black">Asus</option>
                                <option className="text-black">Apple</option>
                                <option className="text-black">Microsoft</option>
                                <option className="text-black">Xiaomi</option>
                                <option className="text-black">Google</option>
                                <option className="text-black">Samsung</option>
                                <option className="text-black">LG</option>
                                <option className="text-black">Chuwi</option>
                                <option className="text-black">MSI</option>
                                <option className='text-black'>Razer</option>
                            </select>
                        </div>


                        <div>
                            <label className="mb-2 block"  >Laptop Type</label>
                            <select className="w-full p-4 rounded-2xl bg-white/10 border-2 border-blue-500" name="type_name" value={input.type_name} onChange={handleChange}>
                                <option className="text-black" >Notebook</option>
                                <option className="text-black">Gaming</option>
                                <option className="text-black">Ultrabook</option>
                                <option className="text-black">Workstation</option>
                                <option className="text-black">NetBook</option>
                                <option className="text-black">2 in 1 Convertible</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block" >RAM</label>
                            <select className="w-full p-4 rounded-2xl bg-white/10 border-2 border-blue-500" name="ram" value={input.ram} onChange={handleChange}>
                                <option className="text-black" value="2">2 GB</option>
                                <option className="text-black" value="4">4 GB</option>
                                <option className="text-black" value="6">6 GB</option>
                                <option className="text-black" value="8">8 GB</option>
                                <option className="text-black" value="12">12 GB</option>
                                <option className="text-black" value="16">16 GB</option>
                                <option className="text-black" value="24">24 GB</option>
                                <option className="text-black" value="32">32 GB</option>
                                <option className="text-black" value="64">64 GB</option>
                            </select>
                        </div>

                        <div>
                            <label className=" block mb-2">Processor</label>
                            <select className="w-full p-4 rounded-xl bg-white/20  border-2 border-blue-500" name="cpu_brand" value={input.cpu_brand} onChange={handleChange}>
                                <option className="text-black">Intel Core i3</option>
                                <option className="text-black">Intel Core i5</option>
                                <option className="text-black">Intel Core i7</option>
                                <option className="text-black">Other Intel Processor</option>
                                <option className="text-black">AMD Processor</option>
                            </select>
                        </div>


                        <div>
                            <label className="mb-2 block" >Weight</label>
                            <input
                                type="number"
                                placeholder="1.8 kg"
                                className="w-full p-4 rounded-2xl bg-white/10 border-2 border-blue-500  placeholder-black"
                                name="weight" value={input.weight} onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block" >GPU</label>
                            <select className="w-full p-4 rounded-2xl bg-white/10 border-2 border-blue-500 " name="gpu_brand" value={input.gpu_brand} onChange={handleChange}>
                                <option className="text-black">Intel</option>
                                <option className="text-black">Nvidia</option>
                                <option className="text-black">AMD</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block" >HDD</label>
                            <input type="Number" placeholder="0" list="hdd" name="hdd" value={input.hdd} onChange={handleChange} className="w-full p-4 rounded-2xl bg-white/10 border-2 border-blue-500 placeholder-black" />

                            <datalist id="hdd">
                                <option value="0" />
                                <option value="32" />
                                <option value="128" />
                            </datalist>
                        </div>

                        <div>
                            <label className="mb-2 block">SSD</label>
                            <input type="Number" placeholder="512 GB" list="ssd" name="ssd" value={input.ssd} onChange={handleChange} className="w-full p-4 rounded-2xl bg-white/10 border-2 border-blue-500 " />

                            <datalist id="ssd">
                                <option value="64" />
                                <option value="128" />
                                <option value="256" />
                                <option value="512" />
                                <option value="768" />
                                <option value="1000" />
                            </datalist>
                        </div>

                        <div>
                            <label className="mb-2 block"> Operating System</label>
                            <select className="w-full p-4 rounded-2xl bg-white/10 border-2 border-blue-500" name="os" value={input.os} onChange={handleChange}>
                                <option className="text-black">Windows</option>
                                <option className="text-black">Mac</option>
                                <option className="text-black">Linux</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2">Touchscreen</label>
                            <select className="w-full p-4 rounded-xl bg-white/20 border-2 border-blue-500" name="touchscreen" value={input.touchscreen} onChange={handleChange}>
                                <option className="text-black">No</option>
                                <option className="text-black">Yes</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2">IPS Display</label>
                            <select className="w-full p-4 rounded-xl bg-white/20  border-2 border-blue-500" name="ips" value={input.ips} onChange={handleChange}>
                                <option className="text-black">No</option>
                                <option className="text-black">Yes</option>
                            </select>
                        </div>

                    </div>

                    <div className="flex justify-center mt-10">
                        <button onClick={handlePredict} className="group relative overflow-hidden px-12 py-4 rounded-full bg-green-500 text-white font-bold text-xl shadow-2xl hover:scale-105 transition duration-500 border-2 border-green-500 hover:bg-green-900">

                            <span className="absolute top-0 left-[-100%] h-full w-1/2 bg-white/20 skew-x-12 group-hover:left-[150%] transition-all duration-700"></span>

                            <span className="relative">
                                🚀 Predict Price
                            </span>

                        </button>
                    </div>
                    {price !== null && (
                        <div className="mt-10 p-6 bg-white rounded-xl shadow-lg text-center">
                            <h3 className="text-2xl font-bold">
                                Predicted Laptop Price
                            </h3>

                            <p className="text-4xl text-green-600 mt-4 font-bold">
                                ₹ {price}
                            </p>
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}

export default PricePred
