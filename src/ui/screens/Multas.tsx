import "jquery";
// import { useState } from "react";
// import getErrorMessage from "../../utils/getErrorMessage";
import BackButton from "../components/BackButton";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import PdfPrinter from "pdfmake/build/pdfmake.min";
import PdfFonts from "pdfmake/build/vfs_fonts";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.colVis.mjs";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-staterestore-bs5";
import "./styles.css";

// Inicializa DataTables con estilos de Bootstrap 5
DataTable.use(DT);
// Asigna fonts a PdfMake para exportar la tabla
PdfPrinter.vfs = PdfFonts.vfs;
// Agrega los botones
DT.Buttons.pdfMake(PdfPrinter);

/*
// instancia de datos de prueba
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
*/

const Multas = () => {
  // Estado de los datos de la tabla
  // const [table, setTable] = useState<User[]>();

  // Cambia el orden de muestra de los datos por cada columna:
  const cols = [
    { data: "name" },
    { data: "username" },
    { data: "email" },
    { data: "address.street" },
    { data: "phone" },
    { data: "website" },
    { data: "company.name" },
  ];

  /*
  useEffect(() => {
  // GET a la API para obtener los datos de la tabla, no se usa porque la propiedad ajax de DataTables maneja esto automaticamente...
    const listUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        let data = await response.json();
        console.log(data);
        setTable(data);
      } catch (error) {
        console.error("Ha ocurrido un error: ", getErrorMessage(error));
      }
    };

    listUsers();
  }, []);
*/

  return (
    <div id="multas" className="container bottom-margin">
      <div className="row container mt-4">
        <div className="col-1">
          <BackButton />
        </div>
        <div className="col-10">
          <h1 className="text-center">Tabla Multas</h1>
        </div>
      </div>
      <hr />
      <div className="row container">
        <DataTable
          className="table table-light table-bordered table-group-divider table-striped border-primary-subtle"
          options={{
            autoWidth: false,
            ordering: false,
            columns: cols,
            ajax: {
              url: "https://jsonplaceholder.typicode.com/users",
              // dataSrc: "", permite leer los datos recibidos del fetch cuando vienen en forma de array de objetos sin nombre.
              dataSrc: "",
            },
            layout: {
              topStart: {
                buttons: [
                  {
                    extend: "pdf",
                    text: "",
                    titleAttr: "Exportar a PDF",
                    // Icono de PDF y estilos del boton:
                    className: "bi bi-filetype-pdf fs-2 bg-danger bg-gradient",
                  },
                ],
              },
            },
            language: {
              processing: "Procesando...",
              zeroRecords: "No se han encontrado registros...",
              decimal: ",",
              emptyTable: "No hay datos para mostrar...",
              loadingRecords: "Cargando información...",
              infoEmpty: "No hay registros para mostrar",
              infoFiltered: "(filtrados de un total de _MAX_ registros)",
              info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
              search: "Buscar:",
              searchPlaceholder: "Escribe aquí...",
              thousands: ".",
              entries: {
                _: "registros",
                1: "registro",
              },
            },
          }}
        >
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Nombre de Usuario</th>
              <th>E-Mail</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Sitio Web</th>
              <th>Empresa</th>
            </tr>
          </thead>
        </DataTable>
      </div>
      <hr />
    </div>
  );
};

export default Multas;
