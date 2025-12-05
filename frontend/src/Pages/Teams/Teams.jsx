// import Navbar from "../../components/Navbar";
// import Particles from "../../components/Particles";

// export default function Teams() {
//   return (
//     <div className="w-full min-h-screen relative bg-black overflow-hidden">
//       <div className="absolute inset-0">
//         <Particles
//           particleColors={["#ffffff", "#ffffff"]}
//           particleCount={200}
//           particleSpread={10}
//           speed={0.1}
//           particleBaseSize={100}
//           moveParticlesOnHover={true}
//           alphaParticles={false}
//           disableRotation={false}
//         />
//       </div>

//       <div>
//         <Navbar />
//         <div>
//           <h1 className="text-white">Welcome to Teams page</h1>
//         </div>
//       </div>
//     </div>
//   );
// }
import Navbar from "../../components/Navbar";
import Particlebg from "../../components/Particlebg";

export default function Teams() {
  return (
    <div className="teams-container">
      {/* Background EXACTLY like Placements */}
      <Particlebg />

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar />
        
        <h1 className="text-white text-center text-2xl mt-6">
          Welcome to Teams page
        </h1>
      </div>
    </div>
  );
}



