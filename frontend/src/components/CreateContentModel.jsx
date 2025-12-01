import axios from "axios";
import { useRef } from "react";


export function CreateContentModel({open, onClose}) { 
    
    const title_input= useRef(null);
    const description_input= useRef(null);
    const date_input= useRef(null);
    const venue_input= useRef(null);
    const status_input= useRef(null); 
    async function add_event(){
        const title=title_input.current.value; 
        const description=description_input.current.value; 
        const date=date_input.current.value;
        const venue=venue_input.current.value;
        const status=status_input.current.value; 
        const response=await axios.post("http://localhost:5000/api/v1/events/add_event",{
            title,
            description,
            date,
            venue,
            status
        }); 
        console.log(response.data.message);
        if(response.data.message==="Event Added Successfully"){ 
            alert("Event Added Successfully");
        }
    }
  return (
    <div> 
        <input ref={title_input} type="text" placeholder="Title" />
        <input ref={description_input} type="text" placeholder="Description" />
        <input ref={date_input} type="text" placeholder="Eg: 2022-10-10" />
        <input ref={venue_input} type="text" placeholder="Venue" />
        <input ref={status_input} type="text" placeholder="completed or uncompleted" /> 
        <button onClick={add_event} > 
            Create Event
        </button>
      <h1> Create Content Model </h1> 
      <button onClick={onClose}> Close </button>
    </div>
  );
}

export default CreateContentModel;