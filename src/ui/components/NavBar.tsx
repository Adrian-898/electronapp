import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [activeTab, setActiveTab] = useState("home-tab");

  return (
    <nav id="tabBar" className="row fixed-bottom">
      <ol
        className="nav nav-tabs nav-underline justify-content-evenly bg-light border-2 border-top border-dark-subtle"
        id="tabButtons"
      >
        <li className="nav-item">
          <Link
            className={`nav-link fs-1 fw-bold d-flex align-items-center px-4 ${
              activeTab === "scanner-tab" ? " active" : ""
            }`}
            id="scanner-tab"
            type="button"
            to={"/QRScanner"}
            onClick={() => setActiveTab("scanner-tab")}
          >
            <i className="bi bi-camera tab-bar-icon"></i>
            Escáner QR
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link fs-1 fw-bold d-flex align-items-center px-4 ${
              activeTab === "home-tab" ? " active" : ""
            }`}
            id="home-tab"
            type="button"
            to={"/"}
            onClick={() => setActiveTab("home-tab")}
          >
            <i className="bi bi-house-door tab-bar-icon"></i>
            Inicio
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link fs-1 fw-bold d-flex align-items-center px-4 ${
              activeTab === "map-tab" ? " active" : ""
            }`}
            id="map-tab"
            type="button"
            to={"/Map"}
            onClick={() => setActiveTab("map-tab")}
          >
            <i className="bi bi-geo-alt tab-bar-icon"></i>
            Ubicación
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default NavBar;
