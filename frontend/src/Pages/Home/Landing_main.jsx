import React from "react";
import bg_image from "../../assets/bg_image.jpg"; // your uploaded image

const Landing2 = () => {
  return (
    <div className="w-full min-h-screen relative text-white overflow-hidden">

      {/* Background Image with light blur & opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[1px] opacity-60"
        style={{ backgroundImage: `url(${bg_image})` }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        <p className="text-blue-300 tracking-wide text-xs md:text-sm mb-3">
          EST. 2002
        </p>

        <h1 className="text-2xl md:text-4xl font-semibold leading-snug md:leading-snug max-w-4xl mb-6">
          Rooted in Tradition, Committed to Progress – Powering Electrical Engineering Then, Now and Beyond.
        </h1>

        <p className="max-w-2xl text-gray-300 text-base md:text-lg mb-10">
          The Electrical Engineering Society at NITW fosters innovation,
          collaboration, and technical excellence—bridging theory with real-world impact.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition">
            Explore Events
          </button>

          <button className="px-6 py-3 border border-gray-400 rounded-full font-medium hover:bg-white hover:text-black transition">
            Join the Team
          </button>
        </div>

      </div>
    </div>
  );
};

export default Landing2;
