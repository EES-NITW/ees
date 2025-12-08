import { useEffect, useState } from "react";
import "./Settings.css";
import axios from "axios";
import MakeAdminModal from "../../modals/MakeAdminModal";
import RemoveAdminModal from "../../modals/RemoveAdminModal";

export default function Settings() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [makeOpen, setMakeOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        "http://localhost:5000/api/v1/settings/admins",
        { withCredentials: true }
      );
      setAdmins(res.data || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Failed to load admins. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSuccess = () => {
    fetchAdmins();
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Admin Settings</h2>

      <div className="admins-box">
        <h3 className="admins-heading">Current Admins</h3>

        {loading && <div className="admins-info">Loading admins...</div>}

        {!loading && error && (
          <div className="admins-info admins-error">{error}</div>
        )}

        {!loading && !error && admins.length === 0 && (
          <div className="admins-info">No admins found.</div>
        )}

        {!loading && !error && admins.length > 0 && (
          <ul className="admins-list">
            {admins.map((a) => (
              <li key={a.id}>
                <span className="admin-name">{a.name}</span>
                <span className="admin-email">{a.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="settings-buttons">
        <button className="settings-btn make-btn" onClick={() => setMakeOpen(true)}>
          Make Admin
        </button>
        <button
          className="settings-btn remove-btn"
          onClick={() => setRemoveOpen(true)}
        >
          Remove Admin
        </button>
      </div>

      {makeOpen && (
        <MakeAdminModal onClose={() => setMakeOpen(false)} onSuccess={handleSuccess} />
      )}

      {removeOpen && (
        <RemoveAdminModal
          onClose={() => setRemoveOpen(false)}
          onSuccess={handleSuccess}
          admins={admins}
        />
      )}
    </div>
  );
}
