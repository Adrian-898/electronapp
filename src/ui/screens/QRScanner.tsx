// import { useState } from "react";

const QRScanner = () => {
  /*
  // estado de escaneo de QR, se usa para mostrar el botón de escaneo de nuevo
  const [scanned, setScanned] = useState<boolean>(false);

  // funcion ejecutada al leer un QR
  const handleBarCodeScan = () => {
    setScanned(true);
  };

  const handleSubmit = async (
    parquimetro: string,
    puesto: number | undefined
  ) => {
    const url = `https://${parquimetro}/${puesto}`;

    try {
    } catch (error) {}
  };
  */

  return (
    <div id="QRScanner" className="container">
      {/* Modal */}
      <section id="inputModal" className="modal fade" role="form">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <section className="modal-header">
              <h1 className="modal-title" id="inputModalTitle">
                Ingresa tus datos:
              </h1>
            </section>
            <section className="modal-body">
              <div className="container-fluid">
                <div className="row mb-3">
                  <form id="parquimetroForm">
                    <label htmlFor="parquimetro" className="form-label fs-2">
                      Parquímetro
                    </label>
                    <select
                      id="parquimetro"
                      className="form-select form-select-lg fs-3 border-1 border-dark-subtle"
                    >
                      <option value="P1">Parquímetro 1</option>
                      <option value="P2">Parquímetro 2</option>
                      <option value="P3">Parquímetro 3</option>
                      <option value="P4">Parquímetro 4</option>
                      <option value="P5">Parquímetro 5</option>
                      <option value="P6">Parquímetro 6</option>
                    </select>
                    <div className="form-text text-danger">
                      espacio para mensajes de error al usuario
                    </div>
                  </form>
                </div>
                <div className="row">
                  <form id="numeroPuestoForm">
                    <label htmlFor="numeroPuesto" className="form-label fs-2">
                      Número de puesto
                    </label>
                    <input
                      id="numeroPuesto"
                      type="text"
                      className="form-control form-control-lg fs-3 border-1 border-dark-subtle"
                    />
                    <div className="form-text text-danger">
                      espacio para mensajes de error al usuario
                    </div>
                  </form>
                </div>
              </div>
            </section>
            <section className="modal-footer justify-content-evenly">
              <button
                type="button"
                className="btn btn-secondary fs-1 fw-bold"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="button" className="btn btn-primary fs-1 fw-bold">
                Buscar
              </button>
            </section>
          </div>
        </div>
      </section>

      <section id="header" className="row">
        <div className="text-center fs-1 fw-bold bg-dark-subtle p-2 rounded-4">
          Escanea un código QR / Ingresa los datos
        </div>
      </section>

      <section
        id="footer"
        className="row fixed-bottom"
        style={{ marginBottom: 142.333 }}
      >
        <div className="d-flex justify-content-evenly my-5">
          {
            <button
              type="button"
              className="btn btn-primary fs-1 fw-bold align-self-center p-3 rounded-4 border-2 border-dark d-flex"
            >
              Escanear nuevamente
            </button>
          }
          <i
            className="bi bi-input-cursor-text p-3 bg-dark-subtle rounded-4 border border-2 border-dark d-flex"
            style={{ fontSize: 80 }}
            data-bs-toggle="modal"
            data-bs-target="#inputModal"
          ></i>
        </div>
      </section>
    </div>
  );
};

export default QRScanner;
