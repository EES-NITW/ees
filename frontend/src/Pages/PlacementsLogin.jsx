import "./PlacementsLogin.css";
import Particlebg from "../components/Particlebg";
export default function Placements() {
    return (
        <div className="placements-container">
            <Particlebg />
            <h1 className="placements-title">
                Explore Placement Insights and Achievements
            </h1>

            <button className="google-btn" onClick={() => {
                window.location.href = "http://localhost:5000/auth/google";
            }}>
                <img src="https://developers.google.com/identity/images/g-logo.png" className="google-icon" />
                Login with Google
            </button>


            <p className="note-text">
                Login using your <strong>@student.nitw.ac.in</strong> email to access the placement portal.
            </p>
        </div>
    );
}
