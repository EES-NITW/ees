import { useState } from "react";
import axios from "axios";

export default function AddOfferModal({
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
  const [type, setType] = useState("Internship");
  const [role, setRole] = useState("");
  const [offerDate, setOfferDate] = useState("");
  const [experience, setExperience] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");

    if (!companyId || !studentId || !type || !role || !offerDate) {
      setMsgType("error");
      setMsg("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/placements/offers/add",
        {
          company_id: companyId,
          student_id: studentId,
          type,
          role,
          offer_date: offerDate,
          experience,
        },
        { withCredentials: true }
      );

      setMsgType("success");
      setMsg(res.data.message || "Offer added");

      if (onSuccess) onSuccess();
      setTimeout(() => onClose(), 900);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error || "Failed to add offer. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!companies || companies.length === 0 || !students || students.length === 0) {
    return (
      <div className="modal-overlay">
        <div className="modal-box">
          <h3>Add Offer</h3>
          <p>You must have at least one company and one student to add an offer.</p>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Add Offer</h3>

        <form onSubmit={handleSubmit}>
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

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Internship">Internship</option>
            <option value="Placement">Placement</option>
          </select>

          <input
            type="text"
            placeholder="Enter role (e.g., SDE Intern)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            type="date"
            value={offerDate}
            onChange={(e) => setOfferDate(e.target.value)}
          />

          <textarea
            placeholder="Enter student's experience/feedback"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            rows={4}
          />

          <div className={`modal-msg ${msgType}`}>{msg}</div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Offer"}
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
