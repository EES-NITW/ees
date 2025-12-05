import Member_card from "../../components/member_card";
import Navbar from "../../components/Navbar";
import Particlebg from "../../components/Particlebg";
import Particles from "../../components/Particles";
import useContent2 from "../../hooks/useContent2";

export function Teams() {
  const members = useContent2();
  return (
    <div className="w-full min-h-screen relative bg-black overflow-hidden">
      <div className="absolute inset-0 ">
        {/* style={{ width: '100%', height: '1000px', position: 'relative' }} */}
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
export default Teams;
