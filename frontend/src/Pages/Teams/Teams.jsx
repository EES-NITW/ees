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
        <div>
          <h1 className="text-white ">Welcome to Teams page </h1>
          {/* Edit this page in this div only */}
          <div className="flex justify-center flex-wrap">
            {members.map((member) => (
              <Member_card
                key={member.id}
                member={member}
                delete_enabled={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


