export function Event_card({ event }) {
  return (
    <div>
      <h1 className="bg-red-500"> Event Card </h1>
      <p> Event ID : {event.id} </p>
      <p> Event Title : {event.title} </p>
      <p> Description : {event.description} </p>
      <p> Date : {event.date} </p>
      <p> Status : {event.status} </p>
      <p> Venue : {event.venue} </p>
    </div>
  );
}

export default Event_card;