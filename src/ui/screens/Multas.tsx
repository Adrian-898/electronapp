import "jquery";
import { useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import PdfPrinter from "pdfmake/build/pdfmake.min";
import PdfFonts from "pdfmake/build/vfs_fonts";
import language from "datatables.net-plugins/i18n/es-ES.mjs";
import DATA from "../../tests/data.json";
// import DateTime from "datatables.net-datetime";
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

// instancia de datos de prueba
type person = {
  id: string;
  name: string;
  position: string;
  salary: string;
  start_date: string;
  office: string;
  extn: string;
};

const Multas = () => {
  // Estado de los datos de la tabla
  const [table, _setTable] = useState<person[]>(DATA.data);

  // Cambia el orden de los datos:
  const cols = [
    { data: "name" },
    { data: "position" },
    { data: "office" },
    { data: "extn" },
    { data: "start_date" },
    { data: "salary" },
  ];

  return (
    <div id="multas" className="container-fluid bottom-margin">
      <h1>Tabla</h1>
      <h2>DataTables + React</h2>
      <DataTable
        className="w-100 table table-light table-bordered table-group-divider table-striped border-primary-subtle"
        onDraw={() => {
          console.log("Tabla Dibujada");
        }}
        options={{
          autoWidth: false,
          data: table,
          columns: cols,
          language,
          layout: {
            topStart: {
              buttons: [
                { extend: "copy", className: "bg-primary bg-gradient" },
                { extend: "pdf", className: "bg-primary bg-gradient" },
              ],
            },
          },
        }}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cargo</th>
            <th>Oficina</th>
            <th>Extn.</th>
            <th>Fecha de inicio</th>
            <th>Salario</th>
          </tr>
        </thead>
      </DataTable>
    </div>
  );
};

export default Multas;
