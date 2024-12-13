import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  AttributionControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { type Map, type Icon } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import PersonIcon from "../assets/images/person-standing.svg";
import MarkerIcon from "../assets/images/marker-icon-2x.png";
import Shadow from "../assets/images/marker-shadow.png";
import "./styles.css";

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

  // estado de existencia de la ruta trazada y su configuración en el mapa
  const [routing, setRouting] = useState<L.Routing.Control | null>(null);

  // estado del manejo de errores de rutas trazadas en el mapa
  const [routingErrorHandler, setRoutingErrorHandler] =
    useState<L.Routing.ErrorControl | null>(null);

  // Calcula la ruta en el mapa y la dibuja al usuario (usando Leaflet Routing Machine).
  useEffect(() => {
    if (!map || !drawRoute || !destination) return;
    if (!routing) {
      // Origen y destino para trazar la ruta (se puede agregar mas de 2):
      let waypoints = [
        L.latLng(lugares[0].coords),
        L.latLng(destination.coords),
      ];

      // Configuracion de la ruta a trazar y demas elementos.
      let routing = L.Routing.control({
        plan: L.Routing.plan(waypoints, {
          // se evita crear el marcador por defecto que leaflet asigna a cada waypoint
          createMarker: () => false,
        }),
        // configuracion de la ventana con el itinerario de viaje:
        containerClassName:
          "card m-3 p-1 w-100 bg-secondary-subtle bg-gradient align-items-center rounded-3 border-2 border-secondary shadow",
        collapseBtnClass:
          "btn btn-link p-2 bg-secondary bg-gradient rounded-1 w-100 h-100",
        summaryTemplate: `<h5>Vía: <strong>{name}</strong></h5><h2>Distancia: <strong>{distance}</strong>, Tiempo: <strong>{time}</strong><hr><strong>Indicaciones:</strong></h2>`,
        showAlternatives: false,
        addWaypoints: false,
        collapsible: true,
        fitSelectedRoutes: true,
        language: "es",
        defaultErrorHandler: () => false,
      }).addTo(map);

      // Manejo de errores
      let errorHandler = L.Routing.errorControl(routing, {
        header:
          "Ha ocurrido un error al calcular la ruta, por favor, espere unos minutos e intente de nuevo...",
        formatMessage: (error) => {
          console.error(
            "Ha ocurrido un error al intentar calcular una ruta.\nStatus: ",
            error.status,
            "\nMensaje: ",
            error.message
          );
          return `"Mensaje de error: ", ${error.message}`;
        },
      }).addTo(map);

      if (routing) {
        setRouting(routing);
        setRoutingErrorHandler(errorHandler);
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
        className="btn btn-primary btn-lg m-5 bg-gradient border-2 fs-2 position-absolute fixed-bottom shadow"
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
        className="btn btn-secondary btn-lg m-5 bg-gradient border-2 fs-2 position-absolute fixed-bottom shadow"
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
      routing.remove();
      routingErrorHandler?.remove();
      setRouting(null);
      setRoutingErrorHandler(null);
      setDestination(null);
      setDrawRoute(false);
    }
  };

  return (
    <div id="map" className="fixed-top bottom-margin">
      <MapContainer
        id="mapa-la-guaira"
        className="h-100"
        ref={setMap}
        center={lugares[0].coords}
        zoom={17}
        scrollWheelZoom={false}
        touchZoom
        bounceAtZoomLimits
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl
          zoomInText={`<div class="bg-secondary-subtle bg-gradient fs-4">+</div>`}
          zoomOutText={`<div class="bg-secondary-subtle bg-gradient fs-4">-</div>`}
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
                  lugar.id !== 0 ? markerIcon : personIcon
                }
                eventHandlers={{
                  click: () => {
                    console.log("marcador clickeado");
                    // Centra el mapa en el marcador seleccionado
                    map.flyTo(lugar.coords);
                    // registra el click al marcador solo cuando es distinto al de la ubicacion actual
                    lugar.id !== 0 ? MarkerPress(lugar) : null;
                  },
                }}
              >
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
