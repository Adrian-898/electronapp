import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import type { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import getErrorMessage from "../../utils/getErrorMessage";

const expression = {
  puesto: /\b[1-9][0-9]*\b/,
};

const QRScanner = () => {
  // estado de escaneo de QR, se usa para mostrar el botón de escaneo de nuevo
  const [scanned, setScanned] = useState<boolean>(true);

  // valores de los inputs del form
  const [parquimetro, setParquimetro] = useState<string>("");
  const [puesto, setPuesto] = useState<string>("");

  // validez del input puesto
  const [validPuesto, setValidPuesto] = useState<boolean>();

  // Validacion de datos del input
  const handleValidation = () => {
    if (expression.puesto.test(puesto)) {
      setValidPuesto(true);
    } else {
      setValidPuesto(false);
    }
  };

  // funcion ejecutada al leer un QR
  const handleBarCodeScan = (result: IDetectedBarcode[]) => {
    try {
      if (result) {
        // Aquí puedes hacer lo que desees con el resultado del QR
        setScanned(true);
        console.log(result[0].rawValue);
      }
    } catch (error) {
      console.error(
        "Ha ocurrido un error al leer el QR: ",
        getErrorMessage(error)
      );
    }
  };

  // manejo de errores con la camara web
  const handleError = (error: unknown) => {
    console.error(
      "Ha ocurrido un error intentando usar la cámara web: ",
      getErrorMessage(error)
    );
  };

  // control de los datos del form al hacer submit
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parquimetro !== "" && puesto !== "") {
      const url = `https://${parquimetro}/${puesto}`;

      try {
        console.log(url);
      } catch (error) {
        console.error(
          "Ha ocurrido un error al cargar los datos: ",
          getErrorMessage(error)
        );
      }
    }
  };

  return (
    <div id="QRScanner" className="container p-5 bottom-margin">
      {/* Modal para input manual de datos */}
      <section id="inputModal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <section className="modal-header">
              <h1 className="modal-title" id="inputModalTitle">
                Ingresa tus datos:
              </h1>
            </section>

            <section className="modal-body">
              <div className="container-fluid">
                <form id="parquimetroForm" onSubmit={handleForm}>
                  <div className="row mb-3">
                    <label htmlFor="parquimetro" className="form-label fs-2">
                      Parquímetro
                    </label>
                    <select
                      id="parquimetro"
                      required
                      className={`form-select form-select-lg fs-3 border-2 ${
                        parquimetro !== ""
                          ? "border-success"
                          : "border-dark-subtle"
                      }`}
                      value={parquimetro}
                      onChange={(e) => setParquimetro(e.target.value)}
                    >
                      <option value={""}>Selecciona una opción</option>
                      <option value="P1">Parquímetro 1</option>
                      <option value="P2">Parquímetro 2</option>
                      <option value="P3">Parquímetro 3</option>
                      <option value="P4">Parquímetro 4</option>
                      <option value="P5">Parquímetro 5</option>
                      <option value="P6">Parquímetro 6</option>
                    </select>
                  </div>
                  <div className="row">
                    <label htmlFor="numeroPuesto" className="form-label fs-2">
                      Número de puesto
                    </label>
                    <input
                      id="numeroPuesto"
                      type="text"
                      required
                      placeholder="Ingresa tu puesto"
                      className={`form-control form-control-lg fs-3 border-2 ${
                        validPuesto ? "border-success" : "border-dark-subtle"
                      }`}
                      value={puesto}
                      onKeyUp={() => {
                        handleValidation();
                      }}
                      onBlur={() => {
                        handleValidation();
                      }}
                      onChange={(e) => setPuesto(e.target.value)}
                    />

                    {!validPuesto && (
                      <p
                        className="text-danger fs-4 fw-bold mt-1"
                        hidden={validPuesto === undefined}
                      >
                        Debe contener uno o más números (sin ceros a la
                        izquierda).
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </section>

            <section className="modal-footer justify-content-evenly">
              <button
                type="button"
                className="btn btn-secondary bg-gradient border-2 fs-1 fw-bold"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="submit"
                disabled={!validPuesto}
                className="btn btn-primary bg-gradient border-2 fs-1 fw-bold"
                form="parquimetroForm"
              >
                Buscar
              </button>
            </section>
          </div>
        </div>
      </section>

      {/*header con mensaje de titulo*/}
      <section id="header" className="row container justify-content-center">
        <div className="text-center fs-1 fw-bold bg-dark-subtle p-2 rounded-4">
          Escanea un código QR / Ingresa los datos
        </div>
      </section>

      {/* Componente que muestra la camara en pantalla y permite el escaneo */}
      <Scanner
        onScan={(result) => handleBarCodeScan(result)}
        onError={(error) => handleError(error)}
        formats={["qr_code"]}
        paused={scanned}
        components={{ audio: false, finder: false, zoom: false }}
        allowMultiple={false}
        styles={{
          container: {
            zIndex: -1,
            left: 0,
            bottom: 141.6,
            position: "absolute",
            width: "100%",
          },
          video: {
            width: "100%",
          },
        }}
      />

      {/* footer mostrando el boton de escaneo y el boton de ingresar datos manualmente */}
      <section id="footer" className="row fixed-bottom bottom-margin">
        <div className="d-flex justify-content-evenly mb-5">
          {
            // Al escanear un código, se pausa la imagen y el escaneo se desactiva hasta presionar el boton.
            scanned && (
              <button
                type="button"
                className="btn btn-primary bg-gradient fs-1 fw-bold align-self-center p-3 rounded-4 border-2 border-dark d-flex"
                onClick={() => setScanned(false)}
              >
                Escanear un nuevo código QR
              </button>
            )
          }

          {/* icono que abre el modal para ingresar datos*/}
          <i
            className="bi bi-input-cursor-text p-3 bg-dark-subtle rounded-4 border border-2 border-dark d-flex icon-size"
            data-bs-toggle="modal"
            data-bs-target="#inputModal"
          ></i>
        </div>
      </section>
    </div>
  );
};

export default QRScanner;
