import React, { useState, useEffect, useRef } from "react";
import Particles from "../../components/Particles";
import { useContent } from "../../hooks/useContent";

// --- 1. Custom Ethereal Card Wrapper (Smooth Levitation, Blue Glow & Mouse Spotlight) ---
const EtherealCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null); // Added back the spotlight reference

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let timeoutId = null;
    let isHovering = false; // Track hover state for the spotlight

    // Resting state styles
    const baseShadow = "0 8px 32px 0 rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.1)";
    const baseBorderColor = "rgba(255, 255, 255, 0.1)";

    // Hover state styles (Deep Neon Blue Edge Lighting)
    const hoverBorderColor = "rgba(59, 130, 246, 0.9)";
    const hoverGlow = "0 0 30px rgba(59, 130, 246, 0.6), inset 0 0 15px rgba(59, 130, 246, 0.4)";

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!cardRef.current) return;
          
          const velocity = window.scrollY - lastScrollY;
          lastScrollY = window.scrollY;
          
          const clamped = Math.max(-20, Math.min(20, velocity));
          const absVel = Math.abs(clamped);

          if (absVel > 1) {
            const scaleY = 1 + absVel * 0.001;
            const scaleX = 1 - absVel * 0.0005;
            const skewY = clamped * 0.02;
            
            // If hovering while scrolling, keep it lifted
            const yOffset = isHovering ? -12 : 0;
            
            cardRef.current.style.transform = `perspective(1000px) scale3d(${scaleX}, ${scaleY}, 1) skewY(${skewY}deg) translateY(${yOffset}px)`;
            cardRef.current.style.borderRadius = absVel > 10 ? '2.2rem' : '1.8rem';
            
            if (isHovering) {
               cardRef.current.style.boxShadow = `${baseShadow}, ${hoverGlow}`;
               cardRef.current.style.borderColor = hoverBorderColor;
            } else {
               const glowIntensity = Math.min(absVel * 0.015, 0.4); 
               const glowSpread = 15 + absVel * 1.5;
               const kineticGlow = `0 0 ${glowSpread}px rgba(120, 200, 255, ${glowIntensity})`;
               cardRef.current.style.boxShadow = `${baseShadow}, ${kineticGlow}`;
               cardRef.current.style.borderColor = baseBorderColor;
            }
            
            cardRef.current.style.transition = 'transform 0.05s linear, border-radius 0.1s linear, box-shadow 0.1s linear, border-color 0.1s linear';
          }

          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            if (!cardRef.current) return;
            
            if (isHovering) {
                cardRef.current.style.transform = `perspective(1000px) scale3d(1, 1, 1) skewY(0deg) translateY(-12px)`;
                cardRef.current.style.boxShadow = `${baseShadow}, ${hoverGlow}`;
                cardRef.current.style.borderColor = hoverBorderColor;
            } else {
                cardRef.current.style.transform = `perspective(1000px) scale3d(1, 1, 1) skewY(0deg) translateY(0px)`;
                cardRef.current.style.boxShadow = baseShadow;
                cardRef.current.style.borderColor = baseBorderColor;
            }

            cardRef.current.style.borderRadius = '1.5rem'; 
            cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.5s ease-out, box-shadow 0.4s ease, border-color 0.4s ease';
          }, 120);

          ticking = false;
        });
        ticking = true;
      }
    };

    // --- Hover & Spotlight Handlers ---
    const card = cardRef.current;
    const spotlight = spotlightRef.current;
    if (!card || !spotlight) return;

    const handleMouseMove = (e) => {
        if (!isHovering) return;
        
        // Calculate mouse position relative to the card's top-left corner
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Move the radial gradient spotlight to follow the exact X/Y coordinates
        spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15), transparent 60%)`;
    };

    const handleMouseEnter = () => {
        isHovering = true;
        card.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease';
        card.style.transform = 'perspective(1000px) scale3d(1, 1, 1) skewY(0deg) translateY(-12px)'; // Smooth levitation
        card.style.borderColor = hoverBorderColor;
        card.style.boxShadow = `${baseShadow}, ${hoverGlow}`;

        // Fade in the spotlight
        spotlight.style.opacity = '1';
        spotlight.style.transition = 'opacity 0.4s ease';
    };

    const handleMouseLeave = () => {
        isHovering = false;
        card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease, border-color 0.5s ease';
        card.style.transform = 'perspective(1000px) scale3d(1, 1, 1) skewY(0deg) translateY(0px)';
        card.style.borderColor = baseBorderColor;
        card.style.boxShadow = baseShadow;

        // Fade out the spotlight
        spotlight.style.opacity = '0';
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    // Initial Setup
    if (card) {
        card.style.boxShadow = baseShadow;
        card.style.borderColor = baseBorderColor;
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeoutId);
    };
  }, []);

  const glassStyles = `
    bg-gradient-to-br from-white/5 to-transparent 
    backdrop-blur-xl backdrop-saturate-150 
    border-2 
  `;

  return (
    <div ref={cardRef} className={`${className} ${glassStyles} rounded-3xl will-change-transform relative`}>
      {/* The Dynamic Spotlight Layer */}
      <div 
        ref={spotlightRef} 
        className="absolute inset-0 pointer-events-none opacity-0 z-50 rounded-3xl"
        style={{ mixBlendMode: 'overlay' }}
      ></div>
      {children}
    </div>
  );
};

// --- 2. Custom Carousel Component ---
const EventCarousel = ({ event }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev === event.images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? event.images.length - 1 : prev - 1));

  return (
    <EtherealCard className="w-full md:w-[45%] lg:w-[30%] h-[380px] overflow-hidden group flex flex-col z-10 cursor-pointer">
      
      <div className="absolute inset-0 rounded-3xl z-0">
        <div 
          className="flex w-full h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* Slide 1 */}
          <div className="w-full h-full flex-shrink-0 flex flex-col bg-transparent">
            <div className="h-1/2 w-full p-6 flex flex-col justify-center border-b border-white/5 bg-transparent relative z-10">
              <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-white/90 bg-white/5 rounded-full w-max border border-white/10 backdrop-blur-md">
                Past Event
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-wide drop-shadow-md">{event.title}</h3>
              <p className="text-cyan-100 flex items-center gap-2 text-sm font-medium">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {event.date}
              </p>
            </div>

            <div className="h-1/2 w-full bg-transparent relative overflow-hidden">
              <img 
                src={event.images[0]} 
                alt={`${event.title} Preview`} 
                className="w-full h-full object-cover opacity-60 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Slide 2+ */}
          {event.images.slice(1).map((imgUrl, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 bg-transparent">
              <img 
                src={imgUrl} 
                alt={`Gallery Slide ${index + 1}`} 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={prevSlide} 
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/5 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 z-20 backdrop-blur-xl border border-white/10 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>

      <button 
        onClick={nextSlide} 
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/5 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 z-20 backdrop-blur-xl border border-white/10 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 z-20 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
        {event.images.map((_, idx) => (
          <div key={idx} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-cyan-400 w-5 shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'bg-white/40'}`} />
        ))}
      </div>
    </EtherealCard>
  );
};

