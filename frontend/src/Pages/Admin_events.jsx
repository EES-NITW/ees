import { useState } from "react";
import CreateContentModel from "../components/CreateContentModel";
import Event_card from "../components/Event_card";
import { useContent } from "../hooks/useContent";
import "./Admin_events_styles.css";

export function Admin_events() {
  const contents = useContent();
  const [model_open, setModel_open] = useState(false);
  return (
    <div>
      <h1>Current Events are</h1> 
      <button onClick={()=>{setModel_open(true)}} >  
        Manage Events
      </button> 
      {model_open &&  <CreateContentModel  open={model_open} onClose={()=>{setModel_open(false)}} />}
      <div className="events_style"> 
      {contents.map(event => (
        <Event_card key={event.id} event={event} />
      ))} 
      </div>
    </div>
  );
}

export default Admin_events;
