const Home = () => {
  return (
    <div id="home" className="container p-5" style={{ marginBottom: 142.333 }}>
      {/* Modal */}
      <section id="modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-1 fw-bold" id="modalTitle">
                Información:
              </h1>
            </div>
            <div className="modal-body fs-2">
              Bienvenido al módulo de autogestión App la guaira, aquí
              encontrarás distintos servicios a los que puedes acceder desde los
              botones disponibles en esta pantalla, en la barra de navegación
              abajo podrás acceder a las secciones QR y Ubicación. Para salir al
              menú, presiona el botón "Cerrar".
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
      </section>

      {/* header con mensaje de bienvenida e icono de info para abrir el modal*/}
      <section id="header" className="row pb-5 justify-content-evenly">
        <div className="col-5 fs-1 fw-bold bg-dark-subtle p-2 rounded-4 justify-content-center align-self-center d-flex">
          Bienvenido, <br /> Usuario!
        </div>

        <div className="col-2 justify-content-center d-flex">
          <i
            className="bi bi-info-circle bg-dark-subtle p-2 rounded-4 border border-2 border-dark align-self-center d-flex"
            style={{ fontSize: 80 }}
            data-bs-toggle="modal"
            data-bs-target="#modal"
          ></i>
        </div>
      </section>

      <hr />
      {/* menu de botones */}
      <section id="content" className="row py-5 justify-content-center">
        <div id="emergencias" className="row justify-content-center mb-5">
          <div className="col-2 justify-content-center d-flex">
            <i
              className="bi bi-hospital bg-dark-subtle p-3 rounded-4 d-flex"
              style={{ fontSize: 80 }}
            ></i>
          </div>
          <div className="col-4 align-self-center">
            <a
              id="b1"
              className="btn btn-lg btn-primary border-2 border-dark fs-1 fw-bold"
              href="#"
            >
              Emergencias
            </a>
          </div>
        </div>

        <div id="parquimetro" className="row justify-content-center mb-5">
          <div className="col-2 justify-content-center d-flex">
            <i
              className="bi bi-car-front bg-dark-subtle p-3 rounded-4 d-flex"
              style={{ fontSize: 80 }}
            ></i>
          </div>
          <div className="col-4 align-self-center">
            <a
              id="b2"
              className="btn btn-lg btn-primary border-2 border-dark fs-1 fw-bold"
              href="#"
            >
              Parquímetro
            </a>
          </div>
        </div>

        <div id="servicios" className="row justify-content-center mb-5">
          <div className="col-2 justify-content-center d-flex">
            <i
              className="bi bi-lightbulb bg-dark-subtle p-3 rounded-4 d-flex"
              style={{ fontSize: 80 }}
            ></i>
          </div>
          <div className="col-4 align-self-center">
            <a
              id="b3"
              className="btn btn-lg btn-primary border-2 border-dark fs-1 fw-bold"
              href="#"
            >
              Servicios
            </a>
          </div>
        </div>

        <div id="comercio" className="row justify-content-center mb-5">
          <div className="col-2 justify-content-center d-flex">
            <i
              className="bi bi-shop bg-dark-subtle p-3 rounded-4 d-flex"
              style={{ fontSize: 80 }}
            ></i>
          </div>
          <div className="col-4 align-self-center">
            <a
              id="b4"
              className="btn btn-lg btn-primary border-2 border-dark fs-1 fw-bold"
              href="#"
            >
              Comercio
            </a>
          </div>
        </div>

        <div id="denuncias" className="row justify-content-center mb-5">
          <div className="col-2 justify-content-center d-flex">
            <i
              className="bi bi-person-exclamation bg-dark-subtle p-3 rounded-4 d-flex"
              style={{ fontSize: 80 }}
            ></i>
          </div>
          <div className="col-4 align-self-center">
            <a
              id="b5"
              className="btn btn-lg btn-primary border-2 border-dark fs-1 fw-bold"
              href="#"
            >
              Denuncias
            </a>
          </div>
        </div>

        <div id="multas" className="row justify-content-center">
          <div className="col-2 justify-content-center d-flex">
            <i
              className="bi bi-sign-no-parking bg-dark-subtle p-3 rounded-4 d-flex"
              style={{ fontSize: 80 }}
            ></i>
          </div>
          <div className="col-4 align-self-center">
            <a
              id="b6"
              className="btn btn-lg btn-primary border-2 border-dark fs-1 fw-bold"
              href="#"
            >
              Multas
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
