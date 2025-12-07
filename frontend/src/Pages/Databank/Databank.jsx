import Navbar from "../../components/Navbar";
import Particles from "../../components/Particles";
import "./Databank.css";

export function Databank() {
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
      <div className="content-layer">
        <div className="databank-navbar">
          <Navbar />
        </div>
        <div className="cont">
          {/* <h1 className="text-white ">Welcome to Databank page </h1> */}
          {/* Edit this page in this div only */}
          <div className="databank-cont">
            <h2>Select your Year</h2>
            <a
              className="databank-link"
              href="https://drive.google.com/drive/folders/1lb8LSwypAcJ3p3gWCyJFcPqOsUYspl8V"
            >
              1st Year
            </a>
            <a
              className="databank-link"
              href="https://drive.google.com/drive/u/1/folders/1lhUe3vseIxr04SZp1y9geN8yqs0lu884"
            >
              2nd Year
            </a>
            <a
              className="databank-link"
              href="https://drive.google.com/drive/folders/1ljSwgfuMNJQ7mguzQyRaWGePA2zBH1Uy"
            >
              3rd Year
            </a>
            <a
              className="databank-link"
              href="https://drive.google.com/drive/u/1/folders/1lngxzisIDHRA94mWxSHg6aWppIsGZRhX"
            >
              4th Year
            </a>
          </div>
          <div className="databank-cont">
            <h2>Access Resume</h2>
            <a
              className="databank-link"
              href="https://drive.google.com/drive/u/1/folders/1DWPmlZh8Bx_eEum1Rk2NoaGZsrLvLqre"
            >
              SDE
            </a>
            <a
              className="databank-link"
              href="https://drive.google.com/drive/u/1/folders/1DYw_MI-gDULgIxGYrnSzvZA_v2GVnY4d"
            >
              Data Analytics
            </a>
            <a
              className="databank-link"
              href="https://drive.google.com/drive/u/1/folders/1DY6_MK3XGc3fUYF74eDUbZt6MrbYFeuC"
            >
              Core
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Databank;
