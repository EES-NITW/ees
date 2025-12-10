import { useState } from "react";
import axios from "axios";

export default function AddCompanyModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");

    if (!name || !logo) {
      setMsgType("error");
      setMsg("Please enter company name and select a logo.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("logo", logo);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/placements/companies/add",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMsgType("success");
      setMsg(res.data.message || "Company added");

      if (onSuccess) onSuccess();
      setTimeout(() => onClose(), 800);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error || "Failed to add company. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Add Company</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter company name (e.g., Google)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])}
          />
          <small>Upload company logo (preferably PNG with no background)</small>

          <div className={`modal-msg ${msgType}`}>{msg}</div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding..." : "Submit"}
          </button>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
