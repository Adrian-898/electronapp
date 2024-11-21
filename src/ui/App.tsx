import Home from "./screens/Home";
import Map from "./screens/Map";
import QRScanner from "./screens/QRScanner";

const App = () => {
  return (
    <>
      <div id="app" className="p-5">
        <div id="content" className="row g-0">
          <div className="tab-content">
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
        </div>
      </div>

      <div id="tabBar" className="row fixed-bottom">
        <ol
          className="nav nav-tabs nav-underline justify-content-evenly bg-light border-2 border-top border-dark-subtle"
          id="tabButtons"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link fs-1 fw-bold d-flex align-items-center px-2"
              id="scanner-tab"
              data-bs-toggle="tab"
              data-bs-target="#scanner"
              type="button"
              role="tab"
              aria-controls="scanner"
              aria-current="page"
            >
              <i
                className="bi bi-camera"
                style={{ fontSize: 80, paddingRight: 10 }}
              ></i>
              QR
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link fs-1 fw-bold d-flex  align-items-center active px-2"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
            >
              <i
                className="bi bi-house-door"
                style={{ fontSize: 80, paddingRight: 10 }}
              ></i>
              Inicio
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link fs-1 fw-bold d-flex  align-items-center px-2"
              id="map-tab"
              data-bs-toggle="tab"
              data-bs-target="#map"
              type="button"
              role="tab"
              aria-controls="map"
            >
              <i
                className="bi bi-geo-alt"
                style={{ fontSize: 80, paddingRight: 10 }}
              ></i>
              Ubicación
            </button>
          </li>
        </ol>
      </div>
    </>
  );
};

export default App;

