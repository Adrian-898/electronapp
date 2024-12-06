import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  AttributionControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import type { Map, Icon } from "leaflet";
import PersonIcon from "../assets/images/person-standing.svg";
import MarkerIcon from "../assets/images/marker-icon-2x.png";
import Shadow from "../assets/images/marker-shadow.png";

// objeto para almacenar informacion de los lugares que se quiere marcar en el mapa
type Lugar = {
  coords: { lat: number; lng: number };
  name: string;
};

// De aqui se obtienen las coordenadas y el nombre de los lugares para crear los Pins en el mapa
const lugares: Lugar[] = [
  {
    coords: { lat: 10.598246, lng: -66.930307 },
    name: "Usted está aquí",
  },
  {
    coords: { lat: 10.60062, lng: -66.922652 },
    name: "Lugar 1",
  },
  {
    coords: { lat: 10.60172, lng: -66.922543 },
    name: "Lugar 2",
  },
];

const Mapa = () => {
  // estado del ref del mapa en el DOM, se usa para corregir un error de leaflet.
  const [map, setMap] = useState<Map | null>(null);

  // destino establecido al que ir, una vez se selecciona un marcador
  const [destination, setDestination] = useState<Lugar | undefined>();
  const [newDestination, setNewDestination] = useState<Lugar | undefined>();

  // estado visual (mostrado o no segun se toque un marcador del mapa) del boton para trazar ruta del usuario a un lugar determinado
  const [drawRouteButton, setDrawRouteButton] = useState(false);

  // estado que controla la activacion del trazado de ruta de A a B
  const [drawRoute, setDrawRoute] = useState(false);

  // estado de configuracion de trazado de rutas, establecido o no
  const [routingControl, setRoutingControl] =
    useState<L.Routing.Control | null>(null);

  useEffect(() => {
    if (map) {
      // esta funcion corrige un error de leaflet que no centra el mapa al montar el componente y aparece todo en la esquina superior izquierda del contenedor.
      const i = setInterval(() => {
        map.invalidateSize(true);
      }, 500);
      return () => clearInterval(i);
    }
  }, [map]); // Este useEffect se ejecuta solo una vez cuando el mapa está listo.

  useEffect(() => {
    if (map) {
      // Clear the routing control if it exists and drawRoute is false
      if (routingControl && drawRoute && destination === newDestination) {
        map.removeControl(routingControl);
        setRoutingControl(null);
      }

      // Add the routing control if drawRoute is true and no routing control exists
      if (drawRoute && !routingControl && destination) {
        let waypoints = [
          L.latLng(lugares[0].coords),
          L.latLng(destination.coords),
        ];
        let control = L.Routing.control({
          plan: L.Routing.plan(waypoints, {
            createMarker: () => false,
          }),
          addWaypoints: false,
          collapsible: true,
          fitSelectedRoutes: true,
          showAlternatives: false,
          language: "es",
          defaultErrorHandler(error) {
            try {
              map.getCenter();
            } catch {
              console.log(error);
              map.fitBounds(L.latLngBounds(waypoints));
            }
          },
        }).addTo(map);
        setRoutingControl(control); // Store the routing control reference
      }
    }
  }, [map, drawRoute]); // Add dependencies to the useEffect

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

  // boton para trazar rutas
  const DrawRouteButton = () => {
    return (
      <button
        type="button"
        className="btn btn-primary btn-lg position-absolute fixed-bottom m-5"
        onClick={DrawRouteButtonPress}
      >
        Mostrar el camino a {newDestination?.name}
      </button>
    );
  };

  // al presionar un marcador
  const MarkerPress = (lugar: Lugar) => {
    if (destination?.name !== lugar?.name || destination.name === undefined) {
      setNewDestination(lugar);
      setDrawRouteButton(true);
    } else {
      setDrawRouteButton(false);
    }
  };

  // al presionar el boton para trazar rutas
  const DrawRouteButtonPress = () => {
    setDrawRouteButton(false);
    if (destination !== newDestination) {
      setDestination(newDestination);
      setDrawRoute(true);
    }
  };

  return (
    <div id="map" className="fixed-top" style={{ bottom: 142.333 }}>
      <MapContainer
        id="mapa-la-guaira"
        ref={setMap}
        center={lugares[0].coords}
        zoom={17}
        scrollWheelZoom={false}
        className="h-100"
        touchZoom
        bounceAtZoomLimits
        zoomControl={false}
        attributionControl={false}
      >
        <AttributionControl position="bottomleft" />
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          // itera el arreglo lugares y renderiza un pin para cada instancia existente
          map &&
            lugares.map((lugar, index) => (
              <Marker
                key={index}
                position={lugar.coords}
                icon={
                  lugar.name === "Usted está aquí" ? personIcon : markerIcon
                }
                eventHandlers={{
                  click: () => {
                    console.log("marcador clickeado");
                    lugar.name !== "Usted está aquí"
                      ? MarkerPress(lugar)
                      : null;
                  },
                  popupopen: () => {
                    map.flyTo(lugar.coords);
                  },
                }}
              >
                <Popup>{lugar.name}</Popup>
              </Marker>
            ))
        }

        {
          // muestra el boton de trazar ruta:
          drawRouteButton && <DrawRouteButton />
        }
      </MapContainer>
    </div>
  );
};

export default Mapa;
