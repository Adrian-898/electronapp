import Home from "./screens/Home";
import Map from "./screens/Map";
import QRScanner from "./screens/QRScanner";

const App = () => {
  return (
    <>
      <div id="app" className="p-5">
        <div id="content" className="row g-0">
          <section id="tabContent" className="tab-content">
            <div className="tab-pane show active" id="home" role="tabpanel">
              {<Home />}
            </div>
            <div className="tab-pane" id="scanner" role="tabpanel">
              {<QRScanner />}
            </div>
            <div className="tab-pane" id="map" role="tabpanel">
              {<Map />}
            </div>
          </section>
        </div>
      </div>

      <section id="tabBar" className="row fixed-bottom">
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
              className="nav-link fs-1 fw-bold d-flex  align-items-center px-2 active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
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
            >
              <i
                className="bi bi-geo-alt"
                style={{ fontSize: 80, paddingRight: 10 }}
              ></i>
              Ubicación
            </button>
          </li>
        </ol>
      </section>
    </>
  );
};

export default App;

