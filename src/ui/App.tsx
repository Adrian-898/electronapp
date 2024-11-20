import Home from "./screens/Home";
import Map from "./screens/Map";
import QRScanner from "./screens/QRScanner";

const App = () => {
  return (
    <div id="app">
      <div className="tab-content m-4">
        <div
          className="tab-pane"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          {<Home />}
        </div>
        <div
          className="tab-pane"
          id="scanner"
          role="tabpanel"
          aria-labelledby="scanner-tab"
        >
          {<QRScanner />}
        </div>
        <div
          className="tab-pane"
          id="map"
          role="tabpanel"
          aria-labelledby="map-tab"
        >
          {<Map />}
        </div>
      </div>

      <ul
        className="nav nav-tabs fixed-bottom justify-content-evenly bg-light border-2 border-top border-secondary-subtle"
        id="myTab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link fs-1 fw-bold active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
          >
            <i className="bi bi-house-door p-2"></i>
            Inicio
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link fs-1 fw-bold"
            id="scanner-tab"
            data-bs-toggle="tab"
            data-bs-target="#scanner"
            type="button"
            role="tab"
            aria-controls="scanner"
          >
            <i className="bi bi-camera p-2"></i>
            QR
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link fs-1 fw-bold"
            id="map-tab"
            data-bs-toggle="tab"
            data-bs-target="#map"
            type="button"
            role="tab"
            aria-controls="map"
          >
            <i className="bi bi-geo-alt p-2"></i>
            Ubicación
          </button>
        </li>
      </ul>
    </div>
  );
};

export default App;

