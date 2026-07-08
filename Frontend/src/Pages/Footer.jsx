import axios from "axios";
import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { toast } from "sonner";

const Footer = () => {
  const [rating, setRating] = useState(0);
  const [input, setInput] = useState({
    message: "",
  });

  const submitHandler = async () => {
    await axios.post("/api/v2/feedback", {
      message: input.message,
      rating: rating,
    });
  };

  const feedbackHandler = async () => {
    try {
      if (!input.message.trim()) {
        toast.error("Please enter your feedback.");
        return;
      }

      if (rating === 0) {
        toast.error("Please select a rating.");
        return;
      }

      const res = await axios.post('http://localhost:8000/api/v2/feedback/add', {
        message: input.message,
        rating: rating,
      }, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message);

        setInput({ message: "" });
        setRating(0);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to submit feedback");
    }
  }
  return (
    <footer className="bg-slate-200 rounded-t-3xl ">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

        {/* Logo Section */}
        <div >
          <img
            src="logo1.png"
            alt="Lapify"
            className=" h-auto mb-4 " style={{ marginLeft: '-30px', marginTop: '-40px' }}
          />

          <p className="leading-8" style={{ marginLeft: '-30px', marginTop: '-30px' }}>
            AI-powered laptop recommendations to help you find the perfect
            laptop for your needs, budget, and performance.
          </p>

          <div className="mt-8 space-y-4" style={{ marginLeft: '-30px' }}>
            <p>⚡ AI-Powered</p>
            <p>🛡️ Smart & Reliable</p>
            <p>🚀 Fast & Accurate</p>
            <p>⭐ Trusted by Thousands</p>
          </div>
        </div>

        {/* Product */}
        <div className="ml-10">
          <h3 className="text-2xl font-semibold">Product</h3>
          <div className="w-10 h-1 bg-yellow-500 rounded-full mt-2 mb-8"></div>

          <div className="space-y-4 ">
            <p>Predict</p>
            <p>Recommend</p>
            <p>Compare</p>
            <p>Explore Laptops</p>
            <p>Top Picks</p>
            <p>Laptop Brands</p>
          </div>
        </div>

        {/* Company */}
        <div className="ml-6">
          <h3 className="text-2xl font-semibold">Company</h3>
          <div className="w-10 h-1 bg-green-500 rounded-full mt-2 mb-8"></div>

          <div className="space-y-4">
            <p>About Us</p>
            <p>How It Works</p>
            <p>Blog</p>
            <p>Careers</p>
            <p>Contact Us</p>
            <p>Our Team</p>
          </div>
        </div>

        {/* Resources */}
        <div className="ml-3">
          <h3 className="text-2xl font-semibold">Resources</h3>
          <div className="w-10 h-1 bg-sky-500 rounded-full mt-2 mb-8"></div>

          <div className="space-y-4 ">
            <p>Buying Guide</p>
            <p>Laptop Specs Guide</p>
            <p>FAQs</p>
            <p>Glossary</p>
            <p>Support Center</p>
          </div>
        </div>

        {/* Feedback */}
        <div>
          <p className="leading-6 mb-6">
            We'd love to hear your thoughts and suggestions to improve Lapify.
          </p>

          {/* Star Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm">Rate us:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl transition ${star <= rating ? "text-yellow-400" : "text-gray-500"
                  }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            placeholder="Share your feedback..."
            rows={4}
            value={input.message}
            onChange={(e) =>
              setInput({ ...input, message: e.target.value })
            }
            className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-xl outline-none resize-none"
          />

          <button onClick={feedbackHandler} className="mt-4 w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-medium hover:opacity-80 transition">
            Submit Feedback
          </button>

          <p className="mt-4 text-sm text-green-400">
            ✓ Your feedback helps us improve.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-10 py-8 flex flex-col lg:flex-row justify-between items-center gap-6">

          <p className="font-semibold">
            © 2026 <span className="text-green-400 font-semibold">Lapify.ai</span>.
            All rights reserved.
          </p>

          <div className="flex gap-8">
            <a href="#" className="hover:underline  hover:text-sky-500 transition duration-300">Privacy Policy</a>
            <a href="#" className="hover:underline  hover:text-sky-500 transition duration-300">Terms of Service</a>
            <a href="#" className="hover:underline  hover:text-sky-500 transition duration-300">Disclaimer</a>
          </div>

          <div className="flex items-center gap-4" style={{ marginRight: '-20px' }}>
            <span>Follow Us</span>

            <div className="w-10 h-10 rounded-full flex items-center justify-center ml-4">
              <FaLinkedin className="w-7 h-7 " />
            </div>

            <div className="w-10 h-10 rounded-full  flex items-center justify-center">
              <FaGithub className="w-7 h-7" />
            </div>

            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <FaTwitter className="w-7 h-7" />
            </div>

            <div className="w-10 h-10 rounded-full  flex items-center justify-center">
              <FaInstagram className="w-7 h-7" />
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;