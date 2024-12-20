import "jquery";
// import { useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import PdfPrinter from "pdfmake/build/pdfmake.min";
import PdfFonts from "pdfmake/build/vfs_fonts";
import language from "datatables.net-plugins/i18n/es-ES.mjs";
// import getErrorMessage from "../../utils/getErrorMessage";
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

  // Cambia el orden de los datos:
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
  // GET a la API para obtener los datos de la tabla
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
*/
  /*
  window.addEventListener("load", async () => {
    await listUsers();
  });
*/
  return (
    <div id="multas" className="container bottom-margin">
      <h1>Tabla Multas</h1>
      <hr />
      <div className="row">
        <DataTable
          className="w-100 table table-light table-bordered table-group-divider table-striped border-primary-subtle"
          onDraw={() => {
            console.log("Tabla Dibujada");
          }}
          options={{
            autoWidth: false,
            ajax: {
              url: "https://jsonplaceholder.typicode.com/users",
              dataSrc: "",
            },
            columns: cols,
            language,
            ordering: false,
            layout: {
              topStart: {
                buttons: [
                  {
                    extend: "pdf",
                    text: "",
                    titleAttr: "Exportar a PDF",

                    className: "bi bi-filetype-pdf fs-2 bg-danger bg-gradient",
                  },
                ],
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
