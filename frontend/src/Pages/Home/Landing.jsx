import React from "react";
import Particlebg from "../../components/Particlebg";
import "../../App.css";
import Landing2 from "./Landing_main"; // make sure this path/filename matches

export function Landing() {
  return (
    <div className="app-container">
      {/* Global particles / background if you want it behind everything */}
      <Particlebg />
      {/* Main page content (hero + department section) */}
      <div className="content">
        <h1> Welcome to Landing page </h1> 
         <div className="bg-red"> 
           <h1> 
            Hello we are here as EES
           </h1>
         </div>
        <Landing2 />
      </div>
    </div>
  );
}

export default Landing;
