import React from "react";
import Member_card from "../../components/member_card";
import Navbar from "../../components/Navbar";
import Particlebg from "../../components/Particlebg";
import Particles from "../../components/Particles";
import useContent2 from "../../hooks/useContent2";
import "./Teams.css";

export default function Teams() {
  const members = useContent2();

  return (
    <div className="teams-container">
      {/* Background EXACTLY like Placements */}
      <Particlebg />

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar />

        <section className="pt-16 pb-24">
          <h1 className="text-white text-center text-2xl md:text-4xl mb-8">
            Our Team
          </h1>

          <div className="container mx-auto px-6">
            <div className="flex justify-center flex-wrap gap-6">
              {members && members.length > 0 ? (
                members.map((member) => (
                  <Member_card key={member.id} member={member} />
                ))
              ) : (
                <p className="text-center text-gray-300">No members yet</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


