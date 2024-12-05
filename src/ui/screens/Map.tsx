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
    name: "Lugar 2",
  },
];

const Mapa = () => {
  // Coordenadas de la guaira
  // const center = { lat: 10.597032, lng: -66.930431 };

  // estado del ref del mapa en el DOM, se usa para corregir un error de leaflet.
  const [map, setMap] = useState<Map | null>(null);

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

  // se agrega a la instancia del mapa la ruta a trazar
  useEffect(() => {
    if (map) {
      L.Routing.control({
        waypoints: [L.latLng(lugares[0].coords), L.latLng(lugares[1].coords)],
        fitSelectedRoutes: false,
        show: false,
        showAlternatives: false,
        language: "es",
      }).addTo(map);

      // esta funcion corrige un error de leaflet que no centra el mapa al montar el componente y aparece todo en la esquina superior izquierda del contenedor.
      const i = setInterval(() => {
        map.invalidateSize(true);
      }, 500);
      return () => clearInterval(i);
    }
  }, [map]); // Este useEffect se ejecuta solo una vez cuando el mapa está listo.

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
          lugares.map((lugar, index) => (
            <Marker
              key={index}
              position={lugar.coords}
              icon={lugar.name === "Usted está aquí" ? personIcon : markerIcon}
              eventHandlers={{
                click: () => {
                  console.log("marcador clickeado");
                },
                popupopen: () => {
                  map?.flyTo(lugar.coords);
                },
              }}
            >
              <Popup>{lugar.name}</Popup>
            </Marker>
          ))
        }
      </MapContainer>
    </div>
  );
};

export default Mapa;
