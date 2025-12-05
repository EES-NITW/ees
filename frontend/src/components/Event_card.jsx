export function Event_card({ event }) {
  return (
    <div className="text-white rounded-2xl bg-gray-800 m-2 p-4 w-80 h-50">
      <h1> Event Card </h1>
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
