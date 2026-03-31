import "./EventCard.css";

export default function EventCard({ event, onClick }) {
  return (
    <div className="event-card" onClick={() => onClick(event)}>
      <img src={event.poster_url} alt={event.title} />

      <div className="event-info">
        <h3>{event.title}</h3>
        <p>{new Date(event.date).toDateString()}</p>
        <p>{event.venue}</p>
      </div>
    </div>
  );
}