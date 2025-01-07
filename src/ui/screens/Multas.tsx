import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./styles.css";

const Multas = () => {
  const [cedula, setCedula] = useState<number | string>("");
  const navigate = useNavigate();

  // manejo de los datos del form (ingreso manual de datos)
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(cedula);
    navigate("/PagarMultas", { state: cedula });
  };

  return (
    <div id="multas" className="container bottom-margin">
      <div className="row container mt-4">
        <div className="col-1">
          <BackButton />
        </div>
        <div className="col-10">
          <h1 className="text-center">Consultar Multas</h1>
        </div>
      </div>
      <hr />
      <div
        id="cedulaInput"
        className="row container justify-content-center mb-4"
      >
        <form id="cedulaForm" onSubmit={handleForm}>
          <div className="row mb-4">
            <label htmlFor="cedula" className="form-label fs-2">
              Ingresa tu cédula de identidad (sin letras ni separadores de
              cifras)
            </label>
          </div>
          <div className="row">
            <input
              id="cedula"
              type="number"
              required
              min={1}
              placeholder="Ejemplo: 25345678"
              className="form-control form-control-lg fs-3 border-1 border-dark-subtle"
              value={cedula}
              onChange={(e) => setCedula(e.target.valueAsNumber)}
            />
          </div>
        </form>
      </div>
      <div className="row container justify-content-center">
        <div id="boton-buscar" className="col-2 text-center">
          <button
            type="submit"
            className="btn btn-primary bg-gradient border-2 fs-1 m-2"
            form="cedulaForm"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Multas;
