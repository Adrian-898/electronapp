import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  AttributionControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { type Map, type Icon } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import PersonIcon from "../assets/images/person-standing.svg";
import MarkerIcon from "../assets/images/marker-icon-2x.png";
import Shadow from "../assets/images/marker-shadow.png";
import getErrorMessage from "../../utils/getErrorMessage";

// objeto para almacenar informacion de los lugares que se quiere marcar en el mapa
type Lugar = {
  id: number;
  coords: { lat: number; lng: number };
  name: string;
};

// De aqui se obtienen las coordenadas y el nombre de los lugares para crear los Pins en el mapa
const lugares: Lugar[] = [
  {
    id: 0,
    coords: { lat: 10.598246, lng: -66.930307 },
    name: "Usted está aquí",
  },
  {
    id: 1,
    coords: { lat: 10.60062, lng: -66.922652 },
    name: "Lugar 1",
  },
  {
    id: 2,
    coords: { lat: 10.60172, lng: -66.922543 },
    name: "Lugar 2",
  },
];

const Mapa = () => {
  // estado de la instancia del mapa, se usa para corregir un error de leaflet.
  const [map, setMap] = useState<Map | null>(null);

  // destino establecido al que ir, una vez se selecciona un marcador
  const [destination, setDestination] = useState<Lugar | null>(null);
  const [newDestination, setNewDestination] = useState<Lugar | null>(null);

  // estado visual (mostrado o no segun se toque un marcador del mapa) del boton para trazar ruta del usuario a un lugar determinado
  const [drawRouteButton, setDrawRouteButton] = useState(false);

  // estado visual del boton para eliminar rutas trazadas
  const [removeRouteButton, setRemoveRouteButton] = useState(false);

  // estado que controla la activacion del trazado de ruta de A a B
  const [drawRoute, setDrawRoute] = useState(false);

  // estado de existencia de la ruta trazada y su configuracion
  const [routing, setRouting] = useState<L.Routing.Control | null>(null);

  useEffect(() => {
    if (map) {
      // esta funcion corrige un error de leaflet que no centra el mapa al mostrar el componente y aparece todo en la esquina superior izquierda del contenedor.
      const i = setInterval(() => {
        map.invalidateSize(true);
      }, 500);
      return () => clearInterval(i);
    }
  }, [map]);

  // Calcula la ruta en el mapa y la dibuja al usuario (usando Leaflet Routing Machine).
  useEffect(() => {
    if (!map || !drawRoute || !destination) return;
    if (!routing) {
      // Origen y destino para trazar la ruta:
      let waypoints = [
        L.latLng(lugares[0].coords),
        L.latLng(destination.coords),
      ];

      // Configuracion de la ruta a trazar y demas elementos.
      let routing = L.Routing.control({
        plan: L.Routing.plan(waypoints, {
          createMarker: () => false,
        }),
        containerClassName:
          "card m-3 p-1 bg-secondary-subtle bg-gradient rounded-3 border-2 border-secondary shadow",
        itineraryClassName: "list-group",
        alternativeClassName: "list-group-item list-group-item-action",
        collapseBtnClass:
          "btn btn-link p-2 bg-secondary bg-gradient rounded-1 align-self-center w-100 h-100 ",
        summaryTemplate: `<h5>Vía: <strong>{name}</strong></h5><h2>Distancia: <strong>{distance}</strong>, Tiempo: <strong>{time}</strong></h2>`,
        addWaypoints: false,
        collapsible: true,
        fitSelectedRoutes: true,
        language: "es",
        defaultErrorHandler: () => false,
      }).addTo(map);

      // Manejo de errores
      L.Routing.errorControl(routing, {
        header:
          "Ha ocurrido un error al calcular la ruta, por favor, intente de nuevo...",
        formatMessage: (error) => {
          console.error(
            "Ha ocurrido un error al intentar calcular una ruta.\nStatus: ",
            error.status,
            "\nMensaje: ",
            error.message
          );

          return error.message;
        },
      }).addTo(map);

      if (routing) {
        setRouting(routing);
        setRemoveRouteButton(true);
      }
    }
  }, [drawRoute]);

  // icono a mostrar en la ubicación del usuario (ubicacion actual del modulo de autogestion)
  const personIcon: Icon = new L.Icon({
    iconUrl: PersonIcon,
    iconSize: [45, 65],
    iconAnchor: [22, 32],
    shadowUrl: Shadow,
    shadowAnchor: [14, 18],
    popupAnchor: [0.5, -21],
  });

  // icono de los marcadores en el mapa
  const markerIcon: Icon = new L.Icon({
    iconUrl: MarkerIcon,
    iconSize: [25, 40],
    iconAnchor: [12, 41],
    shadowUrl: Shadow,
    popupAnchor: [1, -38],
  });

  // al presionar un marcador
  const MarkerPress = (lugar: Lugar) => {
    if (!destination || destination !== lugar) {
      setNewDestination(lugar);
      setDrawRouteButton(true);
    } else {
      setDrawRouteButton(false);
    }
  };

  // boton para trazar ruta:
  const DrawRouteButton = () => {
    return (
      <button
        type="button"
        className="btn btn-primary bg-gradient btn-lg border-2 fs-2 position-absolute fixed-bottom m-5"
        onClick={DrawRouteButtonPress}
      >
        Mostrar el camino a {newDestination?.name}
      </button>
    );
  };

  // al presionar el boton para trazar ruta:
  const DrawRouteButtonPress = () => {
    setDrawRouteButton(false);
    if (destination !== newDestination) {
      setDestination(newDestination);
      setDrawRoute(true);
    }
  };

  // boton para eliminar ruta:
  const RemoveRouteButton = () => {
    return (
      <button
        type="button"
        className="btn btn-secondary bg-gradient btn-lg border-2 fs-2 position-absolute fixed-bottom m-5"
        onClick={RemoveRouteButtonPress}
      >
        Calcular nueva ruta (elimina la existente)
      </button>
    );
  };

  // al presionar el boton para eliminar ruta:
  const RemoveRouteButtonPress = () => {
    if (map && routing && removeRouteButton) {
      setRemoveRouteButton(false);
      map.removeControl(routing);
      setRouting(null);
      setDestination(null);
      setDrawRoute(false);
    }
  };

  return (
    <div id="map" className="fixed-top" style={{ bottom: 142.333 }}>
      <MapContainer
        id="mapa-la-guaira"
        className="h-100"
        ref={setMap}
        center={lugares[0].coords}
        zoom={17}
        scrollWheelZoom={false}
        touchZoom
        bounceAtZoomLimits
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <AttributionControl position="bottomleft" />

        {
          // itera el arreglo lugares y renderiza un marcador para cada instancia existente
          map &&
            lugares.map((lugar, index) => (
              <Marker
                key={index}
                position={lugar.coords}
                icon={
                  // se renderiza un icono diferente para la posicion actual
                  lugar.id === 0 ? personIcon : markerIcon
                }
                eventHandlers={{
                  click: () => {
                    console.log("marcador clickeado");
                    // se registra el click solo cuando es en un marcador distinto a la posicion actual.
                    lugar.id !== 0 ? MarkerPress(lugar) : null;
                    // centra el mapa al marcador selecionado
                    map.flyTo(lugar.coords);
                  },
                }}
              >
                {/* Muestra el nombre del lugar seleccionado */}
                <Popup>{lugar.name}</Popup>
              </Marker>
            ))
        }

        {
          // muestra el boton de trazar ruta:
          drawRouteButton && !removeRouteButton && <DrawRouteButton />
        }

        {
          // muestra el boton de borrar ruta
          removeRouteButton && <RemoveRouteButton />
        }
      </MapContainer>
    </div>
  );
};

export default Mapa;
