import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./styles.css";

// Expresion regular para validar el input
const expression = {
  cedula: /^\d{1,8}$/, // 1 a 8 numeros.
};

const Multas = () => {
  const [cedula, setCedula] = useState("");
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  // Validacion de datos del input
  const handleValidation = () => {
    if (expression.cedula.test(cedula)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  // Ejecutado al hacer submit con un valor de cedula valido
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
              Ingresa tu número de cédula
            </label>
          </div>
          <div className="row text-center">
            <input
              id="cedula"
              type="text"
              required
              placeholder="Ejemplo: 25345678"
              className={`form-control form-control-lg fs-3 border-2 ${
                valid ? "border-success" : "border-dark-subtle"
              }`}
              value={cedula}
              onKeyUp={() => {
                handleValidation();
              }}
              onBlur={() => {
                handleValidation();
              }}
              onChange={(e) => setCedula(e.target.value)}
            />

            {!valid && (
              <p className="text-danger fs-4 fw-bold mt-1">
                Debe contener de 1 a 8 números. Sin letras, signos o símbolos de
                ningún tipo.
              </p>
            )}
          </div>
        </form>
      </div>
      <div className="row container justify-content-center">
        <div id="boton-buscar" className="text-center">
          <button
            type="submit"
            disabled={!valid}
            className="btn btn-primary bg-gradient border-2 fs-1"
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
