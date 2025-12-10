import React from "react";
import Navbar from "../../components/Navbar";
import Particles from "../../components/Particles";
import DeptImage from "../../assets/eee-dept.png";
import "./Landing_main.css";
import { FaGlobe } from "react-icons/fa";


const NAVBAR_HEIGHT = 64; // px, approx for h-16


const Landing2 = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Navbar />


      {/* HERO / SECTION 1 */}
      <section
        id="top-section"
        className="relative w-full min-h-screen overflow-hidden flex items-center justify-center text-center"
        style={{ paddingTop: NAVBAR_HEIGHT }}
      >
        {/* Particles background */}
        <div className="absolute inset-0">
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>


        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />


        {/* Content */}
        <div className="relative z-10 px-6 flex flex-col items-center justify-center text-center">
          <p className="text-blue-300 tracking-wide text-sm mb-3">EST. 2002</p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-snug md:leading-tight max-w-4xl mb-6">
            Rooted in Tradition, Committed to Progress - Powering Electrical
            Engineering Then, Now and Beyond.
          </h1>
          <p className="max-w-2xl text-gray-300 text-lg md:text-xl mb-10">
            The Electrical Engineering Society at NITW fosters innovation,
            collaboration, and technical excellence - bridging theory with
            real-world impact.
          </p>


          <a
            href="https://www.nitw.ac.in/nitw/index.php/departments/electrical-engineering-"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
          >
            <FaGlobe />
            <span>NITW EEE Page</span>
          </a>
        </div>


        {/* DOWN arrow at bottom (to department) */}
        <button
          type="button"
          onClick={() => scrollTo("department-section")}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-3xl animate-bounce focus:outline-none"
        >
          ⌄
        </button>
      </section>


      {/* SECTION 2: Department */}
      <section
        id="department-section"
        className="relative w-full bg-black py-20 px-4 md:px-10"
        style={{ paddingTop: NAVBAR_HEIGHT + 32 }}
      >
        {/* UP arrow just under navbar (go hero) */}
        <button
          type="button"
          onClick={() => scrollTo("top-section")}
          className="absolute left-1/2 -translate-x-1/2 text-white text-2xl focus:outline-none"
          style={{ top: NAVBAR_HEIGHT + 8 }}
        >
          ⌃
        </button>


        <h2 className="text-center text-2xl md:text-4xl font-bold tracking-[0.15em] mb-12">
          ELECTRICAL ENGINEERING DEPARTMENT
        </h2>


        <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-xl border border-gray-700/60 p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center">
          {/* Left: image */}
          <div className="w-full md:w-1/2">
            <img
              src={DeptImage}
              alt="Electrical Engineering Department"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>


          {/* Right: text (bigger) */}
          <div className="w-full md:w-1/2 text-gray-200 text-base md:text-lg leading-relaxed">
            <p className="mb-4">
              The Department of Electrical Engineering is one of the oldest
              departments of the National Institute of Technology, Warangal
              (NITW).
            </p>
            <p className="mb-4">
              Since its inception, the department has actively engaged in
              teaching and research across diverse areas of Electrical
              Engineering, supported by experienced faculty and strong
              laboratories.
            </p>
            <p>
              It offers undergraduate (B.Tech), postgraduate (M.Tech) and
              doctoral (Ph.D) programmes, with specializations in Power
              Electronics, Drives, Power Systems and related domains.
            </p>
          </div>
        </div>


        {/* DOWN arrow at bottom (to stats) */}
        <button
          type="button"
          onClick={() => scrollTo("stats-section")}
          className="absolute left-1/2 -translate-x-1/2 text-white text-3xl animate-bounce focus:outline-none"
          style={{ bottom: 24 }}
        >
          ⌄
        </button>
      </section>


      {/* SECTION 3: Stats */}
      <section
        id="stats-section"
        className="relative w-full bg-black py-16 px-4 md:px-10"
        style={{ paddingTop: NAVBAR_HEIGHT + 32 }}
      >
        {/* UP arrow just under navbar (go department) */}
        <button
          type="button"
          onClick={() => scrollTo("department-section")}
          className="absolute left-1/2 -translate-x-1/2 text-white text-2xl focus:outline-none"
          style={{ top: NAVBAR_HEIGHT + 8 }}
        >
          ⌃
        </button>


        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-green-400">
              120+
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-300">
              Active Members
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-green-400">
              50+
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-300">
              Events Hosted
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-green-400">
              25+
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-300">
              Workshops
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-green-400">
              90%+
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-300">
              Placement Rate
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Landing2;