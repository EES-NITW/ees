import { useNavigate } from "react-router-dom";
import "./CompanyCard.css";

export default function CompanyCard({ id, name, img, link }) {
  const navigate = useNavigate();

  return (
    <div
      className="company-card"
      onClick={() => navigate(link)}
    >
      <img src={img} alt={name} className="company-logo" />
      <h3 className="company-name">{name}</h3>
      <button className="view-btn">View</button>
    </div>
  );
}
