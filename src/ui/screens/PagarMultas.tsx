import "jquery";
// import { useState } from "react";
import { useLocation } from "react-router-dom";
// import getErrorMessage from "../../utils/getErrorMessage";
import BackButton from "../components/BackButton";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import PdfPrinter from "pdfmake/build/pdfmake.min";
import PdfFonts from "pdfmake/build/vfs_fonts";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
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

const PagarMultas = () => {
  // hook para acceder al estado enviado desde el componente padre (Multas.tsx)
  const location = useLocation();

  // Estado de los datos de la tabla
  // const [table, setTable] = useState<User[]>();

  // Cambia el orden de muestra de los datos por cada columna:
  const cols = [
    { data: "name" },
    { data: "username" },
    { data: "email" },
    { data: "address.city" },
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
    <div id="pagarMultas" className="container bottom-margin">
      <div className="row container mt-4">
        <div className="col-1">
          <BackButton />
        </div>
        <div className="col-10">
          <h1 className="text-center">Resultados de consulta</h1>
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
                div: {
                  text: `Multas de: ${location.state}`,
                  className: "fs-1",
                },
              },
            },
            language: {
              processing: "Procesando...",
              zeroRecords: "No hay multas para mostrar",
              decimal: ",",
              thousands: ".",
              emptyTable: "Este usuario no tiene multas asignadas...",
              loadingRecords: "Cargando información...",
              infoEmpty: "No hay multas para mostrar",
              infoFiltered: "",
              info: "Mostrando _START_ a _END_ de _TOTAL_ _ENTRIES_",
              search: "Buscar:",
              searchPlaceholder: "Escribe aquí...",
              lengthMenu: "Mostrar _MENU_ registros",
              entries: {
                _: "multas",
                1: "multa",
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

export default PagarMultas;
