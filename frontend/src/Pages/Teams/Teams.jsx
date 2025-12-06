import React from "react";
import Member_card from "../../components/member_card";
import Navbar from "../../components/Navbar";
import Particles from "../../components/Particles";
import useContent2 from "../../hooks/useContent2";
import "./Teams.css";

export default function Teams() {
  const members = useContent2();

  return (
    <div className="w-full min-h-screen relative bg-black overflow-hidden">
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
      <div>
        <Navbar />
        <div className="pt-16 pb-24">
          <div className="container mx-auto px-6">
            <div className="flex justify-center flex-wrap gap-6">
              {members && members.length > 0 && (
                members.map((member) => (
                  <Member_card key={member.id} member={member} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}