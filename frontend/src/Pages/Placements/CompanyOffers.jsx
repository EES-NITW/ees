import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import OfferCard from "../../components/OfferCard";
import OfferModal from "../../components/OfferModal";
import "./CompanyOffers.css";

export default function CompanyOffers() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [type, setType] = useState("All");
  const [year, setYear] = useState("All");
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/placements/company/${companyId}/offers`,
        { withCredentials: true }
      )
      .then((res) => {
        setOffers(res.data);
        setFiltered(res.data);
      })
      .catch(console.error);
  }, [companyId]);

  useEffect(() => {
    let temp = offers;

    if (type !== "All") {
      temp = temp.filter((o) => o.type === type);
    }

    if (year !== "All") {
      temp = temp.filter(
        (o) => new Date(o.offer_date).getFullYear().toString() === year
      );
    }

    setFiltered(temp);
  }, [type, year, offers]);

  const years = [
    ...new Set(offers.map((o) => new Date(o.offer_date).getFullYear())),
  ].sort((a, b) => b - a);

  return (
    <div className="company-offers-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Companies
      </button>

      <div className="filters">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>All</option>
          <option>Internship</option>
          <option>Placement</option>
        </select>

        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="All">All Years</option>
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-text">No records found.</p>
      ) : (
        <div className="offers-grid">
          {filtered.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onView={() => setSelectedOffer(offer)}
            />
          ))}
        </div>
      )}

      {selectedOffer && (
        <OfferModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
}
