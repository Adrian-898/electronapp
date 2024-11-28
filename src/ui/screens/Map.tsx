import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import type { Map } from "leaflet";

// objeto para almacenar informacion de los lugares que se quiere marcar en el mapa
type Lugar = {
  coords: { lat: number; lng: number };
  name: string;
};

// De aqui se obtienen las coordenadas y el nombre de los lugares para crear los Pins en el mapa
const lugares: Lugar[] = [
  {
    coords: { lat: 10.598246, lng: -66.930307 },
    name: "Lugar 1",
  },
  {
    coords: { lat: 10.60062, lng: -66.922652 },
    name: "Lugar 2",
  },
];

const Mapa = () => {
  // Coordenadas donde se centra el mapa al cargar
  const position = { lat: 10.597032, lng: -66.930431 };

  // estado del ref del mapa en el DOM, se usa para corregir un error de leaflet.
  const [map, setMap] = useState<Map | null>(null);

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
        ref={setMap}
        center={position}
        zoom={16}
        scrollWheelZoom={false}
        className="h-100"
        touchZoom
        bounceAtZoomLimits
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*
          // itera el arreglo lugares y renderiza un pin para cada instancia existente
          lugares.map((lugar, index) => (
            <Marker
              key={index}
              title={lugar.name}
              position={{
                lat: lugar.coords.lat,
                lng: lugar.coords.lng,
              }}
            >
              <Popup>{lugar.name}</Popup>
            </Marker>
          ))
        */}
      </MapContainer>
    </div>
  );
};

export default Mapa;
