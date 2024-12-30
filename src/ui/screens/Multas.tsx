import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./styles.css";

const Multas = () => {
  return (
    <div id="multas" className="container bottom-margin">
      <div className="row container mt-4">
        <div className="col-1">
          <BackButton />
        </div>
        <div className="col-10">
          <h1 className="text-center">Multas</h1>
        </div>
      </div>
      <hr />
      <div className="row container justify-content-center">
        <div id="boton-pagar" className="col-2 text-center">
          <Link
            className="btn btn-primary bg-gradient fs-1 m-2"
            to="/PagarMultas"
          >
            Pagar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Multas;
