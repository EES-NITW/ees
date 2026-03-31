import "./EventModal.css";

export default function EventModal({ event, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="event-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{event.title}</h2>

        <p><b>Date:</b> {new Date(event.date).toDateString()}</p>
        <p><b>Venue:</b> {event.venue}</p>

        <p className="desc">{event.description}</p>

        {event.photos.length > 0 && (
          <div className="gallery">
            {event.photos.map((img, i) => (
              <img key={i} src={img} alt="event" />
            ))}
          </div>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}