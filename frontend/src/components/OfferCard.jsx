import { FaLinkedin } from "react-icons/fa";
import "./OfferCard.css";

export default function OfferCard({ offer, onView }) {
  return (
    <div className="offer-card">
      <h3>{offer.student_name}</h3>
      <p>{offer.roll_no}</p>

      {offer.linkedin && (
        <a href={offer.linkedin} target="_blank" rel="noreferrer">
          <FaLinkedin />
        </a>
      )}

      <button onClick={onView}>View More</button>
    </div>
  );
}
