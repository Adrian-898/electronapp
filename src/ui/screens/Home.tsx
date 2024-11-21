const Home = () => {
  return (
    <div id="home" className="container">
      {/* Modal */}
      <div className="modal fade" id="modal" aria-labelledby="modalTitle">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-1 fw-bold" id="modalTitle">
                Información:
              </h1>
            </div>
            <div className="modal-body fs-2">
              Bienvenido a tu App La Guaira, aquí encontrarás distintos
              servicios a los que puedes acceder desde los botones disponibles
              en esta pantalla, en la barra de navegación abajo podrás acceder a
              las secciones QR y Ubicación. Para salir al menú, presiona el
              botón "Cerrar".
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary fs-1 fw-bold"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* header con mensaje e icono de info para el modal*/}
      <div id="header" className="row justify-content-between">
        <div className="col-10 fs-1 fw-bold align-self-center">
          Bienvenido, Usuario!
        </div>
        <div className="col-2">
          <i
            className="bi bi-info-circle m-5 button"
            style={{ fontSize: 80 }}
            data-bs-toggle="modal"
            data-bs-target="#modal"
          ></i>
        </div>
      </div>

      {/* menu de botones */}
      <div id="content" className="row mt-5 justify-content-center">
        <div id="emergencias" className="row justify-content-center mb-4">
          <div className="col-2">
            <i className="bi bi-hospital m-5" style={{ fontSize: 80 }}></i>
          </div>
          <div className="col-4 align-self-center">
            <a
              id="b1"
              className="btn btn-lg btn-primary border-2 border-dark fs-1 fw-bold"
              href="#"
              role="button"
            >
              Emergencias
            </a>
          </div>
        </div>

        <div id="parquimetro" className="row justify-content-center mb-4">
          <div className="col-2">
            <i className="bi bi-car-front m-5" style={{ fontSize: 80 }}></i>
          </div>
          <div className="col-4 align-self-center">
            <a
              id="b2"
              className="btn btn-lg btn-primary border-2 border-dark fs-1 fw-bold"
              href="#"
              role="button"
            >
              Parquímetro
            </a>
          </div>
        </div>

        <div id="servicios" className="row justify-content-center mb-4">
          <div className="col-2">
            <i
              className="bi bi-lightbulb-fill m-5"
              style={{ fontSize: 80 }}
            ></i>
          </div>
          <div className="col-4 align-self-center">
            <a
              id="b3"
              className="btn btn-lg btn-primary border-2 border-dark fs-1 fw-bold"
              href="#"
              role="button"
            >
              Servicios
            </a>
          </div>
        </div>

        <div id="comercio" className="row justify-content-center mb-4">
          <div className="col-2">
            <i className="bi bi-shop m-5" style={{ fontSize: 80 }}></i>
          </div>
          <div className="col-4 align-self-center">
            <a
              id="b4"
              className="btn btn-lg btn-primary border-2 border-dark fs-1 fw-bold"
              href="#"
              role="button"
            >
              Comercio
            </a>
          </div>
        </div>

        <div id="denuncias" className="row justify-content-center mb-4">
          <div className="col-2">
            <i
              className="bi bi-person-exclamation m-5"
              style={{ fontSize: 80 }}
            ></i>
          </div>
          <div className="col-4 align-self-center">
            <a
              id="b5"
              className="btn btn-lg btn-primary border-2 border-dark fs-1 fw-bold"
              href="#"
              role="button"
            >
              Denuncias
            </a>
          </div>
        </div>

        <div id="multas" className="row justify-content-center mb-4">
          <div className="col-2">
            <i
              className="bi bi-sign-no-parking m-5"
              style={{ fontSize: 80 }}
            ></i>
          </div>
          <div className="col-4 align-self-center">
            <a
              id="b6"
              className="btn btn-lg btn-primary border-2 border-dark fs-1 fw-bold"
              href="#"
              role="button"
            >
              Multas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
