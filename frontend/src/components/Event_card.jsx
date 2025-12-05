import axios from "axios";
import Trash from "../icons/Trash";

export function Event_card({ event, delete_enabled }) {
  async function delete_member() {
    const response = await axios.delete(
      "http://localhost:5000/api/v1/events/delete_event",
      {
        params: {
          id: event.id,
        },
      }
    );
    console.log(response.data.message);
  }
  return (
    <div className="text-white rounded-2xl bg-gray-800 m-2 p-4 w-80 h-50">
      <div className="flex justify-between items-center mb-4">
        <h1> Event Card </h1>
        {delete_enabled && (
          <div onClick={delete_member} className="relative ">
            <Trash />
          </div>
        )}
      </div>
      <p> Event ID : {event.id} </p>
      <p> Event Title : {event.title} </p>
      <p> Description : {event.description} </p>
      {/* <p> Date : {event.date} </p> */}
      <p> Status : {event.status} </p>
      <p> Venue : {event.venue} </p>
    </div>
  );
}

export default Event_card;
