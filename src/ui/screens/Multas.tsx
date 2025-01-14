import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./styles.css";

// Expresion regular para validar el input
const expression = {
  cedula: /^(?:[1-9][0-9]{0,7})$/, // 1 a 8 numeros.
};

const Multas = () => {
  // valor del input
  const [cedula, setCedula] = useState("");
  // validez del input
  const [valid, setValid] = useState<boolean>();
  // Hook de navegacion de react-router-dom, se usa para navegar a la pantalla de los resultados de la consulta
  const navigate = useNavigate();
  // tipo de teclado activo
  const [keyboardLayout, setKeyboardLayout] = useState(false);

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
    // Aqui se puede hacer la llamada a la API para obtener los datos de las multas
    e.preventDefault();

    console.log(cedula);
    navigate("/PagarMultas", { state: cedula });
  };

  return (
    <div id="multas" className="container bottom-margin">
      {/* Header con boton para navegar a la pagina anterior (BackButton) y titulo informativo */}
      <section id="header" className="row container mt-4">
        <div className="col-1">
          <BackButton />
        </div>
        <div className="col-10">
          <h1 className="text-center">Consultar Multas</h1>
        </div>
      </section>
      <hr />

      {/* Input de dato (cedula) */}
      <section
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
              color="red"
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
              <p
                className="text-danger fs-4 fw-bold mt-1"
                hidden={valid === undefined}
              >
                Debe contener de uno (1) a ocho (8) números (sin ceros a la
                izquierda).
              </p>
            )}
          </div>
        </form>
      </section>

      {/* Boton para enviar el form */}
      <section
        id="submit-button"
        className="row container justify-content-center"
      >
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
      </section>

      {/* Teclado Virtual */}
      <section className="row container position-fixed bottom-0 bottom-margin pb-5">
        <Keyboard
          theme="hg-theme-default hg-layout-numeric numeric-theme"
          layout={{
            default: ["1 2 3", "4 5 6", "7 8 9", "{shift} 0 _", "{bksp}"],
            shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp}"],
          }}
          onKeyPress={(button) => {
            if (button === "{shift}") {
              setKeyboardLayout(!keyboardLayout);
            }
          }}
          layoutName={keyboardLayout ? "shift" : "default"}
          autoUseTouchEvents
          disableButtonHold
          newLineOnEnter={false}
          tabCharOnTab={false}
          updateCaretOnSelectionChange
          display={{
            ["{bksp}"]: "borrar",
            ["{shift}"]: "shift",
          }}
          onChange={(e) => {
            setCedula(e);
          }}
          onKeyReleased={() => {
            handleValidation();
          }}
        />
      </section>
    </div>
  );
};

export default Multas;