// --- 3. Main Events Page Component ---
export function Events() {
  const contents = useContent(); 
  const [eventFilter, setEventFilter] = useState("latest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pastEvents = [
    { id: 1, title: "Designathon 2025", date: "October 12, 2025", images: ["https://loremflickr.com/600/400/cartoon?lock=1", "https://loremflickr.com/600/400/event?lock=11", "https://loremflickr.com/600/400/crowd?lock=12"] },
    { id: 2, title: "Open Source Summit", date: "August 24, 2025", images: ["https://loremflickr.com/600/400/cartoon?lock=2", "https://loremflickr.com/600/400/tech?lock=21", "https://loremflickr.com/600/400/conference?lock=22"] },
    { id: 3, title: "Winter Coding Bootcamp", date: "December 05, 2024", images: ["https://loremflickr.com/600/400/cartoon?lock=3", "https://loremflickr.com/600/400/computers?lock=31", "https://loremflickr.com/600/400/students?lock=32"] },
    { id: 4, title: "AI & ML Expo", date: "September 15, 2024", images: ["https://loremflickr.com/600/400/cartoon?lock=4", "https://loremflickr.com/600/400/robot?lock=41", "https://loremflickr.com/600/400/presentation?lock=42"] },
    { id: 5, title: "Cybersecurity Workshop", date: "June 10, 2024", images: ["https://loremflickr.com/600/400/cartoon?lock=5", "https://loremflickr.com/600/400/hacker?lock=51", "https://loremflickr.com/600/400/code?lock=52"] }
  ];

  const eventsToRender = (() => {
    if (eventFilter === "latest") return pastEvents.slice(0, 3);
    if (eventFilter === "all") return pastEvents;
    return pastEvents.filter(ev => ev.id.toString() === eventFilter);
  })();

  const getDropdownLabel = () => {
    if (eventFilter === "latest") return "Latest 3 Events";
    if (eventFilter === "all") return "View All Events";
    const selected = pastEvents.find(e => e.id.toString() === eventFilter);
    return selected ? selected.title : "Filter Events";
  };

  return (
    <div className="w-full min-h-screen relative bg-[#050505] overflow-hidden font-sans">
      
      <div 
        className="absolute inset-0 z-0"
        style={{ filter: "drop-shadow(0 0 15px rgba(120, 200, 255, 0.8)) drop-shadow(0 0 5px rgba(255, 255, 255, 0.9))" }}
      >
        <Particles
          particleColors={["#ffffff", "#a5f3fc", "#cffafe"]}
          particleCount={600} 
          particleSpread={10}
          speed={0.15} 
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full pt-28 md:pt-36 pb-10">
        
        <div className="w-full max-w-5xl px-6">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-gray-500 mb-10 text-center md:text-left drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] tracking-tight">
            Events Portal
          </h1>
          
          <div className="mb-16">
            <h2 className="text-sm text-cyan-400 mb-5 font-bold tracking-widest uppercase flex items-center gap-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_rgba(34,211,238,1)]"></span>
              Featured Upcoming
            </h2>
            
            <EtherealCard className="flex flex-col md:flex-row items-stretch justify-between p-7 md:p-10 transition-colors duration-500 group z-10 cursor-pointer">
              
              <div className="flex flex-col justify-center w-full md:w-3/5 pr-0 md:pr-10 mb-8 md:mb-0 z-10 relative pointer-events-none">
                <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-cyan-100 bg-cyan-950/40 rounded-full w-max shadow-lg border border-cyan-400/40 backdrop-blur-md tracking-wider pointer-events-auto">
                  COMING 2026
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-xl pointer-events-auto">
                  Annual Tech Symposium
                </h3>
                <div className="flex flex-col gap-5 text-gray-200 mt-2 font-medium pointer-events-auto">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 w-max backdrop-blur-xl shadow-inner">
                    <svg className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-base">Sat, April 4th • 10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 w-max backdrop-blur-xl shadow-inner">
                    <svg className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className="text-base">Main Auditorium, Innovation Campus</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-2/5 min-h-[280px] border border-white/10 rounded-2xl absolute inset-y-7 right-7 overflow-hidden flex items-center justify-center z-0 shadow-2xl bg-transparent pointer-events-none">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWSMjQwF_-45YzgtSwQ07EOJ3yjzgLOTuS2X9zGl1n-l4LS5boSoDeByqnsoKou6_bXTg4YHgbWP3zGxUjZ2e1_4V-erdJJeX0UndorakVHwA-Sjtr&s=10&ec=121584908" 
                  alt="Annual Tech Symposium Preview" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/10 to-transparent"></div>
              </div>
            </EtherealCard>
          </div>
        </div>

        <div className="w-full max-w-7xl px-6 relative z-20">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 relative z-50">
            <h2 className="text-2xl text-gray-200 font-bold tracking-tight text-center sm:text-left mb-5 sm:mb-0 drop-shadow-lg">
              Previous Events Archive
            </h2>
            
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-72 bg-white/5 backdrop-blur-2xl border border-white/10 text-white text-base font-semibold rounded-xl p-4 hover:bg-white/10 transition-colors shadow-2xl outline-none"
              >
                {getDropdownLabel()}
                <svg className={`w-5 h-5 ml-3 text-cyan-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-white' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.8)] z-50 flex flex-col animate-in fade-in slide-in-from-top-3 duration-200">
                  <button onClick={() => { setEventFilter("latest"); setIsDropdownOpen(false); }} className="text-left px-5 py-4 text-base font-medium text-gray-100 hover:bg-white/10 hover:text-white transition-colors border-b border-white/5">Latest 3 Events</button>
                  <button onClick={() => { setEventFilter("all"); setIsDropdownOpen(false); }} className="text-left px-5 py-4 text-base font-medium text-gray-100 hover:bg-white/10 hover:text-white transition-colors border-b border-white/10">View All Events</button>
                  <div className="px-5 py-2.5 text-xs font-bold text-gray-400 uppercase tracking-widest bg-white/5 border-b border-white/5">Specific Events</div>
                  <div className="max-h-60 overflow-y-auto custom-scrollbar bg-transparent">
                    {pastEvents.map((ev) => (
                      <button key={ev.id} onClick={() => { setEventFilter(ev.id.toString()); setIsDropdownOpen(false); }} className="w-full text-left px-5 py-3.5 text-base font-medium text-gray-200 hover:bg-white/10 hover:text-white transition-colors border-b border-white/5 last:border-b-0">
                        {ev.title} <span className="text-gray-500 text-sm ml-2 font-normal">({ev.date.split(',')[1]?.trim() || ev.date})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-8 pb-16 min-h-[400px] z-10 relative">
            {eventsToRender.map((event) => (
              <EventCarousel key={event.id} event={event} />
            ))}
          </div>

          <div className="w-full text-center mt-8 pb-24 relative z-10 border-t border-white/5 pt-10">
            <p className="text-gray-400 text-xl font-medium">
              Visit{" "}
              <a href="https://instagram.com/your_society_link" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold hover:text-cyan-300 transition-all duration-300 underline decoration-cyan-400/40 underline-offset-8 hover:decoration-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                our Instagram page
              </a>{" "}
              for more!
            </p>
          </div>

        </div>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(34, 211, 238, 0.5); }
      `}</style>
    </div>
  );
}

export default Events;