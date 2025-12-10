import { useState } from "react";
import axios from "axios";

export default function RemoveCompanyModal({ onClose, onSuccess, companies }) {
  const [companyId, setCompanyId] = useState(
    companies && companies.length > 0 ? companies[0].id : ""
  );
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  if (!companies || companies.length === 0) {
    return (
      <div className="modal-overlay">
        <div className="modal-box">
          <h3>Remove Company</h3>
          <p>No companies available to remove.</p>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleRemove = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");

    if (!companyId) {
      setMsgType("error");
      setMsg("Please select a company.");
      return;
    }

    const selected = companies.find((c) => c.id === companyId || String(c.id) === String(companyId));

    const ok = window.confirm(
      `All offers related to this company will also be deleted. Do you want to continue?`
    );
    if (!ok) return;

    try {
      setLoading(true);
      const res = await axios.delete(
        "http://localhost:5000/api/v1/placements/companies/remove",
        {
          withCredentials: true,
          data: { company_id: companyId },
        }
      );

      setMsgType("success");
      setMsg(res.data.message || "Company removed");

      if (onSuccess) onSuccess();
      setTimeout(() => onClose(), 900);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error || "Failed to remove company. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Remove Company</h3>
        <form onSubmit={handleRemove}>
          <select
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
          >
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <small>
            Note: All offers related to this company will also be deleted.
          </small>

          <div className={`modal-msg ${msgType}`}>{msg}</div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Removing..." : "Remove Company"}
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
