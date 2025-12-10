import { useState } from "react";
import axios from "axios";

export default function RemoveOfferModal({
  onClose,
  onSuccess,
  companies,
  students,
}) {
  const [companyId, setCompanyId] = useState(
    companies && companies.length > 0 ? companies[0].id : ""
  );
  const [studentId, setStudentId] = useState(
    students && students.length > 0 ? students[0].id : ""
  );
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  if (!companies || companies.length === 0 || !students || students.length === 0) {
    return (
      <div className="modal-overlay">
        <div className="modal-box">
          <h3>Remove Offer</h3>
          <p>You need companies and students added before removing any offer.</p>
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

    if (!companyId || !studentId) {
      setMsgType("error");
      setMsg("Please select both company and student.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.delete(
        "http://localhost:5000/api/v1/placements/offers/remove",
        {
          withCredentials: true,
          data: {
            company_id: companyId,
            student_id: studentId,
          },
        }
      );

      setMsgType("success");
      setMsg(res.data.message || "Offer removed");

      if (onSuccess) onSuccess();
      setTimeout(() => onClose(), 900);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error ||
          "Failed to remove offer. Maybe it doesn't exist."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Remove Offer</h3>

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

          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.roll_no}
              </option>
            ))}
          </select>

          <div className={`modal-msg ${msgType}`}>{msg}</div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Removing..." : "Remove Offer"}
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
