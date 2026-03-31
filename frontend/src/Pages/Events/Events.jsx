import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../../components/EventCard";
import EventModal from "../../components/EventModal";
import "./Events.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [yearFilter, setYearFilter] = useState("All");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/events/public", {
        withCredentials: true,
      })
      .then((res) => setEvents(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();

  const today = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const todayEvents = events.filter((e) => e.date === today);
  const upcoming = events.filter((e) => e.date > today);
  const past = events.filter((e) => e.date < today);

  // Extract years dynamically
  const years = [
    ...new Set(past.map((e) => new Date(e.date).getFullYear())),
  ].sort((a, b) => b - a);

  // Filter past events by year
  const filteredPast =
    yearFilter === "All"
      ? past
      : past.filter(
          (e) =>
            new Date(e.date).getFullYear().toString() === yearFilter
        );

  return (
    <div className="events-container">

      {/* HERO */}
      <div className="events-hero">
        <h1 className="events-title">Events at EES</h1>

        <p className="events-quote">
          Explore the events that shape innovation, learning, and collaboration at EES.
        </p>
      </div>

      {/* TODAY */}
      <Section
        title="Today's Events"
        events={todayEvents}
        onClick={setSelected}
        empty="No events scheduled for today."
        loading={loading}
      />

      {/* UPCOMING */}
      <Section
        title="Upcoming Events"
        events={upcoming}
        onClick={setSelected}
        empty="No upcoming events."
        loading={loading}
      />

      {/* PAST */}
      <div className="events-section">
        <div className="section-header">
          <h2>Past Events</h2>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="year-dropdown"
          >
            <option value="All">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : filteredPast.length === 0 ? (
          <p className="empty-text">No events for this year.</p>
        ) : (
          <div className="events-grid">
            {filteredPast.map((e) => (
              <EventCard key={e.id} event={e} onClick={setSelected} />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <EventModal event={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function Section({ title, events, onClick, empty, loading }) {
  return (
    <div className="events-section">
      <h2>{title}</h2>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : events.length === 0 ? (
        <p className="empty-text">{empty}</p>
      ) : (
        <div className="events-grid">
          {events.map((e) => (
            <EventCard key={e.id} event={e} onClick={onClick} />
          ))}
        </div>
      )}
    </div>
  );
}