import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    eventsThisYear: 0,
    totalCompanies: 0,
    totalStudents: 0,
    logs: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          "http://localhost:5000/api/v1/admin/dashboard",
          { withCredentials: true }
        );

        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  const formatDateTime = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return <div className="center-screen">Loading...</div>;
  }

  if (error) {
    return <div className="center-screen error-text">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      {/* STATS */}
      <div className="stats-section">
        <div className="stat-card">
          <h2>{stats.totalMembers}</h2>
          <p>Total Members</p>
        </div>

        <div className="stat-card">
          <h2>{stats.eventsThisYear}</h2>
          <p>Events This Year</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalCompanies}</h2>
          <p>Total Companies</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalStudents}</h2>
          <p>Total Students</p>
        </div>
      </div>


      {/* RECENT ACTIVITY */}
      <div className="activity-section">
        <h3>Recent Activity</h3>

        {stats.logs.length === 0 ? (
          <p className="no-activity">No activity logged yet.</p>
        ) : (
          <div className="activity-list">
            {stats.logs.map((log, index) => (
              <div key={index} className="activity-item">
                <span className="activity-text">{log.action}</span>
                <span className="activity-time">
                  {formatDateTime(log.created_at)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
