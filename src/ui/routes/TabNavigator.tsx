import { Link, Route, Routes } from "react-router-dom";
import Home from "../screens/Home.tsx";
import QRScanner from "../screens/QRScanner.tsx";
import Map from "../screens/Map.tsx";
import "./TabNavigator.css";

const TabNavigator = () => {
  return (
    <div className="tab-navigator">
      <div>
        <Link to="/Home" className="tab">
          Inicio
        </Link>
        <Link to="/QRScanner" className="tab">
          QR
        </Link>
        <Link to="/Map" className="tab">
          Ubicación
        </Link>
      </div>

      <Routes>
        <Route path="/Home" Component={Home} />
        <Route path="/QRScanner" Component={QRScanner} />
        <Route path="/Map" Component={Map} />
      </Routes>
    </div>
  );
};

export default TabNavigator;
