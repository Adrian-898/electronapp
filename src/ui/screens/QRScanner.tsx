import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import type { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import getErrorMessage from "../../utils/getErrorMessage";

const QRScanner = () => {
  // estado de escaneo de QR, se usa para mostrar el botón de escaneo de nuevo
  const [scanned, setScanned] = useState<boolean>(true);
  // datos del form
  const [parquimetro, setParquimetro] = useState<string>("");
  const [puesto, setPuesto] = useState<string | number>("");

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

  const handleError = (error: unknown) => {
    console.error(
      "Ha ocurrido un error intentando usar la cámara web: ",
      getErrorMessage(error)
    );
  };

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
    <div id="QRScanner" className="container p-5" style={{ bottom: 142.333 }}>
      {/* Modal */}
      <section id="inputModal" className="modal fade" role="dialog">
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
                      className="form-select form-select-lg fs-3 border-1 border-dark-subtle"
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
                      type="number"
                      required
                      min={1}
                      placeholder="Ingresa tu puesto"
                      className="form-control form-control-lg fs-3 border-1 border-dark-subtle"
                      value={puesto}
                      onChange={(e) => setPuesto(e.target.valueAsNumber)}
                    />
                  </div>
                </form>
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
              <button
                type="submit"
                className="btn btn-primary fs-1 fw-bold"
                form="parquimetroForm"
              >
                Buscar
              </button>
            </section>
          </div>
        </div>
      </section>

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
            bottom: 142.333,
            position: "absolute",
            width: "100%",
          },
          video: {
            width: "100%",
          },
        }}
      />

      <section
        id="footer"
        className="row fixed-bottom"
        style={{ bottom: 142.333 }}
      >
        <div className="d-flex justify-content-evenly mb-5">
          {
            // Al escanear un código, se pausa el escaneo hasta presionar el boton
            scanned && (
              <button
                type="button"
                className="btn btn-primary fs-1 fw-bold align-self-center p-3 rounded-4 border-2 border-dark d-flex"
                onClick={() => setScanned(false)}
              >
                Escanear nuevamente
              </button>
            )
          }

          {/* icono que abre el modal */}
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
