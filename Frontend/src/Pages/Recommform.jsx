import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import { addwishlist, fetchWishlist, removeWishlist, } from '../Utils/wishlist';

const Recommform = () => {

    const [recommend, setRecommendations] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [input, setInput] = useState({
        min_price: 30000,
        max_price: 80000,
        ram: 8,
        rom: 512,
        company: '',
        type_name: 'Notebook',
        cpu: 'Intel Core i3'
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handelRecommend = async () => {
        try {
            const res = await axios.post('http://localhost:8002/recommend', {
                min_price: Number(input.min_price),
                max_price: Number(input.max_price),
                ram: Number(input.ram),
                rom: Number(input.rom),
                company: input.company,
                type_name: input.type_name,
                cpu: input.cpu,
            });

            setRecommendations(res.data);

            await axios.post("http://localhost:8000/api/v2/history/add", {
                activity_type: "recommendation",
                data: {
                    filters: input,
                    recommendations: res.data
                }
            },
                {
                    withCredentials: true
                }
            );

        } catch (error) {
            console.log(error);
        }
    }

    const loadWishlist = async () => {
        try {
            const data = await fetchWishlist();
            setWishlist(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadWishlist()
    }, []);

    const isWishlisted = (laptop) => {
        return wishlist.some(
            (item) =>
                item.laptop &&
                item.laptop.Company === laptop.Company &&
                item.laptop.Cpu === laptop.Cpu &&
                Number(item.laptop.Price) === Number(laptop.Price)
        );
    };

    const handleWishlist = async (laptop) => {
        try {

            const existingItem = wishlist.find(
                (item) =>
                    item.laptop &&
                    item.laptop.Company === laptop.Company &&
                    item.laptop.Cpu === laptop.Cpu &&
                    Number(item.laptop.Price) === Number(laptop.Price)
            );


            if (existingItem) {
                await removeWishlist(existingItem._id);
            }
            else {
                await addwishlist(laptop);
            }


            await loadWishlist();

        } catch (error) {
            console.log(error);
        }
    };




    return (
        <div>
            <div className='bg-sky-100'>
                <Navbar />
                <div className='flex justify-center items-center mt-15'>
                    <div className=" rounded-3xl shadow-xl p-8 w-full max-w-6xl bg-gray-200 mb-20">

                        <h2 className="text-3xl font-bold mb-10 text-center"> Find Your Perfect Laptop </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">

                            {/* Min Price */}
                            <div>
                                <label className="font-medium text-gray-700">Minimum Budget</label>

                                <input type="number" name='min_price' value={input.min_price} onChange={handleChange} className="w-full mt-2 border rounded-xl p-3" />
                            </div>

                            {/* Max Price */}
                            <div>
                                <label className="font-medium text-gray-700">Maximum Budget </label>

                                <input type="number" name='max_price' value={input.max_price} onChange={handleChange} className="w-full mt-2 border rounded-xl p-3" />
                            </div>

                            {/* RAM */}
                            <div>
                                <label className="font-medium text-gray-700"> RAM </label>

                                <select className="w-full mt-2 border rounded-xl p-3" name='ram' value={input.ram} onChange={handleChange}>
                                    <option value="4" >4 GB</option>
                                    <option value="8" >8 GB</option>
                                    <option value="16" >16 GB</option>
                                    <option value="32" >32 GB</option>
                                    <option value="64" >64 GB</option>
                                </select>
                            </div>

                            {/* Storage */}
                            <div>
                                <label className="font-medium text-gray-700">Storage</label>

                                <select className="w-full mt-2 border rounded-xl p-3" name='rom' value={input.rom} onChange={handleChange}>
                                    <option value="128">128 GB</option>
                                    <option value="256">256 GB</option>
                                    <option value="512">512 GB</option>
                                    <option value="1000"> 1 TB</option>
                                </select>
                            </div>

                            {/* Brand */}
                            <div>
                                <label className="font-medium text-gray-700">Brand</label>

                                <select className="w-full mt-2 border rounded-xl p-3" name='company' value={input.company} onChange={handleChange}>
                                    <option className="text-black" value="">Any Brand</option>
                                    <option className="text-black">HP</option>
                                    <option className="text-black">Dell</option>
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

                            {/* Type */}
                            <div>
                                <label className="font-medium text-gray-700">Laptop Type</label>

                                <select className="w-full mt-2 border rounded-xl p-3" name='type_name' value={input.type_name} onChange={handleChange}>
                                    <option className="text-black" >Notebook</option>
                                    <option className="text-black">Gaming</option>
                                    <option className="text-black">Ultrabook</option>
                                    <option className="text-black">Workstation</option>
                                    <option className="text-black">NetBook</option>
                                    <option className="text-black">2 in 1 Convertible</option>
                                </select>
                            </div>

                            {/* CPU */}
                            <div>
                                <label className="font-medium text-gray-700">Processor</label>

                                <select className="w-full mt-2 border rounded-xl p-3" name='cpu' value={input.cpu} onChange={handleChange}>
                                    <option className="text-black" value="Intel Core i3">Intel i3</option>
                                    <option className="text-black" value="Intel Core i5" >Intel i5</option>
                                    <option className="text-black" value="Intel Core i7" >Intel i7</option>
                                    <option className="text-black">Intel Other Processer</option>
                                    <option className="text-black">AMD Processor</option>
                                </select>
                            </div>

                        </div>

                        <button onClick={handelRecommend} className="mt-20 w-full py-4 rounded-2xl bg-green-400 text-whitefont-semibold
             text-lg hover:scale-[1.02] transition-all"> Find Recommendations</button>

                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommend.map((laptop, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100"
                                >
                                    {/* Header */}
                                    <div className="bg-green-300 p-5 flex justify-between items-center">
                                        <div>
                                            <h2 className="text-2xl font-bold">
                                                {laptop.Company}
                                            </h2>
                                            <p className="opacity-90">
                                                {laptop.TypeName}
                                            </p>
                                        </div>
                                        <span
                                            onClick={() => handleWishlist(laptop)}
                                        >
                                            {isWishlisted(laptop) ? (
                                                <FaHeart className="text-pink-500 cursor-pointer w-6 h-6" />
                                            ) : (
                                                <FaHeart className="text-gray-500 cursor-pointer w-6 h-6" />
                                            )}
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <div className="p-5 space-y-3">

                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-500">
                                                Processor
                                            </span>
                                            <span className="font-semibold">
                                                {laptop.Cpu}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-500">
                                                RAM
                                            </span>
                                            <span className="font-semibold">
                                                {laptop.Ram} GB
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-500">
                                                Storage
                                            </span>
                                            <span className="font-semibold">
                                                {laptop.Memory}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-500">
                                                GPU
                                            </span>
                                            <span className="font-semibold">
                                                {laptop.Gpu}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-500">
                                                OS
                                            </span>
                                            <span className="font-semibold">
                                                {laptop.OpSys}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-500">
                                                Screen Resolution
                                            </span>
                                            <span className="font-semibold">
                                                {laptop.ScreenResolution}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-500">
                                                Weight
                                            </span>
                                            <span className="font-semibold">
                                                {laptop.Weight} kg
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-500">
                                                Size
                                            </span>
                                            <span className="font-semibold">
                                                {laptop.Inches} Inch
                                            </span>
                                        </div>

                                        <hr />

                                        {/* Price */}
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 font-medium">
                                                Price
                                            </span>

                                            <span className="text-3xl font-bold text-green-600">
                                                ₹{Math.round(laptop.Price)}
                                            </span>
                                        </div>

                                        {/* Button */}
                                        <div className="flex gap-3 mt-4">
                                            <button
                                                onClick={() =>
                                                    window.open(
                                                        `https://www.flipkart.com/search?q=${encodeURIComponent(
                                                            `${laptop.Company} ${laptop.Cpu}`
                                                        )}`,
                                                        "_blank"
                                                    )
                                                }
                                                className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold"
                                            >
                                                Flipkart
                                            </button>

                                            <button
                                                onClick={() =>
                                                    window.open(
                                                        `https://www.amazon.in/s?k=${encodeURIComponent(
                                                            `${laptop.Company} ${laptop.Cpu}`
                                                        )}`,
                                                        "_blank"
                                                    )
                                                }
                                                className="flex-1 bg-orange-400 text-white py-3 rounded-xl font-semibold"
                                            >
                                                Amazon
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Recommform;
