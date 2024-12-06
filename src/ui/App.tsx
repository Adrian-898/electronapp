import Home from "./screens/Home";
import Map from "./screens/Map";
import QRScanner from "./screens/QRScanner";

const App = () => {
  return (
    <>
      <section id="tabContent" className="row tab-content h-100">
        <div className="tab-pane show active" id="home">
          {<Home />}
        </div>
        <div className="tab-pane" id="scanner">
          {<QRScanner />}
        </div>
        <div className="tab-pane" id="map">
          {<Map />}
        </div>
      </section>

      <section id="tabBar" className="row fixed-bottom">
        <ol
          className="nav nav-tabs nav-underline justify-content-evenly bg-light border-2 border-top border-dark-subtle"
          id="tabButtons"
          role="tablist"
        >
          <li className="nav-item">
            <button
              className="nav-link fs-1 fw-bold d-flex align-items-center px-4"
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

          <li className="nav-item">
            <button
              className="nav-link fs-1 fw-bold d-flex align-items-center px-4 active"
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

          <li className="nav-item">
            <button
              className="nav-link fs-1 fw-bold d-flex  align-items-center px-4"
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

