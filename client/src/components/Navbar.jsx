import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            {/* Logo */}
            <div className="navbar-logo">
                🌾 Smart Farming Advisor
            </div>

            {/* Navigation Links */}
            <div className="navbar-links">

                <Link to="/">
                    🏠 Home
                </Link>

                <Link to="/">
                    🌦️ Weather
                </Link>

                <Link to="/fertilizer-advisor">
                    🧪 Fertilizer Advisor
                </Link>

                <Link to="/pest-disease-advisor">
                    🌿 Pest & Disease
                </Link>

                <Link to="/">
                    📋 Advisory
                </Link>

                <Link to="/">
                    ℹ️ About
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;