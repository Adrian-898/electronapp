import "jquery";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import PdfPrinter from "pdfmake";
import language from "datatables.net-plugins/i18n/es-ES.mjs";
// import DateTime from "datatables.net-datetime";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.colVis.mjs";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-searchbuilder-bs5";
import "datatables.net-searchpanes-bs5";
import "./styles.css";

DataTable.use(DT);
DT.Buttons.pdfMake(PdfPrinter);

const Multas = () => {
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
        className="container w-100"
        ajax="/src/tests/data.json"
        columns={cols}
        onDraw={() => console.log("Tabla dibujada")}
        options={{
          language,
          layout: {
            topStart: "buttons",
          },
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Office</th>
            <th>Extn.</th>
            <th>Start date</th>
            <th>Salary</th>
          </tr>
        </thead>
      </DataTable>
    </div>
  );
};

export default Multas;
