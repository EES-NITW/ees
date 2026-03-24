import React, { useState } from "react";
import Event_card from "../../components/Event_card";
import Navbar from "../../components/Navbar";
import Particles from "../../components/Particles";
import { useContent } from "../../hooks/useContent";

// --- Custom Carousel Component ---
const EventCarousel = ({ event }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === event.images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? event.images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full md:w-[45%] lg:w-[30%] h-[380px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl group hover:bg-white/10 transition-colors duration-300 flex flex-col">
      
      {/* Carousel Track */}
      <div 
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {/* Slide 1: Info + Cartoon Placeholder */}
        <div className="w-full h-full flex-shrink-0 flex flex-col">
          <div className="h-1/2 w-full p-6 flex flex-col justify-center border-b border-white/10">
            {/* Tag matching the aesthetic of the upcoming card */}
            <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-gray-300 bg-white/10 rounded-full w-max">
              Past Event
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
            <p className="text-gray-400 flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {event.date}
            </p>
          </div>
          <div className="h-1/2 w-full bg-black/50">
            <img 
              src={event.images[0]} 
              alt={`${event.title} Cartoon Placeholder`} 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>

        {/* Slide 2+: Related Event Images */}
        {event.images.slice(1).map((imgUrl, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 bg-black">
            <img 
              src={imgUrl} 
              alt={`Event Gallery Slide ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {event.images.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-2 h-2 rounded-full transition-colors ${currentSlide === idx ? 'bg-white' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---
export function Events() {
  const contents = useContent();
  const [eventFilter, setEventFilter] = useState("latest"); // Dropdown state

  // Extended dummy data to demonstrate the dropdown's capability
  const pastEvents = [
    {
      id: 1,
      title: "Designathon 2025",
      date: "October 12, 2025",
      images: [
        "https://loremflickr.com/600/400/cartoon?lock=1", 
        "https://loremflickr.com/600/400/event?lock=11",  
        "https://loremflickr.com/600/400/crowd?lock=12"   
      ]
    },
    {
      id: 2,
      title: "Open Source Summit",
      date: "August 24, 2025",
      images: [
        "https://loremflickr.com/600/400/cartoon?lock=2",
        "https://loremflickr.com/600/400/tech?lock=21",
        "https://loremflickr.com/600/400/conference?lock=22"
      ]
    },
    {
      id: 3,
      title: "Winter Coding Bootcamp",
      date: "December 05, 2024",
      images: [
        "https://loremflickr.com/600/400/cartoon?lock=3",
        "https://loremflickr.com/600/400/computers?lock=31",
        "https://loremflickr.com/600/400/students?lock=32"
      ]
    },
    {
      id: 4,
      title: "AI & Machine Learning Expo",
      date: "September 15, 2024",
      images: [
        "https://loremflickr.com/600/400/cartoon?lock=4",
        "https://loremflickr.com/600/400/robot?lock=41",
        "https://loremflickr.com/600/400/presentation?lock=42"
      ]
    },
    {
      id: 5,
      title: "Cybersecurity Workshop",
      date: "June 10, 2024",
      images: [
        "https://loremflickr.com/600/400/cartoon?lock=5",
        "https://loremflickr.com/600/400/hacker?lock=51",
        "https://loremflickr.com/600/400/code?lock=52"
      ]
    }
  ];

  // Logic to determine which events to render based on dropdown selection
  const eventsToRender = (() => {
    if (eventFilter === "latest") return pastEvents.slice(0, 3);
    if (eventFilter === "all") return pastEvents;
    return pastEvents.filter(ev => ev.id.toString() === eventFilter);
  })();

  return (
    <div className="w-full min-h-screen relative bg-black overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
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

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full pt-10">
        
        {/* Header Section */}
        <div className="w-full max-w-5xl px-4">
          <h1 className="text-3xl font-bold text-white mb-8 text-center md:text-left">
            Welcome to Events
          </h1>
          
          {/* Upcoming Event Section */}
          <div className="mb-12">
            <h2 className="text-xl text-gray-400 mb-4 font-semibold tracking-wide uppercase">
              Featured Upcoming Event
            </h2>
            <div className="flex flex-col md:flex-row items-stretch justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors duration-300 shadow-xl overflow-hidden group">
              <div className="flex flex-col justify-center w-full md:w-3/5 pr-0 md:pr-8 mb-6 md:mb-0 z-10">
                <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-400 bg-blue-400/10 rounded-full w-max">
                  Coming Soon
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Annual Tech Symposium 2026
                </h3>
                <div className="flex flex-col gap-3 text-gray-300">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Saturday, April 4th • 10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>Main Auditorium, Innovation Campus</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/5 min-h-[200px] border border-white/10 rounded-xl relative overflow-hidden flex items-center justify-center bg-gray-900 z-0">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWSMjQwF_-45YzgtSwQ07EOJ3yjzgLOTuS2X9zGl1n-l4LS5boSoDeByqnsoKou6_bXTg4YHgbWP3zGxUjZ2e1_4V-erdJJeX0UndorakVHwA-Sjtr&s=10&ec=121584908" 
                  alt="Annual Tech Symposium 2026 Preview" 
                  className="absolute inset-0 w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* All Events Header + Dropdown */}
        <div className="w-full max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-xl text-gray-400 font-semibold tracking-wide uppercase text-center sm:text-left mb-4 sm:mb-0">
              Previous Events
            </h2>
            
            {/* The Dropdown Menu */}
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="bg-black/50 backdrop-blur-md border border-white/20 text-white text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none cursor-pointer transition-colors hover:bg-white/5"
            >
              <option value="latest">Latest 3 Events</option>
              <option value="all">View All Events</option>
              <optgroup label="Specific Events">
                {pastEvents.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title} ({ev.date.split(',')[1]?.trim() || ev.date})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          
          {/* Displayed Carousels */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 pb-8 min-h-[400px]">
            {eventsToRender.map((event) => (
              <EventCarousel key={event.id} event={event} />
            ))}
          </div>

          {/* Instagram Link Footer */}
          <div className="w-full text-center mt-6 pb-16">
            <p className="text-gray-300 text-lg">
              Visit{" "}
              <a 
                href="https://instagram.com/your_society_link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-400 font-semibold hover:text-pink-300 transition-colors underline decoration-pink-400/30 underline-offset-4"
              >
                our Instagram page
              </a>{" "}
              for more!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Events;
