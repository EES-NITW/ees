import { FaLinkedin } from "react-icons/fa";
import "./OfferModal.css";

export default function OfferModal({ offer, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{offer.student_name}</h2>
        <p><b>Roll No:</b> {offer.roll_no}</p>

        {offer.linkedin && (
          <a href={offer.linkedin} target="_blank" rel="noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
        )}

        <hr />

        <p><b>Type:</b> {offer.type}</p>
        <p><b>Role:</b> {offer.role}</p>
        <p><b>Date:</b> {new Date(offer.offer_date).toDateString()}</p>

        <div className="experience">
          <b>Experience:</b>
          <p>{offer.experience}</p>
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
